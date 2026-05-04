import axios from "axios";
import { getToken } from "./auth";

export const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "") + "/api";

export const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
