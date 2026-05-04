import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import Button from '../../ui/components/Button';
import Card from '../../ui/components/Card';
import { Rocket, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { FaGithub } from "react-icons/fa";

const Signup = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-orange-200">
            <Rocket className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create your account</h1>
          <p className="mt-2 text-slate-500">Start shipping your apps in seconds</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
           <div className="flex items-start gap-3">
             <div className="mt-1 h-5 w-5 shrink-0 text-primary"><CheckCircle2 className="h-5 w-5" /></div>
             <p className="text-sm text-slate-600 font-medium">Free forever plan for individuals</p>
           </div>
           <div className="flex items-start gap-3">
             <div className="mt-1 h-5 w-5 shrink-0 text-primary"><CheckCircle2 className="h-5 w-5" /></div>
             <p className="text-sm text-slate-600 font-medium">Unlimited public repositories</p>
           </div>
        </div>

        <Card className="p-8">
          <Button variant="secondary" className="w-full" onClick={() => window.location.href = authService.getGithubAuthUrl()}>
            <FaGithub className="mr-2 h-5 w-5" />
            Continue with Github
          </Button>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
