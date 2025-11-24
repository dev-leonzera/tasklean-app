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
  Bell,
  Circle,
  CheckCircle2,
  TrendingUp,
  Clock,
  AlertCircle,
  MoreHorizontal,
  Filter,
  List,
  Grid3x3,
  Calendar,
  User,
  ChevronDown,
  Paperclip,
  MessageSquare,
  X
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

type ViewType = "dashboard" | "projects" | "tasks" | "sprints" | "reports" | "settings";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");

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
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar tarefas, projetos..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 ml-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              Criar
            </button>

            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Ana Silva</p>
                <p className="text-xs text-gray-500">Product Manager</p>
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
          {currentView === "projects" && <ProjectsView />}
          {currentView === "tasks" && <TasksView />}
          {currentView === "sprints" && <SprintsView />}
          {currentView === "reports" && <ReportsView />}
          {currentView === "settings" && <SettingsView />}
        </main>
      </div>
    </div>
  );
}

function DashboardView() {
  const chartData = [
    { day: "Seg", tasks: 12 },
    { day: "Ter", tasks: 19 },
    { day: "Qua", tasks: 15 },
    { day: "Qui", tasks: 22 },
    { day: "Sex", tasks: 18 },
    { day: "Sáb", tasks: 8 },
    { day: "Dom", tasks: 5 },
  ];

  const tasks = [
    { id: 1, name: "Implementar autenticação OAuth", project: "Backend API", assignee: "RC", status: "progress", priority: "high", due: "Hoje" },
    { id: 2, name: "Redesign da página de login", project: "Frontend", assignee: "MF", status: "review", priority: "medium", due: "Amanhã" },
    { id: 3, name: "Corrigir bug no checkout", project: "E-commerce", assignee: "JL", status: "progress", priority: "critical", due: "Hoje" },
    { id: 4, name: "Documentação da API v2", project: "Backend API", assignee: "AS", status: "todo", priority: "low", due: "15/12" },
    { id: 5, name: "Testes unitários módulo pagamento", project: "E-commerce", assignee: "RC", status: "progress", priority: "high", due: "Amanhã" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Visão geral da sua produtividade</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Circle className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-green-600">+8%</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">24</p>
          <p className="text-sm text-gray-600 mt-1">Tarefas em aberto</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600">+12%</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">89</p>
          <p className="text-sm text-gray-600 mt-1">Tarefas concluídas</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs text-gray-500">3 finalizando</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">12</p>
          <p className="text-sm text-gray-600 mt-1">Projetos ativos</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-green-600">4 dias</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">Sprint 12</p>
          <p className="text-sm text-gray-600 mt-1">Sprint atual</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Tasks List */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Tarefas Recentes</h2>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Ver todas</button>
          </div>
          
          <div className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <div key={task.id} className="px-5 py-4 hover:bg-gray-50 cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 group-hover:border-blue-500"></div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="font-medium text-gray-900 text-sm">{task.name}</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium text-white flex-shrink-0 ${
                        task.priority === "critical" ? "bg-red-500" :
                        task.priority === "high" ? "bg-orange-500" :
                        task.priority === "medium" ? "bg-blue-500" : "bg-gray-400"
                      }`}>
                        {task.priority === "critical" ? "Crítica" : 
                         task.priority === "high" ? "Alta" :
                         task.priority === "medium" ? "Média" : "Baixa"}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {task.project}
                      </span>
                      
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        task.status === "progress" ? "bg-orange-100 text-orange-700" :
                        task.status === "review" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                      }`}>
                        {task.status === "progress" ? "Em progresso" :
                         task.status === "review" ? "Em revisão" : "A fazer"}
                      </span>
                      
                      <div className="flex items-center gap-2 ml-auto">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {task.assignee}
                        </div>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.due}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Produtividade Semanal</h3>
          
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="tasks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-5 pt-5 border-t border-gray-200 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total esta semana</span>
              <span className="font-semibold text-gray-900">99 tarefas</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Média diária</span>
              <span className="font-semibold text-gray-900">14.1 tarefas</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-100 mt-3">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-700 font-medium">+15% vs semana passada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-5 flex items-center gap-4">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold">3 tarefas com prazo vencendo hoje</p>
          <p className="text-white/90 text-sm mt-0.5">Revise as tarefas críticas para manter o projeto no prazo</p>
        </div>
        <button className="px-4 py-2 bg-white text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-50 flex-shrink-0">
          Ver tarefas
        </button>
      </div>
    </div>
  );
}

