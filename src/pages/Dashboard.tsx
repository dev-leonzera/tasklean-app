import { useMemo } from "react";
import { 
  Circle, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  MoreHorizontal,
  Calendar,
  MapPin,
  Users
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Commitment, Task, Project, Sprint } from "../types";
import { format, parseISO, isToday, isTomorrow, addDays, isAfter, isBefore, startOfDay, startOfWeek, endOfWeek, eachDayOfInterval, getDay } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { getInitials } from "../utils/avatar";

interface DashboardViewProps {
  commitments?: Commitment[];
  tasks?: Task[];
  projects?: Project[];
  sprints?: Sprint[];
  onSelectCommitment?: (commitment: Commitment) => void;
  onSelectTask?: (task: Task) => void;
}

export default function DashboardView({ 
  commitments = [], 
  tasks = [],
  projects = [],
  sprints = [],
  onSelectCommitment,
  onSelectTask
}: DashboardViewProps) {
  // Calcular estatísticas dos cards
  const stats = useMemo(() => {
    const openTasks = tasks.filter(t => t.status !== 'done').length;
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const activeProjects = projects.filter(p => p.status !== 'finishing').length;
    const finishingProjects = projects.filter(p => p.status === 'finishing').length;
    
    // Encontrar sprint ativo
    const activeSprint = sprints.find(s => s.status === 'active');
    
    return {
      openTasks,
      completedTasks,
      activeProjects,
      finishingProjects,
      activeSprint,
    };
  }, [tasks, projects, sprints]);

  // Tarefas vencendo hoje
  const tasksDueToday = useMemo(() => {
    const today = startOfDay(new Date());
    return tasks.filter(task => {
      if (!task.due) return false;
      try {
        const dueDate = new Date(task.due);
        return isToday(dueDate) && task.status !== 'done';
      } catch {
        return false;
      }
    });
  }, [tasks]);

  // Tarefas recentes (últimas 5)
  const recentTasks = useMemo(() => {
    return tasks
      .filter(t => t.status !== 'done')
      .slice(0, 5);
  }, [tasks]);

  // Dados do gráfico semanal (últimos 7 dias)
  const chartData = useMemo(() => {
    const weekStart = startOfWeek(new Date(), { locale: ptBR });
    const weekEnd = endOfWeek(new Date(), { locale: ptBR });
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
    
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    return days.map(day => {
      const dayTasks = tasks.filter(task => {
        if (!task.due) return false;
        try {
          // Tentar parsear a data no formato brasileiro (dd/MM/yyyy) ou ISO
          let taskDate: Date;
          if (task.due.includes('/')) {
            const [day, month, year] = task.due.split('/');
            taskDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          } else {
            taskDate = new Date(task.due);
          }
          
          const dayStr = format(day, 'yyyy-MM-dd');
          const taskStr = format(taskDate, 'yyyy-MM-dd');
          return dayStr === taskStr;
        } catch {
          return false;
        }
      });
      
      return {
        day: dayNames[getDay(day)],
        tasks: dayTasks.length,
      };
    });
  }, [tasks]);

  // Total de tarefas da semana
  const weeklyStats = useMemo(() => {
    const total = chartData.reduce((sum, day) => sum + day.tasks, 0);
    const average = total / 7;
    return { total, average: average.toFixed(1) };
  }, [chartData]);

  // Compromissos próximos (próximos 7 dias)
  const upcomingCommitments = useMemo(() => {
    const today = startOfDay(new Date());
    const nextWeek = addDays(today, 7);
    
    return commitments
      .filter(c => {
        const commitmentDate = parseISO(c.date);
        return c.status === "scheduled" && 
               isAfter(commitmentDate, today) && 
               isBefore(commitmentDate, nextWeek);
      })
      .sort((a, b) => {
        const dateA = parseISO(a.date);
        const dateB = parseISO(b.date);
        if (dateA.getTime() !== dateB.getTime()) {
          return dateA.getTime() - dateB.getTime();
        }
        return a.startTime.localeCompare(b.startTime);
      })
      .slice(0, 5);
  }, [commitments]);

  const getDateLabel = (dateString: string) => {
    const date = parseISO(dateString);
    if (isToday(date)) return "Hoje";
    if (isTomorrow(date)) return "Amanhã";
    return format(date, "dd/MM", { locale: ptBR });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-orange-500";
      case "low": return "bg-blue-500";
      default: return "bg-gray-400";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high": return "Alta";
      case "medium": return "Média";
      case "low": return "Baixa";
      default: return priority;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Visão geral da sua produtividade</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Circle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{stats.openTasks}</p>
          <p className="text-sm text-gray-600 mt-1">Tarefas em aberto</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{stats.completedTasks}</p>
          <p className="text-sm text-gray-600 mt-1">Tarefas concluídas</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            {stats.finishingProjects > 0 && (
              <span className="text-xs text-gray-500">{stats.finishingProjects} finalizando</span>
            )}
          </div>
          <p className="text-2xl font-semibold text-gray-900">{stats.activeProjects}</p>
          <p className="text-sm text-gray-600 mt-1">Projetos ativos</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            {stats.activeSprint ? stats.activeSprint.name : '-'}
          </p>
          <p className="text-sm text-gray-600 mt-1">Sprint atual</p>
        </div>
      </div>

      {tasksDueToday.length > 0 && (
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold">
              {tasksDueToday.length} {tasksDueToday.length === 1 ? 'tarefa' : 'tarefas'} com prazo vencendo hoje
            </p>
            <p className="text-white/90 text-sm mt-0.5">Revise as tarefas críticas para manter o projeto no prazo</p>
          </div>
          <button 
            onClick={() => onSelectTask?.(tasksDueToday[0])}
            className="px-4 py-2 bg-white text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-50 flex-shrink-0"
          >
            Ver tarefas
          </button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Tarefas Recentes */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Tarefas Recentes</h2>
              <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Ver todas</button>
            </div>
          
          {recentTasks.length === 0 ? (
            <div className="px-5 py-8 text-center text-gray-500">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">Nenhuma tarefa em aberto</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentTasks.map((task) => (
                <div 
                  key={task.id} 
                  onClick={() => onSelectTask?.(task)}
                  className="px-5 py-4 hover:bg-gray-50 cursor-pointer group"
                >
                  <div className="flex items-start gap-3">                  
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
                        {task.project && (
                          <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            {task.project}
                          </span>
                        )}
                        
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          task.status === "progress" ? "bg-orange-100 text-orange-700" :
                          task.status === "review" ? "bg-blue-100 text-blue-700" :
                          task.status === "done" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}>
                          {task.status === "progress" ? "Em progresso" :
                           task.status === "review" ? "Em revisão" :
                           task.status === "done" ? "Concluído" : "A fazer"}
                        </span>
                        
                        <div className="flex items-center gap-2 ml-auto">
                          {task.assignee && (
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                              {getInitials(task.assignee)}
                            </div>
                          )}
                          {task.due && (
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {task.due}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTask?.(task);
                      }}
                      className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          </div>

          {/* Compromissos Próximos */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Compromissos Próximos</h2>
              <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Ver todos</button>
            </div>
            
            {upcomingCommitments.length === 0 ? (
              <div className="px-5 py-8 text-center text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Nenhum compromisso agendado para os próximos 7 dias</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {upcomingCommitments.map((commitment) => (
                    <div 
                      key={commitment.id} 
                      onClick={() => onSelectCommitment?.(commitment)}
                      className="px-5 py-4 hover:bg-gray-50 cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <p className="font-medium text-gray-900 text-sm">{commitment.title}</p>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium text-white flex-shrink-0 ${getPriorityColor(commitment.priority)}`}>
                              {getPriorityLabel(commitment.priority)}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                              <Calendar className="w-3 h-3" />
                              {getDateLabel(commitment.date)}
                            </span>
                            
                            <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                              <Clock className="w-3 h-3" />
                              {commitment.startTime} - {commitment.endTime}
                            </span>
                            
                            {commitment.location && (
                              <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                                <MapPin className="w-3 h-3" />
                                {commitment.location}
                              </span>
                            )}
                            
                            {commitment.project && (
                              <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                {commitment.project}
                              </span>
                            )}
                            
                            {commitment.participants.length > 0 && (
                              <div className="flex items-center gap-1 ml-auto">
                                <Users className="w-3 h-3 text-gray-400" />
                                <div className="flex items-center gap-1">
                                  {commitment.participants.slice(0, 3).map((participant, idx) => (
                                    <div 
                                      key={idx}
                                      className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                                      title={participant}
                                    >
                                      {getInitials(participant)}
                                    </div>
                                  ))}
                                  {commitment.participants.length > 3 && (
                                    <span className="text-xs text-gray-500">+{commitment.participants.length - 3}</span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCommitment?.(commitment);
                          }}
                          className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded"
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                ))}
              </div>
            )}
          </div>
        </div>

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
              <span className="font-semibold text-gray-900">{weeklyStats.total} {weeklyStats.total === 1 ? 'tarefa' : 'tarefas'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Média diária</span>
              <span className="font-semibold text-gray-900">{weeklyStats.average} tarefas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

