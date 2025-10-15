"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import Link from "next/link";

interface BlogPost {
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

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header forceScrolled={true} />
        <main className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-16">
          <div className="container-custom">
            <div className="text-center py-20">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header forceScrolled={true} />
        <main className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-16">
          <div className="container-custom">
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-luxury-charcoal mb-4">
                블로그를 찾을 수 없습니다
              </h1>
              <Link
                href="/yeomchang-thechaeum/blog"
                className="text-luxury-gold hover:underline"
              >
                블로그 목록으로 돌아가기
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header forceScrolled={true} />
      <main className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-16">
        <article className="container-custom max-w-4xl">
          {/* Back Button */}
          <Link
            href="/yeomchang-thechaeum/blog"
            className="inline-flex items-center text-luxury-gold hover:text-luxury-charcoal transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            블로그 목록으로
          </Link>

          {/* Header */}
          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category & Date */}
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-luxury-gold text-luxury-charcoal px-4 py-1 rounded-full text-sm font-bold">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                </svg>
                {post.date}
              </span>
              <span className="text-gray-500 text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                {post.readingTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-luxury-charcoal mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed">
              {post.description}
            </p>

            {/* Author */}
            {post.author && (
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-luxury-charcoal" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">{post.author}</span>
              </div>
            )}
          </motion.header>

          {/* Featured Image */}
          {post.image && (
            <motion.div
              className="mb-12 rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/yeomchang-thechaeum-exterior-view.jpg";
                }}
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            className="prose prose-lg max-w-none blog-content
              prose-headings:text-luxury-charcoal prose-headings:font-bold
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
              prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-luxury-gold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-luxury-charcoal prose-strong:font-bold prose-strong:bg-luxury-gold/10 prose-strong:px-2 prose-strong:py-0.5 prose-strong:rounded
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-gray-700 prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-luxury-gold prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
              prose-img:rounded-lg prose-img:shadow-md
              prose-hr:my-12 prose-hr:border-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div
              className="mt-12 pt-8 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-luxury-gold/10 text-luxury-charcoal px-4 py-2 rounded-full text-sm font-medium hover:bg-luxury-gold/20 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Back to List Button */}
          <motion.div
            className="mt-16 pt-8 border-t border-gray-300 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              href="/yeomchang-thechaeum/blog"
              className="inline-flex items-center gap-2 bg-luxury-gold text-luxury-charcoal px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              블로그 목록으로 돌아가기
            </Link>
          </motion.div>
        </article>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
