"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaInstagram, FaEnvelope, FaTrophy, FaMusic, FaClock } from "react-icons/fa";
import { membersStats } from "./constants";
import Navbar from "../navbar/page";

const Leaderboard = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter Members
    const filteredMembers = membersStats.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
        <Navbar />
        <div className="mb-20"></div>
        <section className="text-white py-12 min-h-screen">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold mb-5">OneHeart Hall of Fame</h1>
                <p className="text-lg text-gray-300">Celebrating our OneHeartians!</p>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search members..."
                    className="p-3 w-3/4 sm:w-1/2 lg:w-1/3 rounded-lg text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Members Grid */}
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {filteredMembers.map((member, index) => (
                    <motion.div 
                        key={member.id} 
                        className="p-6 rounded-lg shadow-lg text-center flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        {/* Member Image */}
                        <div className="w-40 h-40 rounded-full overflow-hidden">
                            <Image 
                            src={member.image} 
                            alt={member.name} 
                            width={128} 
                            height={128} 
                            loading="lazy"
                            className="object-cover w-full h-full" />
                        </div>

                        {/* Member Name */}
                        <h3 className="text-2xl font-semibold mt-4">{member.name}</h3>

                        {/* Member desc */}
                        <h3 className="text-1xl mt-2 text-gray-300">{member.desc}</h3>



                        {/* Stats Section */}
                        <div className="mt-4 grid grid-cols-3 gap-4 text-white">
                            <div className="flex flex-col items-center">
                                <FaTrophy className="text-yellow-500 text-2xl" />
                                <span className="text-3xl font-bold">{member.wins}</span>
                                <span className="text-sm text-gray-400">Wins</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <FaMusic className="text-blue-400 text-2xl" />
                                <span className="text-3xl font-bold">{member.performances}</span>
                                <span className="text-sm text-gray-400">Performances</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <FaClock className=" text-2xl" />
                                <span className="text-3xl font-bold">{member.stageHours}</span>
                                <span className="text-sm text-gray-400">Stage Hours</span>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="flex justify-center mt-4 space-x-4">
                            <a href={member.contact.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400 text-2xl">
                                <FaInstagram />
                            </a>
                            <a href={`mailto:${member.contact.email}`} className="text-blue-400 hover:text-blue-300 text-2xl">
                                <FaEnvelope />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
        </>
    );
};

export default Leaderboard;
