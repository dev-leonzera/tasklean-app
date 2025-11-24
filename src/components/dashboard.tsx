import { CheckCircle2, Circle, Clock, TrendingUp, AlertCircle, MoreHorizontal } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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
  { 
    id: 1, 
    name: "Implementar autenticação OAuth", 
    project: "Backend API", 
    assignee: "RC", 
    status: "in-progress", 
    priority: "high", 
    dueDate: "Hoje" 
  },
  { 
    id: 2, 
    name: "Redesign da página de login", 
    project: "Frontend", 
    assignee: "MF", 
    status: "review", 
    priority: "medium", 
    dueDate: "Amanhã" 
  },
  { 
    id: 3, 
    name: "Corrigir bug no checkout", 
    project: "E-commerce", 
    assignee: "JL", 
    status: "in-progress", 
    priority: "critical", 
    dueDate: "Hoje" 
  },
  { 
    id: 4, 
    name: "Documentação da API v2", 
    project: "Backend API", 
    assignee: "AS", 
    status: "todo", 
    priority: "low", 
    dueDate: "15/12" 
  },
  { 
    id: 5, 
    name: "Testes unitários do módulo de pagamento", 
    project: "E-commerce", 
    assignee: "RC", 
    status: "in-progress", 
    priority: "high", 
    dueDate: "Amanhã" 
  },
];

const getStatusConfig = (status: string) => {
  const configs = {
    "in-progress": { label: "Em progresso", className: "bg-amber-100 text-amber-700" },
    "review": { label: "Em revisão", className: "bg-blue-100 text-blue-700" },
    "todo": { label: "A fazer", className: "bg-slate-100 text-slate-700" },
  };
  return configs[status as keyof typeof configs] || configs["todo"];
};

const getPriorityConfig = (priority: string) => {
  const configs = {
    "critical": { label: "Crítica", className: "bg-red-500" },
    "high": { label: "Alta", className: "bg-orange-500" },
    "medium": { label: "Média", className: "bg-blue-500" },
    "low": { label: "Baixa", className: "bg-slate-400" },
  };
  return configs[priority as keyof typeof configs] || configs["medium"];
};

export function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Visão geral da sua produtividade e tarefas</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Circle className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-xs text-emerald-600 font-medium">+12%</span>
          </div>
          <h3 className="text-3xl font-semibold text-slate-900 mb-1">24</h3>
          <p className="text-sm text-slate-600">Tarefas em aberto</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xs text-emerald-600 font-medium">+8%</span>
          </div>
          <h3 className="text-3xl font-semibold text-slate-900 mb-1">89</h3>
          <p className="text-sm text-slate-600">Tarefas concluídas</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs text-slate-500 font-medium">3 finalizando</span>
          </div>
          <h3 className="text-3xl font-semibold text-slate-900 mb-1">12</h3>
          <p className="text-sm text-slate-600">Projetos ativos</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs text-emerald-600 font-medium">4 dias</span>
          </div>
          <h3 className="text-3xl font-semibold text-slate-900 mb-1">Sprint 12</h3>
          <p className="text-sm text-slate-600">Sprint atual</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Tarefas Recentes</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Ver todas
            </button>
          </div>
          
          <div className="divide-y divide-slate-200">
            {tasks.map((task) => {
              const statusConfig = getStatusConfig(task.status);
              const priorityConfig = getPriorityConfig(task.priority);
              
              return (
                <div key={task.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-start gap-3">
                    <button className="mt-1 w-5 h-5 rounded border-2 border-slate-300 hover:border-blue-500 transition-colors flex-shrink-0" />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-medium text-slate-900">{task.name}</h4>
                        <div className={`${priorityConfig.className} px-2 py-1 rounded text-white text-xs font-medium flex-shrink-0`}>
                          {priorityConfig.label}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          {task.project}
                        </span>
                        
                        <span className={`${statusConfig.className} px-2.5 py-1 rounded-full text-xs font-medium`}>
                          {statusConfig.label}
                        </span>
                        
                        <div className="flex items-center gap-2 ml-auto">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                            {task.assignee}
                          </div>
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <Clock className="w-3.5 h-3.5" />
                            {task.dueDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded transition-all">
                      <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Produtividade Semanal</h3>
          
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis 
                dataKey="day" 
                tick={{ fill: '#64748B', fontSize: 12 }}
                axisLine={{ stroke: '#E2E8F0' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#64748B', fontSize: 12 }}
                axisLine={{ stroke: '#E2E8F0' }}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '13px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                cursor={{ fill: '#F1F5F9' }}
              />
              <Bar 
                dataKey="tasks" 
                fill="#3B82F6" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Total esta semana</span>
              <span className="text-sm font-semibold text-slate-900">99 tarefas</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Média diária</span>
              <span className="text-sm font-semibold text-slate-900">14.1 tarefas</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-emerald-700 font-medium">
                +15% vs semana passada
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 flex items-center gap-4 shadow-lg">
        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-semibold mb-1">3 tarefas com prazo vencendo hoje</h4>
          <p className="text-white/90 text-sm">Revise as tarefas críticas para manter o projeto no prazo</p>
        </div>
        <button className="px-4 py-2 bg-white text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors flex-shrink-0">
          Ver tarefas
        </button>
      </div>
    </div>
  );
}
