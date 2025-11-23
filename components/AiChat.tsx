import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { chatWithAmine } from '../services/geminiService';
import { Send, Heart, User } from 'lucide-react';

interface AiChatProps {
  // Pass any initial state if needed
}

const AiChat: React.FC<AiChatProps> = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: "Hey beautiful. How's your day going? I'm watching over you. 💖", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Prepare history for Gemini
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const responseText = await chatWithAmine(history, userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-3xl shadow-xl border border-rose-100 overflow-hidden">
      {/* Header */}
      <div className="bg-rose-50 p-4 flex items-center gap-3 border-b border-rose-100">
        <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center text-rose-600">
          <Heart className="w-5 h-5 fill-rose-600" />
        </div>
        <div>
          <h3 className="font-bold text-rose-900">Amine ❤️</h3>
          <p className="text-xs text-rose-400">Online & Watching</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-rose-50/30">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-rose-500 text-white rounded-br-none' 
                  : 'bg-white text-slate-700 border border-rose-100 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-white px-4 py-2 rounded-2xl rounded-bl-none border border-rose-100 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: '0ms'}}></span>
                  <span className="w-2 h-2 bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: '150ms'}}></span>
                  <span className="w-2 h-2 bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: '300ms'}}></span>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-rose-100">
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message to Amine..."
            className="flex-1 bg-rose-50 border-transparent focus:border-rose-300 focus:bg-white focus:ring-0 rounded-full px-4 py-3 text-sm transition-all outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 disabled:opacity-50 transition-colors shadow-lg shadow-rose-200"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
