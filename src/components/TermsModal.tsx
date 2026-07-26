// src/components/TermsModal.tsx
import React from 'react';
import { X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
          <h2 className="text-xl font-bold">Termos e Condições de Uso & Política de Privacidade</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/30 rounded-full transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="max-h-[80vh] overflow-y-auto p-6 space-y-6 text-gray-800 text-sm leading-relaxed">
          <section>
            <h3 className="text-lg font-semibold mb-2">Termos e Condições de Uso</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Aceitação dos Termos:</strong> Ao acessar e utilizar a plataforma Trilho Acadêmico da SyncTechX Lda., você concorda de forma plena e irrevogável com os Termos e Condições descritos neste documento. Caso não concorde com qualquer cláusula ou termo aqui estabelecido, você deve interromper imediatamente o uso da plataforma. O uso contínuo implica na aceitação de quaisquer alterações ou atualizações feitas nestes termos.
              </li>
              <li>
                <strong>Objetivo da Plataforma:</strong> A plataforma Trilho Acadêmico é uma ferramenta digital projetada para oferecer suporte educacional aos estudantes moçambicanos. O principal objetivo da plataforma é:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Orientação Vocacional: Ajudar os estudantes a identificar suas áreas de interesse e aptidões, oferecendo sugestões personalizadas de carreiras.</li>
                  <li>Escolha de Cursos: Ajudar na seleção de cursos que correspondam ao perfil acadêmico e às demandas do mercado de trabalho.</li>
                  <li>Acesso a Oportunidades: Fornecer informações sobre bolsas de estudo, universidades e outras oportunidades, tanto dentro de Moçambique quanto no exterior.</li>
                  <li>Planejamento Acadêmico: Guiar os estudantes no planejamento da sua trajetória educacional, desde o ensino secundário até o ingresso no ensino superior.</li>
                </ul>
                A plataforma também oferece serviços adicionais, como o apoio à mobilidade internacional, conectando jovens a universidades e oportunidades de estudo fora de Moçambique.
              </li>
              <li>
                <strong>Uso da Plataforma:</strong> A plataforma é destinada ao uso exclusivo de:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Estudantes: Para orientação educacional e acesso a oportunidades.</li>
                  <li>Educadores: Para promover a melhoria do processo educacional e facilitar o acesso a informações sobre o desenvolvimento acadêmico dos alunos.</li>
                  <li>Profissionais e Empresas Parceiras: Para divulgar programas de bolsas de estudo, estágios, parcerias educacionais, entre outros.</li>
                </ul>
                Você concorda em usar a plataforma de maneira ética e responsável, respeitando todas as leis e regulamentos aplicáveis, incluindo, mas não se limitando a, leis de propriedade intelectual, direitos autorais e privacidade de dados.
              </li>
              <li>
                <strong>Responsabilidade pelo Conteúdo:</strong> A SyncTechX Lda. não se responsabiliza por qualquer erro, omissão ou dano relacionado ao conteúdo fornecido por universidades, empresas parceiras ou usuários da plataforma. Embora todos os esforços sejam feitos para garantir a precisão das informações, o usuário é responsável por validar as informações antes de tomar decisões com base nelas. A plataforma oferece as ferramentas para que o usuário faça essas validações, mas não garante a totalidade da veracidade de todas as informações fornecidas.
              </li>
              <li>
                <strong>Alterações aos Termos:</strong> A SyncTechX Lda. reserva-se o direito de modificar, alterar ou atualizar estes Termos e Condições a qualquer momento, com ou sem aviso prévio. Caso haja alteração significativa nos termos, ela será comunicada na plataforma, e a versão atualizada estará disponível para consulta a qualquer momento. Tais alterações entrarão em vigor assim que forem publicadas. O uso contínuo da plataforma após a alteração dos Termos e Condições implicará na aceitação das modificações.
              </li>
              <li>
                <strong>Responsabilidade do Usuário:</strong> O usuário é responsável por manter suas informações de conta, incluindo credenciais de login, em segurança. A SyncTechX Lda. não se responsabiliza por qualquer uso indevido ou perda decorrente de falhas de segurança relacionadas ao gerenciamento das suas credenciais. Caso o usuário perceba qualquer atividade suspeita em sua conta, deve informar imediatamente a SyncTechX Lda. para que medidas corretivas sejam tomadas.
              </li>
            </ol>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Política de Privacidade</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Coleta de Dados:</strong> A SyncTechX Lda. coleta diferentes tipos de dados para fornecer uma experiência personalizada e melhorar a funcionalidade da plataforma. Esses dados são essenciais para que possamos entregar os serviços de forma eficaz. As informações coletadas incluem:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Informações Pessoais: Nome completo, e-mail, número de telefone, data de nascimento, e outras informações de identificação.</li>
                  <li>Dados Acadêmicos: Histórico escolar, notas, cursos de interesse, preferências educacionais, e outras informações relacionadas ao perfil acadêmico.</li>
                  <li>Informações de Perfil Profissional: Dados sobre as áreas de interesse profissional, estágios anteriores, e outros dados relevantes para orientação vocacional.</li>
                  <li>Dados de Navegação: Informações sobre como você interage com a plataforma, como páginas visitadas, tempo gasto em cada seção, e interações com as funcionalidades.</li>
                  <li>Dados de Localização: A plataforma pode coletar dados de localização (caso você autorize) para oferecer recomendações personalizadas relacionadas a cursos, universidades e oportunidades educacionais na sua região ou fora dela.</li>
                </ul>
              </li>
              <li>
                <strong>Uso dos Dados:</strong> Os dados coletados são utilizados para as seguintes finalidades:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Melhoria dos Serviços: Utilizamos as informações para otimizar a experiência de navegação e fornecer recomendações personalizadas.</li>
                  <li>Personalização das Recomendaçãos: Os dados são usados para sugerir cursos, universidades e bolsas de estudo alinhados ao perfil do usuário, suas aptidões e interesses.</li>
                  <li>Notificações Importantes: Enviamos atualizações sobre novas oportunidades educacionais, alterações nos cursos e novas parcerias com universidades ou empresas.</li>
                  <li>Pesquisas e Feedback: Coletamos dados para realizar pesquisas de satisfação e obter feedback sobre a experiência do usuário com a plataforma.</li>
                </ul>
              </li>
              <li>
                <strong>Segurança dos Dados:</strong> A SyncTechX Lda. adota as melhores práticas de segurança para proteger seus dados pessoais contra acessos não autorizados, alteração, divulgação ou destruição. Implementamos medidas de segurança físicas, administrativas e técnicas para garantir que seus dados permaneçam seguros. No entanto, reconhecemos que nenhuma transmissão de dados pela internet pode ser completamente segura, e por isso não garantimos a segurança absoluta das informações.
              </li>
              <li>
                <strong>Compartilhamento de Dados:</strong> A SyncTechX Lda. compromete-se a não compartilhar seus dados pessoais com terceiros, exceto nas seguintes situações:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Cumprimento de Obrigações Legais: Quando exigido por lei, ordem judicial ou outra autoridade competente.</li>
                  <li>Parcerias com Instituições: Compartilhamos informações com universidades e empresas parceiras somente quando necessário para a execução de serviços diretamente relacionados ao uso da plataforma, como o fornecimento de bolsas de estudo ou programas de estágio.</li>
                </ul>
                Em nenhuma hipótese seus dados serão vendidos a terceiros.
              </li>
              <li>
                <strong>Consentimento para Notificações:</strong> Ao utilizar a plataforma, você consente explicitamente em receber notificações e anúncios via WhatsApp relacionados a oportunidades educacionais, como novas bolsas de estudo, cursos, programas de intercâmbio, e outros serviços relevantes. Caso não deseje continuar recebendo essas notificações, você poderá desativá-las a qualquer momento nas configurações de sua conta ou entrando em contato com nossa equipe através do e-mail info@synctechx.com.
              </li>
              <li>
                <strong>Direitos do Usuário:</strong> Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Se desejar fazer isso, pode entrar em contato conosco através do e-mail info@synctechx.com. Também oferecemos a possibilidade de atualização de seus dados diretamente na plataforma, na seção de configurações de perfil.
              </li>
              <li>
                <strong>Cookies:</strong> A plataforma utiliza cookies para melhorar a experiência de navegação e coletar dados relacionados ao uso da plataforma. Cookies são pequenos arquivos armazenados em seu dispositivo que nos permitem lembrar suas preferências e melhorar a personalização da plataforma. Você pode desativar os cookies através das configurações do seu navegador, mas é importante notar que isso pode afetar a funcionalidade da plataforma, tornando algumas funcionalidades limitadas ou indisponíveis.
              </li>
              <li>
                <strong>Consentimento para Envio de Notificações e Anúncios via WhatsApp:</strong> Ao aceitar os Termos e Condições de Uso e a Política de Privacidade, você também consente em receber notificações e anúncios relevantes via WhatsApp. Essas notificações podem incluir, mas não se limitam a:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Oportunidades de bolsas de estudo.</li>
                  <li>Programas de estágio e emprego.</li>
                  <li>Notícias sobre cursos e universidades.</li>
                  <li>Atualizações sobre o processo educacional e novas funcionalidades da plataforma.</li>
                </ul>
                Você pode optar por desativar o recebimento dessas notificações a qualquer momento, acessando as configurações de sua conta ou enviando um e-mail para info@synctechx.com.
              </li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
