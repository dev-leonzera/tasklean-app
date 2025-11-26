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
  Bell
} from "lucide-react";
import logoTasklean from "../assets/logo_tasklean.png";
import { ViewType, Project, Task, Sprint, Commitment } from "../types";
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

  // Estados para dados
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: "Backend API v2", desc: "Refatoração completa da API REST", progress: 75, tasks: 48, completed: 36, status: "progress", members: ["RC", "AS", "JL"], due: "15 Dez", color: "#3B82F6" },
    { id: 2, name: "Redesign Frontend", desc: "Nova interface do usuário", progress: 45, tasks: 32, completed: 14, status: "progress", members: ["MF", "AS"], due: "22 Dez", color: "#F59E0B" },
    { id: 3, name: "E-commerce", desc: "Sistema de vendas online", progress: 90, tasks: 64, completed: 58, status: "finishing", members: ["RC", "JL", "MF", "AS"], due: "10 Dez", color: "#10B981" },
    { id: 4, name: "App Mobile", desc: "Aplicativo iOS e Android", progress: 30, tasks: 56, completed: 17, status: "progress", members: ["MF", "RC"], due: "30 Dez", color: "#8B5CF6" },
    { id: 5, name: "Dashboard Analytics", desc: "Painel de métricas", progress: 60, tasks: 28, completed: 17, status: "progress", members: ["AS", "JL"], due: "18 Dez", color: "#EC4899" },
    { id: 6, name: "Notificações", desc: "Sistema em tempo real", progress: 15, tasks: 20, completed: 3, status: "starting", members: ["RC"], due: "28 Dez", color: "#64748B" },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Implementar autenticação OAuth", project: "Backend API", assignee: "RC", status: "todo", priority: "high", due: "24 Nov", comments: 3, attachments: 2, description: "Implementar sistema de autenticação OAuth 2.0 com suporte para Google e GitHub" },
    { id: 2, name: "Redesign da página de login", project: "Frontend", assignee: "MF", status: "todo", priority: "medium", due: "25 Nov", comments: 1, attachments: 0 },
    { id: 3, name: "Corrigir bug no checkout", project: "E-commerce", assignee: "JL", status: "progress", priority: "critical", due: "24 Nov", comments: 5, attachments: 1 },
    { id: 4, name: "Documentação da API v2", project: "Backend API", assignee: "AS", status: "progress", priority: "low", due: "26 Nov", comments: 0, attachments: 3 },
    { id: 5, name: "Testes unitários módulo pagamento", project: "E-commerce", assignee: "RC", status: "progress", priority: "high", due: "25 Nov", comments: 2, attachments: 0 },
    { id: 6, name: "Otimizar queries do banco", project: "Backend API", assignee: "JL", status: "review", priority: "medium", due: "27 Nov", comments: 4, attachments: 1 },
    { id: 7, name: "Implementar dark mode", project: "Frontend", assignee: "MF", status: "review", priority: "low", due: "28 Nov", comments: 2, attachments: 0 },
    { id: 8, name: "Setup CI/CD pipeline", project: "DevOps", assignee: "AS", status: "done", priority: "high", due: "23 Nov", comments: 6, attachments: 2 },
    { id: 9, name: "Configurar analytics", project: "Marketing", assignee: "RC", status: "done", priority: "medium", due: "22 Nov", comments: 1, attachments: 0 },
  ]);

  const [sprints, setSprints] = useState<Sprint[]>([
    { id: 1, name: "Sprint 12", status: "active", startDate: "20 Nov", endDate: "03 Dez", progress: 65, tasks: { total: 28, completed: 18 }, team: ["RC", "AS", "JL", "MF"] },
    { id: 2, name: "Sprint 11", status: "completed", startDate: "06 Nov", endDate: "19 Nov", progress: 100, tasks: { total: 32, completed: 32 }, team: ["RC", "AS", "JL", "MF"] },
    { id: 3, name: "Sprint 10", status: "completed", startDate: "23 Out", endDate: "05 Nov", progress: 100, tasks: { total: 29, completed: 29 }, team: ["RC", "AS", "JL"] },
  ]);

  const [commitments, setCommitments] = useState<Commitment[]>([
    { id: 1, title: "Reunião de Planejamento", description: "Reunião para planejar o próximo sprint", date: new Date().toISOString().split('T')[0], startTime: "09:00", endTime: "10:30", location: "Sala de Reuniões A", participants: ["RC", "AS", "JL"], project: "Backend API", status: "scheduled", priority: "high", reminder: "15min" },
    { id: 2, title: "Daily Standup", description: "Daily standup do time", date: new Date(Date.now() + 86400000).toISOString().split('T')[0], startTime: "10:00", endTime: "10:15", participants: ["RC", "AS", "JL", "MF"], status: "scheduled", priority: "medium" },
    { id: 3, title: "Review de Código", description: "Review do PR #123", date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0], startTime: "14:00", endTime: "15:00", location: "Remoto", participants: ["RC", "JL"], project: "Frontend", status: "scheduled", priority: "low" },
  ]);

  // Funções para salvar projetos
  const handleSaveProject = (projectData: Omit<Project, "id">) => {
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...projectData, id: editingProject.id } : p));
      setEditingProject(null);
    } else {
      const newId = Math.max(...projects.map(p => p.id), 0) + 1;
      setProjects([...projects, { ...projectData, id: newId }]);
    }
    setShowProjectForm(false);
  };

  // Funções para salvar tarefas
  const handleSaveTask = (taskData: Omit<Task, "id">) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...taskData, id: editingTask.id } : t));
      setEditingTask(null);
    } else {
      const newId = Math.max(...tasks.map(t => t.id), 0) + 1;
      setTasks([...tasks, { ...taskData, id: newId }]);
    }
    setShowTaskForm(false);
  };

  // Funções para salvar sprints
  const handleSaveSprint = (sprintData: Omit<Sprint, "id">) => {
    if (editingSprint) {
      setSprints(sprints.map(s => s.id === editingSprint.id ? { ...sprintData, id: editingSprint.id } : s));
      setEditingSprint(null);
    } else {
      const newId = Math.max(...sprints.map(s => s.id), 0) + 1;
      setSprints([...sprints, { ...sprintData, id: newId }]);
    }
    setShowSprintForm(false);
  };

  // Funções para salvar compromissos
  const handleSaveCommitment = (commitmentData: Omit<Commitment, "id">) => {
    if (editingCommitment) {
      setCommitments(commitments.map(c => c.id === editingCommitment.id ? { ...commitmentData, id: editingCommitment.id } : c));
      setEditingCommitment(null);
    } else {
      const newId = Math.max(...commitments.map(c => c.id), 0) + 1;
      setCommitments([...commitments, { ...commitmentData, id: newId }]);
    }
    setShowCommitmentForm(false);
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
                <p className="text-sm font-medium text-gray-900" style={{ marginBottom: '0px' }}>Ana Silva</p>
                <p className="text-xs text-gray-500" style={{ marginTop: '0px' }}>Product Manager</p>
              </div>
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                AS
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {currentView === "dashboard" && (
            <DashboardView 
              commitments={commitments}
              onSelectCommitment={setSelectedCommitment}
            />
          )}
          {currentView === "projects" && (
            <ProjectsView 
              projects={projects}
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

