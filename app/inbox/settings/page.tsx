"use client";

import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-white overflow-hidden h-screen w-full selection:bg-primary selection:text-white">
            <div className="flex h-screen w-full">
                {/* Sidebar Navigation */}
                <aside className={`${isSidebarCollapsed ? "w-[80px]" : "w-[240px]"} transition-all duration-300 flex-shrink-0 bg-background-dark border-r border-[#312447] flex flex-col justify-between p-4 overflow-hidden`}>
                    <div className="flex flex-col gap-8">
                        {/* Logo Section */}
                        <div className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "justify-between"} px-2`}>
                            <Link href="/" className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-3xl shrink-0">graphic_eq</span>
                                {!isSidebarCollapsed && (
                                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-white truncate">WHISPER</span>
                                )}
                            </Link>
                        </div>

                        {/* Collapse Toggle Button */}
                        <div className="px-2">
                            <button
                                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                className="w-full flex items-center justify-center h-10 rounded-lg bg-card-dark border border-[#312447] text-[#a692c8] hover:text-white hover:border-primary transition-all shadow-sm"
                            >
                                <span className="material-symbols-outlined transition-transform duration-300" style={{ transform: isSidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                    side_navigation
                                </span>
                            </button>
                        </div>

                        {/* Nav Links */}
                        <nav className="flex flex-col gap-2 px-2">
                            <Link href="/inbox" className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-4"} py-3 rounded-xl text-[#a692c8] hover:bg-white/5 transition-colors cursor-pointer group`}>
                                <span className="material-symbols-outlined group-hover:text-white transition-colors shrink-0">inbox</span>
                                {!isSidebarCollapsed && <p className="text-sm font-medium group-hover:text-white transition-colors truncate">Inbox</p>}
                            </Link>
                            <div className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-4"} py-3 rounded-xl text-[#a692c8] hover:bg-white/5 transition-colors cursor-pointer group`}>
                                <span className="material-symbols-outlined group-hover:text-white transition-colors shrink-0">send</span>
                                {!isSidebarCollapsed && <p className="text-sm font-medium group-hover:text-white transition-colors truncate">Sent</p>}
                            </div>
                            <div className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-4"} py-3 rounded-xl text-[#a692c8] hover:bg-white/5 transition-colors cursor-pointer group`}>
                                <span className="material-symbols-outlined group-hover:text-white transition-colors shrink-0">draft</span>
                                {!isSidebarCollapsed && <p className="text-sm font-medium group-hover:text-white transition-colors truncate">Drafts</p>}
                            </div>
                            <div className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-4"} py-3 rounded-xl text-[#a692c8] hover:bg-white/5 transition-colors cursor-pointer group`}>
                                <span className="material-symbols-outlined group-hover:text-white transition-colors shrink-0">contacts</span>
                                {!isSidebarCollapsed && <p className="text-sm font-medium group-hover:text-white transition-colors truncate">Contacts</p>}
                            </div>
                            <div className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-4"} py-3 rounded-xl bg-primary/20 border border-primary/30 text-white cursor-pointer group transition-all`}>
                                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
                                {!isSidebarCollapsed && <p className="text-sm font-semibold flex-1 truncate">Settings</p>}
                            </div>
                        </nav>
                    </div>

                    {/* Compose Button */}
                    <div className="px-2">
                        <Link
                            href="/inbox/compose"
                            className={`bg-primary hover:bg-[#8b5cf6] active-glow text-white rounded-xl ${isSidebarCollapsed ? "h-12 w-12" : "py-4 px-4 w-full"} flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-lg shadow-primary/20 uppercase tracking-widest mx-auto`}
                        >
                            <span className="material-symbols-outlined shrink-0">edit</span>
                            {!isSidebarCollapsed && <span>Compose</span>}
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col min-w-0 bg-background-dark/50 overflow-y-auto custom-scrollbar">
                    {/* Header */}
                    <header className="h-20 flex items-center justify-between px-8 border-b border-[#312447] shrink-0">
                        <h2 className="text-xl font-bold text-white uppercase tracking-tight italic">Protocol_Settings</h2>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] text-primary font-mono uppercase tracking-widest font-bold">Node: US-EAST-01</span>
                        </div>
                    </header>

                    {/* Settings Content */}
                    <div className="p-8 max-w-4xl">
                        <div className="space-y-12">
                            {/* Profile Section */}
                            <section>
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <span className="material-symbols-outlined">person</span>
                                    <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Profile Configuration</h3>
                                </div>
                                <div className="glass-card bg-card-dark/40 border border-border-muted p-8 space-y-6">
                                    <div className="flex items-center gap-6">
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-full border-2 border-primary p-1">
                                                <img className="w-full h-full rounded-full object-cover" alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBEevWT4Z0pk7H5pPH3aC4HZCsNdbpfoouMVIFvabV82oGLNsBkZ3Wi8vm2fBuEhr9cqTgojf4CM39d_gagyMsDqIOnShTuTyIJvrL1qEMdEjkNWOtcxCzZhinduAp6HFmxCKbKvVscUQQj6EKofbItp97Y8EOBR0buDxJ2jCuipfBtCitjpGmAUwd-TeKCLJCeR5alCXVcmJQvd0aHeDu8fm35SFOeEELEO18nCh3rXYcEBg8VOk5jFJxN2HOKYMdZtsteFik8ao" />
                                            </div>
                                            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-card-dark text-white hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-sm">photo_camera</span>
                                            </button>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg">vitalik.eth</h4>
                                            <p className="text-xs text-[#a692c8] uppercase tracking-widest">Mainframe Admin Access</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-[#a692c8] uppercase tracking-widest font-bold">Display Name</label>
                                            <input className="w-full bg-black/40 border border-border-muted rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:outline-none" type="text" defaultValue="Vitalik Buterin" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-[#a692c8] uppercase tracking-widest font-bold">Whisper Handle</label>
                                            <input className="w-full bg-black/40 border border-border-muted rounded-lg px-4 py-2.5 text-sm opacity-50 cursor-not-allowed" type="text" defaultValue="@vitalik" disabled />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Security Section */}
                            <section>
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <span className="material-symbols-outlined">security</span>
                                    <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Encryption & Security</h3>
                                </div>
                                <div className="glass-card bg-card-dark/40 border border-border-muted p-8 space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20">
                                        <div>
                                            <p className="text-sm font-bold text-white uppercase tracking-tight">Zero-Knowledge Proofs</p>
                                            <p className="text-xs text-[#a692c8]">Enable ZK-assertions for all outgoing packets</p>
                                        </div>
                                        <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(124,59,237,0.5)]">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border border-border-muted hover:border-white/10 transition-colors">
                                        <div>
                                            <p className="text-sm font-bold text-white uppercase tracking-tight">Metadata Shielding</p>
                                            <p className="text-xs text-[#a692c8]">Randomize packet hops to hide communication trails</p>
                                        </div>
                                        <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(124,59,237,0.5)]">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border border-border-muted hover:border-white/10 transition-colors opacity-50">
                                        <div>
                                            <p className="text-sm font-bold text-white uppercase tracking-tight">Hardware Enclave (TEE)</p>
                                            <p className="text-xs text-[#a692c8]">Use hardware security module for key storage</p>
                                        </div>
                                        <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-not-allowed">
                                            <div className="absolute left-1 top-1 w-4 h-4 bg-white/30 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Node Configuration */}
                            <section>
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <span className="material-symbols-outlined">hub</span>
                                    <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Node Network</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-6 border border-primary/30 bg-primary/5 rounded-xl">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Active Node</span>
                                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                        </div>
                                        <h4 className="text-white font-bold">Midnight US-EAST-01</h4>
                                        <p className="text-xs text-[#a692c8] mt-1">Latency: 12ms | Uptime: 99.99%</p>
                                    </div>
                                    <div className="p-6 border border-border-muted bg-card-dark/20 rounded-xl hover:border-white/20 transition-colors cursor-pointer group">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] font-bold text-[#a692c8] uppercase tracking-widest">Available</span>
                                            <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                                        </div>
                                        <h4 className="text-white group-hover:text-primary transition-colors font-bold">Midnight EU-WEST-04</h4>
                                        <p className="text-xs text-[#a692c8] mt-1">Latency: 84ms | Load: 42%</p>
                                    </div>
                                </div>
                            </section>

                            {/* Action Area */}
                            <div className="pt-12 border-t border-white/10 flex justify-between items-center">
                                <button className="text-red-400 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-red-500 transition-colors">
                                    Wipe All Decentralized Data
                                </button>
                                <button className="px-10 py-3 bg-primary text-white text-[11px] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(124,59,237,0.4)] hover:scale-105 active:scale-95 transition-all">
                                    Apply Changes
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Extra Space */}
                    <div className="h-20"></div>
                </main>
            </div>
        </div>
    );
}
