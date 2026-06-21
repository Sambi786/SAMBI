import React from 'react';
import { Fingerprint, Globe, Cpu, Users } from 'lucide-react';

export function AboutTab() {
  return (
    <div className="flex flex-col gap-10 lg:pr-10 pb-10">
      <section className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
          OUR <span className="text-green-500">MISSION</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          We are SMNB Intelligence. We build the architecture of tomorrow, ensuring technology serves humanity through intelligent orchestration.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
          <div className="bg-green-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Fingerprint className="w-6 h-6 text-green-400" />
          </div>
          <h2 className="text-xl font-bold mb-2">Meaning & Origin</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            SAMBI (Smart Assistant Made By Intelligence) was born from a simple realization: digital lives are becoming unmanageable. We exist to bridge the gap between chaotic data and flawless execution.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
          <div className="bg-emerald-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold mb-2">Why We Exist</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            In a world drowning in apps and disjointed services, we provide a unified core. We believe AI shouldn't just answer questions—it should orchestrate workflows, secure data, and anticipate needs.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-3xl p-8 backdrop-blur-md mt-4">
        <div className="flex items-center gap-4 mb-6">
          <Cpu className="w-8 h-8 text-lime-400" />
          <h2 className="text-2xl font-bold">What The App Does</h2>
        </div>
        <p className="text-slate-300 mb-6 leading-relaxed">
          SAMBI serves as your central command center. Through its intuitive interface, you gain access to:
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-green-500/20 rounded p-1"><Users className="w-4 h-4 text-green-400" /></div>
            <div>
              <h3 className="font-bold text-sm text-slate-200">Adaptive Ecosystem</h3>
              <p className="text-xs text-slate-400 mt-1">Integrates seamlessly with your tasks, schedules, and data analytics.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-green-500/20 rounded p-1"><Cpu className="w-4 h-4 text-green-400" /></div>
            <div>
              <h3 className="font-bold text-sm text-slate-200">Neural Acceleration</h3>
              <p className="text-xs text-slate-400 mt-1">Learns your habits and automates routine operations without explicit commands.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
