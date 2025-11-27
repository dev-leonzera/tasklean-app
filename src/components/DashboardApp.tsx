import { useState, useMemo, useRef, useEffect } from "react";
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Zap, 
  Calendar,
  BarChart3, 
  Settings,
  Search,
  Bell,
  LogOut
} from "lucide-react";
import logoTasklean from "../assets/logo_tasklean.png";
import { ViewType, Project, Task, Sprint, Commitment, CreateProjectDto, CreateTaskDto, CreateSprintDto, CreateCommitmentDto } from "../types";
import DashboardView from "../pages/Dashboard";
import ProjectsView from "../pages/Projects";
import TasksView from "../pages/Tasks";
import SprintsView from "../pages/Sprints";
import CommitmentsView from "../pages/Commitments";
import ReportsView from "../pages/Reports";
import SettingsView from "../pages/Settings";
import ProjectDetailModal from "./modals/ProjectDetailModal";
import TaskDetailModal from "./modals/TaskDetailModal";
import SprintDetailModal from "./modals/SprintDetailModal";
import CommitmentDetailModal from "./modals/CommitmentDetailModal";
import ProjectFormModal from "./modals/ProjectFormModal";
import TaskFormModal from "./modals/TaskFormModal";
import SprintFormModal from "./modals/SprintFormModal";
import CommitmentFormModal from "./modals/CommitmentFormModal";
import { useProjects, useProjectTags } from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";
import { useSprints } from "../hooks/useSprints";
import { useCommitments } from "../hooks/useCommitments";
import { useAuth } from "../contexts/AuthContext";
import { apiService } from "../services/api";
import { getInitials } from "../utils/avatar";

