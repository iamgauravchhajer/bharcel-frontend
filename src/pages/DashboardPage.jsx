import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  ExternalLink,
  RefreshCw,
  Rocket,
  Trash2,
  AlertTriangle as AlertCircle,
  CheckCircle as CheckCircle2,
  X,
  Copy,
  ChevronRight,
  TrendingUp,
  Layout,
  Cpu,
  Terminal as TerminalIcon,
  Filter,
  Play,
  ArrowRight,
  Check,
  Zap,
  CreditCard,
  Star,
  Sparkles,
  Shield,
  Activity,
  Mail,
  MessageSquare,
  Send
} from "lucide-react";
import { api, API_BASE } from "../lib/api";
import { clearToken } from "../lib/auth";
import { socket } from "../lib/socket";

// --- Components ---

const GitHubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const GlassCard = ({ children, className = "", noPadding = false, ...props }) => (
  <div
    className={`relative overflow-hidden bg-[#0f0f12]/60 backdrop-blur-xl border-none rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${className}`}
    {...props}
  >
    <div className={`relative z-10 h-full ${noPadding ? "" : "p-6"}`}>
      {children}
    </div>

    {/* Liquid Glass Border Overlay */}
    <div
      className="absolute inset-0 rounded-3xl pointer-events-none z-20"
      style={{
        padding: '1.4px',
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0.4) 100%)',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude'
      }}
    />
  </div>
);

const IconButton = ({ icon: Icon, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors ${className}`}
  >
    <Icon className="w-4 h-4 text-white/70" />
  </button>
);

const StatusBadge = ({ status }) => {
  const configs = {
    queued: { color: "text-zinc-400 bg-zinc-400/10 border-zinc-400/20", icon: RefreshCw },
    processing: { color: "text-blue-400 bg-blue-400/10 border-blue-400/20", icon: Cpu },
    building: { color: "text-purple-400 bg-purple-400/10 border-purple-400/20", icon: Play },
    uploading: { color: "text-amber-400 bg-amber-400/10 border-amber-400/20", icon: Rocket },
    success: { color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", icon: CheckCircle2 },
    ready: { color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", icon: CheckCircle2 },
    failed: { color: "text-rose-400 bg-rose-400/10 border-rose-400/20", icon: AlertCircle },
  };
  const config = configs[status] || configs.queued;
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-medium uppercase tracking-wider ${config.color}`}>
      <Icon className={`w-3 h-3 ${['processing', 'building', 'uploading', 'queued'].includes(status) ? 'animate-spin' : ''}`} />
      {status}
    </div>
  );
};

const LineChart = ({ data, color = "#a855f7" }) => {
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - v}`).join(" ");
  return (
    <div className="w-full h-24 relative overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`M 0 100 L ${points} L 100 100 Z`}
          fill={`url(#gradient-${color})`}
        />
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          vectorEffect="non-scaling-stroke"
        />
        {/* Highlight points */}
        {data.map((v, i) => (
          <circle
            key={i}
            cx={(i / (data.length - 1)) * 100}
            cy={100 - v}
            r="1.5"
            fill={color}
          />
        ))}
      </svg>
    </div>
  );
};

