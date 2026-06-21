import React, { useState } from 'react';
import { Sparkles, Network, Database, Shield, ChevronDown } from "lucide-react";

const FAQ_DATA = [
  {
    question: "What does SAMBI stand for?",
    answer: "SAMBI stands for Smart Assistant Made By Intelligence. It represents our core philosophy of building intuitive, highly capable AI systems that seamlessly integrate into and orchestrate your digital life."
  },
  {
    question: "What exactly is SAMBI capable of?",
    answer: "SAMBI goes beyond traditional AI assistants. It can orchestrate complex workflows, generate full-stack applications on the fly, analyze massive datasets in real-time, and act as a central hub for all your digital operations."
  },
  {
    question: "Is my data secure with SAMBI?",
    answer: "Absolutely. SAMBI employs military-grade E2E encryption and processes sensitive data strictly on-device wherever possible, ensuring your personal and business intelligence remains completely confidential."
  },
  {
    question: "Can SAMBI integrate with tools I already use?",
    answer: "Yes, SAMBI features a seamless 'Ecosystem' architecture that allows it to communicate flawlessly with external APIs, cloud services, and your existing software stack securely."
  },
  {
    question: "How does SAMBI's self-learning work?",
    answer: "SAMBI utilizes advanced neural pathways to adapt specifically to your unique workflow. The more you interact with it, the better it anticipates your needs and optimizes your digital environment."
  }
];

export function OverviewTab() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-10 lg:pr-10 pb-10">
      <section>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.9] mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
          THE SMART <br /> <span className="text-green-500">ASSISTANT</span> OF <br /> THE FUTURE.
        </h1>
        <p className="text-lg text-slate-400 max-w-lg mb-8 border-l-2 border-green-500/50 pl-4">
          Smart Assistant Made By (SMNB) Intelligence. Beyond simple queries—Sambi orchestrates your entire digital existence.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all hover:bg-white/10 group cursor-default">
          <div className="text-green-400 mb-2 group-hover:scale-110 transition-transform"><Sparkles className="w-6 h-6" /></div>
          <h3 className="font-bold mb-1 uppercase text-xs tracking-wider">App Architecture</h3>
          <p className="text-sm text-slate-400">Generate full applications and games from simple prompts.</p>
        </div>
        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all hover:bg-white/10 group cursor-default">
          <div className="text-emerald-400 mb-2 group-hover:scale-110 transition-transform"><Network className="w-6 h-6" /></div>
          <h3 className="font-bold mb-1 uppercase text-xs tracking-wider">AI Orchestration</h3>
          <p className="text-sm text-slate-400">Masters any external AI to automate your specific routines.</p>
        </div>
        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all hover:bg-white/10 group cursor-default">
          <div className="text-lime-400 mb-2 group-hover:scale-110 transition-transform"><Database className="w-6 h-6" /></div>
          <h3 className="font-bold mb-1 uppercase text-xs tracking-wider">Data Insights</h3>
          <p className="text-sm text-slate-400">Interactive dashboards providing real-time habit analytics.</p>
        </div>
        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all hover:bg-white/10 group cursor-default">
          <div className="text-green-400 mb-2 group-hover:scale-110 transition-transform"><Shield className="w-6 h-6" /></div>
          <h3 className="font-bold mb-1 uppercase text-xs tracking-wider">E2E Encryption</h3>
          <p className="text-sm text-slate-400">Advanced security protocols ensuring data is for your eyes only.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Frequently Asked Questions</h2>
        {FAQ_DATA.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-300"
          >
            <button 
              onClick={() => toggleFaq(index)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            >
              <span className="font-bold text-slate-200">{faq.question}</span>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaqIndex === index ? "rotate-180" : ""}`} />
            </button>
            <div 
              className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? "max-h-48 pb-5 opacity-100" : "max-h-0 pb-0 opacity-0"}`}
            >
              <p className="text-sm text-slate-400">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
