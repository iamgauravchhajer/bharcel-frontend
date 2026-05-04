import { useSelector, useDispatch } from 'react-redux';
import { login, signup, logout as logoutAction, fetchMe, clearError } from '../redux/slices/authSlice';
import { useCallback } from 'react';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = useCallback((credentials) => {
    return dispatch(login(credentials)).unwrap();
  }, [dispatch]);

  const handleSignup = useCallback((userData) => {
    return dispatch(signup(userData)).unwrap();
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const handleFetchMe = useCallback(() => {
    return dispatch(fetchMe()).unwrap();
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    fetchMe: handleFetchMe,
    clearError: handleClearError,
  };
};

export default useAuth;
