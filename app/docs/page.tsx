import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DocsPage() {
    return (
        <div className="bg-background-dark text-white font-display overflow-x-hidden">
            <div className="particle-bg cyber-grid fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent"></div>
                <div className="particle" style={{ width: "2px", height: "2px", top: "15%", left: "15%" }}></div>
                <div className="particle" style={{ width: "3px", height: "3px", top: "40%", left: "85%" }}></div>
                <div className="particle" style={{ width: "1px", height: "1px", top: "65%", left: "35%" }}></div>
                <div className="particle" style={{ width: "4px", height: "4px", top: "55%", left: "12%" }}></div>
                <div className="particle" style={{ width: "2px", height: "2px", top: "80%", left: "70%" }}></div>
            </div>

            <Header />

            <main className="relative z-10 pt-20">
                <section className="relative pt-32 pb-20 flex flex-col items-center justify-center px-6">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-block mb-6 px-4 py-1 border border-primary/30 rounded-full bg-primary/5">
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Technical Documentation</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter text-white mb-8 neon-glow uppercase">
                            Protocol <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 italic">Docs</span>
                        </h1>
                        <p className="text-lg md:text-xl text-violet-mist max-w-2xl mx-auto mb-4 font-medium">
                            Everything you need to know about the Whisper protocol. Build, contribute, and secure your communications.
                        </p>
                        <p className="text-sm text-white/40 uppercase tracking-widest">Version: 1.0.0 Alpha</p>
                    </div>
                </section>

                <section className="pb-32 px-6">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="glass-card p-10 md:p-16 rounded-3xl relative overflow-hidden group border-primary/20">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <span className="material-symbols-outlined text-8xl text-primary">terminal</span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-primary font-black text-2xl italic">01</span>
                                    <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">Getting Started</h2>
                                </div>
                                <div className="space-y-6 text-violet-mist leading-relaxed text-lg">
                                    <p>
                                        Whisper is designed to be developer-friendly. You can interact with the protocol via our SDK or directly through the Midnight blockchain nodes.
                                    </p>
                                    <ul className="space-y-4">
                                        <li className="flex gap-4">
                                            <span className="material-symbols-outlined text-primary mt-1">code</span>
                                            <span><strong className="text-white">API Reference:</strong> Explore our comprehensive API documentation for building on Whisper.</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <span className="material-symbols-outlined text-primary mt-1">hub</span>
                                            <span><strong className="text-white">Node Setup:</strong> Learn how to run your own Whisper node and earn $WHISP rewards.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-10 md:p-16 rounded-3xl relative overflow-hidden group border-primary/20">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <span className="material-symbols-outlined text-8xl text-primary">security</span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-primary font-black text-2xl italic">02</span>
                                    <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">Security Specs</h2>
                                </div>
                                <div className="space-y-6 text-violet-mist leading-relaxed text-lg">
                                    <p>
                                        Whisper utilizes state-of-the-art ZK-SNARKs to provide transactional privacy while maintaining network integrity.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                            <h4 className="text-white font-bold mb-2 uppercase tracking-wide text-sm">ZK Proofs</h4>
                                            <p className="text-sm text-violet-mist/80">Detailed explanation of our zero-knowledge circuit implementations.</p>
                                        </div>
                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                            <h4 className="text-white font-bold mb-2 uppercase tracking-wide text-sm">Key Management</h4>
                                            <p className="text-sm text-violet-mist/80">Best practices for securing and managing your cryptographic keys.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
