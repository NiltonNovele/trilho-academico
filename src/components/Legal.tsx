import React, { useMemo, useState } from "react";
import countriesLegal from "../data/countriesLegal.json";
import { generateVisaPDF } from "../utils/pdfGenerator";
import {
  X,
  Mail,
  Phone,
  Instagram,
  MessageSquare,
  FileDown,
  ArrowRightCircle,
  Search,
  ChevronRight,
  FileText,
  ExternalLink,
} from "lucide-react";

type VisaInfo = {
  description?: string;
  requirements?: string[];
  validity?: string;
  steps?: string[];
  pdfLink?: string;
  officialWebsite?: string;
  contact?: {
    address?: string;
    phone?: string;
    email?: string;
  };
};

type Country = {
  id: string | number;
  name: string;
  flag: string;
  description: string;
  visaInfo: Record<string, any>;
  community?: {
    email?: string;
    whatsapp?: string;
    instagram?: string;
  };
};

const LegalDocs: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedVisa, setSelectedVisa] = useState<(VisaInfo & { type: string; countryName?: string }) | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState<Country | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    if (!q) return countriesLegal as Country[];

    return (countriesLegal as Country[]).filter((country) => {
      const visaKeys = Object.keys(country.visaInfo || {})
        .filter((key) => key !== "rules")
        .join(" ")
        .toLowerCase();

      return (
        country.name.toLowerCase().includes(q) ||
        country.description.toLowerCase().includes(q) ||
        visaKeys.includes(q)
      );
    });
  }, [searchQuery]);

  const handleViewMore = (visa: VisaInfo & { type: string; countryName?: string }) => {
    setSelectedVisa(visa);
    setSelectedCountry(null);
  };

  const closeVisaModal = () => setSelectedVisa(null);
  const openContactModal = (country: Country) => setContactModalOpen(country);
  const closeContactModal = () => setContactModalOpen(null);

  const handleDownloadPDF = () => {
    if (selectedVisa) {
      generateVisaPDF(selectedVisa);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-60px] top-[-60px] h-72 w-72 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute right-[-40px] top-20 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),transparent_45%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_35%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        {/* Hero */}
        <div className="mx-auto max-w-4xl text-center">

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
              Documentação Legal
            </span>{" "}
            por País
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg dark:text-gray-300">
            Consulta requisitos, tipos de visto, passos principais e contactos úteis
            de forma clara, moderna e acessível.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-8 max-w-2xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar país ou tipo de visto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white/90 py-4 pl-12 pr-4 text-sm shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/10"
            />
          </div>
        </div>

        {/* Country Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCountries.map((country) => {
            const visaCount = Object.keys(country.visaInfo || {}).filter(
              (key) => key !== "rules"
            ).length;

            return (
              <div
                key={country.id}
                className="group relative overflow-hidden rounded-[28px] border border-gray-200/70 bg-white/90 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_-35px_rgba(0,0,0,0.28)] dark:border-white/10 dark:bg-white/[0.05]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600" />

                <div className="p-6 sm:p-7">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <button
                      onClick={() => setSelectedCountry(country)}
                      className="flex min-w-0 flex-1 items-center gap-4 text-left"
                    >
                      <img
                        src={country.flag}
                        alt={`${country.name} flag`}
                        className="h-14 w-14 shrink-0 rounded-2xl border border-gray-200 object-cover shadow-md dark:border-white/10"
                      />

                      <div className="min-w-0">
                        <h2 className="truncate text-xl font-bold text-gray-900 dark:text-white">
                          {country.name}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {visaCount} tipo{visaCount !== 1 ? "s" : ""} de visto
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => openContactModal(country)}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transition hover:scale-105"
                      title="Contactar Comunidade"
                    >
                      <MessageSquare className="h-5 w-5" />
                    </button>
                  </div>

                  <p className="line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {country.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                      <FileText className="h-3.5 w-3.5" />
                      Ver documentação
                    </div>

                    <button
                      onClick={() => setSelectedCountry(country)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                      Abrir
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCountries.length === 0 && (
          <div className="mt-10 rounded-[28px] border border-dashed border-gray-300 bg-white/60 p-10 text-center dark:border-white/10 dark:bg-white/[0.03]">
            <Search className="mx-auto h-10 w-10 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              Nenhum país encontrado
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Tenta pesquisar por outro país ou tipo de visto.
            </p>
          </div>
        )}
      </div>

      {/* Country Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 px-4 py-6 backdrop-blur-md sm:px-6 sm:py-10">
          <div className="mx-auto w-full max-w-6xl rounded-[32px] border border-gray-200 bg-white/95 p-5 shadow-2xl dark:border-white/10 dark:bg-gray-950/95 sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <img
                  src={selectedCountry.flag}
                  alt={`${selectedCountry.name} flag`}
                  className="h-16 w-16 rounded-2xl border border-gray-200 object-cover shadow-md dark:border-white/10"
                />
                <div className="min-w-0">
                  <h2 className="text-2xl font-black text-gray-900 sm:text-3xl dark:text-white">
                    {selectedCountry.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Documentação e requisitos principais
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCountry(null)}
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-blue-50 via-cyan-50 to-indigo-50 p-5 dark:from-blue-500/10 dark:via-cyan-500/5 dark:to-indigo-500/10">
              <p className="text-sm leading-7 text-gray-700 dark:text-gray-300">
                {selectedCountry.description}
              </p>
            </div>

            {/* Visa grid */}
            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {Object.entries(selectedCountry.visaInfo)
                .filter(([key]) => key !== "rules")
                .map(([visaType, info]: [string, any]) => (
                  <div
                    key={visaType}
                    className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]"
                  >
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold capitalize text-gray-900 dark:text-white">
                          {visaType.replace(/([A-Z])/g, " $1")}
                        </h3>
                        {info.validity && (
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Validade: {info.validity}
                          </p>
                        )}
                      </div>

                      <div className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                        {info.requirements?.length || 0} requisitos
                      </div>
                    </div>

                    <p className="line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {info.description}
                    </p>

                    <button
                      onClick={() =>
                        handleViewMore({
                          type: visaType,
                          countryName: selectedCountry.name,
                          ...info,
                        })
                      }
                      className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                    >
                      Ver mais detalhes
                      <ArrowRightCircle className="h-4 w-4" />
                    </button>
                  </div>
                ))}
            </div>

            {/* Rules */}
            {selectedCountry.visaInfo.rules && (
              <div className="mt-8 rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                <h4 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  Regras Básicas
                </h4>
                <ol className="space-y-3">
                  {selectedCountry.visaInfo.rules.map((rule: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm leading-6 text-gray-700 dark:text-gray-300"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                        {idx + 1}
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Visa Modal */}
      {selectedVisa && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 px-4 py-6 backdrop-blur-md sm:px-6 sm:py-10">
          <div className="mx-auto w-full max-w-4xl rounded-[32px] border border-gray-200 bg-white/95 p-5 shadow-2xl dark:border-white/10 dark:bg-gray-950/95 sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {selectedVisa.countryName || "Informação de Visto"}
                </p>
                <h2 className="mt-1 text-2xl font-black capitalize text-gray-900 sm:text-3xl dark:text-white">
                  {selectedVisa.type.replace(/([A-Z])/g, " $1")}
                </h2>
              </div>

              <button
                onClick={closeVisaModal}
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                  <h4 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                    Descrição
                  </h4>
                  <p className="text-sm leading-7 text-gray-700 dark:text-gray-300">
                    {selectedVisa.description}
                  </p>
                </div>

                {selectedVisa.requirements && selectedVisa.requirements.length > 0 && (
                  <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                    <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                      Requisitos
                    </h4>
                    <ol className="space-y-3">
                      {selectedVisa.requirements.map((req: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm leading-6 text-gray-700 dark:text-gray-300"
                        >
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                            {idx + 1}
                          </span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {selectedVisa.steps && selectedVisa.steps.length > 0 && (
                  <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                    <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                      Processo Passo-a-Passo
                    </h4>
                    <ol className="space-y-3">
                      {selectedVisa.steps.map((step: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm leading-6 text-gray-700 dark:text-gray-300"
                        >
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                  <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                    Informações rápidas
                  </h4>

                  <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    {selectedVisa.validity && (
                      <div className="flex items-start justify-between gap-4 rounded-2xl bg-gray-50 px-4 py-3 dark:bg-white/[0.04]">
                        <span className="font-medium">Validade</span>
                        <span className="text-right">{selectedVisa.validity}</span>
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-4 rounded-2xl bg-gray-50 px-4 py-3 dark:bg-white/[0.04]">
                      <span className="font-medium">Requisitos</span>
                      <span>{selectedVisa.requirements?.length || 0}</span>
                    </div>

                    <div className="flex items-start justify-between gap-4 rounded-2xl bg-gray-50 px-4 py-3 dark:bg-white/[0.04]">
                      <span className="font-medium">Etapas</span>
                      <span>{selectedVisa.steps?.length || 0}</span>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      onClick={handleDownloadPDF}
                      className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                    >
                      <FileDown className="h-4 w-4" />
                      Descarregar PDF
                    </button>

                    {selectedVisa.officialWebsite && (
                      <a
                        href={selectedVisa.officialWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] dark:bg-white dark:text-gray-900"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Website
                      </a>
                    )}
                  </div>
                </div>

                {selectedVisa.contact && (
                  <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                    <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                      Contactos
                    </h4>

                    <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                      {selectedVisa.contact.address && (
                        <div className="rounded-2xl bg-gray-50 px-4 py-3 dark:bg-white/[0.04]">
                          <span className="font-medium">Endereço:</span>{" "}
                          {selectedVisa.contact.address}
                        </div>
                      )}
                      {selectedVisa.contact.phone && (
                        <div className="rounded-2xl bg-gray-50 px-4 py-3 dark:bg-white/[0.04]">
                          <span className="font-medium">Telefone:</span>{" "}
                          {selectedVisa.contact.phone}
                        </div>
                      )}
                      {selectedVisa.contact.email && (
                        <div className="rounded-2xl bg-gray-50 px-4 py-3 dark:bg-white/[0.04] break-all">
                          <span className="font-medium">Email:</span>{" "}
                          {selectedVisa.contact.email}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Community Contact Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-[32px] border border-gray-200 bg-white/95 p-6 text-center shadow-2xl dark:border-white/10 dark:bg-gray-950/95 sm:p-8">
            <button
              onClick={closeContactModal}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
              <MessageSquare className="h-8 w-8" />
            </div>

            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              Comunidade Estudantil
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {contactModalOpen.name}
            </p>

            <p className="mt-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
              Escolhe uma forma rápida e prática de entrar em contacto com a
              comunidade.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {contactModalOpen.community?.email && (
                <a
                  href={`mailto:${contactModalOpen.community.email}`}
                  className="group flex flex-col items-center rounded-3xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]"
                  title="Enviar Email"
                >
                  <Mail className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  <span className="mt-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Email
                  </span>
                </a>
              )}

              {contactModalOpen.community?.whatsapp && (
                <a
                  href={contactModalOpen.community.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center rounded-3xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]"
                  title="WhatsApp"
                >
                  <Phone className="h-7 w-7 text-green-600" />
                  <span className="mt-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    WhatsApp
                  </span>
                </a>
              )}

              {contactModalOpen.community?.instagram && (
                <a
                  href={contactModalOpen.community.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center rounded-3xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]"
                  title="Instagram"
                >
                  <Instagram className="h-7 w-7 text-pink-500" />
                  <span className="mt-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Instagram
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalDocs;