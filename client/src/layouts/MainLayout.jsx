import React from 'react';
import Header from '../features/navigation/Header.jsx';
import Sidebar from '../features/navigation/Sidebar.jsx';

export default function MainLayout({ children }) {
  return (
    <div className="bg-[#f4f7f6] text-slate-800 h-screen flex flex-col overflow-hidden antialiased">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}