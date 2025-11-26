import { useState, useEffect } from "react";
import { X, Calendar, Clock, MapPin, Users, Bell, FileText, Tag } from "lucide-react";
import { Commitment } from "../../types";

interface CommitmentFormModalProps {
  commitment?: Commitment | null;
  onClose: () => void;
  onSave: (commitment: Omit<Commitment, "id">) => void;
  projects?: string[];
}

export default function CommitmentFormModal({ 
  commitment, 
  onClose, 
  onSave, 
  projects = [] 
}: CommitmentFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    participants: [] as string[],
    project: "",
    status: "scheduled" as "scheduled" | "completed" | "cancelled",
    priority: "medium" as "low" | "medium" | "high",
    reminder: "",
  });

  const [selectedParticipant, setSelectedParticipant] = useState("");

  useEffect(() => {
    if (commitment) {
      setFormData({
        title: commitment.title,
        description: commitment.description || "",
        date: commitment.date,
        startTime: commitment.startTime,
        endTime: commitment.endTime,
        location: commitment.location || "",
        participants: commitment.participants || [],
        project: commitment.project || "",
        status: commitment.status,
        priority: commitment.priority,
        reminder: commitment.reminder || "",
      });
    } else {
      // Definir data padrão como hoje
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, date: today }));
    }
  }, [commitment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateTime()) {
      alert("O horário de término deve ser posterior ao horário de início");
      return;
    }
    
    const newCommitment: Omit<Commitment, "id"> = {
      ...formData,
    };

    onSave(newCommitment);
    onClose();
  };

  const availableProjects = projects.length > 0 ? projects : [
    "Backend API",
    "Frontend",
    "E-commerce",
    "App Mobile",
    "Dashboard Analytics",
    "Notificações",
    "DevOps",
    "Marketing"
  ];

  const teamMembers = ["RC", "AS", "JL", "MF"];

  const addParticipant = () => {
    if (selectedParticipant && !formData.participants.includes(selectedParticipant)) {
      setFormData({
        ...formData,
        participants: [...formData.participants, selectedParticipant]
      });
      setSelectedParticipant("");
    }
  };

  const handleParticipantKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addParticipant();
    }
  };

  const validateTime = () => {
    if (formData.startTime && formData.endTime) {
      return formData.endTime > formData.startTime;
    }
    return true;
  };

  const removeParticipant = (participant: string) => {
    setFormData({
      ...formData,
      participants: formData.participants.filter(p => p !== participant)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {commitment ? "Editar Compromisso" : "Novo Compromisso"}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Título */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-gray-500" />
                Título *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Reunião de planejamento"
              />
            </div>

            {/* Data e Horário */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  Data *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    Início *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      !validateTime() && formData.startTime && formData.endTime 
                        ? "border-red-300" 
                        : "border-gray-200"
                    }`}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    Término *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      !validateTime() && formData.startTime && formData.endTime 
                        ? "border-red-300" 
                        : "border-gray-200"
                    }`}
                  />
                </div>
              </div>
              {!validateTime() && formData.startTime && formData.endTime && (
                <p className="text-xs text-red-600">O horário de término deve ser posterior ao horário de início</p>
              )}
            </div>

            {/* Localização e Projeto */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  Localização
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Sala de reuniões A"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  Projeto
                </label>
                <select
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Nenhum</option>
                  {availableProjects.map((proj) => (
                    <option key={proj} value={proj}>
                      {proj}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status e Prioridade */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  Status *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="scheduled">Agendado</option>
                  <option value="completed">Concluído</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  Prioridade *
                </label>
                <select
                  required
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </select>
              </div>
            </div>

            {/* Participantes */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 text-gray-500" />
                Participantes
              </label>
              <div className="flex gap-2 mb-2">
                <select
                  value={selectedParticipant}
                  onChange={(e) => setSelectedParticipant(e.target.value)}
                  onKeyDown={handleParticipantKeyDown}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecione um membro</option>
                  {teamMembers
                    .filter(member => !formData.participants.includes(member))
                    .map((member) => (
                      <option key={member} value={member}>
                        {member}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={addParticipant}
                  disabled={!selectedParticipant}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Adicionar
                </button>
              </div>
              {formData.participants.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.participants.map((participant) => (
                    <div
                      key={participant}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-200"
                    >
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {participant}
                      </div>
                      <span className="font-medium">{participant}</span>
                      <button
                        type="button"
                        onClick={() => removeParticipant(participant)}
                        className="text-blue-500 hover:text-blue-700 ml-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Lembrete */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Bell className="w-4 h-4 text-gray-500" />
                Lembrete
              </label>
              <select
                value={formData.reminder}
                onChange={(e) => setFormData({ ...formData, reminder: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Nenhum</option>
                <option value="15min">15 minutos antes</option>
                <option value="30min">30 minutos antes</option>
                <option value="1h">1 hora antes</option>
                <option value="1day">1 dia antes</option>
              </select>
            </div>

            {/* Descrição */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-gray-500" />
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Descreva o compromisso em detalhes..."
              />
            </div>
          </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-gray-200 flex-shrink-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              {commitment ? "Salvar Alterações" : "Criar Compromisso"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

