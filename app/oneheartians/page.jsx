"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaInstagram, FaEnvelope, FaTrophy, FaMusic, FaClock, FaCrown } from "react-icons/fa";
import { membersStats } from "./constants";
import Navbar from "../navbar/page";

const Leaderboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showLegacy, setShowLegacy] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showBigBang, setShowBigBang] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [confettiPieces, setConfettiPieces] = useState([]);
    const [pageOpacity, setPageOpacity] = useState(1);

    // Generate confetti pieces
    const generateConfetti = () => {
        if (typeof window === 'undefined') return [];
        const pieces = [];
        for (let i = 0; i < 60; i++) {
            pieces.push({
                id: Math.random(),
                x: Math.random() * window.innerWidth,
                y: -100,
                rotation: Math.random() * 360,
                color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F39C12', '#E74C3C'][Math.floor(Math.random() * 8)],
                size: Math.random() * 12 + 6,
                duration: Math.random() * 3 + 3,
                delay: Math.random() * 2,
            });
        }
        return pieces;
    };

    // Handle Hall of Fame toggle with cinematic sequence
    const handleHallOfFameToggle = () => {
        if (!showLegacy && !isTransitioning) {
            // Start the cinematic sequence
            setIsTransitioning(true);
            
            // Step 1: Fade the entire page along with member cards (2 seconds)
            setPageOpacity(0);
            
            setTimeout(() => {
                // Step 2: Big bang flash effect (2.5 seconds)
                setShowBigBang(true);
                
                setTimeout(() => {
                    setShowBigBang(false);
                    setShowLegacy(true);
                    setIsTransitioning(false); // Stop showing "Entering Hall of Fame..." after flash
                    setPageOpacity(1); // Restore page opacity for Hall of Fame
                    
                    // Step 3: Start confetti after legacy members start appearing
                    setTimeout(() => {
                        setShowConfetti(true);
                        setConfettiPieces(generateConfetti());
                        
                        // Clear confetti after 10 seconds
                        setTimeout(() => {
                            setShowConfetti(false);
                        }, 10000);
                    }, 1500);
                }, 2500);
            }, 2000);
        } else if (!isTransitioning) {
            // Exit Hall of Fame mode
            setShowLegacy(false);
            setShowConfetti(false);
            setConfettiPieces([]);
            setPageOpacity(1); // Ensure page is fully visible when exiting
        }
    };

    // Filter Members based on current mode and search
    const filteredMembers = membersStats.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
        if (showLegacy) {
            return matchesSearch && member.status === 'legacy';
        }
        return matchesSearch && member.status === 'active';
    });

    return (
        <>
        <Navbar />
        <div className="mb-20"></div>
        
        {/* Big Bang Flash Effect */}
        <AnimatePresence>
            {showBigBang && (
                <motion.div
                    className="fixed inset-0 bg-white z-50 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ 
                        opacity: [0, 0.3, 1, 0.9, 0.7, 0.4, 0],
                        scale: [0.5, 1.2, 2, 1.8, 1.5, 1.2, 1]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                        duration: 2.5,
                        times: [0, 0.1, 0.3, 0.5, 0.7, 0.85, 1],
                        ease: [0.4, 0, 0.2, 1]
                    }}
                />
            )}
        </AnimatePresence>

        {/* Confetti Effect */}
        <AnimatePresence>
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-40">
                    {confettiPieces.map((piece) => (
                        <motion.div
                            key={piece.id}
                            className="absolute rounded"
                            style={{
                                width: piece.size,
                                height: piece.size,
                                backgroundColor: piece.color,
                                left: piece.x,
                                top: piece.y,
                                rotate: piece.rotation,
                            }}
                            initial={{ y: -100, rotate: 0 }}
                            animate={{ 
                                y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800,
                                rotate: piece.rotation + 720,
                                x: piece.x + (Math.random() * 200 - 100)
                            }}
                            transition={{ 
                                duration: piece.duration, 
                                delay: piece.delay,
                                ease: "easeIn"
                            }}
                        />
                    ))}
                </div>
            )}
        </AnimatePresence>

        <motion.section 
            className="text-white py-12 min-h-screen bg-black"
            animate={{ opacity: pageOpacity }}
            transition={{ duration: 2, ease: "easeInOut" }}
        >
            {/* Header */}
            <div className="text-center mb-8">
                <motion.h1 
                    className="text-5xl font-bold mb-5"
                    animate={{
                        color: showLegacy ? "#FFD700" : "#ffffff"
                    }}
                    transition={{ duration: 1 }}
                >
                    OneHeart {showLegacy ? "Hall of Fame" : "OneHeartians"}
                </motion.h1>
                <motion.p 
                    className="text-lg text-gray-300"
                    animate={{
                        color: showLegacy ? "#FFD700" : "#A0A0A0"
                    }}
                >
                    {showLegacy ? "Honoring our Legends!" : "Celebrating our OneHeartians!"}
                </motion.p>
            </div>

                {/* Controls */}
            <div className="flex flex-col items-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search members..."
                    className="p-3 w-3/4 sm:w-1/2 lg:w-1/3 rounded-lg text-white bg-black/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                {/* Royal Hall of Fame Button */}
                <motion.button 
                    onClick={handleHallOfFameToggle}
                    disabled={isTransitioning}
                    className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-500 ${
                        showLegacy 
                            ? 'bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-500 border-2 border-yellow-400' 
                            : 'bg-gradient-to-r from-yellow-800 via-yellow-600 to-yellow-800 text-white hover:from-yellow-700 hover:via-yellow-500 hover:to-yellow-700 border-2 border-yellow-500'
                    }`}
                    animate={{
                        boxShadow: showLegacy 
                            ? ["0 0 15px rgba(255,215,0,0.4)", "0 0 30px rgba(255,215,0,0.7)", "0 0 15px rgba(255,215,0,0.4)"]
                            : ["0 0 10px rgba(255,215,0,0.3)", "0 0 25px rgba(255,215,0,0.6)", "0 0 10px rgba(255,215,0,0.3)"]
                    }}
                    transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 40px rgba(255,215,0,0.8)"
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isTransitioning ? (
                        <>✨ Entering Hall of Fame...</>
                    ) : showLegacy ? (
                        <><FaCrown className="inline mr-2" /> Exit Hall of Fame</>
                    ) : (
                        <><FaCrown className="inline mr-2" /> See Hall of Fame</>
                    )}
                </motion.button>
            </div>

            {/* Members Grid */}
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                <AnimatePresence mode="wait">
                    {filteredMembers.map((member, index) => (
                        <motion.div 
                            key={`${member.id}-${showLegacy ? 'legacy' : 'active'}`}
                            className={`p-8 rounded-2xl shadow-2xl text-center flex flex-col items-center transition-all duration-1000 relative backdrop-blur-md ${
                                showLegacy 
                                    ? 'bg-gradient-to-br from-yellow-900/30 via-black to-yellow-900/20 border-2 border-yellow-400/50 shadow-[0_0_30px_rgba(255,215,0,0.3),inset_0_0_30px_rgba(255,215,0,0.1)] hover:shadow-[0_0_50px_rgba(255,215,0,0.5),inset_0_0_40px_rgba(255,215,0,0.15)]' 
                                    : 'bg-black border-2 border-gray-300/50 shadow-[0_0_40px_rgba(209,213,219,0.4),0_0_80px_rgba(156,163,175,0.2)] hover:shadow-[0_0_60px_rgba(209,213,219,0.6),0_0_120px_rgba(156,163,175,0.3)] hover:scale-105'
                            }`}
                            initial={
                                showLegacy 
                                    ? { opacity: 0, y: 0 } 
                                    : { opacity: 0, y: 20 }
                            }
                            animate={
                                isTransitioning && !showLegacy 
                                    ? {
                                        opacity: 0,
                                        scale: 0,
                                        rotateZ: [0, 180, 360],
                                        y: [-20, 50, 200],
                                        filter: ["blur(0px)", "blur(2px)", "blur(10px)"]
                                    }
                                    : { 
                                        opacity: 1, 
                                        scale: 1,
                                        y: 0,
                                        rotateZ: 0,
                                        filter: "blur(0px)"
                                    }
                            }
                            exit={
                                !showLegacy 
                                    ? {
                                        opacity: 0,
                                        scale: 0,
                                        rotateZ: 360,
                                        y: 200,
                                        filter: "blur(10px)"
                                    }
                                    : { opacity: 0, y: 0 }
                            }
                            transition={{
                                duration: isTransitioning && !showLegacy ? 2 : (showLegacy ? 1.2 : 0.6),
                                delay: isTransitioning && !showLegacy ? index * 0.1 : (showLegacy ? index * 0.4 : index * 0.1),
                                ease: showLegacy ? "easeOut" : (isTransitioning && !showLegacy ? "easeIn" : "easeOut")
                            }}
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            style={{
                                boxShadow: showLegacy && !isTransitioning ? "0 0 25px rgba(255,215,0,0.15)" : "none"
                            }}
                        >
                            {/* Music Visualizer Background for Active Members */}
                            {!showLegacy && (
                                <>
                                    {/* Animated Equalizer Bars - Slowed Down */}
                                    <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden opacity-60">
                                        <div className="flex items-end h-full justify-center space-x-1">
                                            {[...Array(25)].map((_, barIndex) => (
                                                <motion.div
                                                    key={barIndex}
                                                    className="bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100 w-1.5 rounded-t-sm"
                                                    animate={{
                                                        height: [
                                                            `${Math.random() * 40 + 10}%`,
                                                            `${Math.random() * 70 + 20}%`,
                                                            `${Math.random() * 50 + 15}%`
                                                        ]
                                                    }}
                                                    transition={{
                                                        duration: 1.2 + Math.random() * 0.8,
                                                        repeat: Infinity,
                                                        delay: barIndex * 0.05,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

            {/* Honor Banner for Legacy Members */}
            {showLegacy && (
                <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-2xl z-50"
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    ⭐ LEGEND ⭐
                </motion.div>
            )}            {/* Visualizer Active Member Banner */}
            {!showLegacy && (
                <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 text-black px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-2xl border-2 border-gray-200/50 backdrop-blur-sm z-50"
                    initial={{ opacity: 0, y: -30, scale: 0.8 }}
                    animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        boxShadow: [
                            "0 0 20px rgba(209,213,219,0.5)",
                            "0 0 40px rgba(156,163,175,0.7)",
                            "0 0 20px rgba(209,213,219,0.5)"
                        ]
                    }}
                    transition={{ 
                        delay: index * 0.1 + 0.2, 
                        duration: 0.8,
                        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <span className="flex items-center gap-2">
                        <motion.div 
                            className="w-2 h-2 bg-black rounded-full"
                            animate={{ 
                                scale: [0.8, 1.2, 0.8],
                                opacity: [0.8, 1, 0.8]
                            }}
                            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        />
                        NOW PLAYING
                        <motion.div 
                            className="w-2 h-2 bg-black rounded-full"
                            animate={{ 
                                scale: [1.2, 0.8, 1.2],
                                opacity: [1, 0.8, 1]
                            }}
                            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </span>
                </motion.div>
            )}            {/* Member Image with Visualizer Effect */}
            <div className={`w-40 h-40 rounded-full overflow-hidden transition-all duration-1000 relative mx-auto ${
                !showLegacy ? 'border-2 border-gray-300/60 shadow-[0_0_30px_rgba(209,213,219,0.4)]' : ''
            }`}>
                <Image 
                    src={member.image} 
                    alt={member.name} 
                    width={160} 
                    height={160} 
                    loading="lazy"
                    className="object-cover w-full h-full" 
                />
                
                {/* Pulsing Audio Ring for Active Members */}
                {!showLegacy && (
                    <>
                        <motion.div 
                            className="absolute inset-0 rounded-full border-2 border-gray-300/70"
                            animate={{
                                scale: [1, 1.15, 1],
                                borderColor: [
                                    "rgba(209,213,219,0.7)",
                                    "rgba(156,163,175,0.9)",
                                    "rgba(209,213,219,0.7)"
                                ]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div 
                            className="absolute inset-2 rounded-full border border-gray-200/50"
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.4, 0.8, 0.4]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                        />
                        
                        {/* Center Audio Dot */}
                        <motion.div 
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border border-white/50 shadow-lg"
                            animate={{
                                scale: [0.8, 1.3, 0.8],
                                boxShadow: [
                                    "0 0 10px rgba(209,213,219,0.5)",
                                    "0 0 20px rgba(156,163,175,0.8)",
                                    "0 0 10px rgba(209,213,219,0.5)"
                                ]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </>
                )}
                
                {/* Honor Badge for Legacy Members */}
                {showLegacy && (
                    <motion.div
                        className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full w-12 h-12 flex items-center justify-center text-black text-xl font-bold shadow-lg"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                    >
                        <FaCrown className="text-lg" />
                    </motion.div>
                )}
                
                {/* Audio Wave Badge for Active Members */}
                {!showLegacy && (
                    <motion.div
                        className="absolute -top-2 -right-2 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full w-10 h-10 flex items-center justify-center text-white text-sm font-bold shadow-2xl border border-gray-300/50"
                        animate={{
                            scale: [1, 1.2, 1],
                            boxShadow: [
                                "0 0 15px rgba(209,213,219,0.4)",
                                "0 0 25px rgba(209,213,219,0.8)",
                                "0 0 15px rgba(209,213,219,0.4)"
                            ]
                        }}
                        transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <div className="flex space-x-0.5">
                            <motion.div 
                                className="w-0.5 h-2 bg-white rounded-full"
                                animate={{ height: ["6px", "10px", "6px"] }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div 
                                className="w-0.5 h-2 bg-white rounded-full"
                                animate={{ height: ["4px", "12px", "4px"] }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div 
                                className="w-0.5 h-2 bg-white rounded-full"
                                animate={{ height: ["8px", "6px", "8px"] }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                            />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Member Name */}
            <motion.h3 
                className={`text-2xl font-semibold mt-4 transition-colors duration-1000 ${
                    showLegacy ? 'text-yellow-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-100'
                }`}
            >
                {member.name}
            </motion.h3>

            {/* Member desc */}
            <motion.h3 
                className={`text-xl mt-2 transition-colors duration-1000 ${
                    showLegacy ? 'text-yellow-100' : 'text-gray-300'
                }`}
            >
                {member.desc}
            </motion.h3>                            {/* Stats Section */}
                            <div className="mt-4 grid grid-cols-3 gap-4 text-white">
                                <div className="flex flex-col items-center">
                                    <FaTrophy className={`text-2xl transition-colors duration-1000 ${
                                        showLegacy ? 'text-yellow-400' : 'text-amber-400'
                                    }`} />
                                    <span className={`text-3xl font-bold transition-colors duration-1000 ${
                                        showLegacy ? 'text-yellow-200' : 'text-purple-200'
                                    }`}>
                                        {member.wins}
                                    </span>
                                    <span className="text-sm text-gray-400">Wins</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <FaMusic className={`text-2xl transition-colors duration-1000 ${
                                        showLegacy ? 'text-yellow-400' : 'text-pink-400'
                                    }`} />
                                    <span className={`text-3xl font-bold transition-colors duration-1000 ${
                                        showLegacy ? 'text-yellow-200' : 'text-purple-200'
                                    }`}>
                                        {member.performances}
                                    </span>
                                    <span className="text-sm text-gray-400">Performances</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <FaClock className={`text-2xl transition-colors duration-1000 ${
                                        showLegacy ? 'text-yellow-400' : 'text-purple-400'
                                    }`} />
                                    <span className={`text-3xl font-bold transition-colors duration-1000 ${
                                        showLegacy ? 'text-yellow-200' : 'text-purple-200'
                                    }`}>
                                        {member.stageHours}
                                    </span>
                                    <span className="text-sm text-gray-400">Stage Hours</span>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="flex justify-center mt-4 space-x-4 relative z-50">
                                <a 
                                    href={member.contact.instagram} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className={`text-2xl transition-colors duration-300 relative z-50 cursor-pointer ${
                                        showLegacy ? 'text-yellow-400 hover:text-yellow-300' : 'text-pink-500 hover:text-pink-400'
                                    }`}
                                >
                                    <FaInstagram />
                                </a>
                                <a 
                                    href={`mailto:${member.contact.email}`} 
                                    className={`text-2xl transition-colors duration-300 relative z-50 cursor-pointer ${
                                        showLegacy ? 'text-yellow-400 hover:text-yellow-300' : 'text-blue-400 hover:text-blue-300'
                                    }`}
                                >
                                    <FaEnvelope />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.section>
        </>
    );
};

export default Leaderboard;
