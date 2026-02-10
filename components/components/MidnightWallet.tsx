"use client";

import { useState } from "react";
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
      
      setAddress(state.address);
      setBalance(String(state.balance)); // Assuming balance is object or stringifiable
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
    <div className="p-4 border border-border-muted rounded-lg bg-card-dark/20 text-white font-mono text-sm">
      {error && (
        <div className="mb-4 text-red-400 text-xs font-bold uppercase tracking-widest border border-red-400/20 bg-red-400/10 p-2 rounded">
          ⚠ {error}
        </div>
      )}
      
      {!connected ? (
        <button 
          onClick={handleConnect}
          className="w-full py-3 bg-primary text-white font-bold uppercase tracking-widest hover:bg-primary/80 transition-all rounded"
        >
          Connect Midnight Wallet
        </button>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-[10px] text-[#a692c8] uppercase tracking-widest">Status</span>
            <span className="text-green-400 text-xs font-bold uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Connected
            </span>
          </div>
          
          <div>
            <p className="text-[10px] text-[#a692c8] uppercase tracking-widest mb-1">Address</p>
            <p className="break-all font-mono text-xs text-white/80 bg-black/20 p-2 rounded border border-white/5">
              {address}
            </p>
          </div>

          <div>
            <p className="text-[10px] text-[#a692c8] uppercase tracking-widest mb-1">Balance</p>
            <p className="font-bold text-primary text-lg">
              {balance} <span className="text-xs text-white/50 font-normal">tDUST</span>
            </p>
          </div>

          <button 
            onClick={refresh}
            className="w-full py-2 border border-white/10 hover:bg-white/5 text-[#a692c8] hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all rounded"
          >
            Refresh State
          </button>
        </div>
      )}
    </div>
  );
}
