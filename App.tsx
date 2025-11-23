import React, { useState, useEffect } from 'react';
import { ViewState, Task } from './types';
import { TASK_POOL, LOVE_MESSAGES } from './constants';
import DailyTasks from './components/DailyTasks';
import ChallengeWheel from './components/ChallengeWheel';
import AiChat from './components/AiChat';
import ImageAnalyzer from './components/ImageAnalyzer';
import Gallery from './components/Gallery';
import { Home, Camera, MessageCircle, Image, Star } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('tasks');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showWheel, setShowWheel] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize tasks
  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('jinane_date');
    const storedTasks = localStorage.getItem('jinane_tasks');

    if (storedDate === today && storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      // Shuffle new tasks
      const shuffled = [...TASK_POOL].sort(() => 0.5 - Math.random()).slice(0, 6);
      const newTasks = shuffled.map((t, i) => ({ ...t, id: `t-${i}`, completed: false }));
      setTasks(newTasks);
      localStorage.setItem('jinane_tasks', JSON.stringify(newTasks));
      localStorage.setItem('jinane_date', today);
    }

    // Random love message toast
    const randomMsg = LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)];
    setToastMessage(randomMsg);
    setTimeout(() => setToastMessage(null), 5000);
  }, []);

  const handleToggleTask = (taskId: string) => {
    const newTasks = tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
    localStorage.setItem('jinane_tasks', JSON.stringify(newTasks));
  };

  const handleSkipTask = (taskId: string) => {
    setShowWheel(true);
  };

  return (
    <div className="min-h-screen bg-rose-50 text-slate-800 pb-24 font-sans max-w-lg mx-auto relative shadow-2xl overflow-hidden sm:rounded-3xl sm:my-8 sm:border-8 sm:border-rose-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-rose-200 z-50 animate-float flex items-center gap-2 max-w-xs text-center">
          <span className="text-xl">🌸</span>
          <p className="text-sm font-semibold text-rose-600">{toastMessage}</p>
        </div>
      )}

      {/* Main Content Area */}
      <main className="p-6 pt-12 space-y-8">
        
        {/* Header (Only on Tasks view) */}
        {view === 'tasks' && (
           <header className="text-center mb-8">
             <h1 className="text-4xl font-bold font-cursive text-rose-600 mb-1">Amine Watching Jinane</h1>
             <p className="text-rose-400 text-sm tracking-wide uppercase font-bold">Day {new Date().getDate()} • My Flower</p>
           </header>
        )}

        {view === 'tasks' && (
          <DailyTasks 
            tasks={tasks} 
            onToggleTask={handleToggleTask}
            onSkipTask={handleSkipTask}
          />
        )}

        {view === 'chat' && <AiChat />}
        {view === 'camera' && <ImageAnalyzer />}
        {view === 'gallery' && <Gallery />}
        
        {/* Placeholder for other views */}
        {view === 'journal' && (
          <div className="text-center py-20 text-rose-300">
             <Star className="w-16 h-16 mx-auto mb-4 opacity-50" />
             <p>Journal coming soon, my queen!</p>
          </div>
        )}

      </main>

      {/* Challenge Wheel Modal */}
      {showWheel && (
        <ChallengeWheel 
          onCancel={() => setShowWheel(false)}
          onComplete={(challenge) => {
            setShowWheel(false);
            setToastMessage(`Promise me you'll do it: ${challenge.text}`);
            setTimeout(() => setToastMessage(null), 6000);
          }}
        />
      )}

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 w-full bg-white border-t border-rose-100 px-6 py-4 flex justify-between items-center z-40 rounded-t-3xl shadow-[0_-5px_20px_-5px_rgba(244,63,94,0.1)]">
        <NavButton 
          icon={<Home className="w-6 h-6" />} 
          label="Home" 
          active={view === 'tasks'} 
          onClick={() => setView('tasks')} 
        />
        <NavButton 
          icon={<MessageCircle className="w-6 h-6" />} 
          label="Amine" 
          active={view === 'chat'} 
          onClick={() => setView('chat')} 
        />
        <div className="relative -top-6">
          <button 
            onClick={() => setView('camera')}
            className="w-16 h-16 bg-rose-500 rounded-full text-white shadow-lg shadow-rose-300 flex items-center justify-center transform transition active:scale-95 hover:bg-rose-600 border-4 border-rose-50"
          >
            <Camera className="w-7 h-7" />
          </button>
        </div>
        <NavButton 
          icon={<Image className="w-6 h-6" />} 
          label="Gallery" 
          active={view === 'gallery'} 
          onClick={() => setView('gallery')} 
        />
        <NavButton 
          icon={<Star className="w-6 h-6" />} 
          label="Journal" 
          active={view === 'journal'} 
          onClick={() => setView('journal')} 
        />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-rose-500' : 'text-slate-300 hover:text-rose-300'}`}
  >
    {icon}
    <span className="text-[10px] font-bold">{label}</span>
  </button>
);

export default App;
