import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormData } from "./FormDataContext";
import { useNavigate } from "react-router-dom";
import { QUESTIONS } from "../data/questions";
import {
  User,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  MapPin,
  BookOpen,
  CheckCircle2,
  Info,
  Loader2,
  CalendarDays,
  X,
  Circle,
  AlertCircle,
  ListChecks,
} from "lucide-react";

const API_URL = "https://trilhoacademico.edu.mz";

const professors = [
  {
    name: "Dra. Marcia Martins Banze",
    email: "Mestre em Psicologia",
    picture: "/marcia.jpg",
  },
  {
    name: "Alicio Lino",
    email: "Estudante de Psicologia na UNIAC",
    picture: "/farley.jpg",
  },
];

const countryOptions = [
  "Moçambique",
  "África do Sul",
  "Portugal",
  "Alemanha",
  "Chipre",
  "Malásia",
  "Polónia",
  "Estados Unidos da América",
  "Espanha",
  "Brasil",
  "Reino Unido",
  "Índia",
];

const provinceOptions = [
  "Maputo Cidade",
  "Maputo Província",
  "Gaza",
  "Inhambane",
  "Sofala",
  "Manica",
  "Tete",
  "Zambézia",
  "Nampula",
  "Niassa",
  "Cabo Delgado",
];

type AllAnswers = Record<number, string | string[]>;

