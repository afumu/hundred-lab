export type ContentKind = 'project' | 'product' | 'skill' | 'article' | 'video' | 'tool';

export interface ContentEntry {
  id: string;
  kind: ContentKind;
  title: string;
  slug: string;
  status?: string;
  visibility?: string;
  summary: string;
  readme?: string;
  markdown?: string;
  repo?: string;
  tags: string[];
  sourceType?: string;
}

export interface ContentIndex {
  projects: ContentEntry[];
  products: ContentEntry[];
  skills: ContentEntry[];
  articles: ContentEntry[];
  videos: ContentEntry[];
  tools: ContentEntry[];
}

export interface RepoCard {
  title: string;
  slug: string;
  summary: string;
  kind: 'repository';
  repo: string;
  tags: string[];
  source: 'local' | 'formal-entry';
  docHref?: string;
}
