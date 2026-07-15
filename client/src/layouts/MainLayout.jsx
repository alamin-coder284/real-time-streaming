import { useState } from 'react';
import Header from '../features/navigation/Header.jsx';
import Sidebar from '../features/navigation/Sidebar.jsx';

export default function MainLayout({ children, username, unreadRoom, onOpenRoom }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell-height bg-[#f4f7f6] text-slate-800 flex flex-col overflow-hidden antialiased">
      <Header username={username} onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1 min-h-0 relative">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          unreadRoom={unreadRoom}
          onOpenRoom={() => {
            onOpenRoom?.();
            setSidebarOpen(false);
          }}
        />
        <main className="flex-1 flex flex-col bg-white min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
