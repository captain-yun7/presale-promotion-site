import { Metadata } from "next";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog.server";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "블로그를 찾을 수 없습니다 | 염창역 더채움",
      description: "요청하신 블로그 게시물을 찾을 수 없습니다.",
    };
  }

  const baseUrl = "https://smilebunyang.com";
  const blogUrl = `${baseUrl}/yeomchang-thechaeum/blog/${params.slug}`;

  return {
    title: `${post.title} | 염창역 더채움 블로그`,
    description: post.description,
    keywords: `염창역 더채움, ${post.category}, ${post.title}, 염창역 분양, 염창역 아파텔`,
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: blogUrl,
      siteName: "염창역 더채움",
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.image.startsWith("http") ? post.image : `${baseUrl}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: [post.author || "염창역 더채움"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image.startsWith("http") ? post.image : `${baseUrl}${post.image}`],
    },
    alternates: {
      canonical: blogUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}
