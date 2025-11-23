import React from 'react';
import { Task, TaskCategory } from '../types';
import { CATEGORY_ICONS } from '../constants';
import { CheckCircle, Circle, ArrowRight, Skull } from 'lucide-react';

interface DailyTasksProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onSkipTask: (taskId: string) => void;
}

const DailyTasks: React.FC<DailyTasksProps> = ({ tasks, onToggleTask, onSkipTask }) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-rose-100/50 border border-rose-100">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-2xl font-bold text-rose-900 font-cursive">Today's Mission</h2>
            <p className="text-rose-400 text-sm">Make Amine proud!</p>
          </div>
          <div className="text-right">
             <span className="text-3xl font-bold text-rose-500">{completedCount}</span>
             <span className="text-rose-300">/{tasks.length}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-rose-50 rounded-full h-3 mb-6 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-rose-400 to-rose-600 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-3">
          {tasks.map((task) => {
            const Icon = CATEGORY_ICONS[task.category];
            return (
              <div 
                key={task.id}
                className={`group flex items-center p-3 rounded-2xl border transition-all duration-300 ${
                  task.completed 
                    ? 'bg-rose-50 border-rose-200 opacity-70' 
                    : 'bg-white border-rose-100 hover:border-rose-300 hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => onToggleTask(task.id)}
                  className={`p-2 rounded-full transition-colors ${
                    task.completed ? 'text-rose-500' : 'text-rose-200 group-hover:text-rose-400'
                  }`}
                >
                  {task.completed ? <CheckCircle className="w-6 h-6 fill-rose-100" /> : <Circle className="w-6 h-6" />}
                </button>
                
                <div className="flex-1 ml-2">
                  <p className={`text-sm font-medium ${task.completed ? 'text-rose-400 line-through' : 'text-slate-700'}`}>
                    {task.text}
                  </p>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-[10px] uppercase tracking-wider text-rose-400 font-bold bg-rose-50 px-2 py-0.5 rounded-md">
                      {task.category.split('&')[0]}
                    </span>
                    <span className="text-[10px] text-yellow-500 font-bold">+{task.points} pts</span>
                  </div>
                </div>

                {!task.completed && (
                  <button 
                    onClick={() => onSkipTask(task.id)}
                    className="flex flex-col items-center justify-center px-3 py-2 rounded-xl border border-rose-100 text-rose-300 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all active:scale-95"
                    title="Skip & Spin The Sexy Wheel"
                  >
                    <span className="text-[10px] font-bold uppercase">Skip</span>
                    <span className="text-sm">😈</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {progress === 100 && (
        <div className="bg-gradient-to-br from-rose-400 to-rose-600 rounded-3xl p-6 text-white text-center animate-pulse-slow shadow-lg">
          <h3 className="text-2xl font-cursive mb-2">Good Girl! 💖</h3>
          <p className="opacity-90">All tasks done. Amine is watching and smiling.</p>
        </div>
      )}
    </div>
  );
};

export default DailyTasks;