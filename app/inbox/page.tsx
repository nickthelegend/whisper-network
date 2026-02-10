"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useMidnightWallet } from "@/hooks/useMidnightWallet";
import { getWhisperAddress } from "@/lib/whisper";

import { fetchRealMessages, type WhisperMessage } from "@/lib/mailbox";

import dynamic from "next/dynamic";

function InboxPageContent() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const { walletState, isConnected } = useMidnightWallet();
    const [messages, setMessages] = useState<WhisperMessage[]>([]);
    const [isSyncing, setIsSyncing] = useState(false);

    const address = walletState?.state?.address;
    const whisperAddress = getWhisperAddress(address);

    useEffect(() => {
        if (isConnected && address) {
            setIsSyncing(true);
            fetchRealMessages(whisperAddress).then(msgs => {
                setMessages(msgs);
                setIsSyncing(false);
            });
        }
    }, [isConnected, address, whisperAddress]);

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
                            <Link href="/setup" className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3 px-4"} py-3 rounded-xl text-[#a692c8] hover:bg-primary/10 hover:text-white transition-colors cursor-pointer group`}>
                                <span className="material-symbols-outlined group-hover:text-primary transition-colors shrink-0">hub</span>
                                {!isSidebarCollapsed && <p className="text-sm font-medium group-hover:text-white transition-colors truncate">Name Server</p>}
                            </Link>
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
                                    <span className="text-sm font-bold text-white truncate max-w-[150px]">{whisperAddress}</span>
                                    <span className="text-[10px] text-primary font-mono uppercase tracking-widest font-bold">Whisper Network</span>
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-primary p-0.5">
                                    <img className="w-full h-full rounded-full object-cover" alt="User avatar" src={`https://api.dicebear.com/7.x/identicon/svg?seed=${address || 'default'}`} />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Messages Area */}
                    <div className="flex-1 flex flex-col min-h-0">
                        {/* Inbox Menu/Filters */}
                        <div className="h-14 flex items-center px-8 border-b border-[#312447] bg-card-dark/20 flex-shrink-0">
                            <div className="flex items-center gap-6">
                                <button className="text-xs font-bold text-primary uppercase tracking-widest border-b-2 border-primary h-14 flex items-center">All Incoming</button>
                                <button className="text-xs font-bold text-[#a692c8] hover:text-white transition-colors uppercase tracking-widest h-14 flex items-center">Unread</button>
                                <button className="text-xs font-bold text-[#a692c8] hover:text-white transition-colors uppercase tracking-widest h-14 flex items-center">Starred</button>
                                <button className="text-xs font-bold text-[#a692c8] hover:text-white transition-colors uppercase tracking-widest h-14 flex items-center">Encrypted</button>
                            </div>
                            <div className="ml-auto flex items-center gap-2">
                                <span className={`text-[10px] text-primary font-mono font-bold uppercase tracking-widest mr-2 ${isSyncing ? "animate-pulse" : ""}`}>{isSyncing ? "SYNCING..." : "LEDGER_SYNCED"}</span>
                                <button
                                    onClick={() => {
                                        setIsSyncing(true);
                                        fetchRealMessages(whisperAddress).then(msgs => {
                                            setMessages(msgs);
                                            setIsSyncing(false);
                                        });
                                    }}
                                    disabled={isSyncing}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors ${isSyncing ? "animate-spin text-primary" : "text-[#a692c8]"}`}
                                >
                                    <span className="material-symbols-outlined text-sm">refresh</span>
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#a692c8] hover:bg-white/5 transition-colors">
                                    <span className="material-symbols-outlined text-sm">filter_list</span>
                                </button>
                            </div>
                        </div>

                        {/* Message List */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 custom-scrollbar">
                            {isSyncing && messages.length === 0 ? (
                                <div className="flex flex-col gap-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="bg-card-dark/30 rounded-xl p-4 flex items-center gap-4 animate-pulse border border-white/5">
                                            <div className="w-12 h-12 rounded-full bg-white/5"></div>
                                            <div className="flex-1 space-y-3">
                                                <div className="h-4 w-1/3 bg-white/5 rounded"></div>
                                                <div className="h-3 w-2/3 bg-white/5 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full opacity-30 gap-4">
                                    <span className="material-symbols-outlined text-6xl">inbox</span>
                                    <p className="font-bold tracking-widest uppercase text-sm">No transmissions detected on the ledger</p>
                                </div>
                            ) : (
                                messages.map((msg, i) => (
                                    <Link
                                        key={msg.id || i}
                                        href={`/inbox/message/${msg.id}`}
                                        className={`inbox-glass-card bg-card-dark/40 border border-white/5 hover:border-primary/30 rounded-xl p-4 flex items-center gap-4 group cursor-pointer hover:bg-white/5 transition-all ${msg.isRead ? "opacity-60" : "opacity-100"}`}
                                    >
                                        <div className="relative shrink-0">
                                            <img
                                                className="w-12 h-12 rounded-full border border-primary/30"
                                                alt="Sender"
                                                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${msg.from}`}
                                            />
                                            {!msg.isRead && (
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary border-2 border-card-dark rounded-full animate-pulse"></div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-white font-bold truncate max-w-[200px]">{msg.from}</h3>
                                                    {msg.isEncrypted && (
                                                        <span className="bg-primary/10 text-primary text-[9px] px-2 py-0.5 rounded border border-primary/20 font-bold tracking-wider">ZK-ENCRYPTED</span>
                                                    )}
                                                </div>
                                                <span className="text-[#a692c8] text-[10px] font-medium uppercase tracking-widest">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <h4 className="text-white text-sm font-bold mb-1 truncate">{msg.subject}</h4>
                                            <p className="text-[#a692c8] text-xs truncate font-medium max-w-md">{msg.body}</p>
                                        </div>
                                    </Link>
                                ))
                            )}
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

const DynamicInboxPage = dynamic(() => Promise.resolve(InboxPageContent), {
    ssr: false,
});

export default function InboxPage() {
    return <DynamicInboxPage />;
}
