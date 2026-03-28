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
    symptom: 'Água está a correr dentro da sanita, ou ouves um som de água a correr constantemente.',
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
      'sempre,botao-parede': { id: 1, title: 'Válvula de Descarga Defeituosa', description: 'A válvula de descarga não está a fechar corretamente.', cause: 'Válvula de descarga desgastada ou com problemas de vedação', difficulty: 'avancado', time: '1-2 horas', priority: 'importante', solution: 'Substituir válvula de descarga', isDIY: false, price: 4.99 },
      'depois-descarga,botao-parede': { id: 2, title: 'Válvula de Enchimento Defeituosa', description: 'A válvula de enchimento não para de encher.', cause: 'Válvula de enchimento desgastada ou boia desajustada', difficulty: 'avancado', time: '1-2 horas', priority: 'importante', solution: 'Substituir válvula de enchimento', isDIY: false, price: 4.99 },
      'sempre,caixa-plastico': { id: 3, title: 'Válvula de Descarga Defeituosa', description: 'A válvula de descarga não está a fechar corretamente.', cause: 'Válvula de descarga desgastada ou com problemas de vedação', difficulty: 'medio', time: '30-60 min', priority: 'importante', solution: 'Substituir válvula de descarga', isDIY: true, price: 4.99 },
      'depois-descarga,caixa-plastico': { id: 4, title: 'Válvula de Enchimento Defeituosa', description: 'A válvula de enchimento não para de encher.', cause: 'Válvula de enchimento desgastada ou boia desajustada', difficulty: 'medio', time: '30-60 min', priority: 'importante', solution: 'Ajustar ou substituir válvula de enchimento', isDIY: true, price: 4.99 },
      'sempre,caixa-ceramica': { id: 5, title: 'Válvula de Descarga Defeituosa', description: 'A válvula de descarga não está a fechar corretamente.', cause: 'Válvula de descarga desgastada ou com problemas de vedação', difficulty: 'simples', time: '30 min', priority: 'importante', solution: 'Substituir válvula de descarga', isDIY: true, price: 4.99 },
      'depois-descarga,caixa-ceramica': { id: 6, title: 'Válvula de Enchimento Defeituosa', description: 'A válvula de enchimento não para de encher.', cause: 'Válvula de enchimento desgastada ou boia desajustada', difficulty: 'simples', time: '30 min', priority: 'importante', solution: 'Ajustar ou substituir válvula de enchimento', isDIY: true, price: 4.99 }
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
        question: 'Olha para o interior do tanque. Como é o mecanismo de descarga?',
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
      'tanque-cheio,botao-duplo': { id: 10, title: 'Mecanismo Moderno com Falha', description: 'O mecanismo de descarga de botão duplo não funciona.', cause: 'Mecanismo com falha no botão', difficulty: 'medio', time: '30-60 min', priority: 'importante', solution: 'Substituir mecanismo de descarga', isDIY: true, price: 4.99 },
      'tanque-cheio,alavanca-lateral': { id: 11, title: 'Mecanismo Tradicional com Falha', description: 'A alavanca soltou-se internamente.', cause: 'Corrente solta ou alavanca partida', difficulty: 'simples', time: '20-40 min', priority: 'importante', solution: 'Voltar a prender ou mudar alavanca', isDIY: true, price: 4.99 },
      'result-torneira-fechada': { id: 12, title: 'Entrada de Água Bloqueada', description: 'A torneira de segurança está fechada.', cause: 'Torneira fechada', difficulty: 'simples', time: '2 min', priority: 'importante', solution: 'Abrir a torneira', isDIY: true, price: 0 },
      'tanque-vazio,torneira-aberta,silencio-total': { id: 13, title: 'Válvula Bloqueada', description: 'A válvula de enchimento não abre.', cause: 'Válvula avariada', difficulty: 'medio', time: '30-60 min', priority: 'importante', solution: 'Substituir válvula de enchimento', isDIY: true, price: 4.99 },
      'tanque-vazio,torneira-aberta,som-agua': { id: 14, title: 'Válvula Entupida', description: 'Válvula está aberta mas fluxo é quase nulo.', cause: 'Válvula entupida com calcário', difficulty: 'medio', time: '30-45 min', priority: 'importante', solution: 'Limpar ou substituir válvula', isDIY: true, price: 4.99 }
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
      'apartamento,so-esta': { id: 20, title: 'Entupimento Local', description: 'Apenas a sanita entupida.', cause: 'Excesso de papel ou toalhitas', difficulty: 'medio', time: '30-60 min', priority: 'importante', solution: 'Usar desentupidor ou sonda caseira', isDIY: true, price: 4.99 },
      'apartamento,varias': { id: 21, title: 'Coluna do Prédio', description: 'Problema na coluna comum do prédio.', cause: 'Coluna comum entupida', difficulty: 'avancado', time: 'Condomínio', priority: 'urgente', solution: 'Contactar condomínio', isDIY: false, price: 0 },
      'vivenda,so-esta': { id: 22, title: 'Entupimento na Sanita', description: 'Entupimento apenas num troço do esgoto.', cause: 'Obstrução local', difficulty: 'medio', time: '30-60 min', priority: 'importante', solution: 'Desentupir sanita ou caixa sifónica', isDIY: true, price: 4.99 },
      'vivenda,varias': { id: 23, title: 'Fossa/Esgoto Principal', description: 'Rede principal entupida.', cause: 'Esgoto principal', difficulty: 'avancado', time: '1-2 horas', priority: 'urgente', solution: 'Chamar canalizador com jato de água', isDIY: false, price: 0 }
    }
  },
  'sanita-vazamento': {
    problemId: 4,
    problemTitle: 'Vazamento na Base da Sanita',
    symptom: 'Água a sair pela base da sanita.',
    questions: [
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
      'apos-descarga': 'q2',
      'constante': 'q2'
    },
    results: {
      'apos-descarga,abana': { id: 30, title: 'Parafusos Soltos', description: 'O movimento rompeu a vedação.', cause: 'Parafusos desapertados', difficulty: 'simples', time: '15 min', priority: 'importante', solution: 'Apertar parafusos da base', isDIY: true, price: 4.99 },
      'apos-descarga,firme': { id: 31, title: 'Anel de Cera Danificado', description: 'O anel que liga ao esgoto estragou-se.', cause: 'Anel de cera velho/rompido', difficulty: 'medio', time: '1-2 horas', priority: 'urgente', solution: 'Substituir anel de vedação', isDIY: true, price: 4.99 },
      'constante,abana': { id: 32, title: 'Vazamento Superior', description: 'Água vem do tanque escorrendo.', cause: 'Vazamento de acoplamento do tanque', difficulty: 'medio', time: '1-2 horas', priority: 'urgente', solution: 'Mudar vedantes do autoclismo', isDIY: true, price: 4.99 },
      'constante,firme': { id: 33, title: 'Fissura na Louça', description: 'Possível fissura impercetível na sanita.', cause: 'Porcelana estalada', difficulty: 'avancado', time: '2-3 horas', priority: 'urgente', solution: 'Mudar a sanita inteira', isDIY: false, price: 0 }
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
      'raramente,sim': { id: 40, title: 'Sifão Seco', description: 'Água evaporou, o esgoto está direto para casa.', cause: 'Sifão sem água', difficulty: 'simples', time: '1 min', priority: 'quando-possivel', solution: 'Fazer descargas em WCs sem uso', isDIY: true, price: 0 },
      'raramente,nao': { id: 41, title: 'Sifão Seco', description: 'Água evaporou, o esgoto está direto.', cause: 'Sifão sem água', difficulty: 'simples', time: '1 min', priority: 'quando-possivel', solution: 'Fazer uma descarga', isDIY: true, price: 0 },
      'diariamente,sim': { id: 42, title: 'Entupimento Parcial / Má Ventilação', description: 'Entupimento na rede cria sucção e esvazia o sifão.', cause: 'Problema ventilatório ou pré-entupimento', difficulty: 'avancado', time: '1-2 horas', priority: 'importante', solution: 'Chamar canalizador para limpar linha', isDIY: false, price: 0 },
      'diariamente,nao': { id: 43, title: 'Vedação da Base Inexistente', description: 'Selo goteja gases invisíveis.', cause: 'Anel de vedação podre ou ausente', difficulty: 'medio', time: '1 hora', priority: 'importante', solution: 'Recolocar a sanita com novo vedante', isDIY: true, price: 4.99 }
    }
  },

  'sanita-agua-desce': {
    problemId: 18,
    problemTitle: 'Nível da Água Desce Sozinho',
    symptom: 'O nível da água na bacia da sanita desce sem motivo aparente, sem fuga visível.',
    questions: [
      {
        id: 'q1',
        question: 'Quando é que repara que o nível desceu?',
        options: [
          { id: 'manha', label: 'De manhã, depois de uma noite sem usar' },
          { id: 'pouco-tempo', label: 'Poucos minutos depois da descarga' }
        ]
      },
      {
        id: 'q2',
        question: 'Ouve algum barulho tipo "gorgolejo" quando usa outro ralo na casa de banho (ex: lavatório ou chuveiro)?',
        options: [
          { id: 'sim', label: 'Sim, borbulha ou faz ruído' },
          { id: 'nao', label: 'Não, silêncio total' }
        ]
      }
    ],
    paths: {
      'manha': 'q2',
      'pouco-tempo': 'q2'
    },
    results: {
      'manha,sim': { id: 170, title: 'Sifão a Perder Fecho Hídrico (Vácuo)', description: 'A coluna de esgoto está a sugar a água do sifão da sanita por falta de ventilação.', cause: 'Deficiência na ventilação da coluna de esgoto do prédio (efeito sifão)', difficulty: 'avancado', time: 'Variável', priority: 'importante', solution: 'Contactar canalizador para instalar válvula anti-vácuo ou rever a ventilação da prumada', isDIY: false, price: 0 },
      'manha,nao': { id: 171, title: 'Evaporação Normal ou Micro-Fissura', description: 'A água evapora lentamente ou existe uma fissura invisível na curva sifónica da sanita.', cause: 'Evaporação natural em WC pouco usado ou micro-fissura na porcelana interna', difficulty: 'simples', time: '5 min', priority: 'quando-possivel', solution: 'Se o WC é pouco usado, faça uma descarga semanal. Se o problema persistir com uso regular, a sanita pode ter uma fissura interna e precisar de substituição.', isDIY: true, price: 0 },
      'pouco-tempo,sim': { id: 172, title: 'Sucção da Coluna de Esgoto', description: 'A descarga de outro equipamento no mesmo prédio está a criar vácuo e a puxar a água.', cause: 'Efeito de sifonagem induzida pela rede de esgoto partilhada', difficulty: 'avancado', time: '1-2 horas', priority: 'importante', solution: 'Instalar válvula de admissão de ar (AAV) junto à sanita ou na coluna', isDIY: false, price: 0 },
      'pouco-tempo,nao': { id: 173, title: 'Fissura no Sifão Interno da Sanita', description: 'A curva interna da sanita tem uma rachadura que permite a água escapar lentamente.', cause: 'Fissura ou defeito de fabrico na cerâmica interna', difficulty: 'avancado', time: '2-3 horas', priority: 'importante', solution: 'Substituir a sanita. Fissuras internas na cerâmica não têm reparação viável.', isDIY: false, price: 0 }
    }
  },

  // LAVATORIOS
  'lavatorio-entupido': {
    problemId: 6,
    problemTitle: 'Lavatório Entupido',
    symptom: 'Água desce lentamente ou nada.',
    questions: [
      {
        id: 'q1',
        question: 'A água desce lentamente ou está totalmente parada (bloqueio total)?',
        options: [
          { id: 'lenta', label: 'Muito lentamente' },
          { id: 'parada', label: 'Parada por completo' }
        ]
      },
      {
        id: 'q2',
        question: 'Já tentou utilizar um desentupidor manual?',
        options: [
          { id: 'sim', label: 'Sim, mas não ajudou' },
          { id: 'nao', label: 'Ainda não' }
        ]
      }
    ],
    paths: {
      'lenta': 'q2',
      'parada': 'q2'
    },
    results: {
      'lenta,sim': { id: 50, title: 'Cabelo Preso no Sifão', description: 'Bloqueio de cabelos agarrado ao crivo.', cause: 'Lixo no sifão (P-trap) ou na válvula pop-up', difficulty: 'simples', time: '15-30 min', priority: 'importante', solution: 'Desmontar válvula e sifão para limpar manualmente', isDIY: true, price: 4.99 },
      'lenta,nao': { id: 51, title: 'Bloqueio Leve', description: 'Pequena acumulação de sujidade e sabão.', cause: 'Resíduos de pasta de dentes/sabão', difficulty: 'simples', time: '10 min', priority: 'quando-possivel', solution: 'Usar técnica do desentupidor ou produto biológico', isDIY: true, price: 4.99 },
      'parada,sim': { id: 52, title: 'Rolha Sólida no Sifão', description: 'O sifão fechou totalmente a passagem de água.', cause: 'Tampão sólido de cabelos e calcário no sifão', difficulty: 'medio', time: '30-45 min', priority: 'urgente', solution: 'Colocar balde por baixo, desapertar e retirar o sifão', isDIY: true, price: 4.99 },
      'parada,nao': { id: 53, title: 'Entupimento Profundo', description: 'Pode resolver-se com pressão.', cause: 'Bloqueio severo', difficulty: 'simples', time: '15 min', priority: 'importante', solution: 'Aplicar desentupidor com vigor tapando o tubo de respiro', isDIY: true, price: 4.99 }
    }
  },
  'lavatorio-mau-cheiro': {
    problemId: 7,
    problemTitle: 'Mau Cheiro no Lavatório',
    symptom: 'Odor desagradável do ralo do lavatório.',
    questions: [
      {
        id: 'q1',
        question: 'O cheiro assemelha-se a "ovos podres" (esgoto)?',
        options: [
          { id: 'sim', label: 'Sim, esgoto' },
          { id: 'nao', label: 'Não, parece algo orgânico/podre' }
        ]
      },
      {
        id: 'q2',
        question: 'O lavatório é usado?',
        options: [
          { id: 'sim', label: 'Diariamente' },
          { id: 'nao', label: 'Pouco frequente' }
        ]
      }
    ],
    paths: {
      'sim': 'q2',
      'nao': 'q2'
    },
    results: {
      'sim,nao': { id: 60, title: 'Sifão Evaporado', description: 'Gases de esgoto entram porque água do sifão sumiu.', cause: 'Falta de uso ressecou o P-trap', difficulty: 'simples', time: '1 min', priority: 'quando-possivel', solution: 'Abrir a torneira 30 segundos', isDIY: true, price: 0 },
      'nao,sim': { id: 61, title: 'Bolor ou Lixo no Tubo de Ladrão', description: 'Cheiro de bactérias no buraco anti-transbordo.', cause: 'Acumulação bacteriana negra no "overflow"', difficulty: 'simples', time: '15 min', priority: 'quando-possivel', solution: 'Lavar respiro com lixívia e escovar pormenores do ralo', isDIY: true, price: 4.99 },
      'sim,sim': { id: 62, title: 'Problema de Ventilação Local', description: 'O próprio uso deforma a água do sifão.', cause: 'Aspiragem do fecho hídrico (falta de ventação de coluna)', difficulty: 'avancado', time: 'Variável', priority: 'importante', solution: 'Chamar canalizador para rever ventilações da prumada', isDIY: false, price: 0 },
      'nao,nao': { id: 63, title: 'Lodo Orgânico', description: 'Bactérias estão literalmente a apodrecer nos canos de cima.', cause: 'Falta de água a lavar a loiça por dentro', difficulty: 'simples', time: '10 min', priority: 'quando-possivel', solution: 'Limpeza com bicarbonato, vinagre e água quente', isDIY: true, price: 4.99 }
    }
  },
  'lavatorio-torneira': {
    problemId: 8,
    problemTitle: 'Torneira do Lavatório a Pingar',
    symptom: 'Torneira não fecha, sempre a goejar.',
    questions: [
      {
        id: 'q1',
        question: 'Por onde sai a água?',
        options: [
          { id: 'bico', label: 'Pelo bico da torneira' },
          { id: 'base', label: 'Por debaixo dos manípulos ou base' }
        ]
      },
      {
        id: 'q2',
        question: 'A torneira é monocomando (1 manipulo) ou bicomando (2 manípulos quent/fria)?',
        options: [
          { id: 'mono', label: 'Monocomando' },
          { id: 'bi', label: 'Dois manípulos clássicos' }
        ]
      }
    ],
    paths: {
      'bico': 'q2',
      'base': 'q2'
    },
    results: {
      'bico,mono': { id: 70, title: 'Cartucho Cerâmico Danificado', description: 'Cartucho central que mistura a água já não veda.', cause: 'Desgaste ou detritos no cartucho', difficulty: 'medio', time: '30 min', priority: 'importante', solution: 'Desmontar manípulo e substituir o cartucho interior', isDIY: true, price: 4.99 },
      'bico,bi': { id: 71, title: 'Vedante de Borracha Gasto (Chupeta)', description: 'O vedante por baixo do manípulo trilhou-se.', cause: 'Borrachinha ressequida ao apertar com força', difficulty: 'simples', time: '30 min', priority: 'quando-possivel', solution: 'Substituir as "chupetas" de borracha velhas', isDIY: true, price: 4.99 },
      'base,mono': { id: 72, title: 'O-Rings do Cartucho', description: 'Os vedantes estruturais falharam.', cause: 'Junta tórica (o-ring) traçada', difficulty: 'medio', time: '30 min', priority: 'importante', solution: 'Trocar vedantes de corpo interior', isDIY: true, price: 4.99 },
      'base,bi': { id: 73, title: 'Porcas do Castelo Desapertadas', description: 'Onde o mecanismo enrosca à torneira está frouxo.', cause: 'Vibração contínua ao abrir/fechar', difficulty: 'simples', time: '15 min', priority: 'importante', solution: 'Limpar calcário e reapertar os castelos', isDIY: true, price: 4.99 }
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
      'sifao,sim': { id: 80, title: 'Porcas do Sifão Frouxas', description: 'As anilhas do PVC não estão a vedar as descargas.', cause: 'Porcas plásticas desapertadas', difficulty: 'simples', time: '5 min', priority: 'importante', solution: 'Apertar fisicamente as porcas com as mãos (sem muito aperto)', isDIY: true, price: 4.99 },
      'sifao,nao': { id: 81, title: 'Ruptura Invisível', description: 'O problema não deveria acontecer com torneiras fechadas.', cause: 'Mistério entre válvula presa e água que sobrou', difficulty: 'medio', time: '20 min', priority: 'importante', solution: 'Desmontar válvula para avaliar rachas no lavatório', isDIY: true, price: 4.99 },
      'bichas,sim': { id: 82, title: 'Vazamento Dinâmico', description: 'Os tubos têm fuga intermitente com os picos de pressão.', cause: 'Mangueiras flexíveis dobradas ou gretadas', difficulty: 'avancado', time: '45 min', priority: 'urgente', solution: 'Substituir as bichas flexíveis ou torneira (risco alto se ignorar)', isDIY: false, price: 4.99 },
      'bichas,nao': { id: 83, title: 'Ligaçäo à Parede Deficiente', description: 'As roscas de alta pressão estão a verter.', cause: 'Anilha interior das bichas cedeu/vedante da válvula escudete', difficulty: 'medio', time: '30 min', priority: 'urgente', solution: 'Desligar corte geral; Fazer vedação teflon em tubos de água novos', isDIY: true, price: 4.99 }
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
      'parado,sim': { id: 90, title: 'Ar Aprisionado / Duas Pias', description: 'Ao empurrar, o fluxo sai pelo ponto mais fácil (pia do lado).', cause: 'Entupimento abaixo da junção em T ou gordura severa.', difficulty: 'medio', time: '30 min', priority: 'importante', solution: 'Tapar firmemente um lado com pano, e usar o desentupidor no outro bocal com bastante pressão.', isDIY: true, price: 4.99 },
      'parado,nao': { id: 91, title: 'Sifão Repleto de Gordura', description: 'A gordura da louça criou algo tipo "cimento".', cause: 'Restos de azeites/comida nas partes estreitas do P-trap.', difficulty: 'medio', time: '30-45 min', priority: 'urgente', solution: 'Remover cuidadosamente o sifão com balde por debaixo e realizar limpeza agressiva manual', isDIY: true, price: 4.99 },
      'lento,sim': { id: 92, title: 'Cano Quase Obstruído', description: 'Gases e lodo começaram a abafar a zona.', cause: 'Acúmulo crónico de restos nos joelhos do cano.', difficulty: 'simples', time: '20 min', priority: 'quando-possivel', solution: 'Misturar vinagre/bicarbonato ou aplicar uma bacia de água a ferver para soltar gorduras menores.', isDIY: true, price: 4.99 },
      'lento,nao': { id: 93, title: 'Crivo Obstruído Mínimo', description: 'Pode ser sujidade presa até na propria válvula/filtro ranhurado do fundo.', cause: 'Cabelos, arroz presinho.', difficulty: 'simples', time: '5 min', priority: 'quando-possivel', solution: 'Efectuar desobstrução à superfície sem desmanchar nada e limpar filtro de palhaço.', isDIY: true, price: 0 }
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
      'com-triturador,sim': { id: 100, title: 'Triturador / Dreno da Máquina', description: 'Comida apodreceu dentro das condutas ligadas à máquina.', cause: 'Bactérias espessas no rotor do triturador ou mangueira de lixo da máquina sem declive.', difficulty: 'medio', time: '30 min', priority: 'quando-possivel', solution: 'Passar uns limões e gelo no triturador e verificar declive da mangueira.', isDIY: true, price: 4.99 },
      'com-triturador,nao': { id: 101, title: 'Bactérias no Fundo do Triturador', description: 'O próprio motor tem poças húmidas de comida presa sob as lamelas.', cause: 'Pouca circulação de àgua após usar triturador.', difficulty: 'simples', time: '10 min', priority: 'quando-possivel', solution: 'Moer cascas de cítricos com bastante água para refrescar sistema.', isDIY: true, price: 4.99 },
      'sem-triturador,sim': { id: 102, title: 'Mangueira da Máquina com Mau Cheiro', description: 'A ligação sifónica onde engata o bico de esgoto do esquipamento perde retorno.', cause: 'A válvula de fecho/retrocesso está suja num T por baixo do lava loiça.', difficulty: 'medio', time: '30 min', priority: 'importante', solution: 'Desmontar ligação onde engata o tubo cinza-claro escanelado, limpar e remontar com curva subida.', isDIY: true, price: 4.99 },
      'sem-triturador,nao': { id: 103, title: 'Obstrução Simples das Válvulas', description: 'É o clássico de sujidade escorregadia preta de café etc em acumulação progressiva.', cause: 'Podridão rotineira nos canos do P-Trap.', difficulty: 'simples', time: '20 min', priority: 'quando-possivel', solution: 'Efetuar a limpeza termoquímica ecológica (vinagre+bicarbonato fervente).', isDIY: true, price: 4.99 }
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
      'sim,sim': { id: 110, title: 'Prumada Entupida', description: 'O prédio não deixa despachar. Faz BackFlow.', cause: 'Má capacidade da linha local ou partilhada do tubo.', difficulty: 'avancado', time: 'N/A', priority: 'urgente', solution: 'Contactar Profissional p/ desentupimento robot/pressão de linha', isDIY: false, price: 0 },
      'sim,nao': { id: 111, title: 'Prumada Entupida', description: 'O mesmo cenário grave.', cause: 'Linha bloqueada fora do controlo individual.', difficulty: 'avancado', time: 'N/A', priority: 'urgente', solution: 'Técnico Especializado ou Condomínio.', isDIY: false, price: 0 },
      'nao,sim': { id: 112, title: 'Sifão em Colapso ou Canos Lentos', description: 'Como partilham a mesma ponte, se o sifão não vence esse volume bombeado, enche e transborda subindo até à bacia da pia da louça.', cause: 'Sujeira reduz diâmetro interno dos tubos em PVC.', difficulty: 'medio', time: '30 min', priority: 'urgente', solution: 'É necessário limpar agressivamente os joelhos de escoagem com bicha manual.', isDIY: true, price: 4.99 },
      'nao,nao': { id: 113, title: 'Entupimento Parcial da Ligação Oculta', description: 'Ao atirar a àgua pesada em segundos a parede bloqueia mas no resto do tempo flui pingas.', cause: 'Acúmulo de pó de lavagem / pedra de sabões e têxteis entupindo logo a entrada de parede.', difficulty: 'avancado', time: '1-2h', priority: 'importante', solution: 'Necessário sonda elíptica de desentupidor em tubo rígido de chumbo. Cuidado para não vazar a parede interior.', isDIY: false, price: 0 }
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
      'sim,sim': { id: 120, title: 'Rotura no cano interno', description: 'Torneira alta tem rutura nos finíssimos tubos.', cause: 'Degradação grave da base rotativa de metal inteira.', difficulty: 'avancado', time: '1h', priority: 'urgente', solution: 'Trocar toda a torneira extraível urgente. Há risco de apodrecimento no armário inferior.', isDIY: true, price: 4.99 },
      'sim,nao': { id: 121, title: 'Cartucho', description: 'Igual à WC. O modelo precisa de um coração novo.', cause: 'Cartucho misturador riscado ou partido por areias que vieram dos tubos.', difficulty: 'medio', time: '20 min', priority: 'importante', solution: 'Mudar a caixa/cilindro do cartucho (remover manipulo da frente escondido atrás capa colorida).', isDIY: true, price: 4.99 },
      'nao,sim': { id: 122, title: 'Escorrência', description: 'A base vaza da bacia e enche o chão. Não é cano interno.', cause: 'Silicone e mastique de proteção de embutir na pedra cedeu. Água fora vai pra dentro.', difficulty: 'medio', time: '2h', priority: 'importante', solution: 'Reforçar oring junta base e repor mastique.', isDIY: true, price: 4.99 },
      'nao,nao': { id: 123, title: 'Água Acumulada no Bico (Aerador)', description: 'Nao há fuga. Tem é água muito comprida retida dentro do ganso curvo após cada uso.', cause: 'O arejador crivo de malha segura poça, em modelos tipo chuveiro espesso ou curvaturas cegas.', difficulty: 'simples', time: '0 min', priority: 'quando-possivel', solution: 'Solução visual. Nada a reparar, é funcionamento tolerado pelo design, se preferir limpe arejadores que minimiza.', isDIY: true, price: 0 }
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
      'sim,apenas1': { id: 130, title: 'Bloqueio Imediato/Hair-catch', description: 'A solução óbvia está mesmo à vista.', cause: 'Massas compactas no ralo superior de metal e gesso dos champôs a colarem.', difficulty: 'simples', time: '5 min', priority: 'importante', solution: 'Retirar Grelha. Arrancar as pastas de tufos capilares à MÃO com luvas. Testar fluxo.', isDIY: true, price: 0 },
      'nao,apenas1': { id: 131, title: 'Caixa Sifónica ou Cano P-Trap Entupido', description: 'Foi para o buraco mais fundo da parede/pavimento interior.', cause: 'Amalgamas presas aos plásticos curvos inacessíveis com os dedos normais.', difficulty: 'medio', time: '30 min', priority: 'importante', solution: 'Usar cabides de ferro/arame entortados e enfiar até pescar; Bicarbonatos fortes em ranhuras cegas sem sifão acessível à mão nem ventoso macio sem molhar tudo.', isDIY: true, price: 4.99 },
      'sim,multiplo': { id: 132, title: 'Rede Central Entupida', description: 'Todos têm a conexão tapada na espinha do W.C.', cause: 'Gargalos cheios até à laje estrutural de esgotos mestres.', difficulty: 'avancado', time: '2h', priority: 'urgente', solution: 'Ligar empresa. Pode criar inundações em divisões contínuas muito rápido se tomar banhos ali', isDIY: false, price: 0 },
      'nao,multiplo': { id: 133, title: 'Esgotos Subterrâneos Gerais', description: 'O próprio coletor da casa fechou-se e todos desaguadouros estão num único barco.', cause: 'Colapso profundo.', difficulty: 'avancado', time: '2h', priority: 'urgente', solution: 'Serviço profissional imediato (máquina a hidrojateamento mola vibratória)', isDIY: false, price: 0 }
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
      'sim,sim': { id: 140, title: 'Re-evaporação clássica do copo sifónico liso.', description: 'Bases de duche finas não mantêm muita àgua do nivel do ralo e evaporam rapidamente pelo calor ambiente de ventosos de vidro.', cause: 'Desumidificação.', difficulty: 'simples', time: '2m', priority: 'quando-possivel', solution: 'Coloque meio copo de óleo alimentar no ralo ao ir de viagem - O óleo em cima do copo não evapora as restantes águas seladoras nos ralos sem uso!', isDIY: true, price: 4.99 },
      'sim,nao': { id: 141, title: 'Infiltração Biológica de Borrachas', description: 'Os restos ficaram pretos não nas paredes do pvc, mas onde assentam os o-rings das grelhas.', cause: 'Criadouro orgânico.', difficulty: 'simples', time: '15m', priority: 'quando-possivel', solution: 'Despertar partes, colocar numa banheira de lixívia forte com velha escova de dentes e purificar frestinhas miudinhas antes de montar tudo reluzente.', isDIY: true, price: 4.99 },
      'nao,sim': { id: 142, title: 'Míopes em Limpeza', description: 'Sujos diários e bactérias comuns não foram bem varridos ou chãode pastilha miudinha com fugas cinzentas no WC', cause: 'Limo de argamassa a cheirar com a humidade quente', difficulty: 'simples', time: '20m', priority: 'quando-possivel', solution: 'Produtos lixívia com escovas agressivas, ventilação de vapor doWC sem extratores ligados acumulará cheiro chulé para sempre sobre silicone velho', isDIY: true, price: 0 },
      'nao,nao': { id: 143, title: 'Falha do Ralo de Chão / Quebra Copo', description: 'O sifão "anti cheiros" tem rachas, a borracha rompeu e os gases em circuito fechado transpiram pro plastico oco da base de chuvieor', cause: 'Podridão estrutural de bases fracas de acrilico ocas / ralos instalados tortos sem cola', difficulty: 'medio', time: '1h', priority: 'importante', solution: 'Substituição completa da engrenagem do "valvula clickclack base duche alta taxa vazão"', isDIY: true, price: 4.99 }
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
      'vidro-podre,sim': { id: 150, title: 'Inundação Despistada (Dano superficial em fugas e torneiras p/fora e vidros)', description: 'Chove mais pra fora da placa de duche do que pra dentro pelas ressonancias', cause: 'Múltiplos pequenos rasgos nas protecoes, portas tortas e oring das misturadoras mortas', difficulty: 'medio', time: '30-40m', priority: 'urgente', solution: 'Renovar tudo as fugas com silicone sanitário de secagem de alta performance de humidade + reparar corpo misturadores.', isDIY: true, price: 4.99 },
      'vidro-podre,nao': { id: 151, title: 'Falta de Fitas', description: 'Causou estrago enorme noutras assoalhadas pelos silicones esburacados no ralo contra chão/parede.', cause: 'Bases sem rebordo perimetral cederam ao pisar (o peso abriu os juntas perfeitamente à noite por dentro)', difficulty: 'medio', time: '1-2h', priority: 'urgente', solution: 'Refazer a argolinha da calafetagem siliconada pesando 2 garrafoes de 5L no pé para garantir estiramento máximo até as folgas cederem enquanto passa os cordões siliconados poliméricos em fita fina!', isDIY: true, price: 4.99 },
      'novo,sim': { id: 152, title: 'Fugas no Cano Frio/Quente Enterrado', description: 'Por trás do lindo mármore recém posto tem tubagem multicamada a rasgar / joelho pingar entre tijolos', cause: 'Mau cravejamento (ou falta deste) na montagem dentro de paredes cegas novas sem porta.', difficulty: 'avancado', time: 'Dias', priority: 'urgente', solution: 'Ação rápida a quebrar paredes ou fazer bypass para secagem, apólice do seguro de acidentes da infraestruturas do condomino / canaliza profissional', isDIY: false, price: 0 },
      'novo,nao': { id: 153, title: 'Cachimbo de Esgoto Falso Mento de Ralo Rotura do PVC 40/50 Tubo Escombro', description: 'Água desce o chão e em vez de tubo escorre na laje do andarzinho num cimento esburacado a deitar gotas.', cause: 'Base mal acente esmagou / cortou tubo colado de PVC.', difficulty: 'avancado', time: 'Variável', priority: 'urgente', solution: 'Lembre-se: Chuveiro requer Obras e trolhas em rebentamento se esgoto é dano interno irrenovavel em tubos quebrados p/ reparos!', isDIY: false, price: 0 }
    }
  },

  // BANHEIRA
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
      'metal,sim': { id: 160, title: 'Mecanismo Entupido de Pêlos Pesados', description: 'Cruzeta do rolha prega lixo todo no manipolo e entorpece', cause: 'Engrenagens do automático prenderam roscos grossos.', difficulty: 'medio', time: '30m', priority: 'importante', solution: 'Desapertar a chapinha de cima com chavePhilips; Extrair vareta até tubo limpar e instalar fita/mini-mola p desenferrujar se e fechar de lá de dentro as teias sujas aramares antes de usar.', isDIY: true, price: 4.99 },
      'metal,nao': { id: 161, title: 'Cruz do Tampão Falsa / Vácuos', description: 'Tampão não levanta tanto quanto rodar o manipulador. Retém àguas com buraco mínimo.', cause: 'Bicha que levanta o ferro esticou / oxidada nao abre no prato debaixo o fecho hermético devidamente.', difficulty: 'medio', time: '1h', priority: 'importante', solution: 'Reajustar afinador da porca debaixo da cabeça rolha.', isDIY: true, price: 4.99 },
      'borracha,sim': { id: 162, title: 'Bola de Pêlos Reta do Esgoto', description: 'Fez um novelo grosso em canos directos não entalcados pela cruzeta', cause: 'Obstrução física por animais / resíduos fortes compactados e massajados nas curvas em V', difficulty: 'simples', time: '20m', priority: 'importante', solution: 'Pescar os cabelos com palito flexível plástico tipo cobra espinhosa (zipit de loja DIY)', isDIY: true, price: 4.99 },
      'borracha,nao': { id: 163, title: 'Obstrução Simples das Válvulas Gerais', description: 'Acomodação lenta química aos anos da placa banho de sabão na espiral cano.', cause: 'Falta limpeza profilática.', difficulty: 'simples', time: '20m', priority: 'quando-possivel', solution: '10 min deixar Bicarbonato/Vinagres atuar; Despeje baldes de panela ao ferver em cima; repita se persistente; O ralo respira solto no fim.', isDIY: true, price: 4.99 }
    }
  },
  'banheira-fuga': {
    problemId: 19,
    problemTitle: 'Fuga de Água ou Infiltração da Banheira',
    symptom: 'Manchas de humidade no teto do vizinho de baixo, pintura a descascar ou bolor perto da banheira.',
    questions: [
      {
        id: 'q1',
        question: 'A água aparece apenas quando usa a banheira ou é constante?',
        options: [
          { id: 'apenas-uso', label: 'Apenas quando uso a banheira' },
          { id: 'constante', label: 'É constante, mesmo sem usar' }
        ]
      },
      {
        id: 'q2',
        question: 'As juntas de silicone entre a banheira e a parede estão íntegras?',
        options: [
          { id: 'boas', label: 'Parecem boas, sem fissuras' },
          { id: 'fissuradas', label: 'Estão fissuradas, soltas ou com bolor negro' }
        ]
      }
    ],
    paths: {
      'apenas-uso': 'q2',
      'constante': 'q2'
    },
    results: {
      'apenas-uso,fissuradas': { id: 180, title: 'Silicone da Banheira Danificado', description: 'A água escapa pelas juntas deterioradas quando toma banho.', cause: 'Silicone velho, fissurado ou com bolor que perdeu a vedação', difficulty: 'medio', time: '1-2 horas', priority: 'urgente', solution: 'Remover o silicone antigo com x-ato e aplicador, limpar bem a superfície, e aplicar novo silicone sanitário anti-mofo deixando secar 24h.', isDIY: true, price: 4.99 },
      'apenas-uso,boas': { id: 181, title: 'Ralo de Fundo ou Sifão com Fuga', description: 'O ralo da banheira ou o sifão por baixo estão a verter durante o uso.', cause: 'Vedante do ralo danificado ou sifão mal apertado', difficulty: 'medio', time: '1-2 horas', priority: 'urgente', solution: 'Aceder ao sifão por baixo da banheira (painel lateral), verificar e apertar ligações ou substituir vedantes.', isDIY: true, price: 4.99 },
      'constante,fissuradas': { id: 182, title: 'Infiltração Múltipla', description: 'As juntas danificadas estão a permitir que a humidade penetre a parede constantemente.', cause: 'Falha total na vedação perimetral da banheira', difficulty: 'medio', time: '2-3 horas', priority: 'urgente', solution: 'Refazer toda a calafetagem: remover silicone velho, secar superfícies, aplicar primário e novo silicone sanitário em todo o perímetro.', isDIY: true, price: 4.99 },
      'constante,boas': { id: 183, title: 'Rotura em Tubo Enterrado', description: 'A água vem de um tubo de alimentação ou esgoto por trás/debaixo da banheira.', cause: 'Fissura ou rotura num cano embutido na parede ou laje', difficulty: 'avancado', time: 'Variável', priority: 'urgente', solution: 'Necessária intervenção profissional. Pode ser preciso abrir parede ou pavimento para localizar e reparar o tubo danificado.', isDIY: false, price: 0 }
    }
  },
  'banheira-mau-cheiro': {
    problemId: 20,
    problemTitle: 'Mau Cheiro vindo da Banheira',
    symptom: 'Odor a esgoto persistente na casa de banho, vindo do ralo da banheira.',
    questions: [
      {
        id: 'q1',
        question: 'Se tapar o ralo da banheira, o cheiro desaparece?',
        options: [
          { id: 'sim', label: 'Sim, desaparece ao tapar' },
          { id: 'nao', label: 'Não, continua igual' }
        ]
      },
      {
        id: 'q2',
        question: 'A banheira é usada regularmente ou fica parada semanas?',
        options: [
          { id: 'regular', label: 'Uso regular (semanal ou mais)' },
          { id: 'parada', label: 'Fica parada muito tempo' }
        ]
      }
    ],
    paths: {
      'sim': 'q2',
      'nao': 'q2'
    },
    results: {
      'sim,parada': { id: 190, title: 'Sifão Seco por Falta de Uso', description: 'A água do sifão evaporou, permitindo que gases de esgoto subam diretamente.', cause: 'Evaporação da água no sifão por desuso prolongado', difficulty: 'simples', time: '2 min', priority: 'quando-possivel', solution: 'Abrir a torneira e deixar correr água 30 segundos para reencher o sifão. Em períodos longos sem uso, deite um fio de óleo alimentar no ralo para evitar evaporação.', isDIY: true, price: 0 },
      'sim,regular': { id: 191, title: 'Sifão ou Ralo com Acumulação de Resíduos', description: 'Bactérias e resíduos de sabão acumulados no sifão e ralo estão a apodrecer e a gerar odor.', cause: 'Biofilme bacteriano e resíduos orgânicos no sifão', difficulty: 'simples', time: '15 min', priority: 'quando-possivel', solution: 'Limpar o ralo e sifão com bicarbonato de sódio, vinagre e água a ferver. Repetir quinzenalmente como prevenção.', isDIY: true, price: 4.99 },
      'nao,parada': { id: 192, title: 'Vedação Danificada nas Ligações', description: 'Os gases escapam não pelo ralo mas pelas juntas deterioradas entre o sifão e o tubo de esgoto.', cause: 'Borrachas/vedantes das ligações do sifão gastas ou soltas', difficulty: 'medio', time: '30-45 min', priority: 'importante', solution: 'Verificar e apertar todas as ligações do sifão. Substituir vedantes/borrachas se necessário.', isDIY: true, price: 4.99 },
      'nao,regular': { id: 193, title: 'Problema de Ventilação na Coluna de Esgoto', description: 'A coluna de esgoto do prédio não ventila corretamente, criando sucção que esvazia o sifão e liberta gases.', cause: 'Deficiência na ventilação da prumada de esgoto', difficulty: 'avancado', time: 'Variável', priority: 'importante', solution: 'Contactar canalizador para avaliar a ventilação da coluna de esgoto e considerar instalar válvula anti-vácuo.', isDIY: false, price: 0 }
    }
  },
  'banheira-barulho': {
    problemId: 21,
    problemTitle: 'Barulho Estranho ao Escoar',
    symptom: 'Sons de "gorgolejo" ou borbulhar quando a banheira esvazia.',
    questions: [
      {
        id: 'q1',
        question: 'Ouve o som também noutros locais (sanita, lavatório) quando a banheira esvazia?',
        options: [
          { id: 'sim', label: 'Sim, noutros ralos também borbulha' },
          { id: 'nao', label: 'Não, apenas na banheira' }
        ]
      },
      {
        id: 'q2',
        question: 'O escoamento da banheira está mais lento que o habitual?',
        options: [
          { id: 'sim', label: 'Sim, notavelmente mais lento' },
          { id: 'nao', label: 'Não, escoa à velocidade normal' }
        ]
      }
    ],
    paths: {
      'sim': 'q2',
      'nao': 'q2'
    },
    results: {
      'sim,sim': { id: 200, title: 'Entupimento Parcial na Coluna de Esgoto', description: 'Uma obstrução parcial na rede de esgoto partilhada causa vácuo e gorgolejos generalizados.', cause: 'Coluna de esgoto do prédio parcialmente bloqueada', difficulty: 'avancado', time: 'Variável', priority: 'urgente', solution: 'Contactar condomínio ou canalizador profissional para desentupimento da coluna com equipamento especializado.', isDIY: false, price: 0 },
      'sim,nao': { id: 201, title: 'Falta de Ventilação na Prumada', description: 'A coluna de esgoto não tem ventilação adequada, criando depressão de ar ao escoar grandes volumes.', cause: 'Ventilação insuficiente da rede de esgoto', difficulty: 'avancado', time: '1-2 horas', priority: 'importante', solution: 'Instalar válvula de admissão de ar (AAV) na coluna ou junto ao ponto mais alto da rede.', isDIY: false, price: 0 },
      'nao,sim': { id: 202, title: 'Sifão da Banheira Parcialmente Bloqueado', description: 'A obstrução parcial no sifão da banheira cria bolsas de ar que fazem o característico "glug-glug".', cause: 'Acumulação de cabelos e resíduos no sifão', difficulty: 'simples', time: '20 min', priority: 'importante', solution: 'Retirar o filtro do ralo e usar um arame flexível para pescar os resíduos. Despejar água a ferver em seguida.', isDIY: true, price: 4.99 },
      'nao,nao': { id: 203, title: 'Ar Aprisionado no Sifão', description: 'Pequena bolsa de ar presa no sifão da banheira que borbulha ao escoar.', cause: 'Curvatura do sifão a reter ar em determinadas condições de fluxo', difficulty: 'simples', time: '5 min', priority: 'quando-possivel', solution: 'Geralmente é comportamento normal. Se incomodar, deixe correr água lentamente para expulsar o ar antes de esvaziar a banheira.', isDIY: true, price: 0 }
    }
  }
}
