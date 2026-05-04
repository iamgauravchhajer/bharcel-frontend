import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import Button from '../../ui/components/Button';
import Input from '../../ui/components/Input';
import Card from '../../ui/components/Card';
import { Rocket, Search, GitBranch, ArrowRight, Settings2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { FaGithub } from "react-icons/fa";

const CreateProject = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [projectName, setProjectName] = useState('');
  const { createProject, loading, error } = useProjects();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createProject({ repoUrl, projectName });
      navigate(`/project/${result.projectId}`);
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Import Repository</h1>
        <p className="mt-2 text-slate-500">Connect your code and deploy it in seconds</p>
      </div>

      <div className="space-y-8">
        <Card className="p-8 border-primary/20 bg-orange-50/30">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
               <FaGithub className="h-6 w-6" />
               <span className="font-semibold text-slate-900">GitHub Repositories</span>
            </div>
            <Button variant="secondary" size="sm">Connect GitHub</Button>
          </div>
          <p className="text-sm text-slate-600 mb-6">Import an existing repository from your GitHub account to get started.</p>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              disabled 
              placeholder="Search repositories..." 
              className="w-full rounded-xl border border-slate-200 bg-white/50 px-10 py-2.5 text-sm outline-none cursor-not-allowed"
            />
          </div>
          <p className="text-xs text-slate-400 italic">GitHub integration requires OAuth connection.</p>
        </Card>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-4 text-slate-500 font-medium tracking-widest">OR</span>
          </div>
        </div>

        <Card className="p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            Import via URL
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Repository URL"
              placeholder="https://github.com/username/repo"
              value={repoUrl}
              onChange={(e) => {
                setRepoUrl(e.target.value);
                if (!projectName) {
                   const name = e.target.value.split('/').pop()?.replace('.git', '');
                   setProjectName(name || '');
                }
              }}
              required
            />
            
            <Input
              label="Project Name"
              placeholder="my-awesome-project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
               <div className="flex items-center justify-between mb-4">
                 <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                   <Settings2 className="h-4 w-4" />
                   Build Settings
                 </span>
                 <span className="text-xs text-slate-400">Auto-detected</span>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                   <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Framework</p>
                   <p className="text-sm font-medium text-slate-700">React (Vite)</p>
                 </div>
                 <div className="space-y-1">
                   <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Build Command</p>
                   <p className="text-sm font-medium text-slate-700">npm run build</p>
                 </div>
               </div>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={loading}>
              Deploy Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateProject;
