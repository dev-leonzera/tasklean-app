import { MoreVertical, Users, CheckCircle2, Calendar, Plus, Filter } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Backend API v2",
    description: "Refatoração completa da API REST",
    progress: 75,
    tasks: { total: 48, completed: 36 },
    status: "in-progress",
    members: ["RC", "AS", "JL"],
    dueDate: "15 Dez",
    color: "#3B82F6",
  },
  {
    id: 2,
    name: "Redesign Frontend",
    description: "Nova interface do usuário e experiência",
    progress: 45,
    tasks: { total: 32, completed: 14 },
    status: "in-progress",
    members: ["MF", "AS"],
    dueDate: "22 Dez",
    color: "#F59E0B",
  },
  {
    id: 3,
    name: "Plataforma E-commerce",
    description: "Sistema completo de vendas online",
    progress: 90,
    tasks: { total: 64, completed: 58 },
    status: "finishing",
    members: ["RC", "JL", "MF", "AS"],
    dueDate: "10 Dez",
    color: "#10B981",
  },
  {
    id: 4,
    name: "App Mobile",
    description: "Aplicativo nativo iOS e Android",
    progress: 30,
    tasks: { total: 56, completed: 17 },
    status: "in-progress",
    members: ["MF", "RC"],
    dueDate: "30 Dez",
    color: "#8B5CF6",
  },
  {
    id: 5,
    name: "Dashboard Analytics",
    description: "Painel de métricas e relatórios",
    progress: 60,
    tasks: { total: 28, completed: 17 },
    status: "in-progress",
    members: ["AS", "JL"],
    dueDate: "18 Dez",
    color: "#EC4899",
  },
  {
    id: 6,
    name: "Sistema de Notificações",
    description: "Notificações em tempo real",
    progress: 15,
    tasks: { total: 20, completed: 3 },
    status: "starting",
    members: ["RC"],
    dueDate: "28 Dez",
    color: "#64748B",
  },
];

const getStatusConfig = (status: string) => {
  const configs = {
    "in-progress": { label: "Em progresso", className: "bg-amber-100 text-amber-700 border-amber-200" },
    "finishing": { label: "Em finalização", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
    "starting": { label: "Iniciando", className: "bg-slate-100 text-slate-700 border-slate-200" },
  };
  return configs[status as keyof typeof configs] || configs["in-progress"];
};

export function Projects() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">Projetos</h1>
          <p className="text-slate-600">Gerencie todos os seus projetos ativos</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filtrar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Novo Projeto
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const statusConfig = getStatusConfig(project.status);
          
          return (
            <div
              key={project.id}
              className="bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-all cursor-pointer group overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-3 h-3 rounded-full shadow-sm"
                    style={{ backgroundColor: project.color }}
                  ></div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 rounded">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{project.name}</h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {project.description}
                </p>

                <span 
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.className}`}
                >
                  {statusConfig.label}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-600">Progresso</span>
                    <span className="text-sm font-semibold text-slate-900">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${project.progress}%`,
                        backgroundColor: project.color
                      }}
                    ></div>
                  </div>
                </div>

                {/* Task Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{project.tasks.completed}/{project.tasks.total} tarefas</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>{project.dueDate}</span>
                  </div>
                </div>

                {/* Members */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <div className="flex -space-x-2">
                      {project.members.map((member, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold border-2 border-white shadow-sm"
                        >
                          {member}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                    Ver detalhes →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
          <p className="text-sm text-slate-600 mb-2">Total de Projetos</p>
          <h3 className="text-3xl font-semibold text-slate-900">12</h3>
          <p className="text-xs text-emerald-600 mt-1 font-medium">+2 este mês</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
          <p className="text-sm text-slate-600 mb-2">Em Progresso</p>
          <h3 className="text-3xl font-semibold text-slate-900">8</h3>
          <p className="text-xs text-slate-500 mt-1">67% do total</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
          <p className="text-sm text-slate-600 mb-2">Finalizando</p>
          <h3 className="text-3xl font-semibold text-slate-900">3</h3>
          <p className="text-xs text-slate-500 mt-1">25% do total</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
          <p className="text-sm text-slate-600 mb-2">Taxa de Conclusão</p>
          <h3 className="text-3xl font-semibold text-emerald-600">78%</h3>
          <p className="text-xs text-emerald-600 mt-1 font-medium">+5% este mês</p>
        </div>
      </div>
    </div>
  );
}
