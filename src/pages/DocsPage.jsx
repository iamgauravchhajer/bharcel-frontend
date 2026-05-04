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
        <p>Bharcel is a high-performance, open-source deployment platform designed to simplify the lifecycle of modern web applications. Much like Vercel or Netlify, Bharcel automates the process of cloning repositories, building projects, and serving them via unique, live URLs—all while providing real-time logs and AI-driven failure analysis.</p>
        <div className="bg-black border border-white/10 rounded-2xl p-6 font-mono text-sm mt-4">
          <div className="text-emerald-400"># Connect your repo and deploy</div>
          <div className="text-white">bharcel deploy https://github.com/user/my-app</div>
        </div>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-white">Prerequisites</h3>
        <ul className="list-disc list-inside space-y-2 text-white/80">
          <li>Node.js (v18 or higher)</li>
          <li>Docker Desktop</li>
          <li>Redis (if running locally without Docker)</li>
          <li>MongoDB (Local or Atlas cluster)</li>
        </ul>
      </>
    )
  },
  'Tech Stack': {
    icon: Code2,
    title: 'Key Technology Stack',
    content: (
      <>
        <p>Bharcel is built using a modern, robust set of technologies:</p>
        <div className="space-y-4 mt-4">
          <div><h4 className="font-bold text-white">Express</h4><p className="text-sm text-white/80">Fast, unopinionated web framework for the API gateway.</p></div>
          <div><h4 className="font-bold text-white">Mongoose</h4><p className="text-sm text-white/80">Elegant MongoDB object modeling for project and user data.</p></div>
          <div><h4 className="font-bold text-white">BullMQ</h4><p className="text-sm text-white/80">Professional-grade job queue for reliable background processing.</p></div>
          <div><h4 className="font-bold text-white">IORedis</h4><p className="text-sm text-white/80">Robust Redis client for handling queue connections.</p></div>
          <div><h4 className="font-bold text-white">Socket.io</h4><p className="text-sm text-white/80">Real-time, bidirectional logging and status updates.</p></div>
          <div><h4 className="font-bold text-white">Zod</h4><p className="text-sm text-white/80">Schema-based validation for incoming API requests.</p></div>
        </div>
      </>
    )
  },
  'Architecture': {
    icon: Cpu,
    title: 'System Architecture',
    content: (
      <>
        <p>Bharcel is built as a stateless, distributed monorepo consisting of four primary layers to ensure high availability and scalability.</p>
        <div className="space-y-4 mt-4">
          <div>
            <h4 className="font-bold text-white">1. API Server (Backend)</h4>
            <p className="text-sm text-white/80">The orchestrator. Handles user authentication, project management, and deployment triggers using Node.js, Express, and Mongoose.</p>
          </div>
          <div>
            <h4 className="font-bold text-white">2. Build Worker (Worker)</h4>
            <p className="text-sm text-white/80">The execution engine. Consumes build jobs from Redis, clones code, and performs containerized builds using BullMQ, Docker, and Git.</p>
          </div>
          <div>
            <h4 className="font-bold text-white">3. Object Storage (MinIO)</h4>
            <p className="text-sm text-white/80">The source of truth. Stores immutable build artifacts partitioned by project and commit hash.</p>
          </div>
          <div>
            <h4 className="font-bold text-white">4. Message Queue (Redis)</h4>
            <p className="text-sm text-white/80">The communication bridge. Manages job persistence, retries, and concurrency control between the API and Workers.</p>
          </div>
        </div>
      </>
    )
  },
  'Security': {
    icon: Shield,
    title: 'Security & Reliability Features',
    content: (
      <>
        <ul className="space-y-4 text-white/80">
          <li>
            <strong className="text-white">Build Isolation:</strong> Build containers have no access to the host filesystem (except the specific project directory) and are resource-throttled to prevent malicious scripts from hanging the host.
          </li>
          <li>
            <strong className="text-white">Encrypted Secrets:</strong> No build-time environment variables are stored in plain text. They are encrypted using AES-256-CBC and only decrypted inside the ephemeral build container.
          </li>
          <li>
            <strong className="text-white">Atomic Queueing:</strong> BullMQ ensures that if a worker crashes mid-build, the job is eventually marked as failed or retried, preventing "stuck" deployments.
          </li>
          <li>
            <strong className="text-white">MIME Integrity:</strong> The system correctly identifies types like text/css and application/javascript during upload to ensure browsers render sites correctly.
          </li>
        </ul>
      </>
    )
  },
  'Setup & Execution': {
    icon: Terminal,
    title: 'Setup & Execution',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-2 text-white">1. Local Development (Recommended)</h3>
        <p className="text-sm text-white/80 mb-2">To start the entire system (API + Worker) concurrently:</p>
        <div className="bg-black border border-white/10 rounded-lg p-4 font-mono text-xs mb-6 text-emerald-400">
          cd Backend<br/>npm run dev:all
        </div>
        <p className="text-sm text-white/80 mb-2">Then, start the frontend:</p>
        <div className="bg-black border border-white/10 rounded-lg p-4 font-mono text-xs mb-6 text-emerald-400">
          cd Frontend<br/>npm run dev
        </div>

        <h3 className="text-lg font-semibold mb-2 text-white">2. Docker Setup</h3>
        <p className="text-sm text-white/80 mb-2">For a production-like environment, use Docker Compose to orchestrate all services:</p>
        <div className="bg-black border border-white/10 rounded-lg p-4 font-mono text-xs mb-6 text-emerald-400">
          docker compose up --build
        </div>
        <p className="text-sm text-white/80 mb-2">Containers Managed: <code>vercel-api</code>, <code>vercel-worker</code>, <code>vercel-mongodb</code>, <code>vercel-redis</code></p>
      </>
    )
  },
  'GitHub Integration': {
    icon: Globe,
    title: 'GitHub Integration & Workflows',
    content: (
      <>
        <p>Connect your GitHub repositories seamlessly. We automatically listen to push events and trigger deployments without manual intervention.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-white">Roles & Permissions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-white">Member Panel</h4>
            <ul className="list-disc list-inside text-sm text-white/80">
              <li>Link any public or private GitHub repository.</li>
              <li>Watch build progress live via WebSockets.</li>
              <li>Access previous builds and retry failed jobs.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white">Admin Panel</h4>
            <ul className="list-disc list-inside text-sm text-white/80">
              <li>Promote users to admins or disable accounts.</li>
              <li>Monitor global success rates and average build times.</li>
              <li>Oversee all system deployments to ensure platform health.</li>
            </ul>
          </div>
        </div>
      </>
    )
  },
  'Build Pipeline': {
    icon: Code2,
    title: 'Automated Deployment Flow',
    content: (
      <>
        <p>When you submit a repository to Bharcel, the system executes a precise 8-step pipeline:</p>
        <ol className="list-decimal list-inside mt-4 space-y-2 text-white/80 text-sm">
          <li><strong className="text-white">Submission:</strong> User submits a repo URL and branch.</li>
          <li><strong className="text-white">Queuing:</strong> API validates the request and adds a job to the Redis queue.</li>
          <li><strong className="text-white">Pickup:</strong> An idle Worker picks the job and updates status to `building`.</li>
          <li><strong className="text-white">Cloning:</strong> The Worker clones the repository into a secure build directory.</li>
          <li><strong className="text-white">Install:</strong> Dependencies are resolved using the project's lockfiles.</li>
          <li><strong className="text-white">Build:</strong> Code is compiled or bundled (e.g., `npm run build`).</li>
          <li><strong className="text-white">Publish:</strong> Build artifacts are moved to the storage volume.</li>
          <li><strong className="text-white">Live URL:</strong> A unique subdomain URL is generated and the status is set to `success`.</li>
        </ol>
      </>
    )
  },
  'Content Serving': {
    icon: Globe,
    title: 'Content Serving & Routing',
    content: (
      <>
        <p>Bharcel uses a high-performance Express middleware to resolve and serve content:</p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-white/80 text-sm">
          <li>
            <strong className="text-white">Subdomain Resolution:</strong> Automatically extracts the projectId from the subdomain (e.g. `my-site.localhost:3000`), checks MongoDB for the active commitHash, and streams the path directly from MinIO.
          </li>
          <li>
            <strong className="text-white">SPA Support:</strong> If a path isn't found (e.g., `/dashboard` in a React app), the server automatically serves `index.html` from MinIO, allowing client-side routing to take over smoothly.
          </li>
        </ul>
      </>
    )
  },
  'Commands': {
    icon: Terminal,
    title: 'Command Cheat Sheet',
    content: (
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mt-4">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/5 text-white/60">
            <tr><th className="px-4 py-3 font-medium">Action</th><th className="px-4 py-3 font-medium">Command</th></tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white/80">
            <tr><td className="px-4 py-3">Start Everything (Dev)</td><td className="px-4 py-3 font-mono text-emerald-400">npm run dev:all</td></tr>
            <tr><td className="px-4 py-3">Start Worker Only</td><td className="px-4 py-3 font-mono text-emerald-400">npm run worker</td></tr>
            <tr><td className="px-4 py-3">Start Frontend</td><td className="px-4 py-3 font-mono text-emerald-400">npm run dev</td></tr>
            <tr><td className="px-4 py-3">Docker Compose Build</td><td className="px-4 py-3 font-mono text-emerald-400">docker compose up --build</td></tr>
            <tr><td className="px-4 py-3">Test Redis</td><td className="px-4 py-3 font-mono text-emerald-400">redis-cli ping</td></tr>
          </tbody>
        </table>
      </div>
    )
  },
  'Troubleshooting': {
    icon: Shield,
    title: 'Troubleshooting',
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-white mb-1">Jobs Stuck in "Queued"?</h4>
          <p className="text-sm text-white/80">Ensure the worker process is running (`npm run worker`). Check Redis logs for connection timeouts.</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-1">Redis Connection Issues?</h4>
          <p className="text-sm text-white/80">Verify `REDIS_PASSWORD` matches your instance and ensure the host is reachable from your environment.</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-1">Docker "Permission Denied"?</h4>
          <p className="text-sm text-white/80">Ensure your user has access to the Docker socket (`/var/run/docker.sock`).</p>
        </div>
      </div>
    )
  },
  'Limits & Tracking': {
    icon: Cpu,
    title: 'Limits & Tracking',
    content: (
      <>
        <p>To ensure platform stability, Bharcel tracks the following metrics:</p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-white/80 text-sm">
          <li><strong className="text-white">Deployment Count:</strong> Daily limits based on the user's plan (Free/Pro).</li>
          <li><strong className="text-white">Project Limits:</strong> Maximum number of projects per account.</li>
          <li><strong className="text-white">Build Duration:</strong> Jobs are timed to prevent zombie processes.</li>
          <li><strong className="text-white">Resource Usage:</strong> CPU and Memory isolation per build container.</li>
        </ul>
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
      <div className="max-w-7xl mx-auto flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 h-screen sticky top-0 p-8 hidden lg:block">
          <div className="flex items-center gap-2 mb-12 cursor-pointer" onClick={() => nav('/')}>
            <Zap className="w-6 h-6 fill-white" />
            <span className="text-xl font-bold">Bharcel</span>
          </div>
          
          <nav className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-4 px-4">Introduction</div>
            {['Getting Started', 'Tech Stack', 'Architecture', 'Security'].map(item => (
              <button 
                key={item} 
                onClick={() => setActiveSection(item)}
                className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-all ${activeSection === item ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              >
                {item}
              </button>
            ))}
            
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-4 mt-8 px-4">Deployment</div>
            {['Setup & Execution', 'GitHub Integration', 'Build Pipeline', 'Content Serving'].map(item => (
              <button 
                key={item} 
                onClick={() => setActiveSection(item)}
                className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-all ${activeSection === item ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              >
                {item}
              </button>
            ))}

            <div className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-4 mt-8 px-4">Resources</div>
            {['Commands', 'Troubleshooting', 'Limits & Tracking'].map(item => (
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
        <main className="flex-1 p-8 lg:p-16 max-w-4xl flex flex-col min-h-screen relative">
          <div className="flex-1">
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
          </div>

          <footer className="mt-24 pt-8 border-t border-white/5 flex items-center justify-between text-white/20 text-xs">
            <div>© 2026 Bharcel Inc.</div>
          </footer>
        </main>
      </div>
    </div>
  );
}
