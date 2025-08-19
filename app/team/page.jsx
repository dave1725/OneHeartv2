'use client';
import { motion } from "framer-motion";
import { FaInstagram, FaDiscord } from "react-icons/fa";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const coreTeam = [
    { role: "Mentor", name: "Mr.Venkat", image: "https://oneheart123.club-music.workers.dev/?id=1088JYRKku2ZbhYwLZJwwl1Qpc_0Iy2Fa&sz=w1000" , socials: { discord: "musicteacher1" } },
    { role: "Convener", name: "Prasanna", image: "https://oneheart123.club-music.workers.dev/?id=1G1uZ1_MOhgvNCtB-QfqT4ix1RrowHCZH&sz=w1000", socials: { instagram: "https://www.instagram.com/prassu_k.k/", discord: "prassukk" } },
    { role: "Co-Convener", name: "Sadia", image: "https://oneheart123.club-music.workers.dev/?id=1m_GYI6aVvjv85bzDiLU06sg-zp87y2-0&sz=w1000", socials: { instagram: "https://www.instagram.com/sadi.sera/", discord: "sadia.sera_36002" } },
    { role: "Co-Convener", name: "Murali", image: "https://oneheart123.club-music.workers.dev/?id=1AzDSC-YC81gHAhi3opcwhQ7m43yG_jLz&sz=w1000", socials: { instagram: "https://www.instagram.com/muralixa/", discord: "murali_4_music" } },
];

const socialMediaTeam= [
    { role: "Social Media Head", name: "[Name]", image: "https://oneheart123.club-music.workers.dev/?id=1G1uZ1_MOhgvNCtB-QfqT4ix1RrowHCZH&sz=w1000", socials: { instagram: "https://www.instagram.com/username/", discord: "username" } },
    { role: "Website Lead", name: "[Name]", image: "https://oneheart123.club-music.workers.dev/?id=1G1uZ1_MOhgvNCtB-QfqT4ix1RrowHCZH&sz=w1000", socials: { instagram: "https://www.instagram.com/username/", discord: "username" } },
    { role: "Website Lead", name: "[Name]", image: "https://oneheart123.club-music.workers.dev/?id=1G1uZ1_MOhgvNCtB-QfqT4ix1RrowHCZH&sz=w1000", socials: { instagram: "https://www.instagram.com/username/", discord: "username" } },
    { role: "Website Lead", name: "[Name]", image: "https://oneheart123.club-music.workers.dev/?id=1G1uZ1_MOhgvNCtB-QfqT4ix1RrowHCZH&sz=w1000", socials: { instagram: "https://www.instagram.com/username/", discord: "username" } },

];

const handleDiscordClick = (username) => {
    toast.success(`Reach me @${username}`, {
        duration: 5000,
        position: "top-center",
    });
};

const TeamSection = () => {
    return (
        <>
        <div id="team" className="mb-20"></div>
        <section className="txt-white py-12 h-min-screen">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">Meet Our Core Team</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {coreTeam.map((member, index) => (
                        <motion.div 
                            key={index} 
                            className="p-6 rounded-lg shadow-lg text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="w-50 h-50 bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden">
                            <Image
                                src={member.image} 
                                alt={member.name} 
                                width={128} 
                                height={128} 
                                loading="lazy"
                                className="object-cover w-full h-full"        
                            />
                            </div>
                            <h3 className="text-2xl font-semibold">{member.name}</h3>
                            <p className="text-sm text-gray-400">{member.role}</p>

                            {/* Socials */}
                            <div className="flex justify-center mt-4 space-x-4">
                                {member.socials && member.socials.instagram && (
                                    <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400 text-2xl">
                                        <FaInstagram size={35} />
                                    </a>
                                )}
                                {member.socials && member.socials.discord && (
                                    <button
                                        onClick={() => handleDiscordClick(member.socials.discord)}
                                        className="text-blue-500 hover:text-blue-400 text-2xl"
                                    >
                                        <FaDiscord size={35}/>
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Social Media Team Section */}
                <div className="mt-16">
                    <h3 className="text-3xl font-bold mb-8">Social Media Team</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {socialMediaTeam.map((member, index) => (
                            <motion.div 
                                key={index} 
                                className="p-6 rounded-lg shadow-lg text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="w-50 h-50 bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden">
                                    <Image
                                        src={member.image} 
                                        alt={member.name} 
                                        width={128} 
                                        height={128} 
                                        loading="lazy"
                                        className="object-cover w-full h-full"        
                                    />
                                </div>
                                <h3 className="text-2xl font-semibold">{member.name}</h3>
                                <p className="text-sm text-gray-400">{member.role}</p>

                                {/* Socials */}
                                <div className="flex justify-center mt-4 space-x-4">
                                    {member.socials && member.socials.instagram && (
                                        <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400 text-2xl">
                                            <FaInstagram size={35} />
                                        </a>
                                    )}
                                    {member.socials && member.socials.discord && (
                                        <button
                                            onClick={() => handleDiscordClick(member.socials.discord)}
                                            className="text-blue-500 hover:text-blue-400 text-2xl"
                                        >
                                            <FaDiscord size={35}/>
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Toaster for notifications */}
            <Toaster
                toastOptions={{
                    style: {
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                        fontStyle: "italic",
                        color: "black",
                        borderRadius: "8px",
                        padding: "12px",
                    }
                }}
            />
        </section>
        </>
    );
};

export default TeamSection;
