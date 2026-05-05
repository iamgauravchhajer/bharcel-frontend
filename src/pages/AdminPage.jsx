import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Rocket, 
  Activity, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  DollarSign, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  Shield, 
  Ban, 
  Edit3, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Zap,
  LayoutDashboard,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

const GitHubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const GlassCard = ({ children, className = "", ...props }) => (
  <div className={`bg-[#0f0f12]/80 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden shadow-2xl ${className}`} {...props}>
    {children}
  </div>
);

const StatCard = ({ title, value, trend, trendUp, icon: Icon, color, sparkline }) => (
  <GlassCard className="p-6 relative group">
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-xl bg-white/5 ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium text-white/40">{title}</span>
      </div>
      <div className="flex items-end gap-4">
        <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
        <div className={`flex items-center gap-1 mb-1 text-[11px] font-bold ${trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
          <TrendingUp className={`w-3 h-3 ${!trendUp && 'rotate-180'}`} />
          {trend}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">vs last 30 days</span>
      </div>
    </div>
  </GlassCard>
);

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("users"); // 'users' | 'deployments'
  const [deployments, setDeployments] = useState([]);
  const [deployPage, setDeployPage] = useState(1);
  const [totalDeployPages, setTotalDeployPages] = useState(1);
  const [actionLoading, setActionLoading] = useState(null); // userId-action
  const nav = useNavigate();

  useEffect(() => {
    fetchData();
  }, [page, deployPage, activeTab]);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes, deployRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get(`/admin/users?page=${page}&limit=10`),
        api.get(`/admin/deployments?page=${deployPage}&limit=10`)
      ]);
      setStats(statsRes.data.data.stats);
      setUsers(usersRes.data.data.users);
      setTotalPages(usersRes.data.data.pagination.pages);
      setDeployments(deployRes.data.data.deployments);
      setTotalDeployPages(deployRes.data.data.pagination.pages);
    } catch (err) {
      console.error("Admin data fetch error:", err);
      if (err.response?.status === 403) nav("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter(u => 
      (u.name || "").toLowerCase().includes(search.toLowerCase()) || 
      (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.githubLogin && u.githubLogin.toLowerCase().includes(search.toLowerCase()))
    );
  }, [users, search]);

  const handleAction = async (userId, action) => {
    if (actionLoading) return;
    setActionLoading(`${userId}-${action}`);
    try {
      await api.post(`/admin/users/${userId}/${action}`);
      await fetchData(); // Refresh data immediately
    } catch (err) {
      console.error("Action failed:", err);
      alert(`Action failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#060608] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
  </div>;

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white font-body">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0C0C0C]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Star className="w-5 h-5 fill-white text-white" />
            <div className="text-xl font-bold tracking-tight text-white">bharcel</div>
          </div>

          <button
            onClick={() => nav("/dashboard")}
            className="flex items-center gap-2 px-3 sm:px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all text-white/70 hover:text-white"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </button>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-2 sm:px-6 py-6">
        <div className="border border-white/[0.08] rounded-2xl bg-white/[0.01] p-4 sm:p-8">
        {/* Simple Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-5 h-5 text-purple-500" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">System Administrator</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Control Center</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          <StatCard 
            title="Total Deployments" 
            value={stats?.totalDeployments.toLocaleString() || "0"} 
            trend="18.6%" 
            trendUp={true} 
            icon={Rocket} 
            color="text-purple-400"
          />
          <StatCard 
            title="Success Rate" 
            value={`${stats?.successRate || 0}%`} 
            trend="2.1%" 
            trendUp={true} 
            icon={CheckCircle2} 
            color="text-emerald-400"
          />
          <StatCard 
            title="Avg. Build Time" 
            value={`${Math.round((stats?.avgBuildTime || 0) / 1000)}s`} 
            trend="6.4%" 
            trendUp={false} 
            icon={Clock} 
            color="text-indigo-400"
          />
          <StatCard 
            title="Active Load" 
            value={stats?.pendingDeployments || "0"} 
            trend="Live" 
            trendUp={true} 
            icon={Zap} 
            color="text-amber-400"
          />
          <StatCard 
            title="Failed Deployments" 
            value={stats?.failedDeployments || "0"} 
            trend="8.7%" 
            trendUp={false} 
            icon={XCircle} 
            color="text-rose-400"
          />
        </div>

        {/* Revenue Section */}
        <GlassCard className="p-8 mb-10 bg-gradient-to-br from-[#0f0f12] to-[#08080a]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-medium tracking-tight">Revenue Overview</h2>
              <Activity className="w-4 h-4 text-white/20" />
            </div>
            <select className="bg-[#0f0f12] text-white border border-white/10 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest outline-none appearance-none cursor-pointer hover:border-purple-500/50 transition-all pr-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik02IDlsNiA2IDYtNiIvPjwvc3ZnPg==')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat">
              <option className="bg-[#0f0f12]">Last 30 days</option>
              <option className="bg-[#0f0f12]">Last 90 days</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Total Revenue</span>
              <div className="text-2xl font-bold tracking-tight text-white">$1,248.50</div>
              <div className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> 12.4%
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">MRR</span>
              <div className="text-2xl font-bold tracking-tight text-white">$840.00</div>
              <div className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> 8.2%
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">ARR</span>
              <div className="text-2xl font-bold tracking-tight text-white">$10.2k</div>
              <div className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> 15.1%
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Paid Users</span>
              <div className="text-2xl font-bold tracking-tight text-white">42</div>
              <div className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> 4.5%
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">ARPU</span>
              <div className="text-2xl font-bold tracking-tight text-white">$29.70</div>
              <div className="text-[10px] text-white/20 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> 0.2%
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/5 rounded-2xl w-fit mb-8">
          <button 
            onClick={() => setActiveTab("users")}
            className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
          >
            Users
          </button>
          <button 
            onClick={() => setActiveTab("deployments")}
            className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'deployments' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
          >
            Deployments
          </button>
        </div>

        {activeTab === 'users' ? (
          <GlassCard className="p-0">
            <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-medium tracking-tight">Users</h2>
                <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-white/40">{stats?.totalUsers || 0}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-purple-400 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search by name, email or GitHub ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-[#0a0a0c] border border-white/5 rounded-lg pl-12 pr-6 py-2.5 text-xs font-medium w-full md:w-80 outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>
                <button className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <Filter className="w-4 h-4 text-white/60" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold text-white/20 uppercase tracking-widest border-b border-white/5">
                    <th className="px-8 py-5">User</th>
                    <th className="px-6 py-5">Plan</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-6 py-5">Projects</th>
                    <th className="px-6 py-5 text-center">Deployments</th>
                    <th className="px-6 py-5">Joined</th>
                    <th className="px-6 py-5 text-right pr-8">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="group hover:bg-white/[0.01] transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-white/40 border border-white/5 group-hover:border-purple-500/20 transition-all">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-semibold tracking-tight">{user.name}</div>
                            <div className="text-[10px] text-white/30 font-medium lowercase">{user.email}</div>
                            {user.githubLogin && (
                              <div className="flex items-center gap-1 text-[9px] text-white/20 mt-0.5">
                                <ExternalLink className="w-2.5 h-2.5" />
                                {user.githubLogin}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${user.plan === 'pro' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-white/5 text-white/40 border border-white/5'}`}>
                          {user.plan}
                        </span>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${user.banned ? 'bg-rose-500' : user.isActive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${user.banned ? 'text-rose-400' : user.isActive ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {user.banned ? 'Banned' : user.isActive ? 'Active' : 'Disabled'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-sm font-medium text-white/60">{user.projectsCount || 0}</td>
                      <td className="px-6 py-6 text-sm font-medium text-white/60 text-center">{user.totalDeployments || 0}</td>
                      <td className="px-6 py-6">
                        <div className="text-[11px] font-medium text-white/40">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-[9px] text-white/20">
                          {new Date(user.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right pr-8">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleAction(user._id, user.isActive ? 'disable' : 'enable')}
                            disabled={actionLoading?.startsWith(user._id)}
                            className={`p-2 rounded-xl border transition-all ${user.isActive ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10' : 'bg-amber-500/5 border-amber-500/10 text-amber-500 hover:bg-amber-500/10'} ${actionLoading === `${user._id}-${user.isActive ? 'disable' : 'enable'}` ? 'animate-pulse opacity-50' : ''}`}
                            title={user.isActive ? "Disable User" : "Enable User"}
                          >
                            <Activity className={`w-3.5 h-3.5 ${actionLoading === `${user._id}-${user.isActive ? 'disable' : 'enable'}` ? 'animate-spin' : ''}`} />
                          </button>
                          <button 
                            onClick={() => handleAction(user._id, user.isAdmin ? 'demote' : 'promote')}
                            disabled={actionLoading?.startsWith(user._id)}
                            className={`p-2 rounded-xl border transition-all ${user.isAdmin ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-white/5 border-white/5 text-white/20 hover:text-white'} ${actionLoading === `${user._id}-${user.isAdmin ? 'demote' : 'promote'}` ? 'animate-pulse opacity-50' : ''}`}
                            title={user.isAdmin ? "Remove Admin" : "Make Admin"}
                          >
                            <Shield className={`w-3.5 h-3.5 ${actionLoading === `${user._id}-${user.isAdmin ? 'demote' : 'promote'}` ? 'animate-spin' : ''}`} />
                          </button>
                          <button 
                            onClick={() => handleAction(user._id, user.banned ? 'unban' : 'ban')}
                            disabled={actionLoading?.startsWith(user._id)}
                            className={`p-2 rounded-xl border transition-all ${user.banned ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : 'bg-white/5 border-white/5 text-white/20 hover:text-rose-500'} ${actionLoading === `${user._id}-${user.banned ? 'unban' : 'ban'}` ? 'animate-pulse opacity-50' : ''}`}
                            title={user.banned ? "Unban User" : "Ban User"}
                          >
                            <Ban className={`w-3.5 h-3.5 ${actionLoading === `${user._id}-${user.banned ? 'unban' : 'ban'}` ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-8 border-t border-white/5 flex items-center justify-between">
              <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                Showing {filteredUsers.length} users
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[11px] font-bold text-purple-400">
                  {page} / {totalPages}
                </div>
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </GlassCard>
        ) : (
          <GlassCard className="p-0">
            <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-medium tracking-tight">System Deployments</h2>
                <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-white/40">{stats?.totalDeployments || 0}</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold text-white/20 uppercase tracking-widest border-b border-white/5">
                    <th className="px-8 py-5">Repository</th>
                    <th className="px-6 py-5">User</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-6 py-5">Duration</th>
                    <th className="px-6 py-5">Created At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {deployments.map((d) => (
                    <tr key={d._id} className="group hover:bg-white/[0.01] transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <GitHubIcon className="w-4 h-4 text-white/20" />
                          <div>
                            <div className="text-sm font-semibold tracking-tight">{d.repoUrl.split('/').pop()}</div>
                            <div className="text-[10px] text-white/20 font-medium truncate max-w-[200px]">{d.repoUrl}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="text-sm font-medium">{d.userId?.name || 'Unknown'}</div>
                        <div className="text-[10px] text-white/30">{d.userId?.email || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${d.status === 'success' ? 'bg-emerald-500' : d.status === 'failed' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${d.status === 'success' ? 'text-emerald-400' : d.status === 'failed' ? 'text-rose-400' : 'text-amber-400'}`}>
                            {d.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-sm font-medium text-white/40">
                        {d.buildDuration ? `${Math.round(d.buildDuration / 1000)}s` : '--'}
                      </td>
                      <td className="px-6 py-6 text-[11px] text-white/30 font-medium">
                        {new Date(d.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-8 border-t border-white/5 flex items-center justify-between">
              <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                Showing {deployments.length} deployments
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setDeployPage(p => Math.max(1, p - 1))}
                  disabled={deployPage === 1}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[11px] font-bold text-purple-400">
                  {deployPage} / {totalDeployPages}
                </div>
                <button 
                  onClick={() => setDeployPage(p => Math.min(totalDeployPages, p + 1))}
                  disabled={deployPage === totalDeployPages}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </GlassCard>
        )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .font-heading { font-family: 'Instrument Serif', serif; }
        .font-body { font-family: 'Barlow', sans-serif; }
      `}} />
    </div>
  );
}
