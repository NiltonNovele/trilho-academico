export type QuestionType = "likert" | "scale" | "single" | "ab" | "multi";

export interface Question {
  id: number;
  text: string;
  section: string;
  type: QuestionType;
  options?: string[];
}

export const QUESTIONS: Question[] = [
  { id: 1, text: "Quando tens um projeto importante, preferes discutir ideias com colegas ou refletir sozinho antes de agir?", section: "MBTI", type: "likert", options: ["Discutir com colegas", "Refletir sozinho", "Depende do tipo de projeto", "Não tenho preferência"] },
  { id: 2, text: "Ao tomar decisões, o que pesa mais: a lógica dos factos ou o impacto nas pessoas envolvidas?", section: "MBTI", type: "likert", options: ["Lógica dos factos", "Impacto nas pessoas", "Procuro equilibrar ambos", "Depende da situação"] },
  { id: 3, text: "Se surgisse um imprevisto, preferias adaptar-te rapidamente ou seguir o plano original?", section: "MBTI", type: "likert", options: ["Adaptar-me rapidamente", "Seguir o plano original", "Analisar antes de decidir", "Evitar mudanças bruscas"] },
  { id: 4, text: "Quando estudas, preferes lidar com informações concretas ou ideias abstratas?", section: "MBTI", type: "likert", options: ["Informações concretas", "Ideias abstratas", "Um equilíbrio entre ambas", "Depende do tema"] },
  { id: 5, text: "Numa conversa em grupo, costumas ser quem inicia o diálogo ou quem observa primeiro?", section: "MBTI", type: "likert", options: ["Inicio o diálogo", "Observo primeiro", "Depende do grupo", "Prefiro interações individuais"] },
  { id: 6, text: "Quando alguém está em apuros, percebes logo o que sente ou pensas primeiro na solução prática?", section: "MBTI", type: "likert", options: ["Percebo o que sente", "Penso na solução prática", "Procuro ambos", "Fico um pouco inseguro(a)"] },
  { id: 7, text: "Perante uma nova situação, improvisas com facilidade ou segues métodos testados?", section: "MBTI", type: "likert", options: ["Improviso com facilidade", "Sigo métodos testados", "Depende do contexto", "Prefiro observar primeiro"] },
  { id: 8, text: "Quando há conflito, preferes resolver logo ou esperar que as emoções se acalmem?", section: "MBTI", type: "likert", options: ["Resolver logo", "Esperar acalmar", "Evitar o confronto", "Depende de quem está envolvido"] },
  { id: 9, text: "Sentes-te mais confortável com uma rotina previsível ou com mudanças frequentes?", section: "MBTI", type: "likert", options: ["Rotina previsível", "Mudanças frequentes", "Equilíbrio entre ambas", "Não tenho preferência"] },
  { id: 10, text: "Em trabalhos de grupo, preferes liderar a organização ou dar ideias criativas?", section: "MBTI", type: "likert", options: ["Liderar a organização", "Dar ideias criativas", "Colaborar conforme a necessidade", "Apenas seguir orientações"] },
  { id: 11, text: "Ao estudar, precisas de silêncio absoluto ou consegues manter o foco mesmo com barulho?", section: "MBTI", type: "likert", options: ["Silêncio absoluto", "Consigo concentrar-me com barulho", "Depende do tipo de tarefa", "Prefiro música leve"] },
  { id: 12, text: "Quando tens de escolher entre duas opções, segues a tua intuição ou ponderas os prós e contras?", section: "MBTI", type: "likert", options: ["Sigo a intuição", "Analiso prós e contras", "Depende da importância da decisão", "Peço opiniões antes"] },

  { id: 13, text: "Quando tens várias tarefas, costumas planear um horário detalhado ou agir conforme o momento?", section: "BIGFIVE", type: "scale", options: ["Planeio detalhadamente", "Prefiro agir no momento", "Misturo ambos", "Depende da urgência", "Não tenho método fixo"] },
  { id: 14, text: "Ao rever um trabalho, dás mais atenção aos detalhes ou ao resultado global?", section: "BIGFIVE", type: "scale", options: ["Aos detalhes", "Ao resultado global", "A ambos igualmente", "Depende da importância do trabalho", "Peço revisão a alguém"] },
  { id: 15, text: "Gostas de ouvir opiniões diferentes, mesmo que desafiem as tuas crenças?", section: "BIGFIVE", type: "scale", options: ["Sim, sempre", "Na maioria das vezes", "Apenas se forem respeitosas", "Raramente", "Não gosto de debates"] },
  { id: 16, text: "Em eventos sociais, sentes-te energizado ou esgotado após interagir com muitas pessoas?", section: "BIGFIVE", type: "scale", options: ["Muito energizado", "Moderadamente energizado", "Neutro", "Cansado", "Muito esgotado"] },
  { id: 17, text: "Quando algo corre mal, consegues manter a calma com facilidade?", section: "BIGFIVE", type: "scale", options: ["Sim, sempre", "Geralmente sim", "Depende da gravidade", "Fico um pouco nervoso", "Perco o controlo facilmente"] },
  { id: 18, text: "Quando alguém precisa de ajuda, ofereces apoio mesmo que estejas ocupado?", section: "BIGFIVE", type: "scale", options: ["Sempre", "Frequentemente", "Às vezes", "Raramente", "Quase nunca"] },
  { id: 19, text: "Cumprir prazos e compromissos é algo que valorizas fortemente?", section: "BIGFIVE", type: "scale", options: ["Sim, totalmente", "Sim, na maioria das vezes", "Depende da importância", "Nem sempre", "Não muito"] },
  { id: 20, text: "Procuras novas experiências e aventuras regularmente?", section: "BIGFIVE", type: "scale", options: ["Sim, adoro novidades", "Geralmente sim", "Depende da situação", "Raramente", "Prefiro estabilidade"] },
  { id: 21, text: "Se um colega falhar numa tarefa, costumas compreender ou criticar?", section: "BIGFIVE", type: "scale", options: ["Compreender sempre", "Compreender mas corrigir", "Depende da falha", "Criticar construtivamente", "Criticar diretamente"] },
  { id: 22, text: "Gostas de aprender sobre temas complexos e filosóficos?", section: "BIGFIVE", type: "scale", options: ["Sim, muito", "Moderadamente", "Depende do tema", "Prefiro temas práticos", "Evito assuntos abstratos"] },
  { id: 23, text: "És mais disciplinado e constante ou funcionas melhor sob pressão?", section: "BIGFIVE", type: "scale", options: ["Disciplinado e constante", "Equilíbrio entre ambos", "Depende do prazo", "Rendo melhor sob pressão", "Não sou muito organizado"] },
  { id: 24, text: "Quando cometes um erro, ficas a pensar nele durante muito tempo ou segues em frente rapidamente?", section: "BIGFIVE", type: "scale", options: ["Penso durante muito tempo", "Reflito e sigo", "Depende da gravidade", "Sigo em frente logo", "Tento esquecer"] },

  // RIASEC — Tipos de interesse vocacional
  { id: 25, text: "Se tivesses um dia livre, que atividade escolherias fazer? (escolhe uma)", section: "RIASEC", type: "single", options: ["Construir ou consertar algo (Realista)", "Investigar ou pesquisar (Investigativo)", "Criar algo artístico (Artístico)", "Ajudar pessoas (Social)", "Vender ou liderar (Empreendedor)", "Organizar e planear (Convencional)"] },

  // SCHWARTZ — Valores pessoais
  { id: 26, text: "Preferirias um trabalho estável (A) ou um que te desafie sempre com novidades (B)?", section: "SCHWARTZ", type: "ab", options: ["Trabalho estável (A)", "Desafiante e variável (B)"] },
  { id: 27, text: "O que valorizas mais: a liberdade de criar (A) ou a segurança de um plano fixo (B)?", section: "SCHWARTZ", type: "ab", options: ["Liberdade criativa (A)", "Segurança e estrutura (B)"] },
  { id: 28, text: "O que valorizas mais: estar rodeado de pessoas queridas (A) ou ter reconhecimento público (B)?", section: "SCHWARTZ", type: "ab", options: ["Relações pessoais (A)", "Reconhecimento público (B)"] },
  { id: 29, text: "Se um colega fosse injustiçado, agires mesmo que arrisques o teu conforto pessoal?", section: "SCHWARTZ", type: "ab", options: ["Sim, sempre (A)", "Não, prefiro evitar conflitos (B)"] },
  { id: 30, text: "Numa decisão difícil, segues mais o teu sentido de justiça (A) ou o que é mais seguro para ti (B)?", section: "SCHWARTZ", type: "ab", options: ["Justiça (A)", "Segurança pessoal (B)"] },
  { id: 31, text: "É mais importante para ti ser respeitado (A) ou ser amado (B)?", section: "SCHWARTZ", type: "ab", options: ["Ser respeitado (A)", "Ser amado (B)"] },
  { id: 32, text: "Quando escolhes uma carreira, procuras estabilidade financeira (A) ou propósito pessoal (B)?", section: "SCHWARTZ", type: "ab", options: ["Estabilidade (A)", "Propósito (B)"] },
  { id: 33, text: "Se tivesses de abrir um negócio, priorizarias o impacto social (A) ou o lucro (B)?", section: "SCHWARTZ", type: "ab", options: ["Impacto social (A)", "Lucro (B)"] },

  // GARDNER — Inteligências múltiplas
  { id: 34, text: "Quando estudas, aprendes melhor... (escolhe até 3)", section: "GARDNER", type: "multi", options: ["Lendo e escrevendo (Linguística)", "Resolvendo problemas (Lógico-matemática)", "Visualizando imagens (Espacial)", "Através da música (Musical)", "Fazendo atividades físicas (Corporal)", "Com outras pessoas (Interpessoal)", "Refletindo sozinho (Intrapessoal)", "Em contacto com a natureza (Naturalista)"] },
  { id: 35, text: "Num grupo de estudo, costumas explicar aos outros ou preferes ouvir e anotar?", section: "GARDNER", type: "single", options: ["Explicar aos outros", "Ouvir e anotar", "Alterno entre os dois", "Depende do tema"] },
  { id: 36, text: "Costumas lembrar-te de informações através de sons, imagens ou movimentos?", section: "GARDNER", type: "single", options: ["Sons", "Imagens", "Movimentos", "Depende do assunto"] },
  { id: 37, text: "Sentes-te mais criativo quando escreves, desenhas ou resolves problemas práticos?", section: "GARDNER", type: "single", options: ["Escrever", "Desenhar", "Resolver problemas práticos", "Outra forma"] },

  // MOTIVAÇÃO — Fatores pessoais e profissionais
  { id: 38, text: "O que mais te motiva ao escolher um curso universitário?", section: "MOTIVACAO", type: "single", options: ["Paixão pelo tema", "Oportunidades de carreira", "Estabilidade financeira", "Reconhecimento", "Impacto social", "Autonomia"] },
  { id: 39, text: "Se tivesses de escolher entre um emprego bem pago e outro que amasses fazer, qual escolherias e porquê?", section: "MOTIVACAO", type: "single", options: ["Bem pago — pela segurança", "O que amo — pela realização", "Depende das condições", "Difícil decidir"] },
  { id: 40, text: "Qual destas frases te representa melhor?", section: "MOTIVACAO", type: "single", options: ["Quero ser o melhor no que faço", "Quero ajudar outras pessoas", "Quero liberdade para criar e inovar", "Quero estabilidade e segurança"] },
  { id: 41, text: "Qual seria o ambiente de trabalho ideal para ti?", section: "MOTIVACAO", type: "single", options: ["Silencioso e organizado", "Colaborativo e social", "Criativo e livre", "Competitivo e dinâmico", "Estruturado e previsível"] },
  { id: 42, text: "O que consideras essencial num futuro chefe ou líder?", section: "MOTIVACAO", type: "single", options: ["Confiança e empatia", "Clareza e objetividade", "Inspiração e visão", "Liberdade e autonomia", "Orientação técnica e competência"] },

  // NOVAS PERGUNTAS — Expansão até 50
  { id: 43, text: "Quando enfrentas um desafio, costumas pedir ajuda ou tentar resolver sozinho?", section: "MBTI", type: "likert", options: ["Peço ajuda", "Tento sozinho", "Depende do tipo de desafio", "Procuro primeiro informação"] },
  { id: 44, text: "Em momentos de stress, procuras distrair-te ou enfrentar o problema de frente?", section: "BIGFIVE", type: "scale", options: ["Distrair-me", "Enfrentar de frente", "Depende da situação", "Procuro conselhos", "Ignoro temporariamente"] },
  { id: 45, text: "Qual destas atividades te parece mais agradável?", section: "RIASEC", type: "single", options: ["Experimentar novas tecnologias (Investigativo)", "Organizar eventos (Empreendedor)", "Desenhar algo original (Artístico)", "Ajudar colegas (Social)", "Executar tarefas precisas (Convencional)"] },
  { id: 46, text: "Se ganhasses na lotaria, continuarias a trabalhar na tua área?", section: "MOTIVACAO", type: "single", options: ["Sim, porque adoro o que faço", "Sim, mas em algo mais leve", "Talvez, em projetos pessoais", "Não, procuraria algo totalmente novo"] },
  { id: 47, text: "Preferes metas claras e mensuráveis ou liberdade para explorar à tua maneira?", section: "SCHWARTZ", type: "ab", options: ["Metas claras (A)", "Liberdade criativa (B)"] },
  { id: 48, text: "Tens facilidade em expressar emoções ou preferes manter-te reservado?", section: "BIGFIVE", type: "scale", options: ["Expresso com facilidade", "De forma equilibrada", "Apenas com pessoas próximas", "Raramente", "Evito demonstrar"] },
  { id: 49, text: "Costumas aprender melhor com prática direta ou com teoria e explicações detalhadas?", section: "GARDNER", type: "single", options: ["Prática direta", "Teoria e explicações", "Depende do tema", "Ambos em conjunto"] },
  { id: 50, text: "O que consideras mais importante ao escolher uma carreira?", section: "MOTIVACAO", type: "single", options: ["Paixão pessoal", "Estabilidade", "Reconhecimento", "Impacto na sociedade", "Autonomia e criatividade"] },
];
