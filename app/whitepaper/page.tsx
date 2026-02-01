import Link from "next/link";

export default function Whitepaper() {
    return (
        <div className="overflow-x-hidden whitepaper-grid min-h-screen bg-background-dark text-slate-300 font-sans">
            <header className="fixed top-0 left-0 right-0 h-16 bg-background-dark/80 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-8">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-2xl">graphic_eq</span>
                        <span className="text-xs font-mono tracking-widest text-white/60 uppercase">WHISPER PROTOCOL WHITEPAPER v1.0</span>
                    </Link>
                </div>
                <div className="flex items-center gap-6">
                    <button className="bg-gradient-to-br from-[#7c3bed] to-[#4c1d95] text-white text-xs font-bold px-5 py-2 rounded uppercase tracking-tighter flex items-center gap-2 shadow-[0_0_20px_rgba(124,59,237,0.3)]">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Download PDF
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto pt-24 pb-20 flex flex-col md:flex-row gap-12 px-6">
                <aside className="w-full md:w-64 h-fit sticky top-24 shrink-0">
                    <nav className="flex flex-col space-y-1">
                        <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 px-4 font-black">Contents</h4>
                        <a className="border-l-2 border-primary bg-primary/5 pl-4 text-primary transition-all py-2 text-sm" href="#abstract">Abstract</a>
                        <a className="border-l-2 border-transparent pl-4 text-slate-500 hover:text-white transition-all py-2 text-sm" href="#introduction">Introduction</a>
                        <a className="border-l-2 border-transparent pl-4 text-slate-500 hover:text-white transition-all py-2 text-sm" href="#architecture">Architecture</a>
                        <a className="border-l-2 border-transparent pl-4 text-slate-500 hover:text-white transition-all py-2 text-sm" href="#cryptography">Cryptographic Foundation</a>
                        <a className="border-l-2 border-transparent pl-4 text-slate-500 hover:text-white transition-all py-2 text-sm" href="#tokenomics">Tokenomics</a>
                        <a className="border-l-2 border-transparent pl-4 text-slate-500 hover:text-white transition-all py-2 text-sm" href="#references">References</a>
                    </nav>
                    <div className="mt-12 p-4 bg-midnight-accent/40 border border-primary/20 rounded-lg text-[10px] font-mono leading-relaxed opacity-60">
                        <p>Status: Draft Rev 14</p>
                        <p>Hash: 0x7c3...bed9</p>
                        <p>Last Sync: 2024.10.24</p>
                    </div>
                </aside>

                <main className="flex-1 max-w-4xl">
                    <section className="mb-20" id="abstract">
                        <div className="line-accent w-16 mb-4"></div>
                        <h1 className="text-4xl glow-heading mb-8 font-black italic text-white uppercase">Abstract</h1>
                        <p className="text-lg leading-relaxed text-slate-300 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-primary">
                            This document introduces Whisper, a decentralized, privacy-first communication protocol built atop the Midnight blockchain ecosystem. By leveraging zero-knowledge proofs (ZKPs) and a sharded metadata-resistance layer, Whisper ensures that messaging remains fully sovereign, non-custodial, and resistant to modern surveillance techniques. We propose a novel 'Ephemeral-Sync' mechanism that allows for asynchronous delivery without persistent server-side state.
                        </p>
                    </section>

                    <section className="mb-20" id="introduction">
                        <div className="line-accent w-16 mb-4"></div>
                        <h2 className="text-3xl glow-heading mb-6 italic text-white uppercase">Introduction</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <p className="leading-relaxed">
                                Traditional email protocols (SMTP/IMAP) were designed in an era where trust was implicit. Today, communication metadata is often more valuable than the content itself. Whisper addresses the fundamental flaws of legacy systems by decoupling identity from communication channels.
                            </p>
                            <p className="leading-relaxed">
                                Through integration with Midnight's privacy-preserving smart contracts, Whisper allows users to prove membership or reputation within the network without revealing their public key or transaction history.
                            </p>
                        </div>
                        <div className="bg-midnight-accent/40 border border-primary/20 p-6 rounded-lg border-l-4 border-l-primary">
                            <h4 className="text-primary text-xs font-mono mb-2 uppercase tracking-widest">Formal Definition</h4>
                            <p className="font-mono text-sm italic">
                                Let <span className="text-white">Ψ</span> be the protocol state such that <span className="text-white">Ψ = &#123;S, K, Π&#125;</span> where <span className="text-white">S</span> represents the shielded ledger, <span className="text-white">K</span> the asymmetric keypair, and <span className="text-white">Π</span> the set of zero-knowledge assertions.
                            </p>
                        </div>
                    </section>

                    <section className="mb-20" id="architecture">
                        <div className="line-accent w-16 mb-4"></div>
                        <h2 className="text-3xl glow-heading mb-6 italic text-white uppercase">Architecture</h2>
                        <p className="mb-8">The Whisper architecture consists of three primary layers: the Ledger Layer (Midnight), the Transport Layer (P2P Mesh), and the Encryption Layer (ZK-Asymmetric).</p>
                        <div className="bg-midnight-accent/40 border border-primary/20 p-6 rounded-lg relative overflow-hidden mb-8 h-[400px] flex flex-col items-center justify-center">
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                                <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <pattern height="20" id="dots" patternUnits="userSpaceOnUse" width="20" x="0" y="0">
                                            <circle cx="2" cy="2" fill="#7c3bed" r="1"></circle>
                                        </pattern>
                                    </defs>
                                    <rect fill="url(#dots)" height="100%" width="100%"></rect>
                                </svg>
                            </div>
                            <div className="grid grid-cols-3 gap-12 relative z-10 w-full px-12 text-white">
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 border border-primary/40 bg-background-dark flex items-center justify-center mb-3">
                                        <span className="material-symbols-outlined text-primary text-4xl">database</span>
                                    </div>
                                    <span className="font-mono text-[10px] uppercase text-center">Midnight Ledger</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 border border-primary/40 bg-background-dark flex items-center justify-center mb-3">
                                        <span className="material-symbols-outlined text-primary text-4xl">hub</span>
                                    </div>
                                    <span className="font-mono text-[10px] uppercase text-center">ZK-Proof Aggregator</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 border border-primary/40 bg-background-dark flex items-center justify-center mb-3">
                                        <span className="material-symbols-outlined text-primary text-4xl">mail</span>
                                    </div>
                                    <span className="font-mono text-[10px] uppercase text-center">Client Nodes</span>
                                </div>
                            </div>
                            <div className="mt-8 border-t border-primary/20 pt-4 w-full px-12 text-center italic font-mono text-xs opacity-50">
                                Figure 1.1: Protocol Integration with Midnight State Tree
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-white text-sm mb-4 font-bold border-b border-white/10 pb-2">The Midnight Integration</h4>
                                <p className="text-sm leading-relaxed text-slate-400">
                                    The Whisper smart contract acts as a root of trust. Unlike Ethereum, where all state transitions are public, Midnight allows Whisper to verify the validity of a message's origin without revealing the sender's address.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-white text-sm mb-4 font-bold border-b border-white/10 pb-2">Mesh Networking</h4>
                                <p className="text-sm leading-relaxed text-slate-400">
                                    Messages are fragmented into encrypted blobs and propagated through a randomized set of relay nodes, preventing traffic analysis from identifying communication patterns.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-20" id="cryptography">
                        <div className="line-accent w-16 mb-4"></div>
                        <h2 className="text-3xl glow-heading mb-6 italic text-white uppercase">Cryptographic Foundation</h2>
                        <div className="bg-black/40 rounded-xl p-8 font-mono text-sm border border-white/5 mb-8">
                            <pre className="text-purple-400">
                                {`// Whisper ZK-Circuit Implementation
circuit MessageValidity(
    private witness sender_sk,
    private witness message_body,
    public message_hash,
    public sender_commitment
) {
    // 1. Verify ownership of private key
    assert(Poseidon(sender_sk) == sender_commitment);
    // 2. Verify integrity of message payload
    assert(SHA256(message_body) == message_hash);
    // 3. Prevent replay attacks via Nullifier
    let nullifier = Hash(sender_sk, message_hash);
    expose(nullifier);
}`}
                            </pre>
                        </div>
                        <p className="mb-4">Whisper utilizes the <strong>Poseidon Hash Function</strong> for circuit-optimized hashing and <strong>Bulletproofs</strong> for range proofs when managing tokenized rate-limiting. This ensures high throughput without compromising on the security assumptions of the underlying chain.</p>
                    </section>

                    <section className="mb-20" id="tokenomics">
                        <div className="line-accent w-16 mb-4"></div>
                        <h2 className="text-3xl glow-heading mb-6 italic text-white uppercase">Tokenomics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-midnight-accent/40 border border-primary/20 p-6 rounded-lg text-center">
                                <div className="text-primary font-bold text-2xl mb-1">1B</div>
                                <div className="text-[10px] font-mono uppercase">Total Supply</div>
                            </div>
                            <div className="bg-midnight-accent/40 border border-primary/20 p-6 rounded-lg text-center">
                                <div className="text-primary font-bold text-2xl mb-1">40%</div>
                                <div className="text-[10px] font-mono uppercase">Node Incentives</div>
                            </div>
                            <div className="bg-midnight-accent/40 border border-primary/20 p-6 rounded-lg text-center">
                                <div className="text-primary font-bold text-2xl mb-1">ZK-STAKE</div>
                                <div className="text-[10px] font-mono uppercase">Protocol Mechanism</div>
                            </div>
                        </div>
                        <p className="leading-relaxed text-slate-400 italic">
                            The $WHISP token serves as the anti-spam utility. Every message sent requires a fractional burn or stake, ensuring the network remains free of sybil-driven denial of service attacks while rewarding node operators for data persistence and relaying.
                        </p>
                    </section>
                </main>
            </div>

            <footer className="bg-black py-12 px-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-xl">graphic_eq</span>
                        <span className="text-xs font-bold uppercase tracking-widest text-white">Whisper Protocol Foundation</span>
                    </div>
                    <div className="flex gap-8 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                        <a className="hover:text-primary transition-colors" href="#">Github</a>
                        <a className="hover:text-primary transition-colors" href="#">Midnight Network</a>
                        <a className="hover:text-primary transition-colors" href="#">Governance</a>
                    </div>
                    <p className="text-[10px] font-mono text-white/20">© 2024. All rights reserved by the Decentralized Encryption Group.</p>
                </div>
            </footer>
        </div>
    );
}