function ProjectsView() {
  const projects = [
    { id: 1, name: "Backend API v2", desc: "Refatoração completa da API REST", progress: 75, tasks: 48, completed: 36, status: "progress", members: ["RC", "AS", "JL"], due: "15 Dez", color: "#3B82F6" },
    { id: 2, name: "Redesign Frontend", desc: "Nova interface do usuário", progress: 45, tasks: 32, completed: 14, status: "progress", members: ["MF", "AS"], due: "22 Dez", color: "#F59E0B" },
    { id: 3, name: "E-commerce", desc: "Sistema de vendas online", progress: 90, tasks: 64, completed: 58, status: "finishing", members: ["RC", "JL", "MF", "AS"], due: "10 Dez", color: "#10B981" },
    { id: 4, name: "App Mobile", desc: "Aplicativo iOS e Android", progress: 30, tasks: 56, completed: 17, status: "progress", members: ["MF", "RC"], due: "30 Dez", color: "#8B5CF6" },
    { id: 5, name: "Dashboard Analytics", desc: "Painel de métricas", progress: 60, tasks: 28, completed: 17, status: "progress", members: ["AS", "JL"], due: "18 Dez", color: "#EC4899" },
    { id: 6, name: "Notificações", desc: "Sistema em tempo real", progress: 15, tasks: 20, completed: 3, status: "starting", members: ["RC"], due: "28 Dez", color: "#64748B" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Projetos</h1>
          <p className="text-sm text-gray-600 mt-1">Gerencie todos os seus projetos</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filtrar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Novo Projeto
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-3 gap-5">
        {projects.map((project) => (
          <div key={project.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }}></div>
                <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{project.desc}</p>
              
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                project.status === "finishing" ? "bg-green-100 text-green-700" :
                project.status === "progress" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700"
              }`}>
                {project.status === "finishing" ? "Finalizando" :
                 project.status === "progress" ? "Em progresso" : "Iniciando"}
              </span>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progresso</span>
                  <span className="font-semibold text-gray-900">{project.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${project.progress}%`, backgroundColor: project.color }}></div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  {project.completed}/{project.tasks}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {project.due}
                </span>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex -space-x-2">
                  {project.members.map((member, i) => (
                    <div key={i} className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white">
                      {member}
                    </div>
                  ))}
                </div>
                <button className="text-xs text-blue-600 font-medium hover:text-blue-700">Ver detalhes →</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-600 mb-1">Total de Projetos</p>
          <p className="text-2xl font-semibold text-gray-900">12</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-600 mb-1">Em Progresso</p>
          <p className="text-2xl font-semibold text-gray-900">8</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-600 mb-1">Finalizando</p>
          <p className="text-2xl font-semibold text-gray-900">3</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-600 mb-1">Taxa de Conclusão</p>
          <p className="text-2xl font-semibold text-green-600">78%</p>
        </div>
      </div>
    </div>
  );
}

