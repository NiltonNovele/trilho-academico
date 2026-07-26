// pages/terms.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  Lock,
  Users,
  Globe,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

const sections = [
  {
    title: "1. Definições",
    icon: FileText,
    content: (
      <ul className="space-y-2 text-gray-600">
        <li>
          <strong>Plataforma:</strong> refere-se ao Trilho Académico, acessível via web ou aplicativo móvel.
        </li>
        <li>
          <strong>Usuário:</strong> pessoa física que acessa ou utiliza a plataforma.
        </li>
        <li>
          <strong>Conta:</strong> perfil criado pelo usuário para acessar funcionalidades exclusivas.
        </li>
        <li>
          <strong>Dados pessoais:</strong> qualquer informação relacionada a uma pessoa identificada ou identificável.
        </li>
        <li>
          <strong>SyncTechX:</strong> empresa responsável pelo desenvolvimento, operação e manutenção da plataforma Trilho Académico.
        </li>
        <li>
          <strong>Parceiros:</strong> instituições de ensino, empresas e órgãos governamentais integrados à plataforma.
        </li>
        <li>
          <strong>Serviços:</strong> todos os recursos, funcionalidades e conteúdos disponibilizados pelo Trilho Académico.
        </li>
      </ul>
    ),
  },
  {
    title: "2. Objetivo da Plataforma",
    icon: Globe,
    content: (
      <p className="text-gray-600 leading-7">
        O Trilho Académico foi desenvolvido para ajudar estudantes a descobrirem as suas vocações
        através de análises baseadas em Inteligência Artificial, oferecer recomendações
        personalizadas de cursos e carreiras, mapear universidades e bolsas de estudo, simplificar
        a jornada académica e conectar estudantes a oportunidades reais.
      </p>
    ),
  },
  {
    title: "3. Aceitação dos Termos",
    icon: CheckCircle2,
    content: (
      <p className="text-gray-600 leading-7">
        Ao cadastrar-se ou utilizar a plataforma, o usuário declara que possui pelo menos 16 anos
        de idade ou está a utilizar o serviço com consentimento dos pais ou responsáveis,
        fornecerá informações verdadeiras e compreende que estes Termos podem ser atualizados
        periodicamente.
      </p>
    ),
  },
  {
    title: "4. Utilização da Plataforma",
    icon: Users,
    content: (
      <p className="text-gray-600 leading-7">
        O usuário compromete-se a utilizar o Trilho Académico de forma lícita, ética e responsável,
        abstendo-se de inserir informações falsas, comprometer a segurança da plataforma, copiar
        conteúdos sem autorização ou utilizar os serviços para fins ilegais, abusivos ou
        fraudulentos.
      </p>
    ),
  },
  {
    title: "5. Criação e Segurança da Conta",
    icon: Lock,
    content: (
      <p className="text-gray-600 leading-7">
        O usuário é responsável por manter a confidencialidade das credenciais da sua conta, bem
        como por todas as atividades realizadas nela. A SyncTechX não se responsabiliza por acessos
        indevidos resultantes de negligência do próprio usuário.
      </p>
    ),
  },
  {
    title: "6. Privacidade e Tratamento de Dados",
    icon: ShieldCheck,
    content: (
      <p className="text-gray-600 leading-7">
        O Trilho Académico recolhe e trata dados pessoais com o objetivo de prestar serviços de
        orientação académica, melhorar a experiência do usuário e gerar recomendações mais
        relevantes. As informações são tratadas com medidas técnicas e organizacionais adequadas,
        respeitando princípios de confidencialidade, segurança e necessidade.
      </p>
    ),
  },
  {
    title: "7. Uso de Inteligência Artificial",
    icon: AlertCircle,
    content: (
      <p className="text-gray-600 leading-7">
        As recomendações geradas pela plataforma utilizam algoritmos e sistemas de Inteligência
        Artificial para apoiar o usuário nas suas decisões. Contudo, os resultados apresentados têm
        caráter informativo e orientador, não substituindo aconselhamento profissional, académico,
        jurídico ou psicológico especializado.
      </p>
    ),
  },
  {
    title: "8. Propriedade Intelectual",
    icon: FileText,
    content: (
      <p className="text-gray-600 leading-7">
        Todos os conteúdos, marcas, logótipos, textos, interfaces, designs e funcionalidades do
        Trilho Académico pertencem à SyncTechX ou aos seus licenciadores, estando protegidos pela
        legislação aplicável. É proibida a reprodução, distribuição ou exploração não autorizada
        desses elementos.
      </p>
    ),
  },
  {
    title: "9. Limitação de Responsabilidade",
    icon: AlertCircle,
    content: (
      <p className="text-gray-600 leading-7">
        A SyncTechX envida esforços razoáveis para manter a plataforma disponível, segura e
        funcional, mas não garante que o serviço estará livre de interrupções, erros técnicos ou
        indisponibilidades temporárias. A empresa não será responsável por perdas indiretas,
        incidentais ou consequenciais decorrentes do uso da plataforma.
      </p>
    ),
  },
  {
    title: "10. Parcerias e Conteúdo de Terceiros",
    icon: Globe,
    content: (
      <p className="text-gray-600 leading-7">
        Algumas funcionalidades poderão incluir informações ou links de instituições parceiras,
        universidades, bolsas ou entidades externas. A SyncTechX não controla integralmente esses
        conteúdos e não se responsabiliza por alterações, indisponibilidades ou práticas de sites
        de terceiros.
      </p>
    ),
  },
  {
    title: "11. Suspensão ou Encerramento de Conta",
    icon: Lock,
    content: (
      <p className="text-gray-600 leading-7">
        A SyncTechX poderá suspender ou encerrar contas de usuários que violem estes Termos,
        utilizem a plataforma de forma abusiva, comprometam a integridade do sistema ou pratiquem
        atividades ilícitas, sem prejuízo das medidas legais cabíveis.
      </p>
    ),
  },
  {
    title: "12. Alterações aos Termos",
    icon: FileText,
    content: (
      <p className="text-gray-600 leading-7">
        Estes Termos e Condições poderão ser alterados a qualquer momento para refletir melhorias
        nos serviços, mudanças legais ou atualizações operacionais. Sempre que possível, a
        plataforma informará os usuários sobre alterações relevantes.
      </p>
    ),
  },
  {
    title: "13. Lei Aplicável e Foro",
    icon: ShieldCheck,
    content: (
      <p className="text-gray-600 leading-7">
        Estes Termos são regidos pelas leis da República de Moçambique. Qualquer litígio emergente
        da utilização da plataforma deverá ser submetido aos tribunais competentes de Moçambique,
        salvo disposição legal em contrário.
      </p>
    ),
  },
  {
    title: "14. Disposições Finais",
    icon: CheckCircle2,
    content: (
      <p className="text-gray-600 leading-7">
        A nulidade de qualquer cláusula destes Termos não afetará as demais disposições. Estes
        Termos constituem o acordo integral entre o usuário e a SyncTechX, substituindo quaisquer
        entendimentos ou acordos anteriores relacionados ao uso da plataforma.
      </p>
    ),
  },
];

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-gray-200/70 bg-white/90 shadow-[0_20px_70px_-35px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          <div className="relative p-8 sm:p-10 lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.10),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.10),transparent_30%)]" />

            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                <ShieldCheck className="h-4 w-4" />
                Documento Legal
              </div>

              <h1 className="text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Termos e Condições de Uso{" "}
                <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  e Política de Privacidade
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg">
                Bem-vindo ao Trilho Académico, uma plataforma desenvolvida pela
                <span className="font-semibold text-gray-900"> SyncTechX Lda.</span>, destinada a
                apoiar a orientação educacional em Moçambique através de Inteligência Artificial e
                ferramentas digitais modernas.
              </p>

              <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50/80 p-4 text-sm leading-7 text-gray-600">
                <p>
                  <span className="font-semibold text-gray-900">Empresa:</span> Trilho Académico –
                  SyncTechX Lda.
                </p>
                <p>
                  <span className="font-semibold text-gray-900">
                    Data de entrada em vigor:
                  </span>{" "}
                  27 de Outubro de 2025
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Última atualização:</span> 27 de
                  Outubro de 2025
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Intro */}
        <div className="mb-8 rounded-[2rem] border border-gray-200/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl sm:p-8">
          <p className="text-base leading-8 text-gray-700">
            Ao aceder ou utilizar os serviços do Trilho Académico, o usuário concorda integralmente
            com estes Termos e Condições e com a presente Política de Privacidade. Caso não
            concorde com alguma disposição, deverá interromper imediatamente o uso da plataforma.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <section
                key={index}
                className="rounded-[2rem] border border-gray-200/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-md sm:p-8"
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-white shadow-lg">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                      {section.title}
                    </h2>
                  </div>
                </div>

                <div className="pl-0 sm:pl-16">{section.content}</div>
              </section>
            );
          })}
        </div>

        {/* Back button */}
        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;