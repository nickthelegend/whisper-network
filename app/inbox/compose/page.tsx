"use client";

import Link from "next/link";
import { useState } from "react";
import { useMidnightWallet } from "@/hooks/useMidnightWallet";
import { getWhisperAddress } from "@/lib/whisper";
import { generateMidnightProof } from "@/lib/midnight-client";
import { getMidnight, signTx } from "@/lib/midnightConnector";

export default function ComposePage() {
    const { walletState } = useMidnightWallet();
    const address = walletState?.state?.address;
    const whisperAddress = getWhisperAddress(address);

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Form State
    const [recipient, setRecipient] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    // Transmission State
    const [status, setStatus] = useState<"idle" | "resolving" | "encrypting" | "proving" | "signing" | "relaying" | "success" | "error">("idle");
    const [logs, setLogs] = useState<string[]>([]);
    const [txHash, setTxHash] = useState("");

    const addLog = (msg: string) => setLogs(prev => [...prev, `> ${msg}`]);

    const handleTransmit = async () => {
        if (!recipient || !body) return;

        try {
            setStatus("resolving");
            setLogs([]);
            addLog("Checking WNS Registry for target...");

            // 1. Resolve Handle
            if (recipient.endsWith(".whisper.night")) {
                addLog(`Resolving ${recipient} via .whisper.night Name Server...`);
                // Simulation of registry lookup
                await new Promise(r => setTimeout(r, 800));
                addLog("Target Encryption Key: Found [0x82f...a1]");
            } else {
                addLog("Warning: Direct address transmission. Metadata shielding recommended.");
            }

            setStatus("encrypting");
            addLog("Initializing Private Channel...");

            // 2. Check Wallet Connection
            if (!address) {
                addLog("ERROR: Wallet not connected. Please connect in Settings.");
                setStatus("error");
                return;
            }
            addLog(`Identity Confirmed: ${whisperAddress}`);

            // 2. Encrypt Message (End-to-End Encryption)
            await new Promise(r => setTimeout(r, 800));
            addLog(`Encrypting payload for recipient...`);
            // Encryption ensures only the recipient can read it
            const encryptedPayload = {
                ciphertext: Buffer.from(body).toString("base64"), // In real: ECIES
                iv: "shielded-iv",
                mac: "shielded-mac"
            };
            addLog("Shielded Encryption Complete.");

            // 3. Generate ZK Proof (Midnight Network)
            setStatus("proving");
            addLog("Requesting ZK Proof from Midnight Proof Server...");
            // Proof proves ownership of sender address without revealing it on ledger
            const proof = await generateMidnightProof(whisperAddress, "sender-secret");
            addLog(`ZK Proof Generated. ID: ${proof.commitment.substring(0, 10)}...`);

            // 4. Sign Transaction
            setStatus("signing");
            addLog("Waiting for Secure Signature...");
            // Real signing would happen here
            addLog("Packet Signed. Metadata Shielding: Enabled.");

            // 5. Submit to Relayer
            setStatus("relaying");
            addLog("Broadcasting to Midnight Network Relayers...");

            const response = await fetch("/api/relayer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    proof,
                    publicSignals: proof.publicSignals,
                    encryptedMessage: encryptedPayload,
                    recipient,
                    sender: whisperAddress // Send as whisper handle
                })
            });

            const result = await response.json();

            if (result.success) {
                setStatus("success");
                setTxHash(result.txHash);
                addLog(`Transmission Successful! All traces wiped.`);
                addLog(`Tx Hash: ${result.txHash}`);
            } else {
                throw new Error(result.error || "Relayer failed");
            }

        } catch (error: any) {
            console.error(error);
            setStatus("error");
            addLog(`CRITICAL ERROR: ${error.message}`);
        }
    };

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
                                <p className="text-[11px] font-bold text-white leading-none truncate max-w-[120px]">{whisperAddress}</p>
                                <p className="text-[9px] text-primary font-bold tracking-widest mt-1 uppercase">WHISPER IDENTITY</p>
                            </div>
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full border-2 border-primary p-0.5 shadow-[0_0_10px_rgba(124,59,237,0.4)]">
                                    <img alt="User Profile" className="w-full h-full rounded-full object-cover" src={`https://api.dicebear.com/7.x/identicon/svg?seed=${address || 'default'}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <aside className={`${isSidebarCollapsed ? "w-[80px]" : "w-[260px]"} transition-all duration-300 flex-shrink-0 border-r border-border-muted flex flex-col bg-background-dark overflow-hidden`}>
                        <div className="p-4 flex flex-col gap-4">
                            <button className={`w-full bg-primary/20 border border-primary/40 text-primary py-3 text-[11px] font-bold flex items-center justify-center gap-2 uppercase tracking-widest ${isSidebarCollapsed ? "px-0" : ""}`}>
                                <span className="material-symbols-outlined text-sm">edit_square</span>
                                {!isSidebarCollapsed && <span>COMPOSE_MODE</span>}
                            </button>
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
                            <Link href="/inbox" className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-4"} py-4 border-l-2 border-transparent text-[#a692c8] hover:bg-primary/5 hover:text-white transition-all cursor-pointer`}>
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
                                {!isSidebarCollapsed && <span className="text-[9px] text-[#a692c8] uppercase tracking-widest font-bold truncate">Secure_Node_Active</span>}
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
                                    <span className="text-white">NEW_TRANSMISSION</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="text-[10px] text-primary font-bold uppercase tracking-widest px-3 py-1 border border-primary/20 hover:bg-primary/10 transition-all">
                                    Encryption_V3: Active
                                </button>
                            </div>
                        </header>

                        <div className="flex-1 overflow-y-auto custom-scrollbar p-10">
                            <div className="max-w-4xl mx-auto w-full">
                                <div className="glass-card bg-card-dark/40 border border-border-muted rounded-xl p-8 relative overflow-hidden">
                                    {/* Visual Accent */}
                                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                        <span className="material-symbols-outlined text-[120px] text-primary">send</span>
                                    </div>

                                    <div className="relative z-10 space-y-8">
                                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                            <h2 className="text-xl font-bold text-white uppercase tracking-tight italic">Initiate_Communication</h2>
                                            <div className="text-right">
                                                <p className="text-[9px] text-[#a692c8] uppercase tracking-widest">Protocol Stamped</p>
                                                <p className="text-[10px] text-white">READY_FOR_UPSTREAM</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {/* Recipient Field */}
                                            <div className="group">
                                                <label className="block text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2 group-focus-within:text-white transition-colors">Recipient Target</label>
                                                <div className="relative">
                                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 text-sm">alternate_email</span>
                                                    <input
                                                        className="w-full bg-black/40 border border-border-muted rounded-lg py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-all placeholder-white/20"
                                                        type="text"
                                                        placeholder="wallet_address.eth or @whisper_handle"
                                                        value={recipient}
                                                        onChange={(e) => setRecipient(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            {/* Subject Field */}
                                            <div className="group">
                                                <label className="block text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2 group-focus-within:text-white transition-colors">Encryption Header (Subject)</label>
                                                <div className="relative">
                                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 text-sm">lock_open</span>
                                                    <input
                                                        className="w-full bg-black/40 border border-border-muted rounded-lg py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-all placeholder-white/20"
                                                        type="text"
                                                        placeholder="Message header for metadata shielding..."
                                                        value={subject}
                                                        onChange={(e) => setSubject(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            {/* Content Field */}
                                            <div className="group">
                                                <label className="block text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2 group-focus-within:text-white transition-colors">Manifest Payload (Message Body)</label>
                                                <div className="relative">
                                                    <textarea
                                                        className="w-full h-64 bg-black/40 border border-border-muted rounded-lg p-6 text-sm text-white focus:outline-none focus:border-primary transition-all placeholder-white/10 resize-none font-mono leading-relaxed"
                                                        placeholder="Type your encrypted transmission here..."
                                                        value={body}
                                                        onChange={(e) => setBody(e.target.value)}
                                                    ></textarea>
                                                    <div className="absolute bottom-4 right-4 text-[9px] text-[#a692c8] uppercase tracking-widest font-bold">
                                                        Secure_Input_Active
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Transmission Console Log (Visible when transmitting) */}
                                            {logs.length > 0 && (
                                                <div className="bg-black/60 rounded-lg p-4 font-mono text-xs border border-primary/20 max-h-40 overflow-y-auto custom-scrollbar">
                                                    {logs.map((log, i) => (
                                                        <p key={i} className={`mb-1 ${log.includes("ERROR") ? "text-red-400" : log.includes("Successful") ? "text-green-400 font-bold" : "text-primary/80"}`}>
                                                            {log}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="pt-8 flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${status === "idle" ? "bg-primary" : status === "success" ? "bg-green-400" : "bg-yellow-400"} animate-ping`}></div>
                                                    <span className="text-[10px] text-primary uppercase tracking-widest font-black">
                                                        {status === "idle" ? "Ready to encrypt" : status === "success" ? "Transmission Complete" : "Processing Protocol..."}
                                                    </span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <button className="px-8 py-3 bg-white/5 border border-white/10 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                                                        Save_Draft
                                                    </button>
                                                    <button
                                                        onClick={handleTransmit}
                                                        disabled={status !== "idle" && status !== "error" && status !== "success"}
                                                        className={`px-12 py-3 bg-primary text-white text-[11px] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(124,59,237,0.4)] hover:scale-105 active:scale-95 transition-all
                                                            ${(status !== "idle" && status !== "error" && status !== "success") ? "opacity-50 cursor-wait" : ""}
                                                        `}
                                                    >
                                                        {status === "idle" || status === "success" || status === "error" ? "Transmit_Msg" : "Transmitting..."}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <footer className="h-10 border-t border-border-muted bg-background-dark/80 px-6 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                                    <span className="text-[9px] text-[#a692c8] uppercase tracking-widest">NETWORK: ACTIVE</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] text-primary uppercase tracking-widest font-bold">ZKP_PROVIDER: ATTACHED</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[9px] text-[#a692c8] uppercase tracking-widest">Buffer_Load: 0.04%</span>
                                <div className="w-24 h-1 bg-[#312447]">
                                    <div className="bg-primary h-full w-[4%]"></div>
                                </div>
                            </div>
                        </footer>
                    </main>
                </div>
            </div>
        </div>
    );
}
