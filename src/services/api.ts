import { API_BASE_URL, getAuthHeaders } from '../config/api';
import { Project, Task, Sprint, Commitment, CreateProjectDto, CreateTaskDto, CreateSprintDto, CreateCommitmentDto } from '../types';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...getAuthHeaders(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      }

      if (response.status === 204) {
        return {} as T;
      }

      return response.json();
    } catch (error: any) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Não foi possível conectar ao servidor. Verifique se a API está rodando em http://localhost:4100');
      }
      throw error;
    }
  }

  // Auth
  async login(email: string, password: string) {
    return this.request<{ user: { id: number; name: string; email: string }; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name: string, email: string, password: string) {
    return this.request<{ user: { id: number; name: string; email: string }; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return this.request<Project[]>('/projects');
  }

  async getProject(id: number): Promise<Project> {
    return this.request<Project>(`/projects/${id}`);
  }

  async createProject(data: CreateProjectDto): Promise<Project> {
    return this.request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: number, data: Partial<CreateProjectDto>): Promise<Project> {
    return this.request<Project>(`/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: number): Promise<void> {
    return this.request<void>(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Tasks
  async getTasks(filters?: { projectId?: number; assigneeId?: number; status?: string; priority?: string }): Promise<Task[]> {
    const params = new URLSearchParams();
    if (filters?.projectId) params.append('projectId', filters.projectId.toString());
    if (filters?.assigneeId) params.append('assigneeId', filters.assigneeId.toString());
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    
    const query = params.toString();
    return this.request<Task[]>(`/tasks${query ? `?${query}` : ''}`);
  }

  async getTask(id: number): Promise<Task> {
    return this.request<Task>(`/tasks/${id}`);
  }

  async createTask(data: CreateTaskDto): Promise<Task> {
    return this.request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTask(id: number, data: Partial<CreateTaskDto>): Promise<Task> {
    return this.request<Task>(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteTask(id: number): Promise<void> {
    return this.request<void>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // Sprints
  async getSprints(filters?: { projectId?: number; status?: string }): Promise<Sprint[]> {
    const params = new URLSearchParams();
    if (filters?.projectId) params.append('projectId', filters.projectId.toString());
    if (filters?.status) params.append('status', filters.status);
    
    const query = params.toString();
    return this.request<Sprint[]>(`/sprints${query ? `?${query}` : ''}`);
  }

  async getSprint(id: number): Promise<Sprint> {
    return this.request<Sprint>(`/sprints/${id}`);
  }

  async createSprint(data: CreateSprintDto): Promise<Sprint> {
    return this.request<Sprint>('/sprints', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSprint(id: number, data: Partial<CreateSprintDto>): Promise<Sprint> {
    return this.request<Sprint>(`/sprints/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteSprint(id: number): Promise<void> {
    return this.request<void>(`/sprints/${id}`, {
      method: 'DELETE',
    });
  }

  // Commitments
  async getCommitments(filters?: { projectId?: number; status?: string; priority?: string; date?: string }): Promise<Commitment[]> {
    const params = new URLSearchParams();
    if (filters?.projectId) params.append('projectId', filters.projectId.toString());
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.date) params.append('date', filters.date);
    
    const query = params.toString();
    return this.request<Commitment[]>(`/commitments${query ? `?${query}` : ''}`);
  }

  async getCommitment(id: number): Promise<Commitment> {
    return this.request<Commitment>(`/commitments/${id}`);
  }

  async createCommitment(data: CreateCommitmentDto): Promise<Commitment> {
    return this.request<Commitment>('/commitments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCommitment(id: number, data: Partial<CreateCommitmentDto>): Promise<Commitment> {
    return this.request<Commitment>(`/commitments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteCommitment(id: number): Promise<void> {
    return this.request<void>(`/commitments/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();

