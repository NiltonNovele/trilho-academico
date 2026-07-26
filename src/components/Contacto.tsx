import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  MessageCircle,
  Send,
  Sparkles,
  ShieldCheck,
  Bell,
} from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    title: "WhatsApp",
    value: "+258 84 752 9665",
    href: "https://wa.me/258847529665",
    action: "Mensagem",
    iconBg: "from-emerald-500 to-green-600",
  },
  {
    icon: Mail,
    title: "Email",
    value: "ajuda@trilhoacademico.edu.mz",
    href: "mailto:ajuda@trilhoacademico.edu.mz",
    action: "Email",
    iconBg: "from-sky-500 to-blue-600",
  },
  {
    icon: MapPin,
    title: "Localização",
    value: "Maputo, Moçambique",
    href: "https://maps.google.com/?q=Maputo,Mozambique",
    action: "Mapa",
    iconBg: "from-violet-500 to-indigo-600",
  },
];

const Enquiry: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-white">
      {/* Soft background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-60px] top-[-40px] h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute right-[-40px] top-20 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl dark:bg-violet-500/10" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
            <MessageCircle className="h-4 w-4 text-cyan-500" />
            Estamos disponíveis para ajudar
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Entrar em{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">
              Contacto
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg dark:text-gray-300">
            Fala connosco de forma simples e rápida através dos nossos canais
            diretos.
          </p>
        </div>

        {/* Main content */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
          {/* Left card */}
          <div className="rounded-[28px] border border-gray-200/80 bg-white/90 p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)] backdrop-blur sm:p-7 lg:p-8 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Detalhes de Contacto
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Escolhe o canal que te for mais conveniente.
              </p>
            </div>

            <div className="space-y-4">
              {contactItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/80 p-4 transition-all duration-300 hover:border-gray-200 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.iconBg} text-white shadow-lg`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="truncate text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                        {item.value}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-gray-500 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                      <span className="hidden sm:inline">{item.action}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right visual */}
          <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]">
            <div className="relative">
              <img
                src="/mz-loc2.avif"
                alt="Mapa de localização"
                className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[480px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="max-w-sm rounded-2xl border border-white/20 bg-white/15 p-4 text-white backdrop-blur-md sm:p-5">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/90">
                    <MapPin className="h-3.5 w-3.5" />
                    Maputo
                  </div>

                  <h3 className="text-xl font-bold sm:text-2xl">
                    Trilho Académico
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/85">
                    Um atendimento próximo, claro e moderno para estudantes e
                    famílias.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced newsletter section */}
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-cyan-100/80 bg-gradient-to-br from-cyan-50 via-white to-blue-50 shadow-[0_24px_70px_-45px_rgba(0,0,0,0.22)] dark:border-white/10 dark:from-white/[0.05] dark:via-white/[0.03] dark:to-cyan-500/10">
          <div className="relative p-5 sm:p-6 lg:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10" />
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-500/10" />

            <div className="relative grid gap-7 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-cyan-700 shadow-sm backdrop-blur dark:border-cyan-500/20 dark:bg-white/10 dark:text-cyan-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Newsletter
                </div>

                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                  Recebe oportunidades académicas sem perder tempo
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
                  Enviamos novidades relevantes sobre bolsas, documentação,
                  eventos e dicas úteis para estudantes moçambicanos.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { icon: Bell, text: "Alertas úteis" },
                    { icon: ShieldCheck, text: "Sem spam" },
                    { icon: Mail, text: "Direto no email" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.text}
                        className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.05] dark:text-gray-300"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-400" />
                        {item.text}
                      </div>
                    );
                  })}
                </div>
              </div>

              <form className="rounded-[1.75rem] border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-950/60 sm:p-5">
                <label className="mb-2 block text-sm font-bold text-gray-900 dark:text-white">
                  Subscreve a newsletter
                </label>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="O teu email"
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 pr-11 text-sm text-gray-800 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 dark:border-white/10 dark:bg-gray-900 dark:text-gray-200 dark:focus:border-cyan-500 dark:focus:ring-cyan-500/10"
                    />
                    <Mail className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <Send className="h-4 w-4" />
                    Subscrever
                  </button>
                </div>

                <p className="mt-3 text-xs leading-5 text-gray-500 dark:text-gray-400">
                  Podes cancelar a subscrição quando quiseres. Usamos o teu email
                  apenas para partilhar conteúdos académicos relevantes.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Enquiry;