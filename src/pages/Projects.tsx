import React, { useState, useMemo } from "react";
import { Plus, CheckCircle2, Clock, MoreHorizontal, X } from "lucide-react";
import { Project } from "../types";
import { CustomSelect } from "../components/ui/custom-select";

interface ProjectsViewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onNewProject: () => void;
  onEditProject: (project: Project) => void;
}

export default function ProjectsView({ projects, onSelectProject, onNewProject, onEditProject }: ProjectsViewProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [progressFilter, setProgressFilter] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Filtro por status
    if (statusFilter !== "all") {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    // Filtro por progresso
    if (progressFilter !== "all") {
      filtered = filtered.filter(project => {
        if (progressFilter === "low") return project.progress < 33;
        if (progressFilter === "medium") return project.progress >= 33 && project.progress < 66;
        if (progressFilter === "high") return project.progress >= 66;
        return true;
      });
    }

    return filtered;
  }, [projects, statusFilter, progressFilter]);

  const clearFilters = () => {
    setStatusFilter("all");
    setProgressFilter("all");
  };

  const hasActiveFilters = statusFilter !== "all" || progressFilter !== "all";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Projetos</h1>
          <p className="text-sm text-gray-600 mt-1">Gerencie todos os seus projetos</p>
        </div>
        <button 
          onClick={onNewProject}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Novo Projeto
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
              { value: "starting", label: "Iniciando" },
              { value: "progress", label: "Em progresso" },
              { value: "finishing", label: "Finalizando" },
            ]}
            placeholder="Todos os status"
            className="w-[200px]"
          />
        </div>

        <div className="flex items-center gap-2 flex-1">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Progresso:</label>
          <CustomSelect
            value={progressFilter}
            onChange={setProgressFilter}
            options={[
              { value: "all", label: "Todos" },
              { value: "low", label: "Baixo (0-33%)" },
              { value: "medium", label: "Médio (33-66%)" },
              { value: "high", label: "Alto (66-100%)" },
            ]}
            placeholder="Todos"
            className="w-[200px]"
          />
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            Limpar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {filteredProjects.length === 0 ? (
          <div className="col-span-3 text-center py-12">
            <p className="text-gray-500">Nenhum projeto encontrado com os filtros aplicados.</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
          <div 
            key={project.id} 
            onClick={() => onSelectProject(project)}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
          >
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }}></div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditProject(project);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded"
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{project.desc}</p>
              
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                project.status === "finishing" ? "bg-green-100 text-green-700" :
                project.status === "progress" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700"
              }`}>
                {project.status === "finishing" ? "Finalizando" :
                 project.status === "progress" ? "Em progresso" : "Iniciando"}
              </span>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progresso</span>
                  <span className="font-semibold text-gray-900">{project.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${project.progress}%`, backgroundColor: project.color }}></div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  {project.completed}/{project.tasks}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {project.due}
                </span>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex -space-x-2">
                  {project.members.map((member, i) => (
                    <div key={i} className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white">
                      {member}
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
    </div>
  );
}

