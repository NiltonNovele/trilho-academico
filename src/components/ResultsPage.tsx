// src/pages/ResultsPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useFormData } from "./FormDataContext";
import StudyPlanCard, { CourseCardData } from "../components/StudyPlanCard";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";

import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Loader2,
  RefreshCw,
  Route,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

const API_URL = "https://trilhoacademico.edu.mz";

const statusMessages = [
  "A interpretar o teu perfil académico...",
  "A cruzar respostas com possíveis cursos...",
  "A procurar universidades alinhadas aos teus objetivos...",
  "A analisar bolsas e oportunidades relevantes...",
  "A organizar o teu plano personalizado...",
  "A preparar recomendações claras para o teu próximo passo...",
];

type Scholarship = {
  title: string;
  provider?: string;
  description?: string;
  amount?: string;
  eligibility?: string[] | string;
  deadline?: string;
  url?: string;
  howToApply?: string;
  whyMatchesUser?: string;
};

interface AIResponse {
  courses: CourseCardData[];
  scholarships: Scholarship[];
  userReport: string;
}

const safeParse = (raw: any): AIResponse => {
  try {
    let obj = typeof raw === "string" ? JSON.parse(raw) : raw;

    if (typeof obj.courses === "string") obj.courses = JSON.parse(obj.courses);
    if (typeof obj.scholarships === "string") {
      obj.scholarships = JSON.parse(obj.scholarships);
    }

    return {
      courses: Array.isArray(obj.courses) ? obj.courses : [],
      scholarships: Array.isArray(obj.scholarships) ? obj.scholarships : [],
      userReport:
        typeof obj.userReport === "string"
          ? obj.userReport
          : JSON.stringify(obj.userReport || "", null, 2),
    };
  } catch {
    return {
      courses: [],
      scholarships: [],
      userReport:
        typeof raw === "string" ? raw : "Sem relatório disponível.",
    };
  }
};

const formatReportToHTML = (text: string) => {
  const cleanText = text || "Sem relatório disponível.";

  return cleanText
    .split(/\n{2,}/)
    .map((p) => `<p>${p.trim().replace(/\n/g, "<br/>")}</p>`)
    .join("");
};

const LoadingScreen: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % statusMessages.length);
    }, 1700);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-90px] h-80 w-80 rounded-full bg-cyan-100 blur-3xl" />
        <div className="absolute right-[-130px] top-1/4 h-96 w-96 rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute bottom-[-120px] left-1/3 h-96 w-96 rounded-full bg-indigo-100 blur-3xl" />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 w-full max-w-2xl rounded-[2.25rem] border border-gray-200/80 bg-white/90 p-6 text-center shadow-[0_30px_90px_-50px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-xl">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          >
            <Loader2 className="h-10 w-10" />
          </motion.div>
        </div>

        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-700">
          <Sparkles className="h-4 w-4" />
          Trilho Académico AI
        </div>

        <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
          Estamos a construir o teu plano académico
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
          Estamos a organizar cursos, universidades, bolsas e recomendações para
          criar um resultado mais útil e personalizado para ti.
        </p>

        <div className="mt-8 rounded-[1.75rem] border border-gray-200 bg-gray-50/80 p-5">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="text-base font-bold text-gray-800 sm:text-lg"
            >
              {statusMessages[currentMessage]}
            </motion.p>
          </AnimatePresence>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600"
              initial={{ width: "15%" }}
              animate={{ width: ["15%", "45%", "72%", "92%"] }}
              transition={{ duration: 5.5, repeat: Infinity }}
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: SearchCheck, text: "Análise do perfil" },
            { icon: Route, text: "Sugestões práticas" },
            { icon: ShieldCheck, text: "Plano organizado" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.text}
                className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-600 shadow-sm"
              >
                <Icon className="mx-auto mb-2 h-5 w-5 text-cyan-600" />
                {item.text}
              </div>
            );
          })}
        </div>
      </motion.section>
    </main>
  );
};

