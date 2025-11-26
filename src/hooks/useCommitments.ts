import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Commitment } from '../types';

interface CommitmentFilters {
  projectId?: number;
  status?: string;
  priority?: string;
  date?: string;
}

export const useCommitments = (filters?: CommitmentFilters) => {
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommitments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await apiService.getCommitments(filters);
      setCommitments(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar compromissos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommitments();
  }, [filters?.projectId, filters?.status, filters?.priority, filters?.date]);

  return { commitments, isLoading, error, refetch: fetchCommitments };
};

