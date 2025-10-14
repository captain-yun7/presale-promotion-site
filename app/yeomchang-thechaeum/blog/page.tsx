"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import blogLinks from "@/data/blog-links.json";

interface BlogLink {
  url: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
}

export default function BlogPage() {
  const blogs: BlogLink[] = blogLinks;

  return (
    <>
      <Header />
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

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogs.map((blog, index) => (
              <motion.a
                key={index}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-luxury-gold"
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
                      target.src = "/images/KakaoTalk_20251014_125002456.jpg";
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
                <div className="p-6">
                  {/* Date */}
                  <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                    </svg>
                    {blog.date}
                  </p>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-luxury-charcoal mb-3 group-hover:text-luxury-gold transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                    {blog.description}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center text-luxury-gold font-semibold text-sm group-hover:gap-2 transition-all">
                    <span>자세히 보기</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

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
