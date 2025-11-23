import React, { useState } from 'react';
import { CHALLENGES } from '../constants';
import { Challenge } from '../types';
import { Loader2, RefreshCw, Flame, Heart } from 'lucide-react';

interface ChallengeWheelProps {
  onComplete: (challenge: Challenge) => void;
  onCancel: () => void;
}

const ChallengeWheel: React.FC<ChallengeWheelProps> = ({ onComplete, onCancel }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<Challenge | null>(null);
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    // Random rotations: at least 5 full spins (1800 deg) + random segment
    const randomOffset = Math.floor(Math.random() * 360);
    const totalRotation = 1800 + randomOffset;
    
    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const randomChallenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
      setResult(randomChallenge);
    }, 3000); // 3 seconds spin
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 relative overflow-hidden shadow-2xl animate-float border-4 border-rose-300">
        {/* Sexy Header Gradient */}
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500"></div>
        
        {!result ? (
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold text-rose-900 font-cursive mb-2">Naughty Girl... 😈</h2>
            <p className="text-rose-500 mb-8 font-medium">You skipped a task. Now you must pay the price.</p>

            <div className="relative w-64 h-64 mx-auto mb-8">
              {/* Pointer */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10 text-red-600 filter drop-shadow-md">
                <Flame className="w-12 h-12 fill-red-500 animate-pulse" />
              </div>
              
              {/* Wheel */}
              <div 
                className="w-full h-full rounded-full border-8 border-rose-200 relative overflow-hidden transition-transform duration-[3000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  background: 'conic-gradient(#fecdd3 0% 12.5%, #fff1f2 12.5% 25%, #fda4af 25% 37.5%, #fff1f2 37.5% 50%, #fecdd3 50% 62.5%, #fff1f2 62.5% 75%, #fda4af 75% 87.5%, #fff1f2 87.5% 100%)'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-20 h-20 bg-white rounded-full shadow-lg border-4 border-rose-100 flex items-center justify-center z-10">
                     <span className="text-4xl animate-bounce">💋</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
                <button 
                  onClick={onCancel}
                  className="px-6 py-3 text-slate-400 hover:text-rose-500 font-medium text-sm transition-colors"
                  disabled={isSpinning}
                >
                  I'm scared...
                </button>
                <button
                  onClick={spin}
                  disabled={isSpinning}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-full font-bold shadow-xl shadow-rose-200 flex items-center gap-2 transform transition hover:scale-105 active:scale-95"
                >
                  {isSpinning ? <Loader2 className="animate-spin w-5 h-5" /> : <Flame className="w-5 h-5" />}
                  Accept Punishment
                </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl shadow-inner border border-red-100 animate-pulse-slow">
              {result.type === 'romantic' ? '💖' : result.type === 'daring' ? '🔥' : '😈'}
            </div>
            
            <h3 className="text-2xl font-bold text-rose-900 mb-2 font-cursive">Your Sexy Dare</h3>
            
            <div className="bg-rose-50 p-6 rounded-2xl mb-8 border border-rose-200 shadow-sm transform rotate-1">
              <p className="text-xl text-rose-800 font-medium leading-relaxed font-cursive">
                "{result.text}"
              </p>
            </div>
            
            <button
              onClick={() => onComplete(result)}
              className="w-full py-4 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-2xl font-bold shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-white" />
              I'll Do It For You
            </button>
            <p className="text-xs text-rose-400 mt-4 italic">You better send proof... 😉</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeWheel;