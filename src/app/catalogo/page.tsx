'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Droplets,
  Wrench,
  ArrowRight,
  AlertTriangle,
  Clock,
  Gauge,
  Layers,
  ArrowUpRight,
  ShoppingCart,
  Crown,
  Lock,
  Check,
  X,
  Activity,
  User
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo } from 'react'

// Types
interface Problem {
  id: number
  slug: string
  title: string
  description: string
  symptom: string
  category: string
  categoryId: string
  difficulty: 'simples' | 'medio' | 'avancado'
  priority: 'urgente' | 'importante' | 'quando-possivel'
  time: string
  cause: string
  views: string
  price: number
}

interface Category {
  id: string
  name: string
  count: number
}

// Categories
const categories: Category[] = [
  { id: 'all', name: 'Todos', count: 17 },
  { id: 'sanita', name: 'Sanita', count: 5 },
  { id: 'lavatorio', name: 'Lavatório', count: 4 },
  { id: 'cozinha', name: 'Cozinha', count: 4 },
  { id: 'chuveiro', name: 'Chuveiro', count: 3 },
  { id: 'banheira', name: 'Banheira', count: 1 },
]

// All Problems
const allProblems: Problem[] = [
  { id: 1, slug: 'sanita-agua-correndo', title: 'Água sempre a correr na sanita', description: 'A sanita está a deixar passar água continuamente.', symptom: 'Água correndo constantemente', category: 'Sanita', categoryId: 'sanita', difficulty: 'simples', priority: 'importante', time: '30-60 min', cause: 'Boia de enchimento desajustada ou válvula de descarga defeituosa', views: '2.5k', price: 4.99 },
  { id: 2, slug: 'sanita-entupida', title: 'Sanita entupida', description: 'A sanita não descarrega corretamente.', symptom: 'Não descarrega corretamente', category: 'Sanita', categoryId: 'sanita', difficulty: 'medio', priority: 'importante', time: '30-60 min', cause: 'Obstrução no sifão ou na tubagem de saída', views: '2.1k', price: 4.99 },
  { id: 3, slug: 'mau-cheiro-lava-louca', title: 'Mau cheiro no lava-louça', description: 'Odor desagradável na cozinha.', symptom: 'Odor desagradável', category: 'Cozinha', categoryId: 'cozinha', difficulty: 'simples', priority: 'quando-possivel', time: '30 min', cause: 'Resíduos acumulados no sifão ou tubagem', views: '1.8k', price: 4.99 },
  { id: 4, slug: 'agua-acumula-chuveiro', title: 'Água acumula no chuveiro', description: 'A água não desce pelo ralo.', symptom: 'Não escoa bem', category: 'Chuveiro', categoryId: 'chuveiro', difficulty: 'simples', priority: 'importante', time: '30 min', cause: 'Entupimento no ralo ou tubagem', views: '1.5k', price: 4.99 },
  { id: 5, slug: 'torneira-pingar', title: 'Torneira a pingar', description: 'A torneira não fecha completamente.', symptom: 'Torneira não fecha', category: 'Lavatório', categoryId: 'lavatorio', difficulty: 'medio', priority: 'importante', time: '30-60 min', cause: 'Vedante ou cartucho da torneira desgastado', views: '1.3k', price: 4.99 },
  { id: 6, slug: 'lavatorio-entupido', title: 'Água não escoa no lavatório', description: 'A água acumula no lavatório.', symptom: 'Água não escoa', category: 'Lavatório', categoryId: 'lavatorio', difficulty: 'simples', priority: 'importante', time: '30 min', cause: 'Entupimento no sifão ou tubagem', views: '1.1k', price: 4.99 },
  { id: 7, slug: 'lava-louca-entupido', title: 'Lava-louça entupido', description: 'A água não desce no lava-louça.', symptom: 'Água não desce', category: 'Cozinha', categoryId: 'cozinha', difficulty: 'medio', priority: 'importante', time: '1 hora', cause: 'Acumulação de gordura ou resíduos no sifão', views: '980', price: 4.99 },
  { id: 8, slug: 'maquina-agua-sobe', title: 'Máquina de lavar faz água subir', description: 'Água sobe para o lava-louça.', symptom: 'Água sobe do ralo', category: 'Cozinha', categoryId: 'cozinha', difficulty: 'medio', priority: 'urgente', time: '1-2 horas', cause: 'Entupimento parcial na tubagem partilhada', views: '850', price: 4.99 },
  { id: 9, slug: 'vazamento-base-sanita', title: 'Água a sair pela base da sanita', description: 'Vazamento visível na base.', symptom: 'Água no chão', category: 'Sanita', categoryId: 'sanita', difficulty: 'medio', priority: 'urgente', time: '1-2 horas', cause: 'Vedante da base danificado ou fissura na sanita', views: '720', price: 4.99 },
  { id: 10, slug: 'mau-cheiro-ralo-chuveiro', title: 'Mau cheiro no ralo do chuveiro', description: 'Odor desagradável no ralo.', symptom: 'Odor desagradável', category: 'Chuveiro', categoryId: 'chuveiro', difficulty: 'simples', priority: 'quando-possivel', time: '15 min', cause: 'Cabelos e resíduos acumulados no ralo', views: '650', price: 4.99 },
  { id: 11, slug: 'vazamento-chuveiro', title: 'Vazamento no chuveiro', description: 'Água a vazar através do teto ou parede.', symptom: 'Água na parede/teto', category: 'Chuveiro', categoryId: 'chuveiro', difficulty: 'medio', priority: 'urgente', time: '1-2 horas', cause: 'Vedação defeituosa ou tubagem danificada', views: '580', price: 4.99 },
  { id: 12, slug: 'sanita-barulho', title: 'Sanita a fazer barulho', description: 'Barulhos estranhos após a descarga.', symptom: 'Barulhos estranhos', category: 'Sanita', categoryId: 'sanita', difficulty: 'medio', priority: 'quando-possivel', time: '1-2 horas', cause: 'Válvula de enchimento com problema ou tubagem com vibração', views: '450', price: 4.99 },
  { id: 13, slug: 'vazamento-lavatorio', title: 'Vazamento debaixo do lavatório', description: 'Água a aparecer debaixo.', symptom: 'Água no chão', category: 'Lavatório', categoryId: 'lavatorio', difficulty: 'medio', priority: 'importante', time: '1 hora', cause: 'Ligação solta, sifão rachado ou vedante danificado', views: '420', price: 4.99 },
  { id: 14, slug: 'mau-cheiro-sanita', title: 'Mau cheiro na sanita', description: 'Odor desagradável.', symptom: 'Odor desagradável', category: 'Sanita', categoryId: 'sanita', difficulty: 'simples', priority: 'quando-possivel', time: '15-30 min', cause: 'Sifão seco ou vedação defeituosa', views: '380', price: 4.99 },
  { id: 15, slug: 'banheira-entupida', title: 'Banheira escoa muito devagar', description: 'A água demora a descer.', symptom: 'Escoa muito devagar', category: 'Banheira', categoryId: 'banheira', difficulty: 'medio', priority: 'importante', time: '1 hora', cause: 'Entupimento no ralo ou sifão', views: '280', price: 4.99 },
  { id: 16, slug: 'torneira-cozinha-pingar', title: 'Torneira da cozinha a pingar', description: 'A torneira não fecha bem.', symptom: 'Torneira não fecha', category: 'Cozinha', categoryId: 'cozinha', difficulty: 'medio', priority: 'importante', time: '30-60 min', cause: 'Vedante ou cartucho desgastado', views: '140', price: 4.99 },
  { id: 17, slug: 'mau-cheiro-lavatorio', title: 'Mau cheiro no lavatório', description: 'Odor desagradável vindo do lavatório.', symptom: 'Odor desagradável', category: 'Lavatório', categoryId: 'lavatorio', difficulty: 'simples', priority: 'quando-possivel', time: '15 min', cause: 'Sifão sujo ou seco, ou problemas de ventilação', views: '120', price: 4.99 },
]

