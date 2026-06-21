import React, { useState } from 'react';
import { ShieldAlert, Key, Lock, CheckCircle, ShieldCheck, Zap } from "lucide-react";

interface SecurityTabProps {
  highPerformanceMode: boolean;
  setHighPerformanceMode: (val: boolean) => void;
}

export function SecurityTab({ highPerformanceMode, setHighPerformanceMode }: SecurityTabProps) {
  const [encrypting, setEncrypting] = useState(false);
  const [encrypted, setEncrypted] = useState(false);

  const simulateEncryption = () => {
    if (encrypted) return;
    setEncrypting(true);
    setTimeout(() => {
      setEncrypting(false);
      setEncrypted(true);
      setTimeout(() => setEncrypted(false), 5000); // reset after 5s
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full h-full lg:pr-10">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
        <div className="bg-green-500/20 p-2 rounded-lg"><ShieldCheck className="w-6 h-6 text-green-400" /></div>
        <h2 className="text-2xl font-bold tracking-tight">Security & Encryption</h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden flex-1 flex flex-col justify-center min-h-[400px]">
        <div className={`absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-colors duration-1000 ${encrypted ? 'bg-green-500/20' : 'bg-slate-500/10'}`} />
        
        <div className="max-w-2xl relative z-10 w-full mx-auto lg:mx-0">
          <h3 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white">Prioritize Data <span className="text-green-400">Security</span></h3>
          <p className="text-slate-400 mb-8 border-l-4 border-green-500/50 pl-4 text-base md:text-lg">
            End-to-end encryption for all stored user information. SAMBI ensures your data remains uniquely yours, locked behind military-grade protocols before it even leaves your device.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 w-full max-w-xl">
            <div className="bg-black/40 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3 border border-white/5 hover:bg-white/5 transition-colors">
              <Lock className="w-8 h-8 text-slate-300" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">AES-256</span>
            </div>
            <div className="bg-black/40 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3 border border-white/5 hover:bg-white/5 transition-colors">
              <Key className="w-8 h-8 text-slate-300" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Local Keys</span>
            </div>
            <div className="bg-black/40 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3 border border-white/5 hover:bg-white/5 transition-colors col-span-2 sm:col-span-1">
              <ShieldAlert className="w-8 h-8 text-slate-300" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Zero Trust</span>
            </div>
          </div>

          <div className="mb-6 p-6 border border-white/10 rounded-2xl bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h4 className="text-base font-bold text-white">High Performance Mode</h4>
              </div>
              <p className="text-xs text-slate-400 max-w-sm">
                Reduces background animation intensity and blurs to preserve system resources during complex tasks.
              </p>
            </div>
            
            <button
              onClick={() => setHighPerformanceMode(!highPerformanceMode)}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none flex-shrink-0 ${highPerformanceMode ? 'bg-green-500' : 'bg-slate-600'}`}
            >
              <span className="sr-only">Toggle High Performance Mode</span>
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${highPerformanceMode ? 'translate-x-9' : 'translate-x-1'}`}
              />
            </button>
          </div>

          <div className={`p-6 border rounded-2xl flex flex-col sm:flex-row items-center gap-6 justify-between transition-colors duration-500 ${encrypted ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
            <div className="flex items-center gap-4 text-center sm:text-left">
              {encrypting ? (
                <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-green-400 animate-spin shrink-0 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-green-400 animate-pulse" />
                </div>
              ) : encrypted ? (
                <CheckCircle className="w-12 h-12 text-green-400 shrink-0" />
              ) : (
                <Lock className="w-12 h-12 text-slate-500 shrink-0" />
              )}
              <div>
                <h4 className="text-base font-bold text-white mb-1 shadow-black">{encrypted ? 'Data Secured' : 'Live Encryption Test'}</h4>
                <p className="text-xs text-slate-400">Initialize a mock data encryption to SAMBI vaults.</p>
              </div>
            </div>
            <button 
              onClick={simulateEncryption}
              disabled={encrypting || encrypted}
              className="bg-green-600 hover:bg-green-500 disabled:bg-green-600/30 text-white text-xs font-bold px-6 py-4 rounded-xl uppercase tracking-widest transition-colors w-full sm:w-auto flex items-center justify-center gap-2 whitespace-nowrap min-w-[160px]"
            >
              {encrypting ? (
                "Encrypting..."
              ) : encrypted ? (
                "Secured"
              ) : (
                "Encrypt Data"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
