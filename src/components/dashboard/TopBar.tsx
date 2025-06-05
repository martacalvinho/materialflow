import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="h-16 border-b border-surface-200 bg-white flex items-center justify-between px-6">
      <div className="w-1/3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-surface-400" />
          </div>
          <input
            type="text"
            placeholder="Search materials, projects..."
            className="block w-full pl-10 pr-3 py-2 border border-surface-200 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-surface-100 relative">
          <Bell size={20} className="text-surface-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary-600 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
            AS
          </div>
          <div className="flex items-center gap-1 text-surface-700">
            <span>Archi Studio</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;