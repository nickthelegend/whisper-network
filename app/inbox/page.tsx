"use client";

import Link from "next/link";
import { useState } from "react";

export default function InboxPage() {
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
                            <div className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-4"} py-3 rounded-xl bg-primary/20 border border-primary/30 text-white cursor-pointer group transition-all`}>
                                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>inbox</span>
                                {!isSidebarCollapsed && <p className="text-sm font-semibold flex-1 truncate">Inbox</p>}
                                {!isSidebarCollapsed && <span className="bg-primary text-[10px] px-2 py-0.5 rounded-full">12</span>}
                            </div>
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
                            <Link href="/inbox/settings" className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-4"} py-3 rounded-xl text-[#a692c8] hover:bg-white/5 transition-colors cursor-pointer group`}>
                                <span className="material-symbols-outlined group-hover:text-white transition-colors shrink-0">settings</span>
                                {!isSidebarCollapsed && <p className="text-sm font-medium group-hover:text-white transition-colors truncate">Settings</p>}
                            </Link>
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
                <main className="flex-1 flex flex-col min-w-0 bg-background-dark/50">
                    {/* Header/Search Bar */}
                    <header className="h-20 flex items-center justify-between px-8 border-b border-[#312447] gap-8">
                        <div className="flex-1 max-w-2xl">
                            <div className="relative group">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#a692c8] group-focus-within:text-primary transition-colors">search</span>
                                <input className="w-full bg-card-dark/50 border border-[#312447] rounded-xl py-2.5 pl-12 pr-4 text-white placeholder:text-[#a692c8]/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm" placeholder="Search decentralized network..." type="text" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-card-dark border border-[#312447] text-[#a692c8] hover:text-white hover:border-primary/50 transition-all">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-card-dark border border-[#312447] text-[#a692c8] hover:text-white hover:border-primary/50 transition-all">
                                <span className="material-symbols-outlined">verified_user</span>
                            </button>
                            <div className="h-8 w-[1px] bg-[#312447] mx-2"></div>
                            <div className="flex items-center gap-3 pl-2">
                                <div className="flex flex-col items-end hidden md:flex">
                                    <span className="text-sm font-bold text-white">vitalik.eth</span>
                                    <span className="text-[10px] text-primary font-mono uppercase tracking-widest font-bold">Premium Node</span>
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-primary p-0.5">
                                    <img className="w-full h-full rounded-full object-cover" alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBEevWT4Z0pk7H5pPH3aC4HZCsNdbpfoouMVIFvabV82oGLNsBkZ3Wi8vm2fBuEhr9cqTgojf4CM39d_gagyMsDqIOnShTuTyIJvrL1qEMdEjkNWOtcxCzZhinduAp6HFmxCKbKvVscUQQj6EKofbItp97Y8EOBR0buDxJ2jCuipfBtCitjpGmAUwd-TeKCLJCeR5alCXVcmJQvd0aHeDu8fm35SFOeEELEO18nCh3rXYcEBg8VOk5jFJxN2HOKYMdZtsteFik8ao" />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Content Area */}
                    <div className="flex-1 overflow-hidden flex flex-col">
                        {/* Filters/Tabs */}
                        <div className="px-8 pt-6 pb-2">
                            <div className="flex border-b border-[#312447] gap-8">
                                <a className="flex items-center gap-2 border-b-2 border-primary text-white pb-4 px-1 transition-all" href="#">
                                    <span className="text-sm font-bold tracking-wide">All Messages</span>
                                    <span className="bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded font-bold">248</span>
                                </a>
                                <a className="flex items-center gap-2 border-b-2 border-transparent text-[#a692c8] hover:text-white pb-4 px-1 transition-all" href="#">
                                    <span className="text-sm font-medium tracking-wide">Unread</span>
                                </a>
                                <a className="flex items-center gap-2 border-b-2 border-transparent text-[#a692c8] hover:text-white pb-4 px-1 transition-all" href="#">
                                    <span className="text-sm font-medium tracking-wide">Encrypted</span>
                                </a>
                                <a className="flex items-center gap-2 border-b-2 border-transparent text-[#a692c8] hover:text-white pb-4 px-1 transition-all" href="#">
                                    <span className="text-sm font-medium tracking-wide">Spam</span>
                                </a>
                            </div>
                        </div>

                        {/* Message List */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-6 flex flex-col gap-3">
                            {/* Message 1 */}
                            <Link href="/inbox/1" className="inbox-glass-card rounded-xl p-4 flex items-center gap-4 group cursor-pointer border-l-4 border-l-primary">
                                <div className="relative shrink-0">
                                    <img className="w-12 h-12 rounded-full border border-primary/30" alt="Sender" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpjoG9GjFxc0hsmm_YYCP5zjlC4tlfY2oFWDd3p3kOL76TdDqn7yJkIcl4Xp52ocFWkxfKnasiwX9xLQfBStsxvcnmuay7Ma8uvvKxzycxfEiBtGPsetdZ6kPoF-9_tmnUYivK3wq5eeRCoN3GWk9R3t2wGjOlkq1nfVxzg2ovQfntMhH-r5VH6AmRFD7vAQ5YEst2aJdQQcSRsu1oq-CaTe0VzCjNiGK7a-07lpAP2kqh0r_sk6NNVnNm3AmyoNHCbp9iFRNLC9Q" />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary border-2 border-card-dark rounded-full animate-pulse"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-white font-bold truncate">alice.eth</h3>
                                            <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded border border-primary/20 font-bold">ZKP-ENCRYPTED</span>
                                        </div>
                                        <span className="text-primary text-[10px] font-bold uppercase tracking-widest">New Message</span>
                                    </div>
                                    <h4 className="text-white text-sm font-bold mb-1 truncate">Midnight Network Integration</h4>
                                    <p className="text-[#a692c8] text-xs truncate font-medium">Greetings Admin, We are ready to proceed with the Midnight Network integration phase...</p>
                                </div>
                                <div className="flex flex-col items-end gap-2 shrink-0">
                                    <span className="text-[#a692c8] text-xs font-medium">14:30 PM</span>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                        <button className="text-[#a692c8] hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-xl">star</span>
                                        </button>
                                        <button className="text-[#a692c8] hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-xl">archive</span>
                                        </button>
                                    </div>
                                </div>
                            </Link>

                            {/* Message 2 */}
                            <div className="inbox-glass-card rounded-xl p-4 flex items-center gap-4 group cursor-pointer opacity-80">
                                <div className="relative shrink-0">
                                    <img className="w-12 h-12 rounded-full border border-primary/30" alt="Sender" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlCulACsT579mdsFu3I9fLDALeulus2XlfrxqKvlObktU26wtt43KKEAcbKoQdjkJEFxXkEOqOdkTL2c-uIJDD4i0LHIJHiBwsEBWkaIzhiKIhdlKZv3qMz3ArziMCSmFkeh1kfpqD6hysOdyog3hAjgSBSt2xxKgQh0O5x67D95iVB5GhhfauA-yrpcz_STv1_ySOriWJHe00MkPhEa4cTk5uInTpxUDFImZqreWlHYUbfBRZ8rBjzc5EMuHcJ_Es8g6n2rYvDP0" />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-card-dark rounded-full"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-white font-bold truncate">Nakamoto Satoshi</h3>
                                            <span className="material-symbols-outlined text-primary text-sm">verified</span>
                                        </div>
                                        <span className="text-[#a692c8] text-xs font-medium">10:42 AM</span>
                                    </div>
                                    <h4 className="text-white text-sm font-medium mb-1 truncate">Draft: Decentralized Protocol v2.1 Revision</h4>
                                    <p className="text-[#a692c8] text-xs truncate opacity-70">The latest draft is ready for review. Please check the encryption keys...</p>
                                </div>
                                <div className="flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                                    <button className="text-[#a692c8] hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-xl">star</span>
                                    </button>
                                    <button className="text-[#a692c8] hover:text-red-400 transition-colors">
                                        <span className="material-symbols-outlined text-xl">delete</span>
                                    </button>
                                </div>
                            </div>

                            {/* More placeholders */}
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="inbox-glass-card rounded-xl p-4 flex items-center gap-4 group cursor-pointer opacity-80">
                                    <div className="w-12 h-12 rounded-full border border-white/5 bg-white/5 shrink-0 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white/20">person</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="h-4 w-24 bg-white/5 rounded animate-pulse"></div>
                                            <div className="h-3 w-12 bg-white/5 rounded animate-pulse"></div>
                                        </div>
                                        <div className="h-4 w-48 bg-white/5 rounded animate-pulse mb-1"></div>
                                        <div className="h-3 w-full bg-white/5 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Status */}
                        <footer className="h-10 border-t border-[#312447] bg-background-dark/80 px-8 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                                    <span className="text-[10px] text-[#a692c8] font-mono uppercase tracking-widest">Node connected: US-EAST-01</span>
                                </div>
                                <span className="text-[10px] text-[#312447]">|</span>
                                <span className="text-[10px] text-[#a692c8] font-mono uppercase tracking-widest">Block: #18442911</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-[#a692c8] font-medium uppercase tracking-widest">Storage: 14.2 GB / 50 GB</span>
                                <div className="w-24 h-1.5 bg-[#312447] rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[28%]"></div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
}
