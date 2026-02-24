"use client";

import { useEffect, useState } from "react";
import { Play, Search, Disc, Pause, Headphones, Volume2, Activity, Music, Radio, Trophy, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const formatNumber = (num: number) => {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return num.toString();
};

export default function LiveMusicPage() {
    const [query, setQuery] = useState("");
    const [player, setPlayer] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [globalStats, setGlobalStats] = useState<{ topTracks: any[], recentTracks: any[] }>({ topTracks: [], recentTracks: [] });

    const searchPlayer = async () => {
        if (!query) return;
        setLoading(true);
        setError("");
        setPlayer(null);

        try {
            const apiUrl = "/api-proxy";
            let res = await fetch(`${apiUrl}/api/player/${query}`);
            let data = await res.json();

            if (!data.isConnected && !data.isPlaying) {
                res = await fetch(`${apiUrl}/api/user-player/${query}`);
                data = await res.json();
            }

            if (data.isConnected || data.isPlaying || data.currentTrack) {
                setPlayer(data);
            } else {
                setError("No active music session found for this ID.");
            }
        } catch (e) {
            setError("Failed to connect to the backend server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        async function fetchGlobalStats() {
            try {
                const apiUrl = "/api-proxy";
                const res = await fetch(`${apiUrl}/api/music-stats`);
                if (res.ok) setGlobalStats(await res.json());
            } catch (e) { }
        }

        fetchGlobalStats();

        const interval = setInterval(async () => {
            fetchGlobalStats();

            if (player) {
                try {
                    const apiUrl = "/api-proxy";
                    const res = await fetch(`${apiUrl}/api/player/${player.guildId || query}`);
                    const data = await res.json();
                    if (data.isConnected || data.isPlaying || data.currentTrack) {
                        setPlayer(data);
                    } else {
                        setPlayer(null);
                        setError("Music session ended.");
                    }
                } catch (e) { }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [player, query]);

    const formatTime = (ms: number) => {
        if (!ms) return "0:00";
        const totalSeconds = Math.floor(ms / 1000);
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="min-h-screen bg-black font-sans selection:bg-cyan-500/30 text-gray-200">
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-[20rem] md:w-[30rem] h-[20rem] md:h-[30rem] rounded-full bg-cyan-900/20 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-[20rem] md:w-[30rem] h-[20rem] md:h-[30rem] rounded-full bg-sky-900/10 blur-3xl"></div>
            </div>

            <div className="relative z-10 pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 w-full flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl w-full mx-auto text-center mb-10 md:mb-12"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 mb-6 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl">
                        <Radio className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg tracking-tight">
                        Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500">Music</span>
                    </h1>
                    <p className="text-gray-400 text-sm md:text-xl font-medium max-w-2xl mx-auto px-2">
                        Track a server session or discover top hits streaming on the network right now.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full max-w-2xl mx-auto mb-12 md:mb-16 relative group"
                >
                    <div className="absolute inset-y-0 left-4 md:left-5 flex items-center pointer-events-none">
                        <Search className="w-5 h-5 text-cyan-500/50 group-focus-within:text-cyan-400 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Discord Server ID or User ID..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && searchPlayer()}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-4 md:py-5 pl-12 md:pl-14 pr-28 md:pr-36 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 focus:ring-1 focus:ring-cyan-500/50 backdrop-blur-md transition-all font-medium text-sm md:text-lg shadow-2xl"
                    />
                    <button
                        onClick={searchPlayer}
                        disabled={loading || !query}
                        className="absolute right-1.5 md:right-2.5 top-1.5 md:top-2.5 bottom-1.5 md:bottom-2.5 bg-gradient-to-r from-cyan-500 to-sky-600 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:hover:shadow-none text-white px-5 md:px-8 rounded-full font-bold transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                        {loading ? <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Track"}
                    </button>
                </motion.div>

                <AnimatePresence mode="wait">
                    {error && !loading && !player && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-red-500/10 border border-red-500/20 p-4 md:p-5 rounded-2xl max-w-lg w-full text-center text-red-400 font-bold mb-10 backdrop-blur-md text-sm md:text-base"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {player && player.currentTrack && (
                        <motion.div
                            key="player"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-[2rem] p-6 md:p-10 relative overflow-hidden mb-16 shadow-2xl backdrop-blur-xl"
                        >
                            {player.currentTrack.thumbnail && (
                                <div
                                    className="absolute inset-0 opacity-20 bg-cover bg-center blur-3xl z-0 scale-110"
                                    style={{ backgroundImage: `url(${player.currentTrack.thumbnail})` }}
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-0"></div>

                            <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 items-center text-center md:text-left">
                                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 bg-black/50 border border-white/10 flex items-center justify-center group">
                                    {player.currentTrack.thumbnail ? (
                                        <img src={player.currentTrack.thumbnail} alt="Thumbnail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    ) : (
                                        <Disc className={`w-20 h-20 md:w-24 md:h-24 text-cyan-400 opacity-50 ${player.isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                        <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center border border-white/30 text-white">
                                            {player.isPlaying ? <Pause className="w-6 h-6 md:w-8 md:h-8" /> : <Play className="w-6 h-6 md:w-8 md:h-8 ml-1" />}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 w-full flex flex-col justify-center">
                                    <div className="inline-flex items-center justify-center md:justify-start gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 border border-cyan-500/20 self-center md:self-start">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                        </span>
                                        Now Streaming
                                    </div>

                                    <h2 className="text-2xl md:text-4xl font-black text-white mb-2 leading-tight drop-shadow-md line-clamp-2">
                                        {player.currentTrack.title}
                                    </h2>
                                    <p className="text-base md:text-xl text-gray-400 font-medium mb-6 md:mb-8">
                                        {player.currentTrack.author}
                                    </p>

                                    <div className="w-full h-2 md:h-2.5 bg-white/10 rounded-full mb-2 md:mb-3 overflow-hidden backdrop-blur-sm relative">
                                        <div
                                            className="h-full bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] relative transition-all duration-500"
                                            style={{ width: `${(player.position / player.duration) * 100}%` }}
                                        >
                                            <div className="absolute right-0 top-0 bottom-0 w-1.5 md:w-2 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs md:text-sm text-gray-400 font-mono font-medium mb-6 md:mb-8 px-1">
                                        <span>{formatTime(player.position)}</span>
                                        <span>{formatTime(player.duration)}</span>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-5 text-xs md:text-sm text-gray-300 font-bold w-full">
                                        <div className="flex flex-1 md:flex-none justify-center items-center gap-2 bg-white/5 px-4 py-2.5 rounded-xl border border-white/5">
                                            <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" /> {player.volume}%
                                        </div>
                                        <div className="flex flex-1 md:flex-none justify-center items-center gap-2 bg-white/5 px-4 py-2.5 rounded-xl border border-white/5">
                                            <Headphones className="w-4 h-4 md:w-5 md:h-5 text-sky-400" /> {formatNumber(player.memberCount || 0)} Listening
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!player && (
                    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-8 backdrop-blur-xl flex flex-col min-h-[20rem] md:min-h-[24rem]">
                            <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-6 border-b border-white/10 pb-4 md:pb-5">
                                <Activity className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Active Streams</h3>
                                <span className="ml-auto flex items-center gap-1.5 md:gap-2 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] md:text-xs font-bold uppercase tracking-wide rounded-full border border-emerald-500/20">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse"></div> Live
                                </span>
                            </div>

                            {!globalStats.recentTracks || globalStats.recentTracks.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                                    <Music className="w-10 h-10 md:w-12 md:h-12 mb-3 opacity-20" />
                                    <p className="font-medium text-sm md:text-base">No active streams found.</p>
                                </div>
                            ) : (
                                <motion.div
                                    variants={containerVariants} initial="hidden" animate="show"
                                    className="space-y-2.5 md:space-y-3 flex-1 overflow-y-auto pr-1 md:pr-2 custom-scrollbar"
                                >
                                    {globalStats.recentTracks.map((track, i) => (
                                        <motion.div
                                            variants={itemVariants} key={i}
                                            className="group flex gap-3 md:gap-4 p-2.5 md:p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-cyan-500/30 transition-all cursor-pointer items-center"
                                        >
                                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-black/40 overflow-hidden flex-shrink-0 flex items-center justify-center relative shadow-inner">
                                                {track.thumbnail ? <img src={track.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /> : <Music className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />}
                                                {track.isPlaying && (
                                                    <div className="absolute bottom-1 right-1 w-2.5 h-2.5 md:w-3 md:h-3 bg-emerald-500 rounded-full animate-ping"></div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                <h4 className="text-white font-bold text-sm md:text-base line-clamp-1 group-hover:text-cyan-400 transition-colors">{track.title}</h4>
                                                <p className="text-gray-400 text-xs md:text-sm font-medium line-clamp-1 mt-0.5">{track.author}</p>
                                            </div>
                                            <div className="flex items-center pr-1 md:pr-2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex">
                                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-cyan-500" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-8 backdrop-blur-xl flex flex-col min-h-[20rem] md:min-h-[24rem]">
                            <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-6 border-b border-white/10 pb-4 md:pb-5">
                                <Trophy className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
                                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Top Played Hits</h3>
                            </div>

                            {!globalStats.topTracks || globalStats.topTracks.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                                    <div className="w-6 h-6 md:w-8 md:h-8 border-4 border-white/10 border-t-white/30 rounded-full animate-spin mb-3 md:mb-4"></div>
                                    <p className="font-medium text-sm md:text-base">Aggregating statistics...</p>
                                </div>
                            ) : (
                                <motion.div
                                    variants={containerVariants} initial="hidden" animate="show"
                                    className="space-y-2.5 md:space-y-3 flex-1 overflow-y-auto pr-1 md:pr-2 custom-scrollbar"
                                >
                                    {globalStats.topTracks.map((track, i) => (
                                        <motion.div
                                            variants={itemVariants} key={i}
                                            className="group flex gap-3 md:gap-4 p-2.5 md:p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-amber-500/30 transition-all cursor-pointer items-center"
                                        >
                                            <div className={`text-lg md:text-xl font-black w-6 md:w-8 text-center tabular-nums ${i === 0 ? 'text-amber-400' : i === 1 ? 'text-gray-300' : i === 2 ? 'text-orange-400' : 'text-gray-600'}`}>
                                                {i + 1}
                                            </div>
                                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-black/40 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-inner">
                                                {track.thumbnail ? <img src={track.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /> : <Music className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-bold text-sm md:text-base line-clamp-1 group-hover:text-amber-400 transition-colors">{track.title}</h4>
                                                <p className="text-gray-400 text-xs md:text-sm font-medium line-clamp-1 mt-0.5">{track.author}</p>
                                            </div>
                                            <div className="px-1 md:px-2">
                                                <div className="px-2 md:px-3 py-1 md:py-1.5 bg-white/5 rounded-lg text-[10px] md:text-xs font-bold text-gray-300 flex items-center gap-1 md:gap-1.5 border border-white/10 group-hover:border-amber-500/20 group-hover:text-amber-400 transition-colors">
                                                    <Play className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" /> {formatNumber(track.count || 0)}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}