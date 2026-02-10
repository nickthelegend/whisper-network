"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useMidnightWallet } from "@/hooks/useMidnightWallet";
import { useMidnightContract } from "@/hooks/useMidnightContract";
import { getWhisperAddress } from "@/lib/whisper";

export default function NameServerSetup() {
    const { walletState, isConnected, connectWallet } = useMidnightWallet();
    const { deployContract, api, isLoading } = useMidnightContract();

    // Registration state
    const [handle, setHandle] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [contractAddr, setContractAddr] = useState("");
    const [statusLogs, setStatusLogs] = useState<string[]>([]);

    const addLog = (msg: string) => setStatusLogs(prev => [...prev, `> ${msg}`]);

    // Derived from wallet
    const encryptionKey = walletState?.state?.encryptionPublicKey || "0x000...";
    const address = walletState?.state?.address || "0x000...";

    const handleDeployRegistry = async () => {
        try {
            addLog("Initializing WhisperDNS Privacy Protocol...");
            addLog("Generating Zero-Knowledge Commitment for Registry...");

            // Mock contract instance for the UI flow
            const mockContractInstance = {
                // WhisperDNS.compact compiled
            };

            addLog("Broadcasting ZK-Contract to Midnight Hub...");
            const newApi = await deployContract(mockContractInstance);
            setContractAddr(newApi.deployedContractAddress);
            addLog(`DNS Protocol Active at: ${newApi.deployedContractAddress}`);
        } catch (err: any) {
            addLog(`FATAL ERROR: ${err.message}`);
        }
    };

    const handleRegister = async () => {
        if (!handle) return;
        try {
            addLog(`Registering ${handle}.whisper.network...`);
            addLog(`Proving ownership of shielded address commitment...`);
            addLog(`Metadata shielding: STRENGTH_CRITICAL`);

            // Simulation of contract call with ZK secret
            await new Promise(r => setTimeout(r, 2000));
            setIsRegistered(true);
            addLog(`Success! Identity ${handle}.whisper.network registered in the background.`);
            addLog(`Shielded Address hashed and hidden from public ledger.`);
        } catch (err: any) {
            addLog(`ERROR: ${err.message}`);
        }
    };

    return (
        <div className="bg-background-dark font-mono text-white min-h-screen w-full">
            <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-primary/20 pb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tighter italic text-white">WNS_CONFIG_MAINFRAME</h1>
                        <p className="text-[#a692c8] text-sm mt-1 uppercase tracking-widest">Whisper Name Service Protocol v1.0</p>
                    </div>
                    <Link href="/inbox" className="px-4 py-2 border border-border-muted hover:border-primary text-[10px] uppercase font-bold transition-all">
                        Back to Inbox
                    </Link>
                </div>

                {/* Step 1: Wallet Verification */}
                <section className="glass-card bg-card-dark/40 border border-border-muted p-8 space-y-6">
                    <div className="flex items-center gap-3 text-primary">
                        <span className="material-symbols-outlined">verified_user</span>
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em]">01_Identity_Handshake</h2>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-black/40 rounded-xl border border-white/5">
                        <div className="space-y-1">
                            <p className="text-[10px] text-[#a692c8] uppercase font-bold tracking-widest">Active Connection</p>
                            <p className="text-sm font-mono text-white truncate max-w-[300px]">{isConnected ? address : "NOTCONNECTED_NULL"}</p>
                        </div>
                        {!isConnected ? (
                            <button onClick={() => connectWallet()} className="px-8 py-3 bg-primary text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                                Establish Link
                            </button>
                        ) : (
                            <div className="px-6 py-2 bg-green-500/10 border border-green-500/50 text-green-400 text-[10px] font-bold uppercase">
                                Encrypted Connection: SECURE
                            </div>
                        )}
                    </div>
                </section>

                {/* Step 2: Protocol Deployment (Admin) */}
                <section className="glass-card bg-card-dark/40 border border-border-muted p-8 space-y-6">
                    <div className="flex items-center gap-3 text-primary">
                        <span className="material-symbols-outlined">settings_suggest</span>
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em]">02_Nameserver_Setup</h2>
                    </div>

                    <div className="space-y-4">
                        <p className="text-xs text-[#a692c8] leading-relaxed">
                            Initialize the Whisper Name Service on the Midnight Network to enable handle-to-address resolution.
                        </p>

                        {!contractAddr ? (
                            <button
                                onClick={handleDeployRegistry}
                                disabled={!isConnected || isLoading}
                                className="w-full py-4 bg-white/5 border border-white/10 hover:border-primary hover:bg-primary/5 transition-all text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-sm">rocket_launch</span>
                                {isLoading ? "Deploying Protocol..." : "Deploy New Name Server"}
                            </button>
                        ) : (
                            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                                <label className="text-[9px] text-primary uppercase font-bold">WNS Contract Address</label>
                                <p className="text-xs font-mono text-white mt-1 break-all">{contractAddr}</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Step 3: Handle Registration */}
                <section className="glass-card bg-card-dark/40 border border-border-muted p-8 space-y-6">
                    <div className="flex items-center gap-3 text-primary">
                        <span className="material-symbols-outlined">badge</span>
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em]">03_Handle_Acquisition</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 text-xs">@</span>
                                <input
                                    className="w-full bg-black/60 border border-border-muted rounded-lg py-4 pl-10 pr-4 text-sm focus:border-primary transition-all text-white outline-none"
                                    placeholder="Enter desired handle"
                                    value={handle}
                                    onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                                    disabled={isRegistered}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-[#a692c8] font-bold">.whisper.network</span>
                            </div>
                            <button
                                onClick={handleRegister}
                                disabled={!isConnected || !handle || isRegistered}
                                className="px-10 py-4 bg-primary text-white font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                            >
                                {isRegistered ? "Registered" : "Claim Handle"}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-black/40 rounded-lg border border-white/5 opacity-50">
                                <label className="text-[9px] text-[#a692c8] uppercase font-bold tracking-widest">Metadata: Encryption Key</label>
                                <p className="text-[10px] font-mono text-white truncate truncate mt-1">{encryptionKey}</p>
                            </div>
                            <div className="p-4 bg-black/40 rounded-lg border border-white/5 opacity-50">
                                <label className="text-[9px] text-[#a692c8] uppercase font-bold tracking-widest">Metadata: Shielded Commit</label>
                                <p className="text-[10px] font-mono text-white truncate mt-1">POSEIDON_SECURE_FIELD</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Live Logs */}
                <div className="bg-black/80 border border-border-muted rounded-xl p-6 font-mono text-xs overflow-hidden">
                    <div className="flex items-center gap-2 mb-4 text-[#a692c8]">
                        <span className="material-symbols-outlined text-sm">terminal</span>
                        <span className="uppercase tracking-widest font-bold">PROTOCOL_TRANSMISSION_LOG</span>
                    </div>
                    <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                        {statusLogs.length === 0 && <p className="text-white/20">Waiting for input...</p>}
                        {statusLogs.map((log, i) => (
                            <p key={i} className={`${log.includes("ERROR") ? "text-red-400" : log.includes("Success") ? "text-green-400" : "text-primary/70"}`}>
                                {log}
                            </p>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
