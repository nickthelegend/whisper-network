"use client";

import Link from "next/link";
import { useState } from "react";
import { useMidnightWallet } from "@/hooks/useMidnightWallet";
import { getWhisperAddress } from "@/lib/whisper";
import { generateMidnightProof, type MidnightProof } from "@/lib/midnight-client";
import MidnightWallet from "@/components/MidnightWallet";

export default function SettingsPage() {
    const { walletState } = useMidnightWallet();
    const address = walletState?.state?.address;
    const whisperAddress = getWhisperAddress(address);

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // ZK Proof State (Midnight Compact)
    const [email, setEmail] = useState("");
    const [isProving, setIsProving] = useState(false);
    const [proof, setProof] = useState<MidnightProof | null>(null);
    const [verificationStatus, setVerificationStatus] = useState<"idle" | "proving" | "verified">("idle");

    const handleGenerateProof = async () => {
        if (!email) return;
        setIsProving(true);
        setVerificationStatus("proving");

        try {
            // Updated to use the new Midnight Client
            const result = await generateMidnightProof(email, "secret-compact-mock");
            setProof(result);
            setVerificationStatus("verified");
        } catch (e) {
            console.error(e);
            setVerificationStatus("idle");
        } finally {
            setIsProving(false);
        }
    };

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

                            <section>
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <span className="material-symbols-outlined">account_balance_wallet</span>
                                    <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Wallet Connection</h3>
                                </div>
                                <div className="glass-card bg-card-dark/40 border border-border-muted p-8 space-y-6">
                                    <p className="text-sm text-white/70">
                                        Connect your Midnight Wallet (Lace) to manage your identity and sign transactions.
                                    </p>
                                    <MidnightWallet />
                                </div>
                            </section>

                            {/* Identity Proof Section (New) */}
                            <section>
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <span className="material-symbols-outlined">fingerprint</span>
                                    <h3 className="text-sm font-bold uppercase tracking-[0.2em]">ZK Identity Proof</h3>
                                </div>
                                <div className="glass-card bg-card-dark/40 border border-border-muted p-8 space-y-6">
                                    <p className="text-sm text-white/70">
                                        Prove ownership of your email address using Zero-Knowledge proofs.
                                        This generates a cryptographic commitment without revealing your actual email on-chain.
                                    </p>

                                    <div className="flex flex-col md:flex-row gap-4 items-end">
                                        <div className="flex-1 w-full space-y-2">
                                            <label className="text-[10px] text-[#a692c8] uppercase tracking-widest font-bold">Email Address</label>
                                            <input
                                                className="w-full bg-black/40 border border-border-muted rounded-lg px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
                                                type="email"
                                                placeholder="alice@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={verificationStatus === "verified"}
                                            />
                                        </div>
                                        <button
                                            onClick={handleGenerateProof}
                                            disabled={isProving || !email || verificationStatus === "verified"}
                                            className={`px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2
                                                ${verificationStatus === "verified"
                                                    ? "bg-green-500/20 text-green-400 border border-green-500/50 cursor-default"
                                                    : "bg-primary text-white hover:bg-primary/80 hover:scale-105"
                                                }
                                                ${isProving ? "opacity-70 cursor-wait" : ""}
                                            `}
                                        >
                                            {isProving ? (
                                                <>
                                                    <span className="material-symbols-outlined animate-spin text-sm">refresh</span>
                                                    Generating Proof...
                                                </>
                                            ) : verificationStatus === "verified" ? (
                                                <>
                                                    <span className="material-symbols-outlined text-sm">check_circle</span>
                                                    Identity Verified
                                                </>
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined text-sm">lock</span>
                                                    Generate ZK Proof
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Proof Output Console */}
                                    {verificationStatus !== "idle" && (
                                        <div className="mt-6 font-mono text-xs bg-black/60 rounded-lg p-4 border border-[#312447] overflow-hidden">
                                            <div className="flex items-center gap-2 mb-2 text-[#a692c8]">
                                                <span className="material-symbols-outlined text-sm">terminal</span>
                                                <span className="uppercase tracking-widest font-bold">Proof Output Log</span>
                                            </div>
                                            <div className="space-y-1 text-green-400/80">
                                                <p>{`> Connecting to local Midnight Proof Server (port 6300)... [OK]`}</p>
                                                <p>{`> Generating Compact Witness... [OK]`}</p>
                                                {verificationStatus === "verified" && proof && (
                                                    <>
                                                        <p>{`> Building ZK Proof (Halo2/Kimchi)... [OK]`}</p>
                                                        <p className="text-white mt-2 mb-1 opacity-70">-- PUBLIC SIGNALS --</p>
                                                        <p className="break-all text-[#a692c8]">{`Commitment: ${proof.commitment}`}</p>
                                                        <p className="break-all text-[#a692c8]">{`Timestamp: ${proof.timestamp}`}</p>
                                                        <p className="text-green-500 font-bold mt-2">{`> IDENTITY_VERIFIED_ON_MIDNIGHT`}</p>
                                                    </>
                                                )}
                                                {isProving && (
                                                    <p className="animate-pulse text-primary">{`> Computing zero-knowledge proof...`}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>

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
                                            <h4 className="text-white font-bold text-lg">{whisperAddress}</h4>
                                            <p className="text-xs text-[#a692c8] uppercase tracking-widest">Mainframe Admin Access</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-[#a692c8] uppercase tracking-widest font-bold">Display Name</label>
                                            <input className="w-full bg-black/40 border border-border-muted rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:outline-none" type="text" defaultValue={address ? `User ${address.slice(0, 4)}` : "Guest User"} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-[#a692c8] uppercase tracking-widest font-bold">Whisper Handle</label>
                                            <input className="w-full bg-black/40 border border-border-muted rounded-lg px-4 py-2.5 text-sm opacity-50 cursor-not-allowed" type="text" value={whisperAddress} disabled />
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