export default function DashboardApp() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(null);
  const [selectedCommitment, setSelectedCommitment] = useState<Commitment | null>(null);
  
  // Estados para modais de formulário
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showSprintForm, setShowSprintForm] = useState(false);
  const [showCommitmentForm, setShowCommitmentForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingSprint, setEditingSprint] = useState<Sprint | null>(null);
  const [editingCommitment, setEditingCommitment] = useState<Commitment | null>(null);

  // Estados para busca
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Hooks para buscar dados da API
  const { projects, isLoading: projectsLoading, refetch: refetchProjects } = useProjects();
  const { tags: availableTags, refetch: refetchTags } = useProjectTags();
  const { tasks, isLoading: tasksLoading, refetch: refetchTasks } = useTasks();
  const { sprints, isLoading: sprintsLoading, refetch: refetchSprints } = useSprints();
  const { commitments, isLoading: commitmentsLoading, refetch: refetchCommitments } = useCommitments();
  const { user, logout } = useAuth();

  // Funções para salvar projetos
  const handleSaveProject = async (projectData: Omit<Project, "id">) => {
    try {
      // Converter data se estiver no formato brasileiro ou ISO
      let dueDate: string | undefined;
      if (projectData.due) {
        try {
          // Se já estiver no formato ISO (YYYY-MM-DD), usar diretamente
          if (/^\d{4}-\d{2}-\d{2}$/.test(projectData.due)) {
            dueDate = new Date(projectData.due).toISOString();
          } else {
            // Tentar parsear como data brasileira
            const parts = projectData.due.split('/');
            if (parts.length === 3) {
              dueDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString();
            } else {
              dueDate = new Date(projectData.due).toISOString();
            }
          }
        } catch {
          // Se falhar, tentar parsear diretamente
          dueDate = new Date(projectData.due).toISOString();
        }
      }

      const data: CreateProjectDto = {
        name: projectData.name,
        description: projectData.desc,
        status: projectData.status,
        color: projectData.color,
        dueDate,
        ownerId: user?.id || 1, // Usar ID do usuário logado
        members: [], // Implementar seleção de membros depois
        tags: projectData.tags?.map(tag => ({ name: tag.name, color: tag.color })),
      };

      if (editingProject) {
        await apiService.updateProject(editingProject.id, data);
      } else {
        await apiService.createProject(data);
      }
      refetchProjects();
      refetchTags(); // Atualizar lista de tags disponíveis
      setShowProjectForm(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
      alert('Erro ao salvar projeto. Verifique os dados e tente novamente.');
    }
  };

  // Funções para salvar tarefas
  const handleSaveTask = async (taskData: Omit<Task, "id">) => {
    try {
      const project = projects.find(p => p.name === taskData.project);
      
      // Converter data se estiver no formato brasileiro ou ISO
      let dueDate: string | undefined;
      if (taskData.due) {
        try {
          if (/^\d{4}-\d{2}-\d{2}$/.test(taskData.due)) {
            dueDate = new Date(taskData.due).toISOString();
          } else {
            const parts = taskData.due.split('/');
            if (parts.length === 3) {
              dueDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString();
            } else {
              dueDate = new Date(taskData.due).toISOString();
            }
          }
        } catch {
          dueDate = new Date(taskData.due).toISOString();
        }
      }

      const data: CreateTaskDto = {
        name: taskData.name,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        dueDate,
        projectId: project?.id,
        comments: taskData.comments || 0,
        attachments: taskData.attachments || 0,
      };

      if (editingTask) {
        await apiService.updateTask(editingTask.id, data);
      } else {
        await apiService.createTask(data);
      }
      refetchTasks();
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      alert('Erro ao salvar tarefa. Verifique os dados e tente novamente.');
    }
  };

  // Funções para salvar sprints
  const handleSaveSprint = async (sprintData: Omit<Sprint, "id">) => {
    try {
      if (!sprintData.startDate || !sprintData.endDate) {
        alert('Por favor, preencha as datas de início e término.');
        return;
      }

      const project = projects[0]; // Por enquanto usar o primeiro projeto
      if (!project) {
        alert('É necessário ter pelo menos um projeto para criar um sprint.');
        return;
      }

      // Converter datas
      let startDate: string;
      let endDate: string;
      
      try {
        if (/^\d{4}-\d{2}-\d{2}$/.test(sprintData.startDate)) {
          startDate = new Date(sprintData.startDate).toISOString();
        } else {
          const parts = sprintData.startDate.split('/');
          if (parts.length === 3) {
            startDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString();
          } else {
            startDate = new Date(sprintData.startDate).toISOString();
          }
        }

        if (/^\d{4}-\d{2}-\d{2}$/.test(sprintData.endDate)) {
          endDate = new Date(sprintData.endDate).toISOString();
        } else {
          const parts = sprintData.endDate.split('/');
          if (parts.length === 3) {
            endDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString();
          } else {
            endDate = new Date(sprintData.endDate).toISOString();
          }
        }
      } catch (error) {
        alert('Erro ao processar as datas. Verifique o formato.');
        return;
      }

      const data: CreateSprintDto = {
        name: sprintData.name,
        status: sprintData.status,
        startDate,
        endDate,
        projectId: project.id,
        members: [], // Implementar seleção de membros depois
      };

      if (editingSprint) {
        await apiService.updateSprint(editingSprint.id, data);
      } else {
        await apiService.createSprint(data);
      }
      refetchSprints();
      setShowSprintForm(false);
      setEditingSprint(null);
    } catch (error) {
      console.error('Erro ao salvar sprint:', error);
      alert('Erro ao salvar sprint. Verifique os dados e tente novamente.');
    }
  };

  // Funções para salvar compromissos
  const handleSaveCommitment = async (commitmentData: Omit<Commitment, "id">) => {
    try {
      if (!commitmentData.date || !commitmentData.startTime || !commitmentData.endTime) {
        alert('Por favor, preencha a data e os horários.');
        return;
      }

      const project = commitmentData.project ? projects.find(p => p.name === commitmentData.project) : undefined;
      const data: CreateCommitmentDto = {
        title: commitmentData.title,
        description: commitmentData.description,
        date: commitmentData.date,
        startTime: commitmentData.startTime,
        endTime: commitmentData.endTime,
        location: commitmentData.location,
        status: commitmentData.status,
        priority: commitmentData.priority,
        reminder: commitmentData.reminder,
        projectId: project?.id,
        participants: [], // Implementar seleção de participantes depois
      };

      if (editingCommitment) {
        await apiService.updateCommitment(editingCommitment.id, data);
      } else {
        await apiService.createCommitment(data);
      }
      refetchCommitments();
      setShowCommitmentForm(false);
      setEditingCommitment(null);
    } catch (error) {
      console.error('Erro ao salvar compromisso:', error);
      alert('Erro ao salvar compromisso. Verifique os dados e tente novamente.');
    }
  };

  // Funções para abrir modais de criação
  const handleNewProject = () => {
    setEditingProject(null);
    setShowProjectForm(true);
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleNewSprint = () => {
    setEditingSprint(null);
    setShowSprintForm(true);
  };

  const handleNewCommitment = () => {
    setEditingCommitment(null);
    setShowCommitmentForm(true);
  };

  // Funções para abrir modais de edição
  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(true);
    setSelectedProject(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
    setSelectedTask(null);
  };

  const handleEditSprint = (sprint: Sprint) => {
    setEditingSprint(sprint);
    setShowSprintForm(true);
    setSelectedSprint(null);
  };

  const handleEditCommitment = (commitment: Commitment) => {
    setEditingCommitment(commitment);
    setShowCommitmentForm(true);
    setSelectedCommitment(null);
  };

  // Função de busca
  interface SearchResult {
    type: "task" | "project" | "commitment";
    id: number;
    title: string;
    subtitle?: string;
    data: Task | Project | Commitment;
  }

  const searchResults = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) {
      return [];
    }

    const term = searchTerm.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Buscar tarefas
    tasks.forEach((task) => {
      if (
        task.name.toLowerCase().includes(term) ||
        task.project.toLowerCase().includes(term) ||
        task.description?.toLowerCase().includes(term)
      ) {
        results.push({
          type: "task",
          id: task.id,
          title: task.name,
          subtitle: task.project,
          data: task,
        });
      }
    });

    // Buscar projetos
    projects.forEach((project) => {
      if (
        project.name.toLowerCase().includes(term) ||
        project.desc.toLowerCase().includes(term)
      ) {
        results.push({
          type: "project",
          id: project.id,
          title: project.name,
          subtitle: project.desc,
          data: project,
        });
      }
    });

    // Buscar compromissos
    commitments.forEach((commitment) => {
      if (
        commitment.title.toLowerCase().includes(term) ||
        commitment.description?.toLowerCase().includes(term) ||
        commitment.project?.toLowerCase().includes(term)
      ) {
        results.push({
          type: "commitment",
          id: commitment.id,
          title: commitment.title,
          subtitle: commitment.project || commitment.description || "",
          data: commitment,
        });
      }
    });

    return results.slice(0, 10); // Limitar a 10 resultados
  }, [searchTerm, tasks, projects, commitments]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isSearchOpen]);

  // Handler para selecionar um resultado da busca
  const handleSelectSearchResult = (result: SearchResult) => {
    setIsSearchOpen(false);
    setSearchTerm("");
    
    if (result.type === "task") {
      setSelectedTask(result.data as Task);
    } else if (result.type === "project") {
      setSelectedProject(result.data as Project);
    } else if (result.type === "commitment") {
      setSelectedCommitment(result.data as Commitment);
    }
  };

  // Handler para mudança no input de busca
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Atualizar estado do dropdown quando os resultados ou termo de busca mudarem
  useEffect(() => {
    if (searchTerm.length >= 2) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  }, [searchTerm, searchResults]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <img 
            src={logoTasklean} 
            alt="Tasklean" 
            className="h-auto w-auto"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "projects", label: "Projetos", icon: FolderKanban },
              { id: "tasks", label: "Tarefas", icon: CheckSquare },
              { id: "sprints", label: "Sprints", icon: Zap },
              { id: "commitments", label: "Compromissos", icon: Calendar },
              { id: "reports", label: "Relatórios", icon: BarChart3 },
              { id: "settings", label: "Configurações", icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as ViewType)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Upgrade Card */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4">
            <p className="text-sm font-semibold text-white mb-1">Upgrade Pro</p>
            <p className="text-xs text-blue-100 mb-3">Desbloqueie recursos avançados</p>
            <button className="w-full bg-white text-blue-600 px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-50">
              Saiba mais
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          {/* Search */}
          <div className="flex-1" ref={searchRef}>
            <div className="relative">
              <Search className="w-auto h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar tarefas, projetos, compromissos..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => {
                  if (searchTerm.length >= 2 && searchResults.length > 0) {
                    setIsSearchOpen(true);
                  }
                }}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              {/* Dropdown de resultados */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                  {searchResults.map((result, index) => (
                    <button
                      key={`${result.type}-${result.id}-${index}`}
                      onClick={() => handleSelectSearchResult(result)}
                      className="w-full px-4 py-3 hover:bg-gray-50 flex items-start gap-3 border-b border-gray-100 last:border-b-0 transition-colors text-left"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {result.type === "task" && (
                          <CheckSquare className="w-5 h-5 text-blue-600" />
                        )}
                        {result.type === "project" && (
                          <FolderKanban className="w-5 h-5 text-orange-600" />
                        )}
                        {result.type === "commitment" && (
                          <Calendar className="w-5 h-5 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {result.title}
                        </p>
                        {result.subtitle && (
                          <p className="text-xs text-gray-500 mt-0.5 truncate">
                            {result.subtitle}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          {result.type === "task" && "Tarefa"}
                          {result.type === "project" && "Projeto"}
                          {result.type === "commitment" && "Compromisso"}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              {/* Mensagem quando não há resultados */}
              {isSearchOpen && searchTerm.length >= 2 && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
                  <p className="text-sm text-gray-500 text-center">
                    Nenhum resultado encontrado para "{searchTerm}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 ml-4">

            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900" style={{ marginBottom: '0px' }}>{user?.name || 'Usuário'}</p>
                <p className="text-xs text-gray-500" style={{ marginTop: '0px' }}>{user?.email || ''}</p>
              </div>
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {getInitials(user?.name)}
              </div>
              <button
                onClick={logout}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {(projectsLoading || tasksLoading || sprintsLoading || commitmentsLoading) ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {currentView === "dashboard" && (
                <DashboardView 
                  commitments={commitments}
                  tasks={tasks}
                  projects={projects}
                  sprints={sprints}
                  onSelectCommitment={setSelectedCommitment}
                  onSelectTask={setSelectedTask}
                />
              )}
              {currentView === "projects" && (
                <ProjectsView 
                  projects={projects}
                  availableTags={availableTags}
                  onSelectProject={setSelectedProject}
                  onNewProject={handleNewProject}
                  onEditProject={handleEditProject}
                />
              )}
              {currentView === "tasks" && (
                <TasksView 
                  tasks={tasks}
                  projects={projects.map(p => p.name)}
                  onSelectTask={setSelectedTask}
                  onNewTask={handleNewTask}
                  onEditTask={handleEditTask}
                />
              )}
          {currentView === "sprints" && (
            <SprintsView 
              sprints={sprints}
              onSelectSprint={setSelectedSprint}
              onNewSprint={handleNewSprint}
              onEditSprint={handleEditSprint}
            />
          )}
          {currentView === "commitments" && (
            <CommitmentsView 
              commitments={commitments}
              projects={projects.map(p => p.name)}
              onSelectCommitment={setSelectedCommitment}
              onNewCommitment={handleNewCommitment}
              onEditCommitment={handleEditCommitment}
            />
          )}
              {currentView === "reports" && <ReportsView />}
              {currentView === "settings" && <SettingsView />}
            </>
          )}
        </main>
      </div>

      {/* Modals de Detalhes */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)}
          onEdit={() => handleEditProject(selectedProject)}
        />
      )}
      {selectedTask && (
        <TaskDetailModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)}
          onEdit={() => handleEditTask(selectedTask)}
        />
      )}
      {selectedSprint && (
        <SprintDetailModal 
          sprint={selectedSprint} 
          onClose={() => setSelectedSprint(null)}
          onEdit={() => handleEditSprint(selectedSprint)}
        />
      )}
      {selectedCommitment && (
        <CommitmentDetailModal 
          commitment={selectedCommitment} 
          onClose={() => setSelectedCommitment(null)}
          onEdit={() => handleEditCommitment(selectedCommitment)}
        />
      )}

      {/* Modals de Formulário */}
      {showProjectForm && (
        <ProjectFormModal
          project={editingProject}
          onClose={() => {
            setShowProjectForm(false);
            setEditingProject(null);
          }}
          onSave={handleSaveProject}
        />
      )}
      {showTaskForm && (
        <TaskFormModal
          task={editingTask}
          projects={projects.map(p => p.name)}
          onClose={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
        />
      )}
      {showSprintForm && (
        <SprintFormModal
          sprint={editingSprint}
          onClose={() => {
            setShowSprintForm(false);
            setEditingSprint(null);
          }}
          onSave={handleSaveSprint}
        />
      )}
      {showCommitmentForm && (
        <CommitmentFormModal
          commitment={editingCommitment}
          projects={projects.map(p => p.name)}
          onClose={() => {
            setShowCommitmentForm(false);
            setEditingCommitment(null);
          }}
          onSave={handleSaveCommitment}
        />
      )}
    </div>
  );
}

