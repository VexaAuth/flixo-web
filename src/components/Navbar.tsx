"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Server, List, ShieldCheck, AudioLines, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
    const path = usePathname();
    const [botMeta, setBotMeta] = useState<{ username?: string; avatarUrl?: string | null }>({});

    useEffect(() => {
        async function loadMeta() {
            try {
                const res = await fetch("/api/bot");
                if (res.ok) setBotMeta(await res.json());
            } catch (e) { }
        }
        loadMeta();
    }, []);

    const navLinks = [
        { href: "/", label: "Home", icon: <Server className="w-4 h-4" /> },
        { href: "/status", label: "Status", icon: <ShieldCheck className="w-4 h-4" /> },
        { href: "/commands", label: "Commands", icon: <List className="w-4 h-4" /> },
        { href: "/live", label: "Live Music", icon: <AudioLines className="w-4 h-4" /> },
    ];

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            {/* Floating Navigation Pill */}
            <nav className="pointer-events-auto flex items-center justify-between bg-black/50 border border-white/10 backdrop-blur-2xl rounded-full px-4 py-3 shadow-2xl shadow-cyan-900/20 w-full max-w-5xl transition-all duration-300">

                {/* Brand / Animated Equalizer Logo */}
                <Link href="/" className="flex items-center gap-3 pl-2 group">
                    {botMeta.avatarUrl ? (
                        <img src={botMeta.avatarUrl} alt="Flixo Logo" className="w-8 h-8 rounded-full border border-white/20 shadow-md group-hover:scale-110 transition-transform" />
                    ) : (
                        <div className="flex items-end gap-1 h-6 w-6">
                            {/* CSS Audio Visualizer */}
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-1.5 rounded-t-sm rounded-b-sm bg-gradient-to-t from-cyan-500 to-sky-400 group-hover:from-cyan-400 group-hover:to-white transition-colors"
                                    animate={{ height: ["8px", "24px", "8px"] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 0.6 + i * 0.15,
                                        ease: "easeInOut",
                                        delay: i * 0.1,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                    <span className="text-2xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors drop-shadow-md hidden sm:block">
                        {botMeta.username || "Flixo"}
                    </span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/5 rounded-full p-1">
                    {navLinks.map((link) => {
                        const isActive = path === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors duration-300 z-10 ${isActive ? "text-cyan-950" : "text-gray-400 hover:text-cyan-300"
                                    }`}
                            >
                                {/* Active State Sliding Pill Background */}
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-active-pill"
                                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full shadow- -z-10"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className={`relative z-10 flex items-center gap-2 ${isActive ? "text-white drop-shadow-md" : ""}`}>
                                    {link.icon}
                                    {link.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>

                {/* Invite Button */}
                <Link
                    href="https://discord.com/api/oauth2/authorize?client_id=1380994881731952741&permissions=8&scope=bot%20applications.commands"
                    target="_blank"
                >
                    <button className="relative group px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 text-white bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 overflow-hidden">
                        {/* Button Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-sky-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <Zap className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Add to Discord</span>
                        <span className="sm:hidden">Invite</span>
                    </button>
                </Link>

            </nav>
        </div>
    );
}