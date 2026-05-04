import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Terminal, 
  Code2, 
  Cpu, 
  Globe, 
  Shield, 
  ArrowLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DocSection = ({ icon: Icon, title, content }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-5 h-5 text-purple-400" />
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
    </div>
    <div className="text-white/60 leading-relaxed space-y-4">
      {content}
    </div>
  </div>
);

const docContents = {
  'Getting Started': {
    icon: Terminal,
    title: 'Getting Started',
    content: (
      <>
        <p>Bharcel is a high-performance deployment platform designed for modern web applications. To get started, connect your GitHub account and select a repository.</p>
        <div className="bg-black border border-white/10 rounded-2xl p-6 font-mono text-sm">
          <div className="text-emerald-400"># Connect your repo and deploy</div>
          <div className="text-white">bharcel deploy https://github.com/user/my-app</div>
        </div>
      </>
    )
  },
  'Architecture': {
    icon: Cpu,
    title: 'Architecture',
    content: (
      <>
        <p>Our architecture is built for speed and reliability, utilizing edge networks and serverless functions.</p>
        <ul className="list-disc list-inside space-y-2 text-white/80">
          <li>Global Edge CDN</li>
          <li>Distributed Serverless Compute</li>
          <li>High-performance Build Clusters</li>
        </ul>
      </>
    )
  },
  'Security': {
    icon: Shield,
    title: 'Enterprise Security',
    content: (
      <>
        <p>All deployments are isolated in secure Docker containers. We encrypt your environment variables using AES-256 and provide automatic DDoS protection at the edge.</p>
      </>
    )
  },
  'GitHub Integration': {
    icon: Globe,
    title: 'GitHub Integration',
    content: (
      <>
        <p>Connect your GitHub repositories seamlessly. We automatically listen to push events and trigger deployments without manual intervention.</p>
      </>
    )
  },
  'Build Pipeline': {
    icon: Code2,
    title: 'Automated Build Pipeline',
    content: (
      <>
        <p>Our intelligent worker engine automatically detects your framework (Next.js, Vite, React) and executes the optimal build command.</p>
        <ul className="list-disc list-inside space-y-2 text-white/80">
          <li>Automatic dependency installation</li>
          <li>Build artifact optimization</li>
          <li>AI-powered error analysis on failure</li>
        </ul>
      </>
    )
  },
  'Custom Domains': {
    icon: Globe,
    title: 'Custom Domains',
    content: (
      <>
        <p>Bring your own domains and we will automatically provision SSL certificates for you.</p>
      </>
    )
  }
};

export default function DocsPage() {
  const nav = useNavigate();
  const [activeSection, setActiveSection] = React.useState('Getting Started');

  const renderActiveSection = () => {
    const section = docContents[activeSection];
    if (!section) return null;
    return <DocSection icon={section.icon} title={section.title} content={section.content} />;
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white">
      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 h-screen sticky top-0 p-8 hidden lg:block">
          <div className="flex items-center gap-2 mb-12 cursor-pointer" onClick={() => nav('/')}>
            <Zap className="w-6 h-6 fill-white" />
            <span className="text-xl font-bold">Bharcel</span>
          </div>
          
          <nav className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-4 px-4">Introduction</div>
            {['Getting Started', 'Architecture', 'Security'].map(item => (
              <button 
                key={item} 
                onClick={() => setActiveSection(item)}
                className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-all ${activeSection === item ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              >
                {item}
              </button>
            ))}
            
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-4 mt-8 px-4">Deployment</div>
            {['GitHub Integration', 'Build Pipeline', 'Custom Domains'].map(item => (
              <button 
                key={item} 
                onClick={() => setActiveSection(item)}
                className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-all ${activeSection === item ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-16 max-w-4xl">
          <header className="mb-16">
            <button 
              onClick={() => nav('/')}
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
            <h1 className="text-5xl font-bold tracking-tighter mb-4">Documentation</h1>
            <p className="text-xl text-white/40 font-light">Everything you need to build and deploy with Bharcel.</p>
          </header>

          {renderActiveSection()}

          <footer className="mt-24 pt-8 border-t border-white/5 flex items-center justify-between text-white/20 text-xs">
            <div>© 2026 Bharcel Inc.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
