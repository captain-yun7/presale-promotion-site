"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function UrgencyBanner() {
  const [isVisible, setIsVisible] = useState(true);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[1001] bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white shadow-lg"
    >
      <div className="container-custom py-2 md:py-3 flex items-center justify-between gap-2 md:gap-4">
        <motion.button
          onClick={scrollToContact}
          className="flex-1 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <motion.span
            animate={{
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="text-lg md:text-2xl"
          >
            🔥
          </motion.span>
          <span className="font-black text-xs sm:text-sm md:text-base lg:text-lg">
            특별분양 6세대 선착순 마감임박
          </span>
          <span className="hidden sm:inline text-xs md:text-sm font-bold bg-white/20 px-2 md:px-3 py-1 rounded-full">
            지금 신청하기 →
          </span>
        </motion.button>

        <button
          onClick={() => setIsVisible(false)}
          className="text-white/80 hover:text-white transition-colors text-lg md:text-xl font-bold px-2"
          aria-label="배너 닫기"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
}
