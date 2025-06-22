"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    x: 0,
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
  }),
};

export default function HeroSection({ heroTours = [] }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const length = heroTours.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };
  
  const tourIndex = (page % length + length) % length;

  useEffect(() => {
    if (!length) return;

    const timer = setTimeout(() => {
      paginate(1);
    }, 8000); // Change slide every 5 seconds

    return () => clearTimeout(timer);
  }, [page, length]);

  const prevSlide = () => {
    paginate(-1);
  };

  const nextSlide = () => {
    paginate(1);
  };

  if (!heroTours.length) {
    return null;
  }

  return (
    <section className="relative h-[90vh]">
      {/* Main Carousel */}
      <div className="relative h-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            className="absolute inset-0"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 100, damping: 25 },
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={heroTours[tourIndex].imageUrl}
                alt={heroTours[tourIndex].title}
                fill
                className="object-cover"
                priority={tourIndex === 0}
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                <motion.h1
                  key={heroTours[tourIndex].title}
                  className="text-5xl md:text-7xl font-bold mb-6 max-w-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {heroTours[tourIndex].title}
                </motion.h1>
                <motion.p
                  key={heroTours[tourIndex].description}
                  className="text-xl md:text-2xl mb-10 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.6,
                    ease: "easeOut",
                  }}
                >
                  {heroTours[tourIndex].description}
                </motion.p>
                <motion.div
                  key={heroTours[tourIndex].slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.9,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={`/tours/${heroTours[tourIndex].slug}`}
                    className="bg-white/20 hover:bg-white/30 text-white px-10 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105"
                  >
                    View Trips
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 hover:bg-black/40 transition-all duration-300"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.4)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      >
        <ChevronLeftIcon className="h-8 w-8 text-white" />
      </motion.button>
      <motion.button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 hover:bg-black/40 transition-all duration-300"
        aria-label="Next slide"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.4)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      >
        <ChevronRightIcon className="h-8 w-8 text-white" />
      </motion.button>

      {/* Dots Navigation */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
      >
        {heroTours.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              if (index > tourIndex) {
                paginate(1)
              } else if (index < tourIndex) {
                paginate(-1);
              }
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === tourIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{
              scale: 1.3,
              backgroundColor:
                index === tourIndex ? "white" : "rgba(255,255,255,0.8)",
            }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>
    </section>
  );
}
