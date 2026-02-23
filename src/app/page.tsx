"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music, Server, Users, Settings, Headphones, ShieldCheck, Gamepad2, Heart, Trophy, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [stats, setStats] = useState({ servers: 0, users: 0, commands: 0, ping: 0 });
  const [topGuilds, setTopGuilds] = useState<any[]>([]);
  const [botMeta, setBotMeta] = useState<{ username?: string; avatarUrl?: string | null }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const botMetaRes = await fetch("/api/bot");
        if (botMetaRes.ok) setBotMeta(await botMetaRes.json());
      } catch (e) { }

      try {
        const apiUrl = "/api-proxy";
        const statsRes = await fetch(`${apiUrl}/api/stats`);
        if (statsRes.ok) {
          const data = await statsRes.json();
          setStats(data);
        }

        const guildsRes = await fetch(`${apiUrl}/api/guilds`);
        if (guildsRes.ok) {
          const { guildIds } = await guildsRes.json();
          // Fetch exact top 10 servers for the leaderboard
          const topIds = guildIds.slice(0, 10);
          const guildsData = await Promise.all(
            topIds.map(async (id: string) => {
              const gRes = await fetch(`${apiUrl}/api/guild/${id}`);
              return gRes.ok ? await gRes.json() : null;
            })
          );
          setTopGuilds(guildsData.filter((g) => g !== null));
        }
      } catch (e) {
        console.error("Bot API appears to be offline or CORS blocked.", e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  // Split Top 3 (Featured) and Rest (List View)
  const top3Guilds = topGuilds.slice(0, 3);
  const remainingGuilds = topGuilds.slice(3, 10);

  const statCards = [
    { label: "Servers", value: stats.servers, icon: Server, color: "text-cyan-400" },
    { label: "Users", value: stats.users, icon: Users, color: "text-purple-400" },
    { label: "Commands", value: stats.commands, icon: Settings, color: "text-orange-400" },
    { label: "Ping", value: `${stats.ping}ms`, icon: Music, color: "text-pink-400" },
  ];

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-cyan-500/30 text-gray-200">
      {/* Modern Ambient Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[45rem] h-[45rem] rounded-full bg-cyan-900/10 blur-[120px] mix-blend-screen transition-opacity duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] rounded-full bg-sky-900/10 blur-[100px] mix-blend-screen transition-opacity duration-1000"></div>

        {/* Subtle motion background effect */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-blue-900/5 blur-[150px]"
        ></motion.div>
      </div>

      <div className="relative z-10 pt-40 pb-20 px-4 sm:px-6 flex flex-col items-center">
        {/* Header Section */}
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

        {/* Global Stats Section */}
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

        {/* Top 10 Servers Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-5xl"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Top Networks</h2>
            <p className="text-gray-400 font-medium text-lg">The top 10 largest communities utilizing our ecosystem.</p>
          </div>

          {loading ? (
            <div className="text-center text-cyan-500/50 py-10 font-bold animate-pulse tracking-widest uppercase">Loading network data...</div>
          ) : topGuilds.length === 0 ? (
            <div className="bg-white/5 border border-white/5 rounded-3xl p-10 text-center text-gray-400">
              <p className="mb-2 font-medium">No network data found or API is offline.</p>
              <p className="text-sm opacity-60">Please ensure the backend systems are operational.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Top 3 Featured (Podium Style) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {top3Guilds.map((g, i) => (
                  <motion.div
                    key={g.id || i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative bg-white/5 border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300 group overflow-hidden"
                  >
                    {/* Rank Indicator */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute -top-3 -right-3 w-16 h-16 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>

                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white font-bold mb-2 z-10">
                      {i === 0 ? <Crown className="w-5 h-5 text-cyan-400" /> : <Trophy className={`w-5 h-5 ${i === 1 ? 'text-gray-300' : 'text-amber-600'}`} />}
                    </div>

                    <div className="w-24 h-24 rounded-2xl bg-black/40 shadow-inner overflow-hidden flex items-center justify-center p-1 border border-white/10 z-10">
                      {g.icon ? (
                        <img src={g.icon} alt={g.name} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-cyan-900 to-blue-900 rounded-xl flex items-center justify-center text-3xl font-black text-white/50">
                          {g.name?.charAt(0) || "?"}
                        </div>
                      )}
                    </div>

                    <div className="text-center w-full z-10">
                      <h4 className="text-xl font-bold text-white line-clamp-1 mb-1">{g.name}</h4>
                      <p className="text-sm text-cyan-400/80 font-semibold flex items-center justify-center gap-1.5">
                        <Users className="w-4 h-4" /> {g.memberCount?.toLocaleString() || 0} Members
                      </p>
                    </div>

                    <Link href={`https://discord.com/channels/${g.id}`} target="_blank" className="w-full mt-4 z-10">
                      <button className="w-full py-3 rounded-xl text-cyan-400 font-bold flex items-center justify-center gap-2 text-sm bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/10 transition-colors">
                        View Network
                      </button>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Remaining 4-10 (Sleek List View) */}
              {remainingGuilds.length > 0 && (
                <div className="flex flex-col gap-3 mt-8">
                  {remainingGuilds.map((g, i) => (
                    <motion.div
                      key={g.id || i + 3}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex items-center justify-between p-4 px-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/10 transition-all group"
                    >
                      <div className="flex items-center gap-5">
                        <div className="text-gray-600 font-black w-6 text-center text-lg">{i + 4}</div>
                        <div className="w-12 h-12 rounded-xl bg-black/40 overflow-hidden flex items-center justify-center border border-white/5">
                          {g.icon ? (
                            <img src={g.icon} alt={g.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-cyan-900/30 flex items-center justify-center text-lg font-bold text-white/50">
                              {g.name?.charAt(0) || "?"}
                            </div>
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-200 text-lg">{g.name}</h4>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="hidden sm:flex text-sm text-gray-500 font-medium items-center gap-2">
                          <Users className="w-4 h-4" /> {g.memberCount?.toLocaleString() || 0}
                        </div>
                        <Link href={`https://discord.com/channels/${g.id}`} target="_blank">
                          <button className="text-gray-400 group-hover:text-cyan-400 transition-colors p-2 rounded-full hover:bg-cyan-500/10 flex items-center justify-center">
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
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