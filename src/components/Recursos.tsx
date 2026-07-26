import React, { useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  Megaphone,
  Search,
  X,
  Edit3,
  Trash2,
  PlusCircle,
  Settings,
  Calendar,
  Globe2,
  ExternalLink,
  Lock,
  ShieldCheck,
  Loader2,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock3,
  AlertTriangle,
  Filter,
  RefreshCw,
  TrendingUp,
  Eye,
} from "lucide-react";

type StatusType = "Aberta" | "Fechada" | "Lotada" | "Cancelada";
type TabType = "news" | "scholarships";
type StatusFilter = "Todos" | StatusType;

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  source: string;
  country?: string;
  link?: string;
  image?: string;
  status?: StatusType;
};

type Scholarship = {
  id: string;
  title: string;
  provider: string;
  country: string;
  deadline?: string;
  openingDate?: string;
  eligibility: string[];
  steps: string[];
  description?: string;
  requirements?: string[];
  specifications?: string[];
  link?: string;
  image?: string;
  status?: StatusType;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const statusOptions: StatusType[] = ["Aberta", "Fechada", "Lotada", "Cancelada"];
const filterOptions: StatusFilter[] = ["Todos", ...statusOptions];

const getStatusStyles = (status?: StatusType) => {
  switch (status) {
    case "Aberta":
      return {
        badge:
          "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
        icon: <CheckCircle2 className="h-3.5 w-3.5" />,
      };
    case "Fechada":
      return {
        badge:
          "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200 dark:bg-white/10 dark:text-gray-300 dark:ring-white/10",
        icon: <XCircle className="h-3.5 w-3.5" />,
      };
    case "Lotada":
      return {
        badge:
          "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20",
        icon: <Clock3 className="h-3.5 w-3.5" />,
      };
    case "Cancelada":
      return {
        badge:
          "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-400/20",
        icon: <AlertTriangle className="h-3.5 w-3.5" />,
      };
    default:
      return {
        badge:
          "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-400/20",
        icon: <CheckCircle2 className="h-3.5 w-3.5" />,
      };
  }
};

const formatDate = (value?: string) => {
  if (!value) return "Sem data";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Sem data";

  return parsed.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const toInputDateTime = (value?: string) => {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";

  const offset = parsed.getTimezoneOffset();
  const local = new Date(parsed.getTime() - offset * 60000);

  return local.toISOString().slice(0, 16);
};

const fromInputDateTime = (value: string) => {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toISOString();
};

const splitCsv = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const joinCsv = (value?: string[]) => (value && value.length ? value.join(", ") : "");

const StatusBadge = ({ status }: { status?: StatusType }) => {
  const styles = getStatusStyles(status);

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
    >
      {styles.icon}
      {status || "Aberta"}
    </span>
  );
};

const Input = ({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/10"
  />
);

const Textarea = ({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows?: number;
}) => (
  <textarea
    rows={rows}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/10"
  />
);

const Select = ({
  value,
  onChange,
  options,
}: {
  value?: string;
  onChange: (value: string) => void;
  options: string[];
}) => (
  <select
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-gray-950 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/10"
  >
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const EmptyState = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex min-h-[280px] items-center justify-center rounded-[2rem] border border-dashed border-gray-300 bg-white/75 p-8 text-center dark:border-white/10 dark:bg-white/[0.03]">
    <div>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-300">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  </div>
);

const NewsCard = ({ item }: { item: NewsItem }) => (
  <article className="group overflow-hidden rounded-[1.8rem] border border-gray-200/70 bg-white/90 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_-35px_rgba(0,0,0,0.32)] dark:border-white/10 dark:bg-white/[0.05]">
    <div className="relative">
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-56 w-full items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-50 to-violet-100 dark:from-blue-500/10 dark:via-cyan-500/5 dark:to-violet-500/10">
          <Megaphone className="h-12 w-12 text-blue-500/70" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

      <div className="absolute left-4 top-4">
        <StatusBadge status={item.status} />
      </div>
    </div>

    <div className="p-5 sm:p-6">
      <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
        <Calendar className="h-4 w-4" />
        {formatDate(item.date)}
        {item.source && (
          <>
            <span className="opacity-40">•</span>
            <span className="truncate">{item.source}</span>
          </>
        )}
      </div>

      <h3 className="line-clamp-2 text-lg font-bold text-gray-900 dark:text-white">
        {item.title}
      </h3>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
        {item.excerpt}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <Globe2 className="h-4 w-4" />
          {item.country || "Internacional"}
        </div>

        <a
          href={`/news/${item.id}`}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20"
        >
          Ver mais
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  </article>
);

const ScholarshipCard = ({ item }: { item: Scholarship }) => (
  <article className="group overflow-hidden rounded-[1.8rem] border border-gray-200/70 bg-white/90 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_-35px_rgba(0,0,0,0.32)] dark:border-white/10 dark:bg-white/[0.05]">
    <div className="relative">
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-56 w-full items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-50 to-violet-100 dark:from-blue-500/10 dark:via-cyan-500/5 dark:to-violet-500/10">
          <Award className="h-12 w-12 text-blue-500/70" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

      <div className="absolute left-4 top-4">
        <StatusBadge status={item.status} />
      </div>
    </div>

    <div className="p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
        <span className="inline-flex items-center gap-1">
          <Globe2 className="h-4 w-4" />
          {item.country || "Internacional"}
        </span>

        {item.provider && (
          <>
            <span className="opacity-40">•</span>
            <span className="truncate">{item.provider}</span>
          </>
        )}
      </div>

      <h3 className="line-clamp-2 text-lg font-bold text-gray-900 dark:text-white">
        {item.title}
      </h3>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
        {item.description || "Consulta os detalhes completos desta bolsa de estudo."}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          {item.deadline ? formatDate(item.deadline) : "Sem prazo"}
        </div>

        <a
          href={`/scholarships/${item.id}`}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20"
        >
          Ver mais
          <Eye className="h-4 w-4" />
        </a>
      </div>
    </div>
  </article>
);

const Opportunities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("scholarships");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminView, setAdminView] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Todos");

  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null);

  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState("");

  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingScholarships, setLoadingScholarships] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchNews();
    fetchScholarships();
  }, []);

  const fetchNews = async () => {
    try {
      setLoadingNews(true);
      const res = await fetch(`${API_URL}/news`);
      const data = await res.json();
      setNews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar notícias:", err);
      setNews([]);
    } finally {
      setLoadingNews(false);
    }
  };

  const fetchScholarships = async () => {
    try {
      setLoadingScholarships(true);
      const res = await fetch(`${API_URL}/scholarships`);
      const data = await res.json();
      setScholarships(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar bolsas:", err);
      setScholarships([]);
    } finally {
      setLoadingScholarships(false);
    }
  };

  const refreshData = () => {
    fetchNews();
    fetchScholarships();
  };

  const saveNews = async (item: Partial<NewsItem>, id?: string) => {
    try {
      setSaving(true);
      const method = id ? "PUT" : "POST";
      const url = id ? `${API_URL}/news/${id}` : `${API_URL}/news`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...item,
          source: item.source || "SyncTechX",
          status: item.status || "Aberta",
        }),
      });

      const updated = await res.json();

      if (id) {
        setNews((prev) => prev.map((n) => (n.id === id ? updated : n)));
      } else {
        setNews((prev) => [updated, ...prev]);
      }

      setEditingNews(null);
    } catch (err) {
      console.error("Erro ao guardar notícia:", err);
    } finally {
      setSaving(false);
    }
  };

  const deleteNews = async (id: string) => {
    if (!window.confirm("Tens a certeza que queres eliminar esta notícia?")) return;

    try {
      await fetch(`${API_URL}/news/${id}`, { method: "DELETE" });
      setNews((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Erro ao eliminar notícia:", err);
    }
  };

  const saveScholarship = async (item: Partial<Scholarship>, id?: string) => {
    try {
      setSaving(true);
      const method = id ? "PUT" : "POST";
      const url = id ? `${API_URL}/scholarships/${id}` : `${API_URL}/scholarships`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...item,
          status: item.status || "Aberta",
        }),
      });

      const updated = await res.json();

      if (id) {
        setScholarships((prev) => prev.map((s) => (s.id === id ? updated : s)));
      } else {
        setScholarships((prev) => [updated, ...prev]);
      }

      setEditingScholarship(null);
    } catch (err) {
      console.error("Erro ao guardar bolsa:", err);
    } finally {
      setSaving(false);
    }
  };

  const deleteScholarship = async (id: string) => {
    if (!window.confirm("Tens a certeza que queres eliminar esta bolsa?")) return;

    try {
      await fetch(`${API_URL}/scholarships/${id}`, { method: "DELETE" });
      setScholarships((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Erro ao eliminar bolsa:", err);
    }
  };

  const filteredNews = useMemo(() => {
    const search = query.toLowerCase().trim();

    return news.filter((n) => {
      const matchesSearch =
        !search ||
        n.title?.toLowerCase().includes(search) ||
        n.excerpt?.toLowerCase().includes(search) ||
        n.source?.toLowerCase().includes(search) ||
        n.country?.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "Todos" || (n.status || "Aberta") === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [news, query, statusFilter]);

  const filteredScholarships = useMemo(() => {
    const search = query.toLowerCase().trim();

    return scholarships.filter((s) => {
      const matchesSearch =
        !search ||
        s.title?.toLowerCase().includes(search) ||
        s.provider?.toLowerCase().includes(search) ||
        s.country?.toLowerCase().includes(search) ||
        s.description?.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "Todos" || (s.status || "Aberta") === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [scholarships, query, statusFilter]);

  const featuredOpenScholarship = useMemo(
    () => scholarships.find((item) => item.status === "Aberta") || scholarships[0],
    [scholarships]
  );

  const featuredNews = useMemo(() => news[0], [news]);

  const stats = useMemo(() => {
    const openScholarships = scholarships.filter((s) => s.status === "Aberta").length;
    const openNews = news.filter((n) => n.status === "Aberta").length;

    return [
      {
        label: "Bolsas",
        value: scholarships.length,
        helper: "Oportunidades publicadas",
        accent: "from-blue-600 to-cyan-500",
        icon: <Award className="h-5 w-5" />,
      },
      {
        label: "Notícias",
        value: news.length,
        helper: "Atualizações disponíveis",
        accent: "from-violet-600 to-indigo-500",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        label: "Abertas",
        value: openScholarships + openNews,
        helper: "Conteúdos ativos agora",
        accent: "from-emerald-500 to-green-500",
        icon: <Sparkles className="h-5 w-5" />,
      },
    ];
  }, [scholarships, news]);

  const publicLoading =
    (activeTab === "news" && loadingNews) ||
    (activeTab === "scholarships" && loadingScholarships);

  const currentCount =
    activeTab === "scholarships" ? filteredScholarships.length : filteredNews.length;

  const handlePinSubmit = () => {
    if (pinInput === "2307") {
      setIsAdmin(true);
      setAdminView(true);
      setShowPinModal(false);
      setPinInput("");
    } else {
      alert("PIN incorreto. Tente novamente.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-90px] top-[-80px] h-80 w-80 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute right-[-90px] top-40 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-500/10" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Hero */}
        <section className="overflow-hidden rounded-[2.25rem] border border-gray-200/70 bg-white/90 shadow-[0_25px_80px_-45px_rgba(0,0,0,0.3)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
                <Megaphone className="h-4 w-4" />
                Oportunidades académicas atualizadas
              </div>

              <h1 className="max-w-4xl text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                Notícias &{" "}
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 bg-clip-text text-transparent">
                  Bolsas de Estudo
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-300 sm:text-lg">
                Explora bolsas, chamadas, anúncios e atualizações importantes num espaço simples,
                organizado e preparado para estudantes que procuram melhores oportunidades.
              </p>

            
            </div>

          </div>
        </section>

        

        {/* Admin button */}
        <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
          {!isAdmin ? (
            <button
              onClick={() => setShowPinModal(true)}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-xl transition hover:scale-105 dark:border-white/10 dark:bg-gray-900"
              title="Acesso administrativo"
            >
              <Lock className="h-4 w-4 text-gray-600 transition group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400" />
            </button>
          ) : (
            <button
              onClick={() => setAdminView((prev) => !prev)}
              className="group flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 text-white shadow-xl transition hover:scale-[1.02]"
              title="Alternar painel administrativo"
            >
              {adminView ? <X className="h-5 w-5" /> : <Settings className="h-5 w-5" />}
              <span className="hidden text-sm font-semibold sm:inline">
                {adminView ? "Fechar painel" : "Painel admin"}
              </span>
            </button>
          )}
        </div>

        {!adminView && (
          <section className="mt-8">
            <div className="sticky top-20 z-30 rounded-[2rem] border border-gray-200/70 bg-white/90 p-4 shadow-[0_20px_70px_-45px_rgba(0,0,0,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/85">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="inline-flex rounded-2xl bg-gray-100 p-1 dark:bg-white/5">
                  <button
                    onClick={() => setActiveTab("scholarships")}
                    className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition-all sm:flex-none ${
                      activeTab === "scholarships"
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                        : "text-gray-700 hover:bg-white dark:text-gray-200 dark:hover:bg-white/10"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Bolsas
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab("news")}
                    className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition-all sm:flex-none ${
                      activeTab === "news"
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                        : "text-gray-700 hover:bg-white dark:text-gray-200 dark:hover:bg-white/10"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Notícias
                    </span>
                  </button>
                </div>

                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="relative w-full lg:w-80">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      placeholder="Pesquisar..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/10"
                    />
                  </div>

                  <div className="relative w-full lg:w-48">
                    <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                      className="w-full appearance-none rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm font-semibold text-gray-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/10"
                    >
                      {filterOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={refreshData}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-white/10 dark:bg-gray-900 dark:text-white dark:hover:bg-white/10"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Atualizar
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-500 dark:border-white/10 dark:text-gray-400">
                <span>
                  {currentCount} resultado{currentCount !== 1 ? "s" : ""} encontrado
                  {currentCount !== 1 ? "s" : ""}
                </span>

                {query || statusFilter !== "Todos" ? (
                  <button
                    onClick={() => {
                      setQuery("");
                      setStatusFilter("Todos");
                    }}
                    className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Limpar filtros
                  </button>
                ) : null}
              </div>
            </div>

            <div className="mt-8">
              {publicLoading ? (
                <div className="flex min-h-[300px] items-center justify-center rounded-[2rem] border border-gray-200/70 bg-white/80 p-10 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      A carregar conteúdos...
                    </p>
                  </div>
                </div>
              ) : activeTab === "news" ? (
                filteredNews.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredNews.map((item) => (
                      <NewsCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<BookOpen className="h-7 w-7" />}
                    title="Nenhuma notícia encontrada"
                    description="Tenta ajustar a pesquisa, mudar o filtro ou voltar mais tarde para novas atualizações."
                  />
                )
              ) : filteredScholarships.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredScholarships.map((item) => (
                    <ScholarshipCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<Award className="h-7 w-7" />}
                  title="Nenhuma bolsa encontrada"
                  description="Tenta outra pesquisa, altera o estado selecionado ou consulta novamente mais tarde."
                />
              )}
            </div>
          </section>
        )}

        {adminView && (
          <section className="mt-10 rounded-[2rem] border border-gray-200/70 bg-white/90 p-5 shadow-[0_20px_70px_-45px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                Painel de Administração
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Gerir notícias e bolsas de estudo de forma organizada.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
              {/* Keep your admin forms here */}
              <AdminColumn
                title="Notícias"
                subtitle="Criar, editar e remover notícias."
                items={news}
                onAdd={() =>
                  setEditingNews({
                    id: "",
                    title: "",
                    excerpt: "",
                    date: new Date().toISOString(),
                    source: "SyncTechX",
                    country: "",
                    link: "",
                    image: "",
                    status: "Aberta",
                  })
                }
                editing={editingNews}
                onClose={() => setEditingNews(null)}
                form={
                  editingNews && (
                    <NewsForm
                      item={editingNews}
                      setItem={setEditingNews}
                      saving={saving}
                      onCancel={() => setEditingNews(null)}
                      onSave={() => saveNews(editingNews, editingNews.id || undefined)}
                    />
                  )
                }
                onEdit={(item) => setEditingNews(item as NewsItem)}
                onDelete={deleteNews}
                type="news"
              />

              <AdminColumn
                title="Bolsas de Estudo"
                subtitle="Gerir oportunidades e respetivos detalhes."
                items={scholarships}
                onAdd={() =>
                  setEditingScholarship({
                    id: "",
                    title: "",
                    provider: "",
                    country: "",
                    eligibility: [],
                    steps: [],
                    requirements: [],
                    specifications: [],
                    description: "",
                    link: "",
                    image: "",
                    openingDate: "",
                    deadline: "",
                    status: "Aberta",
                  })
                }
                editing={editingScholarship}
                onClose={() => setEditingScholarship(null)}
                form={
                  editingScholarship && (
                    <ScholarshipForm
                      item={editingScholarship}
                      setItem={setEditingScholarship}
                      saving={saving}
                      onCancel={() => setEditingScholarship(null)}
                      onSave={() =>
                        saveScholarship(
                          editingScholarship,
                          editingScholarship.id || undefined
                        )
                      }
                    />
                  )
                }
                onEdit={(item) => setEditingScholarship(item as Scholarship)}
                onDelete={deleteScholarship}
                type="scholarship"
              />
            </div>
          </section>
        )}

        {showPinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-md">
            <div className="w-full max-w-sm rounded-[2rem] border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-gray-900 sm:p-8">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
                <ShieldCheck className="h-8 w-8" />
              </div>

              <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
                Acesso Administrativo
              </h2>

              <p className="mt-2 text-center text-sm leading-6 text-gray-600 dark:text-gray-400">
                Introduz o PIN para abrir o painel de gestão.
              </p>

              <input
                type="password"
                placeholder="PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handlePinSubmit();
                }}
                className="mt-6 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-center text-lg tracking-[0.25em] text-gray-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-gray-950 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/10"
              />

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={() => setShowPinModal(false)}
                  className="rounded-2xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                >
                  Cancelar
                </button>

                <button
                  onClick={handlePinSubmit}
                  className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01]"
                >
                  Entrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminColumn = ({
  title,
  subtitle,
  items,
  onAdd,
  form,
  onEdit,
  onDelete,
  type,
}: {
  title: string;
  subtitle: string;
  items: Array<NewsItem | Scholarship>;
  onAdd: () => void;
  editing: NewsItem | Scholarship | null;
  onClose: () => void;
  form: React.ReactNode;
  onEdit: (item: NewsItem | Scholarship) => void;
  onDelete: (id: string) => void;
  type: "news" | "scholarship";
}) => (
  <div className="rounded-[1.8rem] border border-gray-200 bg-gray-50/70 p-5 dark:border-white/10 dark:bg-white/[0.03]">
    <div className="mb-5 flex items-center justify-between gap-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
      </div>

      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
      >
        <PlusCircle className="h-4 w-4" />
        Adicionar
      </button>
    </div>

    {form}

    <div className="space-y-3">
      {items.length > 0 ? (
        items.map((item) => {
          const subtitle =
            type === "news"
              ? `${formatDate((item as NewsItem).date)} • ${
                  (item as NewsItem).source || "Sem fonte"
                }`
              : `${(item as Scholarship).country || "Sem país"} • ${
                  (item as Scholarship).provider || "Sem fornecedor"
                }`;

          return (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-gray-900"
            >
              <div className="min-w-0">
                <div className="mb-2">
                  <StatusBadge status={item.status} />
                </div>
                <p className="truncate font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="rounded-xl bg-blue-50 p-2.5 text-blue-700 transition hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20"
                >
                  <Edit3 className="h-4 w-4" />
                </button>

                <button
                  onClick={() => onDelete(item.id)}
                  className="rounded-xl bg-rose-50 p-2.5 text-rose-700 transition hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-center dark:border-white/10">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ainda não existem conteúdos nesta categoria.
          </p>
        </div>
      )}
    </div>
  </div>
);

const NewsForm = ({
  item,
  setItem,
  saving,
  onCancel,
  onSave,
}: {
  item: NewsItem;
  setItem: React.Dispatch<React.SetStateAction<NewsItem | null>>;
  saving: boolean;
  onCancel: () => void;
  onSave: () => void;
}) => (
  <div className="mb-5 rounded-[1.8rem] border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-gray-900">
    <div className="mb-4 flex items-center justify-between">
      <h4 className="font-semibold text-gray-900 dark:text-white">
        {item.id ? "Editar notícia" : "Nova notícia"}
      </h4>
      <button
        onClick={onCancel}
        className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>

    <div className="grid grid-cols-1 gap-3">
      <Input
        placeholder="Título"
        value={item.title}
        onChange={(value) => setItem({ ...item, title: value })}
      />
      <Textarea
        placeholder="Resumo"
        value={item.excerpt}
        onChange={(value) => setItem({ ...item, excerpt: value })}
      />
      <Input
        placeholder="Imagem URL"
        value={item.image || ""}
        onChange={(value) => setItem({ ...item, image: value })}
      />
      <Input
        placeholder="Link"
        value={item.link || ""}
        onChange={(value) => setItem({ ...item, link: value })}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          placeholder="Fonte"
          value={item.source || ""}
          onChange={(value) => setItem({ ...item, source: value })}
        />
        <Input
          placeholder="País"
          value={item.country || ""}
          onChange={(value) => setItem({ ...item, country: value })}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          type="datetime-local"
          placeholder="Data"
          value={toInputDateTime(item.date)}
          onChange={(value) => setItem({ ...item, date: fromInputDateTime(value) })}
        />
        <Select
          value={item.status}
          onChange={(value) => setItem({ ...item, status: value as StatusType })}
          options={statusOptions}
        />
      </div>
    </div>

    <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <button
        onClick={onCancel}
        className="rounded-2xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
      >
        Cancelar
      </button>

      <button
        onClick={onSave}
        disabled={saving}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:opacity-70"
      >
        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
        Guardar
      </button>
    </div>
  </div>
);

const ScholarshipForm = ({
  item,
  setItem,
  saving,
  onCancel,
  onSave,
}: {
  item: Scholarship;
  setItem: React.Dispatch<React.SetStateAction<Scholarship | null>>;
  saving: boolean;
  onCancel: () => void;
  onSave: () => void;
}) => (
  <div className="mb-5 rounded-[1.8rem] border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-gray-900">
    <div className="mb-4 flex items-center justify-between">
      <h4 className="font-semibold text-gray-900 dark:text-white">
        {item.id ? "Editar bolsa" : "Nova bolsa"}
      </h4>
      <button
        onClick={onCancel}
        className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>

    <div className="grid grid-cols-1 gap-3">
      <Input
        placeholder="Título"
        value={item.title}
        onChange={(value) => setItem({ ...item, title: value })}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          placeholder="Fornecedor"
          value={item.provider}
          onChange={(value) => setItem({ ...item, provider: value })}
        />
        <Input
          placeholder="País"
          value={item.country}
          onChange={(value) => setItem({ ...item, country: value })}
        />
      </div>

      <Textarea
        placeholder="Descrição"
        value={item.description || ""}
        onChange={(value) => setItem({ ...item, description: value })}
      />

      <Input
        placeholder="Link"
        value={item.link || ""}
        onChange={(value) => setItem({ ...item, link: value })}
      />

      <Input
        placeholder="Imagem URL"
        value={item.image || ""}
        onChange={(value) => setItem({ ...item, image: value })}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          type="datetime-local"
          placeholder="Data de Abertura"
          value={toInputDateTime(item.openingDate)}
          onChange={(value) => setItem({ ...item, openingDate: fromInputDateTime(value) })}
        />
        <Input
          type="datetime-local"
          placeholder="Data Limite"
          value={toInputDateTime(item.deadline)}
          onChange={(value) => setItem({ ...item, deadline: fromInputDateTime(value) })}
        />
      </div>

      <Input
        placeholder="Elegibilidade, separada por vírgula"
        value={joinCsv(item.eligibility)}
        onChange={(value) => setItem({ ...item, eligibility: splitCsv(value) })}
      />

      <Input
        placeholder="Passos, separados por vírgula"
        value={joinCsv(item.steps)}
        onChange={(value) => setItem({ ...item, steps: splitCsv(value) })}
      />

      <Input
        placeholder="Requisitos, separados por vírgula"
        value={joinCsv(item.requirements)}
        onChange={(value) => setItem({ ...item, requirements: splitCsv(value) })}
      />

      <Input
        placeholder="Especificações, separadas por vírgula"
        value={joinCsv(item.specifications)}
        onChange={(value) => setItem({ ...item, specifications: splitCsv(value) })}
      />

      <Select
        value={item.status}
        onChange={(value) => setItem({ ...item, status: value as StatusType })}
        options={statusOptions}
      />
    </div>

    <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <button
        onClick={onCancel}
        className="rounded-2xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
      >
        Cancelar
      </button>

      <button
        onClick={onSave}
        disabled={saving}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:opacity-70"
      >
        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
        Guardar
      </button>
    </div>
  </div>
);

export default Opportunities;