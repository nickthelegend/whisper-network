"use client";

import { useState, useEffect } from "react";
// Dynamic import to avoid SSR issues with window object if needed, though "use client" handles most
// We need to make sure the lib path is correct based on where we moved files
import { connectMidnight, getWalletState } from "../lib/midnightConnector";

export default function MidnightWallet() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleConnect() {
    try {
      setError(null);
      const api = await connectMidnight();
      const state = await api.state();
      
      // state.address might be complex object or string depending on SDK version
      // casting to string for safety in display
      setAddress(String(state.address));
      setBalance(String(state.balance)); 
      setConnected(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to connect wallet");
    }
  }

  async function refresh() {
    try {
      const state = await getWalletState();
      setBalance(String(state.balance));
    } catch (err: any) {
      console.error(err);
      setError("Failed to refresh state");
    }
  }

  return (
    <div className="p-6 border border-border-muted rounded-xl bg-card-dark/40 text-white font-mono text-sm shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4 text-primary">
        <span className="material-symbols-outlined">account_balance_wallet</span>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Wallet Connection</h3>
      </div>

      {error && (
        <div className="mb-4 text-red-400 text-[10px] font-bold uppercase tracking-widest border border-red-400/20 bg-red-400/10 p-3 rounded flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">warning</span>
          {error}
        </div>
      )}
      
      {!connected ? (
        <button 
          onClick={handleConnect}
          className="w-full py-4 bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary/80 hover:scale-[1.02] active:scale-[0.98] transition-all rounded-lg shadow-[0_0_15px_rgba(124,59,237,0.3)] flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">link</span>
          Connect Midnight Wallet
        </button>
      ) : (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-[10px] text-[#a692c8] uppercase tracking-widest">Status</span>
            <span className="text-green-400 text-[10px] font-bold uppercase flex items-center gap-2 bg-green-400/10 px-2 py-1 rounded-full border border-green-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              Active_Session
            </span>
          </div>
          
          <div>
            <p className="text-[9px] text-[#a692c8] uppercase tracking-widest mb-1">Wallet Address</p>
            <div className="relative group cursor-pointer" onClick={() => navigator.clipboard.writeText(address)}>
                <p className="break-all font-mono text-[10px] text-white/80 bg-black/40 p-3 rounded-lg border border-white/5 group-hover:border-primary/50 transition-colors">
                {address}
                </p>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-xs text-primary">content_copy</span>
                </div>
            </div>
          </div>

          <div>
            <p className="text-[9px] text-[#a692c8] uppercase tracking-widest mb-1">Network Balance</p>
            <p className="font-bold text-white text-xl flex items-baseline gap-1">
              {balance} <span className="text-xs text-primary font-normal">tDUST</span>
            </p>
          </div>

          <button 
            onClick={refresh}
            className="w-full py-2 border border-white/10 hover:bg-white/5 text-[#a692c8] hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            Sync State
          </button>
        </div>
      )}
    </div>
  );
}
