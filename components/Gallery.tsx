"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

const images = [
  { id: 0, src: '/images/yeomchang-thechaeum-entrance-lobby.jpg', alt: '염창역 더채움 입구 로비' },
  { id: 1, src: '/images/yeomchang-thechaeum-unit-interior-01.jpg', alt: '염창역 더채움 내부 1' },
  { id: 2, src: '/images/yeomchang-thechaeum-unit-interior-02.jpg', alt: '염창역 더채움 내부 2' },
  { id: 3, src: '/images/yeomchang-thechaeum-unit-interior-03.jpg', alt: '염창역 더채움 내부 3' },
  { id: 4, src: '/images/yeomchang-thechaeum-unit-interior-05.jpg', alt: '염창역 더채움 내부 5' },
  { id: 5, src: '/images/yeomchang-thechaeum-unit-interior-06.jpg', alt: '염창역 더채움 내부 6' },
  { id: 6, src: '/images/yeomchang-thechaeum-unit-interior-07.jpg', alt: '염창역 더채움 내부 7' },
  { id: 7, src: '/images/yeomchang-thechaeum-unit-interior-08.jpg', alt: '염창역 더채움 내부 8' },
  { id: 8, src: '/images/yeomchang-thechaeum-unit-interior-10.jpg', alt: '염창역 더채움 내부 10' },
  { id: 9, src: '/images/yeomchang-thechaeum-unit-interior-11.jpg', alt: '염창역 더채움 내부 11' },
  { id: 10, src: '/images/yeomchang-thechaeum-unit-interior-12.jpg', alt: '염창역 더채움 내부 12' },
  { id: 11, src: '/images/yeomchang-thechaeum-unit-interior-16.jpg', alt: '염창역 더채움 내부 16' },
];

export default function Gallery({ disableAnimation = false }: { disableAnimation?: boolean }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <>
      <section id="gallery" className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Section Title */}
          <motion.div
            className="text-center mb-16"
            initial={disableAnimation ? false : { opacity: 0, y: 30 }}
            whileInView={disableAnimation ? false : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-luxury-gold text-lg mb-3 font-medium tracking-wide">
              GALLERY
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              갤러리
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              염창역 더채움의 다양한 모습을 확인하세요
            </p>
          </motion.div>

          {/* Main Swiper */}
          <motion.div
            initial={disableAnimation ? false : { opacity: 0, y: 30 }}
            whileInView={disableAnimation ? false : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay, Thumbs]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="gallery-swiper mb-6"
            >
              {images.map((image, index) => (
                <SwiperSlide key={image.id}>
                  <div
                    className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group"
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail Swiper */}
            <Swiper
              modules={[FreeMode, Thumbs]}
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              breakpoints={{
                640: {
                  slidesPerView: 6,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 8,
                  spaceBetween: 15,
                },
              }}
              className="gallery-thumbs"
            >
              {images.map((image) => (
                <SwiperSlide key={`thumb-${image.id}`}>
                  <div className="relative aspect-square overflow-hidden rounded-lg cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, 12.5vw"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <motion.div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          initial={disableAnimation ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-luxury-gold transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-4 text-white hover:text-luxury-gold transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev! > 0 ? prev! - 1 : images.length - 1));
            }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            className="absolute right-4 text-white hover:text-luxury-gold transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev! < images.length - 1 ? prev! + 1 : 0));
            }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <motion.div
            className="relative max-w-7xl max-h-[90vh] w-full h-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded-full">
            {selectedImage + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </>
  );
}
