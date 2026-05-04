import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, createProject, setCurrentProject, clearProjectError } from '../redux/slices/projectSlice';
import { useCallback } from 'react';

export const useProjects = () => {
  const dispatch = useDispatch();
  const { list, currentProject, loading, error } = useSelector((state) => state.projects);

  const handleFetchProjects = useCallback(() => {
    return dispatch(fetchProjects()).unwrap();
  }, [dispatch]);

  const handleCreateProject = useCallback((projectData) => {
    return dispatch(createProject(projectData)).unwrap();
  }, [dispatch]);

  const handleSetCurrentProject = useCallback((project) => {
    dispatch(setCurrentProject(project));
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearProjectError());
  }, [dispatch]);

  return {
    projects: list,
    currentProject,
    loading,
    error,
    fetchProjects: handleFetchProjects,
    createProject: handleCreateProject,
    setCurrentProject: handleSetCurrentProject,
    clearError: handleClearError,
  };
};

export default useProjects;
