import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Compass, Home, Sparkles } from "lucide-react";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 px-4">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-80px] top-0 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="absolute right-[-70px] top-24 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-[-60px] left-1/3 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center py-10">
        <div className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left content */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Erro 404
            </div>

            <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Página{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                não encontrada
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-gray-600 sm:text-lg lg:mx-0">
              Oops. Parece que tentaste aceder a uma página que não existe, foi
              movida ou já não está disponível.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Home className="h-4 w-4" />
                Voltar para Início
              </button>

              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md"
              >
                <ArrowLeft className="h-4 w-4" />
                Página anterior
              </button>
            </div>
          </div>
            </div>
          </div>
        </div>
  );
};

export default NotFound;