export default function CatalogoPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)

  // Filter problems
  const filteredProblems = useMemo(() => {
    if (activeCategory === 'all') return allProblems
    return allProblems.filter(p => p.categoryId === activeCategory)
  }, [activeCategory])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'simples': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'medio': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'avancado': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-white/10 text-white/70 border-white/20'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgente': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'importante': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'quando-possivel': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-white/10 text-white/70 border-white/20'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgente': return 'Urgente'
      case 'importante': return 'Importante'
      case 'quando-possivel': return 'Quando Possível'
      default: return priority
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'simples': return 'Fácil'
      case 'medio': return 'Médio'
      case 'avancado': return 'Avançado'
      default: return difficulty
    }
  }

  const getCategoryColor = (categoryId: string) => {
    const colors: Record<string, string> = {
      'sanita': 'text-blue-400',
      'lavatorio': 'text-cyan-400',
      'cozinha': 'text-orange-400',
      'chuveiro': 'text-teal-400',
      'banheira': 'text-purple-400',
    }
    return colors[categoryId] || 'text-white/60'
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-800 overflow-x-hidden">

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
              <Image 
                src="/logo-abstract.png" 
                alt="CanalizaDIY Logo" 
                width={50} 
                height={50}
                className="relative z-10"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 bg-clip-text text-transparent">
                CanalizaDIY
              </h1>
              <p className="text-xs text-blue-600 font-medium">Diagnóstico Interativo</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-slate-800 hover:text-blue-700 transition-colors text-base font-semibold">Diagnóstico</Link>
            <span className="text-blue-700 font-bold text-base">Catálogo</span>
            <Link href="/precos" className="text-slate-800 hover:text-blue-700 transition-colors text-base font-semibold">Preços</Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 shadow-[0_10px_20px_rgba(59,130,246,0.3)] font-black text-base px-6 py-5 rounded-xl transition-all hover:scale-110 active:scale-95 border-b-2 border-blue-800">
                <User className="w-5 h-5 mr-3" />
                Entrar
              </Button>
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 py-16">
        <div className="container mx-auto px-4 text-center">
          {/* Header */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-blue-600/10 text-blue-600 border-blue-200/50 mb-6 px-5 py-2 font-bold text-sm rounded-full backdrop-blur-md">
              <Layers className="w-4 h-4 mr-2" />
              Catálogo de Soluções
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 tracking-tighter leading-none">
              Todas as <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500">Soluções</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
              Compre uma solução individual ou assine Premium para acesso ilimitado a todas
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
                className={activeCategory === cat.id 
                  ? 'bg-blue-600 text-white hover:bg-blue-500' 
                  : 'border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-white/50'
                }
              >
                {cat.name} ({cat.count})
              </Button>
            ))}
          </motion.div>

          {/* Problems Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredProblems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.3) }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="bg-white/40 backdrop-blur-xl border-white/50 hover:border-blue-400/50 cursor-pointer transition-all h-full flex flex-col shadow-lg shadow-blue-500/5"
                  onClick={() => setSelectedProblem(problem)}
                >
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-xs font-bold ${getCategoryColor(problem.categoryId)}`}>{problem.category}</span>
                      <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                        <Activity className="w-3 h-3" />
                        {problem.views}
                      </div>
                    </div>
                    <h4 className="text-slate-900 font-bold mb-2 text-lg">{problem.title}</h4>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1 leading-relaxed">{problem.description}</p>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge className={`${getDifficultyColor(problem.difficulty)} text-xs border-transparent`}>
                        {getDifficultyLabel(problem.difficulty)}
                      </Badge>
                      <Badge className={`${getPriorityColor(problem.priority)} text-xs border-transparent`}>
                        {getPriorityLabel(problem.priority)}
                      </Badge>
                      <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {problem.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <Badge className="bg-blue-600/10 text-blue-600 border-blue-200/50 text-xs">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                      <span className="text-blue-600 font-bold text-lg">€{problem.price.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
            <motion.div 
            className="text-center mt-20 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-blue-600/5 to-cyan-500/5 border-blue-200/50 max-w-2xl mx-auto shadow-xl backdrop-blur-md">
              <CardContent className="p-10">
                <Crown className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Acesso Ilimitado</h3>
                <p className="text-slate-600 mb-8 text-lg">
                  Assine Premium e tenha acesso a todas as soluções por apenas €19.99/mês
                </p>
                <Link href="/precos">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 font-bold py-6 px-10 rounded-2xl shadow-lg shadow-blue-500/20 text-lg">
                    <Crown className="w-5 h-5 mr-3" />
                    Ver Planos Premium
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/30 backdrop-blur-xl border-t border-white/20 py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo-abstract.png" 
                alt="CanalizaDIY Logo" 
                width={32} 
                height={32}
              />
              <span className="font-bold text-slate-400 text-sm italic">CanalizaDIY</span>
            </div>
            
            <div className="text-xs text-slate-400 font-medium">
              © 2024 CanalizaDIY. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>

      {/* Problem Modal */}
      <AnimatePresence>
        {selectedProblem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProblem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="bg-gradient-to-br from-[#0f4c81] to-[#1a5fa8] border-white/20 shadow-2xl">
                <CardHeader className="relative">
                  <button
                    onClick={() => setSelectedProblem(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={getPriorityColor(selectedProblem.priority)}>
                      {getPriorityLabel(selectedProblem.priority)}
                    </Badge>
                    <span className={`text-sm ${getCategoryColor(selectedProblem.categoryId)}`}>
                      {selectedProblem.category}
                    </span>
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-white">
                    {selectedProblem.title}
                  </CardTitle>
                  <CardDescription className="text-white/60 mt-2">
                    {selectedProblem.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getDifficultyColor(selectedProblem.difficulty)}>
                      <Gauge className="w-3 h-3 mr-1" />
                      {getDifficultyLabel(selectedProblem.difficulty)}
                    </Badge>
                    <Badge className="bg-white/10 text-white/70 border-white/20">
                      <Clock className="w-3 h-3 mr-1" />
                      {selectedProblem.time}
                    </Badge>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/50 text-sm mb-2 font-medium">Causa Provável:</p>
                    <p className="text-yellow-400 text-sm">{selectedProblem.cause}</p>
                  </div>

                  <div className="bg-yellow-400/10 rounded-xl p-4 border border-yellow-400/20">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-semibold">Solução Completa</span>
                      <span className="text-yellow-400 font-bold text-xl">€{selectedProblem.price.toFixed(2)}</span>
                    </div>
                    <ul className="text-white/60 text-sm space-y-1 mb-4">
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-[#64ffda]" />
                        Passo-a-passo detalhado
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-[#64ffda]" />
                        Lista de materiais
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-[#64ffda]" />
                        Dicas de segurança
                      </li>
                    </ul>
                    <div className="flex flex-col gap-2">
                      <Button className="w-full bg-gradient-to-r from-yellow-400 to-[#64ffda] text-[#0f4c81] hover:from-yellow-300 hover:to-[#4cd9b4] font-bold">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Comprar Solução
                      </Button>
                      <Link href="/" className="w-full">
                        <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                          Fazer Diagnóstico Gratuito
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
