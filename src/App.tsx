import { useState } from "react";
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Zap, 
  BarChart3, 
  Settings,
  Search,
  Plus,
  Bell
} from "lucide-react";
import { ViewType, Project, Task, Sprint } from "./types";
import DashboardView from "./pages/Dashboard";
import ProjectsView from "./pages/Projects";
import TasksView from "./pages/Tasks";
import SprintsView from "./pages/Sprints";
import ReportsView from "./pages/Reports";
import SettingsView from "./pages/Settings";
import ProjectDetailModal from "./components/modals/ProjectDetailModal";
import TaskDetailModal from "./components/modals/TaskDetailModal";
import SprintDetailModal from "./components/modals/SprintDetailModal";
import ProjectFormModal from "./components/modals/ProjectFormModal";
import TaskFormModal from "./components/modals/TaskFormModal";
import SprintFormModal from "./components/modals/SprintFormModal";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(null);
  
  // Estados para modais de formulário
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showSprintForm, setShowSprintForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingSprint, setEditingSprint] = useState<Sprint | null>(null);

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

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Tasklean</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "projects", label: "Projetos", icon: FolderKanban },
              { id: "tasks", label: "Tarefas", icon: CheckSquare },
              { id: "sprints", label: "Sprints", icon: Zap },
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
          <div className="flex-1">
            <div className="relative">
              <Search className="w-auto h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar tarefas, projetos..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
          {currentView === "dashboard" && <DashboardView />}
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
    </div>
  );
}
