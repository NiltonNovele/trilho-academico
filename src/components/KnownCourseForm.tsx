import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Heart,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
  GraduationCap,
  BookOpen,
  Sparkles,
  School,
  CalendarDays,
  Wallet,
  Languages,
  ShieldCheck,
  ChevronDown,
  Info,
  Home,
  Plus,
} from "lucide-react";
import { useFormData, KnownCourseData } from "./FormDataContext";

const steps = [
  "Informação Pessoal",
  "Curso e Preferências",
  "Localização",
  "Orçamento & Idiomas",
  "Interesses & Observações",
];

const countryOptions = [
  "Moçambique",
  "África do Sul",
  "Polónia",
  "Brasil",
  "Índia",
  "Reino Unido",
  "Estados Unidos da América",
  "Chipre",
  "Portugal",
  "Malásia",
  "Alemanha",
  "Espanha",
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
  "Cabo Delgado",
  "Niassa",
];

const accommodationOptions = [
  "Apartamento / Flat",
  "Residência Estudantil",
  "Studio",
  "Casa Partilhada",
];

const fundingOptions = [
  "Recursos próprios",
  "Bolsa de estudo",
  "Empréstimo bancário",
  "Apoio familiar",
  "Outros",
];

const stepIcons = [User, BookOpen, MapPin, Wallet, Heart];

