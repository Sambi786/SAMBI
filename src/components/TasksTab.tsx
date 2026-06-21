import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, BarChart3, Plus } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Task = { id: string; text: string; completed: boolean; }

const chartData = [
  { name: 'Mon', focus: 65, tasks: 4 },
  { name: 'Tue', focus: 75, tasks: 5 },
  { name: 'Wed', focus: 85, tasks: 7 },
  { name: 'Thu', focus: 82, tasks: 6 },
  { name: 'Fri', focus: 90, tasks: 8 },
  { name: 'Sat', focus: 60, tasks: 2 },
  { name: 'Sun', focus: 95, tasks: 9 },
];

export function TasksTab() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Generate Q3 productivity report', completed: false },
    { id: '2', text: 'Analyze market trends via AI Orchestration', completed: true },
    { id: '3', text: 'Review daily real-time insights', completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };
  
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([{ id: Date.now().toString(), text: newTask, completed: false }, ...tasks]);
    setNewTask("");
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="flex flex-col w-full h-full lg:pr-10">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
        <div className="bg-green-500/20 p-2 rounded-lg"><Clock className="w-6 h-6 text-green-400" /></div>
        <h2 className="text-2xl font-bold tracking-tight">Ecosystem & Tasks</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col h-full min-h-[400px]">
          <h3 className="text-sm uppercase font-bold text-slate-400 tracking-widest mb-4">Daily Management</h3>
          <form onSubmit={addTask} className="mb-4 relative">
            <input 
              type="text" 
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="w-full bg-black/20 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-green-500/50 text-white placeholder-slate-500 transition-colors"
            />
            <button type="submit" disabled={!newTask.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:hover:bg-green-600 rounded-lg transition-colors">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </form>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            {tasks.map(task => (
              <div 
                key={task.id} 
                onClick={() => toggleTask(task.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border border-white/5 cursor-pointer transition-colors ${task.completed ? 'bg-white/5 opacity-60 hover:opacity-80' : 'bg-white/10 hover:bg-white/20'}`}
              >
                {task.completed ? <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" /> : <Circle className="w-5 h-5 text-slate-400 shrink-0 group-hover:text-slate-300" />}
                <span className={`text-sm select-none ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                  {task.text}
                </span>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="text-center text-slate-500 text-sm mt-10">No tasks remaining. You're all caught up!</div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-400 flex justify-between shrink-0">
            <span>{completedCount} of {tasks.length} tasks completed</span>
            <span>{Math.round((completedCount/tasks.length)*100 || 0)}% Productivity</span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col h-full min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm uppercase font-bold text-slate-400 tracking-widest">Real-time Insights</h3>
            <div className="bg-emerald-500/20 p-2 rounded-lg"><BarChart3 className="w-5 h-5 text-emerald-400" /></div>
          </div>
          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="focus" stroke="#4ade80" strokeWidth={2} fillOpacity={1} fill="url(#colorFocus)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 mt-4 text-center shrink-0">Automated focus score reports based on weekly habits.</p>
        </div>
      </div>
    </div>
  );
}
