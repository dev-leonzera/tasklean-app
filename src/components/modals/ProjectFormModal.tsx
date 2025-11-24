import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Project } from "../../types";

interface ProjectFormModalProps {
  project?: Project | null;
  onClose: () => void;
  onSave: (project: Omit<Project, "id">) => void;
}

export default function ProjectFormModal({ project, onClose, onSave }: ProjectFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    status: "starting",
    due: "",
    color: "#3B82F6",
    members: [] as string[],
  });

  const [memberInput, setMemberInput] = useState("");

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        desc: project.desc,
        status: project.status,
        due: project.due,
        color: project.color,
        members: [...project.members],
      });
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProject: Omit<Project, "id"> = {
      ...formData,
      progress: project?.progress || 0,
      tasks: project?.tasks || 0,
      completed: project?.completed || 0,
    };

    onSave(newProject);
    onClose();
  };

  const addMember = () => {
    if (memberInput.trim() && !formData.members.includes(memberInput.trim())) {
      setFormData({
        ...formData,
        members: [...formData.members, memberInput.trim()],
      });
      setMemberInput("");
    }
  };

  const removeMember = (member: string) => {
    setFormData({
      ...formData,
      members: formData.members.filter((m) => m !== member),
    });
  };

  const colors = [
    "#3B82F6", "#F59E0B", "#10B981", "#8B5CF6", 
    "#EC4899", "#64748B", "#EF4444", "#06B6D4"
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {project ? "Editar Projeto" : "Novo Projeto"}
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
                Nome do Projeto *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Backend API v2"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição *
              </label>
              <textarea
                required
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Descreva o projeto..."
              />
            </div>

            {/* Status e Cor */}
            <div className="grid grid-cols-2 gap-4">
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
                  <option value="starting">Iniciando</option>
                  <option value="progress">Em progresso</option>
                  <option value="finishing">Finalizando</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prazo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.due}
                  onChange={(e) => setFormData({ ...formData, due: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 15 Dez"
                />
              </div>
            </div>

            {/* Cor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cor do Projeto *
              </label>
              <div className="flex items-center gap-3">
                <div className="flex gap-2 flex-wrap">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      className={`w-10 h-10 rounded-lg border-2 transition-all ${
                        formData.color === color ? "border-gray-900 scale-110" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                />
              </div>
            </div>

            {/* Membros */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Membros da Equipe
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={memberInput}
                  onChange={(e) => setMemberInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addMember();
                    }
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite as iniciais do membro (ex: RC)"
                />
                <button
                  type="button"
                  onClick={addMember}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                >
                  Adicionar
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.members.map((member, i) => (
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
              {project ? "Salvar Alterações" : "Criar Projeto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

