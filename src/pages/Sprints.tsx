import React, { useState, useMemo } from "react";
import { Plus, MoreHorizontal, X } from "lucide-react";
import { Sprint } from "../types";
import { CustomSelect } from "../components/ui/custom-select";
import { getInitials } from "../utils/avatar";

interface SprintsViewProps {
  sprints: Sprint[];
  onSelectSprint: (sprint: Sprint) => void;
  onNewSprint: () => void;
  onEditSprint: (sprint: Sprint) => void;
}

export default function SprintsView({ sprints, onSelectSprint, onNewSprint, onEditSprint }: SprintsViewProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredSprints = useMemo(() => {
    let filtered = [...sprints];

    // Filtro por status
    if (statusFilter !== "all") {
      filtered = filtered.filter(sprint => sprint.status === statusFilter);
    }

    return filtered;
  }, [sprints, statusFilter]);

  const clearFilters = () => {
    setStatusFilter("all");
  };

  const hasActiveFilters = statusFilter !== "all";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Sprints</h1>
          <p className="text-sm text-gray-600 mt-1">Gerencie os sprints do time</p>
        </div>
        <button 
          onClick={onNewSprint}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Novo Sprint
        </button>
      </div>

      {/* Filtros inline */}
      <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-2 flex-1">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Status:</label>
          <CustomSelect
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "all", label: "Todos os status" },
              { value: "active", label: "Ativo" },
              { value: "completed", label: "Concluído" },
            ]}
            placeholder="Todos os status"
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

      <div className="grid grid-cols-3 gap-6">
        {filteredSprints.length === 0 ? (
          <div className="col-span-3 text-center py-12">
            <p className="text-gray-500">Nenhum sprint encontrado com os filtros aplicados.</p>
          </div>
        ) : (
          filteredSprints.map((sprint) => (
          <div 
            key={sprint.id} 
            onClick={() => onSelectSprint(sprint)}
            className={`bg-white border-2 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group ${
              sprint.status === "active" ? "border-blue-500" : "border-gray-200"
            }`}
          >
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{sprint.name}</h3>
                  <p className="text-sm text-gray-600">{sprint.startDate} - {sprint.endDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    sprint.status === "active" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                  }`}>
                    {sprint.status === "active" ? "Ativo" : "Concluído"}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditSprint(sprint);
                    }}
                    className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100"
                  >
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
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
                      {getInitials(member)}
                    </div>
                  ))}
                </div>
                <button className="text-xs text-blue-600 font-medium hover:text-blue-700">Ver detalhes →</button>
              </div>
            </div>
          </div>
        ))
        )}
      </div>

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

