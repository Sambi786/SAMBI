/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, X, Loader2, Sparkles, Network, Database, Shield, Home, Gamepad2, Info, Mail, ListTodo, Menu } from "lucide-react";
import { OverviewTab } from "./components/OverviewTab";
import { TasksTab } from "./components/TasksTab";
import { SecurityTab } from "./components/SecurityTab";
import { GameTab } from "./components/GameTab";
import { AboutTab } from "./components/AboutTab";
import logoUrl from "./assets/images/sambi_logo_1782028791913.jpg";

type Message = {
  role: "user" | "model";
  text: string;
};

export default function App() {
  const [activeTab, setActiveTab] = useState<"overview" | "tasks" | "security" | "game" | "about" | "connect">("overview");
  const [highPerformanceMode, setHighPerformanceMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("sambi_chat_history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse chat history", e);
      }
    }
    return [
      {
        role: "model",
        text: "Hello! I am SAMBI (Smart Assistant Made By (SMNB) Intelligence). How can I assist you today?",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("sambi_chat_history", JSON.stringify(messages));
  }, [messages]);

  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;

    const newMsg: Message = { role: "user", text: inputVal.trim() };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setInputVal("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      // Add a placeholder message for the model
      setMessages((prev) => [...prev, { role: "model", text: "" }]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        const lines = chunkValue.split("\n\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.replace("data: ", "");
            if (dataStr === "[DONE]") {
              done = true;
              break;
            }
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                setMessages((prev) => {
                  const newMsgs = [...prev];
                  newMsgs[newMsgs.length - 1].text += parsed.text;
                  return newMsgs;
                });
              } else if (parsed.error) {
                console.error("Chat API sent error:", parsed.error);
                setMessages((prev) => {
                  const newMsgs = [...prev];
                  newMsgs[newMsgs.length - 1].text = "Sorry, an error occurred: " + parsed.error;
                  return newMsgs;
                });
              }
            } catch (e) {
              // Ignore parse errors from partial chunks
            }
          }
        }
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const playSuccessSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.1); // C6
      
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.log('Audio playback failed', e);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) throw new Error("Failed to submit");
      
      setFormStatus("success");
      playSuccessSound();
      setFormData({ name: "", email: "", project: "" });
      setTimeout(() => setFormStatus("idle"), 3000);
    } catch (error) {
      console.error(error);
      setFormStatus("idle");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020306] text-slate-100 flex flex-col relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-600/20 rounded-full transition-all duration-1000 ${highPerformanceMode ? 'blur-[40px] opacity-20' : 'blur-[120px] animate-pulse'} pointer-events-none`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/20 rounded-full transition-all duration-1000 ${highPerformanceMode ? 'blur-[40px] opacity-20' : 'blur-[120px] animate-pulse delay-500'} pointer-events-none`} />
      <div className={`absolute top-[20%] right-[15%] w-[10%] h-[10%] bg-lime-400/10 rounded-full transition-all duration-1000 ${highPerformanceMode ? 'blur-[20px] opacity-20' : 'blur-[60px] animate-pulse delay-700'} pointer-events-none`} />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-10 py-6 md:py-8 border-b border-white/5 bg-white/5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center shadow-lg shadow-green-500/20 cursor-pointer" onClick={() => setActiveTab("overview")}>
            <img src={logoUrl} alt="SAMBI Logo" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white cursor-pointer" onClick={() => setActiveTab("overview")}>
            SAMBI<span className="text-green-400 text-[10px] align-top ml-1 uppercase">Beta</span>
          </span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
          <button onClick={() => setActiveTab("overview")} className={`flex flex-col items-center gap-1.5 hover:text-white transition-all ${activeTab === 'overview' ? 'text-green-400 scale-110' : ''}`} title="Intelligence (Home)">
            <Home className="w-5 h-5" />
          </button>
          <button onClick={() => setActiveTab("tasks")} className={`flex flex-col items-center gap-1.5 hover:text-white transition-all ${activeTab === 'tasks' ? 'text-green-400 scale-110' : ''}`} title="Ecosystem (Tasks)">
            <ListTodo className="w-5 h-5" />
          </button>
          <button onClick={() => setActiveTab("security")} className={`flex flex-col items-center gap-1.5 hover:text-white transition-all ${activeTab === 'security' ? 'text-green-400 scale-110' : ''}`} title="Security">
            <Shield className="w-5 h-5" />
          </button>
          <button onClick={() => setActiveTab("game")} className={`flex flex-col items-center gap-1.5 hover:text-white transition-all ${activeTab === 'game' ? 'text-green-400 scale-110' : ''}`} title="Game">
            <Gamepad2 className="w-5 h-5" />
          </button>
          <button onClick={() => setActiveTab("about")} className={`flex flex-col items-center gap-1.5 hover:text-white transition-all ${activeTab === 'about' ? 'text-green-400 scale-110' : ''}`} title="About">
            <Info className="w-5 h-5" />
          </button>
          <button onClick={() => setActiveTab("connect")} className={`flex flex-col items-center gap-1.5 hover:text-white transition-all ${activeTab === 'connect' ? 'text-green-400 scale-110' : ''}`} title="Connect">
            <Mail className="w-5 h-5" />
          </button>
        </nav>
        <button className="md:hidden p-2 text-slate-400 hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[88px] left-0 right-0 z-50 bg-[#020306]/95 backdrop-blur-xl border-b border-white/10 md:hidden flex flex-col px-6 py-6 gap-6 shadow-2xl">
           <button onClick={() => { setActiveTab("overview"); setIsMobileMenuOpen(false); }} className={`flex items-center gap-4 text-sm font-bold uppercase tracking-widest ${activeTab === 'overview' ? 'text-green-400' : 'text-slate-400'}`}><Home className="w-5 h-5"/> Intelligence</button>
           <button onClick={() => { setActiveTab("tasks"); setIsMobileMenuOpen(false); }} className={`flex items-center gap-4 text-sm font-bold uppercase tracking-widest ${activeTab === 'tasks' ? 'text-green-400' : 'text-slate-400'}`}><ListTodo className="w-5 h-5"/> Ecosystem</button>
           <button onClick={() => { setActiveTab("security"); setIsMobileMenuOpen(false); }} className={`flex items-center gap-4 text-sm font-bold uppercase tracking-widest ${activeTab === 'security' ? 'text-green-400' : 'text-slate-400'}`}><Shield className="w-5 h-5"/> Security</button>
           <button onClick={() => { setActiveTab("game"); setIsMobileMenuOpen(false); }} className={`flex items-center gap-4 text-sm font-bold uppercase tracking-widest ${activeTab === 'game' ? 'text-green-400' : 'text-slate-400'}`}><Gamepad2 className="w-5 h-5"/> Game</button>
           <button onClick={() => { setActiveTab("about"); setIsMobileMenuOpen(false); }} className={`flex items-center gap-4 text-sm font-bold uppercase tracking-widest ${activeTab === 'about' ? 'text-green-400' : 'text-slate-400'}`}><Info className="w-5 h-5"/> About</button>
           <button onClick={() => { setActiveTab("connect"); setIsMobileMenuOpen(false); }} className={`flex items-center gap-4 text-sm font-bold uppercase tracking-widest ${activeTab === 'connect' ? 'text-green-400' : 'text-slate-400'}`}><Mail className="w-5 h-5"/> Connect</button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-6 md:px-10 py-10 relative z-10 max-w-7xl mx-auto w-full">
        {activeTab !== 'connect' ? (
          <div className="w-full lg:max-w-4xl lg:mx-auto flex flex-col gap-10">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'tasks' && <TasksTab />}
            {activeTab === 'security' && <SecurityTab highPerformanceMode={highPerformanceMode} setHighPerformanceMode={setHighPerformanceMode} />}
            {activeTab === 'game' && <GameTab />}
            {activeTab === 'about' && <AboutTab />}
          </div>
        ) : (
          <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
            {/* Contact Form */}
            <div className={`flex-1 bg-gradient-to-b from-white/10 to-transparent border rounded-[32px] p-8 backdrop-blur-xl relative transition-all duration-1000 ${formStatus === 'success' ? 'border-green-400/50 shadow-[0_0_30px_rgba(74,222,128,0.2)]' : 'border-white/10'}`}>
              <div className="absolute -top-3 -right-3 px-4 py-1 bg-green-600 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                Priority Access
              </div>
              <h2 className="text-3xl font-bold mb-6 tracking-tight">
                Connect with <br />
                <span className="text-green-400">Intelligence</span>
              </h2>
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 mb-2 block tracking-widest">
                    Identification
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500/50 transition-colors text-sm text-white placeholder-slate-600"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 mb-2 block tracking-widest">
                    Digital Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@smnb.io"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500/50 transition-colors text-sm text-white placeholder-slate-600"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 mb-2 block tracking-widest">
                    Project Requirements
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    placeholder="What do you wish to create?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500/50 transition-colors text-sm resize-none text-white placeholder-slate-600"
                  ></textarea>
                </div>
                <button
                  disabled={formStatus !== "idle"}
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-xl shadow-green-900/20 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Transmitting...
                    </>
                  ) : formStatus === "success" ? (
                    "Request Transmitted"
                  ) : (
                    "Transmit Request"
                  )}
                </button>
              </form>
            </div>

            <div className="h-20 bg-white/5 rounded-2xl flex items-center px-6 border border-white/5">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-[#020306] bg-slate-700"></div>
                <div className="w-8 h-8 rounded-full border-2 border-[#020306] bg-slate-600"></div>
                <div className="w-8 h-8 rounded-full border-2 border-[#020306] bg-slate-500"></div>
              </div>
              <p className="ml-4 text-xs text-slate-400">
                <span className="text-white font-bold italic">1,200+</span> innovators already on waitlist
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-6 border-t border-white/5 bg-black/40 flex justify-between items-center relative z-10">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">
          &copy; 2026 SMNB Intelligence. All Rights Reserved.
        </p>
        <div className="hidden sm:flex gap-4">
          <span className="text-[10px] text-slate-400 font-mono">STABILITY: 99.98%</span>
          <span className="text-[10px] text-slate-400 font-mono">LATENCY: 12ms</span>
        </div>
      </footer>

      {/* Floating Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isChatOpen && (
          <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl flex flex-col overflow-hidden shadow-2xl shadow-green-900/20">
            {/* Chat Header */}
            <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center bg-black/20">
              <div className="flex items-center gap-2">
                <img src={logoUrl} alt="SAMBI Bot" referrerPolicy="no-referrer" className="w-6 h-6 rounded-md object-cover" />
                <span className="font-bold text-sm tracking-widest uppercase">SAMBI Chat</span>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Conversation */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}
                >
                  {msg.role === "model" && (
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-green-500/30 flex items-center justify-center shrink-0">
                      <img src={logoUrl} alt="SAMBI Bot avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-green-600 text-white rounded-tr-sm" 
                        : "bg-white/5 border border-white/10 text-slate-300 rounded-tl-sm"
                    }`}
                  >
                    {msg.text || (msg.role === "model" && isLoading && idx === messages.length - 1 ? (
                      <span className="flex gap-1 items-center h-4">
                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75"></span>
                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150"></span>
                      </span>
                    ) : null)}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-slate-300" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-black/40 border-t border-white/10 flex gap-2 items-end">
              <textarea
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (inputVal.trim()) handleSendMessage(e);
                  }
                }}
                placeholder="Ask SAMBI anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500/50 resize-none"
                rows={1}
                style={{ minHeight: "40px", maxHeight: "120px" }}
              />
              <button 
                type="submit" 
                disabled={isLoading || !inputVal.trim()}
                className="h-[40px] px-3 bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center shrink-0 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 hover:scale-105 transition-transform rounded-full shadow-2xl flex items-center justify-center border border-white/20 overflow-hidden shadow-green-500/20 p-0"
        >
          {isChatOpen ? <div className="w-full h-full bg-slate-800 flex items-center justify-center"><X className="w-6 h-6 text-white" /></div> : <img src={logoUrl} alt="SAMBI AI" referrerPolicy="no-referrer" className="w-full h-full object-cover" />}
        </button>
      </div>
    </div>
  );
}

