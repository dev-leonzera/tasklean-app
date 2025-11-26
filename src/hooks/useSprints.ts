import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Sprint } from '../types';

interface SprintFilters {
  projectId?: number;
  status?: string;
}

export const useSprints = (filters?: SprintFilters) => {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSprints = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await apiService.getSprints(filters);
      setSprints(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar sprints');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSprints();
  }, [filters?.projectId, filters?.status]);

  return { sprints, isLoading, error, refetch: fetchSprints };
};

