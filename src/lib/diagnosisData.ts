export interface QuizOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface DiagnosisResult {
  id: number;
  title: string;
  description: string;
  cause: string;
  difficulty: 'simples' | 'medio' | 'avancado';
  time: string;
  priority: 'urgente' | 'importante' | 'quando-possivel';
  solution: string;
  isDIY: boolean;
  price: number;
}

export interface DiagnosisTree {
  questions: Question[];
  paths: Record<string, string>;
  results: Record<string, DiagnosisResult>;
}

export const toiletLeakDiagnosis: DiagnosisTree = {
  questions: [
    {
      id: 'q1',
      question: 'Onde está a aparecer a água exatamente?',
      options: [
        { id: 'base', label: 'Na base da sanita (junto ao chão)' },
        { id: 'tank', label: 'Entre o autoclismo e a sanita' },
        { id: 'inside', label: 'Água a escorrer continuamente para dentro da sanita' }
      ]
    },
    {
      id: 'q2',
      question: 'A água na base aparece a toda a hora ou só quando puxas o autoclismo?',
      options: [
        { id: 'always', label: 'A toda a hora, mesmo sem usar' },
        { id: 'flush', label: 'Só acontece quando puxo a água' }
      ]
    }
  ],
  paths: {
    'base': 'q2',
    'tank': 'RESULT',
    'inside': 'RESULT',
    'base,always': 'RESULT',
    'base,flush': 'RESULT',
  },
  results: {
    'tank': {
      id: 101,
      title: 'Junta do Autoclismo Degradada',
      description: 'A borracha que veda a ligação entre o tanque do autoclismo e a bacia da sanita apodreceu ou está mal apertada.',
      cause: 'Desgaste natural da junta de vedação de borracha devido aos minerais da água.',
      difficulty: 'medio',
      time: '1 a 2 horas',
      priority: 'importante',
      solution: 'Desapertar o tanque da sanita, remover a junta velha, limpar a zona e instalar uma junta nova de acoplamento.',
      isDIY: true,
      price: 15
    },
    'inside': {
      id: 102,
      title: 'Mecanismo de Descarga (Válvula) com Fuga',
      description: 'A válvula de descarga no fundo do autoclismo não está a vedar bem, deixando a água passar para a bacia.',
      cause: 'Acumulação de calcário ou deformaço da borracha da válvula de descarga.',
      difficulty: 'simples',
      time: '30 min',
      priority: 'importante',
      solution: 'Limpar a base da válvula ou substituir o vedante (empanque) de silicone no fundo do mecanismo.',
      isDIY: true,
      price: 8
    },
    'base,always': {
      id: 103,
      title: 'Fissura na Porcelana ou Tubo de Alimentação',
      description: 'Existe uma fuga constante que não depende do uso da sanita, possivelmente no tubo de entrada ou uma racha na bacia.',
      cause: 'Pode ser o flexível de alimentação mal apertado ou uma micro-fissura na base da sanita.',
      difficulty: 'avancado',
      time: '2 a 3 horas',
      priority: 'urgente',
      solution: 'Verificar o aperto do tubo flexível. Se houver fissura na porcelana, a sanita terá de ser substituída.',
      isDIY: false,
      price: 120
    },
    'base,flush': {
      id: 104,
      title: 'Anel de Cera (Vedante da Base) Rompido',
      description: 'O vedante entre a saída da sanita e o esgoto do chão falhou. A água sai apenas quando há pressão de descarga.',
      cause: 'O anel de cera secou ou a sanita moveu-se ligeiramente, quebrando o selo hermético.',
      difficulty: 'avancado',
      time: '3 a 4 horas',
      priority: 'urgente',
      solution: 'Remover a sanita do chão, limpar a cera velha, colocar um anel novo e reinstalar a sanita com silicone novo.',
      isDIY: true,
      price: 25
    }
  }
};
