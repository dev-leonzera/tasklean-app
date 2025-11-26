import { useState, useMemo } from "react";
import { Plus, List, Calendar as CalendarIcon, MoreHorizontal, X, Clock, MapPin, Users } from "lucide-react";
import { Commitment } from "../types";
import { CustomSelect } from "../components/ui/custom-select";
import { Calendar } from "../components/ui/calendar";
import { format, isSameDay, parseISO, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

interface CommitmentsViewProps {
  commitments: Commitment[];
  projects: string[];
  onSelectCommitment: (commitment: Commitment) => void;
  onNewCommitment: () => void;
  onEditCommitment: (commitment: Commitment) => void;
}

export default function CommitmentsView({ 
  commitments: allCommitments, 
  projects, 
  onSelectCommitment, 
  onNewCommitment, 
  onEditCommitment 
}: CommitmentsViewProps) {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("calendar");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Extrair lista única de participantes
  const participants = useMemo(() => {
    const allParticipants = allCommitments.flatMap(c => c.participants);
    return Array.from(new Set(allParticipants)).sort();
  }, [allCommitments]);

  const filteredCommitments = useMemo(() => {
    let filtered = [...allCommitments];

    // Filtro por status
    if (statusFilter !== "all") {
      filtered = filtered.filter(commitment => commitment.status === statusFilter);
    }

    // Filtro por prioridade
    if (priorityFilter !== "all") {
      filtered = filtered.filter(commitment => commitment.priority === priorityFilter);
    }

    // Filtro por projeto
    if (projectFilter !== "all") {
      filtered = filtered.filter(commitment => commitment.project === projectFilter);
    }

    return filtered;
  }, [allCommitments, statusFilter, priorityFilter, projectFilter]);

  // Compromissos do dia selecionado
  const selectedDayCommitments = useMemo(() => {
    if (!selectedDate) return [];
    return filteredCommitments.filter(c => {
      const commitmentDate = parseISO(c.date);
      return isSameDay(commitmentDate, selectedDate);
    }).sort((a, b) => {
      // Ordenar por horário de início
      return a.startTime.localeCompare(b.startTime);
    });
  }, [filteredCommitments, selectedDate]);

  // Compromissos do mês atual para marcar no calendário
  const monthCommitments = useMemo(() => {
    if (!selectedDate) return [];
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    const days = eachDayOfInterval({ start, end });
    
    return days.map(day => ({
      date: day,
      count: filteredCommitments.filter(c => isSameDay(parseISO(c.date), day)).length
    }));
  }, [filteredCommitments, selectedDate]);

  const clearFilters = () => {
    setStatusFilter("all");
    setPriorityFilter("all");
    setProjectFilter("all");
  };

  const hasActiveFilters = statusFilter !== "all" || priorityFilter !== "all" || projectFilter !== "all";

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "cancelled": return "bg-gray-100 text-gray-700";
      case "scheduled": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed": return "Concluído";
      case "cancelled": return "Cancelado";
      case "scheduled": return "Agendado";
      default: return status;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Compromissos</h1>
          <p className="text-sm text-gray-600 mt-1">Gerencie seus compromissos e reuniões</p>
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
              onClick={() => setViewMode("calendar")}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === "calendar" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
          </div>
          <button 
            onClick={onNewCommitment}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Novo Compromisso
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
              { value: "scheduled", label: "Agendado" },
              { value: "completed", label: "Concluído" },
              { value: "cancelled", label: "Cancelado" },
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

      {viewMode === "calendar" && (
        <div className="grid grid-cols-3 gap-6">
          {/* Calendário */}
          <div className="col-span-1 bg-white border border-gray-200 rounded-lg p-4 flex flex-col">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={ptBR}
              modifiers={{
                hasCommitments: monthCommitments
                  .filter(mc => mc.count > 0)
                  .map(mc => mc.date)
              }}
              modifiersClassNames={{
                hasCommitments: "bg-blue-100 text-blue-700 font-semibold"
              }}
              className="w-full"
              classNames={{
                months: "flex flex-col",
                month: "flex flex-col gap-3",
                caption: "flex justify-between items-center w-full mb-3 px-1",
                caption_label: "text-sm font-medium text-gray-900 order-2",
                nav: "flex items-center gap-1 order-1",
                nav_button: "h-7 w-7 p-0 hover:bg-gray-100 rounded-md opacity-70 hover:opacity-100 flex items-center justify-center transition-opacity",
                nav_button_previous: "",
                nav_button_next: "order-3",
                table: "w-full border-collapse",
                head_row: "flex mb-1",
                head_cell: "text-gray-500 rounded-md w-9 font-normal text-xs",
                row: "flex w-full mt-1",
                cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-md transition-colors",
                day_selected: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white",
                day_today: "bg-gray-100 text-gray-900 font-semibold",
                day_outside: "text-gray-400 opacity-50",
              }}
            />
            <div className="mt-4 pt-4 border-t border-gray-200">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={true}
                  readOnly
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-default"
                />
                <span>Dia com compromissos</span>
              </label>
            </div>
          </div>

          {/* Lista de compromissos do dia selecionado */}
          <div className="col-span-2 space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedDate 
                  ? format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })
                  : "Selecione uma data"}
              </h3>
              
              {selectedDayCommitments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhum compromisso agendado para este dia.
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDayCommitments.map((commitment) => (
                    <div 
                      key={commitment.id} 
                      onClick={() => onSelectCommitment(commitment)}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium text-white ${getPriorityColor(commitment.priority)}`}>
                            {getPriorityLabel(commitment.priority)}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(commitment.status)}`}>
                            {getStatusLabel(commitment.status)}
                          </span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditCommitment(commitment);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      
                      <h4 className="font-medium text-gray-900 text-sm mb-2">{commitment.title}</h4>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {commitment.startTime} - {commitment.endTime}
                        </span>
                        {commitment.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {commitment.location}
                          </span>
                        )}
                        {commitment.project && (
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            {commitment.project}
                          </span>
                        )}
                      </div>
                      
                      {commitment.participants.length > 0 && (
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                          <Users className="w-3 h-3 text-gray-400" />
                          <div className="flex items-center gap-1">
                            {commitment.participants.map((participant, idx) => (
                              <div 
                                key={idx}
                                className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                                title={participant}
                              >
                                {participant}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {viewMode === "list" && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase">Título</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase">Data</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase">Horário</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase">Local</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase">Projeto</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase">Prioridade</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCommitments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-8 text-center text-gray-500">
                      Nenhum compromisso encontrado com os filtros aplicados.
                    </td>
                  </tr>
                ) : (
                  filteredCommitments
                    .sort((a, b) => {
                      // Ordenar por data e depois por horário
                      const dateCompare = a.date.localeCompare(b.date);
                      if (dateCompare !== 0) return dateCompare;
                      return a.startTime.localeCompare(b.startTime);
                    })
                    .map((commitment) => {
                      const commitmentDate = parseISO(commitment.date);
                      return (
                        <tr 
                          key={commitment.id} 
                          onClick={() => onSelectCommitment(commitment)}
                          className="hover:bg-gray-50 cursor-pointer"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-gray-900 text-sm">{commitment.title}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-sm text-gray-600">
                              {format(commitmentDate, "dd/MM/yyyy", { locale: ptBR })}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-sm text-gray-600">
                              {commitment.startTime} - {commitment.endTime}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-sm text-gray-600">
                              {commitment.location || "-"}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            {commitment.project ? (
                              <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                {commitment.project}
                              </span>
                            ) : (
                              <span className="text-sm text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(commitment.status)}`}>
                              {getStatusLabel(commitment.status)}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getPriorityColor(commitment.priority)}`}>
                              {getPriorityLabel(commitment.priority)}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                onEditCommitment(commitment);
                              }}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <MoreHorizontal className="w-4 h-4 text-gray-400" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

