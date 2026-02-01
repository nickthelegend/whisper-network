"use client";

import Link from "next/link";
import { useState } from "react";

export default function MessageView() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="bg-background-dark font-mono text-white overflow-hidden h-screen w-full selection:bg-primary selection:text-white">
            <div className="flex flex-col h-screen w-full">
                {/* Header */}
                <header className="h-16 flex items-center justify-between px-6 border-b border-border-muted bg-background-dark z-10 shrink-0">
                    <div className="flex items-center gap-8 w-full max-w-4xl">
                        <Link href="/" className="flex items-center gap-2 min-w-[200px]">
                            <span className="material-symbols-outlined text-primary text-2xl">graphic_eq</span>
                            <span className="text-sm font-bold tracking-[0.2em] uppercase">WHISPER</span>
                        </Link>
                        <div className="flex items-center bg-card-dark/50 border border-border-muted px-4 py-2 rounded-lg w-full max-w-xl">
                            <span className="material-symbols-outlined text-sm text-[#a692c8] mr-2">search</span>
                            <input className="bg-transparent border-none focus:ring-0 text-xs w-full text-white placeholder-[#a692c8] outline-none" placeholder="Search task ID or system event..." type="text" />
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="relative p-2 bg-card-dark/50 border border-border-muted rounded-lg text-[#a692c8] hover:text-white hover:border-primary transition-all">
                            <span className="material-symbols-outlined text-xl">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
                        </button>
                        <div className="h-8 w-px bg-border-muted"></div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-[11px] font-bold text-white leading-none">vitalik.eth</p>
                                <p className="text-[9px] text-primary font-bold tracking-widest mt-1 uppercase">MAINFRAME ADMIN</p>
                            </div>
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full border-2 border-primary p-0.5 shadow-[0_0_10px_rgba(124,59,237,0.4)]">
                                    <img alt="User Profile" className="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpjoG9GjFxc0hsmm_YYCP5zjlC4tlfY2oFWDd3p3kOL76TdDqn7yJkIcl4Xp52ocFWkxfKnasiwX9xLQfBStsxvcnmuay7Ma8uvvKxzycxfEiBtGPsetdZ6kPoF-9_tmnUYivK3wq5eeRCoN3GWk9R3t2wGjOlkq1nfVxzg2ovQfntMhH-r5VH6AmRFD7vAQ5YEst2aJdQQcSRsu1oq-CaTe0VzCjNiGK7a-07lpAP2kqh0r_sk6NNVnNm3AmyoNHCbp9iFRNLC9Q" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <aside className={`${isSidebarCollapsed ? "w-[80px]" : "w-[260px]"} transition-all duration-300 flex-shrink-0 border-r border-border-muted flex flex-col bg-background-dark overflow-hidden`}>
                        <div className="p-4 flex flex-col gap-4">
                            <Link href="/inbox/compose" className={`w-full bg-primary hover:bg-[#8b5cf6] text-white py-3 text-[11px] font-bold flex items-center justify-center gap-2 uppercase tracking-widest transition-colors ${isSidebarCollapsed ? "px-0" : ""}`}>
                                <span className="material-symbols-outlined text-sm">edit_square</span>
                                {!isSidebarCollapsed && <span>COMPOSE_MSG</span>}
                            </Link>
                            {/* Collapse Toggle */}
                            <button
                                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                className="w-full flex items-center justify-center h-10 rounded-lg bg-card-dark border border-[#312447] text-[#a692c8] hover:text-white hover:border-primary transition-all shadow-sm"
                            >
                                <span className="material-symbols-outlined transition-transform duration-300" style={{ transform: isSidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                    side_navigation
                                </span>
                            </button>
                        </div>
                        <nav className="flex-1 space-y-1 px-4">
                            <Link href="/inbox" className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-4"} py-4 border-l-2 border-primary bg-primary/10 text-white cursor-pointer transition-all`}>
                                <span className="material-symbols-outlined text-lg">inbox</span>
                                {!isSidebarCollapsed && <span className="text-xs font-bold tracking-widest uppercase truncate">Inbox</span>}
                            </Link>
                            <div className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-4"} py-4 border-l-2 border-transparent text-[#a692c8] hover:bg-primary/5 hover:text-white transition-all cursor-pointer`}>
                                <span className="material-symbols-outlined text-lg">send</span>
                                {!isSidebarCollapsed && <span className="text-xs font-bold tracking-widest uppercase truncate">Sent</span>}
                            </div>
                            <div className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-4"} py-4 border-l-2 border-transparent text-[#a692c8] hover:bg-primary/5 hover:text-white transition-all cursor-pointer`}>
                                <span className="material-symbols-outlined text-lg">drafts</span>
                                {!isSidebarCollapsed && <span className="text-xs font-bold tracking-widest uppercase truncate">Drafts</span>}
                            </div>
                            <div className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-4"} py-4 border-l-2 border-transparent text-[#a692c8] hover:bg-primary/5 hover:text-white transition-all cursor-pointer`}>
                                <span className="material-symbols-outlined text-lg">contacts</span>
                                {!isSidebarCollapsed && <span className="text-xs font-bold tracking-widest uppercase truncate">Contacts</span>}
                            </div>
                            <Link href="/inbox/settings" className={`mt-auto border-t border-border-muted flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-4"} py-4 border-l-2 border-transparent text-[#a692c8] hover:bg-primary/5 hover:text-white transition-all cursor-pointer`}>
                                <span className="material-symbols-outlined text-lg">settings</span>
                                {!isSidebarCollapsed && <span className="text-xs font-bold tracking-widest uppercase truncate">Settings</span>}
                            </Link>
                        </nav>
                        <div className="p-4 bg-background-dark border-t border-border-muted flex justify-center">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                {!isSidebarCollapsed && <span className="text-[9px] text-[#a692c8] uppercase tracking-widest font-bold truncate">Node_Online</span>}
                            </div>
                        </div>
                    </aside>

                    {/* Main Area */}
                    <main className="flex-1 flex flex-col min-w-0 bg-background-dark/30 overflow-hidden">
                        <header className="h-12 flex items-center justify-between px-6 border-b border-border-muted bg-background-dark/50 shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-[10px] text-[#a692c8]">
                                    <span>USER</span>
                                    <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                                    <Link href="/inbox" className="text-primary hover:underline">INBOX</Link>
                                    <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                                    <span className="text-white">MIDNIGHT_NETWORK_INTEGRATION</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="p-1.5 text-[#a692c8] hover:text-white border border-border-muted hover:border-primary transition-colors">
                                    <span className="material-symbols-outlined text-sm">shield_with_heart</span>
                                </button>
                                <button className="p-1.5 text-[#a692c8] hover:text-white border border-border-muted hover:border-primary transition-colors">
                                    <span className="material-symbols-outlined text-sm">reply</span>
                                </button>
                                <button className="p-1.5 text-[#a692c8] hover:text-white border border-border-muted hover:border-red-500 transition-colors">
                                    <span className="material-symbols-outlined text-sm">delete_forever</span>
                                </button>
                            </div>
                        </header>

                        <div className="flex-1 overflow-y-auto custom-scrollbar p-10">
                            <div className="max-w-4xl mx-auto w-full">
                                <div className="mb-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight uppercase">Midnight Network Integration</h1>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] px-2 py-0.5 font-bold uppercase">Priority: High</span>
                                                <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] px-2 py-0.5 font-bold uppercase">Decentralized: Yes</span>
                                                <span className="bg-card-dark text-[#a692c8] border border-border-muted text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider">REF: #MN-2024-X</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[11px] text-white font-bold mb-1 uppercase tracking-widest">TIMESTAMP</p>
                                            <p className="text-[11px] text-[#a692c8] font-mono">2024-05-12T14:30:01.000Z</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-card-dark/40 border border-border-muted mb-8">
                                        <img alt="Alice Avatar" className="w-10 h-10 rounded-full border border-primary/50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpjoG9GjFxc0hsmm_YYCP5zjlC4tlfY2oFWDd3p3kOL76TdDqn7yJkIcl4Xp52ocFWkxfKnasiwX9xLQfBStsxvcnmuay7Ma8uvvKxzycxfEiBtGPsetdZ6kPoF-9_tmnUYivK3wq5eeRCoN3GWk9R3t2wGjOlkq1nfVxzg2ovQfntMhH-r5VH6AmRFD7vAQ5YEst2aJdQQcSRsu1oq-CaTe0VzCjNiGK7a-07lpAP2kqh0r_sk6NNVnNm3AmyoNHCbp9iFRNLC9Q" />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-white tracking-wide uppercase">FROM: alice.eth</span>
                                                <span className="text-[10px] text-[#a692c8]">verified_sender: 0x551...A8B</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-0.5">
                                                <span className="text-[10px] text-[#a692c8] uppercase">TO: vitalik.eth</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6 text-sm leading-relaxed text-[#a692c8] font-mono">
                                        <p className="text-white">Greetings Admin,</p>
                                        <p>We are ready to proceed with the <span className="text-primary">Midnight Network</span> integration phase. This upgrade will move our entire communication layer to a fully decentralized protocol, ensuring that no single entity can intercept or censor our packet flows.</p>
                                        <p>By leveraging <span className="text-white font-bold">Zero-Knowledge Proofs (ZKP)</span> and decentralized metadata protection, Whisper will now provide true anonymity. Unlike legacy systems, our encryption keys are generated locally and never leave the hardware enclave.</p>
                                        <div className="p-4 bg-black/40 border-l-2 border-primary text-xs text-primary/90 space-y-1">
                                            <p>[SYSTEM_VERIFICATION]</p>
                                            <p>ENCRYPTION: End-to-End (ChaCha20-Poly1305)</p>
                                            <p>ROUTING: Onion-V3 / Mesh Hybrid</p>
                                            <p>PRIVACY_LEVEL: Opaque</p>
                                        </div>
                                        <p>Please review the attached integration manifest. Once confirmed, we will begin the migration of the primary relay nodes to the decentralized mesh. The privacy features we've discussed—including metadata stripping and stealth addresses—are now active in the sandbox environment.</p>
                                        <p>Standing by for your signature to initiate deployment.</p>
                                        <p className="pt-6 text-white font-bold">-- ALICE --</p>
                                    </div>
                                    <div className="mt-12 pt-8 border-t border-border-muted">
                                        <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-4">Attached_Manifests</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-3 border border-border-muted bg-card-dark/20 flex items-center gap-3 hover:border-primary cursor-pointer transition-all">
                                                <span className="material-symbols-outlined text-primary">description</span>
                                                <div className="flex-1">
                                                    <p className="text-[10px] text-white font-bold truncate uppercase tracking-tight">network_specs_v2.pdf</p>
                                                    <p className="text-[9px] text-[#a692c8]">2.4 MB | PDF_DOCUMENT</p>
                                                </div>
                                                <span className="material-symbols-outlined text-sm text-[#a692c8]">download</span>
                                            </div>
                                            <div className="p-3 border border-border-muted bg-card-dark/20 flex items-center gap-3 hover:border-primary cursor-pointer transition-all">
                                                <span className="material-symbols-outlined text-primary">key</span>
                                                <div className="flex-1">
                                                    <p className="text-[10px] text-white font-bold truncate uppercase tracking-tight">integration_key.pem</p>
                                                    <p className="text-[9px] text-[#a692c8]">1.2 KB | RSA_KEY</p>
                                                </div>
                                                <span className="material-symbols-outlined text-sm text-[#a692c8]">download</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <footer className="h-10 border-t border-border-muted bg-background-dark/80 px-6 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                                    <span className="text-[9px] text-[#a692c8] uppercase tracking-widest">NETWORK: ACTIVE</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] text-[#a692c8] uppercase tracking-widest">LATENCY: 12ms</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] text-primary uppercase tracking-widest font-bold">ENCRYPTION: HARDWARE_KEY_ACTIVE</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[9px] text-[#a692c8] uppercase tracking-widest">STORAGE_CAPACITY: 28%</span>
                                <div className="w-24 h-1 bg-[#312447]">
                                    <div className="bg-primary h-full w-[28%]"></div>
                                </div>
                            </div>
                        </footer>
                    </main>
                    {/* Detail Side Block */}
                    {!isSidebarCollapsed && (
                        <aside className="w-[300px] flex-shrink-0 border-l border-border-muted flex flex-col bg-background-dark/50 hidden lg:flex">
                            <div className="p-8">
                                <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-6">Security Context</h4>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[9px] text-[#a692c8] uppercase tracking-widest mb-2 font-bold">Encryption Type</p>
                                        <p className="text-xs text-white">ChaCha20-Poly1305 (AEAD)</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-[#a692c8] uppercase tracking-widest mb-2 font-bold">Proof of Origin</p>
                                        <p className="text-xs text-white">verified_zkp_assertion</p>
                                    </div>
                                    <div className="pt-6 border-t border-border-muted">
                                        <p className="text-[9px] text-[#a692c8] uppercase tracking-widest mb-2 font-bold">Metadata Status</p>
                                        <span className="px-2 py-0.5 bg-green-500/10 text-green-500 border border-green-500/20 text-[9px] font-bold uppercase tracking-widest">Stripped</span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
}
