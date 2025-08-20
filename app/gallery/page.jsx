"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaTimes, FaPlay, FaCalendarAlt, FaTag, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { eventGallery, galleryCategories } from "./constants";
import Navbar from "../navbar/page";

const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredEvents, setFilteredEvents] = useState(eventGallery);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Filter events based on selected category
    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredEvents(eventGallery);
        } else {
            setFilteredEvents(eventGallery.filter(event => event.category === selectedCategory));
        }
    }, [selectedCategory]);

    // Open event gallery
    const openEventGallery = (event) => {
        setSelectedEvent(event);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'hidden';
    };

    // Close event gallery
    const closeEventGallery = () => {
        setSelectedEvent(null);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'auto';
    };

    // Navigate through images in the selected event
    const navigateImage = (direction) => {
        if (!selectedEvent) return;
        
        const totalImages = selectedEvent.images.length;
        const newIndex = direction === 'next' 
            ? (currentImageIndex + 1) % totalImages
            : (currentImageIndex - 1 + totalImages) % totalImages;
        
        setCurrentImageIndex(newIndex);
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!selectedEvent) return;
            
            if (e.key === 'Escape') closeEventGallery();
            if (e.key === 'ArrowLeft') navigateImage('prev');
            if (e.key === 'ArrowRight') navigateImage('next');
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedEvent, currentImageIndex]);

    return (
        <>
            <Navbar />
            <section className="bg-black text-white py-20 px-4 min-h-screen">
                <div className="container mx-auto max-w-7xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            Event <span className="text-red-500">Gallery</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Relive the magic of OneHeart's most memorable moments through our stunning event gallery
                        </p>
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4 mb-12"
                    >
                        {galleryCategories.map((category) => (
                            <motion.button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                                    selectedCategory === category.id
                                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                {category.name}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Gallery Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedCategory}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {filteredEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group relative overflow-hidden rounded-2xl bg-gray-900 cursor-pointer"
                                    onClick={() => openEventGallery(event)}
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={event.thumbnail}
                                            alt={event.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        />
                                        
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                                                    {event.title}
                                                </h3>
                                                <p className="text-gray-300 text-sm line-clamp-2">
                                                    {event.description}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                                                    <span>{event.images.length} photos</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Play Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-red-600 rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                                <FaPlay className="text-white text-2xl ml-1" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Event Info */}
                                    <div className="p-4">
                                        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-red-400 transition-colors">
                                            {event.title}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt />
                                                <span>{event.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaTag />
                                                <span className="capitalize">{event.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* No Results */}
                    {filteredEvents.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <h3 className="text-2xl text-gray-400 mb-4">No events found</h3>
                            <p className="text-gray-500">Try selecting a different category</p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Event Gallery Modal with Image Slider */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex flex-col"
                        onClick={closeEventGallery}
                    >
                        <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 bg-black/50 backdrop-blur-sm">
                                <div className="flex-1 mb-3 sm:mb-0">
                                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{selectedEvent.title}</h2>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-400 text-sm">
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-xs" />
                                            <span>{selectedEvent.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaTag className="text-xs" />
                                            <span className="capitalize">{selectedEvent.category}</span>
                                        </div>
                                        <span className="text-red-400 font-medium">{currentImageIndex + 1} of {selectedEvent.images.length}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={closeEventGallery}
                                    className="bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-colors self-start sm:self-auto ml-0 sm:ml-4"
                                >
                                    <FaTimes size={18} />
                                </button>
                            </div>

                            {/* Main Image Display */}
                            <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
                                <div className="relative w-full h-full max-w-5xl max-h-[70vh]" onClick={(e) => e.stopPropagation()}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentImageIndex}
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative w-full h-full"
                                        >
                                            <Image
                                                src={selectedEvent.images[currentImageIndex]}
                                                alt={`${selectedEvent.title} - Image ${currentImageIndex + 1}`}
                                                fill
                                                className="object-contain rounded-lg"
                                                sizes="(max-width: 768px) 100vw, 80vw"
                                                priority
                                            />
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Navigation Buttons */}
                                    {selectedEvent.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                                            >
                                                <FaChevronLeft size={20} />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                                            >
                                                <FaChevronRight size={20} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnail Strip */}
                            {selectedEvent.images.length > 1 && (
                                <div className="p-3 sm:p-4 bg-black/30 backdrop-blur-sm">
                                    <div className="flex gap-2 justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-hide">
                                        {selectedEvent.images.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                                                className={`relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                                    index === currentImageIndex 
                                                        ? 'border-red-500 scale-110' 
                                                        : 'border-transparent hover:border-gray-400'
                                                }`}
                                            >
                                                <Image
                                                    src={image}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 640px) 48px, 64px"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Event Description */}
                            <div className="p-4 sm:p-6 bg-black/30 backdrop-blur-sm">
                                <p className="text-gray-300 text-center max-w-2xl mx-auto text-sm sm:text-base">
                                    {selectedEvent.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Gallery;
