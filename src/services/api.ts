import { API_BASE_URL, getAuthHeaders, getAuthToken } from '../config/api';
import { Project, Task, Sprint, Commitment, CreateProjectDto, CreateTaskDto, CreateSprintDto, CreateCommitmentDto, TaskComment, ProjectTag } from '../types';

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
  async getProjects(filters?: { tag?: string }): Promise<Project[]> {
    const params = new URLSearchParams();
    if (filters?.tag) params.append('tag', filters.tag);
    
    const query = params.toString();
    return this.request<Project[]>(`/projects${query ? `?${query}` : ''}`);
  }

  async getProjectTags(): Promise<ProjectTag[]> {
    return this.request<ProjectTag[]>('/projects/tags');
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

  // Task Comments
  async getTaskComments(taskId: number): Promise<TaskComment[]> {
    return this.request<TaskComment[]>(`/tasks/${taskId}/comments`);
  }

  async createTaskComment(taskId: number, data: { content: string; authorId: number }): Promise<TaskComment> {
    return this.request<TaskComment>(`/tasks/${taskId}/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTaskComment(taskId: number, commentId: number, data: { content: string }): Promise<TaskComment> {
    return this.request<TaskComment>(`/tasks/${taskId}/comments/${commentId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteTaskComment(taskId: number, commentId: number): Promise<void> {
    return this.request<void>(`/tasks/${taskId}/comments/${commentId}`, {
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

  // Users
  async getUsers(): Promise<{ id: number; name: string; email: string }[]> {
    return this.request<{ id: number; name: string; email: string }[]>('/users');
  }

  async getUserById(id: number): Promise<{ id: number; name: string; email: string; username?: string; language?: string; timezone?: string; dateFormat?: string; createdAt: string; updatedAt: string; pushNotificationSettings?: { urgentTasks?: boolean; deadlineReminders?: boolean; directMessages?: boolean; sprintUpdates?: boolean } }> {
    return this.request<{ id: number; name: string; email: string; username?: string; language?: string; timezone?: string; dateFormat?: string; createdAt: string; updatedAt: string; pushNotificationSettings?: { urgentTasks?: boolean; deadlineReminders?: boolean; directMessages?: boolean; sprintUpdates?: boolean } }>(`/users/${id}`);
  }

  async updateUser(id: number, data: { name?: string; email?: string; password?: string; username?: string; language?: string; timezone?: string; dateFormat?: string; pushNotificationSettings?: { urgentTasks?: boolean; deadlineReminders?: boolean; directMessages?: boolean; sprintUpdates?: boolean } }): Promise<{ id: number; name: string; email: string; username?: string; language?: string; timezone?: string; dateFormat?: string; createdAt: string; updatedAt: string; pushNotificationSettings?: { urgentTasks?: boolean; deadlineReminders?: boolean; directMessages?: boolean; sprintUpdates?: boolean } }> {
    return this.request<{ id: number; name: string; email: string; username?: string; language?: string; timezone?: string; dateFormat?: string; createdAt: string; updatedAt: string; pushNotificationSettings?: { urgentTasks?: boolean; deadlineReminders?: boolean; directMessages?: boolean; sprintUpdates?: boolean } }>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Reports
  async exportReport(daysFilter: number = 30): Promise<Blob> {
    const url = `${API_BASE_URL}/reports/export?days=${daysFilter}`;
    const token = getAuthToken();
    
    try {
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      }

      return response.blob();
    } catch (error: any) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Não foi possível conectar ao servidor. Verifique se a API está rodando em http://localhost:4100');
      }
      throw error;
    }
  }
}

export const apiService = new ApiService();

