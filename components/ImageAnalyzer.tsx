import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, Loader2 } from 'lucide-react';
import { analyzeImage } from '../services/geminiService';

const ImageAnalyzer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const result = await analyzeImage(image, "Analyze this image warmly and specifically for Jinane. If it's a selfie, compliment her. If it's a room/object, comment on it supportively.");
      setAnalysis(result);
    } catch (e) {
      setAnalysis("Could not analyze right now, but I bet it looks great!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-rose-100 p-6">
      <h2 className="text-2xl font-bold text-rose-900 font-cursive mb-1">Show Amine</h2>
      <p className="text-sm text-slate-500 mb-6">Upload a selfie, your outfit, or your tidy room.</p>

      {!image ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-rose-200 rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-rose-50 transition-colors group"
        >
          <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Camera className="w-8 h-8 text-rose-400" />
          </div>
          <p className="text-rose-400 font-medium">Tap to upload photo</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square sm:aspect-video bg-black">
            <img src={image} alt="Upload" className="w-full h-full object-contain" />
            <button 
              onClick={() => { setImage(null); setAnalysis(null); }}
              className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              ✕
            </button>
          </div>

          {!analysis ? (
             <button
               onClick={handleAnalyze}
               disabled={loading}
               className="w-full py-3 bg-rose-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200"
             >
               {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
               Ask Amine's Opinion
             </button>
          ) : (
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
              <div className="flex gap-2 items-start mb-2">
                <span className="text-2xl">❤️</span>
                <p className="text-rose-800 font-medium text-sm leading-relaxed">{analysis}</p>
              </div>
              <button 
                onClick={() => { setImage(null); setAnalysis(null); }}
                className="text-xs text-rose-400 underline mt-2 hover:text-rose-600"
              >
                Upload another
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageAnalyzer;
