import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Pages
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import Callback from '../pages/Auth/Callback';
import ProjectDetails from '../pages/Project/ProjectDetails';

// Layout
import Navbar from '../ui/layout/Navbar';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const AdminPage = React.lazy(() => import('../pages/AdminPage.jsx'));
const DocsPage = React.lazy(() => import('../pages/DocsPage.jsx'));
const LandingPage = React.lazy(() => import('../pages/LandingPage.jsx'));
const DashboardPage = React.lazy(() => import('../pages/DashboardPage.jsx'));

const AppRouter = () => {
  const { isAuthenticated, fetchMe } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('vercel_clone_token')) {
      fetchMe().catch(() => {});
    }
  }, [fetchMe]);

  // DashboardPage and AdminPage have their own built-in navbars
  const showNavbar = isAuthenticated && location.pathname.startsWith('/project/');

  return (
    <div className="min-h-screen bg-background">
      {showNavbar && <Navbar />}
      <main className={showNavbar ? "pt-16" : ""}>
        <React.Suspense fallback={<div className="flex h-screen items-center justify-center bg-black"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />} />
            <Route path="/auth/callback" element={<Callback />} />
            <Route path="/docs" element={<DocsPage />} />

            {/* Private Routes */}
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/project/:projectId" element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />

            {/* Redirects */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </React.Suspense>
      </main>
    </div>
  );
};

export default AppRouter;
