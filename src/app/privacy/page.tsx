"use client";

import { motion } from "framer-motion";
import { Lock, EyeOff, Shield, Server, Database, Activity, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-black font-sans selection:bg-cyan-500/30 text-gray-200">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-cyan-900/10 blur-[150px]"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-sky-900/5 blur-[120px]"></div>
            </div>

            <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 w-full max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 mb-6 shadow-2xl backdrop-blur-xl">
                        <Lock className="w-10 h-10 text-cyan-400" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500">Policy</span></h1>
                    <p className="text-gray-400 text-lg font-medium">Protecting your digital footprint. Last updated: {new Date().toLocaleDateString()}</p>
                </motion.div>

                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="p-8 bg-black/40 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl space-y-4 hover:border-cyan-500/30 transition-colors"
                    >
                        <Shield className="w-8 h-8 text-cyan-500 mb-2" />
                        <h3 className="text-2xl font-bold text-white">We Value Privacy</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Flixo operates under the principle of data minimization. We only collect the essential information required to keep our music services operational in your Discord server. We do not sell, trade, or otherwise transfer your data.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="p-8 bg-black/40 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl space-y-4 hover:border-cyan-500/30 transition-colors"
                    >
                        <EyeOff className="w-8 h-8 text-cyan-500 mb-2" />
                        <h3 className="text-2xl font-bold text-white">No Message Logging</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Flixo does not log your Discord messages. We only listen to predefined `/ slash commands`. Our systems never store or analyze the content of conversations occurring in your text channels.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-12"
                >
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                            <Database className="w-6 h-6 text-cyan-500" /> Information We Store
                        </h2>
                        <ul className="grid gap-4">
                            <li className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                                <div>
                                    <strong className="text-white block mb-1">Server Data</strong>
                                    <span className="text-gray-400 text-sm">Guild ID, Guild Name (cached), configurations, blacklisted roles/channels.</span>
                                </div>
                            </li>
                            <li className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                                <div>
                                    <strong className="text-white block mb-1">User Data</strong>
                                    <span className="text-gray-400 text-sm">User ID for saved playlists, favorites, and command cooldown tracking.</span>
                                </div>
                            </li>
                            <li className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                                <div>
                                    <strong className="text-white block mb-1">Analytics</strong>
                                    <span className="text-gray-400 text-sm">Anonymous counts of music streaming activity, commands used, and session lengths to compute global "Top Hits" and bot statistics.</span>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                            <Activity className="w-6 h-6 text-cyan-500" /> Data Deletion
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            If you wish to have your server's data or personal user data (such as playlists) purged from the Flixo database, you can join our Discord Support Server and open a ticket. Server data naturally expires or is removed when the bot leaves the guild.
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
}