function TasksView() {
  const [viewMode, setViewMode] = useState<"list" | "kanban">("kanban");

  const allTasks = [
    { id: 1, name: "Implementar autenticação OAuth", project: "Backend API", assignee: "RC", status: "todo", priority: "high", due: "24 Nov", comments: 3, attachments: 2 },
    { id: 2, name: "Redesign da página de login", project: "Frontend", assignee: "MF", status: "todo", priority: "medium", due: "25 Nov", comments: 1, attachments: 0 },
    { id: 3, name: "Corrigir bug no checkout", project: "E-commerce", assignee: "JL", status: "progress", priority: "critical", due: "24 Nov", comments: 5, attachments: 1 },
    { id: 4, name: "Documentação da API v2", project: "Backend API", assignee: "AS", status: "progress", priority: "low", due: "26 Nov", comments: 0, attachments: 3 },
    { id: 5, name: "Testes unitários módulo pagamento", project: "E-commerce", assignee: "RC", status: "progress", priority: "high", due: "25 Nov", comments: 2, attachments: 0 },
    { id: 6, name: "Otimizar queries do banco", project: "Backend API", assignee: "JL", status: "review", priority: "medium", due: "27 Nov", comments: 4, attachments: 1 },
    { id: 7, name: "Implementar dark mode", project: "Frontend", assignee: "MF", status: "review", priority: "low", due: "28 Nov", comments: 2, attachments: 0 },
    { id: 8, name: "Setup CI/CD pipeline", project: "DevOps", assignee: "AS", status: "done", priority: "high", due: "23 Nov", comments: 6, attachments: 2 },
    { id: 9, name: "Configurar analytics", project: "Marketing", assignee: "RC", status: "done", priority: "medium", due: "22 Nov", comments: 1, attachments: 0 },
  ];

  const columns = [
    { id: "todo", title: "A Fazer", color: "gray" },
    { id: "progress", title: "Em Progresso", color: "orange" },
    { id: "review", title: "Em Revisão", color: "blue" },
    { id: "done", title: "Concluído", color: "green" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tarefas</h1>
          <p className="text-sm text-gray-600 mt-1">Gerencie todas as tarefas do time</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
            <button 
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === "list" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("kanban")}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === "kanban" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Nova Tarefa
          </button>
        </div>
      </div>

      {/* Kanban View */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-4 gap-4">
          {columns.map((column) => {
            const columnTasks = allTasks.filter(task => task.status === column.id);
            
            return (
              <div key={column.id} className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{column.title}</h3>
                    <span className="px-2 py-0.5 bg-white rounded text-xs font-medium text-gray-600">
                      {columnTasks.length}
                    </span>
                  </div>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Plus className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {columnTasks.map((task) => (
                    <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group">
                      <div className="flex items-start justify-between mb-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium text-white ${
                          task.priority === "critical" ? "bg-red-500" :
                          task.priority === "high" ? "bg-orange-500" :
                          task.priority === "medium" ? "bg-blue-500" : "bg-gray-400"
                        }`}>
                          {task.priority === "critical" ? "Crítica" : 
                           task.priority === "high" ? "Alta" :
                           task.priority === "medium" ? "Média" : "Baixa"}
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      
                      <h4 className="font-medium text-gray-900 text-sm mb-2">{task.name}</h4>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          {task.project}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          {task.comments > 0 && (
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {task.comments}
                            </span>
                          )}
                          {task.attachments > 0 && (
                            <span className="flex items-center gap-1">
                              <Paperclip className="w-3 h-3" />
                              {task.attachments}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{task.due}</span>
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {task.assignee}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase">Tarefa</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase">Projeto</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase">Prioridade</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase">Responsável</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase">Prazo</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                        <span className="font-medium text-gray-900 text-sm">{task.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {task.project}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === "done" ? "bg-green-100 text-green-700" :
                        task.status === "progress" ? "bg-orange-100 text-orange-700" :
                        task.status === "review" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                      }`}>
                        {task.status === "done" ? "Concluído" :
                         task.status === "progress" ? "Em progresso" :
                         task.status === "review" ? "Em revisão" : "A fazer"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium text-white ${
                        task.priority === "critical" ? "bg-red-500" :
                        task.priority === "high" ? "bg-orange-500" :
                        task.priority === "medium" ? "bg-blue-500" : "bg-gray-400"
                      }`}>
                        {task.priority === "critical" ? "Crítica" : 
                         task.priority === "high" ? "Alta" :
                         task.priority === "medium" ? "Média" : "Baixa"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {task.assignee}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-gray-600">{task.due}</span>
                    </td>
                    <td className="px-5 py-4">
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function SprintsView() {
  const sprints = [
    { id: 1, name: "Sprint 12", status: "active", startDate: "20 Nov", endDate: "03 Dez", progress: 65, tasks: { total: 28, completed: 18 }, team: ["RC", "AS", "JL", "MF"] },
    { id: 2, name: "Sprint 11", status: "completed", startDate: "06 Nov", endDate: "19 Nov", progress: 100, tasks: { total: 32, completed: 32 }, team: ["RC", "AS", "JL", "MF"] },
    { id: 3, name: "Sprint 10", status: "completed", startDate: "23 Out", endDate: "05 Nov", progress: 100, tasks: { total: 29, completed: 29 }, team: ["RC", "AS", "JL"] },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Sprints</h1>
          <p className="text-sm text-gray-600 mt-1">Gerencie os sprints do time</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Novo Sprint
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {sprints.map((sprint) => (
          <div key={sprint.id} className={`bg-white border-2 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
            sprint.status === "active" ? "border-blue-500" : "border-gray-200"
          }`}>
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{sprint.name}</h3>
                  <p className="text-sm text-gray-600">{sprint.startDate} - {sprint.endDate}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  sprint.status === "active" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                }`}>
                  {sprint.status === "active" ? "Ativo" : "Concluído"}
                </span>
              </div>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progresso</span>
                  <span className="font-semibold text-gray-900">{sprint.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${sprint.status === "active" ? "bg-blue-500" : "bg-green-500"}`} style={{ width: `${sprint.progress}%` }}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Tarefas</span>
                <span className="font-semibold text-gray-900">{sprint.tasks.completed}/{sprint.tasks.total}</span>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex -space-x-2">
                  {sprint.team.map((member, i) => (
                    <div key={i} className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white">
                      {member}
                    </div>
                  ))}
                </div>
                <button className="text-xs text-blue-600 font-medium hover:text-blue-700">Ver detalhes →</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sprint Stats */}
      <div className="grid grid-cols-4 gap-5">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-600 mb-1">Velocity Média</p>
          <p className="text-2xl font-semibold text-gray-900">29.6</p>
          <p className="text-xs text-green-600 mt-1 font-medium">+5% vs média geral</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-600 mb-1">Taxa de Conclusão</p>
          <p className="text-2xl font-semibold text-gray-900">94%</p>
          <p className="text-xs text-green-600 mt-1 font-medium">Excelente desempenho</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-600 mb-1">Dias Restantes</p>
          <p className="text-2xl font-semibold text-gray-900">9</p>
          <p className="text-xs text-gray-500 mt-1">Sprint atual</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-600 mb-1">Story Points</p>
          <p className="text-2xl font-semibold text-gray-900">156</p>
          <p className="text-xs text-gray-500 mt-1">Total este mês</p>
        </div>
      </div>
    </div>
  );
}

function ReportsView() {
  const lineData = [
    { month: "Jul", tasks: 85 },
    { month: "Ago", tasks: 92 },
    { month: "Set", tasks: 78 },
    { month: "Out", tasks: 105 },
    { month: "Nov", tasks: 98 },
  ];

  const pieData = [
    { name: "Concluído", value: 156, color: "#10B981" },
    { name: "Em Progresso", value: 48, color: "#F59E0B" },
    { name: "A Fazer", value: 32, color: "#6B7280" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Relatórios</h1>
          <p className="text-sm text-gray-600 mt-1">Análises e métricas de desempenho</p>
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Últimos 30 dias</option>
            <option>Últimos 60 dias</option>
            <option>Últimos 90 dias</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            Exportar
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-5">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-600 mb-1">Tarefas Totais</p>
          <p className="text-2xl font-semibold text-gray-900">236</p>
          <p className="text-xs text-green-600 mt-1 font-medium">+18% este mês</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-600 mb-1">Produtividade</p>
          <p className="text-2xl font-semibold text-gray-900">92%</p>
          <p className="text-xs text-green-600 mt-1 font-medium">+5% este mês</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-600 mb-1">Tempo Médio</p>
          <p className="text-2xl font-semibold text-gray-900">4.2h</p>
          <p className="text-xs text-red-600 mt-1 font-medium">+0.3h vs mês passado</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-600 mb-1">Taxa de Bugs</p>
          <p className="text-2xl font-semibold text-gray-900">2.8%</p>
          <p className="text-xs text-green-600 mt-1 font-medium">-1.2% este mês</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tarefas Concluídas (5 meses)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
              />
              <Line type="monotone" dataKey="tasks" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status das Tarefas</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Performance */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance do Time</h3>
        <div className="space-y-4">
          {[
            { name: "Rafael Costa", avatar: "RC", tasks: 42, completion: 95 },
            { name: "Marina Ferreira", avatar: "MF", tasks: 38, completion: 92 },
            { name: "João Lucas", avatar: "JL", tasks: 45, completion: 88 },
            { name: "Ana Silva", avatar: "AS", tasks: 35, completion: 97 },
          ].map((member, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {member.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">{member.name}</span>
                  <span className="text-sm text-gray-600">{member.tasks} tarefas • {member.completion}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${member.completion}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Configurações</h1>
        <p className="text-sm text-gray-600 mt-1">Gerencie suas preferências e configurações</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Navigation */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <nav className="space-y-1">
            {[
              "Perfil",
              "Conta",
              "Notificações",
              "Integrações",
              "Equipe",
              "Segurança",
              "Billing",
            ].map((item, i) => (
              <button
                key={i}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  i === 0 ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações do Perfil</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                <input
                  type="text"
                  defaultValue="Ana Silva"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="ana.silva@tasklean.com"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                <input
                  type="text"
                  defaultValue="Product Manager"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferências</h3>
            <div className="space-y-4">
              {[
                { label: "Notificações por email", checked: true },
                { label: "Notificações push", checked: true },
                { label: "Newsletter semanal", checked: false },
                { label: "Modo escuro", checked: false },
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{pref.label}</span>
                  <button
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      pref.checked ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        pref.checked ? "translate-x-5" : ""
                      }`}
                    ></span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancelar
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              Salvar alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
