"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "../footer/page";

const Hero = () => {
  return (
    <section className="relative h-[100vh] flex flex-col justify-center items-center text-white text-center overflow-hidden">
      {/* Background Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-black"
      >
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          autoPlay
          loop
          muted
          preload="none"
          
          src="/output.webm" // video
        />
      </motion.div>

      {/* Text Section */}
      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          One Heart, <span className="text-red-500">Many Beats!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg md:text-xl text-gray-300"
        >
          OneHeart - Music Club of SRM-AP
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-6 flex space-x-6 justify-center"
        >
          <Link href="https://www.instagram.com/oneheart.srmuap" target="_blank">
          <button 
                
                className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition"
            >
                Follow Us!
            </button>

          </Link>
          <Link href="#team">
            <button className="px-6 py-3 border border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition">
              Meet the team
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
