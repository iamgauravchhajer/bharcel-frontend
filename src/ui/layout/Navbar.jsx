import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../components/Button';
import { Zap, Rocket, LogOut, User, LayoutGrid, Plus } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2 mr-6">
            <Zap className="w-6 h-6 fill-primary" />
            <span className="text-xl font-bold tracking-tight text-slate-900">Bharcel</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            <Link 
              to="/dashboard" 
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors rounded-lg hover:bg-orange-50 flex items-center gap-2"
            >
              <LayoutGrid className="h-4 w-4" />
              Dashboard
            </Link>
            <Link 
              to="/new" 
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors rounded-lg hover:bg-orange-50 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Project
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-primary font-bold text-xs">
              {user?.name?.[0] || 'U'}
            </div>
            <span className="hidden sm:block text-sm font-medium text-slate-700">{user?.name || 'User'}</span>
          </div>
          
          <button 
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
