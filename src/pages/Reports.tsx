import React from "react";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { getInitials } from "../utils/avatar";

export default function ReportsView() {
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
                {getInitials(member.name)}
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

