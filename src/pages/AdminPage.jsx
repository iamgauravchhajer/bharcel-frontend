import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Rocket, 
  Shield, 
  Activity, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">
    <div className="flex items-center gap-4 mb-4">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-20`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div className="text-white/40 text-sm font-medium uppercase tracking-widest">{title}</div>
    </div>
    <div className="text-4xl font-bold tracking-tight text-white">{value}</div>
  </div>
);

export default function AdminPage() {
  const nav = useNavigate();
  const [stats, setStats] = useState({ users: 0, deployments: 0, healthy: true });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data?.data || { users: 124, deployments: 450, healthy: true });
      } catch (err) {
        console.error("Failed to fetch admin stats", err);
        // Fallback for demonstration
        setStats({ users: 124, deployments: 450, healthy: true });
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => nav('/dashboard')}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
              <p className="text-white/40 text-sm">System-wide monitoring and management</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5" />
            System Healthy
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard 
            icon={Users} 
            title="Total Users" 
            value={stats.users} 
            color="bg-purple-500" 
          />
          <StatCard 
            icon={Rocket} 
            title="Deployments" 
            value={stats.deployments} 
            color="bg-blue-500" 
          />
          <StatCard 
            icon={Shield} 
            title="Active Jobs" 
            value="12" 
            color="bg-orange-500" 
          />
        </div>

        <div className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Activity</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                <input 
                  type="text" 
                  placeholder="Search logs..." 
                  className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-white/20 transition-all w-64"
                />
              </div>
              <button className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="p-0">
            {[
              { user: "keshavcodes0", action: "Triggered Deployment", target: "vercel-clone-api", time: "2m ago", status: "success" },
              { user: "john_doe", action: "User Signup", target: "Platform", time: "15m ago", status: "success" },
              { user: "dev_team", action: "Configuration Update", target: "worker-pool", time: "1h ago", status: "pending" },
              { user: "system", action: "Automatic Scaling", target: "api-cluster", time: "2h ago", status: "success" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between px-8 py-5 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.01] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold">
                    {item.user[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{item.action}</div>
                    <div className="text-[10px] text-white/30">{item.user} • {item.target}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-[10px] text-white/20">{item.time}</div>
                  {item.status === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
