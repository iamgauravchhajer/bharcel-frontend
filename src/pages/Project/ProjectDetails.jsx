import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link ,} from 'react-router-dom';
import { Rocket } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import deploymentService from '../../services/deploymentService';
import Button from '../../ui/components/Button';
import Card from '../../ui/components/Card';
import Badge from '../../ui/components/Badge';
import { 
  Terminal, 
  RefreshCcw, 
  ExternalLink, 
  GitBranch, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  History, 
  Cpu, 
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { socket } from '../../lib/socket';
import { API_BASE } from '../../lib/api';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('loading');
  const [activeTab, setActiveTab] = useState('logs');
  const logEndRef = useRef(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await deploymentService.getStatus(projectId);
        setProject(data.deployment || data);
        setStatus(data.status || (data.deployment?.status));
        
        const logData = await deploymentService.getLogs(projectId);
        setLogs(logData.lines || []);
      } catch (err) {
        console.error("Failed to fetch project details", err);
      }
    };

    fetchDetails();

    // Use Socket for real-time updates instead of polling
    socket.emit("subscribe", { projectId });
    const event = `log-${projectId}`;
    const statusEvent = `status-${projectId}`;
    
    const logHandler = (msg) => setLogs((prev) => [...prev, msg]);
    const statusHandler = (data) => setStatus(data.status);

    socket.on(event, logHandler);
    socket.on(statusEvent, statusHandler);

    return () => {
      socket.emit("unsubscribe", { projectId });
      socket.off(event, logHandler);
      socket.off(statusEvent, statusHandler);
    };
  }, [projectId]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!project) return (
    <div className="flex h-screen w-full items-center justify-center">
       <RefreshCcw className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-primary">
              <Rocket className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{project.projectName || project.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm font-medium text-slate-500">{project.projectId}</span>
                <Badge variant={status === 'success' || status === 'live' || status === 'ready' ? 'success' : status === 'failed' ? 'error' : 'info'}>
                  {status}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button 
               variant="secondary" 
               disabled={status !== 'success' && status !== 'live' && status !== 'ready'}
               onClick={() => window.open(project.liveUrl || `${API_BASE.replace('/api', '')}/deploy/${project.projectId}/`, '_blank')}
             >
               <ExternalLink className="mr-2 h-4 w-4" />
               Visit Site
             </Button>
             <Button onClick={() => deploymentService.retryDeployment(projectId)}>
               <RefreshCcw className="mr-2 h-4 w-4" />
               Redeploy
             </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex border-b border-slate-200">
             <button 
               onClick={() => setActiveTab('logs')}
               className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'logs' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
             >
               Deployment Logs
             </button>
             <button 
               onClick={() => setActiveTab('analysis')}
               className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'analysis' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
             >
               AI Analysis
             </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'logs' ? (
              <motion.div
                key="logs"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card className="bg-slate-900 text-slate-300 font-mono text-sm overflow-hidden">
                   <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                      <div className="flex items-center gap-2">
                         <Terminal className="h-4 w-4 text-emerald-400" />
                         <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Output</span>
                      </div>
                      <Badge className="bg-slate-700 text-slate-300">Live</Badge>
                   </div>
                   <div className="p-4 h-[500px] overflow-y-auto custom-scrollbar">
                      {logs.length === 0 ? (
                        <p className="text-slate-500 italic">Waiting for logs...</p>
                      ) : (
                        logs.map((log, i) => (
                          <div key={i} className="mb-1">
                            <span className="text-slate-500 mr-3 select-none">[{new Date().toLocaleTimeString()}]</span>
                            <span className={(String(log?.message || log)).toLowerCase().includes('error') || (String(log?.message || log)).toLowerCase().includes('failed') ? 'text-red-400' : 'text-slate-300'}>
                              {log}
                            </span>
                          </div>
                        ))
                      )}
                      <div ref={logEndRef} />
                   </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card className="p-8 border-primary/20 bg-orange-50/20">
                   {project.aiAnalysis ? (
                     <div className="space-y-6">
                        <div className="flex items-start gap-4">
                           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shrink-0">
                              <ShieldCheck className="h-6 w-6" />
                           </div>
                           <div>
                              <h3 className="text-lg font-bold text-slate-900">AI Failure Analysis</h3>
                              <p className="text-slate-600 mt-2 leading-relaxed whitespace-pre-wrap">{project.aiAnalysis}</p>
                           </div>
                        </div>
                        
                        {project.fixSuggestion && (
                          <div className="rounded-xl bg-white p-6 border border-primary/10 shadow-sm">
                             <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                Suggested Fix
                             </h4>
                             <code className="block bg-slate-50 p-4 rounded-lg text-primary font-mono text-sm">
                                {project.fixSuggestion}
                             </code>
                          </div>
                        )}
                     </div>
                   ) : (
                     <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                           <RefreshCcw className="h-8 w-8" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">No analysis available</h3>
                        <p className="text-slate-500 max-w-sm mx-auto mt-2">AI analysis is automatically generated when a build fails.</p>
                     </div>
                   )}
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
           <Card className="p-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Deployment Info</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between py-2 border-b border-slate-50">
                    <span className="text-sm text-slate-500 flex items-center gap-2">
                       <GitBranch className="h-4 w-4" />
                       Branch
                    </span>
                    <span className="text-sm font-semibold text-slate-900">{project.branch || 'main'}</span>
                 </div>
                 <div className="flex items-center justify-between py-2 border-b border-slate-50">
                    <span className="text-sm text-slate-500 flex items-center gap-2">
                       <Clock className="h-4 w-4" />
                       Created
                    </span>
                    <span className="text-sm font-medium text-slate-900">{new Date(project.createdAt).toLocaleDateString()}</span>
                 </div>
                 <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-slate-500 flex items-center gap-2">
                       <Cpu className="h-4 w-4" />
                       Runtime
                    </span>
                    <Badge>Node.js 18.x</Badge>
                 </div>
              </div>
           </Card>

           <Card className="p-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Git Repository</h3>
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                 <p className="text-xs font-mono text-slate-500 break-all">{project.repoUrl}</p>
                 <a 
                   href={project.repoUrl} 
                   target="_blank" 
                   rel="noreferrer"
                   className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:underline"
                 >
                    View on GitHub
                    <ExternalLink className="h-4 w-4" />
                 </a>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
