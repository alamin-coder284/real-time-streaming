import React from 'react';
import MessageItem from './MessageItem.jsx';

export default function MessageStream({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/20">
      <div className="overflow-hidden h-7 bg-white border border-slate-200 rounded-lg max-w-lg mx-auto shadow-xs px-4 flex items-center justify-center">
        <div className="text-[11px] font-mono text-slate-500 flex items-center space-x-2 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
          <span className="font-bold text-slate-700">[Live Event Log]:</span>
          <span>Websocket streaming link pipeline status: Operational</span>
        </div>
      </div>

      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </div>
  );
}