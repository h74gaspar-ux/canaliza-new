export interface QuizOption {
  id: string
  label: string
}

export interface Question {
  id: string
  question: string
  options: QuizOption[]
}

export interface DiagnosisResult {
  id: number
  title: string
  description: string
  cause: string
  difficulty: 'simples' | 'medio' | 'avancado'
  time: string
  priority: 'urgente' | 'importante' | 'quando-possivel'
  solution: string
  isDIY: boolean
  price: number
  hasGuaranteedSuccess?: boolean
}

export interface DiagnosisTree {
  problemId: number
  problemTitle: string
  symptom: string
  questions: Question[]
  paths: Record<string, string>
  results: Record<string, DiagnosisResult>
}

export const diagnosisTrees: Record<string, DiagnosisTree> = {
  // SANITA
  'sanita-agua-correndo': {
    problemId: 1,
    problemTitle: 'Água Corre Dentro da Sanita',
    symptom: 'Água está a correr dentro da sanita.',
    questions: [
      {
        id: 'q1',
        question: 'A água está a correr sempre, ou aparece algum tempo depois?',
        options: [
          { id: 'sempre', label: 'Sempre a correr' },
          { id: 'depois-descarga', label: 'Depois da descarga aparece água algum tempo depois' }
        ]
      },
      {
        id: 'q2',
        question: 'Como é o sistema de descarga?',
        options: [
          { id: 'botao-parede', label: 'Botão na parede' },
          { id: 'caixa-plastico', label: 'Caixa de plástico na parede' },
          { id: 'caixa-ceramica', label: 'Caixa cerâmica por cima' }
        ]
      }
    ],
    paths: {
      'sempre': 'q2',
      'depois-descarga': 'q2'
    },
    results: {
      'sempre,botao-parede': { id: 1, title: 'Falha em Mecanismo Embutido', description: 'Por ser um sistema dentro da parede (comum em loiças suspensas), não recomendamos tentar resolver sozinho sem experiência.', cause: 'Válvula de descarga da cisterna embutida desgastada', difficulty: 'avancado', time: '1-2 horas', priority: 'importante', solution: 'NÃO RECOMENDADO DIY. Contacte um canalizador.', isDIY: false, price: 5.00 },
      'depois-descarga,botao-parede': { id: 2, title: 'Válvula de Enchimento (Suspensas/Embutidas)', description: 'Por ser um autoclismo interior, a sua abertura é difícil. Recomendamos totalmente o apoio de profissionais.', cause: 'Válvula de enchimento desgastada na parede', difficulty: 'avancado', time: '1-2 horas', priority: 'importante', solution: 'NÃO RECOMENDADO DIY. Contacte um canalizador.', isDIY: false, price: 5.00 },
      'sempre,caixa-plastico': { id: 3, title: 'Válvula de Descarga Defeituosa', description: 'A válvula de descarga não está a fechar corretamente.', cause: 'Válvula de descarga desgastada ou com problemas de vedação', difficulty: 'medio', time: '30-60 min', priority: 'importante', solution: 'Substituir válvula de descarga', isDIY: true, price: 5.00 },
      'depois-descarga,caixa-plastico': { id: 4, title: 'Válvula de Enchimento Defeituosa', description: 'A válvula de enchimento não para de encher.', cause: 'Válvula de enchimento desgastada ou boia desajustada', difficulty: 'medio', time: '30-60 min', priority: 'importante', solution: 'Ajustar ou substituir válvula de enchimento', isDIY: true, price: 5.00 },
      'sempre,caixa-ceramica': { id: 5, title: 'Válvula de Descarga Defeituosa', description: 'A válvula de descarga não está a fechar corretamente.', cause: 'Válvula de descarga desgastada ou com problemas de vedação', difficulty: 'simples', time: '30 min', priority: 'importante', solution: 'Substituir válvula de descarga', isDIY: true, price: 5.00 },
      'depois-descarga,caixa-ceramica': { id: 6, title: 'Válvula de Enchimento Defeituosa', description: 'A válvula de enchimento não para de encher.', cause: 'Válvula de enchimento desgastada ou boia desajustada', difficulty: 'simples', time: '30 min', priority: 'importante', solution: 'Ajustar ou substituir válvula de enchimento', isDIY: true, price: 5.00 }
    }
  },

  'nao-faz-descarga': {
    problemId: 2,
    problemTitle: 'Não Faz Descarga ou Descarga Fraca',
    symptom: 'Apertas o botão ou manípulo de descarga, mas não acontece nada, ou a água desce fraca/insuficiente.',
    questions: [
      {
        id: 'q1',
        question: 'Tira a tampa da cisterna/autoclismo. O tanque está cheio de água, vazio, ou quase vazio?',
        options: [
          { id: 'tanque-cheio', label: 'Tanque CHEIO de água' },
          { id: 'tanque-vazio', label: 'Tanque VAZIO ou quase vazio' }
        ]
      },
      {
        id: 'q2a',
        question: 'Como é o mecanismo de descarga?',
        options: [
          { id: 'botao-duplo', label: 'Botão duplo na tampa' },
          { id: 'alavanca-lateral', label: 'Alavanca/manípulo lateral' }
        ]
      },
      {
        id: 'q2b',
        question: 'Procura uma torneira de metal na parede, por trás ou ao lado da sanita. Está aberta ou fechada?',
        options: [
          { id: 'torneira-fechada', label: 'Torneira FECHADA' },
          { id: 'torneira-aberta', label: 'Torneira ABERTA' }
        ]
      },
      {
        id: 'q3b',
        question: 'Ouves algum som de água a tentar entrar no tanque?',
        options: [
          { id: 'silencio-total', label: 'Silêncio total' },
          { id: 'som-agua', label: 'Som de água a correr' }
        ]
      }
    ],
    paths: {
      'tanque-cheio': 'q2a',
      'tanque-vazio': 'q2b',
      'torneira-fechada': 'result-torneira-fechada',
      'torneira-aberta': 'q3b'
    },
    results: {
      'tanque-cheio,botao-duplo': { id: 10, title: 'Mecanismo Moderno com Falha', description: 'O mecanismo de descarga de botão duplo não funciona.', cause: 'Mecanismo com falha no botão', difficulty: 'medio', time: '30-60 min', priority: 'importante', solution: 'Substituir mecanismo de descarga', isDIY: true, price: 5.00 },
      'tanque-cheio,alavanca-lateral': { id: 11, title: 'Mecanismo Tradicional com Falha', description: 'A alavanca soltou-se internamente.', cause: 'Corrente solta ou alavanca partida', difficulty: 'simples', time: '20-40 min', priority: 'importante', solution: 'Voltar a prender ou mudar alavanca', isDIY: true, price: 5.00 },
      'result-torneira-fechada': { id: 12, title: 'Entrada de Água Bloqueada', description: 'A torneira de segurança está fechada.', cause: 'Torneira fechada', difficulty: 'simples', time: '2 min', priority: 'importante', solution: 'Abrir a torneira', isDIY: true, price: 5.00 },
      'tanque-vazio,torneira-aberta,silencio-total': { id: 13, title: 'Válvula Bloqueada', description: 'A válvula de enchimento não abre.', cause: 'Válvula avariada', difficulty: 'medio', time: '30-60 min', priority: 'importante', solution: 'Substituir válvula de enchimento', isDIY: true, price: 5.00 },
      'tanque-vazio,torneira-aberta,som-agua': { id: 14, title: 'Válvula Entupida', description: 'Válvula está aberta mas fluxo é quase nulo.', cause: 'Válvula entupida com calcário', difficulty: 'medio', time: '30-45 min', priority: 'importante', solution: 'Limpar ou substituir válvula', isDIY: true, price: 5.00 }
    }
  },

  'sanita-entupida': {
    problemId: 3,
    problemTitle: 'Sanita Entupida',
    symptom: 'Ao fazer descarga, a água sobe na sanita em vez de ir embora.',
    questions: [
      {
        id: 'q1',
        question: 'Vives em apartamento ou moradia?',
        options: [
          { id: 'apartamento', label: 'Apartamento' },
          { id: 'vivenda', label: 'Vivenda' }
        ]
      },
      {
        id: 'q2',
        question: 'O problema afeta só a sanita ou outros ralos também?',
        options: [
          { id: 'so-esta', label: 'Só a sanita' },
          { id: 'varias', label: 'Vários ralos/sanitas' }
        ]
      }
    ],
    paths: {
      'apartamento': 'q2',
      'vivenda': 'q2'
    },
    results: {
      'apartamento,so-esta': { id: 20, title: 'Entupimento Local', description: 'Apenas a sanita entupida.', cause: 'Excesso de papel ou toalhitas', difficulty: 'medio', time: '30-60 min', priority: 'importante', solution: 'Usar desentupidor ou sonda caseira', isDIY: true, price: 5.00 },
      'apartamento,varias': { id: 21, title: 'Coluna do Prédio', description: 'Problema na coluna comum do prédio.', cause: 'Coluna comum entupida', difficulty: 'avancado', time: 'Condomínio', priority: 'urgente', solution: 'Contactar condomínio', isDIY: false, price: 5.00 },
      'vivenda,so-esta': { id: 22, title: 'Entupimento na Sanita', description: 'Entupimento apenas num troço do esgoto.', cause: 'Obstrução local', difficulty: 'medio', time: '30-60 min', priority: 'importante', solution: 'Desentupir sanita ou caixa sifónica', isDIY: true, price: 5.00 },
      'vivenda,varias': { id: 23, title: 'Fossa/Esgoto Principal', description: 'Rede principal entupida.', cause: 'Esgoto principal', difficulty: 'avancado', time: '1-2 horas', priority: 'urgente', solution: 'Chamar canalizador com jato de água', isDIY: false, price: 5.00 }
    }
  },

  'sanita-vazamento': {
    problemId: 4,
    problemTitle: 'Vazamento na Base da Sanita',
    symptom: 'Água a sair pela ligação da sanita ou pela parede/chão.',
    questions: [
      {
        id: 'q-tipo',
        question: 'O tipo de sanita é fixa ao chão tradicional, ou é do tipo "Suspensa" (presa na parede, sem base no chão)?',
        options: [
          { id: 'chao', label: 'Fixa ao chão (Tradicional)' },
          { id: 'suspensa', label: 'Suspensa na parede' }
        ]
      },
      {
        id: 'q1',
        question: 'Quando é que o vazamento ocorre?',
        options: [
          { id: 'apos-descarga', label: 'Apenas após a descarga' },
          { id: 'constante', label: 'É constante' }
        ]
      },
      {
        id: 'q2',
        question: 'A sanita parece instável ou abana?',
        options: [
          { id: 'abana', label: 'Sim, move-se ligeiramente' },
          { id: 'firme', label: 'Não, está firme' }
        ]
      }
    ],
    paths: {
      'chao': 'q1',
      'suspensa': 'result-fuga-suspensa',
      'apos-descarga': 'q2',
      'constante': 'q2'
    },
    results: {
      'result-fuga-suspensa': { id: 39, title: 'Fuga em Estrutura de Parede (Embutida)', description: 'Sistemas suspensos lidam com canos dentro da alvenaria e pernos fortes. Requer desmontagem complexa.', cause: 'Vedante do esgoto de parede ou tubo de descarga recolhidos da estrutura.', difficulty: 'avancado', time: 'Horas', priority: 'urgente', solution: 'NÃO RECOMENDADO DIY. Desligue a água e chame um canalizador. Mexer numa sanita suspensa pode rasgar pladur/azulejos ou partir os pernos de fixação!', isDIY: false, price: 5.00 },
      'apos-descarga,abana': { id: 30, title: 'Parafusos Soltos', description: 'O movimento rompeu a vedação.', cause: 'Parafusos desapertados', difficulty: 'simples', time: '15 min', priority: 'importante', solution: 'Apertar parafusos da base', isDIY: true, price: 5.00 },
      'apos-descarga,firme': { id: 31, title: 'Anel de Cera Danificado', description: 'O anel que liga ao esgoto estragou-se.', cause: 'Anel de cera velho/rompido', difficulty: 'medio', time: '1-2 horas', priority: 'urgente', solution: 'Substituir anel de vedação', isDIY: true, price: 5.00 },
      'constante,abana': { id: 32, title: 'Vazamento Superior', description: 'Água vem do tanque escorrendo.', cause: 'Vazamento de acoplamento do tanque', difficulty: 'medio', time: '1-2 horas', priority: 'urgente', solution: 'Mudar vedantes do autoclismo', isDIY: true, price: 5.00 },
      'constante,firme': { id: 33, title: 'Fissura na Louça', description: 'Possível fissura impercetível na sanita.', cause: 'Porcelana estalada', difficulty: 'avancado', time: '2-3 horas', priority: 'urgente', solution: 'Mudar a sanita inteira', isDIY: false, price: 5.00 }
    }
  },
  'sanita-mau-cheiro': {
    problemId: 5,
    problemTitle: 'Mau Cheiro vindo da Sanita',
    symptom: 'Odor de esgoto muito intenso na casa de banho.',
    questions: [
      {
        id: 'q1',
        question: 'A sanita é usada com regularidade?',
        options: [
          { id: 'raramente', label: 'Pouco usada (ex: WC de visitas)' },
          { id: 'diariamente', label: 'Regularmente usada' }
        ]
      },
      {
        id: 'q2',
        question: 'Borbulha ou faz ruído quando despeja água no chuveiro/lavatório?',
        options: [
          { id: 'sim', label: 'Sim' },
          { id: 'nao', label: 'Não' }
        ]
      }
    ],
    paths: {
      'raramente': 'q2',
      'diariamente': 'q2'
    },
    results: {
      'raramente,sim': { id: 40, title: 'Sifão Seco', description: 'Água evaporou, o esgoto está direto para casa.', cause: 'Sifão sem água', difficulty: 'simples', time: '1 min', priority: 'quando-possivel', solution: 'Fazer descargas em WCs sem uso', isDIY: true, price: 5.00 },
      'raramente,nao': { id: 41, title: 'Sifão Seco', description: 'Água evaporou, o esgoto está direto.', cause: 'Sifão sem água', difficulty: 'simples', time: '1 min', priority: 'quando-possivel', solution: 'Fazer uma descarga', isDIY: true, price: 5.00 },
      'diariamente,sim': { id: 42, title: 'Entupimento Parcial / Má Ventilação', description: 'Entupimento na rede cria sucção e esvazia o sifão.', cause: 'Problema ventilatório ou pré-entupimento', difficulty: 'avancado', time: '1-2 horas', priority: 'importante', solution: 'Chamar canalizador para limpar linha', isDIY: false, price: 5.00 },
      'diariamente,nao': { id: 43, title: 'Vedação da Base Inexistente', description: 'Selo goteja gases invisíveis.', cause: 'Anel de vedação podre ou ausente', difficulty: 'medio', time: '1 hora', priority: 'importante', solution: 'Recolocar a sanita com novo vedante', isDIY: true, price: 5.00 }
    }
  },

  'lavatorio-entupido': {
    problemId: 5,
    problemTitle: 'Lavatório Entupido',
    symptom: 'Água não escoa ou demora muito a sair do lavatório.',
    questions: [
      {
        id: 'q1',
        question: 'A água escoa de forma lenta ou está totalmente parada?',
        options: [
          { id: 'lenta', label: 'Escoa muito lentamente' },
          { id: 'parada', label: 'Totalmente parada/bloqueada' }
        ]
      },
      {
        id: 'q2',
        question: 'Já tentou limpar o sifão por baixo?',
        options: [
          { id: 'sim', label: 'Sim, mas continua igual' },
          { id: 'nao', label: 'Ainda não tentei' }
        ]
      }
    ],
    paths: {
      'lenta': 'q2',
      'parada': 'q2'
    },
    results: {
      'parada': { id: 50, title: 'Entupimento Total', description: 'Bloqueio total no sifão.', cause: 'Obstrução completa', difficulty: 'simples', time: '15 min', priority: 'urgente', solution: 'Usar desentupidor com força ou remover o sifão para limpeza completa.', isDIY: true, price: 5.00 },
      'nao': { id: 51, title: 'Limpeza de Manutenção', description: 'O problema parece ser superficial.', cause: 'Pequenos detritos no ralo.', difficulty: 'simples', time: '10 min', priority: 'quando-possivel', solution: 'Remova a tampa do ralo e limpe manualmente o que conseguir alcançar.', isDIY: true, price: 5.00 },
      'lenta,sim': { id: 52, title: 'Entupimento na Parede', description: 'O bloqueio está depois do sifão, dentro da tubagem da parede.', cause: 'Acumulação de anos de resíduos.', difficulty: 'avancado', time: '2h', priority: 'urgente', solution: 'Use uma mola de desentupimento flexível para limpar o interior do cano na parede.', isDIY: true, price: 5.00 }
    }
  },

  'lavatorio-mau-cheiro': {
    problemId: 7,
    problemTitle: 'Mau Cheiro no Lavatório',
    symptom: 'Odor desagradável do ralo do lavatório.',
    questions: [
      {
        id: 'q1',
        question: 'O lavatório tem cifão ou a ligação é direta?',
        options: [
          { id: 'esgoto', label: 'Com cifão' },
          { id: 'organico', label: 'Ligação direta' }
        ]
      },
      {
        id: 'q2',
        question: 'O lavatório é usado diariamente?',
        options: [
          { id: 'diario', label: 'Sim, diariamente' },
          { id: 'raro', label: 'Não, é pouco frequente' }
        ]
      }
    ],
    paths: {
      'esgoto': 'q2',
      'organico': 'q2'
    },
    results: {
      'esgoto,raro': { id: 60, title: 'Evaporação do Fecho Hídrico (Sifão Seco)', description: 'A água do sifão evaporou por falta de uso, permitindo que os gases do esgoto entrem livremente.', cause: 'Sifão sem selo de água por desuso.', difficulty: 'simples', time: '1 min', priority: 'quando-possivel', solution: 'Deixe correr água por 30 segundos para repor o selo hídrico. Dica: Se vai viajar, deite um pouco de óleo de cozinha no ralo para evitar a evaporação rápida.', isDIY: true, price: 5.00 },
      'organico,diario': { id: 61, title: 'Acumulação Orgânica (Biofilme)', description: 'Bactérias estão a decompor restos de sabão, pasta de dentes e cabelos acumulados nas paredes dos canos.', cause: 'Biofilme e detritos orgânicos em decomposição.', difficulty: 'simples', time: '15 min', priority: 'quando-possivel', solution: 'Remova detritos visíveis e aplique a técnica ecológica: 1/2 copo de bicarbonato + 1 copo de vinagre branco. Tape o ralo por 30 min e depois despeje água a ferver.', isDIY: true, price: 5.00 },
      'esgoto,diario': { id: 62, title: 'Problema de Ventilação (Sifonagem)', description: 'A descida de água noutros pontos (ex: descarga sanita) aspira a água do seu sifão.', cause: 'Falta de ventilação secundária ou ventilação obstruída.', difficulty: 'medio', time: '1h', priority: 'importante', solution: 'Instale uma válvula de arejamento (mini-sniff) debaixo do lavatório para impedir o vácuo.', isDIY: true, price: 5.00 },
      'organico,raro': { id: 63, title: 'Decomposição em Cano Seco', description: 'Restos orgânicos nas paredes do cano cheiram mal quando secam.', cause: 'Resíduos que não foram lavados e ficaram expostos ao ar.', difficulty: 'simples', time: '10 min', priority: 'quando-possivel', solution: 'Lave o cano com água quente e um desinfetante suave.', isDIY: true, price: 5.00 }
    }
  },

  'lavatorio-torneira': {
    problemId: 8,
    problemTitle: 'Torneira a Pingar',
    symptom: 'A torneira do lavatório não fecha completamente ou pinga.',
    questions: [
      {
        id: 'q1',
        question: 'Que tipo de torneira é?',
        options: [
          { id: 'misturadora', label: 'Uma manete (levanta e vira)' },
          { id: 'tradicional', label: 'Duas manetes (fria e quente separada)' }
        ]
      }
    ],
    paths: {
      'misturadora': 'result-cartucho-ceramico',
      'tradicional': 'result-vedante-borracha'
    },
    results: {
      'result-cartucho-ceramico': { id: 70, title: 'Cartucho de Discos Cerâmicos Gasto', description: 'O mecanismo interno que controla o fluxo está danificado.', cause: 'Desgaste natural ou areias na água.', difficulty: 'medio', time: '30 min', priority: 'importante', solution: 'Identifique a marca e substitua o cartucho cerâmico interno.', isDIY: true, price: 5.00 },
      'result-vedante-borracha': { id: 71, title: 'Vedante (Gaxeta) Danificado', description: 'A borracha que veda a passagem de água está deformada.', cause: 'Aperto excessivo ou calcário.', difficulty: 'simples', time: '15 min', priority: 'importante', solution: 'Substitua a anilha de borracha (vedante) interna da manete.', isDIY: true, price: 5.00 }
    }
  },

  // COZINHA
  'cozinha-entupido': {
    problemId: 10,
    problemTitle: 'Lava-Louça Entupido',
    symptom: 'Água das panelas etc recusa-se a descer.',
    questions: [
      {
        id: 'q1',
        question: 'O escoamento está totalmente parado ou demora algumas horas?',
        options: [
          { id: 'parado', label: 'Totalmente parado' },
          { id: 'lento', label: 'Escoa lentamente' }
        ]
      },
      {
        id: 'q2',
        question: 'Ao tentar usar o desentupidor, há um segundo buraco/bacia ao lado pelo qual a água sobe?',
        options: [
          { id: 'sim', label: 'Sim, numa das outras pias sobe.' },
          { id: 'nao', label: 'Nao sobe nada ou é bacia única.' }
        ]
      }
    ],
    paths: {
      'parado': 'q2',
      'lento': 'q2'
    },
    results: {
      'parado,sim': { id: 90, title: 'Ar Aprisionado / Duas Pias', description: 'Ao empurrar, o fluxo sai pelo ponto mais fácil (pia do lado).', cause: 'Entupimento abaixo da junção em T ou gordura severa.', difficulty: 'medio', time: '30 min', priority: 'importante', solution: 'Tapar firmemente um lado com pano, e usar o desentupidor no outro bocal com bastante pressão.', isDIY: true, price: 5.00 },
      'parado,nao': { id: 91, title: 'Sifão Repleto de Gordura', description: 'A gordura da louça criou algo tipo "cimento".', cause: 'Restos de azeites/comida nas partes estreitas do P-trap.', difficulty: 'medio', time: '30-45 min', priority: 'urgente', solution: 'Remover cuidadosamente o sifão com balde por debaixo e realizar limpeza agressiva manual', isDIY: true, price: 5.00 },
      'lento,sim': { id: 92, title: 'Cano Quase Obstruído', description: 'Gases e lodo começaram a abafar a zona.', cause: 'Acúmulo crónico de restos nos joelhos do cano.', difficulty: 'simples', time: '20 min', priority: 'quando-possivel', solution: 'Misturar vinagre/bicarbonato ou aplicar uma bacia de água a ferver para soltar gorduras menores.', isDIY: true, price: 5.00 },
      'lento,nao': { id: 93, title: 'Crivo Obstruído Mínimo', description: 'Pode ser sujidade presa até na propria válvula/filtro ranhurado do fundo.', cause: 'Cabelos, arroz presinho.', difficulty: 'simples', time: '5 min', priority: 'quando-possivel', solution: 'Efectuar desobstrução à superfície sem desmanchar nada e limpar filtro de palhaço.', isDIY: true, price: 5.00 }
    }
  },

  'cozinha-mau-cheiro': {
    problemId: 11,
    problemTitle: 'Mau Cheiro no Lava-Louça',
    symptom: 'Cheiro fortíssimo a comida em decomposição / Esgoto.',
    questions: [
      {
        id: 'q1',
        question: 'Tem um triturador de cozinha instalado por debaixo da bacia?',
        options: [
          { id: 'com-triturador', label: 'Sim, tenho Triturador.' },
          { id: 'sem-triturador', label: 'Não.' }
        ]
      },
      {
        id: 'q2',
        question: 'Se usar máquina de loiça ao mesmo tempo, o cheiro piora?',
        options: [
          { id: 'sim', label: 'Sobe quando ela drena' },
          { id: 'nao', label: 'É igual' }
        ]
      }
    ],
    paths: {
      'com-triturador': 'q2',
      'sem-triturador': 'q2'
    },
    results: {
      'com-triturador,sim': { id: 100, title: 'Triturador / Dreno da Máquina', description: 'Comida apodreceu dentro das condutas ligadas à máquina.', cause: 'Bactérias espessas no rotor do triturador ou mangueira de lixo da máquina sem declive.', difficulty: 'medio', time: '30 min', priority: 'quando-possivel', solution: 'Passar uns limões e gelo no triturador e verificar declive da mangueira.', isDIY: true, price: 5.00 },
      'com-triturador,nao': { id: 101, title: 'Bactérias no Fundo do Triturador', description: 'O próprio motor tem poças húmidas de comida presa sob as lamelas.', cause: 'Pouca circulação de àgua após usar triturador.', difficulty: 'simples', time: '10 min', priority: 'quando-possivel', solution: 'Moer cascas de cítricos com bastante água para refrescar sistema.', isDIY: true, price: 5.00 },
      'sem-triturador,sim': { id: 102, title: 'Mangueira da Máquina com Mau Cheiro', description: 'A ligação sifónica onde engata o bico de esgoto do esquipamento perde retorno.', cause: 'A válvula de fecho/retrocesso está suja num T por baixo do lava loiça.', difficulty: 'medio', time: '30 min', priority: 'importante', solution: 'Desmontar ligação onde engata o tubo cinza-claro escanelado, limpar e remontar com curva subida.', isDIY: true, price: 5.00 },
      'sem-triturador,nao': { id: 103, title: 'Obstrução Simples das Válvulas', description: 'É o clássico de sujidade escorregadia preta de café etc em acumulação progressiva.', cause: 'Podridão rotineira nos canos do P-Trap.', difficulty: 'simples', time: '20 min', priority: 'quando-possivel', solution: 'Efetuar a limpeza termoquímica ecológica (vinagre+bicarbonato fervente).', isDIY: true, price: 5.00 }
    }
  },

  'cozinha-agua-sobe': {
    problemId: 12,
    problemTitle: 'Água Sobe Quando Lava a Máquina',
    symptom: 'Ejecta água "escondida" a subir pelos bueiros da banca.',
    questions: [
      {
        id: 'q1',
        question: 'Ocorre gargarejos noutros compartimentos se meter máquina?',
        options: [
          { id: 'sim', label: 'Noutros Ralos a casa borbulha' },
          { id: 'nao', label: 'Só a Bacia é afetada' }
        ]
      },
      {
        id: 'q2',
        question: 'Está no fim da mangueira flexível enroscada antes no sifão comum?',
        options: [
          { id: 'sim', label: 'A máquina partilha o esgoto debaixo no balde da cozinha' },
          { id: 'nao', label: 'A máquina atira diretamente para a parede' }
        ]
      }
    ],
    paths: {
      'sim': 'q2',
      'nao': 'q2'
    },
    results: {
      'sim,sim': { id: 110, title: 'Prumada Entupida', description: 'O prédio não deixa despachar. Faz BackFlow.', cause: 'Má capacidade da linha local ou partilhada do tubo.', difficulty: 'avancado', time: 'N/A', priority: 'urgente', solution: 'Contactar Profissional p/ desentupimento robot/pressão de linha', isDIY: false, price: 5.00 },
      'sim,nao': { id: 111, title: 'Prumada Entupida', description: 'O mesmo cenário grave.', cause: 'Linha bloqueada fora do controlo individual.', difficulty: 'avancado', time: 'N/A', priority: 'urgente', solution: 'Técnico Especializado ou Condomínio.', isDIY: false, price: 5.00 },
      'nao,sim': { id: 112, title: 'Sifão em Colapso ou Canos Lentos', description: 'Como partilham a mesma ponte, se o sifão não vence esse volume bombeado, enche e transborda subindo até à bacia da pia da louça.', cause: 'Sujeira reduz diâmetro interno dos tubos em PVC.', difficulty: 'medio', time: '30 min', priority: 'urgente', solution: 'É necessário limpar agressivamente os joelhos de escoagem com bicha manual.', isDIY: true, price: 5.00 },
      'nao,nao': { id: 113, title: 'Entupimento Parcial da Ligação Oculta', description: 'Ao atirar a àgua pesada em segundos a parede bloqueia mas no resto do tempo flui pingas.', cause: 'Acúmulo de pó de lavagem / pedra de sabões e têxteis entupindo logo a entrada de parede.', difficulty: 'avancado', time: '1-2h', priority: 'importante', solution: 'Necessário sonda elíptica de desentupidor em tubo rígido de chumbo. Cuidado para não vazar a parede interior.', isDIY: false, price: 5.00 }
    }
  },

  'cozinha-torneira': {
    problemId: 13,
    problemTitle: 'Torneira Cozinha a Pingar',
    symptom: 'Fazendo poça ao redor e estragando bancada.',
    questions: [
      {
        id: 'q1',
        question: 'Pingos continuam por mais de certos minutos?',
        options: [
          { id: 'sim', label: 'Sim, eternamente' },
          { id: 'nao', label: 'Pára passado um tempo de chuviscar...' }
        ]
      },
      {
        id: 'q2',
        question: 'Por baixo de lava-loiça (no chão do móvel) chove?',
        options: [
          { id: 'sim', label: 'Sim' },
          { id: 'nao', label: 'Seco debaixo do armário' }
        ]
      }
    ],
    paths: {
      'sim': 'q2',
      'nao': 'q2'
    },
    results: {
      'sim,sim': { id: 120, title: 'Rotura no cano interno', description: 'Torneira alta tem rutura nos finíssimos tubos.', cause: 'Degradação grave da base rotativa de metal inteira.', difficulty: 'avancado', time: '1h', priority: 'urgente', solution: 'Trocar toda a torneira extraível urgente. Há risco de apodrecimento no armário inferior.', isDIY: true, price: 5.00 },
      'sim,nao': { id: 121, title: 'Cartucho', description: 'Igual à WC. O modelo precisa de um coração novo.', cause: 'Cartucho misturador riscado ou partido por areias que vieram dos tubos.', difficulty: 'medio', time: '20 min', priority: 'importante', solution: 'Mudar a caixa/cilindro do cartucho (remover manipulo da frente escondido atrás capa colorida).', isDIY: true, price: 5.00 },
      'nao,sim': { id: 122, title: 'Escorrência', description: 'A base vaza da bacia e enche o chão. Não é cano interno.', cause: 'Silicone e mastique de proteção de embutir na pedra cedeu. Água fora vai pra dentro.', difficulty: 'medio', time: '2h', priority: 'importante', solution: 'Reforçar oring junta base e repor mastique.', isDIY: true, price: 5.00 },
      'nao,nao': { id: 123, title: 'Água Acumulada no Bico (Aerador)', description: 'Nao há fuga. Tem é água muito comprida retida dentro do ganso curvo após cada uso.', cause: 'O arejador crivo de malha segura poça, em modelos tipo chuveiro espesso ou curvaturas cegas.', difficulty: 'simples', time: '0 min', priority: 'quando-possivel', solution: 'Solução visual. Nada a reparar, é funcionamento tolerado pelo design, se preferir limpe arejadores que minimiza.', isDIY: true, price: 5.00 }
    }
  },

  // CHUVEIRO
  'chuveiro-entupido': {
    problemId: 14,
    problemTitle: 'Água acumula no Base de Chuveiro',
    symptom: 'Faz piscina enquanto toma banho.',
    questions: [
      {
        id: 'q1',
        question: 'Tem muito lixo visível logo na tampa cromada?',
        options: [
          { id: 'sim', label: 'A grelha reluz de poeiras/cabeladas.' },
          { id: 'nao', label: 'Está brilhante, nada por engolir a olho nu.' }
        ]
      },
      {
        id: 'q2',
        question: 'Se usar chuveiro na Banheira os dois enchem?',
        options: [
          { id: 'apenas1', label: 'Apenas a este afeta' },
          { id: 'multiplo', label: 'Mais rallos sobem as aguas à volta no mesmo momento' }
        ]
      }
    ],
    paths: {
      'sim': 'q2',
      'nao': 'q2'
    },
    results: {
      'sim,apenas1': { id: 130, title: 'Bloqueio Imediato/Hair-catch', description: 'A solução óbvia está mesmo à vista.', cause: 'Massas compactas no ralo superior de metal e gesso dos champôs a colarem.', difficulty: 'simples', time: '5 min', priority: 'importante', solution: 'Retirar Grelha. Arrancar as pastas de tufos capilares à MÃO com luvas. Testar fluxo.', isDIY: true, price: 5.00 },
      'nao,apenas1': { id: 131, title: 'Caixa Sifónica ou Cano P-Trap Entupido', description: 'Foi para o buraco mais fundo da parede/pavimento interior.', cause: 'Amalgamas presas aos plásticos curvos inacessíveis com os dedos normais.', difficulty: 'medio', time: '30 min', priority: 'importante', solution: 'Usar cabides de ferro/arame entortados e enfiar até pescar; Bicarbonatos fortes em ranhuras cegas sem sifão acessível à mão nem ventoso macio sem molhar tudo.', isDIY: true, price: 5.00 },
      'sim,multiplo': { id: 132, title: 'Rede Central Entupida', description: 'Todos têm a conexão tapada na espinha do W.C.', cause: 'Gargalos cheios até à laje estrutural de esgotos mestres.', difficulty: 'avancado', time: '2h', priority: 'urgente', solution: 'Ligar empresa. Pode criar inundações em divisões contínuas muito rápido se tomar banhos ali', isDIY: false, price: 5.00 },
      'nao,multiplo': { id: 133, title: 'Esgotos Subterrâneos Gerais', description: 'O próprio coletor da casa fechou-se e todos desaguadouros estão num único barco.', cause: 'Colapso profundo.', difficulty: 'avancado', time: '2h', priority: 'urgente', solution: 'Serviço profissional imediato (máquina a hidrojateamento mola vibratória)', isDIY: false, price: 5.00 }
    }
  },
  'lavatorio-vazamento': {
    problemId: 9,
    problemTitle: 'Vazamento Debaixo do Lavatório',
    symptom: 'Água a babar ou escorrer para o móvel/chão.',
    questions: [
      {
        id: 'q1',
        question: 'Onde está localizada a origem das gotas?',
        options: [
          { id: 'sifao', label: 'Nos canos brancos grossos (sifão)' },
          { id: 'bichas', label: 'Nas ligações de malha de aço flexíveis' }
        ]
      },
      {
        id: 'q2',
        question: 'A água aparece apenas quando o lavatório está a ser usado?',
        options: [
          { id: 'sim', label: 'Sim, só após lavar' },
          { id: 'nao', label: 'Não, pinga permanentemente' }
        ]
      }
    ],
    paths: {
      'sifao': 'q2',
      'bichas': 'q2'
    },
    results: {
      'sifao,sim': { id: 80, title: 'Porcas do Sifão Frouxas', description: 'As anilhas do PVC não estão a vedar as descargas.', cause: 'Porcas plásticas desapertadas', difficulty: 'simples', time: '5 min', priority: 'importante', solution: 'Apertar fisicamente as porcas com as mãos (sem muito aperto)', isDIY: true, price: 5.00 },
      'sifao,nao': { id: 81, title: 'Ruptura Invisível', description: 'O problema não deveria acontecer com torneiras fechadas.', cause: 'Mistério entre válvula presa e água que sobrou', difficulty: 'medio', time: '20 min', priority: 'importante', solution: 'Desmontar válvula para avaliar rachas no lavatório', isDIY: true, price: 5.00 },
      'bichas,sim': { id: 82, title: 'Vazamento Dinâmico', description: 'Os tubos têm fuga intermitente com os picos de pressão.', cause: 'Mangueiras flexíveis dobradas ou gretadas', difficulty: 'avancado', time: '45 min', priority: 'urgente', solution: 'Substituir as bichas flexíveis ou torneira (risco alto se ignorar)', isDIY: false, price: 5.00 },
      'bichas,nao': { id: 83, title: 'Ligaçäo à Parede Deficiente', description: 'As roscas de alta pressão estão a verter.', cause: 'Anilha interior das bichas cedeu/vedante da válvula escudete', difficulty: 'medio', time: '30 min', priority: 'urgente', solution: 'Desligar corte geral; Fazer vedação teflon em tubos de água novos', isDIY: true, price: 5.00 }
    }
  },

  'chuveiro-mau-cheiro': {
    problemId: 15,
    problemTitle: 'Odor de Fossas em Cabines Mistas',
    symptom: 'A câmara de chouvelro e base acrílico dá cheiro azedo do chão.',
    questions: [
      {
        id: 'q1',
        question: 'Ficou mais do que 4 semanas sem utilizar o mesmo poliban?',
        options: [
          { id: 'sim', label: 'Estava fora de viagem grande.' },
          { id: 'nao', label: 'Uso-o dia-sim, dia-não...' }
        ]
      },
      {
        id: 'q2',
        question: 'Quando cheira mal, o cheiro acaba se lá usar um pouco de chuveiro quente e sabão 5 mins?',
        options: [
          { id: 'sim', label: 'Mascara de imediato/elimina.' },
          { id: 'nao', label: 'Cheira continuamente depois.' }
        ]
      }
    ],
    paths: {
      'sim': 'q2',
      'nao': 'q2'
    },
    results: {
      'sim,sim': { id: 140, title: 'Re-evaporação clássica do copo sifónico liso.', description: 'Bases de duche finas não mantêm muita àgua do nivel do ralo e evaporam rapidamente pelo calor ambiente de ventosos de vidro.', cause: 'Desumidificação.', difficulty: 'simples', time: '2m', priority: 'quando-possivel', solution: 'Coloque meio copo de óleo alimentar no ralo ao ir de viagem - O óleo em cima do copo não evapora as restantes águas seladoras nos ralos sem uso!', isDIY: true, price: 5.00 },
      'sim,nao': { id: 141, title: 'Infiltração Biológica de Borrachas', description: 'Os restos ficaram pretos não nas paredes do pvc, mas onde assentam os o-rings das grelhas.', cause: 'Criadouro orgânico.', difficulty: 'simples', time: '15m', priority: 'quando-possivel', solution: 'Despertar partes, colocar numa banheira de lixívia forte com velha escova de dentes e purificar frestinhas miudinhas antes de montar tudo reluzente.', isDIY: true, price: 5.00 },
      'nao,sim': { id: 142, title: 'Míopes em Limpeza', description: 'Sujos diários e bactérias comuns não foram bem varridos ou chãode pastilha miudinha com fugas cinzentas no WC', cause: 'Limo de argamassa a cheirar com a humidade quente', difficulty: 'simples', time: '20m', priority: 'quando-possivel', solution: 'Produtos lixívia com escovas agressivas, ventilação de vapor doWC sem extratores ligados acumulará cheiro chulé para sempre sobre silicone velho', isDIY: true, price: 5.00 },
      'nao,nao': { id: 143, title: 'Falha do Ralo de Chão / Quebra Copo', description: 'O sifão "anti cheiros" tem rachas, a borracha rompeu e os gases em circuito fechado transpiram pro plastico oco da base de chuvieor', cause: 'Podridão estrutural de bases fracas de acrilico ocas / ralos instalados tortos sem cola', difficulty: 'medio', time: '1h', priority: 'importante', solution: 'Substituição completa da engrenagem do "valvula clickclack base duche alta taxa vazão"', isDIY: true, price: 5.00 }
    }
  },

  'vazamento-chuveiro': {
    problemId: 16,
    problemTitle: 'Vazamento Chuveiro / Fuga Água Oculta',
    symptom: 'A parede oposta ou andar de baixo de repente têm pintura empolar, gotas, mofos enormes depois das chuvadas em que tomo banho.',
    questions: [
      {
        id: 'q1',
        question: 'Tem portas de tela de acrílico ou de vidro grosso inteiriços com vedante escuro velho?',
        options: [
          { id: 'vidro-podre', label: 'Silicone e Fitas de isolamento negras de caruncho e ressequidas' },
          { id: 'novo', label: 'A instalação à vista no banho parece reluzente.' }
        ]
      },
      {
        id: 'q2',
        question: 'As torneiras esguicham e perdem águas esquisitas ou parecem verter internamente?',
        options: [
          { id: 'sim', label: 'Há pingos constantes no corpo do inox.' },
          { id: 'nao', label: 'A agua vai de onde sai pra onde desagua a cano perfeito.' }
        ]
      }
    ],
    paths: {
      'vidro-podre': 'q2',
      'novo': 'q2'
    },
    results: {
      'vidro-podre,sim': { id: 150, title: 'Inundação Despistada (Dano superficial em fugas e torneiras p/fora e vidros)', description: 'Chove mais pra fora da placa de duche do que pra dentro pelas ressonancias', cause: 'Múltiplos pequenos rasgos nas protecoes, portas tortas e oring das misturadoras mortas', difficulty: 'medio', time: '30-40m', priority: 'urgente', solution: 'Renovar tudo as fugas com silicone sanitário de secagem de alta performance de humidade + reparar corpo misturadores.', isDIY: true, price: 5.00 },
      'vidro-podre,nao': { id: 151, title: 'Falta de Fitas', description: 'Causou estrago enorme noutras assoalhadas pelos silicones esburacados no ralo contra chão/parede.', cause: 'Bases sem rebordo perimetral cederam ao pisar (o peso abriu os juntas perfeitamente à noite por dentro)', difficulty: 'medio', time: '1-2h', priority: 'urgente', solution: 'Refazer a argolinha da calafetagem siliconada pesando 2 garrafoes de 5L no pé para garantir estiramento máximo até as folgas cederem enquanto passa os cordões siliconados poliméricos em fita fina!', isDIY: true, price: 5.00 },
      'novo,sim': { id: 152, title: 'Fugas no Cano Frio/Quente Enterrado', description: 'Por trás do lindo mármore recém posto tem tubagem multicamada a rasgar / joelho pingar entre tijolos', cause: 'Mau cravejamento (ou falta deste) na montagem dentro de paredes cegas novas sem porta.', difficulty: 'avancado', time: 'Dias', priority: 'urgente', solution: 'Ação rápida a quebrar paredes ou fazer bypass para secagem, apólice do seguro de acidentes da infraestruturas do condomino / canaliza profissional', isDIY: false, price: 5.00 },
      'novo,nao': { id: 153, title: 'Cachimbo de Esgoto Falso Mento de Ralo Rotura do PVC 40/50 Tubo Escombro', description: 'Água desce o chão e em vez de tubo escorre na laje do andarzinho num cimento esburacado a deitar gotas.', cause: 'Base mal acente esmagou / cortou tubo colado de PVC.', difficulty: 'avancado', time: 'Variável', priority: 'urgente', solution: 'Lembre-se: Chuveiro requer Obras e trolhas em rebentamento se esgoto é dano interno irrenovavel em tubos quebrados p/ reparos!', isDIY: false, price: 5.00 }
    }
  },

  'banheira-entupida': {
    problemId: 17,
    problemTitle: 'Agua da Banheira Demora Descer',
    symptom: 'Faz piscina enorme por uma hora e faz barulho "Glug-Glug".',
    questions: [
      {
        id: 'q1',
        question: 'Banheira com rolha metálica incorporada ou tampão de borracha que enfia nos buracos?',
        options: [
          { id: 'metal', label: 'Tampão Automático Rotativo' },
          { id: 'borracha', label: 'Uma simples placa sem artifícios de correntes.' }
        ]
      },
      {
        id: 'q2',
        question: 'Costuma tomar banho junto a cães peliudos ali ou lavem coisas espessas nela por comodar?',
        options: [
          { id: 'sim', label: 'Sim.' },
          { id: 'nao', label: 'Não' }
        ]
      }
    ],
    paths: {
      'metal': 'q2',
      'borracha': 'q2'
    },
    results: {
      'metal,sim': { id: 160, title: 'Mecanismo Entupido de Pêlos Pesados', description: 'Cruzeta do rolha prega lixo todo no manipolo e entorpece', cause: 'Engrenagens do automático prenderam roscos grossos.', difficulty: 'medio', time: '30m', priority: 'importante', solution: 'Desapertar a chapinha de cima com chavePhilips; Extrair vareta até tubo limpar e instalar fita/mini-mola p desenferrujar se e fechar de lá de dentro as teias sujas aramares antes de usar.', isDIY: true, price: 5.00 },
      'metal,nao': { id: 161, title: 'Cruz do Tampão Falsa / Vácuos', description: 'Tampão não levanta tanto quanto rodar o manipulador. Retém àguas com buraco mínimo.', cause: 'Bicha que levanta o ferro esticou / oxidada nao abre no prato debaixo o fecho hermético devidamente.', difficulty: 'medio', time: '1h', priority: 'importante', solution: 'Reajustar afinador da porca debaixo da cabeça rolha.', isDIY: true, price: 5.00 },
      'borracha,sim': { id: 162, title: 'Bola de Pêlos Reta do Esgoto', description: 'Fez um novelo grosso em canos directos não entalcados pela cruzeta', cause: 'Obstrução física por animais / resíduos fortes compactados e massajados nas curvas em V', difficulty: 'simples', time: '20m', priority: 'importante', solution: 'Pescar os cabelos com palito flexível plástico tipo cobra espinhosa (zipit de loja DIY)', isDIY: true, price: 5.00 }
    }
  },

  'banheira-vazamento': {
    problemId: 17,
    problemTitle: 'Fuga ou Infiltração em Banheira',
    symptom: 'Manchas de humidade no teto debaixo ou parede.',
    questions: [
      {
        id: 'q1',
        question: 'O silicone nas bordas da banheira está em bom estado?',
        options: [
          { id: 'nao', label: 'Não, está preto ou a descolar' },
          { id: 'sim', label: 'Sim, o silicone parece bem vedado' }
        ]
      }
    ],
    paths: {
      'nao': 'result-renovar-silicone',
      'sim': 'result-fuga-esgoto-banheira'
    },
    results: {
      'result-renovar-silicone': { id: 160, title: 'Vedação de Silicone Ineficaz', description: 'A água infiltra-se entre o azulejo e a banheira.', cause: 'Descolamento do silicone por envelhecimento.', difficulty: 'medio', time: '2h', priority: 'importante', solution: 'Remova todo o silicone antigo, desinfete com lixívia, seque bem e aplique novo silicone sanitário.', isDIY: true, price: 5.00 },
      'result-fuga-esgoto-banheira': { id: 161, title: 'Fuga na Válvula de Ralo ou Sifão', description: 'A ligação por baixo da banheira está com uma pequena rotura.', cause: 'Vibração da banheira ou vedante de borracha que secou.', difficulty: 'avancado', time: 'Varia', priority: 'urgente', solution: 'Inspecione a válvula de esgoto (pode necessitar de abrir o murete se não houver tampa)', isDIY: false, price: 5.00 }
    },
    'result-banheira-torneira': {
      problemId: 24,
      problemTitle: 'Torneira da Banheira a Pingar',
      symptom: 'A torneira goteja ininterruptamente mesmo estando fechada.',
      questions: [
        { id: 'q1', question: 'Por onde pinga exatamente?', options: [{ id: 'bica', label: 'Pingos caem pelo bico principal ou auscultador do chuveiro' }, { id: 'base', label: 'Baba água pelas junções ou por trás do manípulo' }] },
        { id: 'q2', question: 'A torneira é de manípulo único (monocomando) ou de dois manípulos independentes?', options: [{ id: 'mono', label: 'Monocomando (1 alavanca)' }, { id: 'bi', label: 'Bicomando (2 roscas quent/fria)' }] }
      ],
      paths: {
        'bica': 'q2',
        'base': 'q2'
      },
      results: {
        'bica,mono': { id: 220, title: 'Cartucho Cerâmico Danificado', description: 'O mecanismo interior que regula a água quente/fria rasgou.', cause: 'Desgaste pelo uso ou calcário infiltrado.', difficulty: 'medio', time: '30m', priority: 'importante', solution: 'Desmontar manípulo frontal, cortar a água geral e substituir o cartucho cerâmico.', isDIY: true, price: 5.00 },
        'bica,bi': { id: 221, title: 'Castelo ou Vedante de Borracha (Chupeta)', description: 'As anilhas de borracha prensadas nos veios não fecham hermeticamente.', cause: 'Borrachas ressequidas por anos de aperto.', difficulty: 'simples', time: '30m', priority: 'quando-possivel', solution: 'Desmontar os castelos e colocar couratos e o-rings novos.', isDIY: true, price: 5.00 },
        'base,mono': { id: 222, title: 'Juntas / O-rings Desgastados', description: 'Porcas desapertadas ou juntas de teflon/borracha a ceder.', cause: 'Movimentos bruscos na torneira ou borrachas gastas.', difficulty: 'medio', time: '30m', priority: 'importante', solution: 'Reapertar os excêntricos da parede ou substituir juntas da misturadora.', isDIY: true, price: 5.00 },
        'base,bi': { id: 223, title: 'Juntas / O-rings Desgastados', description: 'Porcas desapertadas ou juntas de teflon/borracha a ceder.', cause: 'Movimentos bruscos na torneira ou borrachas gastas.', difficulty: 'medio', time: '30m', priority: 'importante', solution: 'Reapertar os excêntricos da parede ou substituir juntas da misturadora.', isDIY: true, price: 5.00 }
      }
    },
    'result-banheira-cheiro': {
      problemId: 25,
      problemTitle: 'Mau Cheiro Vindo da Banheira',
      symptom: 'Sente um cheiro a esgoto ou "ovos podres" perto da banheira.',
      questions: [
        { id: 'q1', question: 'Toma banho nesta banheira regularmente (quase toda a semana) ou ela fica semanas sem uso?', options: [{ id: 'muito', label: 'É usada quase todos os dias' }, { id: 'raro', label: 'É na casa de hóspedes / meses sem usar' }] },
        { id: 'q2', question: 'Costuma ouvir "glug-glug" (agitar) quando alguém faz descarga da sanita ou noutro ralo próximo?', options: [{ id: 'sim', label: 'Ouço sons de ralo a borbulhar' }, { id: 'nao', label: 'Não tem qualquer som esquisito' }] }
      ],
      paths: {
        'muito': 'q2',
        'raro': 'q2'
      },
      results: {
        'raro,sim': { id: 230, title: 'Evaporação do Fecho Hídrico (Sifão Seco)', description: 'A água que estava no ralo e impedia os cheiros evaporou/desceu por sucção de outra canalização.', cause: 'Secagem do sifão.', difficulty: 'simples', time: '1m', priority: 'quando-possivel', solution: 'Deite uma bacia de água limpa no ralo para restaurar a água bloqueadora de odor.', isDIY: true, price: 0 },
        'raro,nao': { id: 231, title: 'Evaporação Natural (Sifão Seco)', description: 'A água da barreira do ralo evaporou de não ser usada.', cause: 'Falta de uso a longo prazo.', difficulty: 'simples', time: '1m', priority: 'quando-possivel', solution: 'Deitar água de 15 em 15 dias. Usar um pouco de óleo alimentar por cima da água atrasa a evaporação se for viajar.', isDIY: true, price: 0 },
        'muito,sim': { id: 232, title: 'Problema de Ventilação da Coluna', description: 'Sem ventilação na laje, quando há uma descarga forte cria vácuo e chupa a água do ralo da sua banheira para lá.', cause: 'Falta de respiradouros abertos no prédio ou coluna geral muito obstruída.', difficulty: 'avancado', time: 'Variável', priority: 'importante', solution: 'Inspeção à coluna geral de esgotos por condomínio/canalizador especializado.', isDIY: false, price: 0 },
        'muito,nao': { id: 233, title: 'Limo e Sujidade Focada Bacteriana', description: 'Pode verter mas também acumula gelatina preta (mistura de champôs e sabão velho).', cause: 'Bactérias em decomposição natural abaixo do ralo.', difficulty: 'simples', time: '15m', priority: 'quando-possivel', solution: 'Limpeza térmica (produtos alcalinos ou vinagrete fervente) dentro da câmara do esgoto do ralo.', isDIY: true, price: 5.00 }
      }
    }
  },

  'banheira-mau-cheiro': {
    problemId: 18,
    problemTitle: 'Mau Cheiro na Banheira',
    symptom: 'Odor a podre vindo do ralo de transbordo (ladrão).',
    questions: [
      {
        id: 'q1',
        question: 'Usa a banheira com frequência ou serve apenas para banhos rápidos?',
        options: [
          { id: 'banhos', label: 'Apenas banhos e duches' },
          { id: 'pouco', label: 'Está quase sempre parada' }
        ]
      }
    ],
    paths: {
      'banhos': 'result-cabelos-limpeza',
      'pouco': 'result-caixa-sifonica-seca'
    },
    results: {
      'result-cabelos-limpeza': { id: 170, title: 'Resíduos Fermentados no Ralo', description: 'Bactérias acumulam-se nos cabelos presos na saída.', cause: 'Resíduos de champô e cabelos retidos na válvula.', difficulty: 'simples', time: '15 min', priority: 'quando-possivel', solution: 'Verta água a ferver com detergente e remova cabelos visíveis.', isDIY: true, price: 5.00 },
      'result-caixa-sifonica-seca': { id: 171, title: 'Evaporação por Desuso', description: 'Falta de selo hídrico na ligação geral.', cause: 'Desuso prolongado.', difficulty: 'simples', time: '1 min', priority: 'quando-possivel', solution: 'Deixe correr água por algum tempo em todos os sanitários.', isDIY: true, price: 5.00 }
    }
  },

  'banheira-torneira': {
    problemId: 19,
    problemTitle: 'Torneira a Pingar (Banheira)',
    symptom: 'A água pinga continuamente impedindo o descanso.',
    questions: [
      {
        id: 'q1',
        question: 'A pinga é pela saída da banheira ou pelo chuveiro de mão?',
        options: [
          { id: 'banheira', label: 'Pela saída principal' },
          { id: 'chuveiro', label: 'Pelo chuveiro pendurado' }
        ]
      }
    ],
    paths: {
      'banheira': 'result-mecanismo-manete',
      'chuveiro': 'result-inversor-danificado'
    },
    results: {
      'result-mecanismo-manete': { id: 180, title: 'Mecanismo Ceramic Interno Gasto', description: 'O controlo de temperatura/fluxo não veda a 100%.', cause: 'Uso constante ao longo dos anos.', difficulty: 'medio', time: '40 min', priority: 'importante', solution: 'Substitua o cartucho misturador de 35mm ou 40mm conforme a marca.', isDIY: true, price: 5.00 },
      'result-inversor-danificado': { id: 181, title: 'Vedante do Inversor Estragado', description: 'O botão que vira para o chuveiro não fecha bem a outra saída.', cause: 'Calcário acumulado no vedante do inversor.', difficulty: 'medio', time: '30 min', priority: 'importante', solution: 'Desmonte o inversor (o botão de puxar) e descalcifique com vinagre.', isDIY: true, price: 5.00 }
    }
  },


  // TUBAGENS & GERAL
  'baixa-pressao': {
    problemId: 18,
    problemTitle: 'Baixa Pressão de Água',
    symptom: 'Água sai sem força, apenas em fio, ou demora muito a encher recipientes.',
    questions: [
      {
        id: 'q1',
        question: 'O problema é em todas as torneiras da casa ou apenas numa específica (ex: chuveiro)?',
        options: [
          { id: 'todas', label: 'Em todas as torneiras da casa' },
          { id: 'apenas-uma', label: 'Apenas numa torneira/chuveiro' }
        ]
      },
      {
        id: 'q2a',
        question: 'Verificou se a válvula principal/contador de água está totalmente aberta?',
        options: [
          { id: 'sim', label: 'Sim, está aberta' },
          { id: 'nao', label: 'Não, estava semi-fechada' }
        ]
      },
      {
        id: 'q2b',
        question: 'A água está quente ou fria quando nota o problema?',
        options: [
          { id: 'ambas', label: 'Tanto faz, acontece com água fria e quente' },
          { id: 'apenas-quente', label: 'Apenas com a água quente' }
        ]
      }
    ],
    paths: {
      'todas': 'q2a',
      'apenas-uma': 'q2b'
    },
    results: {
      'todas,nao': { id: 170, title: 'Válvula de Entrada Parcialmente Fechada', description: 'A torneira do contador ou de segurança da casa não estava totalmente aberta.', cause: 'Registo fechado acidentalmente ou por obras anteriores.', difficulty: 'simples', time: '2 min', priority: 'importante', solution: 'Abrir a válvula principal de segurança na totalidade.', isDIY: true, price: 5.00 },
      'todas,sim': { id: 171, title: 'Problema na Rede Geral ou Fuga Oculta Principal', description: 'Se a válvula está aberta, pode ser um problema do município, bloqueio geral de calcário ou rutura principal.', cause: 'Abastecimento público fraco ou corrosão nas prumadas de ferro antigas.', difficulty: 'avancado', time: 'Variável', priority: 'urgente', solution: 'Contactar companhia de águas ou profissional para inspecionar a prumada.', isDIY: false, price: 5.00 },
      'apenas-uma,ambas': { id: 172, title: 'Arejador/Filtro Entupido com Calcário', description: 'O bico da torneira/filtro do chuveiro está cheio de lixo e minerais.', cause: 'Depósitos minerais (calcário) e sedimentos bloqueiam a saída.', difficulty: 'simples', time: '10 min', priority: 'quando-possivel', solution: 'Desapertar a ponta da torneira e mergulhar em vinagre para dissolver o calcário.', isDIY: true, price: 5.00 },
      'apenas-uma,apenas-quente': { id: 173, title: 'Bloqueio no Esquentador/Termoacumulador', description: 'A fuga de fluxo acontece depois da água passar pelo aquecimento.', cause: 'Sedimentos ou calcário a bloquear os tubos de saída do aparelho de aquecimento.', difficulty: 'medio', time: '1h', priority: 'importante', solution: 'Necessário limpar/purgar o esquentador ou descalcificar. Chamar técnico se a gás.', isDIY: false, price: 5.00 }
    }
  },

  'fuga-oculta': {
    problemId: 19,
    problemTitle: 'Possível Fuga de Água Oculta',
    symptom: 'Acha que tem uma fuga porque a conta da água aumentou ou tem manchas na parede.',
    questions: [
      {
        id: 'q1',
        question: 'Nota alguma mancha de humidade visível no teto, chão ou parede, ou poças?',
        options: [
          { id: 'sim', label: 'Sim, há humidade aparente' },
          { id: 'nao', label: 'Não, apenas notei na conta da água' }
        ]
      },
      {
        id: 'q2',
        question: 'Com todas as torneiras e máquinas fechadas, o ponteiro do contador da água continua a rodar?',
        options: [
          { id: 'roda', label: 'Sim, continua a rodar' },
          { id: 'nao-roda', label: 'Não, fica estático' }
        ]
      }
    ],
    paths: {
      'sim': 'q2',
      'nao': 'q2'
    },
    results: {
      'sim,roda': { id: 180, title: 'Fuga de Água Ativa com Danos', description: 'Há uma ruptura a deixar sair água para as paredes constantemente.', cause: 'Corrosão, tubagens antigas ou juntas mal vedadas soltaram-se.', difficulty: 'avancado', time: 'Dias', priority: 'urgente', solution: 'Fechar água urgente! Chamar detetor de fugas especializado para partir no sítio certo.', isDIY: false, price: 5.00 },
      'sim,nao-roda': { id: 181, title: 'Infiltração ou Fuga Passiva', description: 'A mancha deve vir de esgotos, de fora (chuva) ou do vizinho.', cause: 'Ruptura no circuito de esgotos ou isolamento exterior, já que a pressão de entrada não tem fuga.', difficulty: 'avancado', time: 'Dias', priority: 'importante', solution: 'Investigar tetos, vizinhos ou telhado. Reparar calafetagens do chuveiro.', isDIY: false, price: 5.00 },
      'nao,roda': { id: 182, title: 'Fuga Oculta (Água a Rolar na Sanita?)', description: 'Não há humidade porque a água pode estar a ir direta para o esgoto.', cause: 'Frequentemente é fuga no autoclismo, válvula sempre a deixar passar água devagar.', difficulty: 'medio', time: '1h', priority: 'importante', solution: 'Aplicar corante alimentar no autoclismo e ver se pinta a sanita. Se sim, substituir válvulas do tanque!', isDIY: true, price: 5.00 },
      'nao,nao-roda': { id: 183, title: 'Erro de Leitura ou Fuga Intermitente', description: 'O contador não roda quando não tem uso.', cause: 'Erro da companhia de água ou fuga só quando liga a rega/máquinas.', difficulty: 'simples', time: 'N/A', priority: 'quando-possivel', solution: 'Confirmar leitura no contador e contactar o fornecedor.', isDIY: true, price: 5.00 }
    }
  },

  'ruido-canos': {
    problemId: 20,
    problemTitle: 'Ruídos Estranhos nos Canos',
    symptom: 'Assobios, batidas (martelo) ou sons de água a correr quando fecha as torneiras.',
    questions: [
      {
        id: 'q1',
        question: 'O som acontece quando fecha uma torneira de repente (bang!)?',
        options: [
          { id: 'batida', label: 'Sim, ouço um estrondo metálico' },
          { id: 'assobio', label: 'Não, ouço um assobio constante ou vibração' }
        ]
      },
      {
        id: 'q2',
        question: 'Isso também acontece se abrir e fechar a água devagarinho?',
        options: [
          { id: 'sim', label: 'Sim, faz na mesma' },
          { id: 'nao', label: 'Se fechar devagar, o barulho não acontece' }
        ]
      }
    ],
    paths: {
      'batida': 'q2',
      'assobio': 'result-outro-som'
    },
    results: {
      'batida,nao': { id: 190, title: 'Golpe de Aríete (Water Hammer)', description: 'Choque de pressão brusco porque a água rápida é interrompida subitamente.', cause: 'Falta de amortecedores de impacto e inércia brutal da água na tubagem.', difficulty: 'medio', time: '1h', priority: 'importante', solution: 'Fechar sempre as torneiras monocomando e das máquinas devagar. / Instalar amortecedores de aríete.', isDIY: true, price: 5.00 },
      'batida,sim': { id: 191, title: 'Tubagens Soltas nas Paredes', description: 'As abraçadeiras nos tubos debaixo da banca ou atrás do pladur cederam.', cause: 'A vibração natural da passagem da água bate contra a parede por falta de fixação.', difficulty: 'medio', time: '1h', priority: 'importante', solution: 'Colocar fita isoladora (esponja) ou braçadeiras plásticas nos tubos rígidos onde tiverem acessíveis.', isDIY: true, price: 5.00 },
      'result-outro-som': { id: 192, title: 'Ar nos Canos / Cartuchos Defeituosos', description: 'Vibrações tipo matraca (assobios) quando abre a água a meio gás.', cause: 'Assobios e zumbidos significam ar na tubagem ou o-rings estragados a fazer ricochete na torneira.', difficulty: 'simples', time: '30 min', priority: 'quando-possivel', solution: 'Purgar ar: abrir todas as torneiras da casa 2 minutos e depois fechar. Ou substituir o cartucho da torneira.', isDIY: true, price: 5.00 }
    }
  },

  'esquentador-frio': {
    problemId: 21,
    problemTitle: 'Água Fria no Esquentador',
    symptom: 'O aparelho não liga ou a água sai fria.',
    questions: [
      {
        id: 'q1',
        question: 'O esquentador faz a faísca (clic-clic) ou não reage de todo?',
        options: [
          { id: 'nao-liga', label: 'Não reage/Não liga luzes' },
          { id: 'liga-mas-frio', label: 'Liga a chama mas a água não aquece' }
        ]
      },
      {
        id: 'q2',
        question: 'Tem gás disponível (em outras bocas como o fogão)?',
        options: [
          { id: 'tem-gas', label: 'Sim, a botija/canalização tem gás a funcionar' },
          { id: 'nao-tem', label: 'O gás também não funciona lá' }
        ]
      },
      {
        id: 'q3',
        question: 'Nota barulhos ou vibrações estranhas?',
        options: [
          { id: 'sim-barulhos', label: 'Sim, parece que ferve ou range' },
          { id: 'nao-barulhos', label: 'Não, apenas sai água fria' }
        ]
      }
    ],
    paths: {
      'nao-liga': 'q2',
      'liga-mas-frio': 'q3'
    },
    results: {
      'nao-liga,nao-tem': { id: 200, title: 'Falta de Combustível Principal', description: 'O aparelho não liga simplesmente porque não tem gás.', cause: 'Garrafa vazia ou válvula de emergência cortada.', difficulty: 'simples', time: '10 min', priority: 'urgente', solution: 'Assegurar fornecimento ou trocar garrafa. Verificar válvulas de segurança amarelas!', isDIY: true, price: 0 },
      'nao-liga,tem-gas': { id: 201, title: 'Falha do Sensor de Fusão/Pilhas Fracas', description: 'O sensor elétrico de faísca não o arranca.', cause: 'Baterias do esquentador velhas, ou membrana de pressão de água furada/rota.', difficulty: 'medio', time: '30 min', priority: 'importante', solution: 'Trocar a pilha tipo D do esquentador. Se não resolver, o módulo de ignição precisa de técnico.', isDIY: true, price: 5.00 },
      'liga-mas-frio': { id: 202, title: 'Termóstato / Permutador de Calor Gasto', description: 'O fogo está vivo mas o permutador não consegue passar calor para a água.', cause: 'Acumulação grave de sedimentos e minerais isolantes, ou limitador de temperatura avariado.', difficulty: 'avancado', time: '1h', priority: 'importante', solution: 'Ação crítica: chamar profissional de redes de gás para limpeza e purga da serpentina. Não manipular gás por conta própria.', isDIY: false, price: 0 }
    }
  },

  'termoacumulador-frio': {
    problemId: 22,
    problemTitle: 'Problemas no Termoacumulador',
    symptom: 'Água sai fria ou o aparelho não liga a luz indicadora.',
    questions: [
      {
        id: 'q1',
        question: 'A água sai com o fluxo normal mas fria, ou não sai de todo?',
        options: [
          { id: 'sem-agua', label: 'Não sai água quente nos canos' },
          { id: 'pouca-agua', label: 'Sai água mas acaba em 2 minutos' },
          { id: 'ruidos-fugas', label: 'Ouço ruídos metálicos ou vejo pingas no fundo' }
        ]
      },
      {
        id: 'q2',
        question: 'O disjuntor do quadro elétrico disparou?',
        options: [
          { id: 'disparou', label: 'Sim, o quadro vai abaixo' },
          { id: 'ligado', label: 'Não, a luz do aparelho está acesa' }
        ]
      },
      {
        id: 'q3',
        question: 'A fuga é nos tubos ou por dentro da carcaça?',
        options: [
          { id: 'tubos', label: 'Pelos tubos flexíveis' },
          { id: 'tanque', label: 'Pingas vêm por dentro do isolamento' }
        ]
      }
    ],
    paths: {
      'sem-agua': 'q2',
      'pouca-agua': 'result-calcario-resistencia',
      'ruidos-fugas': 'q3'
    },
    results: {
      'disparou': { id: 220, title: 'Resistência em Curto-Circuito', description: 'A resistência elétrica está furada e em contacto com a água.', cause: 'Corrosão extrema por falta de mudança do ânodo de magnésio.', difficulty: 'medio', time: '2h', priority: 'urgente', solution: 'Desligue da eletricidade imediatamente. Substitua a resistência e o ânodo.', isDIY: true, price: 5.00 },
      'ligado': { id: 221, title: 'Termóstato de Segurança Ativado', description: 'O aparelho superaqueceu e o disjuntor térmico interno desligou.', cause: 'Sonda danificada ou temperatura configurada no máximo.', difficulty: 'medio', time: '30 min', priority: 'importante', solution: 'Carregue no botão de reset do termóstato (dentro da tampa de plástico).', isDIY: true, price: 5.00 },
      'result-calcario-resistencia': { id: 222, title: 'Excesso de Calcário no Tanque', description: 'O tanque está cheio de pedras de calcário que roubam espaço à água.', cause: 'Anos de acumulação sem purga periódica.', difficulty: 'medio', time: '3h', priority: 'quando-possivel', solution: 'Esvazie o termoacumulador e limpe manualmente o calcário acumulado no fundo.', isDIY: true, price: 5.00 },
      'tanque': { id: 223, title: 'Tanque Perfurado (Fim de Vida)', description: 'O balão interno de aço está com ferrugem e furado.', cause: 'Oxidação galvânica. O ânodo de sacrifício desapareceu.', difficulty: 'avancado', time: '3h', priority: 'urgente', solution: 'O aparelho não tem reparação viável. Necessita de um termoacumulador novo.', isDIY: false, price: 5.00 }
    }
  },

  'falha-bombas': {
    problemId: 23,
    problemTitle: 'Falha em Bombas de Esgoto',
    symptom: 'A cave está a começar a inundar ou a bomba de drenagem não liga.',
    questions: [
      {
        id: 'q1',
        question: 'O ouve o motor a tentar trabalhar (zumbido) ou silêncio total?',
        options: [
          { id: 'zumbido', label: 'Ouço o motor mas não sai água' },
          { id: 'silencio', label: 'Não faz qualquer som' }
        ]
      },
      {
        id: 'q2',
        question: 'Se levantar o flutuador com a mão, ela liga?',
        options: [
          { id: 'liga-sim', label: 'Sim, assim que levanto' },
          { id: 'liga-nao', label: 'Não reage na mesma' }
        ]
      }
    ],
    paths: {
      'zumbido': 'result-bomba-bloqueada',
      'silencio': 'q2'
    },
    results: {
      'result-bomba-bloqueada': { id: 230, title: 'Turbina da Bomba Bloqueada', description: 'Algum detrito impediu a turbina de rodar.', cause: 'Panos, toalhetes ou areias que entraram no poço.', difficulty: 'medio', time: '1h', priority: 'urgente', solution: 'Puxe a bomba para fora, limpe a base e verifique se as pás rodam livremente.', isDIY: true, price: 5.00 },
      'liga-sim': { id: 231, title: 'Flutuador Preso ou Desajustado', description: 'A bomba está boa mas o interruptor mecânico não sobe.', cause: 'Falta de espaço no poço ou gordura no cabo.', difficulty: 'simples', time: '15 min', priority: 'importante', solution: 'Limpe o poço e garanta que o flutuador tem espaço livre para subir e descer.', isDIY: true, price: 5.00 },
      'liga-nao': { id: 232, title: 'Falha Elétrica ou Motor Queimado', description: 'Danos permanentes no motor ou falta de corrente.', cause: 'Humidade na ficha ou sobreaquecimento do motor.', difficulty: 'avancado', time: 'Varia', priority: 'urgente', solution: 'Verifique se há luz na tomada. Se houver, a bomba deve ser substituída.', isDIY: false, price: 5.00 }
    }
  }

}
