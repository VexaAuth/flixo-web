"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Server, Users, Settings, Headphones, ShieldCheck, Gamepad2, Heart, Trophy, Crown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [stats, setStats] = useState({ servers: 0, users: 0, commands: 0, ping: 0 });
  const [topGuilds, setTopGuilds] = useState<any[]>([]);
  const [botMeta, setBotMeta] = useState<{ username?: string; avatarUrl?: string | null }>({});
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const botMetaRes = await fetch("/api/bot");
        if (botMetaRes.ok) setBotMeta(await botMetaRes.json());
      } catch (e) {}

      try {
        const apiUrl = "/api-proxy";

        const statsRes = await fetch(`${apiUrl}/api/stats`);
        if (statsRes.ok) {
          const data = await statsRes.json();
          setStats(data);
        }

        const topRes = await fetch(`${apiUrl}/api/top-servers`);
        if (topRes.ok) {
          const { servers } = await topRes.json();
          setTopGuilds(servers || []);
        }
      } catch (e) {
        console.error("Bot API appears to be offline or CORS blocked.", e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  useEffect(() => {
    if (topGuilds.length === 0 || isPaused) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % topGuilds.length);
    }, 3500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [topGuilds, isPaused]);

  const goTo = (index: number) => {
    setActiveIndex((index + topGuilds.length) % topGuilds.length);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % topGuilds.length);
    }, 3500);
  };

  const statCards = [
    { label: "Servers", value: stats.servers.toLocaleString(), icon: Server, color: "text-cyan-400" },
    { label: "Users", value: stats.users.toLocaleString(), icon: Users, color: "text-purple-400" },
    { label: "Commands", value: stats.commands, icon: Settings, color: "text-orange-400" },
    { label: "Ping", value: `${stats.ping}ms`, icon: Music, color: "text-pink-400" },
  ];

  const getRankIcon = (i: number) => {
    if (i === 0) return <Crown className="w-4 h-4 text-yellow-400" />;
    if (i === 1) return <Trophy className="w-4 h-4 text-gray-300" />;
    if (i === 2) return <Trophy className="w-4 h-4 text-amber-600" />;
    return <span className="text-xs font-black text-gray-500">#{i + 1}</span>;
  };

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-cyan-500/30 text-gray-200">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[45rem] h-[45rem] rounded-full bg-cyan-900/10 blur-[120px] mix-blend-screen transition-opacity duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] rounded-full bg-sky-900/10 blur-[100px] mix-blend-screen transition-opacity duration-1000"></div>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-blue-900/5 blur-[150px]"
        />
      </div>

      <div className="relative z-10 pt-40 pb-20 px-4 sm:px-6 flex flex-col items-center">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100, damping: 20 }}
          className="text-center max-w-5xl mx-auto mb-20"
        >
          <motion.div
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="flex justify-center mb-10"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-32 h-32 rounded-3xl bg-black/60 border border-white/10 flex items-center justify-center p-1 shadow-2xl backdrop-blur-xl">
                {botMeta.avatarUrl ? (
                  <img src={botMeta.avatarUrl} alt="Bot Avatar" className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-14 h-14 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
                )}
              </div>
            </div>
          </motion.div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter text-white drop-shadow-2xl flex flex-col items-center justify-center">
            <span className="text-gray-200">Meet</span>
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-transparent bg-clip-text drop-shadow-lg filter pb-2">
              {botMeta.username || "Flixo"}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-3xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            A premium, high-quality music companion for your Discord server. Designed with elegance and built for reliable playback.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-6"
          >
            <Link
              href="https://discord.com/api/oauth2/authorize?client_id=1380994881731952741&permissions=8&scope=bot%20applications.commands"
              target="_blank"
              className="group relative px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <Gamepad2 className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Add to Discord</span>
            </Link>
            <Link
              href="https://discord.gg/Zx6C6VN5Rk"
              target="_blank"
              className="px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 bg-black/40 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:-translate-y-1 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-md"
            >
              <ShieldCheck className="w-6 h-6 text-cyan-400" /> Support Server
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl mb-32"
        >
          {statCards.map((stat, idx) => (
            <div key={idx} className="bg-white/5 border border-white/5 p-8 rounded-3xl text-center hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color} opacity-80`} />
              <h3 className="text-4xl font-bold text-white mb-1">{loading ? "..." : stat.value}</h3>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Top 10 Servers Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-5xl"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Top Networks</h2>
            <p className="text-gray-400 font-medium text-lg">The top 10 largest communities using our ecosystem.</p>
          </div>

          {loading ? (
            <div className="text-center text-cyan-500/50 py-10 font-bold animate-pulse tracking-widest uppercase">Loading network data...</div>
          ) : topGuilds.length === 0 ? (
            <div className="bg-white/5 border border-white/5 rounded-3xl p-10 text-center text-gray-400">
              <p className="mb-2 font-medium">No network data found or API is offline.</p>
              <p className="text-sm opacity-60">Please ensure the backend systems are operational.</p>
            </div>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Main Carousel Card */}
              <div className="relative h-72 rounded-3xl overflow-hidden mb-6">
                <AnimatePresence mode="wait">
                  {topGuilds.map((g, i) =>
                    i === activeIndex ? (
                      <motion.div
                        key={g.id || i}
                        initial={{ opacity: 0, x: 60, scale: 0.97 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -60, scale: 0.97 }}
                        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute inset-0 bg-white/5 border border-white/5 rounded-3xl p-10 flex items-center gap-10 backdrop-blur-sm"
                      >
                        {/* Rank badge */}
                        <div className="absolute top-6 left-8 flex items-center gap-2 bg-black/40 border border-white/10 rounded-full px-4 py-1.5">
                          {getRankIcon(i)}
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            {i === 0 ? "Top Server" : i === 1 ? "2nd Place" : i === 2 ? "3rd Place" : `Rank #${i + 1}`}
                          </span>
                        </div>

                        {/* Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent rounded-3xl pointer-events-none" />
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                        {/* Icon */}
                        <div className="shrink-0 w-32 h-32 rounded-2xl bg-black/50 border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl">
                          {g.icon ? (
                            <img src={g.icon} alt={g.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center text-5xl font-black text-white/30">
                              {g.name?.charAt(0) || "?"}
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-3xl font-black text-white mb-3 truncate">{g.name}</h3>
                          <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-6">
                            <Users className="w-5 h-5" />
                            <span className="text-lg">{g.memberCount?.toLocaleString() || 0} Members</span>
                          </div>
                          <Link href={`https://discord.com/channels/${g.id}`} target="_blank">
                            <button className="px-6 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold text-sm hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all duration-200 flex items-center gap-2">
                              View Network <ArrowRight className="w-4 h-4" />
                            </button>
                          </Link>
                        </div>
                      </motion.div>
                    ) : null
                  )}
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => goTo(activeIndex - 1)}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dot indicators + mini previews */}
                <div className="flex-1 flex items-center justify-center gap-2 flex-wrap">
                  {topGuilds.map((g, i) => (
                    <button
                      key={g.id || i}
                      onClick={() => goTo(i)}
                      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
                        i === activeIndex
                          ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-400"
                          : "bg-white/5 border-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-cyan-400 scale-125" : "bg-gray-600"}`} />
                      {g.icon ? (
                        <img src={g.icon} alt={g.name} className="w-5 h-5 rounded-full object-cover hidden sm:block" />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-cyan-900/50 hidden sm:flex items-center justify-center text-[9px] font-bold text-white/40">
                          {g.name?.charAt(0) || "?"}
                        </div>
                      )}
                      <span className="text-xs font-semibold truncate max-w-[5rem] hidden sm:block">{g.name}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goTo(activeIndex + 1)}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-px bg-white/5 rounded-full overflow-hidden">
                {!isPaused && (
                  <motion.div
                    key={activeIndex}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-cyan-500/50 to-sky-500/50"
                  />
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <footer className="mt-32 pb-8 text-center text-gray-500 text-sm font-medium">
          <p className="flex items-center justify-center gap-2">
            Engineered with <Heart className="w-4 h-4 text-cyan-500 fill-cyan-500/20" /> for Flixo Development
          </p>
        </footer>
      </div>
    </div>
  );
}
