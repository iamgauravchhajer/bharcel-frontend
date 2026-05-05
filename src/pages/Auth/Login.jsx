import React, { useEffect } from 'react';
import authService from '../../services/authService';

const Login = () => {
  useEffect(() => {
    // Direct redirect to GitHub OAuth
    window.location.href = authService.getGithubAuthUrl();
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
        <p className="text-white/60 text-sm font-bold uppercase tracking-widest animate-pulse">
          Redirecting to GitHub...
        </p>
      </div>
    </div>
  );
};

export default Login;
