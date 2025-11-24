import { useState, useMemo, React } from "react";
import { Plus, List, Grid3x3, MoreHorizontal, MessageSquare, Paperclip, Clock, X } from "lucide-react";
import { Task } from "../types";
import { CustomSelect } from "../components/ui/custom-select";

interface TasksViewProps {
  tasks: Task[];
  projects: string[];
  onSelectTask: (task: Task) => void;
  onNewTask: () => void;
  onEditTask: (task: Task) => void;
}

export default function TasksView({ tasks: allTasks, projects, onSelectTask, onNewTask, onEditTask }: TasksViewProps) {
  const [viewMode, setViewMode] = useState<"list" | "kanban">("kanban");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");

  // Extrair lista única de responsáveis
  const assignees = useMemo(() => {
    return Array.from(new Set(allTasks.map(task => task.assignee))).sort();
  }, [allTasks]);

  const filteredTasks = useMemo(() => {
    let filtered = [...allTasks];

    // Filtro por status
    if (statusFilter !== "all") {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    // Filtro por prioridade
    if (priorityFilter !== "all") {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    // Filtro por projeto
    if (projectFilter !== "all") {
      filtered = filtered.filter(task => task.project === projectFilter);
    }

    // Filtro por responsável
    if (assigneeFilter !== "all") {
      filtered = filtered.filter(task => task.assignee === assigneeFilter);
    }

    return filtered;
  }, [allTasks, statusFilter, priorityFilter, projectFilter, assigneeFilter]);

  const clearFilters = () => {
    setStatusFilter("all");
    setPriorityFilter("all");
    setProjectFilter("all");
    setAssigneeFilter("all");
  };

  const hasActiveFilters = statusFilter !== "all" || priorityFilter !== "all" || 
                           projectFilter !== "all" || assigneeFilter !== "all";

  const columns = [
    { id: "todo", title: "A Fazer", color: "gray" },
    { id: "progress", title: "Em Progresso", color: "orange" },
    { id: "review", title: "Em Revisão", color: "blue" },
    { id: "done", title: "Concluído", color: "green" },
  ];

  return (
    <div className="p-6 space-y-6">
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
          <button 
            onClick={onNewTask}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Nova Tarefa
          </button>
        </div>
      </div>

      {/* Filtros inline */}
      <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Status:</label>
          <CustomSelect
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "all", label: "Todos" },
              { value: "todo", label: "A Fazer" },
              { value: "progress", label: "Em Progresso" },
              { value: "review", label: "Em Revisão" },
              { value: "done", label: "Concluído" },
            ]}
            placeholder="Todos"
            className="w-[200px]"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Prioridade:</label>
          <CustomSelect
            value={priorityFilter}
            onChange={setPriorityFilter}
            options={[
              { value: "all", label: "Todas" },
              { value: "critical", label: "Crítica" },
              { value: "high", label: "Alta" },
              { value: "medium", label: "Média" },
              { value: "low", label: "Baixa" },
            ]}
            placeholder="Todas"
            className="w-[200px]"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Projeto:</label>
          <CustomSelect
            value={projectFilter}
            onChange={setProjectFilter}
            options={[
              { value: "all", label: "Todos" },
              ...projects.map((project) => ({ value: project, label: project })),
            ]}
            placeholder="Todos"
            className="w-[200px]"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Responsável:</label>
          <CustomSelect
            value={assigneeFilter}
            onChange={setAssigneeFilter}
            options={[
              { value: "all", label: "Todos" },
              ...assignees.map((assignee) => ({ value: assignee, label: assignee })),
            ]}
            placeholder="Todos"
            className="w-[200px]"
          />
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors ml-auto"
          >
            <X className="w-4 h-4" />
            Limpar filtros
          </button>
        )}
      </div>

      {viewMode === "kanban" && (
        <div className="grid grid-cols-4 gap-4">
          {columns.map((column) => {
            const columnTasks = filteredTasks.filter(task => task.status === column.id);
            
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
                    <div 
                      key={task.id} 
                      onClick={() => onSelectTask(task)}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
                    >
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
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditTask(task);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded"
                        >
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
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-gray-500">
                      Nenhuma tarefa encontrada com os filtros aplicados.
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => (
                  <tr 
                    key={task.id} 
                    onClick={() => onSelectTask(task)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
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
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditTask(task);
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

