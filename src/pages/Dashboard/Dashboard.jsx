import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import Button from '../../ui/components/Button';
import Card from '../../ui/components/Card';
import Badge from '../../ui/components/Badge';
import { Plus,Rocket, Search, ExternalLink, GitBranch, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const StatusBadge = ({ status }) => {
  switch (status) {
    case 'ready':
    case 'success':
    case 'live':
      return <Badge variant="success">Live</Badge>;
    case 'building':
      return <Badge variant="info">Building</Badge>;
    case 'failed':
      return <Badge variant="error">Failed</Badge>;
    case 'queued':
      return <Badge variant="warning">Queued</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const Dashboard = () => {
  const { projects, loading, fetchProjects } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Projects</h1>
          <p className="text-slate-500">Manage and monitor your deployments</p>
        </div>
        <Link to="/new">
          <Button size="lg" className="shadow-lg shadow-orange-100">
            <Plus className="mr-2 h-5 w-5" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="relative mb-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          className="block w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm placeholder-slate-400 focus:border-primary focus:ring-4 focus:ring-orange-100 outline-none transition-all"
          placeholder="Search projects..."
        />
      </div>

      {loading && projects.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 mb-4 text-slate-400">
             <Rocket className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No projects found</h3>
          <p className="mt-1 text-slate-500">Get started by importing your first repository.</p>
          <Link to="/new" className="mt-6">
            <Button variant="secondary">Import Repository</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.projectId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/project/${project.projectId}`}>
                <Card className="group h-full p-6 hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-orange-100/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-orange-50 group-hover:text-primary transition-colors">
                      <Rocket className="h-6 w-6" />
                    </div>
                    <StatusBadge status={project.status || 'live'} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors truncate">
                    {project.projectName || project.name}
                  </h3>
                  
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <GitBranch className="h-4 w-4" />
                      <span className="truncate">{project.repoUrl?.split('/').pop()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Clock className="h-4 w-4" />
                      <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {project.projectId.slice(0, 8)}
                    </span>
                    <div className="flex gap-2">
                      {(project.status === 'success' || project.status === 'live') && (
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(project.liveUrl || `http://localhost:3000/deploy/${project.projectId}/`, '_blank');
                          }}
                          className="p-1 hover:text-primary transition-colors"
                          title="Visit Live Site"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
