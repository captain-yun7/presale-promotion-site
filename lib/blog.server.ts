import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  author?: string;
  content: string;
  readingTime: string;
  tags?: string[];
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  author?: string;
  readingTime: string;
  tags?: string[];
}

// Get all blog post slugs
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

// Get a single blog post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const htmlContent = marked(content);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      category: data.category || '',
      image: data.image || '',
      author: data.author || '염창역 더채움',
      content: htmlContent as string,
      readingTime: stats.text,
      tags: data.tags || [],
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// Get all blog posts metadata (for listing page)
export function getAllPosts(): BlogPostMetadata[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(slug => {
      try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const stats = readingTime(content);

        return {
          slug,
          title: data.title || '',
          description: data.description || '',
          date: data.date || '',
          category: data.category || '',
          image: data.image || '',
          author: data.author || '염창역 더채움',
          readingTime: stats.text,
          tags: data.tags || [],
        } as BlogPostMetadata;
      } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
      }
    })
    .filter((post): post is BlogPostMetadata => post !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1)); // Sort by date, newest first

  return posts;
}
