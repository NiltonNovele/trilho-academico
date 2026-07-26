import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Info,
  ArrowRight,
  GraduationCap,
  Compass,
  Gift,
  X,
  Tag,
  Loader2,
  CheckCircle,
  Sparkles,
  ShieldCheck,
  BadgePercent,
  CheckCircle2,
  HelpCircle,
  CreditCard,
  Lock,
} from "lucide-react";

type CardId = "quiz" | "known";

const StepTwo: React.FC = () => {
  const [expanded, setExpanded] = useState<CardId | null>(null);
  const [selectedMobile, setSelectedMobile] = useState<CardId>("quiz");
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState<CardId | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [promoError, setPromoError] = useState("");

  const validPromo = "01SYNCTECHX";

  const colorStyles = {
    emerald: {
      icon: "text-emerald-700",
      text: "text-emerald-950",
      subtext: "text-emerald-900/80",
      button:
        "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700",
      glow: "from-emerald-400/25 via-green-400/15 to-transparent",
      card: "from-white via-emerald-50/80 to-emerald-100/70",
      border: "border-emerald-200/80",
      soft: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    blue: {
      icon: "text-blue-700",
      text: "text-blue-950",
      subtext: "text-blue-900/80",
      button:
        "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
      glow: "from-blue-400/25 via-cyan-400/15 to-transparent",
      card: "from-white via-blue-50/80 to-sky-100/70",
      border: "border-blue-200/80",
      soft: "bg-blue-50 text-blue-700 border-blue-200",
    },
  };

  const cards = useMemo(
    () => [
      {
        id: "quiz" as const,
        title: "Ainda não sei o que quero estudar",
        question: "Ainda tens dúvidas?",
        icon: Compass,
        oldPrice: "500 MZN",
        price: 300,
        priceDisplay: promoApplied ? "300 MZN com oferta aplicada" : "300 MZN",
        discount: promoApplied ? "40% OFF" : undefined,
        shortDesc:
          "Ideal se ainda estás indeciso e queres recomendações personalizadas com base no teu perfil.",
        longDesc:
          "Este teste vocacional completo avalia a tua personalidade, interesses e pontos fortes com base em abordagens reconhecidas internacionalmente. No final, recebes resultados detalhados com cursos e possíveis caminhos académicos alinhados ao teu perfil.",
        color: "blue" as const,
        description:
          "Se ainda estás indeciso, esta é a melhor forma de começares com mais clareza, confiança e direção.",
        highlights: [
          "Teste vocacional",
          "Recomendações personalizadas",
          "Mais confiança na decisão",
        ],
        cta: "Fazer o teste",
        referencePrefix: "QUIZ",
        paymentDescription: "Teste vocacional - Trilho Académico",
        returnUrl: "https://trilhoacademico.edu.mz/vocational-quiz",
      },
      {
        id: "known" as const,
        title: "Já sei o que quero estudar",
        question: "Já tens um curso em mente?",
        icon: GraduationCap,
        price: 150,
        priceDisplay: "150 MZN",
        shortDesc:
          "Perfeito se já escolheste uma área ou curso e queres encontrar universidades, requisitos e caminhos possíveis.",
        longDesc:
          "Ideal para quem já sabe qual curso pretende seguir. Este formulário analisa o curso escolhido e apresenta uma lista personalizada de universidades em Moçambique e no estrangeiro, incluindo requisitos, possibilidades de bolsa e perspetivas de carreira.",
        color: "emerald" as const,
        description:
          "Uma decisão bem orientada pode poupar tempo, reduzir dúvidas e ajudar-te a avançar com mais segurança.",
        highlights: [
          "Universidades recomendadas",
          "Requisitos organizados",
          "Caminho académico claro",
        ],
        cta: "Começar agora",
        referencePrefix: "KNOWN",
        paymentDescription: "Teste de curso conhecido - Trilho Académico",
        returnUrl: "https://trilhoacademico.edu.mz/known-course",
      },
    ],
    [promoApplied]
  );

  const createPaymentReference = (prefix: string) =>
    `${prefix}${Date.now()}${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  const handlePromoApply = () => {
    const normalized = promoCode.trim().toUpperCase();

    if (normalized === validPromo) {
      setPromoApplied(true);
      setPromoError("");
      setShowPromoModal(false);
      setPromoCode("");
    } else {
      setPromoError("Código inválido. Verifica e tenta novamente.");
    }
  };

  const handlePayment = async (card: (typeof cards)[0]) => {
    try {
      setLoadingPayment(card.id);

      const API_URL =
        import.meta.env.VITE_PAYMENTS_API_URL ||
        "https://trilhoacademico.edu.mz/api/payments/create"; //https://trilhoacademico.edu.mz/api/payments/create

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: card.price,
          reference: createPaymentReference(card.referencePrefix),
          description: card.paymentDescription,
          return_url: card.returnUrl,
        }),
      });

      const data = await response.json();

      if (data.status !== "success" || !data.data?.checkout_url) {
        alert(data.message || "❌ Erro ao iniciar pagamento.");
        setLoadingPayment(null);
        return;
      }

      setPaymentSuccess(true);
      setLoadingPayment(null);
      window.location.href = data.data.checkout_url;
    } catch (err) {
      console.error(err);
      setLoadingPayment(null);
      alert("❌ Erro de rede.");
    }
  };

  const visibleCards = cards.filter((card) => card.id === selectedMobile);

  const OptionCard = ({ card }: { card: (typeof cards)[0] }) => {
    const color = colorStyles[card.color];
    const Icon = card.icon;
    const isExpanded = expanded === card.id;
    const isLoading = loadingPayment === card.id;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={`group relative overflow-hidden rounded-[2rem] border ${color.border} bg-gradient-to-br ${color.card} shadow-[0_24px_80px_-45px_rgba(0,0,0,0.25)]`}
      >
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${color.glow}`} />

        <div className="relative z-10 flex h-full flex-col p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white/85 shadow-md backdrop-blur">
                <Icon className={`h-9 w-9 ${color.icon}`} />
              </div>

              <div>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${color.soft}`}
                >
                  {card.question}
                </span>

                <h3 className={`mt-3 text-2xl font-black leading-tight ${color.text} sm:text-3xl`}>
                  {card.title}
                </h3>

                <p className={`mt-3 text-sm leading-7 ${color.subtext}`}>
                  {card.shortDesc}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 sm:block sm:text-right">
              {card.discount && (
                <div className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-bold text-red-600 shadow-sm">
                  <BadgePercent className="h-3.5 w-3.5" />
                  {card.discount}
                </div>
              )}

              <div className="rounded-2xl bg-white/85 px-4 py-3 shadow-sm backdrop-blur">
                {card.oldPrice && (
                  <div className="text-xs font-medium text-gray-400 line-through">
                    {card.oldPrice}
                  </div>
                )}
                <div className={`text-base font-black ${color.text}`}>
                  {card.priceDisplay}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {card.highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm backdrop-blur"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500">
              <ShieldCheck className="h-4 w-4" />
              O que recebes
            </div>
            <p className="text-sm leading-7 text-gray-700 sm:text-[15px]">
              {card.description}
            </p>
          </div>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 overflow-hidden"
              >
                <div className="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-sm backdrop-blur">
                  <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-gray-800">
                    <Info className="h-4 w-4" />
                    Mais detalhes
                  </div>
                  <p className="text-sm leading-7 text-gray-700 sm:text-[15px]">
                    {card.longDesc}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={() => setExpanded(isExpanded ? null : card.id)}
              className={`inline-flex items-center justify-center gap-2 rounded-full bg-white/85 px-4 py-2.5 text-sm font-bold shadow-sm backdrop-blur transition hover:bg-white ${color.text}`}
            >
              <Info className="h-4 w-4" />
              {isExpanded ? "Menos detalhes" : "Mais detalhes"}
            </button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={!!loadingPayment}
              onClick={() => handlePayment(card)}
              className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl ${color.button} ${
                loadingPayment ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  A processar...
                </>
              ) : (
                <>
                  {card.cta}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white px-4 py-10 text-gray-900 sm:px-6 sm:py-14 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-120px] top-[-80px] h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute right-[-140px] top-1/3 h-96 w-96 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute bottom-[-100px] left-1/3 h-80 w-80 rounded-full bg-cyan-100/60 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto mb-10 max-w-5xl text-center sm:mb-14">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-700 shadow-sm">
          <Sparkles className="h-4 w-4" />
          Escolhe o caminho mais adequado para ti
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
        >
          Como queres começar a tua{" "}
          <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
            orientação académica?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg"
        >
          Responde de forma simples: já tens uma ideia do curso que queres seguir
          ou ainda precisas de descobrir o melhor caminho para ti?
        </motion.p>

        <div className="mt-8">
          {promoApplied ? (
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex max-w-full items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg"
            >
              <Gift className="h-5 w-5" />
              <span>Oferta aplicada com sucesso.</span>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setPromoError("");
                setShowPromoModal(true);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg"
            >
              <Tag className="h-4 w-4" />
              Tens um código de oferta?
            </motion.button>
          )}
        </div>
      </div>

      {/* Mobile toggle */}
      <div className="relative z-10 mx-auto mb-6 max-w-xl lg:hidden">
        <div className="rounded-[2rem] border border-gray-200 bg-white/90 p-3 shadow-lg backdrop-blur">
          <p className="mb-3 text-center text-sm font-bold text-gray-700">
            Qual opção descreve melhor a tua situação?
          </p>

          <div className="grid grid-cols-2 gap-2">
            {cards.map((card) => {
              const active = selectedMobile === card.id;
              const color = colorStyles[card.color];

              return (
                <button
                  key={card.id}
                  onClick={() => {
                    setSelectedMobile(card.id);
                    setExpanded(null);
                  }}
                  className={`rounded-2xl border px-3 py-3 text-sm font-bold transition ${
                    active
                      ? `${color.soft} shadow-sm`
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                >
                  {card.id === "known" ? "Já sei" : "Ainda não sei"}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile selected card */}
      <div className="relative z-10 mx-auto max-w-xl lg:hidden">
        <AnimatePresence mode="wait">
          {visibleCards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: selectedMobile === "known" ? -18 : 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: selectedMobile === "known" ? 18 : -18 }}
              transition={{ duration: 0.25 }}
            >
              <OptionCard card={card} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Desktop cards */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        className="relative z-10 mx-auto hidden max-w-6xl grid-cols-1 gap-8 lg:grid lg:grid-cols-2"
      >
        {cards.map((card) => (
          <OptionCard key={card.id} card={card} />
        ))}
      </motion.div>

      <AnimatePresence>
        {showPromoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", duration: 0.45 }}
              className="relative w-full max-w-lg rounded-[2rem] border border-gray-200 bg-white p-6 shadow-2xl sm:p-8"
            >
              <button
                onClick={() => setShowPromoModal(false)}
                className="absolute right-4 top-4 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg">
                  <Gift className="h-7 w-7" />
                </div>

                <h3 className="text-2xl font-black text-gray-900">
                  Tens um código de oferta?
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-600">
                  Introduz o teu código para desbloquear descontos especiais.
                </p>
              </div>

              <div className="mt-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="text"
                    placeholder="Insere o teu código aqui"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      if (promoError) setPromoError("");
                    }}
                    className="w-full rounded-full border border-blue-200 px-4 py-3 text-center text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handlePromoApply}
                    className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:shadow-lg"
                  >
                    Aplicar
                  </motion.button>
                </div>

                {promoError && (
                  <p className="mt-3 text-center text-sm font-medium text-red-600">
                    {promoError}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {paymentSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-xl"
          >
            <CheckCircle className="h-4 w-4" />
            Redirecionando para pagamento...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StepTwo;