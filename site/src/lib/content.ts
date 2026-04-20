import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';

import type { ContentEntry, ContentIndex, ContentKind, RepoCard } from './types';

// The site lives in /site while formal content lives in the repo root /content.
// Resolve from the current process root so Astro build and tests both read the same source tree.
const repoRoot = path.resolve(process.cwd(), '..');
const contentRoot = path.join(repoRoot, 'content');
const toolsRoot = path.join(repoRoot, 'tools');

const categoryMap: Record<ContentKind, string> = {
  project: 'projects',
  product: 'products',
  skill: 'skills',
  article: 'articles',
  video: 'videos',
};

const categoryOrder: ContentKind[] = ['project', 'product', 'skill', 'article', 'video'];

const detailBaseByKind: Partial<Record<ContentKind, string>> = {
  project: 'projects',
  product: 'products',
  skill: 'skills',
  article: 'articles',
  tool: 'tools',
};

interface EntryMeta {
  id?: string;
  title?: string;
  slug?: string;
  status?: string;
  visibility?: string;
  repo?: string;
  source_type?: string;
  tags?: string[];
}

async function readOptional(filePath: string) {
  try {
    return await readFile(filePath, 'utf8');
  } catch {
    return undefined;
  }
}

function deriveSlug(dirName: string, fallbackTitle?: string) {
  const stripped = dirName.replace(/^[A-Z]+\d+-/, '');
  if (stripped) {
    return stripped;
  }

  return (fallbackTitle ?? dirName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function stripMarkdown(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstMeaningfulParagraph(readme?: string, markdown?: string) {
  const source = readme ?? markdown ?? '';
  const blocks = source
    .split(/\n\s*\n/)
    .map((block) => stripMarkdown(block))
    .filter(Boolean)
    .filter((block) => !block.startsWith('---'));

  const meaningful = blocks.find((block) => !block.startsWith('http'));
  return meaningful ?? '';
}

async function loadEntry(kind: ContentKind, dirPath: string, dirName: string): Promise<ContentEntry> {
  const readme = await readOptional(path.join(dirPath, 'README.md'));
  const markdown = kind === 'article' ? await readOptional(path.join(dirPath, 'article.md')) : undefined;
  const metaRaw = await readOptional(path.join(dirPath, 'meta.yaml'));
  const meta = metaRaw ? (parseYaml(metaRaw) as EntryMeta) : {};

  const title = meta.title ?? readme?.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? dirName;
  const slug = meta.slug ?? deriveSlug(dirName, title);
  const summary = firstMeaningfulParagraph(readme, markdown);

  return {
    id: meta.id ?? dirName,
    kind,
    title,
    slug,
    status: meta.status,
    visibility: meta.visibility,
    summary,
    readme,
    markdown,
    repo: meta.repo,
    tags: meta.tags ?? [],
    sourceType: meta.source_type,
  };
}

async function loadCategory(kind: ContentKind): Promise<ContentEntry[]> {
  const categoryDir = path.join(contentRoot, categoryMap[kind]);
  const children = await readdir(categoryDir, { withFileTypes: true });

  const entries = await Promise.all(
    children
      .filter((child) => child.isDirectory())
      .map((child) => loadEntry(kind, path.join(categoryDir, child.name), child.name)),
  );

  return entries.sort((left, right) => left.title.localeCompare(right.title, 'zh-Hans-CN'));
}

export async function buildContentIndex(): Promise<ContentIndex> {
  const [projects, products, skills, articles, videos, tools] = await Promise.all([
    ...categoryOrder.map((kind) => loadCategory(kind)),
    loadTools(),
  ]);

  return { projects, products, skills, articles, videos, tools };
}

export async function buildRepoCards() {
  const index = await buildContentIndex();
  const cards = new Map<string, RepoCard>();

  cards.set('hundred-lab', {
    title: '百创计划',
    slug: 'hundred-lab',
    summary: '百创计划的总母仓库，负责沉淀项目、产品、技能、文章和视频。',
    kind: 'repository',
    repo: 'https://github.com/afumu/hundred-lab',
    tags: ['meta-repo', 'content-system', 'product-first'],
    source: 'local',
  });

  for (const entry of [...index.projects, ...index.products, ...index.skills]) {
    if (!entry.repo) continue;
    cards.set(entry.slug, {
      title: entry.title,
      slug: entry.slug,
      summary: entry.summary,
      kind: 'repository',
      repo: entry.repo,
      tags: entry.tags,
      source: 'formal-entry',
      docHref: getDetailHref(entry.kind, entry.slug),
    });
  }

  return Array.from(cards.values()).sort((left, right) => left.title.localeCompare(right.title, 'zh-Hans-CN'));
}

export async function getArticleBySlug(slug: string) {
  const index = await buildContentIndex();
  return index.articles.find((entry) => entry.slug === slug);
}

function getCollectionByKind(index: ContentIndex, kind: ContentKind) {
  switch (kind) {
    case 'project':
      return index.projects;
    case 'product':
      return index.products;
    case 'skill':
      return index.skills;
    case 'article':
      return index.articles;
    case 'video':
      return index.videos;
    case 'tool':
      return index.tools;
  }
}

export function getDetailHref(kind: ContentKind, slug: string) {
  const base = detailBaseByKind[kind];
  return base ? `/${base}/${slug}` : undefined;
}

export async function getEntryByKindAndSlug(kind: ContentKind, slug: string) {
  const index = await buildContentIndex();
  return getCollectionByKind(index, kind).find((entry) => entry.slug === slug);
}

export async function getEntriesByKind(kind: ContentKind) {
  const index = await buildContentIndex();
  return getCollectionByKind(index, kind);
}

function inferToolTags(dirPath: string, readme?: string) {
  const tags = new Set<string>();
  const normalized = dirPath.toLowerCase();

  if (normalized.includes('/software/')) {
    tags.add('software');
  }

  if (readme?.includes('Codex')) tags.add('codex');
  if (readme?.includes('Claude Code')) tags.add('claude-code');
  if (readme?.includes('移动端')) tags.add('mobile-control');
  if (readme?.includes('语音')) tags.add('voice-input');
  if (readme?.includes('账号')) tags.add('account-management');
  if (readme?.includes('网络')) tags.add('network');

  return Array.from(tags);
}

function inferRepo(readme?: string) {
  const match = readme?.match(/https:\/\/github\.com\/[^\s)>\]]+/);
  return match?.[0];
}

async function loadTools(): Promise<ContentEntry[]> {
  const softwareDir = path.join(toolsRoot, 'software');
  const children = await readdir(softwareDir, { withFileTypes: true });

  const entries = await Promise.all(
    children
      .filter((child) => child.isDirectory())
      .map(async (child) => {
        const dirPath = path.join(softwareDir, child.name);
        const readme = await readOptional(path.join(dirPath, 'README.md'));
        const title = readme?.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? child.name;

        return {
          id: child.name,
          kind: 'tool' as const,
          title,
          slug: child.name,
          summary: firstMeaningfulParagraph(readme),
          readme,
          repo: inferRepo(readme),
          tags: inferToolTags(dirPath, readme),
          sourceType: 'tooling',
        };
      }),
  );

  return entries.sort((left, right) => left.title.localeCompare(right.title, 'zh-Hans-CN'));
}
