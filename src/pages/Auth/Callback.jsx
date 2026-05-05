import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchMe } from '../../redux/slices/authSlice';
import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // 1. Store token using lib/auth
      localStorage.setItem('vercel_clone_token', token);
      
      // 2. Fetch user profile to update Redux state
      dispatch(fetchMe())
        .unwrap()
        .then(() => {
          // 3. Redirect to dashboard on success
          navigate('/dashboard');
        })
        .catch(() => {
          // 4. Redirect to login on failure
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center"
      >
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-orange-200">
          <Rocket className="h-10 w-10 text-white animate-bounce" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Authenticating...</h2>
        <p className="mt-2 text-slate-500 text-sm">Please wait while we finalize your GitHub login</p>
        
        <div className="mt-8 flex gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse delay-75" />
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse delay-150" />
        </div>
      </motion.div>
    </div>
  );
};

export default Callback;
