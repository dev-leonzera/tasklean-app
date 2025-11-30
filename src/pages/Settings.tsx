import { useState, useEffect } from "react";
import { getInitials } from "../utils/avatar";
import { useAuth } from "../contexts/AuthContext";
import { apiService } from "../services/api";
import { 
  User, 
  CreditCard, 
  Bell, 
  Users, 
  Shield, 
  DollarSign,
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";

type SettingsSection = "Perfil" | "Conta" | "Notificações" | "Equipe" | "Segurança" | "Billing";

export default function SettingsView() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("Perfil");
  const [showPassword, setShowPassword] = useState(false);

  const menuItems: { label: SettingsSection; icon: any }[] = [
    { label: "Perfil", icon: User },
    { label: "Conta", icon: CreditCard },
    { label: "Notificações", icon: Bell },
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
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<{ name: string; email: string; bio?: string; jobTitle?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (user?.id) {
        try {
          setLoading(true);
          const userData = await apiService.getUserById(user.id);
          setProfileData({
            name: userData.name,
            email: userData.email,
            bio: "",
            jobTitle: ""
          });
        } catch (error) {
          console.error("Erro ao carregar perfil:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProfile();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações do Perfil</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
            <input
              type="text"
              defaultValue={profileData?.name || ""}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue={profileData?.email || ""}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
            <input
              type="text"
              defaultValue={profileData?.jobTitle || ""}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              rows={3}
              defaultValue={profileData?.bio || ""}
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
  const { user } = useAuth();
  const [accountData, setAccountData] = useState<{ username: string; language: string; timezone: string; dateFormat: string }>({
    username: "",
    language: "Português (Brasil)",
    timezone: "America/Sao_Paulo (GMT-3)",
    dateFormat: "DD/MM/YYYY"
  });
  const [initialState, setInitialState] = useState<{ username: string; language: string; timezone: string; dateFormat: string }>({
    username: "",
    language: "Português (Brasil)",
    timezone: "America/Sao_Paulo (GMT-3)",
    dateFormat: "DD/MM/YYYY"
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const loadAccount = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const userData = await apiService.getUserById(user.id);
        
        const defaultData = {
          username: userData.username || userData.email.split("@")[0],
          language: userData.language || "Português (Brasil)",
          timezone: userData.timezone || "America/Sao_Paulo (GMT-3)",
          dateFormat: userData.dateFormat || "DD/MM/YYYY"
        };

        setAccountData(defaultData);
        setInitialState(defaultData);
      } catch (error) {
        console.error("Erro ao carregar dados da conta:", error);
        const defaultData = {
          username: user?.email?.split("@")[0] || "",
          language: "Português (Brasil)",
          timezone: "America/Sao_Paulo (GMT-3)",
          dateFormat: "DD/MM/YYYY"
        };
        setAccountData(defaultData);
        setInitialState(defaultData);
      } finally {
        setLoading(false);
      }
    };

    loadAccount();
  }, [user?.id, user?.email]);

  const handleChange = (field: keyof typeof accountData, value: string) => {
    setAccountData((prev) => {
      const updated = { ...prev, [field]: value };
      const changed = JSON.stringify(updated) !== JSON.stringify(initialState);
      setHasChanges(changed);
      return updated;
    });
  };

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      setSaving(true);
      await apiService.updateUser(user.id, {
        username: accountData.username,
        language: accountData.language,
        timezone: accountData.timezone,
        dateFormat: accountData.dateFormat,
      });

      setInitialState(accountData);
      setHasChanges(false);
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      alert("Erro ao salvar configurações. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setAccountData(initialState);
    setHasChanges(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações da Conta</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome de usuário</label>
            <input
              type="text"
              value={accountData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Este será seu identificador único na plataforma</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
            <select 
              value={accountData.language}
              onChange={(e) => handleChange("language", e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Português (Brasil)</option>
              <option>English (US)</option>
              <option>Español</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fuso horário</label>
            <select 
              value={accountData.timezone}
              onChange={(e) => handleChange("timezone", e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>America/Sao_Paulo (GMT-3)</option>
              <option>America/New_York (GMT-5)</option>
              <option>Europe/London (GMT+0)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Formato de data</label>
            <select 
              value={accountData.dateFormat}
              onChange={(e) => handleChange("dateFormat", e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleCancel}
          disabled={!hasChanges}
          className={`px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium ${
            hasChanges
              ? "text-gray-700 hover:bg-gray-50"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            hasChanges && !saving
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {saving ? "Salvando..." : "Salvar alterações"}
        </button>
      </div>
    </div>
  );
}

function NotificacoesSection() {
  const { user } = useAuth();
  const [pushNotifications, setPushNotifications] = useState<Record<string, boolean>>({
    "Tarefas urgentes": true,
    "Lembretes de prazo": true,
    "Mensagens diretas": true,
    "Atualizações de sprint": false,
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [initialState, setInitialState] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Mapeamento entre chaves do frontend e da API
  const keyMapping = {
    "Tarefas urgentes": "urgentTasks",
    "Lembretes de prazo": "deadlineReminders",
    "Mensagens diretas": "directMessages",
    "Atualizações de sprint": "sprintUpdates",
  } as const;

  // Mapeamento reverso (API -> Frontend)
  const reverseKeyMapping = {
    urgentTasks: "Tarefas urgentes",
    deadlineReminders: "Lembretes de prazo",
    directMessages: "Mensagens diretas",
    sprintUpdates: "Atualizações de sprint",
  } as const;

  useEffect(() => {
    const loadSettings = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const userData = await apiService.getUserById(user.id);
        
        const defaultSettings = {
          "Tarefas urgentes": true,
          "Lembretes de prazo": true,
          "Mensagens diretas": true,
          "Atualizações de sprint": false,
        };

        if (userData.pushNotificationSettings) {
          // Converter da API para o formato do frontend
          const apiSettings = userData.pushNotificationSettings;
          const frontendSettings: Record<string, boolean> = {};
          
          Object.entries(reverseKeyMapping).forEach(([apiKey, frontendKey]) => {
            frontendSettings[frontendKey] = apiSettings[apiKey as keyof typeof apiSettings] ?? defaultSettings[frontendKey];
          });

          setPushNotifications(frontendSettings);
          setInitialState(frontendSettings);
        } else {
          setPushNotifications(defaultSettings);
          setInitialState(defaultSettings);
        }
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
        const defaultSettings = {
          "Tarefas urgentes": true,
          "Lembretes de prazo": true,
          "Mensagens diretas": true,
          "Atualizações de sprint": false,
        };
        setPushNotifications(defaultSettings);
        setInitialState(defaultSettings);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [user?.id]);

  const toggleNotification = (key: string) => {
    setPushNotifications((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      // Verificar se houve mudanças
      const changed = JSON.stringify(updated) !== JSON.stringify(initialState);
      setHasChanges(changed);
      return updated;
    });
  };

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      setSaving(true);
      
      // Converter do formato do frontend para o formato da API
      const apiSettings: {
        urgentTasks?: boolean;
        deadlineReminders?: boolean;
        directMessages?: boolean;
        sprintUpdates?: boolean;
      } = {};

      Object.entries(keyMapping).forEach(([frontendKey, apiKey]) => {
        apiSettings[apiKey] = pushNotifications[frontendKey];
      });

      await apiService.updateUser(user.id, {
        pushNotificationSettings: apiSettings,
      });

      setInitialState(pushNotifications);
      setHasChanges(false);
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      alert("Erro ao salvar configurações. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Restaurar valores iniciais
    setPushNotifications(initialState);
    setHasChanges(false);
  };

  const notificationOptions = [
    { key: "Tarefas urgentes", label: "Tarefas urgentes" },
    { key: "Lembretes de prazo", label: "Lembretes de prazo" },
    { key: "Mensagens diretas", label: "Mensagens diretas" },
    { key: "Atualizações de sprint", label: "Atualizações de sprint" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notificações Push</h3>
        <div className="space-y-4">
          {notificationOptions.map((option) => (
            <div key={option.key} className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-700">{option.label}</span>
              </div>
              <button
                onClick={() => toggleNotification(option.key)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  pushNotifications[option.key] ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    pushNotifications[option.key] ? "translate-x-5" : ""
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
        <button
          onClick={handleCancel}
          disabled={!hasChanges}
          className={`px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium ${
            hasChanges
              ? "text-gray-700 hover:bg-gray-50"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            hasChanges && !saving
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {saving ? "Salvando..." : "Salvar alterações"}
        </button>
      </div>
    </div>
  );
}

function EquipeSection() {
  const { user } = useAuth();
  const [members, setMembers] = useState<{ name: string; email: string; role: string; avatar: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        setLoading(true);
        const users = await apiService.getUsers();
        const teamMembers = users.map((u) => ({
          name: u.name,
          email: u.email,
          role: u.id === user?.id ? "Admin" : "Membro",
          avatar: getInitials(u.name)
        }));
        setMembers(teamMembers);
      } catch (error) {
        console.error("Erro ao carregar membros da equipe:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
          <p className="text-sm text-gray-500 text-center py-4">Nenhum convite pendente no momento</p>
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

