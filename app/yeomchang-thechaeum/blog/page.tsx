"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import Link from "next/link";

interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  author?: string;
  readingTime: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPostMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error("Error loading blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Header forceScrolled={true} />
      <main className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-16">
        <div className="container-custom">
          {/* Page Header */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-luxury-gold text-lg mb-3 font-medium tracking-wide">
              BLOG
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-luxury-charcoal mb-6">
              염창역 더채움 블로그
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              염창역 더채움에 관한 다양한 정보와 소식을 확인하세요
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="aspect-video bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded w-full mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Blog Cards Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogs.map((blog, index) => (
                <Link
                  key={blog.slug}
                  href={`/yeomchang-thechaeum/blog/${blog.slug}`}
                  className="block"
                >
                  <motion.div
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-luxury-gold cursor-pointer h-full flex flex-col"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Image */}
                    <div className="relative aspect-video bg-gray-200 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/yeomchang-thechaeum-exterior-view.jpg";
                        }}
                      />
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-luxury-gold text-luxury-charcoal px-3 py-1 rounded-full text-xs font-bold">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Date & Reading Time */}
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-gray-400 text-sm flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                          </svg>
                          {blog.date}
                        </p>
                        <span className="text-gray-400 text-sm">•</span>
                        <p className="text-gray-400 text-sm">{blog.readingTime}</p>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-luxury-charcoal mb-3 group-hover:text-luxury-gold transition-colors line-clamp-2 min-h-[3.5rem]">
                        {blog.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                        {blog.description}
                      </p>

                      {/* Read More */}
                      <div className="flex items-center text-luxury-gold font-semibold text-sm group-hover:gap-2 transition-all mt-auto">
                        <span>자세히 보기</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {blogs.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-gray-400 mb-4">
                <svg className="w-20 h-20 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <p className="text-xl text-gray-600 mb-2">아직 등록된 블로그가 없습니다</p>
              <p className="text-gray-500 text-sm">곧 다양한 소식으로 찾아뵙겠습니다</p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
