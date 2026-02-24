"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal, Copy, Check, Sparkles, Command } from "lucide-react";

export default function CommandsPage() {
    const [commands, setCommands] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCommands() {
            try {
                const apiUrl = "/api-proxy";
                const res = await fetch(`${apiUrl}/api/commands`);
                if (res.ok) {
                    const data = await res.json();
                    setCommands(data.commands || []);
                }
            } catch (e) {
                console.error("Failed to fetch commands", e);
            } finally {
                setLoading(false);
            }
        }
        fetchCommands();
    }, []);

    const categories = ["all", ...Array.from(new Set(commands.map((c) => c.category || "misc"))).sort()];

    const filteredCommands = commands.filter((c) => {
        const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.description?.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === "all" || (c.category || "misc") === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const handleCopy = (cmdName: string) => {
        navigator.clipboard.writeText(`/${cmdName}`);
        setCopiedCmd(cmdName);
        setTimeout(() => setCopiedCmd(null), 2000);
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, scale: 0.9, y: 10 },
        show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="min-h-screen bg-black font-sans selection:bg-cyan-500/30 text-gray-200">
            {/* Modern Ambient Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-cyan-900/20 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-sky-900/10 blur-3xl"></div>
            </div>

            <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 w-full max-w-screen-2xl mx-auto">

                {/* Header Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 mb-6 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl">
                        <Command className="w-10 h-10 text-cyan-400" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg tracking-tight">
                        Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500">Explorer</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                        Discover and execute powerful features seamlessly.
                    </p>
                </motion.div>

                {/* Main Interface Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl shadow-cyan-900/10"
                >
                    {/* Window Controls Header */}
                    <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2 w-1/3">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm"></div>
                        </div>
                        <div className="w-1/3 text-center text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center justify-center gap-2">
                            <Sparkles className="w-3 h-3 text-cyan-500" /> CLI Reference
                        </div>
                        <div className="w-1/3"></div>
                    </div>

                    <div className="p-6 md:p-8">
                        {/* Interactive Search Bar */}
                        <div className="relative mb-6 group max-w-3xl mx-auto">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-cyan-500/50 group-focus-within:text-cyan-400 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for a command..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-16 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 focus:ring-1 focus:ring-cyan-500/50 backdrop-blur-md transition-all font-medium text-lg shadow-inner"
                            />
                            <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400 font-sans font-bold">
                                    <Command className="w-3 h-3" /> K
                                </kbd>
                            </div>
                        </div>

                        {/* Category Selector */}
                        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition-all duration-300 ${activeCategory === cat
                                            ? "bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/50"
                                            : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Commands Grid Area */}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
                                <div className="text-cyan-500/50 font-bold tracking-widest uppercase text-sm animate-pulse">Syncing Index...</div>
                            </div>
                        ) : commands.length === 0 ? (
                            <div className="py-20 text-center text-gray-500 bg-white/5 rounded-2xl border border-white/5 border-dashed max-w-3xl mx-auto">
                                <Terminal className="w-12 h-12 mx-auto mb-4 text-gray-600 opacity-50" />
                                <p className="text-lg font-medium">No commands indexed or API is offline.</p>
                            </div>
                        ) : (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                /* Advanced Responsive Grid: Stacks to 1 column on mobile, up to 4-5 on ultra-wide screens */
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
                            >
                                <AnimatePresence>
                                    {filteredCommands.length > 0 ? filteredCommands.map((cmd, i) => (
                                        <motion.div
                                            key={i}
                                            variants={itemVariants}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="group relative flex flex-col justify-between p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-cyan-900/10 hover:border-cyan-500/40 hover:shadow- hover:-translate-y-1 transition-all duration-300"
                                        >
                                            {/* Command Info */}
                                            <div className="mb-4">
                                                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-1.5 mb-2 group-hover:text-cyan-300 transition-colors">
                                                    <span className="text-cyan-500 font-light">/</span>{cmd.name}
                                                </h3>
                                                <p className="text-gray-400 text-sm font-medium leading-relaxed line-clamp-3">
                                                    {cmd.description}
                                                </p>
                                            </div>

                                            {/* Copy Button Row */}
                                            <div className="mt-auto pt-3 border-t border-white/5">
                                                <button
                                                    onClick={() => handleCopy(cmd.name)}
                                                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${copiedCmd === cmd.name
                                                        ? "bg-green-500/20 text-green-400 border border-green-500/30 shadow-"
                                                        : "bg-white/5 text-gray-400 border border-white/10 hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/30 group-hover:bg-cyan-500/10 group-hover:text-cyan-400"
                                                        }`}
                                                >
                                                    {copiedCmd === cmd.name ? (
                                                        <><Check className="w-4 h-4" /> Copied</>
                                                    ) : (
                                                        <><Copy className="w-4 h-4" /> Copy Cmd</>
                                                    )}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="col-span-full text-center text-gray-500 py-16 bg-white/5 rounded-2xl border border-white/5"
                                        >
                                            <p className="text-lg font-medium">No commands found matching "<span className="text-cyan-400">{search}</span>"</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}