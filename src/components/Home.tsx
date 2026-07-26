import React, { useEffect, useMemo, useState } from "react";
import { NavigationPage } from "../types";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  Globe,
  BookOpen,
  FileText,
  Users,
  Newspaper,
  ArrowRight,
  Sparkles,
  Rocket,
  MapPin,
  Zap,
  AlertTriangle,
  Megaphone,
  ShieldCheck,
  Star,
  CalendarDays,
  GraduationCap,
  CheckCircle2,
  Building2,
  BadgeHelp,
  Briefcase,
  Bell,
  Mail,
  Send,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

interface HomeProps {
  onNavigate: (page: NavigationPage) => void;
}

type Scholarship = {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  country?: string;
  provider?: string;
  deadline?: string;
  link?: string;
  status?: string;
};

type Feature = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  details: string;
  bullets: string[];
  image: string;
  color: string;
  badge: string;
};

// type TeamMember = {
//   name: string;
//   role: string;
//   img: string;
// };

type Association = {
  src: string;
  alt: string;
  description: string;
};

type Partner = {
  src: string;
  alt: string;
};

const Home: React.FC<HomeProps> = () => {
  const [featuredScholarships, setFeaturedScholarships] = useState<Scholarship[]>([]);
  const [loadingScholarships, setLoadingScholarships] = useState(true);
  const [flippedFeature, setFlippedFeature] = useState<string | null>(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || "https://trilhoacademico.edu.mz/api"}/scholarships`
        );
        const data = await res.json();

        const featured = (Array.isArray(data) ? data : [])
          .filter((s: Scholarship) => s.status === "Aberta")
          .slice(0, 5);

        setFeaturedScholarships(featured);
      } catch (err) {
        console.error("Erro ao carregar bolsas:", err);
      } finally {
        setLoadingScholarships(false);
      }
    };

    fetchScholarships();
  }, []);

  const heroImages = [
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80",
  ];

  const features: Feature[] = [
    {
      id: "curso",
      icon: BookOpen,
      title: "Seleciona o Curso Perfeito",
      description:
        "Descobre cursos alinhados com a tua personalidade, interesses e objetivos.",
      details:
        "O teste vocacional ajuda-te a encontrar áreas e cursos compatíveis com o teu perfil, reduzindo dúvidas e aumentando a clareza na tomada de decisão.",
      bullets: [
        "Sugestões alinhadas ao teu perfil",
        "Melhor clareza na escolha do curso",
        "Base para decisões académicas mais seguras",
      ],
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
      color: "from-purple-500 to-pink-600",
      badge: "Educação",
    },
    {
      id: "pais",
      icon: Globe,
      title: "Escolhe o País Ideal",
      description:
        "Explora destinos académicos que combinem com o teu perfil e orçamento.",
      details:
        "A plataforma ajuda-te a comparar países, contextos académicos, cidades e oportunidades para encontrares a melhor combinação entre sonho e viabilidade.",
      bullets: [
        "Comparação entre destinos",
        "Visão prática sobre contexto e custo",
        "Escolhas mais alinhadas aos teus objetivos",
      ],
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      color: "from-cyan-500 to-blue-600",
      badge: "AI",
    },
    {
      id: "documentacao",
      icon: FileText,
      title: "Documentação e Vistos",
      description:
        "Organiza documentos, vistos e requisitos com mais segurança.",
      details:
        "Recebe apoio para entender exigências legais, preparar documentos essenciais e seguir os passos corretos para candidaturas e vistos.",
      bullets: [
        "Guias por país",
        "Passos mais organizados",
        "Menos erros no processo",
      ],
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
      color: "from-green-500 to-emerald-600",
      badge: "Guias",
    },
    {
      id: "financeiro",
      icon: MapPin,
      title: "Planeamento Financeiro",
      description:
        "Analisa custos, propinas e oportunidades de financiamento.",
      details:
        "Compara despesas, identifica bolsas e estrutura melhor o teu plano de estudos com uma visão mais realista do investimento necessário.",
      bullets: [
        "Custos de vida e propinas",
        "Foco em bolsas e financiamento",
        "Maior controlo do orçamento",
      ],
      image:
        "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80",
      color: "from-orange-500 to-red-600",
      badge: "Finanças",
    },
    {
      id: "comunidade",
      icon: Users,
      title: "Comunidade de Estudantes",
      description:
        "Liga-te a estudantes moçambicanos em diferentes destinos.",
      details:
        "Aprende com experiências reais, obtém dicas práticas e sente-te mais preparado através de comunidades estudantis e associações parceiras.",
      bullets: [
        "Dicas de quem já vive a experiência",
        "Apoio humano e orientação prática",
        "Maior confiança antes de partir",
      ],
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      color: "from-indigo-500 to-purple-600",
      badge: "Rede",
    },
    {
      id: "suporte",
      icon: Zap,
      title: "Suporte Personalizado",
      description:
        "Conta com apoio próximo em cada fase da tua jornada académica.",
      details:
        "Desde a escolha inicial até à preparação final, o Trilho Académico procura oferecer acompanhamento mais claro, humano e estratégico.",
      bullets: [
        "Orientação próxima",
        "Apoio em várias etapas",
        "Experiência mais simples e segura",
      ],
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      color: "from-teal-500 to-cyan-600",
      badge: "Mentoria",
    },
  ];

  const stats = [
    {
      label: "Países Disponíveis",
      value: 10,
      suffix: "+",
      icon: Globe,
      color: "text-cyan-600 dark:text-cyan-400",
      description: "Destinos académicos com informação relevante e acessível.",
    },
    {
      label: "Estudantes Ajudados",
      value: 32,
      suffix: "+",
      icon: Users,
      color: "text-purple-600 dark:text-purple-400",
      description: "Jovens apoiados na escolha do seu percurso académico.",
    },
    {
      label: "Testes Realizados",
      value: 40,
      suffix: "+",
      icon: Newspaper,
      color: "text-green-600 dark:text-green-400",
      description: "Avaliações feitas para orientar decisões com mais clareza.",
    },
  ];

  // const teamMembers: TeamMember[] = [
  //   {
  //     name: "Bionda Shirley",
  //     role: "Bionda@trilhoacademico.edu.mz",
  //     img: "/team/bionda.jpeg",
  //   },
  //   {
  //     name: "Henzel Tibana",
  //     role: "Henzel@trilhoacademico.edu.mz",
  //     img: "/henzel.jpg",
  //   },
  //   {
  //     name: "Mauro Chemane",
  //     role: "Mauro@trilhoacademico.edu.mz",
  //     img: "/team/mauro.jpg",
  //   },
  //   {
  //     name: "Alicio Lino",
  //     role: "Alicio@trilhoacademico.edu.mz",
  //     img: "/team/farley.jpg",
  //   },
  //   {
  //     name: "Nilton Novele",
  //     role: "Nilton@trilhoacademico.edu.mz",
  //     img: "/team/nilton.jpeg",
  //   },
  // ];

  const associations: Association[] = [
    {
      src: "/partners/amecc.webp",
      alt: "AMECC",
      description:
        "Associação de Estudantes Moçambicanos na Cidade do Cabo, promovendo união, orientação e apoio entre estudantes.",
    },
    {
      src: "/partners/india.png",
      alt: "APU Moz Community",
      description:
        "Comunidade juvenil de estudantes na Asia Pacific University, com foco em partilha e integração.",
    },
    {
      src: "/partners/coimbra.png",
      alt: "AEMOPCoimbra",
      description:
        "Associação dos Estudantes Moçambicanos em Portugal - Coimbra.",
    },
    {
      src: "/partners/lisboa.png",
      alt: "AEMOP-NL",
      description:
        "Associação dos Estudantes Moçambicanos em Portugal - Núcleo de Lisboa.",
    },
    {
      src: "/partners/porto.png",
      alt: "AEMOPorto",
      description:
        "Associação dos Estudantes Moçambicanos no Porto, com apoio e ligação à comunidade local.",
    },
    {
      src: "/partners/mz-india.png",
      alt: "Estudantes Moçambicanos na Índia",
      description:
        "Comunidade de apoio a estudantes moçambicanos na Índia.",
    },
    {
      src: "/partners/mz-cp.png",
      alt: "Estudantes Moçambicanos no Chipre",
      description:
        "Comunidade e orientação para estudantes moçambicanos no Chipre.",
    },
  ];

  const partners: Partner[] = [
    { src: "https://i.postimg.cc/xTbwRMwP/cacep.png", alt: "CACEP" },
    { src: "https://i.postimg.cc/xTbwRMwP/cacep.png", alt: "CACEP" },
    { src: "https://i.postimg.cc/xTbwRMwP/cacep.png", alt: "CACEP" },
    { src: "https://i.postimg.cc/xTbwRMwP/cacep.png", alt: "CACEP" },
    { src: "https://i.postimg.cc/xTbwRMwP/cacep.png", alt: "CACEP" },
  ];

  const formatDate = (date?: string) => {
    if (!date) return "Prazo flexível";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "Prazo flexível";
    return parsed.toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const featureSectionIntro = useMemo(
    () => ({
      title: "Traça o Trilho para o Teu Ensino Superior",
      description:
        "Agora com cartões interativos: toca ou clica para ver mais informação relevante dentro de cada funcionalidade.",
    }),
    []
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-100px] top-0 h-80 w-80 rounded-full bg-cyan-100/60 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute right-[-120px] top-40 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-purple-100/50 blur-3xl dark:bg-purple-500/10" />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-90px] top-0 h-72 w-72 rounded-full bg-cyan-100/70 blur-3xl dark:bg-cyan-500/10" />
          <div className="absolute right-[-90px] top-24 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-500/10" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-100/50 blur-3xl dark:bg-purple-500/10" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-8 lg:pt-32 lg:pb-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700 dark:border-cyan-900 dark:bg-cyan-500/10 dark:text-cyan-300">
                <Sparkles className="h-4 w-4" />
                <span>Dinamizar a educação em Moçambique</span>
              </div>

              <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                O Teu Futuro Académico{" "}
                <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Começa Aqui
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg dark:text-gray-300">
                O{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  Trilho Académico
                </span>{" "}
                ajuda-te a descobrir cursos, universidades, países e bolsas com mais
                clareza, estratégia e confiança.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/escolher-teste">
                  <button className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                    <Rocket className="h-5 w-5 group-hover:animate-pulse" />
                    <span>Começar agora</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>

                <Link to="/escolher-teste">
                  <button className="rounded-2xl border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04] dark:text-white">
                    Fazer Teste Vocacional
                  </button>
                </Link>
              </div>

              <div className="mt-10 max-w-2xl">
                <div className="flex items-start gap-3 rounded-3xl border border-yellow-200 bg-yellow-50 p-4 text-left text-yellow-800 shadow-sm dark:border-yellow-900 dark:bg-yellow-500/10 dark:text-yellow-300">
                  <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-yellow-500" />
                  <div>
                    <h3 className="text-base font-semibold sm:text-lg">
                      Atualização Importante - 1 de Junho
                    </h3>
                    <p className="mt-1 text-sm leading-6">
                      No dia <span className="font-semibold">1 de Junho</span>, lançaremos uma
                      grande atualização na plataforma. Fica atento.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[660px] lg:max-w-none">
              <div className="relative h-[430px] sm:h-[520px] lg:h-[580px]">
                <div className="absolute left-0 top-10 w-[48%] sm:left-4 sm:w-[44%] lg:left-6 lg:top-10 lg:w-[44%]">
                  <div className="overflow-hidden rounded-[1.75rem] border border-white/90 bg-white p-2 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.28)]">
                    <img
                      src={heroImages[0]}
                      alt="Estudantes a estudar"
                      className="h-44 w-full rounded-[1.3rem] object-cover sm:h-60 lg:h-72"
                    />
                  </div>
                </div>

                <div className="absolute right-0 top-0 w-[46%] sm:w-[42%] lg:right-0 lg:top-0 lg:w-[42%]">
                  <div className="overflow-hidden rounded-[1.75rem] border border-white/90 bg-white p-2 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.28)]">
                    <img
                      src={heroImages[1]}
                      alt="Grupo de estudantes"
                      className="h-40 w-full rounded-[1.3rem] object-cover sm:h-56 lg:h-64"
                    />
                  </div>
                </div>

                <div className="absolute bottom-14 left-2 w-[42%] sm:bottom-10 sm:left-0 sm:w-[40%] lg:bottom-10 lg:left-0 lg:w-[40%]">
                  <div className="overflow-hidden rounded-[1.75rem] border border-white/90 bg-white p-2 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.28)]">
                    <img
                      src={heroImages[2]}
                      alt="Biblioteca"
                      className="h-36 w-full rounded-[1.3rem] object-cover sm:h-48 lg:h-60"
                    />
                  </div>
                </div>

                <div className="absolute bottom-0 right-4 w-[50%] sm:right-6 sm:w-[48%] lg:right-8 lg:bottom-0 lg:w-[48%]">
                  <div className="overflow-hidden rounded-[1.75rem] border border-white/90 bg-white p-2 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.28)]">
                    <img
                      src={heroImages[3]}
                      alt="Vida académica"
                      className="h-44 w-full rounded-[1.3rem] object-cover sm:h-60 lg:h-72"
                    />
                  </div>
                </div>

                <div className="absolute left-[16%] top-[36%] sm:left-[24%] sm:top-[34%] lg:left-[24%] lg:top-[32%]">
                  <div className="rounded-[1.5rem] border border-cyan-100 bg-white/95 px-4 py-3 shadow-xl backdrop-blur dark:border-white/10 dark:bg-gray-900/90 sm:px-5 sm:py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white sm:h-12 sm:w-12">
                        <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900 dark:text-white sm:text-sm">
                          Trilho Académico
                        </p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 sm:text-xs">
                          Clareza, apoio e direção
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-6 top-16 h-24 w-24 rounded-full bg-cyan-200/30 blur-2xl dark:bg-cyan-500/10" />
                <div className="absolute right-6 bottom-8 h-28 w-28 rounded-full bg-blue-200/30 blur-2xl dark:bg-blue-500/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-200 bg-white py-16 transition-colors duration-300 dark:border-white/10 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="rounded-[2rem] border border-gray-200/70 bg-gray-50/90 p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: index * 0.12 }}
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-gray-100 shadow-sm dark:from-gray-800 dark:to-gray-700">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>

                  <div className="text-4xl font-black text-gray-900 dark:text-white">
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    {stat.suffix}
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Scholarships */}
      <section className="bg-white py-20 transition-colors duration-300 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-gradient-to-r from-green-500/10 to-emerald-600/10 px-4 py-2 dark:border-green-800">
              <Star className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Bolsas em Destaque
              </span>
            </div>

            <h2 className="text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
              Oportunidades de{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Bolsa
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg dark:text-gray-300">
              Deslize para a esquerda para navegar pelas bolsas de estudo.
            </p>
          </div>

          {loadingScholarships ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-[2rem] border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-gray-500 dark:text-gray-400">A carregar bolsas...</p>
            </div>
          ) : featuredScholarships.length === 0 ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-[2rem] border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-gray-500 dark:text-gray-400">
                Nenhuma bolsa disponível de momento.
              </p>
            </div>
          ) : (
            <>
              <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                spaceBetween={24}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="featured-scholarship-swiper pb-12"
              >
                {featuredScholarships.map((scholarship, index) => (
                  <SwiperSlide key={scholarship.id || index}>
                    <div className="overflow-hidden rounded-[2rem] border border-gray-200/70 bg-white shadow-[0_20px_70px_-35px_rgba(0,0,0,0.16)] dark:border-white/10 dark:bg-gray-950/60 dark:shadow-[0_20px_70px_-35px_rgba(0,0,0,0.55)]">
                      <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr]">
                        <div className="relative">
                          {scholarship.image ? (
                            <img
                              src={scholarship.image}
                              alt={scholarship.title || "Bolsa em destaque"}
                              className="h-[230px] w-full object-cover sm:h-[280px] lg:h-full lg:min-h-[420px]"
                            />
                          ) : (
                            <div className="flex h-[230px] w-full items-center justify-center bg-gradient-to-br from-green-100 via-emerald-50 to-cyan-100 sm:h-[280px] lg:min-h-[420px] dark:from-green-500/10 dark:via-emerald-500/5 dark:to-cyan-500/10">
                              <GraduationCap className="h-14 w-14 text-green-600/60 dark:text-green-400/60" />
                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent lg:bg-gradient-to-r lg:from-black/35 lg:to-transparent" />

                          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 shadow-md backdrop-blur">
                              {scholarship.country || "Global"}
                            </span>
                            <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                              {scholarship.status || "Aberta"}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between p-6 sm:p-8">
                          <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 dark:border-green-800 dark:bg-green-500/10 dark:text-green-300">
                              <Megaphone className="h-4 w-4" />
                              Bolsa em destaque
                            </div>

                            <h3 className="text-2xl font-black leading-tight text-gray-900 sm:text-3xl dark:text-white">
                              {scholarship.title || "Bolsa de Estudo"}
                            </h3>

                            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                              <div className="rounded-2xl bg-gray-50 p-4 dark:bg-white/[0.04]">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                  País
                                </p>
                                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                  {scholarship.country || "Global"}
                                </p>
                              </div>

                              <div className="rounded-2xl bg-gray-50 p-4 dark:bg-white/[0.04]">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                  Entidade
                                </p>
                                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                  {scholarship.provider || "Organização parceira"}
                                </p>
                              </div>

                              <div className="rounded-2xl bg-gray-50 p-4 dark:bg-white/[0.04] sm:col-span-2">
                                <div className="flex items-center gap-2">
                                  <CalendarDays className="h-4 w-4 text-green-600 dark:text-green-400" />
                                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                    Prazo
                                  </p>
                                </div>
                                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                  {formatDate(scholarship.deadline)}
                                </p>
                              </div>
                            </div>

                            <div className="mt-5 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                              <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
                                {scholarship.description ||
                                  "Explora esta oportunidade e consulta os detalhes completos na secção de recursos."}
                              </p>
                            </div>

                            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                              {["Mais clareza", "Mais foco", "Mais organização"].map((item) => (
                                <div
                                  key={item}
                                  className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-8">
                            <Link
                              to="/recursos"
                              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                            >
                              Ver detalhes
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="mt-8 text-center">
                <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
                  Temos as{" "}
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    melhores e mais recentes oportunidades
                  </span>{" "}
                  de bolsas à tua espera.
                </p>

                <Link
                  to="/recursos"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Ver mais bolsas
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20 transition-colors duration-300 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-gradient-to-r from-purple-500/10 to-pink-600/10 px-4 py-2 dark:border-purple-800">
              <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Funcionalidades Avançadas
              </span>
            </div>

            <h2 className="text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
              {featureSectionIntro.title.split(" ").slice(0, -3).join(" ")}{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {featureSectionIntro.title.split(" ").slice(-3).join(" ")}
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg dark:text-gray-300">
              {featureSectionIntro.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isFlipped = flippedFeature === feature.id;

              return (
                <div
                  key={feature.id}
                  className="group perspective-[1400px] cursor-pointer"
                  onClick={() =>
                    setFlippedFeature((prev) => (prev === feature.id ? null : feature.id))
                  }
                >
                  <div
                    className="relative h-[420px] rounded-[2rem] transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    <div
                      className="absolute inset-0 overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl dark:border-white/10 dark:bg-white/[0.04]"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-[0.05]`}
                      />

                      <div className="relative flex h-full flex-col">
                        <div className="mb-6 flex items-center justify-between gap-4">
                          <div
                            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg`}
                          >
                            <Icon className="h-7 w-7 text-white" />
                          </div>

                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-300">
                            {feature.badge}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>

                        <div className="mt-auto">
                          <div className="inline-flex items-center gap-2 font-medium text-cyan-600 dark:text-cyan-400">
                            <span>Toca para virar</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="absolute inset-0 overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-2xl dark:border-white/10 dark:bg-gray-900"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                        <div className="absolute left-5 top-5">
                          <span
                            className={`inline-flex items-center rounded-full bg-gradient-to-r ${feature.color} px-3 py-1 text-xs font-semibold text-white shadow-lg`}
                          >
                            {feature.badge}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                          {feature.details}
                        </p>

                        <div className="mt-4 space-y-3">
                          {feature.bullets.map((bullet) => (
                            <div
                              key={bullet}
                              className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>

                        <button
                          className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.07]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFlippedFeature(null);
                          }}
                        >
                          Voltar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      

      {/* Partners and Associations */}
      <section className="relative bg-white py-24 transition-colors duration-300 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 dark:border-orange-900 dark:bg-orange-500/10 dark:text-orange-300">
              <Building2 className="h-4 w-4" />
              <span>Rede de apoio e colaboração</span>
            </div>

            <h2 className="text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
              Parceiros, Patrocinadores e{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Associações
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg dark:text-gray-400">
              Uma rede que fortalece a experiência dos estudantes e amplia o impacto do Trilho
              Académico.
            </p>
          </div>

          <div className="mb-16">
            <div className="rounded-[2rem] bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 p-[1px] shadow-xl">
              <div className="relative rounded-[2rem] bg-white px-6 py-8 text-center dark:bg-gray-950 md:px-10 md:py-10">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-orange-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-orange-700 shadow dark:bg-orange-900 dark:text-orange-300">
                    Criador / Desenvolvedor
                  </span>
                </div>

                <img
                  src="/partners/synctechx.png"
                  alt="SyncTechX"
                  className="mx-auto mb-6 h-20 object-contain transition-transform duration-300 hover:scale-105"
                />

                <p className="mx-auto max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300">
                  Uma startup tecnológica moçambicana responsável pelo desenvolvimento desta
                  plataforma e de várias outras soluções digitais inovadoras.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <div className="mb-8 flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Associações Estudantis
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Comunidades que ajudam estudantes a integrarem-se melhor.
                </p>
              </div>
            </div>

            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              autoplay={{ delay: 4200, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              breakpoints={{
                0: { slidesPerView: 1.05 },
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
              className="pb-10"
            >
              {associations.map((assoc, index) => (
                <SwiperSlide key={index}>
                  <div className="h-full rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-white/[0.04]">
                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-50 dark:bg-white/[0.04]">
                      <img
                        src={assoc.src}
                        alt={assoc.alt}
                        className="h-14 w-14 object-contain"
                      />
                    </div>

                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {assoc.alt}
                    </h4>

                    <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                      {assoc.description}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300">
                      <Users className="h-3.5 w-3.5" />
                      Comunidade ativa
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>
            <div className="mb-8 flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
                <Briefcase className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Parceiros
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Organizações que fortalecem a nossa missão.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/10 via-orange-500/10 to-amber-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex h-24 items-center justify-center">
                    <img
                      src={partner.src}
                      alt={partner.alt}
                      className="max-h-14 object-contain grayscale transition duration-300 group-hover:scale-110 group-hover:grayscale-0"
                    />
                  </div>

                  <p className="relative mt-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300">
                    {partner.alt}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-3 rounded-[2rem] border border-gray-200 bg-gray-50/80 px-5 py-5 text-center dark:border-white/10 dark:bg-white/[0.04]">
              <BadgeHelp className="h-5 w-5 text-orange-500" />
              <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                Estamos a construir uma rede cada vez mais forte para apoiar estudantes
                moçambicanos dentro e fora do país.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Enhanced newsletter section */}
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-cyan-100/80 bg-gradient-to-br from-cyan-50 via-white to-blue-50 shadow-[0_24px_70px_-45px_rgba(0,0,0,0.22)] dark:border-white/10 dark:from-white/[0.05] dark:via-white/[0.03] dark:to-cyan-500/10">
          <div className="relative p-5 sm:p-6 lg:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10" />
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-500/10" />

            <div className="relative grid gap-7 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-cyan-700 shadow-sm backdrop-blur dark:border-cyan-500/20 dark:bg-white/10 dark:text-cyan-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Newsletter
                </div>

                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                  Recebe oportunidades académicas sem perder tempo
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
                  Enviamos novidades relevantes sobre bolsas, documentação,
                  eventos e dicas úteis para estudantes moçambicanos.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { icon: Bell, text: "Alertas úteis" },
                    { icon: ShieldCheck, text: "Sem spam" },
                    { icon: Mail, text: "Direto no email" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.text}
                        className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.05] dark:text-gray-300"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-400" />
                        {item.text}
                      </div>
                    );
                  })}
                </div>
              </div>

              <form className="rounded-[1.75rem] border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-950/60 sm:p-5">
                <label className="mb-2 block text-sm font-bold text-gray-900 dark:text-white">
                  Subscreve a newsletter
                </label>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="O teu email"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 pr-11 text-sm text-gray-800 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 dark:border-white/10 dark:bg-gray-900 dark:text-gray-200 dark:focus:border-cyan-500 dark:focus:ring-cyan-500/10"
                    />
                    <Mail className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <Send className="h-4 w-4" />
                    Subscrever
                  </button>
                </div>

                <p className="mt-3 text-xs leading-5 text-gray-500 dark:text-gray-400">
                  Podes cancelar a subscrição quando quiseres. Usamos o teu email
                  apenas para partilhar conteúdos académicos relevantes.
                </p>
              </form>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Home;