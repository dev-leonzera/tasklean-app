import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Task } from '../types';

interface TaskFilters {
  projectId?: number;
  assigneeId?: number;
  status?: string;
  priority?: string;
}

export const useTasks = (filters?: TaskFilters) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await apiService.getTasks(filters);
      setTasks(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar tarefas');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters?.projectId, filters?.assigneeId, filters?.status, filters?.priority]);

  return { tasks, isLoading, error, refetch: fetchTasks };
};