const ScholarshipCard: React.FC<{ sch: Scholarship }> = ({ sch }) => {
  const eligibilityList = Array.isArray(sch.eligibility)
    ? sch.eligibility
    : typeof sch.eligibility === "string" && sch.eligibility
    ? [sch.eligibility]
    : [];

  return (
    <article className="group rounded-[2rem] border border-gray-200/80 bg-white p-5 shadow-[0_20px_70px_-45px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_80px_-45px_rgba(0,0,0,0.35)] sm:p-6">
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
          <Award className="h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-black leading-tight text-gray-900">
            {sch.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-gray-500">
            {sch.provider || "Fornecedor desconhecido"}
          </p>
        </div>
      </div>

      <p className="text-sm leading-7 text-gray-600">
        {sch.description || "Sem descrição disponível."}
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoBox label="Montante" value={sch.amount || "Valor não disponível"} />
        <InfoBox label="Prazo" value={sch.deadline || "Desconhecido"} />
      </div>

      {eligibilityList.length > 0 && (
        <div className="mt-5 rounded-2xl bg-gray-50 p-4">
          <p className="mb-3 text-sm font-black text-gray-900">Elegibilidade</p>
          <ul className="space-y-2">
            {eligibilityList.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm leading-6 text-gray-600">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {sch.howToApply && (
        <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-4">
          <p className="text-sm font-black text-gray-900">Como candidatar</p>
          <p className="mt-2 text-sm leading-6 text-gray-600">{sch.howToApply}</p>
        </div>
      )}

      {sch.whyMatchesUser && (
        <div className="mt-5 rounded-2xl border border-cyan-100 bg-cyan-50 p-4">
          <p className="text-sm font-black text-gray-900">Por que se adequa a ti</p>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            {sch.whyMatchesUser}
          </p>
        </div>
      )}

      <div className="mt-6">
        {sch.url ? (
          <a
            href={sch.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
          >
            Ver oportunidade
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : (
          <button
            className="inline-flex w-full items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-bold text-gray-400 sm:w-auto"
            disabled
          >
            Link indisponível
          </button>
        )}
      </div>
    </article>
  );
};

const ResultsPage: React.FC = () => {
  const { knownCourseData, vocationalData } = useFormData();
  const [aiData, setAiData] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!aiData) {
      const stored = localStorage.getItem("studyPlan");

      if (stored) {
        const parsed = safeParse(JSON.parse(stored));
        setAiData(parsed);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const fetchAI = async () => {
      if (!knownCourseData) return;

      setLoading(true);

      try {
        const res = await fetch(`${API_URL}/study-plan`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            knownCourse: knownCourseData,
            vocational: vocationalData || {},
          }),
        });

        const data = await res.json();
        const parsed = safeParse(data.result || data);

        setAiData(parsed);
        localStorage.setItem("studyPlan", JSON.stringify(parsed));
      } catch (err) {
        console.error("Erro ao buscar dados da AI:", err);
        setAiData({
          courses: [],
          scholarships: [],
          userReport:
            "⚠️ Não foi possível gerar recomendações neste momento. Tenta novamente mais tarde.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAI();
  }, [knownCourseData, vocationalData]);

  const stats = useMemo(
    () => [
      {
        label: "Cursos recomendados",
        value: aiData?.courses?.length || 0,
        icon: GraduationCap,
      },
      {
        label: "Bolsas sugeridas",
        value: aiData?.scholarships?.length || 0,
        icon: Wallet,
      },
      {
        label: "Relatório pessoal",
        value: aiData?.userReport ? 1 : 0,
        icon: FileText,
      },
    ],
    [aiData]
  );

  const handleDownloadDocx = async () => {
    if (!aiData) return;

    const { userReport, courses, scholarships } = aiData;
    const paragraphs: Paragraph[] = [];

    paragraphs.push(
      new Paragraph({
        text: "Plano de Estudos Personalizado",
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({ text: "" })
    );

    paragraphs.push(
      new Paragraph({
        text: "Relatório Pessoal",
        heading: HeadingLevel.HEADING_1,
      })
    );

    userReport.split("\n").forEach((line) => {
      if (line.trim() !== "") paragraphs.push(new Paragraph(line.trim()));
    });

    if (courses.length > 0) {
      paragraphs.push(
        new Paragraph({
          text: "Cursos Recomendados",
          heading: HeadingLevel.HEADING_1,
        })
      );

      courses.forEach((c, idx) => {
        paragraphs.push(
          new Paragraph({
            text: `${idx + 1}. ${c.title || c.name}`,
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph(`Universidade: ${c.university || "N/A"}`),
          new Paragraph(`País: ${c.country || "N/A"}`),
          new Paragraph(`Cidade: ${c.city || "N/A"}`),
          new Paragraph(`Preço por ano: ${c.pricePerYear || "N/A"}`),
          new Paragraph(
            `Requisitos: ${
              Array.isArray(c.requirements)
                ? c.requirements.join(", ")
                : c.requirements || "N/A"
            }`
          ),
          new Paragraph(
            `Alojamento: ${
              c.accommodation?.needed
                ? c.accommodation.details || "Necessário"
                : "Não necessário"
            }`
          ),
          new Paragraph(
            `Vistos & Legalidades: ${c.visaAndLegal || "Não especificado"}`
          ),
          new Paragraph(
            `Por que se adequa a ti: ${c.whyThisFits || "Não especificado"}`
          ),
          new Paragraph(`Descrição: ${c.description || "Sem descrição"}`),
          new Paragraph({ text: "" })
        );
      });
    }

    if (scholarships.length > 0) {
      paragraphs.push(
        new Paragraph({
          text: "Bolsas Sugeridas",
          heading: HeadingLevel.HEADING_1,
        })
      );

      scholarships.forEach((s, i) => {
        paragraphs.push(
          new Paragraph({
            text: `${i + 1}. ${s.title}`,
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph(`Fornecedor: ${s.provider || "Desconhecido"}`),
          new Paragraph(`Montante: ${s.amount || "Não disponível"}`),
          new Paragraph(
            `Critérios de elegibilidade: ${
              Array.isArray(s.eligibility)
                ? s.eligibility.join(", ")
                : s.eligibility || "Não especificado"
            }`
          ),
          new Paragraph(`Prazo: ${s.deadline || "Desconhecido"}`),
          new Paragraph(`Link: ${s.url || "Não disponível"}`),
          new Paragraph(`Como candidatar: ${s.howToApply || "N/A"}`),
          new Paragraph(
            `Porquê que se adequa a ti: ${
              s.whyMatchesUser || "Não especificado"
            }`
          ),
          new Paragraph(`Descrição: ${s.description || "Sem descrição"}`),
          new Paragraph({ text: "" })
        );
      });
    }

    const doc = new Document({ sections: [{ children: paragraphs }] });
    const blob = await Packer.toBlob(doc);

    saveAs(blob, "meu_trilho_academico.docx");
  };

  if (loading) return <LoadingScreen />;

  if (!aiData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="w-full max-w-lg rounded-[2rem] border border-gray-200 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gray-100 text-gray-500">
            <FileText className="h-8 w-8" />
          </div>

          <h1 className="text-2xl font-black text-gray-900">
            Sem dados disponíveis
          </h1>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            Ainda não encontramos um plano gerado. Volta ao início e completa o
            formulário para gerar as tuas recomendações.
          </p>

          <button
            onClick={() => navigate("/escolher-teste")}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg"
          >
            Começar novamente
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-4 py-8 text-gray-900 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-120px] top-[-80px] h-80 w-80 rounded-full bg-cyan-100 blur-3xl" />
        <div className="absolute right-[-130px] top-32 h-96 w-96 rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute bottom-[-120px] left-1/3 h-96 w-96 rounded-full bg-indigo-100 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl space-y-8">
        <header className="overflow-hidden rounded-[2.25rem] border border-gray-200/80 bg-white/90 p-6 shadow-[0_30px_90px_-55px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-700">
                <Sparkles className="h-4 w-4" />
                Resultado personalizado
              </div>

              <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                O teu{" "}
                <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Plano de Estudos
                </span>{" "}
                está pronto
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                Consulta o teu relatório, explora cursos recomendados e vê bolsas
                que podem ajudar-te a dar o próximo passo com mais clareza.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleDownloadDocx}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <Download className="h-4 w-4" />
                  Descarregar .DOCX
                </button>

                <button
                  onClick={() => navigate("/recursos")}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50"
                >
                  Ver mais bolsas
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-gray-200 bg-gray-50/80 p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-500">
                          {stat.label}
                        </p>
                        <p className="mt-1 text-3xl font-black text-gray-900">
                          {stat.value}
                        </p>
                      </div>

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        <section className="rounded-[2rem] border border-gray-200/80 bg-white/95 p-5 shadow-[0_24px_80px_-50px_rgba(0,0,0,0.28)] sm:p-7 lg:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
              <FileText className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 sm:text-2xl">
                Relatório Pessoal
              </h2>
              <p className="text-sm text-gray-500">
                Uma leitura geral do teu perfil e das recomendações geradas.
              </p>
            </div>
          </div>

          <div
            className="prose max-w-none text-gray-700 prose-p:leading-8 prose-p:my-4"
            dangerouslySetInnerHTML={{
              __html: formatReportToHTML(aiData.userReport),
            }}
          />
        </section>

        {aiData.courses?.length > 0 && (
          <section>
            <SectionHeading
              icon={<GraduationCap className="h-6 w-6" />}
              title="Cursos Recomendados"
              description="Sugestões alinhadas ao teu perfil, preferências e objetivos."
            />

            <div className="grid gap-6 md:grid-cols-2">
              {aiData.courses.map((course, idx) => (
                <StudyPlanCard key={idx} data={course} />
              ))}
            </div>
          </section>
        )}

        {aiData.scholarships?.length > 0 && (
          <section>
            <SectionHeading
              icon={<Wallet className="h-6 w-6" />}
              title="Bolsas Sugeridas"
              description="Oportunidades que podem complementar o teu percurso académico."
            />

            <div className="grid gap-6 md:grid-cols-2">
              {aiData.scholarships.map((sch, i) => (
                <ScholarshipCard key={i} sch={sch} />
              ))}
            </div>

            <button
              onClick={() => navigate("/recursos")}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Ver mais bolsas para ti
              <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        )}

        <section className="rounded-[2rem] border border-cyan-100 bg-gradient-to-r from-cyan-50 to-blue-50 p-6 text-center sm:p-8">
          <BookOpen className="mx-auto mb-4 h-10 w-10 text-cyan-600" />
          <h2 className="text-2xl font-black text-gray-900">
            Guarda este plano e revê com calma
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600">
            Usa este resultado como ponto de partida. Podes comparar cursos,
            rever bolsas e voltar aos recursos sempre que precisares.
          </p>

          <button
            onClick={handleDownloadDocx}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-sm transition hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            Baixar plano novamente
          </button>
        </section>
      </div>
    </main>
  );
};

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function SectionHeading({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
        {icon}
      </div>

      <div>
        <h2 className="text-xl font-black text-gray-900 sm:text-2xl">
          {title}
        </h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default ResultsPage;