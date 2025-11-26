import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Project } from '../types';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await apiService.getProjects();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar projetos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, isLoading, error, refetch: fetchProjects };
};

