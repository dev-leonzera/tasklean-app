import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, Shield, Clock, Users, Layers } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import logoTasklean from "../assets/logo_tasklean.png";
import { useAuth } from "../contexts/AuthContext";

interface RegisterProps {
  onNavigateToLogin: () => void;
  onRegisterSuccess: () => void;
}

export default function Register({ onNavigateToLogin, onRegisterSuccess }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validações
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsLoading(true);
    
    try {
      await register(name, email, password);
      onRegisterSuccess();
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Layers,
      title: "Gestão de Projetos",
      description: "Organize todos os seus projetos em um só lugar",
      color: "#8b5cf6"
    },
    {
      icon: Clock,
      title: "Sprints Ágeis",
      description: "Planeje e acompanhe sprints com facilidade",
      color: "#3b82f6"
    },
    {
      icon: Users,
      title: "Colaboração em Equipe",
      description: "Trabalhe em conjunto com sua equipe em tempo real",
      color: "#10b981"
    },
    {
      icon: Shield,
      title: "Segurança Garantida",
      description: "Seus dados protegidos com criptografia avançada",
      color: "#f59e0b"
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Lado Esquerdo - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Header mobile */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <img 
              src={logoTasklean} 
              alt="Tasklean" 
              className="h-14 w-auto"
            />
          </div>

          {/* Título */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Crie sua conta
            </h1>
            <p className="text-gray-500">
              Comece a gerenciar seus projetos de forma mais inteligente
            </p>
          </div>

          {/* Divisor */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div 
                className="px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                style={{ 
                  background: 'rgba(239, 68, 68, 0.1)', 
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#dc2626'
                }}
              >
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(239, 68, 68, 0.2)' }}
                >
                  <span className="text-xs" style={{ color: '#dc2626' }}>!</span>
                </div>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Nome completo
              </Label>
              <div className="relative">
                <User 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200"
                  style={{ color: focusedField === 'name' ? '#8b5cf6' : '#9ca3af' }}
                />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="pl-12 h-12 bg-white border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-purple-600 focus:ring-purple-100 focus:ring-4 transition-all duration-200"
                  style={{ padding:'0 35px' }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                E-mail
              </Label>
              <div className="relative">
                <Mail 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200"
                  style={{ color: focusedField === 'email' ? '#8b5cf6' : '#9ca3af' }}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="pl-12 h-12 bg-white border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-purple-600 focus:ring-purple-100 focus:ring-4 transition-all duration-200"
                  style={{ padding:'0 35px' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Lock 
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200"
                    style={{ color: focusedField === 'password' ? '#8b5cf6' : '#9ca3af' }}
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="pl-12 h-12 bg-white border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-purple-600 focus:ring-purple-100 focus:ring-4 transition-all duration-200"
                    style={{ padding:'0 35px' }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                  Confirmar
                </Label>
                <div className="relative">
                  <Lock 
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200"
                    style={{ color: focusedField === 'confirmPassword' ? '#8b5cf6' : '#9ca3af' }}
                  />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="pl-12 h-12 bg-white border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-purple-600 focus:ring-purple-100 focus:ring-4 transition-all duration-200"
                    style={{ padding:'0 35px' }}
                  />
                </div>
              </div>
            </div>
            
            <p className="text-xs text-gray-400">Mínimo de 6 caracteres</p>

            <Button
              type="submit"
              className="w-full h-12 text-white font-semibold rounded-xl flex items-center justify-center gap-2 group transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)',
                boxShadow: '0 10px 30px rgba(124, 58, 237, 0.35)'
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div 
                  className="w-5 h-5 rounded-full animate-spin"
                  style={{ border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white' }}
                ></div>
              ) : (
                <>
                  Criar conta
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Divisor */}
          <div className="relative my-6" style={{ margin: '20px 0' }}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-50 text-gray-400">ou continue com</span>
            </div>
          </div>

          {/* Botões sociais */}
          {/* <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 h-12 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 h-12 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div> */}

          {/* Link para login */}
          <p className="mt-6 text-center text-gray-500">
            Já tem uma conta?{" "}
            <button
              onClick={onNavigateToLogin}
              className="font-semibold transition-colors"
              style={{ color: '#7c3aed' }}
            >
              Entrar
            </button>
          </p>

          {/* Termos */}
          <p className="mt-4 text-center text-xs text-gray-400">
            Ao criar uma conta, você concorda com nossos{" "}
            <a href="#" className="underline" style={{ color: '#7c3aed' }}>
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a href="#" className="underline" style={{ color: '#7c3aed' }}>
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>

      {/* Lado Direito - Branding & Features */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-lg"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)'
        }}
      >
        {/* Padrão de fundo */}
        <div className="absolute inset-0">
          <div 
            className="absolute rounded-full blur-[130px]"
            style={{
              top: '10rem',
              right: '5rem',
              width: '20rem',
              height: '20rem',
              background: 'rgba(192, 38, 211, 0.35)'
            }}
          ></div>
          <div 
            className="absolute rounded-full blur-[150px]"
            style={{
              bottom: '5rem',
              left: '5rem',
              width: '24rem',
              height: '24rem',
              background: 'rgba(139, 92, 246, 0.4)'
            }}
          ></div>
          <div 
            className="absolute rounded-full blur-[100px]"
            style={{
              top: '25%',
              left: '25%',
              width: '16rem',
              height: '16rem',
              background: 'rgba(59, 130, 246, 0.3)'
            }}
          ></div>
        </div>
        
        {/* Grid decorativo */}
        <div 
          className="absolute inset-0"
          style={{
            opacity: 0.1,
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>

        {/* Conteúdo */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full" style={{ padding: '16px' }}>        
          {/* Features */}
          <div className="flex-1 flex flex-col justify-center py-12">
            <p className="text-lg mb-10 max-w-md" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Uma plataforma completa para transformar a forma como você trabalha
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="rounded-3xl p-5 transition-all duration-300 group cursor-pointer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{
                      background: `rgba(${feature.color === '#8b5cf6' ? '139, 92, 246' : feature.color === '#3b82f6' ? '59, 130, 246' : feature.color === '#10b981' ? '16, 185, 129' : '245, 158, 11'}, 0.2)`,
                      border: `1px solid ${feature.color}40`
                    }}
                  >
                    <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div 
            className="rounded-3xl p-6"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginTop: '16px'
            }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)' }}
              >
                M
              </div>
              <div>
                <p className="italic mb-3" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  "O Tasklean revolucionou a forma como gerenciamos nossos projetos. A produtividade da equipe aumentou em 40%!"
                </p>
                <div>
                  <p className="text-white font-medium">Mariana Silva</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Tech Lead @ StartupX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
