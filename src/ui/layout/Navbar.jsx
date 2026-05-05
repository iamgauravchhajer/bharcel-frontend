import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../components/Button';
import { Zap, Rocket, LogOut, User, LayoutGrid, Plus } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-black/50 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2 mr-6">
            <Zap className="w-6 h-6 fill-white text-white" />
            <span className="text-xl font-bold tracking-tight text-white">Bharcel</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            <Link 
              to="/dashboard" 
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5 flex items-center gap-2"
            >
              <LayoutGrid className="h-4 w-4" />
              Dashboard
            </Link>
            <Link 
              to="/new" 
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Project
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white font-bold text-xs">
              {user?.name?.[0] || 'U'}
            </div>
            <span className="hidden sm:block text-sm font-medium text-white">{user?.name || 'User'}</span>
          </div>
          
          <button 
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="p-2 text-white/40 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
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
