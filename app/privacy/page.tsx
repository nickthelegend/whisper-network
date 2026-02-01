import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
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
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Sovereign Data Protection</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter text-white mb-8 neon-glow uppercase">
                            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 italic">Policy</span>
                        </h1>
                        <p className="text-lg md:text-xl text-violet-mist max-w-2xl mx-auto mb-4 font-medium">
                            Transparency is at the core of our decentralization. We don't just promise privacy; we architect it into our protocols.
                        </p>
                        <p className="text-sm text-white/40 uppercase tracking-widest">Effective Date: October 24, 2024</p>
                    </div>
                </section>

                <section className="pb-32 px-6">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="glass-card p-10 md:p-16 rounded-3xl relative overflow-hidden group border-primary/20">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <span className="material-symbols-outlined text-8xl text-primary">visibility_off</span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-primary font-black text-2xl italic">01</span>
                                    <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">Zero-Data Commitment</h2>
                                </div>
                                <div className="space-y-6 text-violet-mist leading-relaxed text-lg">
                                    <p>
                                        At Whisper, we operate on a strictly <span className="text-white font-bold">non-custodial and zero-knowledge</span> basis. Unlike traditional email providers, our architecture prevents us from accessing, storing, or monetizing your personal data.
                                    </p>
                                    <ul className="space-y-4">
                                        <li className="flex gap-4">
                                            <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                                            <span><strong className="text-white">No Tracking:</strong> We do not track IP addresses, browser fingerprints, or user interactions.</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                                            <span><strong className="text-white">No Logs:</strong> Our decentralized nodes are configured to maintain zero metadata logs of your communications.</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                                            <span><strong className="text-white">No Ad-Profile:</strong> Since we cannot read your messages, we cannot build marketing profiles for third parties.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-10 md:p-16 rounded-3xl relative overflow-hidden group border-primary/20">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <span className="material-symbols-outlined text-8xl text-primary">enhanced_encryption</span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-primary font-black text-2xl italic">02</span>
                                    <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">Encryption Protocols</h2>
                                </div>
                                <div className="space-y-6 text-violet-mist leading-relaxed text-lg">
                                    <p>
                                        Your security is maintained through the <span className="text-white font-bold">Midnight Blockchain</span>, utilizing zero-knowledge proofs (ZKP) to ensure that only intended recipients can verify and decrypt content.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                            <h4 className="text-white font-bold mb-2 uppercase tracking-wide text-sm">Asymmetric Keys</h4>
                                            <p className="text-sm text-violet-mist/80">Every account is generated with localized public-private key pairs. We never hold your private key.</p>
                                        </div>
                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                            <h4 className="text-white font-bold mb-2 uppercase tracking-wide text-sm">Metadata Shielding</h4>
                                            <p className="text-sm text-violet-mist/80">Message headers and routing info are encrypted, leaving no digital breadcrumbs on the network.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-10 md:p-16 rounded-3xl relative overflow-hidden group border-primary/20">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <span className="material-symbols-outlined text-8xl text-primary">key</span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-primary font-black text-2xl italic">03</span>
                                    <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">Your Ownership</h2>
                                </div>
                                <div className="space-y-6 text-violet-mist leading-relaxed text-lg">
                                    <p>
                                        In the Whisper ecosystem, the user is the <span className="text-white font-bold">sole proprietor</span> of their digital identity. You retain absolute control over your messages, attachments, and contacts.
                                    </p>
                                    <p>
                                        Because your data lives on a decentralized ledger, you can export your entire communication history at any time without asking for permission. If you lose your recovery phrase, <span className="text-primary font-bold">Whisper cannot recover your account</span>, as we have no backdoors into your sovereign vault.
                                    </p>
                                    <div className="pt-6 border-t border-white/10">
                                        <p className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-4">User Rights</p>
                                        <div className="flex flex-wrap gap-4">
                                            <span className="px-4 py-2 bg-primary/10 rounded-lg text-primary text-xs font-bold border border-primary/20">RIGHT TO BE FORGOTTEN</span>
                                            <span className="px-4 py-2 bg-primary/10 rounded-lg text-primary text-xs font-bold border border-primary/20">DATA PORTABILITY</span>
                                            <span className="px-4 py-2 bg-primary/10 rounded-lg text-primary text-xs font-bold border border-primary/20">SOVEREIGN IDENTITY</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 px-6 relative overflow-hidden">
                    <div className="max-w-4xl mx-auto glass-card p-12 md:p-16 rounded-3xl relative overflow-hidden text-center border-primary/40">
                        <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight italic">Have questions about <span className="text-primary">Legal?</span></h2>
                        <p className="text-lg text-violet-mist mb-10 max-w-xl mx-auto leading-relaxed">
                            Reach out to our decentralized governance community or check our technical documentation for deeper insights into our protocol.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="px-10 py-4 bg-primary text-white font-black uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(124,59,237,0.5)] hover:scale-105 transition-transform">
                                Contact Protocol
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
