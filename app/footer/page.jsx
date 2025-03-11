"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`fixed bottom-0 left-0 items-center justify-center w-full transition-transform duration-500 ease-in-out bg-black text-white py-3 px-6 shadow-lg ${visible ? "translate-y-0" : "translate-y-full"}`}
    >
      <p className="text-center text-sm">© 2025 OneHeart. All Rights Reserved.</p>
      {/* <div className="max-w-7xl h-[50px]mx-auto flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-2xl font-bold">OneHeart</h2>
         <nav className="flex space-x-6 mt-2 md:mt-0">
          <Link href="/" className="hover:text-gray-400 transition">Home</Link>
          <Link href="/events" className="hover:text-gray-400 transition">Events</Link>
          <Link href="/members" className="hover:text-gray-400 transition">Members</Link>
          <Link href="/contact" className="hover:text-gray-400 transition">Contact</Link>
        </nav> 
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-pink-500 transition">
            <FaInstagram />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-red-500 transition">
            <FaYoutube />
          </a>
          <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-green-500 transition">
            <FaWhatsapp />
          </a>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
