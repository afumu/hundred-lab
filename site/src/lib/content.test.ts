import { describe, expect, it } from 'vitest';

import { buildContentIndex } from './content';

describe('buildContentIndex', () => {
  it('loads formal content categories from the repository root', async () => {
    const index = await buildContentIndex();

    expect(index.projects.length).toBeGreaterThan(0);
    expect(index.products.length).toBeGreaterThan(0);
    expect(index.articles.length).toBeGreaterThan(0);
    expect(index.tools.length).toBeGreaterThan(0);
  });

  it('creates article slugs and reads markdown bodies', async () => {
    const index = await buildContentIndex();
    const article = index.articles.find((entry) => entry.slug === 'remote-control-codex-with-anywhere');

    expect(article).toBeDefined();
    expect(article?.markdown).toContain('Anywhere');
  });

  it('collects repository cards for formal project entries', async () => {
    const index = await buildContentIndex();

    expect(index.projects.some((entry) => entry.slug === 'openwork')).toBe(true);
    expect(index.projects.some((entry) => entry.slug === 'openlink')).toBe(true);
  });

  it('builds a navigable article collection', async () => {
    const index = await buildContentIndex();

    expect(index.articles.map((entry) => entry.slug)).toContain('remote-control-codex-with-anywhere');
  });

  it('loads software tools as a separate site layer', async () => {
    const index = await buildContentIndex();

    expect(index.tools.some((entry) => entry.slug === 'yepanywhere')).toBe(true);
    expect(index.tools.some((entry) => entry.slug === 'codex')).toBe(true);
  });
});
