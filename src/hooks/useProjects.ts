import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Project, ProjectTag } from '../types';

interface ProjectFilters {
  tag?: string;
}

export const useProjects = (filters?: ProjectFilters) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await apiService.getProjects(filters);
      setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar projetos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [filters?.tag]);

  return { projects, isLoading, error, refetch: fetchProjects };
};

export const useProjectTags = () => {
  const [tags, setTags] = useState<ProjectTag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTags = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await apiService.getProjectTags();
      setTags(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar tags');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return { tags, isLoading, error, refetch: fetchTags };
};

