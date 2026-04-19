export interface DiagnosisQuestion {
  id: string
  question: string
  options: {
    id: string
    label: string
  }[]
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
}

export interface DiagnosisTree {
  problemId: number
  problemTitle: string
  symptom: string
  questions: DiagnosisQuestion[]
  paths: Record<string, string>
  results: Record<string, DiagnosisResult>
}

export const diagnosisTrees: Record<string, DiagnosisTree> = {
  // CASA DE BANHO
  'sanita-agua-correndo': {
    problemId: 1,
    problemTitle: 'Água a Correr na Sanita',
    symptom: 'Água correndo constantemente pela bacia da sanita.',
    questions: [
      {
        id: 'q1',
        question: 'Onde parece estar a fuga de água na sanita?',
        options: [
          { id: 'interior', label: 'Dentro da bacia (fio de água constante)' },
          { id: 'exterior', label: 'Fora da sanita (chão molhado)' }
        ]
      },
      {
        id: 'q2',
        question: 'Consegue parar a água se levantar a boia com a mão?',
        options: [
          { id: 'sim', label: 'Sim, a água para' },
          { id: 'nao', label: 'Não, continua a correr' }
        ]
      }
    ],
    paths: {
      'interior': 'q2',
      'exterior': 'result-vazamento-base'
    },
    results: {
      'sim': { id: 10, title: 'Boia Desajustada', description: 'A boia está a subir demais, fazendo a água sair pelo ladrão.', cause: 'Nível de água configurado muito alto.', difficulty: 'simples', time: '10 min', priority: 'importante', solution: 'Ajuste o parafuso da boia para que ela feche a água mais cedo.', isDIY: true, price: 5.00 },
      'nao': { id: 11, title: 'Válvula de Descarga Pasmada', description: 'O vedante de borracha no fundo do mecanismo está gasto ou sujo.', cause: 'Calcário ou desgaste natural da borracha.', difficulty: 'medio', time: '30 min', priority: 'urgente', solution: 'Substitua o vedante de borracha ou limpe o calcário da base.', isDIY: true, price: 5.00 },
      'result-vazamento-base': { id: 12, title: 'Fuga na Base ou Ligações', description: 'A água está a sair pelas juntas ou parafusos de fixação.', cause: 'Vedantes dos parafusos ou anel de cera danificados.', difficulty: 'medio', time: '1h', priority: 'urgente', solution: 'Verifique os parafusos do tanque ou substitua o fole de ligação ao esgoto.', isDIY: true, price: 5.00 }
    }
  },

  'nao-faz-descarga': {
    problemId: 2,
    problemTitle: 'Não faz descarga ou descarga fraca',
    symptom: 'Ao carregar no botão, a água não sai ou sai com pouca força.',
    questions: [
      {
        id: 'q1',
        question: 'O botão oferece resistência quando pressionado?',
        options: [
          { id: 'solto', label: 'Não, o botão parece solto/partido' },
          { id: 'normal', label: 'Sim, mas a água sai devagar' }
        ]
      }
    ],
    paths: {
      'solto': 'result-mecanismo-partido',
      'normal': 'result-descarga-entupida'
    },
    results: {
      'result-mecanismo-partido': { id: 20, title: 'Botão ou Tirante Partido', description: 'A ligação física entre o botão e a válvula de descarga está interrompida.', cause: 'Desgaste do material plástico interno.', difficulty: 'simples', time: '15 min', priority: 'importante', solution: 'Substitua o conjunto do botão ou a haste de ligação.', isDIY: true, price: 5.00 },
      'result-descarga-entupida': { id: 21, title: 'Acumulação de Sedimentos', description: 'Os furos de saída de água na bacia estão obstruídos.', cause: 'Calcário ou lodo acumulado nos bordos da sanita.', difficulty: 'medio', time: '45 min', priority: 'quando-possivel', solution: 'Limpe os orifícios de descarga com um arame fino e use um descalcificante forte no tanque.', isDIY: true, price: 5.00 }
    }
  },

  'sanita-entupida': {
    problemId: 3,
    problemTitle: 'Sanita Entupida',
    symptom: 'A água sobe quase até ao bordo ou desce muito lentamente após a descarga.',
    questions: [
      {
        id: 'q1',
        question: 'Caiu algum objeto sólido acidentalmente (rolo, brinquedo, toalhete)?',
        options: [
          { id: 'sim', label: 'Sim, ou é provável' },
          { id: 'nao', label: 'Não, parece ser uso normal' }
        ]
      }
    ],
    paths: {
      'sim': 'result-obstrucao-solida',
      'nao': 'result-entupimento-comum'
    },
    results: {
      'result-obstrucao-solida': { id: 30, title: 'Obstrução Física Rígida', description: 'Um objeto está preso na curva do sifão da sanita.', cause: 'Descarte indevido de objetos não solúveis.', difficulty: 'medio', time: '1h', priority: 'urgente', solution: 'Tente usar um desentupidor de ventosa ou uma mola de desentupimento manual. Não use químicos.', isDIY: true, price: 5.00 },
      'result-entupimento-comum': { id: 31, title: 'Acumulação de Papel ou Resíduos', description: 'Excesso de papel ou resíduos orgânicos bloquearam a passagem.', cause: 'Falta de fluxo de água suficiente ou excesso de papel.', difficulty: 'simples', time: '20 min', priority: 'urgente', solution: 'Use o método da água quente com detergente da loiça ou um desentupidor de pressão.', isDIY: true, price: 5.00 }
    }
  },

  'sanita-mau-cheiro': {
    problemId: 4,
    problemTitle: 'Mau Cheiro na Sanita',
    symptom: 'Odor desagradável vindo da zona da sanita, mesmo limpa.',
    questions: [
      {
        id: 'q1',
        question: 'A sanita esteve muito tempo sem ser usada (ex: férias)?',
        options: [
          { id: 'sim', label: 'Sim, vários dias/semanas' },
          { id: 'nao', label: 'Não, é usada diariamente' }
        ]
      }
    ],
    paths: {
      'sim': 'result-sifao-seco',
      'nao': 'result-vedante-base'
    },
    results: {
      'result-sifao-seco': { id: 40, title: 'Sifão Evaporado', description: 'A barreira de água que impede os gases de subir evaporou.', cause: 'Desuso prolongado.', difficulty: 'simples', time: '1 min', priority: 'quando-possivel', solution: 'Basta fazer uma descarga completa para repor o selo de água.', isDIY: true, price: 5.00 },
      'result-vedante-base': { id: 41, title: 'Fuga de Gases no Fole/Anel', description: 'A ligação entre a sanita e o tubo de esgoto não está hermética.', cause: 'Vedante de borracha ressequido ou solto.', difficulty: 'medio', time: '1h', priority: 'importante', solution: 'Aplique silicone na base da sanita ou substitua o fole de ligação traseiro.', isDIY: true, price: 5.00 }
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
      'pasmada': { id: 50, title: 'Sifão Sujo com Cabelos/Sabão', description: 'Acumulação de detritos no copo do sifão.', cause: 'Uso diário de pastas e gorduras.', difficulty: 'simples', time: '15 min', priority: 'importante', solution: 'Desenrosque o copo do sifão debaixo do lavatório e limpe os resíduos.', isDIY: true, price: 5.00 },
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
    problemId: 9,
    problemTitle: 'Lava-louça Entupido',
    symptom: 'Água demora muito a descer ou fica parada na banca.',
    questions: [
      {
        id: 'q1',
        question: 'O problema é só numa tina ou em ambas (se tiver duas)?',
        options: [
          { id: 'uma', label: 'Só numa tina' },
          { id: 'ambas', label: 'Em ambas ao mesmo tempo' }
        ]
      }
    ],
    paths: {
      'uma': 'result-sifao-tina',
      'ambas': 'result-central-entupido'
    },
    results: {
      'result-sifao-tina': { id: 80, title: 'Obstrução de Gordura na Tina', description: 'Acumulação de restos de comida e gordura no sifão da tina específica.', cause: 'Descarte de gorduras animais ou restos de comida.', difficulty: 'simples', time: '20 min', priority: 'importante', solution: 'Limpe o copo do sifão e use um produto desengordurante potente.', isDIY: true, price: 5.00 },
      'result-central-entupido': { id: 81, title: 'Bloqueio no Colector da Cozinha', description: 'O entupimento está no tubo principal que une as tinas.', cause: 'Excesso de gordura solidificada na tubagem horizontal.', difficulty: 'medio', time: '1h', priority: 'urgente', solution: 'Use uma mola de desentupimento ou uma bomba de vácuo profissional.', isDIY: true, price: 5.00 }
    }
  },

  'cozinha-mau-cheiro': {
    problemId: 10,
    problemTitle: 'Mau Cheiro no Lava-louça',
    symptom: 'Odor a podre ou esgoto vindo da banca da cozinha.',
    questions: [
      {
        id: 'q1',
        question: 'Tem máquina de lavar louça ligada ao mesmo sifão?',
        options: [
          { id: 'sim', label: 'Sim, partilham o mesmo cano' },
          { id: 'nao', label: 'Não, são independentes' }
        ]
      }
    ],
    paths: {
      'sim': 'result-maquina-residuos',
      'nao': 'result-gordura-sifao'
    },
    results: {
      'result-maquina-residuos': { id: 90, title: 'Resíduos de Máquina Acumulados', description: 'A água suja da máquina fica parada no tubo de ligação.', cause: 'Falta de válvula anti-retorno ou inclinação errada.', difficulty: 'simples', time: '30 min', priority: 'quando-possivel', solution: 'Lave a máquina com um produto próprio e limpe a ligação ao cano da banca.', isDIY: true, price: 5.00 },
      'result-gordura-sifao': { id: 91, title: 'Gordura Rancidificada', description: 'A gordura nas paredes do sifão está a entrar em decomposição.', cause: 'Temperaturas baixas solidificam a gordura.', difficulty: 'simples', time: '15 min', priority: 'importante', solution: 'Deite 2 litros de água a ferver com detergente da louça concentrado.', isDIY: true, price: 5.00 }
    }
  },

  'cozinha-agua-sobe': {
    problemId: 11,
    problemTitle: 'Água Sobe pela Banca',
    symptom: 'Quando a máquina trabalha, a água aparece na banca da cozinha.',
    questions: [
      {
        id: 'q1',
        question: 'Acontece rapidamente ou demora a começar a subir?',
        options: [
          { id: 'rapido', label: 'Logo que a máquina despeja' },
          { id: 'lento', label: 'Só depois de algum tempo de lavagem' }
        ]
      }
    ],
    paths: {
      'rapido': 'result-bloqueio-total',
      'lento': 'result-bloqueio-parcial'
    },
    results: {
      'result-bloqueio-total': { id: 100, title: 'Entupimento Total no Ramal', description: 'O cano da parede está completamente obstruído.', cause: 'Acumulação de gordura e restos de comida endurecidos.', difficulty: 'medio', time: '1h 30min', priority: 'urgente', solution: 'É necessário usar uma mola de desentupimento mecânica no cano da parede.', isDIY: true, price: 5.00 },
      'result-bloqueio-parcial': { id: 101, title: 'Secção de Vazão Reduzida', description: 'O cano deixa passar água, mas não na velocidade do despejo da máquina.', cause: 'Estrangulamento do diâmetro interno do cano por calcário ou gordura.', difficulty: 'medio', time: '1h', priority: 'importante', solution: 'Use produtos químicos para desentupimento específicos para cozinha ou limpeza a alta pressão.', isDIY: true, price: 5.00 }
    }
  },

  'cozinha-torneira': {
    problemId: 12,
    problemTitle: 'Torneira a Pingar (Cozinha)',
    symptom: 'Fuga de água nos comandos ou no bico da torneira.',
    questions: [
      {
        id: 'q1',
        question: 'A fuga é por cima (no bico) ou por baixo (nos comandos)?',
        options: [
          { id: 'bico', label: 'Pelo bico da torneira' },
          { id: 'comandos', label: 'Pela base/manípulos' }
        ]
      }
    ],
    paths: {
      'bico': 'result-fuga-bico',
      'comandos': 'result-fuga-base'
    },
    results: {
      'result-fuga-bico': { id: 110, title: 'Vedantes Internos Gastos', description: 'O mecanismo de fecho já não veda totalmente.', cause: 'Fadiga do material.', difficulty: 'medio', time: '45 min', priority: 'quando-possivel', solution: 'Abra a torneira e substitua o vedante de borracha ou o mecanismo cerâmico.', isDIY: true, price: 5.00 },
      'result-fuga-base': { id: 111, title: 'O-Rings do Pescoço Danificados', description: 'A vedação rotativa do cano da torneira está estragada.', cause: 'Movimentação lateral constante ao longo dos anos.', difficulty: 'medio', time: '30 min', priority: 'importante', solution: 'Substitua os anéis de borracha (O-Rings) na base do pescoço giratório.', isDIY: true, price: 5.00 }
    }
  },

  // CHUVEIRO & BANHEIRA
  'chuveiro-entupido': {
    problemId: 13,
    problemTitle: 'Água Acumula no Chuveiro',
    symptom: 'A água sobe durante o banho e demora a desaparecer.',
    questions: [
      {
        id: 'q1',
        question: 'Consegue ver cabelos acumulados no ralo?',
        options: [
          { id: 'sim', label: 'Sim, há sujidade visível' },
          { id: 'nao', label: 'Não, o ralo parece limpo superficialmente' }
        ]
      }
    ],
    paths: {
      'sim': 'result-cabelos-ralo',
      'nao': 'result-entupimento-profundo'
    },
    results: {
      'result-cabelos-ralo': { id: 120, title: 'Acumulação de Cabelos e Sabão', description: 'Teia de cabelos bloqueia a passagem inicial da água.', cause: 'Processo natural de queda de cabelos no banho.', difficulty: 'simples', time: '10 min', priority: 'importante', solution: 'Remova a grelha e puxe os cabelos com um palito ou pinça.', isDIY: true, price: 5.00 },
      'result-entupimento-profundo': { id: 121, title: 'Obstrução na Caixa Sifónica', description: 'O problema está na caixa de águas no centro da casa de banho.', cause: 'Acumulação global de resíduos na descarga geral.', difficulty: 'medio', time: '40 min', priority: 'urgente', solution: 'Abra a tampa redonda da caixa sifónica no chão e limpe o interior.', isDIY: true, price: 5.00 }
    }
  },

  'chuveiro-mau-cheiro': {
    problemId: 14,
    problemTitle: 'Mau Cheiro no Chuveiro',
    symptom: 'Odor a esgoto vindo do ralo do chuveiro.',
    questions: [
      {
        id: 'q1',
        question: 'O cheiro piora quando não usa o chuveiro há dias?',
        options: [
          { id: 'sim', label: 'Sim, se estiver parado cheira mais' },
          { id: 'nao', label: 'Pelo contrário, cheira sempre mal' }
        ]
      }
    ],
    paths: {
      'sim': 'result-caixa-seca',
      'nao': 'result-sujidade-caixa'
    },
    results: {
      'result-caixa-seca': { id: 130, title: 'Falta de Água na Caixa Sifónica', description: 'A barreira de água que bloqueia o cheiro desapareceu.', cause: 'Evaporação por desuso prolongado.', difficulty: 'simples', time: '1 min', priority: 'quando-possivel', solution: 'Verta 1 litro de água no ralo ou na caixa sifónica.', isDIY: true, price: 5.00 },
      'result-sujidade-caixa': { id: 131, title: 'Resíduos Fermentados na Caixa', description: 'Lodo e cabelos na caixa sifónica estão a decompor-se.', cause: 'Falta de limpeza de manutenção da caixa sifónica.', difficulty: 'simples', time: '20 min', priority: 'importante', solution: 'Abra a caixa sifónica, limpe a sujidade e lave com detergente e lixívia.', isDIY: true, price: 5.00 }
    }
  },

  'vazamento-chuveiro': {
    problemId: 15,
    problemTitle: 'Vazamento no Chuveiro',
    symptom: 'Água a infiltrar na parede ou a pingar pelo chuveiro.',
    questions: [
      {
        id: 'q1',
        question: 'A fuga é visível na mangueira ou na parede?',
        options: [
          { id: 'mangueira', label: 'É na bicha/mangueira do chuveiro' },
          { id: 'parede', label: 'Parece vir de dentro da parede' }
        ]
      }
    ],
    paths: {
      'mangueira': 'result-substituir-mangueira',
      'parede': 'result-rotura-parede'
    },
    results: {
      'result-substituir-mangueira': { id: 140, title: 'Mangueira de Chuveiro Furada', description: 'O tubo interno de borracha estalou devido ao uso.', cause: 'Torção excessiva ou pressão alta de água.', difficulty: 'simples', time: '5 min', priority: 'quando-possivel', solution: 'Desenrosque a mangueira antiga e instale uma nova com vedantes novos.', isDIY: true, price: 5.00 },
      'result-rotura-parede': { id: 141, title: 'Problema Oculto na Tubagem', description: 'Pode haver uma rotura na ligação da misturadora ou cano interno.', cause: 'Corrosão ou má instalação inicial.', difficulty: 'avancado', time: 'Varia', priority: 'urgente', solution: 'Verifique os excêntricos da torneira; se a fuga continuar chame um canalizador.', isDIY: false, price: 5.00 }
    }
  },

  'banheira-entupida': {
    problemId: 16,
    problemTitle: 'Banheira Escoa Devagar',
    symptom: 'A água acumula rapidamente ao fundo da banheira.',
    questions: [
      {
        id: 'q1',
        question: 'Já tentou o método de sucção (ventosa)?',
        options: [
          { id: 'sim', label: 'Sim, mas não resultou' },
          { id: 'nao', label: 'Não, ainda não tentei' }
        ]
      }
    ],
    paths: {
      'sim': 'result-limpar-caixa',
      'nao': 'result-tentar-ventosa'
    },
    results: {
      'result-limpar-caixa': { id: 150, title: 'Obstrução na Saída Geral (Caixa)', description: 'A banheira partilha a caixa sifónica que deve estar suja.', cause: 'Acumulação global de resíduos na descarga geral.', difficulty: 'medio', time: '40 min', priority: 'urgente', solution: 'Abra a tampa redonda da caixa sifónica no chão e limpe o interior.', isDIY: true, price: 5.00 },
      'result-tentar-ventosa': { id: 151, title: 'Desentupimento Ligeiro de Ventosa', description: 'Provavelmente um pequeno tampão de papel ou pelos.', cause: 'Detritos suaves na curva do ralo.', difficulty: 'simples', time: '10 min', priority: 'importante', solution: 'Use o desentupidor de borracha com a banheira a meio para criar pressão.', isDIY: true, price: 5.00 }
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
          { id: 'sim-aberta', label: 'Sim, está aberta' },
          { id: 'nao-fechada', label: 'Não, estava semi-fechada' }
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
      'todas,nao-fechada': { id: 170, title: 'Válvula de Entrada Parcialmente Fechada', description: 'A torneira do contador ou de segurança da casa não estava totalmente aberta.', cause: 'Registo fechado acidentalmente ou por obras anteriores.', difficulty: 'simples', time: '2 min', priority: 'importante', solution: 'Abrir a válvula principal de segurança na totalidade.', isDIY: true, price: 5.00 },
      'todas,sim-aberta': { id: 171, title: 'Problema na Rede Geral ou Fuga Oculta Principal', description: 'Se a válvula está aberta, pode ser um problema do município, bloqueio geral de calcário ou rutura principal.', cause: 'Abastecimento público fraco ou corrosão nas prumadas de ferro antigas.', difficulty: 'avancado', time: 'Variável', priority: 'urgente', solution: 'Contactar companhia de águas ou profissional para inspecionar a prumada.', isDIY: false, price: 5.00 },
      'apenas-uma,ambas': { id: 172, title: 'Arejador/Filtro Entupido com Calcário', description: 'O bico da torneira/filtro do chuveiro está cheio de lixo e minerais.', cause: 'Depósitos minerais (calcário) e sedimentos bloqueiam a saída.', difficulty: 'simples', time: '10 min', priority: 'quando-possivel', solution: 'Desapertar a ponta da torneira e mergulhar em vinagre para dissolver o calcário.', isDIY: true, price: 5.00 },
      'apenas-uma,apenas-quente': { id: 173, title: 'Bloqueio no Esquentador/Termoacumulador', description: 'A fuga de fluxo acontece depois da água passar pelo aquecimento.', cause: 'Sedimentos ou calcário a bloquear os tubos de saída do aparelho de aquecimento.', difficulty: 'medio', time: '1h', priority: 'importante', solution: 'Necessário limpar/purgar o esquentador ou descalcificar. Chamar técnico se a gás.', isDIY: false, price: 5.00 }
    }
  },

  'fuga-oculta': {
    problemId: 19,
    problemTitle: 'Fuga de Água Oculta',
    symptom: 'Conta de água muito alta ou manchas suspeitas em paredes.',
    questions: [
      {
        id: 'q1',
        question: 'Se fechar todas as torneiras e máquinas, o contador continua a rodar?',
        options: [
          { id: 'roda-sim', label: 'Sim, o contador continua a contar' },
          { id: 'roda-nao', label: 'Não, o contador para totalmente' }
        ]
      },
      {
        id: 'q2',
        question: 'Tem autoclismos (sanitas) a perder água livremente?',
        options: [
          { id: 'perde-sim', label: 'Sim, perco água em um ou mais' },
          { id: 'perde-nao', label: 'Não perco nada pelos autoclismos' }
        ]
      }
    ],
    paths: {
      'roda-sim': 'q2',
      'roda-nao': 'result-uso-excessivo'
    },
    results: {
      'roda-sim,perde-sim': { id: 180, title: 'Perda Invisível nos Autoclismos', description: 'O autoclismo deita água fora 24h por dia sem fazer barulho excessivo.', cause: 'Válvula de descarga não veda ou boia alta demais.', difficulty: 'simples', time: '15 min', priority: 'importante', solution: 'Aperte a boia ou limpe o vedante da descarga. Pode poupar dezenas de euros.', isDIY: true, price: 5.00 },
      'roda-sim,perde-nao': { id: 181, title: 'Fuga em Tubagem da Parede ou Solo', description: 'Se o contador roda e não há perdas visíveis, o cano deve estar furado sob o solo ou paredes.', cause: 'Rutura silenciosa por fadiga de material.', difficulty: 'avancado', time: 'Varia', priority: 'urgente', solution: 'Chame um canalizador com detector de fugas geofone ou faça testes por secções fechando as válvulas de corte.', isDIY: false, price: 5.00 },
      'result-uso-excessivo': { id: 182, title: 'Aumento de Consumo Pessoal', description: 'Se o contador para, não há fuga oculta.', cause: 'Banhos mais longos, regas ou máquinas a trabalhar mais.', difficulty: 'simples', time: '1 min', priority: 'quando-possivel', solution: 'Monitorize os seus hábitos de consumo ou verifique a precisão do contador (raro).', isDIY: true, price: 5.00 }
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
      }
    ],
    paths: {
      'batida': 'result-golpe-ariete',
      'assobio': 'result-pressao-alta'
    },
    results: {
      'result-golpe-ariete': { id: 190, title: 'Golpe de Aríete', description: 'Ondas de pressão embatem nos canos quando o fluxo para de repente.', cause: 'Mudança brusca de velocidade da água em válvulas rápidas.', difficulty: 'medio', time: '1h', priority: 'importante', solution: 'Instale amortecedores de golpe de aríete ou reduza a velocidade de fecho manual.', isDIY: true, price: 5.00 },
      'result-pressao-alta': { id: 191, title: 'Pressão Excessiva da Rede', description: 'A pressão na sua rede interna é superior a 4-5 bar.', cause: 'Redutora de pressão da casa avariada ou inexistente.', difficulty: 'medio', time: '1h', priority: 'importante', solution: 'Instale ou substitua a válvula redutora de pressão à entrada da casa.', isDIY: true, price: 5.00 }
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
        question: 'Tem gás e ligou a garrafa/gás de canal?',
        options: [
          { id: 'tem-gas', label: 'Sim, tenho gás' },
          { id: 'nao-tem', label: 'Agora que diz, talvez esteja sem gás' }
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
      'tem-gas': { id: 210, title: 'Pilhas/Bateria Fraca', description: 'O sistema de ignição não tem energia para soltar a faísca.', cause: 'Desgaste natural das pilhas do aparelho.', difficulty: 'simples', time: '5 min', priority: 'urgente', solution: 'Substitua as pilhas do esquentador por novas alcalinas de qualidade (tipo D).', isDIY: true, price: 5.00 },
      'nao-tem': { id: 211, title: 'Falta de Combustível', description: 'O aparelho não tem energia térmica disponível.', cause: 'Garrafa vazia ou válvula de corte de gás fechada.', difficulty: 'simples', time: '5 min', priority: 'urgente', solution: 'Troque a garrafa ou abra a válvula de gás. Verifique o redutor se for garrafa.', isDIY: true, price: 5.00 },
      'sim-barulhos': { id: 212, title: 'Radiador Obstruído (Calcário)', description: 'A serpente está tão cheia de calcário que a água não troca calor.', cause: 'Água muito dura e sedimentada.', difficulty: 'medio', time: '2h', priority: 'importante', solution: 'Chame um técnico credenciado para fazer a limpeza química da serpentina.', isDIY: false, price: 5.00 }
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
