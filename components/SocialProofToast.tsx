"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SocialProofToast() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [reservationCount, setReservationCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Simulate real-time visitor count
    const targetVisitors = 2847;
    const targetReservations = 342;

    const visitorInterval = setInterval(() => {
      setVisitorCount((prev) => {
        if (prev < targetVisitors) {
          return prev + Math.floor(Math.random() * 50) + 20;
        }
        clearInterval(visitorInterval);
        return targetVisitors;
      });
    }, 50);

    const reservationInterval = setInterval(() => {
      setReservationCount((prev) => {
        if (prev < targetReservations) {
          return prev + Math.floor(Math.random() * 5) + 2;
        }
        clearInterval(reservationInterval);
        return targetReservations;
      });
    }, 100);

    // Show toast after 10 seconds
    const showTimer = setTimeout(() => {
      setShowToast(true);
    }, 10000);

    // Hide toast after 15 seconds (10s delay + 5s display)
    const hideTimer = setTimeout(() => {
      setShowToast(false);
    }, 15000);

    return () => {
      clearInterval(visitorInterval);
      clearInterval(reservationInterval);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-8 left-8 z-50 bg-gradient-to-br from-luxury-charcoal via-gray-800 to-luxury-charcoal rounded-2xl p-6 shadow-2xl max-w-sm"
        >
          <div className="mb-3">
            <h4 className="text-white font-bold text-lg mb-1">실시간 관심도</h4>
            <p className="text-gray-300 text-sm">
              지금 이 순간에도 많은 분들이 주목하고 있습니다
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Visitor Count */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center">
              <div className="text-luxury-gold mb-2">
                <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <p className="text-gray-300 text-xs mb-1">누적 방문자</p>
              <motion.p
                className="text-2xl font-bold text-luxury-gold"
                key={visitorCount}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {visitorCount.toLocaleString()}
              </motion.p>
              <p className="text-xs text-gray-400">명</p>
            </div>

            {/* Reservation Count */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center">
              <div className="text-luxury-gold mb-2">
                <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"/>
                </svg>
              </div>
              <p className="text-gray-300 text-xs mb-1">상담 예약</p>
              <motion.p
                className="text-2xl font-bold text-luxury-gold"
                key={reservationCount}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {reservationCount.toLocaleString()}
              </motion.p>
              <p className="text-xs text-gray-400">건</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
