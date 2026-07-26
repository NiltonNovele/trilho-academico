import React, { useMemo, useState } from "react";
import {
  FaMapMarkerAlt,
  FaBed,
  FaRunning,
  FaCoffee,
  FaChurch,
  FaFilm,
  FaShoppingBag,
  FaLandmark,
  FaStar,
} from "react-icons/fa";
import {
  Search,
  Sparkles,
  Building2,
  Compass,
  Globe2,
  RefreshCw,
  Loader2,
  MapPin,
  ExternalLink,
  Info,
  SlidersHorizontal,
  X,
  Home,
  Dumbbell,
  Coffee,
  Church,
  Film,
  ShoppingBag,
  Landmark,
  ShieldCheck,
  MousePointerClick,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_AI_SEARCH_API_URL || "http://localhost:5001";

type TabType = "Acomodações" | "Atividades";

type AIItem = {
  id: string;
  nome: string;
  descricao: string;
  pais: string;
  cidade?: string;
  universidade?: string;
  tipo?: string;
  preco?: string | null;
  imagem?: string | null;
  lat?: number | null;
  lng?: number | null;
  rating?: number | null;
  reviewsCount?: number | null;
  reviewSummary?: string;
  website?: string | null;
  googleMapsUrl?: string | null;
  searchUrl?: string | null;
  confidence?: "Alta" | "Média" | "Baixa";
};

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

const activityOptions = [
  "Desporto",
  "Igreja",
  "Café",
  "Ginásio",
  "Cinema",
  "Shopping",
  "Museu",
  "Biblioteca",
  "Restaurante",
  "Coworking",
];

const quickSearches: Record<TabType, string[]> = {
  Acomodações: [
    "Residências estudantis perto de universidades em Lisboa",
    "Alojamento estudantil acessível na Cidade do Cabo",
    "Flats para estudantes perto da APU na Malásia",
    "Acomodação para estudantes moçambicanos em Portugal",
  ],
  Atividades: [
    "Ginásios e cafés para estudantes em Maputo",
    "Bibliotecas e coworking perto de universidades em Lisboa",
    "Atividades culturais para estudantes na Cidade do Cabo",
    "Igrejas, shoppings e cinemas perto de estudantes",
  ],
};

const AccommodationExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Acomodações");
  const [searchQuery, setSearchQuery] = useState("");
  const [paisSelecionado, setPaisSelecionado] = useState("");
  const [tipoAtividadeSelecionada, setTipoAtividadeSelecionada] = useState("");
  const [items, setItems] = useState<AIItem[]>([]);
  const [isSearchingAI, setIsSearchingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const resultsCount = items.length;

  const searchPlaceholder =
    activeTab === "Acomodações"
      ? "Ex: residência estudantil perto da Universidade de Lisboa"
      : "Ex: ginásios e cafés perto da universidade em Maputo";

  const fullQuery = useMemo(() => {
    const parts = [searchQuery.trim()];

    if (paisSelecionado) parts.push(`País: ${paisSelecionado}`);
    if (activeTab === "Atividades" && tipoAtividadeSelecionada) {
      parts.push(`Tipo: ${tipoAtividadeSelecionada}`);
    }

    return parts.filter(Boolean).join(" | ");
  }, [searchQuery, paisSelecionado, tipoAtividadeSelecionada, activeTab]);

  const hasInput = Boolean(fullQuery.trim());

  const getIcon = (tipo?: string) => {
    switch (tipo) {
      case "Desporto":
        return <FaRunning className="text-green-500" />;
      case "Café":
        return <FaCoffee className="text-orange-500" />;
      case "Ginásio":
        return <FaBed className="text-purple-500" />;
      case "Igreja":
        return <FaChurch className="text-indigo-500" />;
      case "Cinema":
        return <FaFilm className="text-red-500" />;
      case "Shopping":
        return <FaShoppingBag className="text-pink-500" />;
      case "Museu":
        return <FaLandmark className="text-yellow-500" />;
      default:
        return <FaMapMarkerAlt className="text-blue-500" />;
    }
  };

  const handleAISearch = async () => {
    if (!hasInput) {
      setAiError("Escreve o que procuras ou escolhe pelo menos um filtro.");
      return;
    }

    setIsSearchingAI(true);
    setAiError(null);
    setHasSearched(true);

    try {
      const response = await fetch(`${API_URL}/api/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: fullQuery, tab: activeTab, limit: 8 }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Erro ao pesquisar com IA.");
      }

      const data = await response.json();
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch (err: any) {
      setAiError(err.message || "Erro ao pesquisar com IA.");
      setItems([]);
    } finally {
      setIsSearchingAI(false);
    }
  };

  const resetSearch = () => {
    setSearchQuery("");
    setPaisSelecionado("");
    setTipoAtividadeSelecionada("");
    setItems([]);
    setAiError(null);
    setHasSearched(false);
  };

  const changeTab = (tab: TabType) => {
    setActiveTab(tab);
    setItems([]);
    setAiError(null);
    setHasSearched(false);
    setTipoAtividadeSelecionada("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50 px-4 py-6 sm:px-6 lg:px-8">
      {isSearchingAI && <LoadingOverlay />}

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-90px] top-0 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute right-[-70px] top-24 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-200/25 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <section className="mb-7 overflow-hidden rounded-[2rem] border border-gray-200/70 bg-white/90 p-5 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
                <Sparkles className="h-4 w-4" />
                Pesquisa académica inteligente
              </div>

              <h1 className="text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Explora{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  alojamento e atividades
                </span>{" "}
                para estudantes
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                Procura opções úteis por país, cidade, universidade ou rotina
                académica. A IA organiza sugestões com links, mapas e contexto
                para te ajudar a decidir melhor.
              </p>

              {/* <div className="mt-6 flex flex-wrap gap-3">
                <Badge text={`${resultsCount} resultado${resultsCount !== 1 ? "s" : ""}`} />
                <Badge text={activeTab} />
                <Badge text="Fonte: IA" tone="purple" />
              </div> */}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <MiniCard
                icon={<Home className="h-5 w-5" />}
                title="Acomodações"
                text="Residências, flats, studios e opções próximas de universidades."
              />
              <MiniCard
                icon={<Compass className="h-5 w-5" />}
                title="Atividades"
                text="Ginásios, cafés, bibliotecas, shoppings e espaços úteis."
              />
            </div>
          </div>
        </section>

        <section className="sticky top-3 z-30 mb-7 rounded-[2rem] border border-gray-200/70 bg-white/90 p-4 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-5 lg:top-5">
          <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                <SlidersHorizontal className="h-4 w-4 text-purple-600" />
                Pesquisa com IA
              </div>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Quanto mais específico fores, melhores serão os resultados.
              </p>
            </div>

            <div className="grid w-full grid-cols-2 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm lg:w-fit">
              {(["Acomodações", "Atividades"] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => changeTab(tab)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-5 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm transition focus-within:border-purple-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-purple-100">
                <Search className="h-4 w-4 shrink-0 text-gray-400" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (aiError) setAiError(null);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleAISearch()}
                  className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="rounded-full p-1 text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="relative">
                <Globe2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full appearance-none rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-100"
                  value={paisSelecionado}
                  onChange={(e) => setPaisSelecionado(e.target.value)}
                >
                  <option value="">Qualquer país</option>
                  {countryOptions.map((pais) => (
                    <option key={pais} value={pais}>
                      {pais}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {activeTab === "Atividades" && (
              <div className="lg:col-span-2">
                <select
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-100"
                  value={tipoAtividadeSelecionada}
                  onChange={(e) => setTipoAtividadeSelecionada(e.target.value)}
                >
                  <option value="">Qualquer tipo</option>
                  {activityOptions.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div
              className={
                activeTab === "Atividades" ? "lg:col-span-2" : "lg:col-span-4"
              }
            >
              <div className="flex gap-3">
                <button
                  onClick={handleAISearch}
                  disabled={isSearchingAI}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSearchingAI ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  Pesquisar
                </button>

                <button
                  onClick={resetSearch}
                  className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-600 shadow-sm transition hover:bg-gray-50"
                  title="Limpar pesquisa"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {quickSearches[activeTab].map((item) => (
              <button
                key={item}
                onClick={() => setSearchQuery(item)}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
              >
                <MousePointerClick className="h-3.5 w-3.5" />
                {item}
              </button>
            ))}
          </div>

          {aiError && (
            <div className="mt-4 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              {aiError}
            </div>
          )}
        </section>

        {!hasSearched && (
          <section className="rounded-[2rem] border border-dashed border-purple-200 bg-white/70 px-5 py-12 text-center shadow-sm sm:px-6 sm:py-14">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-purple-50 text-purple-600">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">
              Começa com uma pesquisa
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              Pesquisa por cidade, universidade, país ou rotina. Exemplo:
              “alojamento perto da Universidade de Lisboa” ou “cafés para
              estudar em Maputo”.
            </p>
          </section>
        )}

        {hasSearched && items.length === 0 && !isSearchingAI && (
          <section className="rounded-[2rem] border border-dashed border-gray-300 bg-white/80 px-6 py-16 text-center shadow-sm">
            <FaMapMarkerAlt className="mx-auto mb-4 text-6xl text-gray-300" />
            <h3 className="text-xl font-bold text-gray-900">
              Nenhum resultado encontrado
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-gray-500">
              Tenta uma pesquisa mais específica, incluindo cidade, universidade
              ou tipo de espaço.
            </p>
          </section>
        )}

        {items.length > 0 && (
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <ResultCard
                key={item.id}
                item={item}
                activeTab={activeTab}
                getIcon={getIcon}
              />
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/85 px-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-[2rem] border border-gray-200 bg-white p-6 text-center shadow-2xl">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-purple-600 to-blue-500 text-white shadow-xl">
          <Loader2 className="h-9 w-9 animate-spin" />
        </div>

        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-purple-700">
          <Sparkles className="h-3.5 w-3.5" />
          Pesquisa inteligente
        </div>

        <h3 className="text-xl font-black text-gray-900">
          A procurar opções úteis
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Estamos a organizar resultados com localização, links, avaliações
          disponíveis e contexto útil para estudantes.
        </p>
      </div>
    </div>
  );
}

function ResultCard({
  item,
  activeTab,
  getIcon,
}: {
  item: AIItem;
  activeTab: TabType;
  getIcon: (tipo?: string) => React.ReactNode;
}) {
  const mapsUrl =
    item.googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      item.lat && item.lng
        ? `${item.lat},${item.lng}`
        : `${item.nome} ${item.cidade || ""} ${item.pais || ""}`
    )}`;

  const searchUrl =
    item.searchUrl ||
    `https://www.google.com/search?q=${encodeURIComponent(
      `${item.nome} ${item.cidade || ""} ${item.pais || ""}`
    )}`;

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-gray-200/70 bg-white/95 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-35px_rgba(0,0,0,0.22)]">
      <div className="relative overflow-hidden bg-slate-100">
        {item.imagem ? (
          <img
            src={item.imagem}
            alt={item.nome}
            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-52 w-full items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
            {activeTab === "Acomodações" ? (
              <Building2 className="h-12 w-12 text-purple-400" />
            ) : (
              <Compass className="h-12 w-12 text-blue-400" />
            )}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-700 backdrop-blur">
          {activeTab === "Acomodações" ? "Acomodação" : item.tipo || "Atividade"}
        </div>

        {item.rating && (
          <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-white shadow-md">
            <FaStar />
            {item.rating.toFixed(1)}
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500">
          {activeTab === "Atividades" ? (
            <>
              {getIcon(item.tipo)}
              <span>{item.tipo || "Atividade"}</span>
            </>
          ) : (
            <>
              <Building2 className="h-4 w-4 text-indigo-500" />
              <span>{item.universidade || "Acomodação estudantil"}</span>
            </>
          )}
        </div>

        <h3 className="text-xl font-black leading-tight text-gray-900">
          {item.nome}
        </h3>

        <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-500">
          {item.cidade && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
              <MapPin className="h-3.5 w-3.5" />
              {item.cidade}
            </span>
          )}
          {item.pais && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
              <FaMapMarkerAlt className="text-blue-500" />
              {item.pais}
            </span>
          )}
        </div>

        {(item.rating || item.reviewSummary) && (
          <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 p-4">
            {item.rating && (
              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-700">
                <FaStar />
                {item.rating.toFixed(1)}
                {item.reviewsCount ? (
                  <span className="font-medium text-amber-700/80">
                    ({item.reviewsCount} avaliações)
                  </span>
                ) : null}
              </div>
            )}
            {item.reviewSummary && (
              <p className="line-clamp-3 text-sm leading-6 text-gray-700">
                {item.reviewSummary}
              </p>
            )}
          </div>
        )}

        <p className="mt-4 line-clamp-4 text-sm leading-7 text-gray-600">
          {item.descricao || "Sem descrição disponível."}
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {item.preco && <InfoBox label="Preço estimado" value={item.preco} />}
          {item.confidence && <InfoBox label="Confiança" value={item.confidence} />}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <MapPin className="h-4 w-4" />
            Mapa
          </a>

          <a
            href={item.website || searchUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02]"
          >
            Ver mais
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-5 flex items-start gap-2 rounded-2xl bg-slate-50 p-3 text-xs leading-5 text-gray-500">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          Confirma disponibilidade, preços e detalhes diretamente com a entidade
          ou no Google Maps.
        </div>
      </div>
    </article>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function MiniCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-gray-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md">
        {icon}
      </div>
      <h3 className="font-bold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
    </div>
  );
}

function Badge({
  text,
  tone = "blue",
}: {
  text: string;
  tone?: "blue" | "purple";
}) {
  return (
    <div
      className={`rounded-full px-4 py-2 text-sm font-medium ${
        tone === "purple"
          ? "bg-purple-50 text-purple-700"
          : "bg-blue-50 text-blue-700"
      }`}
    >
      {text}
    </div>
  );
}

export default AccommodationExplorer;