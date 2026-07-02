import React from 'react';
import EmbeddedVerse from './EmbeddedVerse.jsx';

export default function MessageItem({ message }) {
  return (
    <div className="flex items-start space-x-4 animate-message" style={{ animationDelay: message.delay }}>
      <img src={message.avatar} alt="Avatar" className="w-9 h-9 rounded-lg border border-slate-200 transition duration-200 hover:scale-105" />
      <div className="flex-1 space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="font-semibold text-slate-900 text-sm hover:underline cursor-pointer">{message.username}</span>
          {message.badge && (
            <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.5 rounded-md font-mono font-bold">{message.badge}</span>
          )}
          <span className="text-xs text-slate-400 font-mono">{message.timestamp}</span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{message.content}</p>
        
        {message.hasVerse && <EmbeddedVerse />}
      </div>
    </div>
  );
}