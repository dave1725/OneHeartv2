'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { client } from '../client';
import Navbar from '../../navbar/page';
import Footer from '../../footer/page';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

const AchievementDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const query = `*[_type == "post" && _id == "${id}"][0] {
        title,
        body,
        publishedAt,
        "imageUrl": image.asset->url
      }`;
      const data = await client.fetch(query);
      setPost(data);
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-12 px-4 text-white min-h-screen flex items-center justify-center">
          <p className="text-gray-400 text-center text-xl">Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-10 font-mono mx-auto py-12 px-4 md:px-15 text-white min-h-screen">
        {/* Back Button */}
        <motion.button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-red-500 hover:text-red-400 mb-6 transition-colors duration-200"
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }}
          whileHover={{ x: -5 }}
        >
          <FaArrowLeft />
          <span>Back to Achievements</span>
        </motion.button>

        {/* Title with Motion */}
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          {post.title}
        </motion.h1>

        <motion.p 
          className="text-gray-400 mb-6"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {new Date(post.publishedAt).toDateString()}
        </motion.p>

        {/* Image & Text Container */}
        <div className="relative mb-6">
          {/* Motion Image */}
          <motion.div 
            className="float-none md:float-right md:ml-6 mb-4 md:max-w-[50%]"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.7 }}
          >
            <Image 
              src={post.imageUrl} 
              alt={post.title} 
              width={800} 
              height={500} 
              className="w-full h-auto rounded-lg shadow-lg" 
            />
          </motion.div>

          {/* Motion Text */}
          <motion.div 
            className="text-gray-300 text-base md:text-lg space-y-4"
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <PortableText value={post.body} />
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AchievementDetails;