const TerminalLogs = ({ lines }) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xs font-medium text-white/40 uppercase tracking-widest">
        <TerminalIcon className="w-3 h-3" />
        Deployment Logs
      </div>
      <div
        ref={ref}
        className="h-[300px] w-full overflow-auto rounded-xl border border-white/5 bg-black/40 p-4 font-mono text-[11px] text-emerald-400/80 leading-relaxed custom-scrollbar"
      >
        {lines.length === 0 ? (
          <div className="text-zinc-600 flex flex-col items-center justify-center h-full gap-4">
            <div className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center bg-white/5">
              <TerminalIcon className="w-4 h-4" />
            </div>
            <div className="text-center">
              <div className="text-white/80 font-medium">Logs will be shown here</div>
              <div className="text-[10px]">Your deployment logs will appear once the process starts.</div>
            </div>
          </div>
        ) : (
          lines.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap mb-1">
              <span className="text-emerald-500/40 mr-2 select-none">{(i + 1).toString().padStart(2, '0')}</span>
              {l}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// --- Main Page ---

export default function DashboardPage() {
  const nav = useNavigate();
  const [view, setView] = useState("dashboard"); // dashboard, import, configure, upgrade
  const [deployments, setDeployments] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [logs, setLogs] = useState([]);
  const [busy, setBusy] = useState(false);
  const [githubRepos, setGithubRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [showAllRepos, setShowAllRepos] = useState(false);
  const [repoUrl, setRepoUrl] = useState("");
  const [projectName, setProjectName] = useState("");
  const [envVars, setEnvVars] = useState([{ key: "", value: "" }]);
  const [modal, setModal] = useState(null); // { type: 'success' | 'error', message: '', url?: '' }
  const [showContact, setShowContact] = useState(false);

  const selectedDeployment = useMemo(
    () => deployments.find((d) => d.projectId === selectedId) || null,
    [deployments, selectedId]
  );

  const [user, setUser] = useState(null);

  // Initial Fetch
  const refresh = async () => {
    try {
      const [deployRes, userRes] = await Promise.all([
        api.get("/deploy"),
        api.get("/auth/me")
      ]);
      const data = deployRes.data?.data?.deployments;
      setDeployments(Array.isArray(data) ? data : []);
      const userData = userRes.data?.data?.user || null;
      console.log("DEBUG: Current User:", userData);
      setUser(userData);
    } catch (err) {
      console.error("Refresh failed", err);
    }
  };

  const fetchRepos = async () => {
    setLoadingRepos(true);
    try {
      const res = await api.get("/github/repos");
      setGithubRepos(res.data?.data?.repos || []);
    } catch (err) {
      console.error("Failed to fetch repos", err);
    } finally {
      setLoadingRepos(false);
    }
  };

  const formatRelativeTime = (iso) => {
    if (!iso) return "Unknown";
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  };

  useEffect(() => {
    refresh();
    fetchRepos();
  }, []);

  // Handle Intent & Redirects
  useEffect(() => {
    if (!user) return;
    const params = new URLSearchParams(window.location.search);
    const redirectView = params.get("view");
    const intent = localStorage.getItem('login_intent');

    if (redirectView === "upgrade" || intent === "upgrade") {
      // If user is already pro, go to usage overview instead
      if (user.email === "keshavcodes0@gmail.com") {
        setView("usage");
      } else {
        setView("upgrade");
      }
      localStorage.removeItem('login_intent');
      // Clean up URL params
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [user]);


  // Socket for logs
  useEffect(() => {
    if (!selectedId) return;
    let mounted = true;
    setLogs([]);

    api.get(`/logs/${selectedId}`).then((res) => {
      if (mounted) setLogs(res.data?.data?.lines || []);
    }).catch(() => { });

    socket.emit("subscribe", { projectId: selectedId });
    const event = `log-${selectedId}`;
    const handler = (msg) => setLogs((prev) => [...prev, msg]);
    socket.on(event, handler);

    return () => {
      mounted = false;
      socket.emit("unsubscribe", { projectId: selectedId });
      socket.off(event, handler);
    };
  }, [selectedId]);

  // Actions
  const handleDeploy = async () => {
    if (!repoUrl) return;
    setBusy(true);
    try {
      const res = await api.post("/deploy", {
        repoUrl,
        projectName: projectName || repoUrl.split('/').pop(),
        envVars: envVars.filter(ev => ev.key && ev.value)
      });
      const projectId = res.data?.data?.projectId;
      await refresh();
      setSelectedId(projectId);
      setView("configure");
    } catch (err) {
      setModal({ type: 'error', message: err?.response?.data?.message || 'Deployment failed to initiate.' });
    } finally {
      setBusy(false);
    }
  };

  const handleRetry = async (id) => {
    setBusy(true);
    try {
      await api.post(`/deploy/${id}/retry`);
      await refresh();
    } catch (err) {
      setModal({ type: 'error', message: 'Retry failed.' });
    } finally {
      setBusy(false);
    }
  };

  const handlePayment = async (amount, planName, type = 'subscription', credits = 0) => {
    try {
      setBusy(true);
      const orderRes = await api.post("/payments/create-order", {
        amount,
        plan: planName,
        type
      });

      const order = orderRes.data.data.order;

      const options = {
        key: "rzp_test_RKAGSxQc22kZG1",
        amount: order.amount,
        currency: order.currency,
        name: "Bharcel",
        description: type === 'subscription' ? `Upgrade to ${planName}` : `Purchase ${credits} Credits`,
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyRes = await api.post("/payments/verify", {
              ...response,
              plan: planName,
              type,
              credits
            });
            setUser(verifyRes.data.data.user);
            setModal({ type: 'success', message: 'Payment successful! Your account has been updated.' });
            setView("dashboard");
          } catch (err) {
            setModal({ type: 'error', message: 'Payment verification failed. Please contact support.' });
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#7c3aed",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setModal({ type: 'error', message: 'Failed to initiate payment.' });
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setBusy(true);
    try {
      await api.delete(`/deploy/${id}`);
      if (selectedId === id) setSelectedId(null);
      await refresh();
    } finally {
      setBusy(false);
    }
  };

  const logout = () => {
    clearToken();
    nav("/");
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white font-body">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0C0C0C]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Star className="w-5 h-5 fill-white text-white" />
            <div className="text-xl font-bold tracking-tight text-white">bharcel</div>
          </div>

          <div className="flex items-center gap-3">
            <div
              onClick={() => setView("usage")}
              className="hidden md:flex bg-[#151518] rounded-xl px-3 py-1.5 border border-white/5 items-center gap-3 cursor-pointer hover:bg-white/[0.03] transition-colors group"
            >
              <div className="text-xs text-white/60">
                <span className="text-white font-semibold">
                  {user?.email === 'keshavcodes0@gmail.com' ? '1,000' : '100'}
                </span> credits
              </div>
              <div className="bg-purple-600/20 text-purple-400 p-1 rounded-md group-hover:bg-purple-600/30 transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </div>
            </div>

            {(user?.isAdmin || user?.email === 'keshavcodes0@gmail.com') && (
              <button
                onClick={() => nav("/admin")}
                className="bg-purple-600 text-white rounded-xl px-4 py-1.5 text-sm font-semibold hover:bg-purple-500 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
              >
                <Shield className="w-4 h-4" />
                Admin
              </button>
            )}

            <button
              onClick={() => setView("import")}
              className="bg-white text-black rounded-xl px-4 py-1.5 text-sm font-semibold hover:bg-white/90 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>

            <button
              onClick={logout}
              className="px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="border border-white/[0.08] rounded-2xl bg-white/[0.01] p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key="zoom-container"
            className="origin-top transition-all duration-500"
          >
            <AnimatePresence mode="wait">
              {/* --- View: Usage (Pro Only) --- */}
              {view === "usage" && (
                <motion.div
                  key="usage"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-6xl mx-auto w-full px-6 py-12"
                >
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 mb-2">Pro Account</div>
                      <h1 className="text-3xl font-bold tracking-tight">Your Usage</h1>
                    </div>
                    <button
                      onClick={() => setView("dashboard")}
                      className="px-5 py-2 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all"
                    >
                      ← Back
                    </button>
                  </div>

                  {/* Credit + Deployments Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <GlassCard className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Credits</div>
                        <Zap className="w-4 h-4 text-purple-400/40" />
                      </div>
                      <div className="text-5xl font-bold tracking-tighter mb-6">
                        {user?.email === 'keshavcodes0@gmail.com' ? '1,000' : '100'}
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${user?.email === 'keshavcodes0@gmail.com' ? 85 : 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-purple-500 rounded-full"
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-white/20">
                        <span>{user?.email === 'keshavcodes0@gmail.com' ? '∞ Unlimited' : 'Hobby Plan Active'}</span>
                        <div className="flex gap-3">
                          <span>30 / deploy</span>
                          <span>25 / bhavable</span>
                        </div>
                      </div>
                    </GlassCard>

                    <GlassCard className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Deployments</div>
                        <Rocket className="w-4 h-4 text-blue-400/40" />
                      </div>
                      <div className="text-5xl font-bold tracking-tighter mb-6">{deployments.length}</div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((deployments.length / 20) * 100, 100)}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-blue-500 rounded-full"
                        />
                      </div>
                      <div className="text-[10px] text-white/20">{deployments.length} active · no limit on Pro</div>
                    </GlassCard>
                  </div>

                  {/* Deployment History */}
                  <GlassCard className="p-0 overflow-hidden mb-8">
                    <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between">
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Deployment History</div>
                      <div className="text-[10px] text-white/15 font-medium">{deployments.length} total</div>
                    </div>
                    <div>
                      {deployments.length === 0 ? (
                        <div className="p-12 text-center text-white/15 text-sm">No deployments yet.</div>
                      ) : (
                        deployments.slice(0, 6).map((d, i) => (
                          <div key={i} className="flex items-center justify-between px-8 py-5 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-4">
                              <div className={`w-2 h-2 rounded-full ${d.status === 'ready' || d.status === 'live' || d.status === 'success' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                              <div>
                                <div className="text-sm font-semibold tracking-tight">{d.repoUrl.split('/').pop()}</div>
                                <div className="text-[10px] text-white/20 mt-0.5">{d.projectId.slice(0, 8)}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className={`text-[10px] font-bold uppercase tracking-widest ${d.status === 'ready' || d.status === 'live' || d.status === 'success' ? 'text-emerald-400/60' : 'text-amber-400/60'}`}>
                                {d.status}
                              </span>
                              <span className="text-[10px] text-white/15">{formatRelativeTime(d.createdAt)}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </GlassCard>


                </motion.div>
              )}

              {/* --- View: Upgrade --- */}
              {view === "upgrade" && (
                <motion.div
                  key="upgrade"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-7xl mx-auto relative px-6"
                >
                  <div className="scale-[0.9] origin-top">
                    {/* Background glow effects */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

                    <button
                      onClick={() => setView("dashboard")}
                      className="mb-8 flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-medium uppercase tracking-[0.2em]"
                    >
                      <X className="w-4 h-4" /> Back to Dashboard
                    </button>

                    <div className="text-center mb-24 relative z-10">
                      <h1 className="text-6xl md:text-7xl font-bold tracking-[-0.03em] mb-8 leading-[1.1] pb-2 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                        Upgrade your power.
                      </h1>
                      <p className="text-white/40 text-lg font-light max-w-xl mx-auto leading-relaxed">
                        Start for free and scale as you grow. No hidden fees, just seamless deployments and AI-powered debugging.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                      {[
                        {
                          name: "Hobby",
                          price: "Free",
                          desc: "Perfect for students and indie hackers starting out.",
                          features: ["100 Credits / month", "1 Active Project", "Basic Build & Deploy", "Standard Edge Network", "Automatic CI/CD"],
                          current: !user?.isAdmin && (user?.plan === 'free' || !user?.plan)
                        },
                        {
                          name: "Startup",
                          price: "$29",
                          period: "/mo",
                          desc: "For small teams shipping features fast and reliably.",
                          features: ["1,000 Credits / month", "Unlimited Projects", "Instant AI Bug Fixes", "Priority Build Queue", "Team Collaboration Tools"],
                          popular: true,
                          current: user?.isAdmin || user?.plan === 'pro'
                        },
                        {
                          name: "Enterprise",
                          price: "Custom",
                          desc: "Dedicated infrastructure for large-scale applications.",
                          features: ["Unlimited Credits", "Custom Infrastructure", "Advanced DDoS Mitigation", "99.99% Uptime SLA", "Dedicated Support"],
                          current: user?.plan === 'enterprise'
                        }
                      ].map((plan, i) => (
                        <div key={i} className={`relative pt-5 transform transition-transform hover:-translate-y-2 duration-500 ${plan.popular ? 'md:-translate-y-6 z-10' : 'md:translate-y-0'}`}>
                          {plan.popular && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#a855f7] text-white text-[10px] uppercase tracking-wider font-bold px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)] z-20">
                              Most Popular
                            </div>
                          )}

                          <GlassCard className={`flex flex-col h-full p-8 ${plan.popular ? 'border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.1)]' : ''}`}>
                            <div className="mb-8">
                              <h3 className="text-white/80 font-medium text-lg mb-2">{plan.name}</h3>
                              <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-bold text-white tracking-tight">{plan.price}</span>
                                {plan.period && <span className="text-white/50 text-sm font-light">{plan.period}</span>}
                              </div>
                              <p className="text-white/50 text-sm font-light mt-4 leading-relaxed">
                                {plan.desc}
                              </p>
                            </div>

                            <div className="h-px w-full bg-white/10 mb-8" />

                            <ul className="flex flex-col gap-4 mb-10 flex-grow">
                              {plan.features.map((feature, fi) => (
                                <li key={fi} className="flex items-center gap-4">
                                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                                    <Check className="w-3.5 h-3.5 text-[#a855f7]" />
                                  </div>
                                  <span className="text-white/80 text-sm font-light">{feature}</span>
                                </li>
                              ))}
                            </ul>

                            <button
                              onClick={() => {
                                if (plan.price === "Free") return;
                                if (plan.price === "Custom") { setShowContact(true); return; }
                                handlePayment(parseInt(plan.price.replace('$', '')), plan.name);
                              }}
                              className={`w-full py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.15em] transition-all ${plan.price === "Free" || plan.current
                                ? 'bg-white/5 border border-white/10 text-white/40 cursor-default'
                                : plan.popular
                                  ? 'bg-[#a855f7] hover:bg-[#9333ea] text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                                }`}>
                              {plan.current ? "Current plan" : plan.price === "Free" ? "Standard Plan" : plan.price === "Custom" ? "Contact Sales" : "Upgrade Now"}
                            </button>
                          </GlassCard>
                        </div>
                      ))}
                    </div>

                    <div className="mt-16 p-8 rounded-[32px] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
                          <CreditCard className="w-8 h-8 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold tracking-tight">Need a custom bundle?</h4>
                          <p className="text-white/40 text-sm font-light">Purchase one-time credit packs for large deployments.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePayment(10, 'Credit Pack', 'credits', 500)}
                        className="px-8 py-3 rounded-2xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all"
                      >
                        Buy Packs
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- View: Dashboard --- */}
              {view === "dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Left: Projects */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Layout className="w-5 h-5 text-white/60" />
                        <h2 className="text-xl font-medium">Projects</h2>
                      </div>
                      <div className="text-xs text-white/40 uppercase tracking-widest">{deployments.length} Active</div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(!deployments || deployments.length === 0) ? (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white/[0.02] border border-dashed border-white/10 rounded-3xl gap-4">
                          <Rocket className="w-8 h-8 text-white/20" />
                          <div className="text-white/40 text-sm">No projects yet. Start by adding one.</div>
                        </div>
                      ) : (
                        deployments.map((d) => (
                          <GlassCard key={d?.projectId || Math.random()} className="group relative">
                            <div className="flex justify-between items-start mb-6">
                              <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 border border-purple-500/20">
                                <GitHubIcon className="w-5 h-5" />
                              </div>
                              <IconButton icon={Trash2} onClick={() => d?.projectId && handleDelete(d.projectId)} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="mb-6">
                              <h3 
                                className="text-lg font-semibold truncate mb-1 cursor-pointer hover:text-purple-400 transition-colors"
                                onClick={() => d?.projectId && nav(`/project/${d.projectId}`)}
                              >
                                {d?.repoUrl?.split('/').pop() || "Unnamed Project"}
                              </h3>
                              <a
                                href={d?.liveUrl || d?.previewUrl || `${API_BASE.replace('/api', '')}/deploy/${d?.projectId}/`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-white/40 flex items-center gap-1 hover:text-white transition-colors"
                              >
                                {d?.liveUrl ? "Live" : "Preview"} <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                              <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${d?.status === 'ready' || d?.status === 'success' ? 'bg-emerald-500' : ['processing', 'building', 'uploading'].includes(d?.status) ? 'bg-blue-500 animate-pulse' : 'bg-amber-500'}`} />
                                <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest">
                                  {d?.status === 'processing' || d?.status === 'building' ? 'Building...' : d?.status === 'uploading' ? 'Publishing...' : d?.status || 'unknown'}
                                </span>
                              </div>
                              <div className="flex gap-4">
                                <button
                                  onClick={() => d?.projectId && nav(`/project/${d.projectId}`)}
                                  className="text-[10px] font-bold text-white/20 hover:text-white transition-colors uppercase tracking-widest"
                                >
                                  Details
                                </button>
                                <button
                                  onClick={() => {
                                    if (!d) return;
                                    setSelectedId(d.projectId);
                                    setRepoUrl(d.repoUrl);
                                    setProjectName(d.repoUrl?.split('/').pop());
                                    setView("configure");
                                  }}
                                  className="text-[10px] font-bold text-white/20 hover:text-white transition-colors uppercase tracking-widest"
                                >
                                  Redeploy
                                </button>
                              </div>
                            </div>
                          </GlassCard>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Right: Analytics */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-white/60" />
                        <h2 className="text-xl font-medium">Usage Analytics</h2>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1 text-[11px] text-white/60 border border-white/5">
                        Last 7 days <Filter className="w-3 h-3" />
                      </div>
                    </div>

                    <GlassCard className="flex flex-col gap-6">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-xs text-white/60 font-medium">
                            Deployments <AlertCircle className="w-3 h-3" />
                          </div>
                        </div>
                        <div className="flex items-end justify-between mb-4">
                          <div>
                            <div className="text-3xl font-bold leading-none mb-1">24</div>
                            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" /> 12% from last 7 days
                            </div>
                          </div>
                          <div className="w-32">
                            <LineChart data={[20, 45, 30, 60, 40, 75, 55]} color="#a855f7" />
                          </div>
                        </div>
                      </div>

                      <div className="h-px bg-white/5" />

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-xs text-white/60 font-medium">
                            Environment Updates <AlertCircle className="w-3 h-3" />
                          </div>
                        </div>
                        <div className="flex items-end justify-between mb-4">
                          <div>
                            <div className="text-3xl font-bold leading-none mb-1">18</div>
                            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" /> 8% from last 7 days
                            </div>
                          </div>
                          <div className="w-32">
                            <LineChart data={[10, 25, 40, 20, 50, 45, 70]} color="#3b82f6" />
                          </div>
                        </div>
                      </div>
                    </GlassCard>

                    <GlassCard className="relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <Cpu className="w-24 h-24" />
                      </div>
                      <div className="relative z-10">
                        <h3 className="text-lg font-medium mb-2">Need more power?</h3>
                        <p className="text-xs text-white/40 mb-4 leading-relaxed">Upgrade to Pro to get concurrent builds, custom domains, and zero-downtime deployments.</p>
                        <button
                          onClick={() => setView("upgrade")}
                          className="text-xs font-bold text-white flex items-center gap-2 group"
                        >
                          Upgrade Plan <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              )}



              {/* --- View: Import --- */}
              {view === "import" && (
                <motion.div
                  key="import"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-7xl mx-auto w-full px-6 scale-[0.9] origin-top"
                >
                  {/* Top Navigation */}
                  <div className="flex justify-center mb-8">
                    <button
                      onClick={() => setView("dashboard")}
                      className="flex items-center gap-2 text-white/20 hover:text-white transition-all text-[11px] font-bold uppercase tracking-[0.2em]"
                    >
                      <X className="w-3.5 h-3.5" /> Cancel Import
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left Column: Import Tools */}
                    <div className="flex flex-col gap-8">
                      <GlassCard className="p-8">
                        <h2 className="text-xl font-medium mb-6 tracking-tight">Enter GitHub Repo URL</h2>
                        <div className="flex gap-3 p-2 bg-black/40 border border-white/5 rounded-[20px] focus-within:border-white/10 transition-all">
                          <div className="flex-1 flex items-center gap-3 px-4">
                            <GitHubIcon className="w-4 h-4 text-white/30" />
                            <input
                              value={repoUrl}
                              onChange={(e) => setRepoUrl(e.target.value)}
                              placeholder="https://github.com/username/repo"
                              className="bg-transparent border-none outline-none text-sm w-full py-3 placeholder:text-white/10 font-medium"
                            />
                          </div>
                          <button
                            onClick={() => {
                              setProjectName("");
                              setView("configure");
                            }}
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
                          >
                            Import
                          </button>
                        </div>
                      </GlassCard>

                      <GlassCard className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-[12px] font-bold uppercase tracking-[0.25em] text-white/50">Latest Repositories</h2>
                          <IconButton
                            icon={RefreshCw}
                            onClick={fetchRepos}
                            className={`${loadingRepos ? "animate-spin" : ""} w-8 h-8 opacity-40 hover:opacity-100 transition-opacity`}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          {loadingRepos ? (
                            <div className="py-20 flex flex-col items-center justify-center gap-5 text-white/20">
                              <RefreshCw className="w-8 h-8 animate-spin" />
                              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Synchronizing GitHub...</span>
                            </div>
                          ) : githubRepos.length === 0 ? (
                            <div className="py-20 text-center text-white/10 border-2 border-dashed border-white/5 rounded-3xl">
                              <div className="text-sm font-medium mb-1 opacity-40">No repositories found</div>
                              <div className="text-[10px] opacity-20">Connect your account or use a direct URL</div>
                            </div>
                          ) : (
                            <>
                              <div className="space-y-3">
                                {(showAllRepos ? githubRepos : githubRepos.slice(0, 4)).map((repo, i) => (
                                  <div key={repo.id || i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group">
                                    <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                        <GitHubIcon className="w-5 h-5 text-white/40" />
                                      </div>
                                      <div>
                                        <div className="text-sm font-semibold tracking-tight mb-0.5">{repo.name}</div>
                                        <div className="text-[10px] text-white/20 font-medium">Updated {formatRelativeTime(repo.updated_at)}</div>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => {
                                        // Try all possible URL fields returned by different API versions
                                        const targetUrl = repo.html_url || repo.url || repo.clone_url || (repo.full_name ? `https://github.com/${repo.full_name}` : repo.name);
                                        setRepoUrl(targetUrl);
                                        setProjectName("");
                                        setView("configure");
                                      }}
                                      className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                                    >
                                      Import
                                    </button>
                                  </div>
                                ))}
                              </div>

                              {githubRepos.length > 4 && (
                                <button
                                  onClick={() => setShowAllRepos(!showAllRepos)}
                                  className="w-full py-4 mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 hover:text-white/60 transition-colors border-t border-white/5"
                                >
                                  {showAllRepos ? "View fewer repos" : "Show all repositories"}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </GlassCard>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="flex flex-col gap-4">
                      {/* Visual Card */}
                      <div className="relative aspect-[1.1/1] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover opacity-80 transition-transform duration-1000"
                        >
                          <source src="https://dfdx9u0psdezh.cloudfront.net/courses/lovableVideo.webm" type="video/webm" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>

                      {/* Try for Free */}
                      <button className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-5 flex items-center justify-between group hover:bg-white/[0.05] hover:border-white/10 transition-all">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Plus className="w-6 h-6 text-purple-400" />
                          </div>
                          <div className="text-left">
                            <div className="text-base font-semibold mb-0.5">Try for Free</div>
                            <div className="text-[11px] text-white/40 font-medium">No credit card required</div>
                          </div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-white/10 group-hover:translate-x-1 group-hover:text-white transition-all" />
                      </button>

                      {/* Use Template */}
                      <div className="flex flex-col gap-2">
                        <button className="w-full bg-white text-black rounded-xl p-5 flex items-center justify-between group hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_50px_rgba(255,255,255,0.05)]">
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center text-black">
                              <Layout className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                              <div className="text-base font-bold mb-0.5">Use Template</div>
                              <div className="text-[11px] text-black/50 font-medium">Speed up your workflow</div>
                            </div>
                          </div>
                          <ArrowRight className="w-6 h-6 text-black/20 group-hover:translate-x-1 transition-all" />
                        </button>
                        <p className="text-[10px] text-white/15 text-center font-medium leading-relaxed tracking-wide px-10 mt-1">
                          It's a separate tool, credit charges will be different.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- View: Configure --- */}
              {view === "configure" && (
                <motion.div
                  key="configure"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="max-w-7xl mx-auto w-full px-6 scale-[0.9] origin-top"
                >
                  <GlassCard className="flex flex-col gap-8 p-10 mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-center relative mb-2">
                      <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">Configure Project</h2>
                      <IconButton icon={X} onClick={() => setView("import")} className="absolute right-0 hover:rotate-90 transition-transform" />
                    </div>

                    {/* Selected Repo Card */}
                    <div className="flex flex-col gap-4">
                      <label className="text-[12px] font-bold text-white/40 uppercase tracking-[0.15em] px-1">Selected Repository</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 w-1 bg-purple-500 rounded-full my-3" />
                        <div className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl pl-6 hover:bg-white/[0.08] transition-all cursor-pointer">
                          <div className="flex items-center gap-4">
                            <GitHubIcon className="w-5 h-5 text-white/60" />
                            <span className="text-sm font-medium tracking-tight">
                              {repoUrl
                                ? (repoUrl.includes('/') ? repoUrl.split('/').slice(-2).join(' / ') : repoUrl)
                                : "owner / repo-name"}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-white/20 rotate-90" />
                        </div>
                      </div>
                    </div>

                    {/* Project Name */}
                    <div className="flex flex-col gap-4">
                      <label className="text-[12px] font-bold text-white/40 uppercase tracking-[0.15em] px-1">Project Name</label>
                      <div className="flex items-center gap-4 px-5 bg-white/[0.03] border border-white/5 rounded-2xl focus-within:border-white/10 transition-all">
                        <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center">
                          <Rocket className="w-3.5 h-3.5 text-white/40" />
                        </div>
                        <input
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          placeholder="Enter your project name"
                          className="bg-transparent border-none outline-none text-sm w-full py-4 placeholder:text-white/20 font-medium"
                        />
                      </div>
                    </div>

                    {/* Env Vars */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between px-1">
                        <label className="text-[12px] font-bold text-white/40 uppercase tracking-[0.15em]">Environment Variables</label>
                        <button
                          onClick={() => setEnvVars([...envVars, { key: "", value: "" }])}
                          className="text-[11px] font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          + Add Variable
                        </button>
                      </div>

                      <div className="space-y-3">
                        {envVars.map((ev, i) => (
                          <div key={i} className="flex gap-3">
                            <input
                              placeholder="e.g. API_URL"
                              value={ev.key}
                              onChange={(e) => {
                                const next = [...envVars];
                                next[i].key = e.target.value;
                                setEnvVars(next);
                              }}
                              className="flex-1 bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-white/10 transition-colors placeholder:text-white/10"
                            />
                            <input
                              placeholder="e.g. https://api.com"
                              value={ev.value}
                              onChange={(e) => {
                                const next = [...envVars];
                                next[i].value = e.target.value;
                                setEnvVars(next);
                              }}
                              className="flex-1 bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-white/10 transition-colors placeholder:text-white/10"
                            />
                            {envVars.length > 1 && (
                              <button
                                onClick={() => setEnvVars(envVars.filter((_, idx) => idx !== i))}
                                className="p-3 text-white/20 hover:text-rose-400 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deploy Button */}
                    <button
                      onClick={handleDeploy}
                      disabled={busy}
                      className="w-full bg-white hover:bg-white/90 text-black rounded-2xl py-5 font-semibold flex items-center justify-center gap-2.5 shadow-xl disabled:opacity-50 transition-all mt-10 mb-2"
                    >
                      {busy ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Rocket className="w-5 h-5" />}
                      <span className="text-sm">{busy ? 'Deploying...' : 'Deploy'}</span>
                    </button>

                    {/* Logs */}
                    <div className="flex flex-col gap-3 mt-4 h-[340px]">
                      <TerminalLogs lines={logs} />
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
        </div>

        {/* --- Modals --- */}
        <AnimatePresence>
          {modal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-[#0f0f12] border border-white/10 rounded-3xl p-8 max-w-sm w-full shadow-[0_20px_80px_rgba(0,0,0,0.8)] relative overflow-hidden"
              >
                {/* Background Glow */}
                <div className={`absolute -top-24 -left-24 w-48 h-48 blur-[100px] opacity-20 ${modal.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`} />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${modal.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    {modal.type === 'success' ? <CheckCircle2 className="w-8 h-8" /> : <X className="w-8 h-8" />}
                  </div>

                  <h3 className="text-2xl font-medium mb-2">{modal.type === 'success' ? 'Deployment Successful' : 'Deployment Failed'}</h3>
                  <p className="text-sm text-white/40 mb-8 leading-relaxed">{modal.message}</p>

                  {modal.type === 'success' && modal.url && (
                    <div className="w-full flex items-center gap-2 p-3 bg-black/40 border border-white/5 rounded-xl mb-6">
                      <input readOnly value={modal.url} className="bg-transparent border-none outline-none text-[10px] w-full text-white/60 font-mono" />
                      <button onClick={() => { navigator.clipboard.writeText(modal.url); }} className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
                        <Copy className="w-3.5 h-3.5 text-white/40" />
                      </button>
                    </div>
                  )}

                  {modal.type === 'error' && (
                    <div className="w-full p-4 bg-rose-500/5 border border-rose-500/10 rounded-xl mb-8 flex items-start gap-3 text-left">
                      <Cpu className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div className="text-[11px] text-rose-400/80 leading-relaxed">AI will analyze the issue and give you a solution within your terminal logs.</div>
                    </div>
                  )}

                  <button
                    onClick={() => { setModal(null); setView("dashboard"); }}
                    className="w-full bg-white text-black rounded-2xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-all"
                  >
                    <Layout className="w-4 h-4" />
                    Go to Dashboard
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Contact Sales Popup */}
        <AnimatePresence>
          {showContact && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowContact(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg bg-[#0C0C0C] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
              >
                <div className="p-8 md:p-12">
                  <button 
                    onClick={() => setShowContact(false)}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5 text-white/40 hover:text-white" />
                  </button>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight text-white">Get in touch</h3>
                      <p className="text-white/40 text-sm">We're here to help you scale.</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/10 transition-all">
                      <div className="flex items-center gap-4 mb-2">
                        <Mail className="w-5 h-5 text-white/40" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white/40">Direct Email</span>
                      </div>
                      <a href="mailto:support@gmail.com" className="text-xl font-medium text-white hover:text-purple-400 transition-colors">
                        support@gmail.com
                      </a>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed px-2">
                      Have questions or need custom infrastructure? We're here to help you scale without the headache. Drop us a line and our engineers will get back to you within 24 hours.
                    </p>
                    <button 
                      onClick={() => window.location.href = 'mailto:support@gmail.com'}
                      className="w-full py-4 rounded-2xl bg-white text-black font-bold text-sm hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                    >
                      Send Message <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <style dangerouslySetInnerHTML={{
          __html: `
        .font-heading { font-family: 'Instrument Serif', serif; }
        .font-body { font-family: 'Barlow', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}} />
      </div>
    </div>
  );
}
