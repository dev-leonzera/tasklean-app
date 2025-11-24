import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Sprint } from "../../types";

interface SprintFormModalProps {
  sprint?: Sprint | null;
  onClose: () => void;
  onSave: (sprint: Omit<Sprint, "id">) => void;
}

export default function SprintFormModal({ sprint, onClose, onSave }: SprintFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    status: "active",
    startDate: "",
    endDate: "",
    team: [] as string[],
  });

  const [memberInput, setMemberInput] = useState("");

  useEffect(() => {
    if (sprint) {
      setFormData({
        name: sprint.name,
        status: sprint.status,
        startDate: sprint.startDate,
        endDate: sprint.endDate,
        team: [...sprint.team],
      });
    }
  }, [sprint]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSprint: Omit<Sprint, "id"> = {
      ...formData,
      progress: sprint?.progress || 0,
      tasks: sprint?.tasks || { total: 0, completed: 0 },
    };

    onSave(newSprint);
    onClose();
  };

  const addMember = () => {
    if (memberInput.trim() && !formData.team.includes(memberInput.trim())) {
      setFormData({
        ...formData,
        team: [...formData.team, memberInput.trim()],
      });
      setMemberInput("");
    }
  };

  const removeMember = (member: string) => {
    setFormData({
      ...formData,
      team: formData.team.filter((m) => m !== member),
    });
  };

  const teamMembers = ["RC", "AS", "JL", "MF"];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {sprint ? "Editar Sprint" : "Novo Sprint"}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="space-y-5">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Sprint *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Sprint 12"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Ativo</option>
                <option value="completed">Concluído</option>
                <option value="planned">Planejado</option>
              </select>
            </div>

            {/* Datas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Início *
                </label>
                <input
                  type="text"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 20 Nov"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Término *
                </label>
                <input
                  type="text"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 03 Dez"
                />
              </div>
            </div>

            {/* Equipe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipe do Sprint
              </label>
              <div className="flex gap-2 mb-3">
                <select
                  value={memberInput}
                  onChange={(e) => setMemberInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione um membro</option>
                  {teamMembers
                    .filter((m) => !formData.team.includes(m))
                    .map((member) => (
                      <option key={member} value={member}>
                        {member}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={addMember}
                  disabled={!memberInput}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Adicionar
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.team.map((member, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    <span>{member}</span>
                    <button
                      type="button"
                      onClick={() => removeMember(member)}
                      className="hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              {sprint ? "Salvar Alterações" : "Criar Sprint"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

