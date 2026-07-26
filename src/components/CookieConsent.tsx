import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";

const CookieConsent: React.FC = () => {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const consentimento = localStorage.getItem("cookieConsent");
    if (!consentimento) {
      setVisivel(true);
    }
  }, []);

  const aceitarCookies = () => {
    localStorage.setItem("cookieConsent", "aceite");
    setVisivel(false);
  };

  const recusarCookies = () => {
    localStorage.setItem("cookieConsent", "recusado");
    setVisivel(false);
  };

  return (
    <AnimatePresence>
      {visivel && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] md:hidden"
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-5 md:bottom-5 md:max-w-md"
          >
            <div className="overflow-hidden rounded-[1.75rem] border border-gray-200/80 bg-white/95 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] backdrop-blur-xl">
              {/* Top accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600" />

              <div className="p-5 sm:p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                      <Cookie className="h-5 w-5" />
                    </div>

                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-700">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Privacidade
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-gray-900">
                        Preferências de Cookies
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={recusarCookies}
                    aria-label="Fechar aviso de cookies"
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Content */}
                <p className="mt-4 text-sm leading-7 text-gray-600">
                  Este website utiliza cookies para melhorar a tua experiência de
                  navegação, desempenho e personalização. Ao clicar em{" "}
                  <span className="font-semibold text-gray-900">“Aceitar”</span>,
                  autorizas a utilização de cookies. Podes recusar, se preferires.{" "}
                  <Link
                    to="/terms"
                    className="font-medium text-blue-600 underline underline-offset-4 transition hover:text-blue-700"
                  >
                    Saiba mais
                  </Link>
                  .
                </p>

                {/* Buttons */}
                <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    onClick={recusarCookies}
                    className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Recusar
                  </button>

                  <button
                    onClick={aceitarCookies}
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Aceitar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;