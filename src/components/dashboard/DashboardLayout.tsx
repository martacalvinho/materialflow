import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import ChatAssistant from './ChatAssistant';
import Button from '../ui/Button';
import { MessageSquare } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-50">
      <Sidebar />
      <div className="ml-64">
        <TopBar />
        <main className="p-8">
          <Outlet />
        </main>
      </div>

      {!isChatOpen && (
        <Button
          className="fixed bottom-8 right-8 shadow-lg flex items-center gap-2"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageSquare size={16} />
          <span>Ask Assistant</span>
        </Button>
      )}

      <ChatAssistant 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
};

export default DashboardLayout;