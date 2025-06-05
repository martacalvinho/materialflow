import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Bell, Users, Settings, LogOut, Factory, Package } from 'lucide-react';
import Logo from '../ui/Logo';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, to, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-primary-50 text-primary-700'
          : 'text-surface-600 hover:bg-surface-100'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
    { icon: BookOpen, label: 'Projects', to: '/dashboard/projects' },
    { icon: Package, label: 'Materials', to: '/dashboard/materials' },
    { icon: Users, label: 'Clients', to: '/dashboard/clients' },
    { icon: Factory, label: 'Manufacturers', to: '/dashboard/manufacturers' },
    { icon: Bell, label: 'Alerts', to: '/dashboard/alerts' },
    { icon: Settings, label: 'Settings', to: '/dashboard/settings' },
  ];

  return (
    <div className="w-64 h-screen border-r border-surface-200 bg-white fixed top-0 left-0 flex flex-col">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={28} />
          <span className="font-semibold text-xl text-surface-900">Treqy</span>
        </Link>
      </div>

      <div className="mt-6 px-3 flex-1">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isActive={
                item.to === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname.startsWith(item.to)
              }
            />
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-surface-200">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-surface-600 hover:bg-surface-100 transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;