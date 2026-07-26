import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Zap,
  ArrowUpRight,
  Send,
  Sparkles,
} from "lucide-react";
import { NavigationPage } from "../types";

interface FooterProps {
  onPageChange: (page: NavigationPage) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const quickLinks = [
    { id: "Home" as NavigationPage, label: "Início" },
    { id: "Discovery" as NavigationPage, label: "Explorar" },
    { id: "Quiz" as NavigationPage, label: "Paralelas" },
    { id: "Legal" as NavigationPage, label: "Documentação Legal" },
    { id: "Recursos" as NavigationPage, label: "Recursos" },
    { id: "Contacto" as NavigationPage, label: "Contacto" },
  ];

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: "info@trilhoacademico.edu.mz",
      href: "mailto:info@trilhoacademico.edu.mz",
    },
    {
      icon: Phone,
      label: "Telefone",
      value: "+258 84 752 9665",
      href: "tel:+258847529665",
    },
    {
      icon: MapPin,
      label: "Localização",
      value: "Maputo, Moçambique",
      href: "https://maps.google.com/?q=Maputo,Mozambique",
    },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/profile.php?id=61574813828863",
      icon: Facebook,
      label: "Facebook",
    },
    {
      href: "https://x.com/synctechx",
      icon: Twitter,
      label: "Twitter",
    },
    {
      href: "https://www.instagram.com/synctechx.mz",
      icon: Instagram,
      label: "Instagram",
    },
    {
      href: "https://www.linkedin.com/company/synctechx/?viewAsMember=true",
      icon: Linkedin,
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-gray-200/70 bg-gradient-to-b from-white to-gray-50 text-gray-900 dark:border-white/10 dark:from-gray-950 dark:to-gray-900 dark:text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-60px] top-0 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute right-[-40px] top-20 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-200/20 blur-3xl dark:bg-purple-500/10" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Brand block */}
          <div className="rounded-[2rem] border border-gray-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 shadow-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white dark:ring-gray-950" />
              </div>

              <div>
                <h3 className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-xl font-black text-transparent">
                  Trilho Académico
                </h3>
                <p className="text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">
                  From Moz to the World
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-gray-600 dark:text-gray-400">
              Desenvolvido pela <b>SyncTechX</b>, o{" "}
              <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                Trilho Académico
              </span>{" "}
              foi criado para ajudar estudantes a explorar países, cursos e
              universidades, guiando-os em todas as etapas do processo de estudo
              no estrangeiro. O nosso objetivo é simplificar e modernizar a
              experiência de estudantes através da tecnologia.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300">
                Orientação Académica
              </div>
              <div className="rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 dark:bg-purple-500/10 dark:text-purple-300">
                Bolsas & Recursos
              </div>
              <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                Comunidade Estudantil
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="rounded-[2rem] border border-gray-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-gray-900 dark:text-gray-100">
              Navegação Rápida
            </h3>

            <div className="mt-5 space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onPageChange(link.id)}
                  className="group flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-medium text-gray-600 transition-all duration-300 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-cyan-400"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>

          {/* Contacts + social */}
          <div className="rounded-[2rem] border border-gray-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-gray-900 dark:text-gray-100">
              Contactos
            </h3>

            <div className="mt-5 space-y-3">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === "Localização" ? "_blank" : undefined}
                    rel={
                      item.label === "Localização"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex items-start gap-3 rounded-2xl px-3 py-3 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-white/[0.05]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-sm">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">
                        {item.label}
                      </p>
                      <p className="mt-1 break-words text-sm font-medium text-gray-700 transition-colors group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-cyan-400">
                        {item.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                Redes Sociais
              </p>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:text-blue-600 hover:shadow-md dark:border-white/10 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-cyan-400"
                    >
                      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-gray-200/80 pt-6 dark:border-white/10">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Trilho Académico. Todos os direitos reservados.
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Desenvolvido pela{" "}
              <a
                href="https://www.synctechx.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-cyan-600 transition hover:underline dark:text-cyan-400"
              >
                SyncTechX
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;