import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog.server';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://smilebunyang.com';

  // 정적 페이지들
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date('2025-10-14'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/yeomchang-thechaeum`,
      lastModified: new Date('2025-10-14'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/yeomchang-thechaeum/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // 블로그 포스트들
  const posts = getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/yeomchang-thechaeum/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}
