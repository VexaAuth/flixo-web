"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Github, MessageSquare, Cpu, ShieldCheck } from "lucide-react";
import Link from "next/link";

const teamMembers = [
    {
        name: "! 𓆩Ɱr.𓆪 ⚘₊ζ͜͡N O B I T A",
        role: "Bot Owner",
        description: "Visionary creator and primary owner of the Flixo platform core.",
        discordId: "1380026050104397825",
        github: "https://github.com/",
        discord: "https://discord.gg/Zx6C6VN5Rk",
    },
    {
        name: "ANsh4Real",
        role: "Co Dev and Co Ownz",
        description: "Co-Developer and infrastructure co-owner behind Flixo's high-performance backend.",
        discordId: "1383706658315960330",
        github: "https://github.com/",
        discord: "https://discord.gg/Zx6C6VN5Rk",
    }
];

export default function TeamPage() {
    const [avatars, setAvatars] = useState<Record<string, string>>({});

    useEffect(() => {
        async function fetchAvatars() {
            for (const member of teamMembers) {
                if (!member.discordId) continue;
                try {
                    const apiUrl = process.env.NEXT_PUBLIC_BOT_API_URL;
                    const res = await fetch(`${apiUrl}/api/user/${member.discordId}`);
                    if (res.ok) {
                        const data = await res.json();
                        setAvatars(prev => ({ ...prev, [member.discordId]: data.avatarUrl }));
                    }
                } catch (e) {
                    console.error("Failed to fetch avatar for", member.discordId);
                }
            }
        }
        fetchAvatars();
    }, []);

    return (
        <div className="min-h-screen bg-black font-sans selection:bg-cyan-500/30 text-gray-200">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-cyan-900/10 blur-[150px]"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-sky-900/5 blur-[120px]"></div>
            </div>

            <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 w-full max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center max-w-2xl mx-auto"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 mb-6 shadow-2xl backdrop-blur-xl">
                        <Users className="w-10 h-10 text-cyan-400" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500">Developers</span></h1>
                    <p className="text-gray-400 text-lg font-medium leading-relaxed">
                        Meet the passionate engineers behind the magic that powers millions of streams every day.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {teamMembers.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl hover:-translate-y-2 hover:border-cyan-500/30 transition-all duration-300 group"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className="flex gap-5 items-center">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-900 to-sky-900 flex items-center justify-center border border-white/10 shadow-inner overflow-hidden relative">
                                        <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors z-10"></div>
                                        {member.discordId && avatars[member.discordId] ? (
                                            <img src={avatars[member.discordId]} alt={member.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <ShieldCheck className="w-10 h-10 text-cyan-300 relative z-10" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-black text-white line-clamp-1 break-all" title={member.name}>{member.name}</h3>
                                        <p className="text-cyan-400 font-bold text-xs sm:text-sm tracking-widest uppercase mt-1">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-400 leading-relaxed mb-8 h-16">
                                {member.description}
                            </p>

                            <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                                <Link
                                    href={member.github}
                                    target="_blank"
                                    className="p-3 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                                >
                                    <Github className="w-5 h-5" />
                                </Link>
                                <Link
                                    href={member.discord}
                                    target="_blank"
                                    className="p-3 bg-cyan-500/10 text-cyan-500 hover:text-white hover:bg-cyan-500 border border-cyan-500/20 rounded-xl transition-all"
                                >
                                    <MessageSquare className="w-5 h-5" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20 p-10 md:p-12 bg-gradient-to-r from-cyan-900/20 to-sky-900/20 border border-cyan-500/20 rounded-3xl backdrop-blur-2xl text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                    <Cpu className="w-12 h-12 text-cyan-500 mx-auto mb-6 opacity-60" />
                    <h3 className="text-3xl font-black text-white mb-4">Want to contribute?</h3>
                    <p className="text-gray-400 max-w-xl mx-auto mb-8">
                        Join our community Discord and interact with the developers. We are always looking for feedback, bug reports, and new innovative features to integrate into the core source.
                    </p>
                    <Link
                        href="https://discord.gg/Zx6C6VN5Rk"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-full transition-colors shadow-lg shadow-cyan-500/25"
                    >
                        <MessageSquare className="w-5 h-5" /> Join Discord Official
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
