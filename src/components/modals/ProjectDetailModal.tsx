import React from "react";
import { 
  FolderKanban, 
  Calendar, 
  User, 
  Share2, 
  Edit, 
  X, 
  Paperclip, 
  Download 
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Project } from "../../types";
import { getInitials } from "../../utils/avatar";

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
  onEdit?: () => void;
}

export default function ProjectDetailModal({ project, onClose, onEdit }: ProjectDetailModalProps) {
  const timelineData = [
    { day: "Seg", completed: 5 },
    { day: "Ter", completed: 8 },
    { day: "Qua", completed: 6 },
    { day: "Qui", completed: 9 },
    { day: "Sex", completed: 7 },
  ];

  const projectTasks = [
    { id: 1, name: "Configurar ambiente de desenvolvimento", status: "done", assignee: "RC" },
    { id: 2, name: "Modelagem do banco de dados", status: "done", assignee: "AS" },
    { id: 3, name: "Implementar endpoints da API", status: "progress", assignee: "JL" },
    { id: 4, name: "Testes de integração", status: "progress", assignee: "RC" },
    { id: 5, name: "Documentação técnica", status: "todo", assignee: "AS" },
    { id: 6, name: "Deploy em staging", status: "todo", assignee: "JL" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200" style={{ backgroundColor: project.color + '10' }}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: project.color }}>
                <FolderKanban className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{project.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{project.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={onEdit}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Edit className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Prazo: {project.due}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{project.members.length} membros</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              project.status === "finishing" ? "bg-green-100 text-green-700" :
              project.status === "progress" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700"
            }`}>
              {project.status === "finishing" ? "Finalizando" :
               project.status === "progress" ? "Em progresso" : "Iniciando"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="col-span-2 space-y-6">
              {/* Progress */}
              <div className="bg-gray-50 rounded-lg p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Progresso do Projeto</h3>
                  <span className="text-2xl font-semibold text-gray-900">{project.progress}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
                  <div className="h-full rounded-full transition-all" style={{ width: `${project.progress}%`, backgroundColor: project.color }}></div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">{project.completed}</p>
                    <p className="text-xs text-gray-600 mt-1">Concluídas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">{project.tasks - project.completed}</p>
                    <p className="text-xs text-gray-600 mt-1">Pendentes</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">{project.tasks}</p>
                    <p className="text-xs text-gray-600 mt-1">Total</p>
                  </div>
                </div>
              </div>

              {/* Timeline Chart */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Atividade da Semana</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={timelineData}>
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
                    <Area type="monotone" dataKey="completed" stroke={project.color} fill={project.color} fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Tasks List */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Tarefas do Projeto</h3>
                  <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Ver todas</button>
                </div>
                <div className="divide-y divide-gray-100">
                  {projectTasks.map((task) => (
                    <div key={task.id} className="px-5 py-3 hover:bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded ${
                          task.status === "done" ? "bg-green-500" :
                          task.status === "progress" ? "bg-orange-500 border-2 border-white" : "border-2 border-gray-300"
                        }`}></div>
                        <span className={`text-sm ${task.status === "done" ? "text-gray-400 line-through" : "text-gray-900"}`}>
                          {task.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          task.status === "done" ? "bg-green-100 text-green-700" :
                          task.status === "progress" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700"
                        }`}>
                          {task.status === "done" ? "Concluída" :
                           task.status === "progress" ? "Em andamento" : "A fazer"}
                        </span>
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {getInitials(task.assignee)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Team */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Equipe</h3>
                <div className="space-y-3">
                  {project.members.map((member, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {getInitials(member)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Membro {i + 1}</p>
                        <p className="text-xs text-gray-500">Developer</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  + Adicionar membro
                </button>
              </div>

              {/* Files */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Arquivos</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <Paperclip className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700 flex-1">Documentação.pdf</span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <Paperclip className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700 flex-1">Wireframes.fig</span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <button className="w-full mt-4 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  + Upload arquivo
                </button>
              </div>

              {/* Tags */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags && project.tags.length > 0 ? (
                    project.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 rounded text-xs font-medium text-white"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">Nenhuma tag definida</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

