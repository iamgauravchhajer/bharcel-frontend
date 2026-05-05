import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronRight, 
  BookOpen, 
  Rocket, 
  Shield, 
  Terminal, 
  GitBranch, 
  Zap, 
  ChevronDown, 
  ExternalLink,
  Copy,
  Check,
  Menu,
  X,
  Star,
  Settings,
  HelpCircle,
  Database,
  Cpu,
  Globe,
  Layers,
  Box,
  Layout,
  Code2,
  Wind,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/[0.03] border border-white/5 backdrop-blur-md rounded-2xl ${className}`}>
    {children}
  </div>
);

const CodeBlock = ({ code, language = "bash" }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <div className="absolute -inset-px bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-[#0C0C0C] border border-white/10 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
          <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{language}</span>
          <button onClick={copy} className="p-1.5 hover:bg-white/5 rounded-md transition-colors">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white/20 hover:text-white/60" />}
          </button>
        </div>
        <div className="p-5 font-mono text-sm leading-relaxed text-purple-300/90 whitespace-pre overflow-x-auto">
          {code}
        </div>
      </div>
    </div>
  );
};

export default function DocsPage() {
  const nav = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('what-is-bharcel');
  
  const sections = [
    {
      title: "Getting Started",
      items: [
        { id: 'what-is-bharcel', label: 'What is Bharcel?', icon: <Star className="w-4 h-4" /> },
        { id: 'prerequisites', label: 'Prerequisites', icon: <Settings className="w-4 h-4" /> },
        { id: 'installation', label: 'Installation', icon: <Rocket className="w-4 h-4" /> },
      ]
    },
    {
      title: "Deployments",
      items: [
        { id: 'deployment-flow', label: 'Deployment Flow', icon: <Zap className="w-4 h-4" /> },
        { id: 'running-project', label: 'Running Project', icon: <Terminal className="w-4 h-4" /> },
        { id: 'env-vars', label: 'Environment Variables', icon: <Shield className="w-4 h-4" /> },
      ]
    },
    {
      title: "Platform",
      items: [
        { id: 'architecture', label: 'System Architecture', icon: <Database className="w-4 h-4" /> },
        { id: 'tech-stack', label: 'Tech Stack', icon: <Cpu className="w-4 h-4" /> },
      ]
    },
    {
      title: "Resources",
      items: [
        { id: 'commands', label: 'Command Cheat Sheet', icon: <Terminal className="w-4 h-4" /> },
        { id: 'troubleshooting', label: 'Troubleshooting', icon: <HelpCircle className="w-4 h-4" /> },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white font-['Inter'] flex flex-col">
      {/* Header */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div 
              onClick={() => nav("/")} 
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <Star className="w-5 h-5 text-black fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight">Bharcel</span>
              <div className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-widest ml-2">Docs</div>
            </div>

            <div className="hidden md:flex items-center relative group">
              <Search className="absolute left-3 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="Search documentation..." 
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-sm w-64 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 text-xs font-bold text-white/40 hover:text-white transition-colors">
              Github <ExternalLink className="w-3 h-3" />
            </button>
            <button 
              onClick={() => nav("/")}
              className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold transition-transform hover:scale-105"
            >
              Go to Home
            </button>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <div className="flex-grow max-w-[1600px] mx-auto w-full flex relative">
        
        {/* Sidebar */}
        <aside className={`
          fixed md:sticky top-16 z-40 h-[calc(100vh-64px)] w-72 border-r border-white/5 bg-black md:bg-transparent
          transition-transform duration-300 md:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full overflow-y-auto p-6 space-y-8 scrollbar-hide">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] px-3">{section.title}</h4>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        activeSection === item.id 
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                          : 'text-white/40 hover:text-white/60 hover:bg-white/[0.02] border border-transparent'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg border ${activeSection === item.id ? 'bg-purple-500/10 border-purple-500/20' : 'bg-white/5 border-white/10'}`}>
                        {item.icon}
                      </div>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-grow px-6 py-12 md:px-20 md:py-20 max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="prose prose-invert max-w-none"
            >
              {activeSection === 'what-is-bharcel' && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-widest">
                      <Star className="w-3 h-3" /> Introduction
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">What is Bharcel?</h1>
                    <p className="text-xl text-white/40 font-light leading-relaxed">
                      Bharcel is a high-performance, open-source deployment platform designed to simplify the lifecycle of modern web applications. 
                    </p>
                  </div>

                  <GlassCard className="p-8 space-y-6 bg-gradient-to-br from-purple-500/[0.05] to-transparent">
                    <p className="text-white/60 leading-relaxed text-lg">
                      Much like Vercel or Netlify, Bharcel automates the process of cloning repositories, building projects, and serving them via unique, live URLs—all while providing real-time logs and AI-driven failure analysis.
                    </p>
                  </GlassCard>

                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight pt-8">Key Capabilities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: 'Automated CI/CD', desc: 'Push to Github and watch your build trigger instantly.' },
                        { title: 'AI Diagnostics', desc: 'Neural analysis of build logs to find and fix errors fast.' },
                        { title: 'Real-time Monitoring', desc: 'Live WebSocket streams of build progress and server health.' },
                        { title: 'Isolated Builds', desc: 'Docker-powered environments ensure consistent builds every time.' }
                      ].map((item, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                          <h4 className="text-white font-bold mb-1">{item.title}</h4>
                          <p className="text-xs text-white/40">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'prerequisites' && (
                <div className="space-y-8">
                   <div className="space-y-4">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
                      <Settings className="w-3 h-3" /> Preparation
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">Prerequisites</h1>
                    <p className="text-xl text-white/40 font-light leading-relaxed">
                      Before you begin your journey with Bharcel, ensure your environment meets the following requirements.
                    </p>
                  </div>

                  <div className="space-y-6 pt-4">
                    {[
                      { name: 'Node.js', version: 'v18 or higher', link: 'https://nodejs.org/' },
                      { name: 'Docker Desktop', version: 'Latest stable', link: 'https://www.docker.com/' },
                      { name: 'Redis', version: 'Local or cloud instance', link: 'https://redis.io/' },
                      { name: 'MongoDB', version: 'v6.0+ (Local or Atlas)', link: 'https://mongodb.com/' }
                    ].map((pre, i) => (
                      <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-white/10 transition-colors">
                        <div className="flex flex-col">
                          <span className="text-white font-bold">{pre.name}</span>
                          <span className="text-xs text-white/40">{pre.version}</span>
                        </div>
                        <a href={pre.link} target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                          <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/60" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'installation' && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                      <Rocket className="w-3 h-3" /> Setup
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">Installation</h1>
                  </div>

                  <div className="space-y-10 pt-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">1. Clone Repository</h3>
                      <CodeBlock code="git clone https://github.com/Keshavcodes3/Shipify.git\ncd Shipify" />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">2. Install Dependencies</h3>
                      <p className="text-white/40 text-sm">You need to install packages for the root, backend, worker, and frontend.</p>
                      <CodeBlock code="# From root directory\nnpm install\ncd Backend && npm install\ncd ../worker && npm install\ncd ../Frontend && npm install" />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'deployment-flow' && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest">
                      <Zap className="w-3 h-3" /> The Pipeline
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">Deployment Flow</h1>
                    <p className="text-xl text-white/40 font-light leading-relaxed">
                      Bharcel executes a precise 8-step pipeline to take your code from a repository to a live URL.
                    </p>
                  </div>

                  <div className="relative mt-12 space-y-8 before:absolute before:left-4 before:top-0 before:bottom-0 before:w-px before:bg-white/5">
                    {[
                      { t: 'Submission', d: 'User submits a repo URL and branch via the dashboard.' },
                      { t: 'Queuing', d: 'API validates the request and adds a job to the Redis queue.' },
                      { t: 'Pickup', d: 'An idle Worker picks the job and updates status to "building".' },
                      { t: 'Cloning', d: 'The Worker clones the repository into a secure build directory.' },
                      { t: 'Install', d: 'Dependencies are resolved using the projects lockfiles.' },
                      { t: 'Build', d: 'Code is compiled or bundled (e.g., npm run build).' },
                      { t: 'Publish', d: 'Build artifacts are moved to the storage volume.' },
                      { t: 'Live URL', d: 'A unique subdomain URL is generated for immediate access.' }
                    ].map((step, i) => (
                      <div key={i} className="relative pl-12 group">
                        <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center text-[10px] font-bold group-hover:border-purple-500/50 transition-colors">
                          {i + 1}
                        </div>
                        <h4 className="text-white font-bold">{step.t}</h4>
                        <p className="text-sm text-white/40 leading-relaxed">{step.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'running-project' && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-widest">
                      <Terminal className="w-3 h-3" /> Startup
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">Running Project</h1>
                  </div>

                  <div className="space-y-12 pt-8">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold flex items-center gap-3 text-white/90">
                        <span className="p-2 rounded-lg bg-white/5 border border-white/10"><Layout className="w-5 h-5 text-purple-400" /></span>
                        Local Development
                      </h3>
                      <p className="text-white/40 leading-relaxed">
                        To start the entire system (API + Worker) concurrently and then the frontend dashboard.
                      </p>
                      <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-white/20">Step 1: Start Backend & Worker</p>
                        <CodeBlock code="cd Backend\nnpm run dev:all" />
                        <p className="text-xs font-bold uppercase tracking-widest text-white/20">Step 2: Start Frontend</p>
                        <CodeBlock code="cd Frontend\nnpm run dev" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold flex items-center gap-3 text-white/90">
                        <span className="p-2 rounded-lg bg-white/5 border border-white/10"><Box className="w-5 h-5 text-blue-400" /></span>
                        Docker Setup
                      </h3>
                      <p className="text-white/40 leading-relaxed">
                        For a production-like environment, use Docker Compose to orchestrate all services.
                      </p>
                      <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-white/20">Start the Platform</p>
                        <CodeBlock code="docker compose up --build" />
                        <p className="text-xs font-bold uppercase tracking-widest text-white/20">Stop the Platform</p>
                        <CodeBlock code="docker compose down" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'env-vars' && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                      <Shield className="w-3 h-3" /> Security
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">Environment Variables</h1>
                    <p className="text-xl text-white/40 font-light leading-relaxed">
                      Configure your platform with these mandatory keys. Create a <code className="text-purple-400">.env</code> file in the root directory.
                    </p>
                  </div>

                  <div className="space-y-6 pt-8">
                    {[
                      { g: 'Core', items: [
                        { k: 'MONGO_URI', v: 'your_mongodb_uri', d: 'Connection string for MongoDB' },
                        { k: 'REDIS_HOST', v: 'localhost', d: 'Hostname for Redis instance' },
                        { k: 'REDIS_PORT', v: '6379', d: 'Port for Redis instance' }
                      ]},
                      { g: 'Security', items: [
                        { k: 'JWT_SECRET', v: 'your_32_char_secret', d: 'Secret key for token signing' },
                        { k: 'ENCRYPTION_KEY', v: 'your_32_char_key', d: 'Key for sensitive data encryption' }
                      ]},
                      { g: 'Integrations', items: [
                        { k: 'GITHUB_CLIENT_ID', v: 'your_id', d: 'OAuth Client ID from GitHub' },
                        { k: 'GITHUB_CLIENT_SECRET', v: 'your_secret', d: 'OAuth Secret from GitHub' },
                        { k: 'GROQ_API_KEY', v: 'your_key', d: 'API key for AI debugging services' }
                      ]}
                    ].map((group, idx) => (
                      <div key={idx} className="space-y-4">
                        <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">{group.g}</h4>
                        <div className="space-y-3">
                          {group.items.map((item, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex flex-col">
                                <span className="font-mono text-sm text-purple-400">{item.k}</span>
                                <span className="text-xs text-white/30">{item.d}</span>
                              </div>
                              <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/40">
                                {item.v}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'architecture' && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                      <Database className="w-3 h-3" /> Logic
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">System Architecture</h1>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                    {[
                      { t: 'API Gateway', d: 'Express-powered hub for user auth, project management, and job orchestration.' },
                      { t: 'Background Worker', d: 'BullMQ-driven service that handles the heavy lifting of builds and Docker containers.' },
                      { t: 'Message Broker', d: 'Redis powering our high-concurrency queue system for asynchronous processing.' },
                      { t: 'Docker Integration', d: 'Isolated build environments ensuring consistent artifacts every single time.' }
                    ].map((item, i) => (
                      <GlassCard key={i} className="p-8 space-y-4 border-white/10 group hover:bg-white/[0.05] transition-all">
                        <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">{item.t}</h4>
                        <p className="text-sm text-white/40 leading-relaxed">{item.d}</p>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'tech-stack' && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-widest">
                      <Layers className="w-3 h-3" /> Infrastructure
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">Technology Stack</h1>
                    <p className="text-xl text-white/40 font-light leading-relaxed">
                      Bharcel is built using industrial-grade technologies across the entire stack.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {[
                      { p: 'React', u: 'Modern UI library for building a fast, reactive dashboard.', i: <Code2 className="w-4 h-4" /> },
                      { p: 'Vite', u: 'Next-generation frontend build tool for lightning-fast development.', i: <Zap className="w-4 h-4" /> },
                      { p: 'Framer Motion', u: 'Premium animation engine for the fluid, high-end user experience.', i: <Activity className="w-4 h-4" /> },
                      { p: 'Tailwind CSS', u: 'Utility-first CSS framework for rapid, consistent styling.', i: <Wind className="w-4 h-4" /> },
                      { p: 'Express', u: 'Fast, unopinionated web framework for the API gateway.', i: <Globe className="w-4 h-4" /> },
                      { p: 'Mongoose', u: 'Elegant MongoDB object modeling for project and user data.', i: <Database className="w-4 h-4" /> },
                      { p: 'BullMQ', u: 'Professional-grade job queue for reliable background processing.', i: <Zap className="w-4 h-4" /> },
                      { p: 'IORedis', u: 'Robust Redis client for handling queue connections.', i: <Terminal className="w-4 h-4" /> },
                      { p: 'Socket.io', u: 'Real-time, bidirectional logging and status updates.', i: <GitBranch className="w-4 h-4" /> },
                      { p: 'Zod', u: 'Schema-based validation for incoming API requests.', i: <Shield className="w-4 h-4" /> }
                    ].map((tech, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-5 group hover:border-white/10 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <span className="text-purple-400">{tech.i}</span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-white font-bold">{tech.p}</h4>
                          <p className="text-xs text-white/40 leading-relaxed">{tech.u}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'commands' && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                      <Terminal className="w-3 h-3" /> Shortcuts
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">Command Cheat Sheet</h1>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] mt-8">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/[0.03]">
                          <th className="px-6 py-4 font-bold text-white/40 uppercase tracking-widest text-[10px]">Action</th>
                          <th className="px-6 py-4 font-bold text-white/40 uppercase tracking-widest text-[10px]">Command</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {[
                          { a: 'Start Everything (Dev)', c: 'npm run dev:all' },
                          { a: 'Start Worker Only', c: 'npm run worker' },
                          { a: 'Start Frontend', c: 'npm run dev' },
                          { a: 'Docker Build', c: 'docker compose up --build' },
                          { a: 'Test Redis', c: 'redis-cli ping' }
                        ].map((row, i) => (
                          <tr key={i} className="group hover:bg-white/[0.01] transition-colors">
                            <td className="px-6 py-4 font-medium text-white/80">{row.a}</td>
                            <td className="px-6 py-4 font-mono text-purple-400 text-xs">{row.c}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSection === 'troubleshooting' && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-widest">
                      <HelpCircle className="w-3 h-3" /> Support
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">Troubleshooting</h1>
                  </div>

                  <div className="space-y-6 mt-8">
                    {[
                      { q: 'Jobs Stuck in "Queued"?', a: 'Ensure the worker process is running (`npm run worker`). Check Redis logs for connection timeouts or high memory usage.' },
                      { q: 'Redis Connection Issues?', a: 'Verify `REDIS_PASSWORD` matches your instance and ensure the host is reachable from your environment. Use `redis-cli ping` to test.' },
                      { q: 'Docker "Permission Denied"?', a: 'Ensure your user has access to the Docker socket (`/var/run/docker.sock`). On Linux, add your user to the `docker` group.' },
                      { q: 'Build Fails Without Logs?', a: 'Check the Worker console for immediate crashes. This usually happens if the cloned repo has invalid characters or exceeds disk limits.' }
                    ].map((faq, i) => (
                      <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                        <h4 className="text-xl font-bold text-white">{faq.q}</h4>
                        <p className="text-white/40 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Right TOC (Sticky) */}
        <aside className="hidden xl:block sticky top-16 h-[calc(100vh-64px)] w-64 p-12">
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">On this page</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-1 h-1 rounded-full bg-purple-500" />
                <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors">Documentation</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer pl-3 border-l border-white/5">
                <span className="text-xs font-medium text-white/30 group-hover:text-white transition-colors">Resources</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer pl-3 border-l border-white/5">
                <span className="text-xs font-medium text-white/30 group-hover:text-white transition-colors">Troubleshoot</span>
              </div>
            </div>
          </div>
        </aside>

      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 bg-black py-12 px-6">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 opacity-20 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => nav("/")}>
            <Star className="w-5 h-5 text-white fill-current" />
            <span className="text-sm font-bold">Bharcel</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
