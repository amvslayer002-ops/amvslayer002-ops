import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../types';
import { Plus, Lock, Image as ImageIcon } from 'lucide-react';

const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLocked, setIsLocked] = useState(false); // Default unlocked for demo, usually true
  const [passcode, setPasscode] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('jinane_gallery');
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newItem: GalleryItem = {
          id: Date.now().toString(),
          url: reader.result as string,
          date: new Date().toLocaleDateString(),
          caption: "Sweet Memory"
        };
        const updated = [newItem, ...items];
        setItems(updated);
        localStorage.setItem('jinane_gallery', JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl shadow-lg border border-rose-100">
        <Lock className="w-12 h-12 text-rose-300 mb-4" />
        <h3 className="text-rose-900 font-bold mb-2">Private Gallery</h3>
        <input 
          type="password" 
          value={passcode}
          onChange={(e) => {
            setPasscode(e.target.value);
            if(e.target.value === '1234') setIsLocked(false);
          }}
          placeholder="Enter Passcode"
          className="bg-rose-50 rounded-full px-4 py-2 text-center text-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-300"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-bold text-rose-900 font-cursive">Our Memories</h2>
        <label className="bg-white text-rose-500 p-2 rounded-full shadow-md cursor-pointer hover:bg-rose-50 transition-colors">
          <Plus className="w-6 h-6" />
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.length === 0 ? (
          <div className="col-span-2 text-center py-10 text-rose-300">
            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No photos yet. Add something cute!</p>
          </div>
        ) : (
          items.map(item => (
            <div key={item.id} className="relative group rounded-2xl overflow-hidden aspect-square shadow-md">
              <img src={item.url} alt="Memory" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-medium">{item.date}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Gallery;
