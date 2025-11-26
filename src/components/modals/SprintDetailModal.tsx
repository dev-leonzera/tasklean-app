import React from "react";
import { X, Zap, Edit } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Sprint } from "../../types";
import { getInitials } from "../../utils/avatar";

interface SprintDetailModalProps {
  sprint: Sprint;
  onClose: () => void;
  onEdit?: () => void;
}

export default function SprintDetailModal({ sprint, onClose, onEdit }: SprintDetailModalProps) {
  const burndownData = [
    { day: "Dia 1", ideal: 28, real: 28 },
    { day: "Dia 3", ideal: 24, real: 25 },
    { day: "Dia 5", ideal: 20, real: 22 },
    { day: "Dia 7", ideal: 16, real: 18 },
    { day: "Dia 9", ideal: 12, real: 14 },
    { day: "Dia 11", ideal: 8, real: 10 },
    { day: "Dia 13", ideal: 4, real: 10 },
  ];

  const sprintTasks = [
    { id: 1, name: "Implementar autenticação OAuth", status: "done", points: 5, assignee: "RC" },
    { id: 2, name: "Redesign da página de login", status: "done", points: 3, assignee: "MF" },
    { id: 3, name: "Corrigir bug no checkout", status: "progress", points: 8, assignee: "JL" },
    { id: 4, name: "Documentação da API v2", status: "progress", points: 5, assignee: "AS" },
    { id: 5, name: "Testes unitários", status: "todo", points: 5, assignee: "RC" },
    { id: 6, name: "Setup CI/CD", status: "todo", points: 3, assignee: "JL" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={`p-6 border-b border-gray-200 ${
          sprint.status === "active" ? "bg-blue-50" : "bg-green-50"
        }`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                sprint.status === "active" ? "bg-blue-600" : "bg-green-600"
              }`}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{sprint.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{sprint.startDate} - {sprint.endDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                sprint.status === "active" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
              }`}>
                {sprint.status === "active" ? "Ativo" : "Concluído"}
              </span>
              {onEdit && (
                <button onClick={onEdit} className="p-2 hover:bg-gray-100 rounded-lg">
                  <Edit className="w-5 h-5 text-gray-600" />
                </button>
              )}
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-1">Progresso</p>
              <p className="text-xl font-semibold text-gray-900">{sprint.progress}%</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-1">Tarefas</p>
              <p className="text-xl font-semibold text-gray-900">{sprint.tasks.completed}/{sprint.tasks.total}</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-1">Story Points</p>
              <p className="text-xl font-semibold text-gray-900">29</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-1">Dias restantes</p>
              <p className="text-xl font-semibold text-gray-900">9</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-260px)]">
          <div className="grid grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="col-span-2 space-y-6">
              {/* Burndown Chart */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Burndown Chart</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={burndownData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
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
                    <Line type="monotone" dataKey="ideal" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    <Line type="monotone" dataKey="real" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-gray-400"></div>
                    <span className="text-xs text-gray-600">Ideal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-blue-600"></div>
                    <span className="text-xs text-gray-600">Real</span>
                  </div>
                </div>
              </div>

              {/* Sprint Tasks */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Tarefas do Sprint</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {sprintTasks.map((task) => (
                    <div key={task.id} className="px-5 py-3 hover:bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-5 h-5 rounded ${
                          task.status === "done" ? "bg-green-500" :
                          task.status === "progress" ? "bg-orange-500" : "border-2 border-gray-300"
                        }`}></div>
                        <span className={`text-sm flex-1 ${task.status === "done" ? "text-gray-400 line-through" : "text-gray-900"}`}>
                          {task.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {task.points} pts
                        </span>
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
                <h3 className="font-semibold text-gray-900 mb-4">Equipe do Sprint</h3>
                <div className="space-y-3">
                  {sprint.team.map((member, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {getInitials(member)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Membro {i + 1}</p>
                        <p className="text-xs text-gray-500">Developer</p>
                      </div>
                      <span className="text-xs text-gray-600">
                        {Math.floor(Math.random() * 10)} tarefas
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Métricas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Velocity</span>
                    <span className="font-semibold text-gray-900">24.5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxa de conclusão</span>
                    <span className="font-semibold text-green-600">{sprint.progress}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Story points</span>
                    <span className="font-semibold text-gray-900">29</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bugs reportados</span>
                    <span className="font-semibold text-gray-900">3</span>
                  </div>
                </div>
              </div>

              {/* Sprint Goal */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Meta do Sprint</h3>
                <p className="text-sm text-gray-700">
                  Implementar sistema completo de autenticação e melhorar a experiência do usuário no fluxo de login.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

