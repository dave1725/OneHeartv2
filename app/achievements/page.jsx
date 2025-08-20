'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { client } from './client';
import Navbar from '../navbar/page';
import Footer from '../footer/page';
import { PortableText } from "@portabletext/react";

const stats = [
  { label: "Prizes Won", value: 15 },
  { label: "Colleges Participated", value: 5 },
  { label: "Members Performed", value: 50 }
];

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      const query = `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        body,
        publishedAt,
        "imageUrl": image.asset->url
      }`;
      const data = await client.fetch(query);
      setAchievements(data);
    };

    fetchAchievements();
  }, []);

  return (
    <> 
      <Navbar />
      <div className='mb-20'></div>
      <section className="text-white min-h-screen py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Our Achievements</h1>
          <p className="text-lg text-gray-300">A journey of music, passion, and success.</p>
        </div>

        {/* Statistics Section */}
        <div className="container mx-auto mt-16 text-center mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-4xl font-bold text-red-500">{stat.value}+</h3>
                <p className="text-lg text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {achievements.length > 0 ? (
            achievements.map((item) => (
              <AchievementCard key={item._id} item={item} />
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-3">Loading...</p>
          )}
        </div>
        
        <Footer />
      </section>
      <div className='mb-[100px]'></div>
    </>
  );
};

// Achievement Card Component
const AchievementCard = ({ item }) => {
  return (
    <motion.div 
      className="p-6 rounded-lg shadow-lg text-center border-2 border-gray-400 bg-gray-800 hover:bg-gray-700 transition-all duration-300 flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="w-full h-48 bg-gray-700 rounded-lg mb-5 overflow-hidden">
        <Image src={item.imageUrl} alt={item.title} width={300} height={200} className="object-cover w-full h-full" />
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[80px] h-[2px] bg-white -mt-2 mb-3"></div>
      </div>

      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
      
      {/* Short Preview of Content */}
      <div className="text-gray-400 mb-4 px-5 text-left flex-grow">
        <div className="line-clamp-3">
          <PortableText value={item.body.slice(0, 1)} />
        </div>
      </div>

      <div className="mt-auto">
        <Link href={`/achievements/${item._id}`}>
          <button className="text-red-500 text-sm hover:underline">Read More</button>
        </Link>
        <span className="block text-gray-500 text-sm mt-2">{new Date(item.publishedAt).toDateString()}</span>
      </div>
    </motion.div>
  );
};

export default Achievements;
