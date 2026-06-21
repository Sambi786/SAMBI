import React, { useState } from 'react';
import { Terminal, Code, Cpu, ShieldAlert, CheckCircle2, AlertCircle, Zap, Bot, ChevronRight, Star, Target, Award, Trophy, Crown } from 'lucide-react';

const LEVEL_DATA = [
  {
    level: 1,
    title: "Novice",
    task: "Write a function called `sum` that returns the addition of two numbers 'a' and 'b'.",
    aiRestriction: "Full Auto-Complete",
    aiResponse: "I can write this for you! Here is the complete function.",
    autoFill: "function sum(a, b) {\n  return a + b;\n}",
    keywords: ["function", "+", "return"],
    icon: Star,
  },
  {
    level: 2,
    title: "Apprentice",
    task: "Write a `for` loop that prints numbers from 1 to 10 using `console.log`.",
    aiRestriction: "Skeleton Code + Syntax Hints",
    aiResponse: "I will set up the structure for you. You fill in the blanks!",
    autoFill: "for (let i = 1; i <= ___; i++) {\n  console.log(___);\n}",
    keywords: ["for", "10", "console.log"],
    icon: Target,
  },
  {
    level: 3,
    title: "Developer",
    task: "Use the array `.filter()` method to extract only even numbers from an array.",
    aiRestriction: "Concept Hints Only",
    aiResponse: "Use the modulo operator (number % 2 === 0) inside a filter callback.",
    autoFill: null,
    keywords: ["filter", "%", "2"],
    icon: Award,
  },
  {
    level: 4,
    title: "Senior Engineer",
    task: "Implement a basic `debounce` function using `setTimeout` and `clearTimeout`.",
    aiRestriction: "Minimal API Reference",
    aiResponse: "Remember to return a function that clears the previous timeout and sets a new one.",
    autoFill: null,
    keywords: ["setTimeout", "clearTimeout", "return func"],
    icon: Trophy,
  },
  {
    level: 5,
    title: "Grandmaster",
    task: "Write a recursive `deepClone` function for a nested object.",
    aiRestriction: "No AI Assistance",
    aiResponse: "ERROR: SAMBI neural link severed. You must rely purely on human intelligence.",
    autoFill: null,
    keywords: ["typeof", "object", "return"],
    icon: Crown,
  }
];

export function GameTab() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [aiMessage, setAiMessage] = useState("");
  const [gameComplete, setGameComplete] = useState(false);

  const currentLevel = LEVEL_DATA[currentLevelIndex];

  const handleAskAI = () => {
    setAiMessage(currentLevel.aiResponse);
    if (currentLevel.autoFill) {
      setCode(currentLevel.autoFill);
    }
  };

  const handleSubmit = () => {
    // Very simple code check based on required keywords
    const lowerCode = code.toLowerCase();
    const passed = currentLevel.keywords.every((kw) => {
      if (kw === 'return func') return lowerCode.includes("return");
      return lowerCode.includes(kw.toLowerCase());
    });
    
    if (passed) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < LEVEL_DATA.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
      setCode("");
      setStatus("idle");
      setAiMessage("");
    } else {
      setGameComplete(true);
    }
  };

  const restartGame = () => {
    setCurrentLevelIndex(0);
    setCode("");
    setStatus("idle");
    setAiMessage("");
    setGameComplete(false);
  };

  if (gameComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center w-full lg:pr-10">
        <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-500/20">
          <Terminal className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-extrabold mb-4">Neural Link <span className="text-green-400">Mastered</span></h2>
        <p className="text-slate-400 max-w-md mb-8">
          You have successfully navigated all 5 levels without SAMBI's help at the final stage. You are a true AI & Logic grandmaster.
        </p>
        <button 
          onClick={restartGame}
          className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 px-8 rounded-xl uppercase tracking-widest text-xs transition-colors"
        >
          Restart Simulation
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full lg:pr-10">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-green-500/20 p-2 rounded-lg"><Terminal className="w-6 h-6 text-green-400" /></div>
          <h2 className="text-2xl font-bold tracking-tight">Code Logic Simulator</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 pt-1">Badges:</div>
          <div className="flex gap-2">
            {LEVEL_DATA.map((lvl, idx) => {
              const isEarned = gameComplete || currentLevelIndex > idx;
              const Icon = lvl.icon;
              return (
                <div key={lvl.level} className={`relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 ${isEarned ? 'bg-yellow-500/20 border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.4)] scale-110' : 'bg-white/5 border-white/10 opacity-40 grayscale'}`}>
                  <Icon className={`w-4 h-4 ${isEarned ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]' : 'text-slate-500'}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        <div className="flex flex-col gap-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${currentLevel.level === 5 ? 'from-red-500 to-orange-500' : 'from-green-500 to-emerald-500'}`} />
            <h3 className="text-xl font-bold mb-2">Level {currentLevel.level}: {currentLevel.title}</h3>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">{currentLevel.task}</p>
            
            <div className="flex items-center gap-2 mt-4 text-xs font-mono text-slate-400 bg-black/40 px-3 py-2 rounded-lg">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>AI Access: <span className={currentLevel.level === 5 ? "text-red-400" : "text-white"}>{currentLevel.aiRestriction}</span></span>
            </div>
          </div>

          <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-3xl p-6 backdrop-blur-md flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm uppercase font-bold text-slate-400 tracking-widest flex items-center gap-2">
                <Code className="w-4 h-4" /> Code Terminal
              </h3>
              <button 
                onClick={handleAskAI}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-green-600/20 text-green-300 hover:bg-green-600/40 hover:text-white px-3 py-1.5 rounded-lg transition-colors border border-green-500/30"
              >
                <Bot className="w-3.5 h-3.5" /> Ask SAMBI
              </button>
            </div>
            
            {aiMessage && (
              <div className={`mb-4 p-3 rounded-lg border text-sm flex gap-3 items-start ${currentLevel.level === 5 ? 'bg-red-500/10 border-red-500/30 text-red-200' : 'bg-green-500/10 border-green-500/30 text-green-200'}`}>
                {currentLevel.level === 5 ? <ShieldAlert className="w-5 h-5 shrink-0" /> : <Zap className="w-5 h-5 shrink-0" />}
                <p>{aiMessage}</p>
              </div>
            )}

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Write your code here..."
              className="w-full h-48 bg-[#020306] border border-white/10 rounded-xl p-4 font-mono text-sm text-green-400 focus:outline-none focus:border-green-500/50 resize-y"
            />

            <div className="mt-4 flex items-center justify-between gap-4">
              <button 
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                Compile & Test
              </button>
              
              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" /> Test Passed
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                  <AlertCircle className="w-5 h-5" /> Test Failed
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          {status === 'success' ? (
             <div className="bg-green-500/10 border border-green-500/30 rounded-3xl p-8 backdrop-blur-md flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
               <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                 <CheckCircle2 className="w-8 h-8 text-green-400" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Simulation Success</h3>
               <p className="text-green-200 text-sm mb-6">Your code meets all logical requirements for Level {currentLevel.level}.</p>
               <button 
                 onClick={handleNextLevel}
                 className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs flex justify-center items-center gap-2 transition-colors"
               >
                 Proceed to Next Level <ChevronRight className="w-4 h-4" />
               </button>
             </div>
          ) : (
            <div className="border border-white/5 bg-black/20 rounded-[32px] p-8 h-full flex flex-col items-center justify-center text-center gap-4 text-slate-500">
              <Cpu className="w-12 h-12 opacity-20" />
              <p className="text-sm">Awaiting code submission...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
