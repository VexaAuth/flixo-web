"use client";

import { motion } from "framer-motion";
import { FileText, ChevronRight, ShieldCheck, Scale } from "lucide-react";

export default function TermsPage() {
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
                        <Scale className="w-10 h-10 text-cyan-400" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500">Service</span></h1>
                    <p className="text-gray-400 text-lg font-medium">Last updated: {new Date().toLocaleDateString()}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8"
                >
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <ChevronRight className="w-5 h-5 text-cyan-500" /> 1. Acceptance of Terms
                        </h2>
                        <p className="text-gray-400 leading-relaxed pl-7">
                            By adding Flixo to your Discord server or utilizing our provided services (API, dashboard, or bot functions), you agree to these Terms of Service. If you disagree with any part of these terms, please remove the bot and discontinue use immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <ChevronRight className="w-5 h-5 text-cyan-500" /> 2. Usage & Restrictions
                        </h2>
                        <p className="text-gray-400 leading-relaxed pl-7 mb-4">
                            Flixo is provided "as-is" for entertainment and music playback purposes. You agree not to:
                        </p>
                        <ul className="list-disc text-gray-400 leading-relaxed pl-12 space-y-2">
                            <li>Attempt to reverse-engineer, disrupt, or attack the bot's infrastructure.</li>
                            <li>Use the bot to violate Discord's Terms of Service or Community Guidelines.</li>
                            <li>Exploit bugs manually or automatically for personal gain or to degrade the service for others.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <ChevronRight className="w-5 h-5 text-cyan-500" /> 3. Availability
                        </h2>
                        <p className="text-gray-400 leading-relaxed pl-7">
                            We strive for 99% uptime, but we do not guarantee uninterrupted availability. The service may be taken offline for maintenance, updates, or due to external factors (such as Discord API outages or Lavalink node crashes) without prior notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <ChevronRight className="w-5 h-5 text-cyan-500" /> 4. Liability
                        </h2>
                        <p className="text-gray-400 leading-relaxed pl-7">
                            The developers of Flixo are not responsible for any impact the bot has on your Discord server. We are not liable for any content played through the bot or actions taken by the bot due to user commands.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <ChevronRight className="w-5 h-5 text-cyan-500" /> 5. Termination
                        </h2>
                        <p className="text-gray-400 leading-relaxed pl-7">
                            We reserve the right to blacklist any user or server from utilizing Flixo at our sole discretion, instantly and without warning.
                        </p>
                    </section>

                    <div className="mt-8 p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl">
                        <p className="text-cyan-400/80 font-medium text-sm text-center">
                            By continuing to use Flixo, you acknowledge that you have read, understood, and agreed to these terms.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
