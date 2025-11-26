import { useState } from "react";
import { 
  X, 
  Clock, 
  Edit, 
  Share2, 
  Trash2, 
  MapPin,
  Users,
  Calendar as CalendarIcon,
  Bell
} from "lucide-react";
import { Commitment } from "../../types";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

interface CommitmentDetailModalProps {
  commitment: Commitment;
  onClose: () => void;
  onEdit?: () => void;
}

export default function CommitmentDetailModal({ 
  commitment, 
  onClose, 
  onEdit 
}: CommitmentDetailModalProps) {
  const commitmentDate = parseISO(commitment.date);

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

  const getReminderLabel = (reminder?: string) => {
    if (!reminder) return "Nenhum";
    switch (reminder) {
      case "15min": return "15 minutos antes";
      case "30min": return "30 minutos antes";
      case "1h": return "1 hora antes";
      case "1day": return "1 dia antes";
      default: return reminder;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getPriorityColor(commitment.priority)}`}>
                  {getPriorityLabel(commitment.priority)}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(commitment.status)}`}>
                  {getStatusLabel(commitment.status)}
                </span>
                {commitment.project && (
                  <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    {commitment.project}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{commitment.title}</h2>
              {commitment.description && (
                <p className="text-sm text-gray-600">
                  {commitment.description}
                </p>
              )}
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {format(commitmentDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {commitment.startTime} - {commitment.endTime}
              </span>
            </div>
            {commitment.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{commitment.location}</span>
              </div>
            )}
            {commitment.reminder && (
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{getReminderLabel(commitment.reminder)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="col-span-2 space-y-6">
              {/* Description */}
              {commitment.description && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Descrição</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {commitment.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Participants */}
              {commitment.participants.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Participantes ({commitment.participants.length})
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-wrap gap-3">
                      {commitment.participants.map((participant, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg"
                        >
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {participant}
                          </div>
                          <span className="text-sm font-medium text-gray-900">Membro do time</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Ações</h3>
                <div className="space-y-2">
                  <button 
                    onClick={onEdit}
                    className="w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Editar compromisso
                  </button>
                  <button className="w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Compartilhar
                  </button>
                  <button className="w-full px-3 py-2 bg-red-50 hover:bg-red-100 rounded text-sm font-medium text-red-700 flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Excluir compromisso
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Informações</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Data</p>
                    <p className="text-sm font-medium text-gray-900">
                      {format(commitmentDate, "dd/MM/yyyy", { locale: ptBR })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Horário</p>
                    <p className="text-sm font-medium text-gray-900">
                      {commitment.startTime} - {commitment.endTime}
                    </p>
                  </div>
                  {commitment.location && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Localização</p>
                      <p className="text-sm font-medium text-gray-900">{commitment.location}</p>
                    </div>
                  )}
                  {commitment.project && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Projeto</p>
                      <p className="text-sm font-medium text-gray-900">{commitment.project}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(commitment.status)}`}>
                      {getStatusLabel(commitment.status)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Prioridade</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium text-white ${getPriorityColor(commitment.priority)}`}>
                      {getPriorityLabel(commitment.priority)}
                    </span>
                  </div>
                  {commitment.reminder && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Lembrete</p>
                      <p className="text-sm font-medium text-gray-900">
                        {getReminderLabel(commitment.reminder)}
                      </p>
                    </div>
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

