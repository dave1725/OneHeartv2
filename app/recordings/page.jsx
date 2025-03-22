"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../navbar/page";
import { recordings } from "./constants";

const Recordings = () => {
  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center mt-20 min-h-screen px-4">
        <motion.h1
          className="text-3xl font-bold mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          🎵 Our Recordings
        </motion.h1>

    
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-8xl">
          {recordings.map((track, index) => (
            <motion.div
              key={track.id}
              className="bg-black/50 p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <iframe
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={track.url}
                className="rounded-lg"
              ></iframe>
              <motion.p
                className="text-center text-gray-300 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
              >
                {track.title}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Recordings;
