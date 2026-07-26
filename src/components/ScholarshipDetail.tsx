import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  ExternalLink,
  ListChecks,
  Loader2,
  Globe,
  Building2,
  CheckCircle2,
  FileText,
  Sparkles,
  ShieldCheck,
  Clock3,
  Award,
  AlertCircle,
  Share2,
  ChevronRight,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

type Scholarship = {
  id?: string;
  title?: string;
  provider?: string;
  country?: string;
  openingDate?: string;
  deadline?: string;
  source?: string;
  image?: string;
  description?: string;
  eligibility?: string[];
  requirements?: string[];
  steps?: string[];
  link?: string;
  status?: "Aberta" | "Fechada" | "Lotada" | "Cancelada" | string;
};

export default function ScholarshipDetail() {
  const { id } = useParams();
  const [sch, setSch] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/scholarships`)
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : [];
        setSch(items.find((s: Scholarship) => s.id === id) || null);
      })
      .catch(() => setSch(null))
      .finally(() => setLoading(false));
  }, [id]);

  const formatDate = (date?: string) => {
    if (!date) return null;

    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return null;

    return parsed.toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const statusStyles = useMemo(() => {
    switch (sch?.status) {
      case "Aberta":
        return "bg-emerald-100/95 text-emerald-800 ring-1 ring-emerald-200";
      case "Fechada":
        return "bg-rose-100/95 text-rose-700 ring-1 ring-rose-200";
      case "Lotada":
        return "bg-amber-100/95 text-amber-800 ring-1 ring-amber-200";
      case "Cancelada":
        return "bg-gray-200/95 text-gray-700 ring-1 ring-gray-300";
      default:
        return "bg-white/95 text-gray-800 ring-1 ring-gray-200";
    }
  }, [sch?.status]);

  const openExternalLink = () => {
    if (!sch?.link) return;
    window.open(sch.link, "_blank", "noopener,noreferrer");
  };

  const shareScholarship = async () => {
    const currentUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: sch?.title || "Bolsa de Estudo",
          text: sch?.description || "Consulta esta oportunidade de bolsa.",
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
            A carregar bolsa...
          </p>
        </div>
      </div>
    );
  }

  if (!sch) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="w-full max-w-lg rounded-[2rem] border border-gray-200/70 bg-white/90 p-8 text-center shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/80">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gray-100 dark:bg-white/10">
            <AlertCircle className="h-8 w-8 text-gray-500 dark:text-gray-300" />
          </div>

          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            Bolsa não encontrada
          </h2>

          <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
            Não foi possível encontrar a oportunidade que procuras. Talvez tenha
            sido removida ou o link já não esteja disponível.
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
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-500/10" />
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
            onClick={shareScholarship}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.05] dark:text-gray-200"
          >
            <Share2 className="h-4 w-4" />
            Partilhar
          </button>
        </div>

        <article className="overflow-hidden rounded-[2rem] border border-gray-200/70 bg-white/95 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.28)] backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/80">
          <section className="relative">
            {sch.image ? (
              <img
                src={sch.image}
                alt={sch.title || "Bolsa de estudo"}
                className="h-[24rem] w-full object-cover sm:h-[30rem] lg:h-[34rem]"
              />
            ) : (
              <div className="flex h-[24rem] w-full items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-50 to-indigo-100 dark:from-blue-500/10 dark:via-cyan-500/5 dark:to-indigo-500/10 sm:h-[30rem] lg:h-[34rem]">
                <Sparkles className="h-16 w-16 text-blue-500/70 dark:text-cyan-400/70" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-6 sm:top-6">
              {sch.status && (
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold shadow-sm backdrop-blur-md ${statusStyles}`}
                >
                  {sch.status}
                </span>
              )}

              {sch.country && (
                <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm backdrop-blur-md">
                  <MapPin className="mr-1.5 h-3.5 w-3.5" />
                  {sch.country}
                </span>
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10">
              <div className="max-w-4xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                  <Award className="h-4 w-4" />
                  Oportunidade de bolsa
                </div>

                <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-6xl">
                  {sch.title}
                </h1>

                {sch.provider && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                    <Building2 className="h-4 w-4" />
                    {sch.provider}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="p-5 sm:p-8 lg:p-10">
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {sch.country && (
                <InfoCard
                  icon={<MapPin className="h-4 w-4" />}
                  label="País"
                  value={sch.country}
                />
              )}

              {formatDate(sch.openingDate) && (
                <InfoCard
                  icon={<Calendar className="h-4 w-4" />}
                  label="Abertura"
                  value={formatDate(sch.openingDate) || ""}
                />
              )}

              {formatDate(sch.deadline) && (
                <InfoCard
                  icon={<Clock3 className="h-4 w-4" />}
                  label="Prazo"
                  value={formatDate(sch.deadline) || ""}
                />
              )}

              {sch.source && (
                <InfoCard
                  icon={<Globe className="h-4 w-4" />}
                  label="Fonte"
                  value={sch.source}
                />
              )}
            </div>

            {sch.description && (
              <section className="mb-8">
                <SectionTitle
                  icon={<FileText className="h-5 w-5" />}
                  title="Descrição"
                />

                <div className="rounded-[1.75rem] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-6">
                  <p className="whitespace-pre-line leading-8 text-gray-700 dark:text-gray-300">
                    {sch.description}
                  </p>
                </div>
              </section>
            )}

            <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
              {sch.eligibility?.length ? (
                <ListSection
                  icon={<CheckCircle2 className="h-5 w-5" />}
                  title="Elegibilidade"
                  items={sch.eligibility}
                  tone="emerald"
                />
              ) : null}

              {sch.requirements?.length ? (
                <ListSection
                  icon={<ShieldCheck className="h-5 w-5" />}
                  title="Requisitos"
                  items={sch.requirements}
                  tone="violet"
                />
              ) : null}
            </div>

            {sch.steps?.length ? (
              <section className="mb-8 rounded-[1.75rem] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-6">
                <SectionTitle
                  icon={<ListChecks className="h-5 w-5" />}
                  title="Etapas de Candidatura"
                />

                <div className="space-y-4">
                  {sch.steps.map((step: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-2xl bg-gray-50/80 p-4 dark:bg-white/[0.04]"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-xs font-bold text-white shadow-sm">
                        {i + 1}
                      </div>
                      <p className="leading-7 text-gray-700 dark:text-gray-300">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {sch.link && (
              <section className="mt-8 rounded-[1.75rem] border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-5 dark:border-cyan-500/10 dark:from-blue-500/10 dark:to-cyan-500/5 sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-blue-700 dark:bg-white/10 dark:text-cyan-300">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Candidatura oficial
                    </div>

                    <h3 className="text-lg font-black text-gray-900 dark:text-white">
                      Pronto para avançar?
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
                      Abre a página oficial da oportunidade diretamente numa nova aba
                      e segue as instruções da entidade responsável.
                    </p>
                  </div>

                  <button
                    onClick={openExternalLink}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Candidatar-se
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

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md">
        {icon}
      </div>
      <h2 className="text-xl font-black text-gray-900 dark:text-white sm:text-2xl">
        {title}
      </h2>
    </div>
  );
}

function ListSection({
  icon,
  title,
  items,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  tone: "emerald" | "violet";
}) {
  const toneClasses =
    tone === "emerald"
      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
      : "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400";

  const dotClass = tone === "emerald" ? "bg-emerald-500" : "bg-violet-500";

  return (
    <section className="rounded-[1.75rem] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${toneClasses}`}>
          {icon}
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
          {title}
        </h2>
      </div>

      <ul className="space-y-3">
        {items.map((item: string, i: number) => (
          <li
            key={i}
            className="flex items-start gap-3 leading-7 text-gray-700 dark:text-gray-300"
          >
            <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${dotClass}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}