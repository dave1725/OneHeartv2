'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const fileID = "1ZgDqOlkmewTzJZqy5xRSd-Lk5gAy1rubU1SRcGmyZqc";

const navItems = [
    { name: "About Us", link: "/" },
    { name: "Recordings", link: "/recordings" },
    { name: "Achievements", link: "/achievements" },
    { name: "OneHeartians", link: "/oneheartians" },
    { name: "LOA", link: `https://docs.google.com/document/d/${fileID}/export?format=docx`},
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav 
            initial={{ y: -50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 w-full z-50 font-orbitron text-white"
        >
            {/* Main Navbar */}
            <div className="flex justify-between items-center px-8 py-4 backdrop-blur-md">
                
                {/* Logo */}
                <h1 className="text-2xl">
                    🎶 OneHeart
                </h1>

                {/* Desktop Menu */}
                <div className="music-glow hidden md:flex space-x-20">
                    {navItems.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <motion.div whileHover={{ x: 5, y: 5 }} transition={{ duration: 0.3 }}>
                                <Link 
                                    href={item.link} 
                                    className="text-1xl transition-transform duration-500 ease-in-out">
                                    {item.name}
                                </Link>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-neonBlue text-2xl">
                        {isOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="md:hidden bg-black/80 backdrop-blur-md w-full py-4"
                    >
                        {navItems.map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <motion.div whileHover={{ x: 5, y: 5 }} transition={{ duration: 0.3 }}>
                                    <Link href={item.link} className="block text-center text-lg py-3">
                                        {item.name}
                                    </Link>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