const chunk = <T,>(arr: T[], size = 3) => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const VocationalTestForm: React.FC = () => {
  const navigate = useNavigate();
  const { setVocationalQuizData } = useFormData();
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    highestEducation: "",
    highSchool: "",
    country: "",
    province: "",
    curriculum: "",
    finalAverage: "",
  });

  const defaultAnswers: AllAnswers = Object.fromEntries(
    QUESTIONS.map((q) => [q.id, q.type === "multi" ? [] : ""])
  );

  const [answers, setAnswers] = useState<AllAnswers>(defaultAnswers);
  const steps = useMemo(() => chunk(QUESTIONS, 3), []);
  const totalSteps = steps.length;
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalQuestions = QUESTIONS.length;
  const totalJourneySteps = totalSteps + 1;

  const answeredCount = useMemo(() => {
    let count = 0;
    Object.values(answers).forEach((value) => {
      if (Array.isArray(value)) {
        if (value.length) count++;
      } else if (value) {
        count++;
      }
    });
    return count;
  }, [answers]);

  const currentQuestions = currentStep > 0 ? steps[currentStep - 1] : [];

  const currentStepAnswered = useMemo(() => {
    if (currentStep === 0) {
      return [formData.name, formData.dateOfBirth, formData.country, formData.curriculum].filter(Boolean).length;
    }

    return currentQuestions.filter((q) => {
      const value = answers[q.id];
      return Array.isArray(value) ? value.length > 0 : Boolean(value);
    }).length;
  }, [answers, currentQuestions, currentStep, formData]);

  const currentStepTotal = currentStep === 0 ? 4 : currentQuestions.length;

  const canContinue = useMemo(() => {
    if (currentStep === 0) {
      return Boolean(formData.name && formData.dateOfBirth);
    }

    return currentStepAnswered === currentStepTotal;
  }, [currentStep, currentStepAnswered, currentStepTotal, formData]);

  const overallProgress = useMemo(() => {
    return Math.round(((currentStep + 1) / totalJourneySteps) * 100);
  }, [currentStep, totalJourneySteps]);

  const personalCompletion = useMemo(() => {
    const requiredFields = [
      formData.name,
      formData.dateOfBirth,
      formData.country,
      formData.curriculum,
    ];
    const filled = requiredFields.filter(Boolean).length;
    return Math.round((filled / requiredFields.length) * 100);
  }, [formData]);

  const stepTitle =
    currentStep === 0
      ? "Informação Pessoal"
      : `Bloco ${currentStep} de ${totalSteps}`;

  const handleAnswer = (id: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const toggleMulti = (id: number, opt: string) => {
    setAnswers((prev) => {
      const arr = Array.isArray(prev[id]) ? [...(prev[id] as string[])] : [];

      if (arr.includes(opt)) {
        return { ...prev, [id]: arr.filter((o) => o !== opt) };
      }

      if (arr.length >= 3) return prev;

      return { ...prev, [id]: [...arr, opt] };
    });
  };

  const goNext = () => {
    if (!canContinue) return;
    setCurrentStep((s) => Math.min(s + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setCurrentStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToStep = (target: number) => {
    if (target <= currentStep) {
      setCurrentStep(target);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canContinue) return;

    setLoading(true);
    setVocationalQuizData({ answers });

    try {
      const knownCourse = JSON.parse(
        localStorage.getItem("knownCourseData") || "{}"
      );

      const response = await fetch(`${API_URL}/study-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personal: formData,
          vocational: answers,
          knownCourse,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem("studyPlan", JSON.stringify(data.result));
      navigate("/results");
    } catch (err) {
      console.error("Failed to send data:", err);
      alert("Ocorreu um erro ao enviar os dados. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  };

  const optionButtonClass = (selected = false) =>
    `group relative overflow-hidden rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all duration-300 ${
      selected
        ? "border-transparent bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20"
        : "border-gray-200 bg-white text-gray-700 hover:border-cyan-200 hover:bg-cyan-50/60 hover:text-cyan-700"
    }`;

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100";

  const sectionCardClass =
    "rounded-[2rem] border border-gray-200/80 bg-white/95 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.18)] backdrop-blur-xl";

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-indigo-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-120px] top-[-60px] h-80 w-80 rounded-full bg-cyan-200/50 blur-3xl" />
        <div className="absolute right-[-140px] top-1/4 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute bottom-[-80px] left-1/3 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row"
      >
        <aside className={`lg:w-[350px] ${sectionCardClass} p-5 sm:p-6 lg:sticky lg:top-6 lg:h-fit`}>
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-lg font-bold text-white shadow-lg">
                  TA
                </div>

                <div>
                  <h1 className="text-xl font-black text-gray-900 sm:text-2xl">
                    Teste Vocacional
                  </h1>
                  <p className="text-sm text-gray-500">
                    Responde por blocos simples.
                  </p>
                </div>
              </div>
              </div>


            

            <div className="rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-indigo-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-cyan-600 shadow-sm">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Dica importante
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Responde com sinceridade. O resultado depende da qualidade das tuas respostas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <motion.div
          key={currentStep}
          initial={{ x: 24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`flex-1 ${sectionCardClass} p-5 sm:p-7 lg:p-8`}
        >
          <div className="mb-6 flex flex-col gap-4 rounded-[1.75rem] border border-gray-200 bg-gray-50/80 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">
                <Sparkles className="h-3.5 w-3.5" />
                {currentStep === 0 ? "Etapa inicial" : "Teste vocacional"}
              </div>
              <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">
                {stepTitle}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {currentStep === 0
                  ? "Preenche os teus dados básicos antes de iniciar o teste."
                  : "Seleciona a resposta que melhor representa o teu perfil."}
              </p>
            </div>

            <div className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-gray-600 shadow-sm">
              {currentStep === 0
                ? `${personalCompletion}% perfil`
                : `${currentStepAnswered}/${currentStepTotal} neste bloco`}
            </div>
          </div>

          {currentStep === 0 && (
            <div className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Nome Completo *">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Ex: Nilton Novele"
                    required
                    className={inputClass}
                  />
                </Field>

                <Field label="Data de Nascimento *">
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        setFormData({ ...formData, dateOfBirth: e.target.value })
                      }
                      required
                      className={`${inputClass} pr-11`}
                    />
                    <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>
                </Field>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Nível Académico Mais Elevado">
                  <select
                    value={formData.highestEducation}
                    onChange={(e) =>
                      setFormData({ ...formData, highestEducation: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="">Selecionar</option>
                    <option value="ensino-medio">Ensino Médio</option>
                    <option value="licenciatura">Licenciatura</option>
                    <option value="mestrado">Mestrado</option>
                    <option value="doutoramento">Doutoramento</option>
                  </select>
                </Field>

                <Field label="Escola Secundária">
                  <input
                    type="text"
                    value={formData.highSchool}
                    onChange={(e) =>
                      setFormData({ ...formData, highSchool: e.target.value })
                    }
                    placeholder="Ex: Escola Secundária Josina Machel"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="País">
                  <select
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="">Selecionar</option>
                    {countryOptions.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>

                {formData.country === "Moçambique" ? (
                  <Field label="Província">
                    <div className="relative">
                      <select
                        value={formData.province}
                        onChange={(e) =>
                          setFormData({ ...formData, province: e.target.value })
                        }
                        className={inputClass}
                      >
                        <option value="">Selecionar</option>
                        {provinceOptions.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                      <MapPin className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                  </Field>
                ) : (
                  <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50/70 p-4 text-sm leading-6 text-gray-500">
                    Seleciona <span className="font-semibold">Moçambique</span> para escolheres a província.
                  </div>
                )}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Currículo">
                  <select
                    value={formData.curriculum}
                    onChange={(e) =>
                      setFormData({ ...formData, curriculum: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="">Selecionar</option>
                    <option value="mozambicano">Nacional (Moçambicano)</option>
                    <option value="americano">Americano</option>
                    <option value="britanico">Cambridge</option>
                    <option value="ieb">IEB</option>
                    <option value="outro">Outro</option>
                  </select>
                </Field>

                <Field label="Média Final">
                  <input
                    type="text"
                    value={formData.finalAverage}
                    onChange={(e) =>
                      setFormData({ ...formData, finalAverage: e.target.value })
                    }
                    placeholder={
                      formData.curriculum === "americano"
                        ? "Ex: 3.7 GPA"
                        : formData.curriculum === "mozambicano"
                        ? "Ex: 15/20"
                        : "Ex: 85%"
                    }
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>
          )}

          {currentStep > 0 && (
            <div className="space-y-6">
              {currentQuestions.map((q, index) => {
                const value = answers[q.id];
                const answered = Array.isArray(value) ? value.length > 0 : Boolean(value);

                return (
                  <div
                    key={q.id}
                    className="rounded-[1.75rem] border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-sm font-bold text-white shadow-sm">
                          {index + 1}
                        </div>
                        <label className="pt-1 text-base font-semibold leading-7 text-gray-800">
                          {q.text}
                        </label>
                      </div>

                      {answered ? (
                        <CheckCircle2 className="mt-2 h-5 w-5 shrink-0 text-emerald-500" />
                      ) : (
                        <Circle className="mt-2 h-5 w-5 shrink-0 text-gray-300" />
                      )}
                    </div>

                    {q.type === "multi" && (
                      <div className="mb-3 flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-700">
                        <AlertCircle className="h-4 w-4" />
                        Podes selecionar até 3 opções.
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {q.options?.map((opt) => {
                        const selected =
                          q.type === "multi"
                            ? (answers[q.id] as string[]).includes(opt)
                            : answers[q.id] === opt;

                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() =>
                              q.type === "multi"
                                ? toggleMulti(q.id, opt)
                                : handleAnswer(q.id, opt)
                            }
                            className={optionButtonClass(selected)}
                          >
                            <span className="relative z-10">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Voltar
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2 sm:items-end">
              {!canContinue && (
                <p className="text-xs font-semibold text-amber-600">
                  {currentStep === 0
                    ? "Preenche nome e data de nascimento para continuar."
                    : "Responde todas as perguntas deste bloco para avançar."}
                </p>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canContinue}
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all ${
                    canContinue
                      ? "bg-gradient-to-r from-cyan-500 to-indigo-600 hover:-translate-y-0.5 hover:shadow-xl"
                      : "cursor-not-allowed bg-gray-300"
                  }`}
                >
                  {currentStep === 0 ? "Começar Teste" : "Próximo"}
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !canContinue}
                  className={`inline-flex min-w-[170px] items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all ${
                    loading || !canContinue
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:-translate-y-0.5 hover:shadow-xl"
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Submeter Teste
                      <CheckCircle2 className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </form>

      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-2xl transition-transform hover:scale-105"
        aria-label="Abrir informações"
      >
        <Info className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 z-40 bg-black"
            />
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-xl rounded-[2rem] border border-gray-200 bg-white p-6 shadow-2xl sm:p-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="mb-6">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Responsáveis
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">
                    Equipa de Apoio
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Estes são os responsáveis ligados ao acompanhamento deste processo.
                  </p>
                </div>

                <div className="space-y-4">
                  {professors.map((p) => (
                    <div
                      key={p.name}
                      className="flex items-center gap-4 rounded-3xl border border-gray-200 bg-gray-50/80 p-4 transition hover:shadow-md"
                    >
                      <img
                        src={p.picture}
                        alt={p.name}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{p.name}</p>
                        <p className="text-sm text-gray-600">{p.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      {children}
    </div>
  );
}

export default VocationalTestForm;