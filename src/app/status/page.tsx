"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Activity, Server, Clock, Music, CheckCircle2, AlertCircle, Cpu, Wifi } from "lucide-react";

export default function StatusPage() {
    const compactNumber = (num: number) => {
        return Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(num || 0);
    };
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const apiUrl = "/api-proxy";
                const res = await fetch(`${apiUrl}/api/stats`);
                if (res.ok) {
                    setStats(await res.json());
                }
            } catch (e) {
            } finally {
                setLoading(false);
            }
        }
        fetchStats();

        const interval = setInterval(fetchStats, 10000); // 10s poll
        return () => clearInterval(interval);
    }, []);

    const formatUptime = (seconds: number) => {
        if (!seconds) return "0s";
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor((seconds % (3600 * 24)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);

        const dDisplay = d > 0 ? d + "d " : "";
        const hDisplay = h > 0 ? h + "h " : "";
        const mDisplay = m > 0 ? m + "m " : "";
        const sDisplay = s > 0 ? s + "s" : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
    };

    // Animation variants for smooth staggered loading
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="min-h-screen bg-black font-sans selection:bg-cyan-500/30 text-gray-200">
            {/* Modern Ambient Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top- left- w- h- rounded-full bg-cyan-900/20 blur-"></div>
                <div className="absolute bottom- right- w- h- rounded-full bg-sky-900/10 blur-"></div>
            </div>

            <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 mb-6 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl">
                            <Activity className="w-10 h-10 text-cyan-400" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg tracking-tight">
                            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500">Status</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                            Real-time metrics and operational insights across our global infrastructure.
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
                            <div className="text-cyan-500/50 font-bold tracking-widest uppercase text-sm animate-pulse">Fetching Telemetry...</div>
                        </div>
                    ) : !stats ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-red-500/10 border border-red-500/20 rounded-3xl p-10 text-center text-red-400 max-w-2xl mx-auto backdrop-blur-md"
                        >
                            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
                            <p className="text-2xl font-bold mb-2 text-white">Major Outage Detected</p>
                            <p className="text-red-400/80 font-medium">Unable to connect to the primary backend infrastructure. Our engineers are investigating.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="space-y-8"
                        >
                            {/* Global Operational Banner */}
                            <motion.div variants={itemVariants} className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <div className="relative flex h-4 w-4">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
                                    </div>
                                    <span className="text-cyan-400 font-bold text-lg tracking-wide">All Systems Operational</span>
                                </div>
                                <div className="text-sm font-semibold text-cyan-500/60 uppercase tracking-wider flex items-center gap-2">
                                    <Wifi className="w-4 h-4" /> Live Updates
                                </div>
                            </motion.div>

                            {/* Metrics Grid */}
                            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 group">
                                    <div className="flex items-center gap-3 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                        <Clock className="w-5 h-5 text-cyan-400" />
                                        <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Uptime</p>
                                    </div>
                                    <p className="text-3xl font-black text-white font-mono">{formatUptime(stats.uptime)}</p>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 group">
                                    <div className="flex items-center gap-3 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                        <Activity className="w-5 h-5 text-sky-400" />
                                        <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Latency</p>
                                    </div>
                                    <p className="text-3xl font-black text-white font-mono flex items-end gap-1">
                                        {stats.ping} <span className="text-base text-gray-500 mb-1">ms</span>
                                    </p>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 group">
                                    <div className="flex items-center gap-3 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                        <Server className="w-5 h-5 text-teal-400" />
                                        <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Networks</p>
                                    </div>
                                    <p className="text-3xl font-black text-white font-mono">{compactNumber(stats.servers)}</p>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 group">
                                    <div className="flex items-center gap-3 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                        <Music className="w-5 h-5 text-indigo-400" />
                                        <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Active Streams</p>
                                    </div>
                                    <p className="text-3xl font-black text-white font-mono">{compactNumber(stats.players)}</p>
                                </div>
                            </motion.div>

                            {/* Shard Information */}
                            <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <Cpu className="w-7 h-7 text-gray-300" />
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Node Cluster Status</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {(stats.shards || [{ id: 0, ping: stats.ping, servers: stats.servers, users: stats.users, status: 0 }]).map((shard: any) => (
                                        <div key={shard.id} className="bg-black/40 border border-white/5 rounded-2xl p-6 hover:border-cyan-500/20 transition-colors">
                                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                                    Shard <span className="text-cyan-400">#{shard.id ?? 0}</span>
                                                </h3>
                                                <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 rounded-full text-xs font-bold text-cyan-400 uppercase tracking-wide border border-cyan-500/20">
                                                    <CheckCircle2 className="w-3 h-3" /> {shard.status === 0 ? "Online" : shard.status === 1 ? "Connecting" : "Offline"}
                                                </div>
                                            </div>

                                            <div className="space-y-4 text-sm font-medium">
                                                <div className="flex justify-between items-center group">
                                                    <span className="text-gray-500 group-hover:text-gray-400 transition-colors">Heartbeat</span>
                                                    <span className="text-white font-mono bg-white/5 px-2 py-1 rounded-md">{shard.ping ?? 0}ms</span>
                                                </div>
                                                <div className="flex justify-between items-center group">
                                                    <span className="text-gray-500 group-hover:text-gray-400 transition-colors">Cached Guilds</span>
                                                    <span className="text-white font-mono bg-white/5 px-2 py-1 rounded-md">{compactNumber(shard.servers)}</span>
                                                </div>
                                                <div className="flex justify-between items-center group">
                                                    <span className="text-gray-500 group-hover:text-gray-400 transition-colors">Total Users</span>
                                                    <span className="text-white font-mono bg-white/5 px-2 py-1 rounded-md">{compactNumber(shard.users)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}