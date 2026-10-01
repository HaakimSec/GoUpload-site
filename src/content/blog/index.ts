export interface BlogPostMeta {
  title: string;
  date: string;
  description: string;
  slug: string;
  content: string;
}

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw };
  }

  const [, frontmatterBlock, content] = match;
  const data: Record<string, string> = {};

  frontmatterBlock.split('\n').forEach((line) => {
    const lineMatch = line.match(/^(\w+):\s*"?(.*?)"?\s*$/);
    if (lineMatch) {
      const [, key, value] = lineMatch;
      data[key] = value;
    }
  });

  return { data, content };
}

const files = import.meta.glob('./*.md', { query: '?raw', import: 'default', eager: true });

export const blogPosts: BlogPostMeta[] = Object.entries(files).map(([, raw]) => {
  const { data, content } = parseFrontmatter(raw as string);
  return {
    title: data.title || 'Untitled',
    date: data.date || '',
    description: data.description || '',
    slug: data.slug || '',
    content,
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());