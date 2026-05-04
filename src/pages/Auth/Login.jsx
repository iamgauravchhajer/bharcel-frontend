import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import Button from '../../ui/components/Button';
import Card from '../../ui/components/Card';
import { FaGithub } from "react-icons/fa";
import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-orange-200">
            <Rocket className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome Back</h1>
          <p className="mt-2 text-slate-500">Sign in to manage your deployments</p>
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

export default Login;
