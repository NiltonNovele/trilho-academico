import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Compass,
  Brain,
  BookOpen,
  FileText,
  Menu,
  X,
  Zap,
  Contact,
  ChevronRight,
} from "lucide-react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Início", icon: Home },
    { path: "/escolher-teste", label: "Explorar", icon: Compass },
    { path: "/Paralelas", label: "Paralelas", icon: Brain },
    { path: "/legal", label: "Documentação Legal", icon: FileText },
    { path: "/recursos", label: "Recursos", icon: BookOpen },
    { path: "/contact", label: "Contacto", icon: Contact },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <audio ref={audioRef} src="/helio.mp3" loop />

      <nav className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/85 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.18)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 items-center justify-between py-3">
            {/* Logo */}
            <Link
              to="/"
              className="group flex min-w-0 items-center gap-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="relative shrink-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
              </div>

              <div className="min-w-0">
                <div className="truncate bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-lg font-black text-transparent sm:text-xl">
                  Trilho Académico
                </div>
                <div className="truncate text-[11px] font-medium tracking-wide text-gray-500 sm:text-xs">
                  From Moz to the World
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-2 lg:flex">
              <div className="flex items-center gap-1 rounded-2xl border border-gray-200/70 bg-white/80 p-1.5 shadow-sm">
                {navItems.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`group relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                      isActive(path)
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/20"
                        : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isActive(path) ? "" : "group-hover:scale-110"
                      }`}
                    />
                    <span className="hidden xl:inline">{label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-300 hover:border-cyan-200 hover:text-cyan-600 hover:shadow-md"
                aria-label="Abrir menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`overflow-hidden transition-all duration-300 lg:hidden ${
              isMobileMenuOpen ? "max-h-[520px] pb-4" : "max-h-0"
            }`}
          >
            <div className="mt-2 rounded-[2rem] border border-gray-200 bg-white p-3 shadow-xl">
              <div className="mb-3 px-2 pt-1">
                <p className="text-sm font-bold text-gray-900">Navegação</p>
                <p className="text-xs text-gray-500">
                  Acede rapidamente às principais áreas da plataforma
                </p>
              </div>

              <div className="space-y-1">
                {navItems.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-300 ${
                      isActive(path)
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          isActive(path)
                            ? "bg-white/15"
                            : "bg-gray-100 text-gray-600 group-hover:bg-cyan-50 group-hover:text-cyan-600"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-semibold">{label}</span>
                    </div>

                    <ChevronRight
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isActive(path) ? "text-white" : "text-gray-400 group-hover:translate-x-0.5"
                      }`}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Donation Modal */}
      {isModalOpen && (
        <div className="w-full border-t border-gray-200 bg-gray-100 py-10">
          <div className="mx-auto w-11/12 overflow-hidden rounded-3xl bg-white shadow-2xl md:w-3/4 lg:w-2/3">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">Doação Trilho Académico</h3>
                <p className="text-sm text-gray-500">
                  Apoia a continuidade e crescimento da plataforma
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <iframe
              src="https://refres.co/trilho.academico"
              className="h-[600px] w-full"
              frameBorder="0"
              title="Doação Trilho Académico"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;