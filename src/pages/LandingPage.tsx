import React from "react";
import { 
  CheckSquare, 
  Zap, 
  BarChart3, 
  FolderKanban, 
  Calendar, 
  Lock, 
  Heart, 
  Rocket, 
  ArrowRight, 
  Users,
  Menu,
  X,
  Star,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Shield,
  Quote,
  MessageSquare,
  Code,
  Globe,
  Bell,
  Target,
  Award,
  ArrowLeft
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

interface LandingPageProps {
  onNavigateToLogin: () => void;
  onNavigateToRegister: () => void;
}

export default function LandingPage({ onNavigateToLogin, onNavigateToRegister }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col max-h-screen gap-16 bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <CheckSquare className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Tasklean</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-6">
            <button 
              onClick={() => scrollToSection("features")} 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Recursos
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection("pricing")} 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Preços
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center justify-end gap-4">
            <Button variant="ghost" onClick={onNavigateToLogin}>
              Entrar
            </Button>
            <Button onClick={onNavigateToRegister}>
              Começar Grátis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t bg-background md:hidden">
            <div className="container flex flex-col gap-4 px-4 py-4">
              <button 
                onClick={() => scrollToSection("features")} 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground text-left"
              >
                Recursos
              </button>
              <button 
                onClick={() => scrollToSection("about")} 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground text-left"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection("pricing")} 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground text-left"
              >
                Preços
              </button>
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="ghost" onClick={onNavigateToLogin} className="w-full justify-start">
                  Entrar
                </Button>
                <Button onClick={onNavigateToRegister} className="w-full">
                  Começar Grátis
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-emerald-50/50 via-background to-blue-50/50 py-28 md:py-40 lg:py-52 mb-16 md:mb-24 lg:mb-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[50%] top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>
        
        <div className="container relative px-4">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
            {/* Left Column - Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <Badge className="mb-6 px-3 py-1" variant="secondary">
                <Sparkles className="mr-1.5 h-3 w-3" />
                Nova versão disponível
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Gerencie seus projetos de forma{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  ágil
                </span>{" "}
                e eficiente
              </h1>
              <p className="mb-10 text-lg leading-relaxed text-muted-foreground sm:text-xl md:mb-12 md:text-2xl">
                A plataforma completa para gerenciar tarefas, sprints e equipes. 
                Organize seu trabalho e aumente a produtividade da sua equipe.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row lg:justify-start sm:justify-center">
                <Button 
                  size="lg" 
                  onClick={onNavigateToRegister} 
                  className="group text-base shadow-lg shadow-primary/20 transition-shadow hover:shadow-xl hover:shadow-primary/30"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => scrollToSection("features")}
                  className="text-base"
                >
                  Ver Recursos
                </Button>
              </div>
            </div>
            
            {/* Right Column - Stats Flexbox */}
            <div className="flex flex-wrap gap-6 lg:w-80">
              <Card className="flex-1 min-w-[140px] border-2">
                <CardHeader>
                  <div className="mb-2 text-4xl font-bold text-primary">10k+</div>
                  <CardDescription>Usuários Ativos</CardDescription>
                </CardHeader>
              </Card>
              <Card className="flex-1 min-w-[140px] border-2">
                <CardHeader>
                  <div className="mb-2 text-4xl font-bold text-primary">50k+</div>
                  <CardDescription>Projetos Criados</CardDescription>
                </CardHeader>
              </Card>
              <Card className="flex-1 min-w-[140px] border-2">
                <CardHeader>
                  <div className="mb-2 text-4xl font-bold text-primary">99%</div>
                  <CardDescription>Satisfação do Cliente</CardDescription>
                </CardHeader>
              </Card>
              <Card className="flex-1 min-w-[140px] border-2">
                <CardHeader>
                  <div className="mb-2 text-4xl font-bold text-primary">24/7</div>
                  <CardDescription>Suporte Disponível</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gradient-to-br from-blue-50/30 via-background to-purple-50/30 py-28 md:py-40 my-16 md:my-24 lg:my-32">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center mb-20">
            <Badge variant="outline" className="mb-6">
              Recursos
            </Badge>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Tudo que você precisa
            </h2>
            <p className="text-lg text-muted-foreground">
              Recursos poderosos para gerenciar projetos de forma profissional e eficiente
            </p>
          </div>

          <div className="flex flex-wrap gap-5">
            {[
              {
                icon: FolderKanban,
                title: "Quadro Kanban",
                description: "Visualize e gerencie tarefas intuitivamente com drag and drop. Organize seu fluxo de trabalho de forma visual e eficiente.",
                color: "text-blue-600",
                benefits: ["Drag & Drop intuitivo", "Colunas personalizáveis", "Filtros avançados"]
              },
              {
                icon: Zap,
                title: "Sprints Ágeis",
                description: "Planeje e execute sprints com facilidade. Gerencie suas iterações e aumente a velocidade de entrega da sua equipe.",
                color: "text-amber-600",
                benefits: ["Planejamento visual", "Burndown charts", "Retrospectivas"]
              },
              {
                icon: CheckSquare,
                title: "Gestão de Tarefas",
                description: "Organize e priorize todas as suas atividades. Acompanhe o progresso em tempo real com atualizações instantâneas.",
                color: "text-green-600",
                benefits: ["Priorização inteligente", "Subtarefas ilimitadas", "Templates reutilizáveis"]
              },
              {
                icon: BarChart3,
                title: "Métricas e Relatórios",
                description: "Acompanhe a performance da sua equipe com dashboards interativos e relatórios detalhados em tempo real.",
                color: "text-purple-600",
                benefits: ["Dashboards personalizados", "Exportação de dados", "Análises preditivas"]
              },
              {
                icon: Calendar,
                title: "Gestão de Prazos",
                description: "Gerencie prazos e datas importantes com notificações inteligentes e lembretes automáticos personalizados.",
                color: "text-pink-600",
                benefits: ["Calendário integrado", "Notificações automáticas", "Visão de timeline"]
              },
              {
                icon: Users,
                title: "Colaboração em Equipe",
                description: "Trabalhe em equipe de forma eficiente com permissões avançadas, comunicação integrada e sincronização em tempo real.",
                color: "text-indigo-600",
                benefits: ["Permissões granulares", "Comentários em tempo real", "Mentions e notificações"]
              },
              {
                icon: Code,
                title: "API e Integrações",
                description: "Conecte-se com as ferramentas que você já usa. API completa e integrações com principais plataformas do mercado.",
                color: "text-teal-600",
                benefits: ["REST API completa", "Webhooks", "50+ integrações"]
              },
              {
                icon: Bell,
                title: "Notificações Inteligentes",
                description: "Mantenha-se atualizado com notificações personalizadas que respeitam seu tempo e preferências de trabalho.",
                color: "text-orange-600",
                benefits: ["Personalização avançada", "Agrupamento inteligente", "Múltiplos canais"]
              },
              {
                icon: Globe,
                title: "Multi-idioma",
                description: "Acesse a plataforma no seu idioma preferido com suporte completo para múltiplos idiomas e regiões.",
                color: "text-cyan-600",
                benefits: ["15+ idiomas", "Tradução automática", "Suporte regional"]
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="flex-1 min-w-[280px] sm:flex-[1_1_calc(50%-12px)] lg:flex-[1_1_calc(33.333%-16px)] group border-2 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <CardHeader>
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all group-hover:scale-110 group-hover:bg-primary/20`}>
                    <feature.icon className={`h-6 w-6 ${feature.color || "text-primary"}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {feature.description}
                  </CardDescription>
                  {feature.benefits && (
                    <ul className="space-y-2 mt-4">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckSquare className="h-4 w-4 text-primary shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="border-t bg-gradient-to-br from-amber-50/40 via-background to-orange-50/40 py-28 md:py-40 my-16 md:my-24 lg:my-32">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-20 text-center">
              <Badge variant="outline" className="mb-6">
                Sobre Nós
              </Badge>
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Por que escolher o Tasklean?
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                O Tasklean foi criado para equipes que buscam uma solução completa e intuitiva 
                para gerenciamento de projetos. Nossa missão é simplificar o trabalho colaborativo 
                e aumentar a produtividade através de tecnologia inovadora.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 mb-16">
              {[
                {
                  icon: Rocket,
                  title: "Inovação",
                  description: "Tecnologia de ponta para transformar sua gestão de projetos",
                  gradient: "from-orange-500 to-red-500"
                },
                {
                  icon: Shield,
                  title: "Confiabilidade",
                  description: "Seus dados protegidos com segurança máxima e criptografia",
                  gradient: "from-blue-500 to-indigo-500"
                },
                {
                  icon: Heart,
                  title: "Foco no Usuário",
                  description: "Interface intuitiva e experiência excepcional para todos",
                  gradient: "from-pink-500 to-rose-500"
                },
                {
                  icon: TrendingUp,
                  title: "Evolução Constante",
                  description: "Atualizações regulares com novos recursos e melhorias",
                  gradient: "from-green-500 to-emerald-500"
                }
              ].map((value, index) => (
                <Card 
                  key={index}
                  className="flex-1 min-w-[200px] sm:flex-[1_1_calc(50%-12px)] lg:flex-[1_1_calc(25%-18px)] group relative overflow-hidden border-2 transition-all hover:shadow-lg"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 transition-opacity group-hover:opacity-5`} />
                  <CardHeader>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:scale-110 group-hover:bg-primary/20 mx-auto">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-center text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-sm leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Info */}
            <div className="flex flex-wrap gap-8">
              <Card className="flex-1 min-w-[250px] border-2">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Nossa Missão</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Simplificar o gerenciamento de projetos para equipes de todos os tamanhos, 
                    oferecendo ferramentas poderosas e fáceis de usar.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="flex-1 min-w-[250px] border-2">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Nossos Valores</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Transparência, inovação e compromisso com a excelência. Trabalhamos incansavelmente 
                    para superar as expectativas dos nossos usuários.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-t bg-gradient-to-br from-violet-50/30 via-background to-pink-50/30 py-28 md:py-40 my-16 md:my-24 lg:my-32">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center mb-20">
            <Badge variant="outline" className="mb-6">
              Depoimentos
            </Badge>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              O que nossos clientes dizem
            </h2>
            <p className="text-lg text-muted-foreground">
              Veja como o Tasklean está transformando a gestão de projetos em empresas ao redor do mundo
            </p>
          </div>

          <div className="flex flex-wrap gap-8">
            {[
              {
                name: "Maria Silva",
                role: "CEO, TechStart",
                content: "O Tasklean revolucionou nossa forma de trabalhar. A produtividade da equipe aumentou em 40% e conseguimos entregar projetos mais rápido.",
                rating: 5
              },
              {
                name: "João Santos",
                role: "Gerente de Projetos, Inovação Corp",
                content: "A interface intuitiva e os recursos poderosos fazem do Tasklean a melhor escolha. Nossa equipe se adaptou em questão de dias.",
                rating: 5
              },
              {
                name: "Ana Costa",
                role: "Coordenadora, Design Studio",
                content: "A colaboração em equipe nunca foi tão fácil. O Tasklean nos permite trabalhar de forma sincronizada mesmo em projetos complexos.",
                rating: 5
              },
              {
                name: "Pedro Oliveira",
                role: "CTO, StartupX",
                content: "A API robusta e as integrações nos permitiram conectar todas as nossas ferramentas. Agora temos visibilidade completa do projeto.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="flex-1 min-w-[280px] sm:flex-[1_1_calc(50%-12px)] lg:flex-[1_1_calc(50%-12px)] border-2">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-primary/20 mb-2" />
                  <CardDescription className="text-base leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t bg-gradient-to-br from-cyan-50/30 via-background to-teal-50/30 py-28 md:py-40 my-16 md:my-24 lg:my-32">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-20">
              <Badge variant="outline" className="mb-6">
                FAQ
              </Badge>
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Perguntas Frequentes
              </h2>
              <p className="text-lg text-muted-foreground">
                Encontre respostas para as dúvidas mais comuns sobre o Tasklean
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {[
                {
                  question: "Como posso começar a usar o Tasklean?",
                  answer: "É muito simples! Crie sua conta gratuita, escolha um template de projeto ou comece do zero, e convide sua equipe. Não é necessário cartão de crédito para começar."
                },
                {
                  question: "Posso cancelar minha assinatura a qualquer momento?",
                  answer: "Sim, você pode cancelar sua assinatura a qualquer momento sem nenhuma taxa de cancelamento. Seus dados permanecerão acessíveis durante o período pago."
                },
                {
                  question: "O Tasklean oferece integrações com outras ferramentas?",
                  answer: "Sim! Oferecemos mais de 50 integrações com ferramentas populares como Slack, GitHub, Jira, Trello e muito mais. Também disponibilizamos uma API REST completa para integrações customizadas."
                },
                {
                  question: "Meus dados estão seguros?",
                  answer: "Absolutamente. Utilizamos criptografia de ponta a ponta, hospedamos nossos dados em servidores seguros com certificação ISO 27001, e fazemos backups regulares. Seus dados são totalmente seus."
                },
                {
                  question: "Posso usar o Tasklean em diferentes idiomas?",
                  answer: "Sim! O Tasklean está disponível em mais de 15 idiomas, incluindo Português, Inglês, Espanhol, Francês e muitos outros. Você pode alterar o idioma nas configurações."
                },
                {
                  question: "Qual é a diferença entre os planos?",
                  answer: "O plano Básico é gratuito e perfeito para começar. O Profissional oferece recursos avançados para equipes em crescimento. O Empresarial inclui recursos de nível enterprise como API completa, múltiplas equipes e suporte 24/7."
                }
              ].map((faq, index) => (
                <Card key={index} className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {faq.answer}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-t bg-gradient-to-br from-rose-50/40 via-background to-pink-50/40 py-28 md:py-40 my-16 md:my-24 lg:my-32">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center mb-20">
            <Badge variant="outline" className="mb-6">
              Preços
            </Badge>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Planos para todos
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Escolha o plano ideal para suas necessidades. Todos incluem teste gratuito.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>✓ Sem cartão de crédito necessário</span>
              <span className="text-muted-foreground/50">•</span>
              <span>✓ Cancele a qualquer momento</span>
              <span className="text-muted-foreground/50">•</span>
              <span>✓ Suporte incluído</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 justify-center">
            {[
              {
                name: "Básico",
                price: "0",
                period: "mês",
                description: "Perfeito para começar e testar",
                features: [
                  "Até 3 projetos",
                  "Até 50 tarefas",
                  "Quadro Kanban básico",
                  "Relatórios básicos",
                  "Suporte por email",
                  "Até 3 membros"
                ],
                popular: false
              },
              {
                name: "Profissional",
                price: "29",
                period: "mês",
                description: "Para equipes em crescimento",
                features: [
                  "Projetos ilimitados",
                  "Tarefas ilimitadas",
                  "Kanban avançado",
                  "Sprints e métricas",
                  "Relatórios detalhados",
                  "Suporte prioritário",
                  "Até 10 membros"
                ],
                popular: true
              },
              {
                name: "Empresarial",
                price: "99",
                period: "mês",
                description: "Para grandes organizações",
                features: [
                  "Tudo do Profissional",
                  "Múltiplas equipes",
                  "Permissões avançadas",
                  "API completa",
                  "Integrações ilimitadas",
                  "Suporte 24/7",
                  "Membros ilimitados"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <Card 
                key={index} 
                className={`flex-1 min-w-[280px] max-w-[380px] md:flex-[1_1_calc(33.333%-16px)] relative flex flex-col transition-all ${
                  plan.popular 
                    ? "border-primary border-2 shadow-lg md:scale-105" 
                    : "border-2 hover:border-primary/50 hover:shadow-md"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-primary text-primary-foreground shadow-lg">
                      <Star className="mr-1.5 h-3 w-3 fill-current" />
                      Mais Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-bold">R$ {plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  {plan.price !== "0" && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ou R$ {(parseInt(plan.price) * 12 * 0.9).toFixed(0)}/ano (10% off)
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="mb-6 flex-1 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckSquare className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    size="lg"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={onNavigateToRegister}
                  >
                    {plan.price === "0" ? "Começar Grátis" : "Assinar Agora"}
                    {plan.popular && <ChevronRight className="ml-2 h-4 w-4" />}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="border-t bg-gradient-to-br from-primary/5 via-background to-primary/5 py-28 md:py-40 my-16 md:my-24 lg:my-32">
        <div className="container px-4">
          <Card className="mx-auto max-w-3xl border-2 bg-primary text-primary-foreground">
            <CardHeader className="text-center">
              <CardTitle className="mb-4 text-3xl sm:text-4xl">
                Pronto para aumentar sua produtividade?
              </CardTitle>
              <CardDescription className="text-base text-primary-foreground/80">
                Junte-se a milhares de profissionais que transformaram sua gestão de projetos. 
                Comece gratuitamente hoje mesmo.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={onNavigateToRegister}
                className="text-base group"
              >
                Começar Gratuitamente
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={onNavigateToLogin}
                className="text-base bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Já tenho conta
              </Button>
            </CardContent>
            <div className="px-6 pb-6">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Dados seguros</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span>Configuração rápida</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span>Suporte dedicado</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gradient-to-br from-gray-50 via-muted/50 to-gray-50 py-16 mt-16 md:mt-24">
        <div className="container px-4">
          <div className="flex flex-wrap gap-8">
            <div className="flex-1 min-w-[200px] space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <CheckSquare className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold">Tasklean</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A plataforma completa para gerenciar seus projetos e equipes.
              </p>
            </div>

            <div className="flex-1 min-w-[150px] space-y-3">
              <h3 className="font-semibold">Navegação</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => scrollToSection("features")}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Recursos
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("about")}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Sobre
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("pricing")}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Preços
                  </button>
                </li>
              </ul>
            </div>

            <div className="flex-1 min-w-[150px] space-y-3">
              <h3 className="font-semibold">Conta</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={onNavigateToLogin}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Entrar
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onNavigateToRegister}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Criar conta
                  </button>
                </li>
              </ul>
            </div>

            <div className="flex-1 min-w-[150px] space-y-3">
              <h3 className="font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Termos de Serviço
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Política de Privacidade
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Tasklean. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
