import { useState } from "react";
import { getInitials } from "../utils/avatar";
import { 
  User, 
  CreditCard, 
  Bell, 
  Plug, 
  Users, 
  Shield, 
  DollarSign,
  Trash2,
  Key,
  Smartphone,
  Mail,
  Globe,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

type SettingsSection = "Perfil" | "Conta" | "Notificações" | "Integrações" | "Equipe" | "Segurança" | "Billing";

export default function SettingsView() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("Perfil");
  const [showPassword, setShowPassword] = useState(false);

  const menuItems: { label: SettingsSection; icon: any }[] = [
    { label: "Perfil", icon: User },
    { label: "Conta", icon: CreditCard },
    { label: "Notificações", icon: Bell },
    { label: "Integrações", icon: Plug },
    { label: "Equipe", icon: Users },
    { label: "Segurança", icon: Shield },
    { label: "Billing", icon: DollarSign },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "Perfil":
        return <PerfilSection />;
      case "Conta":
        return <ContaSection />;
      case "Notificações":
        return <NotificacoesSection />;
      case "Integrações":
        return <IntegracoesSection />;
      case "Equipe":
        return <EquipeSection />;
      case "Segurança":
        return <SegurancaSection showPassword={showPassword} setShowPassword={setShowPassword} />;
      case "Billing":
        return <BillingSection />;
      default:
        return <PerfilSection />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Configurações</h1>
        <p className="text-sm text-gray-600 mt-1">Gerencie suas preferências e configurações</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.label;
              
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveSection(item.label)}
                  className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="col-span-2">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}

function PerfilSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações do Perfil</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
            <input
              type="text"
              defaultValue="Ana Silva"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue="ana.silva@tasklean.com"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
            <input
              type="text"
              defaultValue="Product Manager"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              rows={3}
              defaultValue="Product Manager apaixonada por criar experiências incríveis."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferências</h3>
        <div className="space-y-4">
          {[
            { label: "Notificações por email", checked: true },
            { label: "Notificações push", checked: true },
            { label: "Newsletter semanal", checked: false },
            { label: "Modo escuro", checked: false },
          ].map((pref, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{pref.label}</span>
              <button
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  pref.checked ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    pref.checked ? "translate-x-5" : ""
                  }`}
                ></span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancelar
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          Salvar alterações
        </button>
      </div>
    </div>
  );
}

function ContaSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações da Conta</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome de usuário</label>
            <input
              type="text"
              defaultValue="ana.silva"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Este será seu identificador único na plataforma</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Português (Brasil)</option>
              <option>English (US)</option>
              <option>Español</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fuso horário</label>
            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>America/Sao_Paulo (GMT-3)</option>
              <option>America/New_York (GMT-5)</option>
              <option>Europe/London (GMT+0)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Formato de data</label>
            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-red-600">Zona de Perigo</h3>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-gray-700 mb-3">Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser desfeita.</p>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
              <Trash2 className="w-4 h-4" />
              Excluir conta
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancelar
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          Salvar alterações
        </button>
      </div>
    </div>
  );
}

function NotificacoesSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notificações por Email</h3>
        <div className="space-y-4">
          {[
            { label: "Tarefas atribuídas a mim", checked: true },
            { label: "Mudanças em tarefas que sigo", checked: true },
            { label: "Comentários em minhas tarefas", checked: true },
            { label: "Mencionado em comentários", checked: true },
            { label: "Atualizações de projeto", checked: false },
            { label: "Resumo diário", checked: true },
            { label: "Resumo semanal", checked: false },
          ].map((pref, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-700">{pref.label}</span>
              </div>
              <button
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  pref.checked ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    pref.checked ? "translate-x-5" : ""
                  }`}
                ></span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notificações Push</h3>
        <div className="space-y-4">
          {[
            { label: "Tarefas urgentes", checked: true },
            { label: "Lembretes de prazo", checked: true },
            { label: "Mensagens diretas", checked: true },
            { label: "Atualizações de sprint", checked: false },
          ].map((pref, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-700">{pref.label}</span>
              </div>
              <button
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  pref.checked ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    pref.checked ? "translate-x-5" : ""
                  }`}
                ></span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Horário de Notificações</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Horário de trabalho</label>
            <div className="flex items-center gap-3">
              <input
                type="time"
                defaultValue="09:00"
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">até</span>
              <input
                type="time"
                defaultValue="18:00"
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Notificações serão enviadas apenas durante este horário</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancelar
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          Salvar alterações
        </button>
      </div>
    </div>
  );
}

function IntegracoesSection() {
  const integrations = [
    { name: "Slack", description: "Receba notificações no Slack", connected: true, icon: "💬" },
    { name: "GitHub", description: "Conecte repositórios e issues", connected: true, icon: "💻" },
    { name: "Google Calendar", description: "Sincronize tarefas com seu calendário", connected: false, icon: "📅" },
    { name: "Jira", description: "Importe projetos do Jira", connected: false, icon: "🎯" },
    { name: "Microsoft Teams", description: "Integre com Teams", connected: false, icon: "👥" },
    { name: "Zapier", description: "Automatize workflows", connected: false, icon: "⚡" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrações Disponíveis</h3>
        <div className="space-y-3">
          {integrations.map((integration, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                  {integration.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{integration.name}</h4>
                  <p className="text-xs text-gray-600">{integration.description}</p>
                </div>
              </div>
              {integration.connected ? (
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Conectado</span>
                  <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50">
                    Desconectar
                  </button>
                </div>
              ) : (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  Conectar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Tokens</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Token de API</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                defaultValue="tkl_**********************"
                readOnly
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Copiar
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Regenerar
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Use este token para autenticar requisições à API</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EquipeSection() {
  const members = [
    { name: "Ana Silva", email: "ana.silva@tasklean.com", role: "Admin", avatar: "AS" },
    { name: "Ricardo Costa", email: "ricardo.costa@tasklean.com", role: "Membro", avatar: "RC" },
    { name: "Maria Ferreira", email: "maria.ferreira@tasklean.com", role: "Membro", avatar: "MF" },
    { name: "João Lima", email: "joao.lima@tasklean.com", role: "Membro", avatar: "JL" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Membros da Equipe</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            Adicionar membro
          </button>
        </div>
        <div className="space-y-3">
          {members.map((member, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {getInitials(member.name)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{member.name}</h4>
                  <p className="text-xs text-gray-600">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>{member.role}</option>
                  <option>Admin</option>
                  <option>Membro</option>
                  <option>Visualizador</option>
                </select>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Convites Pendentes</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">carlos.santos@tasklean.com</h4>
              <p className="text-xs text-gray-600">Convite enviado em 10/12/2024</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50">
                Reenviar
              </button>
              <button className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SegurancaSection({ showPassword, setShowPassword }: { showPassword: boolean; setShowPassword: (show: boolean) => void }) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alterar Senha</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha atual</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nova senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Mínimo de 8 caracteres, incluindo letras e números</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar nova senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Autenticação de Dois Fatores</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-gray-400" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Aplicativo Autenticador</h4>
                <p className="text-xs text-gray-600">Use um app como Google Authenticator</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              Configurar
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Email</h4>
                <p className="text-xs text-gray-600">Receba códigos por email</p>
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Configurar
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sessões Ativas</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Chrome no Windows</h4>
              <p className="text-xs text-gray-600">Último acesso: Hoje às 14:30</p>
              <p className="text-xs text-gray-500">IP: 192.168.1.100 • São Paulo, Brasil</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Atual</span>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Safari no iPhone</h4>
              <p className="text-xs text-gray-600">Último acesso: Ontem às 18:45</p>
              <p className="text-xs text-gray-500">IP: 192.168.1.101 • São Paulo, Brasil</p>
            </div>
            <button className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50">
              Revogar
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancelar
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          Salvar alterações
        </button>
      </div>
    </div>
  );
}

function BillingSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Plano Atual</h3>
            <p className="text-sm text-gray-600 mt-1">Gerencie sua assinatura e métodos de pagamento</p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Pro</span>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">Plano Pro</span>
            <span className="text-lg font-semibold text-gray-900">R$ 99,90/mês</span>
          </div>
          <p className="text-xs text-gray-600">Próxima cobrança em 15/01/2025</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Método de Pagamento</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                VISA
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">•••• •••• •••• 4242</h4>
                <p className="text-xs text-gray-600">Expira em 12/2026</p>
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Alterar
            </button>
          </div>
          <button className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
            <CreditCard className="w-4 h-4" />
            Adicionar novo método de pagamento
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Histórico de Faturas</h3>
        <div className="space-y-3">
          {[
            { date: "15/12/2024", amount: "R$ 99,90", status: "Paga", id: "INV-2024-12-001" },
            { date: "15/11/2024", amount: "R$ 99,90", status: "Paga", id: "INV-2024-11-001" },
            { date: "15/10/2024", amount: "R$ 99,90", status: "Paga", id: "INV-2024-10-001" },
          ].map((invoice, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div>
                <h4 className="text-sm font-semibold text-gray-900">{invoice.id}</h4>
                <p className="text-xs text-gray-600">{invoice.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-900">{invoice.amount}</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">{invoice.status}</span>
                <button className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alterar Plano</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: "Free", price: "R$ 0", features: ["Até 3 projetos", "5 membros", "Suporte por email"] },
            { name: "Pro", price: "R$ 99,90", features: ["Projetos ilimitados", "Membros ilimitados", "Suporte prioritário"], current: true },
            { name: "Enterprise", price: "Sob consulta", features: ["Tudo do Pro", "SSO", "Gerente de conta"], highlight: true },
          ].map((plan, i) => (
            <div
              key={i}
              className={`p-4 border rounded-lg ${
                plan.current
                  ? "border-blue-500 bg-blue-50"
                  : plan.highlight
                  ? "border-gray-200"
                  : "border-gray-200"
              }`}
            >
              <h4 className="text-sm font-semibold text-gray-900 mb-1">{plan.name}</h4>
              <p className="text-lg font-bold text-gray-900 mb-3">{plan.price}</p>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, j) => (
                  <li key={j} className="text-xs text-gray-600 flex items-center gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.current ? (
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium" disabled>
                  Plano Atual
                </button>
              ) : (
                <button className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Escolher plano
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