const KnownCourseForm: React.FC = () => {
  const navigate = useNavigate();
  const { setKnownCourseData } = useFormData();

  const [step, setStep] = useState(1);
  const [mobileStepOpen, setMobileStepOpen] = useState(false);

  const [formData, setFormData] = useState<
    KnownCourseData & {
      name?: string;
      dateOfBirth?: string;
      highestEducation?: string;
      highSchool?: string;
      country?: string;
      province?: string;
      curriculum?: string;
      finalAverage?: string;
      hasAccommodation?: string;
      accommodationType?: string;
      studyMode?: string;
      startDate?: string;
      startMonthYear?: string;
      duration?: string;
      visaConcerns?: string;
    }
  >({
    name: "",
    dateOfBirth: "",
    highestEducation: "",
    highSchool: "",
    country: "",
    province: "",
    curriculum: "",
    finalAverage: "",
    course: "",
    alternativeCourses: [""],
    targetUniversities: "",
    preferredRegions: "",
    desiredCountries: [],
    startDate: "",
    duration: "",
    budget: "",
    currency: "MZN",
    livingPreference: "",
    studyMode: "",
    fundingType: "",
    visaConcerns: "",
    hasAccommodation: "no",
    accommodationType: "",
    languages: [""],
    interests: "",
    notes: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileStepOpen(false);
  }, [step]);

  const progress = useMemo(() => (step / steps.length) * 100, [step]);
  const currentStepLabel = steps[step - 1];
  const CurrentIcon = stepIcons[step - 1];

  const completionHints = useMemo(() => {
    const completed = [
      formData.name,
      formData.dateOfBirth,
      formData.course,
      formData.desiredCountries?.length,
      formData.budget,
      formData.languages?.filter(Boolean).length,
      formData.interests,
    ].filter(Boolean).length;

    return Math.min(Math.round((completed / 7) * 100), 100);
  }, [formData]);

  const updateField = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (
    field: "alternativeCourses" | "languages",
    index: number,
    value: string
  ) => {
    const updated = [...(formData[field] as string[])];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const addField = (field: "alternativeCourses" | "languages") => {
    setFormData({
      ...formData,
      [field]: [...(formData[field] as string[]), ""],
    });
  };

  const removeField = (field: "alternativeCourses" | "languages", index: number) => {
    const current = formData[field] as string[];
    if (current.length === 1) return;

    setFormData({
      ...formData,
      [field]: current.filter((_, i) => i !== index),
    });
  };

  const handleCountrySelection = (value: string) => {
    let updated = [...(formData.desiredCountries || [])];

    if (updated.includes(value)) {
      updated = updated.filter((c) => c !== value);
    } else {
      if (updated.length >= 3) {
        alert("Só podes selecionar até 3 países preferidos.");
        return;
      }
      updated.push(value);
    }

    setFormData({ ...formData, desiredCountries: updated });
  };

  const toggleCommaValue = (field: "accommodationType" | "fundingType", value: string) => {
    const current = formData[field] ? formData[field]!.split(",").filter(Boolean) : [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    setFormData({ ...formData, [field]: updated.join(",") });
  };

  const nextStep = () => {
    if (step < steps.length) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const goToStep = (target: number) => {
    if (target <= step || target === step + 1) {
      setStep(target);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step !== steps.length) return;

    const cleanedData = {
      ...formData,
      alternativeCourses: formData.alternativeCourses.filter(Boolean),
      languages: formData.languages.filter(Boolean),
    };

    setKnownCourseData(cleanedData);
    navigate("/results");
  };

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100";
  const labelClass = "mb-2 block text-sm font-bold text-gray-700";
  const sectionTitleClass =
    "flex items-center gap-2 text-xl font-black text-gray-900 sm:text-2xl";
  const cardClass =
    "rounded-[2rem] border border-gray-200/80 bg-white/95 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.26)] backdrop-blur-xl";

  const OptionCard = ({
    selected,
    children,
    onClick,
  }: {
    selected: boolean;
    children: React.ReactNode;
    onClick: () => void;
  }) => (
    <label
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition ${
        selected
          ? "border-indigo-500 bg-indigo-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/40"
      }`}
    >
      {children}
    </label>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 text-center sm:mb-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Plano detalhado e personalizado
          </div>

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-xl">
            <GraduationCap className="h-8 w-8" />
          </div>

          <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Plano de Estudos{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Detalhado
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Preenche por etapas. O objetivo é recolher informação suficiente para gerar
            recomendações mais úteis e alinhadas ao teu perfil.
          </p>
        </div>

        {/* Mobile step controller */}
        <div className="mb-6 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileStepOpen((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-[1.5rem] border border-indigo-100 bg-white/95 p-4 shadow-lg"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
                <CurrentIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-600">
                  Passo {step} de {steps.length}
                </p>
                <p className="text-sm font-black text-gray-900">{currentStepLabel}</p>
              </div>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-gray-500 transition ${
                mobileStepOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {mobileStepOpen && (
            <div className="mt-3 rounded-[1.5rem] border border-gray-200 bg-white p-3 shadow-xl">
              {steps.map((item, index) => {
                const targetStep = index + 1;
                const Icon = stepIcons[index];
                const isActive = targetStep === step;
                const isAvailable = targetStep <= step || targetStep === step + 1;

                return (
                  <button
                    key={item}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => goToStep(targetStep)}
                    className={`mb-2 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition last:mb-0 ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : isAvailable
                        ? "hover:bg-gray-50 text-gray-700"
                        : "cursor-not-allowed text-gray-400"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-semibold">{item}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* Sidebar */}
          <aside className={`${cardClass} hidden h-fit p-6 lg:sticky lg:top-6 lg:block`}>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg">
                <School className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                  Trilho Académico
                </p>
                <h2 className="text-lg font-black text-gray-900">Formulário Guiado</h2>
              </div>
            </div>

            <div className="mb-5 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-600">
                Passo atual
              </p>
              <h3 className="mt-2 text-lg font-black text-gray-900">
                {currentStepLabel}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Etapa {step} de {steps.length}
              </p>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs font-bold text-gray-500">
                  <span>Progresso</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/80">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {steps.map((item, index) => {
                const targetStep = index + 1;
                const Icon = stepIcons[index];
                const isActive = targetStep === step;
                const isCompleted = targetStep < step;
                const isAvailable = targetStep <= step || targetStep === step + 1;

                return (
                  <button
                    key={item}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => goToStep(targetStep)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                      isActive
                        ? "border border-indigo-100 bg-indigo-50"
                        : isCompleted
                        ? "bg-emerald-50/70 hover:bg-emerald-50"
                        : isAvailable
                        ? "bg-gray-50/70 hover:bg-gray-100"
                        : "cursor-not-allowed bg-gray-50/40 opacity-60"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-2xl text-sm font-bold ${
                        isCompleted
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                          : isActive
                          ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white"
                          : "border border-gray-200 bg-white text-gray-500"
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        isActive
                          ? "text-indigo-700"
                          : isCompleted
                          ? "text-emerald-700"
                          : "text-gray-600"
                      }`}
                    >
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-3xl border border-gray-200 bg-gray-50/80 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-gray-900">Dica rápida</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Não precisas ter todas as respostas perfeitas. Preenche o que souberes
                    com clareza.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter" && step !== steps.length) e.preventDefault();
            }}
            className={`${cardClass} p-5 sm:p-8 lg:p-10`}
          >
            <div className="mb-8 flex flex-col gap-4 rounded-[1.75rem] border border-gray-200 bg-gray-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md">
                  <CurrentIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                    Etapa {step}
                  </p>
                  <h2 className="text-lg font-black text-gray-900">
                    {currentStepLabel}
                  </h2>
                </div>
              </div>

              <div className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-gray-600 shadow-sm">
                Dados preenchidos:{" "}
                <span className="text-indigo-600">{completionHints}%</span>
              </div>
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-8">
                <StepHeader
                  icon={<User className="h-5 w-5 text-indigo-600" />}
                  title="Informação Pessoal"
                  description="Começa pelos teus dados pessoais e académicos básicos."
                  sectionTitleClass={sectionTitleClass}
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Nome Completo *" labelClass={labelClass}>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Ex: Nilton Novele"
                      required
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Data de Nascimento *" labelClass={labelClass}>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateField("dateOfBirth", e.target.value)}
                        required
                        className={`${inputClass} pr-11`}
                      />
                      <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                  </Field>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Nível Académico Mais Elevado" labelClass={labelClass}>
                    <select
                      value={formData.highestEducation}
                      onChange={(e) => updateField("highestEducation", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Selecionar</option>
                      <option value="ensino-medio">Ensino Médio</option>
                      <option value="licenciatura">Licenciatura</option>
                      <option value="mestrado">Mestrado</option>
                      <option value="doutoramento">Doutoramento</option>
                    </select>
                  </Field>

                  <Field label="Escola Secundária" labelClass={labelClass}>
                    <input
                      type="text"
                      value={formData.highSchool}
                      onChange={(e) => updateField("highSchool", e.target.value)}
                      placeholder="Ex: Escola Secundária Josina Machel"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="País" labelClass={labelClass}>
                    <select
                      value={formData.country}
                      onChange={(e) => updateField("country", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Selecionar</option>
                      {countryOptions.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </Field>

                  {formData.country === "Moçambique" ? (
                    <Field label="Província" labelClass={labelClass}>
                      <select
                        value={formData.province}
                        onChange={(e) => updateField("province", e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Selecionar</option>
                        {provinceOptions.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </Field>
                  ) : (
                    <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50/80 p-4 text-sm leading-6 text-gray-500">
                      Seleciona <span className="font-bold">Moçambique</span> para
                      escolheres a província.
                    </div>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Currículo" labelClass={labelClass}>
                    <select
                      value={formData.curriculum}
                      onChange={(e) => updateField("curriculum", e.target.value)}
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

                  <Field label="Média Final" labelClass={labelClass}>
                    <input
                      type="text"
                      value={formData.finalAverage}
                      onChange={(e) => updateField("finalAverage", e.target.value)}
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

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-8">
                <StepHeader
                  icon={<BookOpen className="h-5 w-5 text-indigo-600" />}
                  title="Curso e Preferências"
                  description="Indica o curso que tens em mente e as tuas preferências de estudo."
                  sectionTitleClass={sectionTitleClass}
                />

                <Field label="Curso Principal" labelClass={labelClass}>
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) => updateField("course", e.target.value)}
                    placeholder="Ex: Engenharia Informática"
                    className={inputClass}
                  />
                </Field>

                <Field label="Cursos Alternativos" labelClass={labelClass}>
                  <div className="space-y-3">
                    {formData.alternativeCourses.map((course, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={course}
                          onChange={(e) =>
                            handleArrayChange("alternativeCourses", index, e.target.value)
                          }
                          placeholder={`Curso alternativo #${index + 1}`}
                          className={inputClass}
                        />
                        {formData.alternativeCourses.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeField("alternativeCourses", index)}
                            className="rounded-2xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-500 hover:bg-gray-50"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <AddButton onClick={() => addField("alternativeCourses")}>
                    Adicionar curso alternativo
                  </AddButton>
                </Field>

                <Field label="Já tens alojamento?" labelClass={labelClass}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { value: "yes", label: "Sim, já tenho" },
                      { value: "no", label: "Ainda não tenho" },
                    ].map((option) => {
                      const selected = formData.hasAccommodation === option.value;

                      return (
                        <OptionCard
                          key={option.value}
                          selected={selected}
                          onClick={() => updateField("hasAccommodation", option.value)}
                        >
                          <input
                            type="radio"
                            name="hasAccommodation"
                            value={option.value}
                            checked={selected}
                            onChange={(e) => updateField("hasAccommodation", e.target.value)}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span
                            className={`text-sm font-bold ${
                              selected ? "text-indigo-700" : "text-gray-700"
                            }`}
                          >
                            {option.label}
                          </span>
                        </OptionCard>
                      );
                    })}
                  </div>
                </Field>

                {formData.hasAccommodation === "no" && (
                  <Field label="Tipo de alojamento preferido" labelClass={labelClass}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {accommodationOptions.map((option) => {
                        const selected =
                          formData.accommodationType?.split(",").includes(option) ||
                          false;

                        return (
                          <OptionCard
                            key={option}
                            selected={selected}
                            onClick={() => toggleCommaValue("accommodationType", option)}
                          >
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() => toggleCommaValue("accommodationType", option)}
                              className="text-indigo-600 focus:ring-indigo-500"
                            />
                            <span
                              className={`text-sm font-bold ${
                                selected ? "text-indigo-700" : "text-gray-700"
                              }`}
                            >
                              {option}
                            </span>
                          </OptionCard>
                        );
                      })}
                    </div>
                  </Field>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Modo de Estudo" labelClass={labelClass}>
                    <select
                      value={formData.studyMode}
                      onChange={(e) => updateField("studyMode", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Selecionar</option>
                      <option value="full-time">Presencial</option>
                      <option value="part-time">Online</option>
                      <option value="hybrid">Híbrido</option>
                    </select>
                  </Field>

                  <Field label="Mês e Ano de Início Desejado" labelClass={labelClass}>
                    <input
                      type="month"
                      value={formData.startDate}
                      onChange={(e) => updateField("startDate", e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Duração do Curso" labelClass={labelClass}>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => updateField("duration", e.target.value)}
                      placeholder="Ex: 3 anos, 6 semestres..."
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Observações" labelClass={labelClass}>
                    <textarea
                      value={formData.visaConcerns}
                      onChange={(e) => updateField("visaConcerns", e.target.value)}
                      placeholder="Conta-nos algo importante"
                      className={`${inputClass} min-h-[110px] resize-none`}
                    />
                  </Field>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-8">
                <StepHeader
                  icon={<MapPin className="h-5 w-5 text-indigo-600" />}
                  title="Localização Preferida"
                  description="Escolhe os destinos e universidades que mais te interessam."
                  sectionTitleClass={sectionTitleClass}
                />

                <Field label="Onde gostarias de estudar?" labelClass={labelClass}>
                  <textarea
                    value={formData.preferredRegions}
                    onChange={(e) => updateField("preferredRegions", e.target.value)}
                    placeholder="Ex: Maputo, Lisboa, Cidade do Cabo..."
                    className={`${inputClass} min-h-[110px] resize-none`}
                  />
                </Field>

                <Field label="Países de Interesse (máx. 3)" labelClass={labelClass}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {countryOptions.map((country) => {
                      const selected =
                        formData.desiredCountries?.includes(country) || false;

                      return (
                        <OptionCard
                          key={country}
                          selected={selected}
                          onClick={() => handleCountrySelection(country)}
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => handleCountrySelection(country)}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span
                            className={`text-sm font-bold ${
                              selected ? "text-indigo-700" : "text-gray-700"
                            }`}
                          >
                            {country}
                          </span>
                        </OptionCard>
                      );
                    })}
                  </div>

                  {formData.desiredCountries?.length > 0 && (
                    <div className="mt-4 rounded-2xl bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
                      <span className="font-bold">Selecionados:</span>{" "}
                      {formData.desiredCountries.join(", ")}
                    </div>
                  )}
                </Field>

                <Field label="Universidades de Interesse" labelClass={labelClass}>
                  <input
                    type="text"
                    value={formData.targetUniversities}
                    onChange={(e) => updateField("targetUniversities", e.target.value)}
                    placeholder="Ex: UEM, UCT, Wits, Harvard..."
                    className={inputClass}
                  />
                </Field>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="space-y-8">
                <StepHeader
                  icon={<Wallet className="h-5 w-5 text-indigo-600" />}
                  title="Orçamento & Idiomas"
                  description="Ajuda-nos a perceber o teu orçamento e preferências linguísticas."
                  sectionTitleClass={sectionTitleClass}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Orçamento Estimado (por ano)" labelClass={labelClass}>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        type="number"
                        value={formData.budget}
                        onChange={(e) => updateField("budget", e.target.value)}
                        placeholder="Ex: 500000"
                        className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                      />
                      <select
                        value={formData.currency}
                        onChange={(e) => updateField("currency", e.target.value)}
                        className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                      >
                        <option value="MZN">MZN</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="ZAR">ZAR</option>
                      </select>
                    </div>
                  </Field>

                  <Field label="Como pretendes financiar os estudos?" labelClass={labelClass}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {fundingOptions.map((option) => {
                        const selected =
                          formData.fundingType?.split(",").includes(option) || false;

                        return (
                          <OptionCard
                            key={option}
                            selected={selected}
                            onClick={() => toggleCommaValue("fundingType", option)}
                          >
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() => toggleCommaValue("fundingType", option)}
                              className="text-indigo-600 focus:ring-indigo-500"
                            />
                            <span
                              className={`text-sm font-bold ${
                                selected ? "text-indigo-700" : "text-gray-700"
                              }`}
                            >
                              {option}
                            </span>
                          </OptionCard>
                        );
                      })}
                    </div>
                  </Field>
                </div>

                <Field label="Idiomas Preferidos" labelClass={labelClass}>
                  <div className="space-y-3">
                    {formData.languages.map((lang, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={lang}
                            onChange={(e) =>
                              handleArrayChange("languages", index, e.target.value)
                            }
                            placeholder="Ex: Inglês, Português..."
                            className={`${inputClass} pl-11`}
                          />
                          <Languages className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        </div>

                        {formData.languages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeField("languages", index)}
                            className="rounded-2xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-500 hover:bg-gray-50"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <AddButton onClick={() => addField("languages")}>
                    Adicionar idioma
                  </AddButton>
                </Field>
              </div>
            )}

            {/* Step 5 */}
            {step === 5 && (
              <div className="space-y-8">
                <StepHeader
                  icon={<Heart className="h-5 w-5 text-indigo-600" />}
                  title="Interesses & Observações"
                  description="Partilha motivações, interesses e notas finais importantes."
                  sectionTitleClass={sectionTitleClass}
                />

                <Field label="Interesses e Motivações" labelClass={labelClass}>
                  <textarea
                    value={formData.interests}
                    onChange={(e) => updateField("interests", e.target.value)}
                    placeholder="Fala-nos sobre as tuas paixões, objetivos e áreas de interesse..."
                    className={`${inputClass} min-h-[140px] resize-none`}
                  />
                </Field>

                <Field label="Observações Finais" labelClass={labelClass}>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    placeholder="Qualquer informação adicional relevante..."
                    className={`${inputClass} min-h-[140px] resize-none`}
                  />
                </Field>

                <div className="rounded-[1.75rem] border border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900">
                        Quase terminado
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Revê as tuas respostas e submete para receberes o teu plano
                        personalizado.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-10 flex flex-col-reverse gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
  {step > 1 ? (
    <button
      type="button"
      onClick={prevStep}
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50"
    >
      <ArrowLeft className="h-4 w-4" />
      Voltar
    </button>
  ) : (
    <div />
  )}

              {step < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Avançar
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Submeter Formulário
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function StepHeader({
  icon,
  title,
  description,
  sectionTitleClass,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  sectionTitleClass: string;
}) {
  return (
    <div>
      <h2 className={sectionTitleClass}>
        {icon}
        {title}
      </h2>
      <p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function Field({
  label,
  children,
  labelClass,
}: {
  label: string;
  children: React.ReactNode;
  labelClass: string;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

function AddButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-600 transition hover:bg-indigo-100"
    >
      <Plus className="h-4 w-4" />
      {children}
    </button>
  );
}

export default KnownCourseForm;