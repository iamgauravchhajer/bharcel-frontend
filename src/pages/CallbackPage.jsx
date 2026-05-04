import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setToken } from "../lib/auth";

export default function CallbackPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    
    console.log("[Auth Callback] Received token:", token ? "YES (hidden)" : "NO");

    if (token) {
      setToken(token);
      console.log("[Auth Callback] Token saved to storage, navigating to dashboard...");
      
      // Increased delay to ensure localStorage is ready
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 500);
      return () => clearTimeout(timer);
    } else {
      console.error("[Auth Callback] No token found in URL parameters");
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-[#0C0C0C] flex flex-col items-center justify-center text-white font-body">
      <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-6"></div>
      <h1 className="text-xl font-heading italic text-white/80">Finalizing authentication...</h1>
      <p className="text-sm font-light text-white/40 mt-2">Almost there, preparing your dashboard.</p>
    </div>
  );
}
