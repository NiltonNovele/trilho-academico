import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  ExternalLink,
  Globe,
  Loader2,
  Newspaper,
  Sparkles,
  Clock3,
  ShieldCheck,
  ChevronRight,
  Share2,
  AlertCircle,
  BookOpen,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

type NewsItem = {
  id?: string;
  title?: string;
  country?: string;
  date?: string;
  source?: string;
  image?: string;
  status?: "Aberta" | "Fechada" | "Cancelada" | string;
  excerpt?: string;
  description?: string;
  link?: string;
};

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/news`)
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : [];
        setNews(items.find((n: NewsItem) => n.id === id) || null);
      })
      .catch(() => setNews(null))
      .finally(() => setLoading(false));
  }, [id]);

  const formattedDate = useMemo(() => {
    if (!news?.date) return null;

    const parsed = new Date(news.date);
    if (Number.isNaN(parsed.getTime())) return null;

    return parsed.toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }, [news?.date]);

  const statusStyles = useMemo(() => {
    switch (news?.status) {
      case "Aberta":
        return "bg-emerald-100/95 text-emerald-800 ring-1 ring-emerald-200";
      case "Fechada":
        return "bg-rose-100/95 text-rose-700 ring-1 ring-rose-200";
      case "Cancelada":
        return "bg-gray-200/95 text-gray-700 ring-1 ring-gray-300";
      default:
        return "bg-white/95 text-gray-800 ring-1 ring-gray-200";
    }
  }, [news?.status]);

  const openExternalLink = () => {
    if (!news?.link) return;
    window.open(news.link, "_blank", "noopener,noreferrer");
  };

  const shareNews = async () => {
    const currentUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: news?.title || "Notícia Trilho Académico",
          text: news?.excerpt || "Consulta esta notícia.",
          url: currentUrl,
        });
      } catch {
        return;
      }
    } else {
      await navigator.clipboard.writeText(currentUrl);
      alert("Link copiado!");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="rounded-[2rem] border border-gray-200/70 bg-white/90 px-8 py-10 text-center shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/80">
          <Loader2 className="mx-auto mb-4 h-9 w-9 animate-spin text-blue-600 dark:text-cyan-400" />
          <p className="font-medium text-gray-600 dark:text-gray-300">
            A carregar notícia...
          </p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="w-full max-w-lg rounded-[2rem] border border-gray-200/70 bg-white/90 p-8 text-center shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/80">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gray-100 dark:bg-white/10">
            <AlertCircle className="h-8 w-8 text-gray-500 dark:text-gray-300" />
          </div>

          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            Notícia não encontrada
          </h2>

          <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
            Não foi possível localizar esta notícia. Ela pode ter sido removida
            ou o link já não está disponível.
          </p>

          <Link
            to="/recursos"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar aos recursos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 via-white to-cyan-50 px-4 py-8 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-80px] top-10 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute right-[-70px] top-28 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-500/10" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/recursos"
            className="inline-flex w-fit items-center text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos recursos
          </Link>

          <button
            onClick={shareNews}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.05] dark:text-gray-200"
          >
            <Share2 className="h-4 w-4" />
            Partilhar
          </button>
        </div>

        <article className="overflow-hidden rounded-[2rem] border border-gray-200/70 bg-white/95 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.28)] backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/80">
          {/* Hero */}
          <section className="relative">
            {news.image ? (
              <img
                src={news.image}
                alt={news.title || "Notícia"}
                className="h-[24rem] w-full object-cover sm:h-[30rem] lg:h-[34rem]"
              />
            ) : (
              <div className="flex h-[24rem] w-full items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-50 to-indigo-100 dark:from-blue-500/10 dark:via-cyan-500/5 dark:to-indigo-500/10 sm:h-[30rem] lg:h-[34rem]">
                <Sparkles className="h-16 w-16 text-blue-500/70 dark:text-cyan-400/70" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-6 sm:top-6">
              {news.status && (
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold shadow-sm backdrop-blur-md ${statusStyles}`}
                >
                  {news.status}
                </span>
              )}

              {news.country && (
                <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm backdrop-blur-md">
                  <MapPin className="mr-1.5 h-3.5 w-3.5" />
                  {news.country}
                </span>
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10">
              <div className="max-w-4xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                  <Newspaper className="h-4 w-4" />
                  Notícia Trilho Académico
                </div>

                <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-6xl">
                  {news.title}
                </h1>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="p-5 sm:p-8 lg:p-10">
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {news.country && (
                <InfoCard
                  icon={<MapPin className="h-4 w-4" />}
                  label="Localização"
                  value={news.country}
                />
              )}

              {formattedDate && (
                <InfoCard
                  icon={<Calendar className="h-4 w-4" />}
                  label="Data"
                  value={formattedDate}
                />
              )}

              {news.source && (
                <InfoCard
                  icon={<Globe className="h-4 w-4" />}
                  label="Fonte"
                  value={news.source}
                />
              )}
            </div>

            {news.excerpt && (
              <section className="mb-8 rounded-[1.75rem] border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-5 dark:border-cyan-500/10 dark:from-blue-500/10 dark:to-cyan-500/5 sm:p-6">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-blue-700 dark:bg-white/10 dark:text-cyan-300">
                  <Clock3 className="h-3.5 w-3.5" />
                  Resumo rápido
                </div>

                <p className="text-base leading-8 text-gray-700 dark:text-gray-300 sm:text-lg">
                  {news.excerpt}
                </p>
              </section>
            )}

            {news.description && (
              <section className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md">
                    <BookOpen className="h-5 w-5" />
                  </div>

                  <h2 className="text-xl font-black text-gray-900 dark:text-white sm:text-2xl">
                    Descrição completa
                  </h2>
                </div>

                <div className="rounded-[1.75rem] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-6">
                  <p className="whitespace-pre-line leading-8 text-gray-700 dark:text-gray-300">
                    {news.description}
                  </p>
                </div>
              </section>
            )}

            {news.link && (
              <section className="mt-8 rounded-[1.75rem] border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-5 dark:border-cyan-500/10 dark:from-blue-500/10 dark:to-cyan-500/5 sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-blue-700 dark:bg-white/10 dark:text-cyan-300">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Fonte original
                    </div>

                    <h3 className="text-lg font-black text-gray-900 dark:text-white">
                      Continuar para a notícia completa
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
                      Abre a fonte oficial diretamente numa nova aba para consultar
                      todos os detalhes.
                    </p>
                  </div>

                  <button
                    onClick={openExternalLink}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Abrir fonte
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </section>
            )}
          </section>
        </article>
      </div>
    </main>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-gray-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
        {icon}
        {label}
      </div>

      <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}