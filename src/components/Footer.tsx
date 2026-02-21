"use client";

import Link from "next/link";
import { Music, ShieldCheck, Heart, User, FileText, Lock } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative mt-32 z-10 w-full overflow-hidden">
            {/* Top Border Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

            <div className="bg-black/50 border-t border-white/5 backdrop-blur-xl relative">
                <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                        {/* Brand Section */}
                        <div className="md:col-span-2">
                            <Link href="/" className="flex items-center gap-3 group w-fit mb-4">
                                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                                    <Music className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-2xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                                    Flixo
                                </span>
                            </Link>
                            <p className="text-gray-400 text-sm max-w-sm leading-relaxed mb-6">
                                The premium music companion for your Discord server. Delivering high-quality audio and a seamless listening experience.
                            </p>
                            <p className="flex items-center gap-2 text-sm text-gray-500 font-medium tracking-wide">
                                Engineered with <Heart className="w-4 h-4 text-pink-500 fill-pink-500/20" /> by Flixo Development
                            </p>
                        </div>

                        {/* Links Section 1 */}
                        <div>
                            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                <User className="w-4 h-4 text-cyan-500" /> Platform
                            </h4>
                            <ul className="space-y-3">
                                <li><Link href="/" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Home</Link></li>
                                <li><Link href="/commands" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Commands</Link></li>
                                <li><Link href="/status" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">System Status</Link></li>
                                <li><Link href="/team" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Developers</Link></li>
                            </ul>
                        </div>

                        {/* Links Section 2 */}
                        <div>
                            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-cyan-500" /> Legal & Support
                            </h4>
                            <ul className="space-y-3">
                                <li><Link href="/terms" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors flex items-center gap-2"><FileText className="w-3 h-3" /> Terms of Service</Link></li>
                                <li><Link href="/privacy" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors flex items-center gap-2"><Lock className="w-3 h-3" /> Privacy Policy</Link></li>
                                <li><Link href="https://discord.gg/Zx6C6VN5Rk" target="_blank" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Support Server</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="border-t border-white/5 py-6">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Flixo. All rights reserved. Not affiliated with Discord.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
