"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {

  const scrollToNext = () => {
    const element = document.getElementById("value-proposition");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Fullscreen Image Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/yeomchang-thechaeum-unit-interior-03.jpg"
          alt="염창역 더채움 거실"
          fill
          className="object-cover"
          priority
          quality={90}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container-custom w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.p
                className="text-luxury-gold text-lg md:text-2xl mb-4 md:mb-6 font-medium tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                투룸값에 쓰리룸 산다!
              </motion.p>

              <motion.h1
                className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 md:mb-9 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                염창역 <span className="text-luxury-gold">더채움</span>
              </motion.h1>

              <motion.p
                className="text-xl sm:text-2xl md:text-3xl text-gray-100 mb-12 md:mb-16 leading-relaxed max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                한강벨트라인 황금노선
                <br />
                <span className="text-luxury-gold font-semibold">9호선 급행 초역세권</span> 쓰리룸 아파텔
              </motion.p>

              {/* Interactive CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 md:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.button
                  onClick={scrollToContact}
                  className="group relative bg-luxury-gold text-luxury-charcoal px-8 py-4 md:px-10 md:py-5 rounded-full font-black text-base md:text-lg overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(212, 175, 55, 0.7)",
                      "0 0 0 10px rgba(212, 175, 55, 0)",
                      "0 0 0 0 rgba(212, 175, 55, 0)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    🔥 특별분양 상담신청 (선착순 6세대)
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 text-luxury-charcoal font-black gap-2">
                    🔥 특별분양 상담신청 (선착순 6세대)
                  </span>
                </motion.button>

                <motion.button
                  onClick={scrollToNext}
                  className="border-2 border-white text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg hover:bg-white hover:text-luxury-charcoal transition-all backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  자세히 보기
                </motion.button>
              </motion.div>

              {/* Key Features */}
              <motion.div
                className="mt-12 md:mt-16 flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    ),
                    text: "9호선 급행 초역세권"
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    ),
                    text: "4無 (주택수·대출·자금조달·실거주)"
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    ),
                    text: "한강 5분 거리"
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 md:px-6 md:py-3.5 rounded-full w-fit"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  >
                    <span className="text-luxury-gold flex-shrink-0">{feature.icon}</span>
                    <span className="text-white font-semibold text-sm md:text-lg whitespace-nowrap">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-12 left-0 right-0 z-20 cursor-pointer flex items-center justify-center"
        onClick={scrollToNext}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
          <span className="text-white text-xs md:text-sm tracking-wider text-center">SCROLL DOWN</span>
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-luxury-gold"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
