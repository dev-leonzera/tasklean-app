import React from "react";
import { Search, Check, X, AlertCircle, Info, ChevronDown } from "lucide-react";

export function DesignSystem() {
  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900">Design System - Tasklean</h1>
        <p className="text-lg text-slate-600">
          Sistema de design completo com componentes, cores e tipografia reutilizáveis
        </p>
      </div>

      {/* Color Palette */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Paleta de Cores</h2>
          <p className="text-slate-600">Cores primárias, secundárias e de feedback</p>
        </div>
        
        <div className="space-y-8">
          {/* Primary - Blue */}
          <div className="space-y-3">
            <h4 className="font-medium text-slate-700">Primary - Azul</h4>
            <div className="grid grid-cols-5 gap-4">
              {[
                { name: "blue-50", hex: "#EFF6FF", color: "bg-blue-50" },
                { name: "blue-100", hex: "#DBEAFE", color: "bg-blue-100" },
                { name: "blue-400", hex: "#60A5FA", color: "bg-blue-400" },
                { name: "blue-500", hex: "#3B82F6", color: "bg-blue-500" },
                { name: "blue-600", hex: "#2563EB", color: "bg-blue-600" },
              ].map((color) => (
                <div key={color.name} className="space-y-2">
                  <div className={`${color.color} h-20 rounded-lg border border-slate-200 shadow-sm`}></div>
                  <p className="text-xs font-medium text-slate-900">{color.name}</p>
                  <p className="text-xs text-slate-500">{color.hex}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Neutral - Slate */}
          <div className="space-y-3">
            <h4 className="font-medium text-slate-700">Neutral - Slate</h4>
            <div className="grid grid-cols-6 gap-4">
              {[
                { name: "slate-50", hex: "#F8FAFC", color: "bg-slate-50" },
                { name: "slate-100", hex: "#F1F5F9", color: "bg-slate-100" },
                { name: "slate-200", hex: "#E2E8F0", color: "bg-slate-200" },
                { name: "slate-400", hex: "#94A3B8", color: "bg-slate-400" },
                { name: "slate-600", hex: "#475569", color: "bg-slate-600" },
                { name: "slate-900", hex: "#0F172A", color: "bg-slate-900" },
              ].map((color) => (
                <div key={color.name} className="space-y-2">
                  <div className={`${color.color} h-20 rounded-lg border border-slate-200 shadow-sm`}></div>
                  <p className="text-xs font-medium text-slate-900">{color.name}</p>
                  <p className="text-xs text-slate-500">{color.hex}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Colors */}
          <div className="space-y-3">
            <h4 className="font-medium text-slate-700">Feedback - Sucesso, Alerta, Erro</h4>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Sucesso", hex: "#10B981", color: "bg-emerald-500" },
                { name: "Alerta", hex: "#F59E0B", color: "bg-amber-500" },
                { name: "Erro", hex: "#EF4444", color: "bg-red-500" },
              ].map((color) => (
                <div key={color.name} className="space-y-2">
                  <div className={`${color.color} h-24 rounded-lg border border-slate-200 shadow-sm`}></div>
                  <p className="text-sm font-medium text-slate-900">{color.name}</p>
                  <p className="text-xs text-slate-500">{color.hex}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Tipografia</h2>
          <p className="text-slate-600">Hierarquia de textos e estilos</p>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-slate-900">Heading 1</h1>
            <p className="text-sm text-slate-500">4xl / Bold - Para títulos principais</p>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-semibold text-slate-900">Heading 2</h2>
            <p className="text-sm text-slate-500">3xl / Semibold - Para seções</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-semibold text-slate-900">Heading 3</h3>
            <p className="text-sm text-slate-500">2xl / Semibold - Para subtítulos</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-xl font-semibold text-slate-900">Heading 4</h4>
            <p className="text-sm text-slate-500">xl / Semibold - Para cards</p>
          </div>
          <div className="space-y-1">
            <p className="text-base text-slate-900">Parágrafo normal</p>
            <p className="text-sm text-slate-500">Base / Regular - Para corpo de texto</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-slate-600">Texto pequeno</p>
            <p className="text-sm text-slate-500">sm / Regular - Para legendas</p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Botões</h2>
          <p className="text-slate-600">Variações de botões para diferentes ações</p>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-8">
          <div className="space-y-4">
            <h4 className="font-medium text-slate-700">Primário</h4>
            <div className="flex flex-wrap items-center gap-3">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm">
                Button Primary
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium opacity-50 cursor-not-allowed">
                Disabled
              </button>
              <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors">
                Small
              </button>
              <button className="px-6 py-3 bg-blue-500 text-white rounded-lg text-base font-medium hover:bg-blue-600 transition-colors shadow-sm">
                Large
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-slate-700">Secundário</h4>
            <div className="flex flex-wrap items-center gap-3">
              <button className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                Button Secondary
              </button>
              <button className="px-4 py-2 bg-white text-slate-400 border border-slate-200 rounded-lg text-sm font-medium cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-slate-700">Ghost</h4>
            <div className="flex flex-wrap items-center gap-3">
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors">
                Button Ghost
              </button>
              <button className="px-4 py-2 text-slate-400 rounded-lg text-sm font-medium cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-slate-700">Estados de Feedback</h4>
            <div className="flex flex-wrap items-center gap-3">
              <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">
                Success
              </button>
              <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors">
                Warning
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                Error
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Inputs & Forms</h2>
          <p className="text-slate-600">Campos de formulário e controles</p>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6">
          <div className="space-y-3">
            <h4 className="font-medium text-slate-700">Input Padrão</h4>
            <input
              type="text"
              placeholder="Digite algo..."
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-slate-700">Input com Ícone</h4>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-slate-700">Input com Erro</h4>
            <input
              type="text"
              placeholder="Email inválido"
              className="w-full px-4 py-2 bg-white border-2 border-red-500 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />
            <p className="text-sm text-red-600 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              Por favor, insira um email válido
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-slate-700">Select</h4>
            <div className="relative">
              <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer">
                <option>Selecione uma opção</option>
                <option>Opção 1</option>
                <option>Opção 2</option>
                <option>Opção 3</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-slate-700">Textarea</h4>
            <textarea
              placeholder="Digite uma mensagem..."
              rows={4}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
          </div>
        </div>
      </section>

      {/* Badges & Tags */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Badges & Tags</h2>
          <p className="text-slate-600">Indicadores de status e categorias</p>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6">
          <div className="space-y-3">
            <h4 className="font-medium text-slate-700">Status Badges</h4>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                Em progresso
              </span>
              <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                Concluído
              </span>
              <span className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                Pendente
              </span>
              <span className="px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                Atrasado
              </span>
              <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                Rascunho
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-slate-700">Priority Badges</h4>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-red-500 text-white text-xs font-medium">
                Crítica
              </span>
              <span className="px-2.5 py-1 rounded bg-orange-500 text-white text-xs font-medium">
                Alta
              </span>
              <span className="px-2.5 py-1 rounded bg-blue-500 text-white text-xs font-medium">
                Média
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-400 text-white text-xs font-medium">
                Baixa
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Cards</h2>
          <p className="text-slate-600">Containers de conteúdo</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Card Padrão</h3>
            <p className="text-slate-600">
              Este é um card básico com borda e efeito de hover
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Card com Gradiente</h3>
            <p className="text-blue-100">
              Card com fundo gradiente para destacar conteúdo importante
            </p>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Alerts</h2>
          <p className="text-slate-600">Mensagens de feedback e notificações</p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-emerald-900 mb-1">Sucesso!</h4>
              <p className="text-sm text-emerald-700">Sua ação foi concluída com sucesso</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-amber-900 mb-1">Atenção</h4>
              <p className="text-sm text-amber-700">Revise as informações antes de continuar</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
              <X className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-red-900 mb-1">Erro</h4>
              <p className="text-sm text-red-700">Ocorreu um erro ao processar sua solicitação</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-blue-900 mb-1">Informação</h4>
              <p className="text-sm text-blue-700">Esta é uma informação importante para você</p>
            </div>
          </div>
        </div>
      </section>

      {/* Avatars */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Avatars</h2>
          <p className="text-slate-600">Representação visual de usuários</p>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg font-semibold shadow-sm">
              AS
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-base font-semibold shadow-sm">
              JL
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
              RC
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
              MF
            </div>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
              PT
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
