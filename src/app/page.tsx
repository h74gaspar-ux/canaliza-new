'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Thermometer,
  Activity,
  Heart,
  Clock,
  Award,
  Sparkles,
  Bath,
  Utensils,
  Droplet,
  RefreshCw,
  Gauge,
  User,
  Hammer,
  Crown,
  Lock,
  ShoppingCart,
  CookingPot,
  Toilet,
  ShowerHead,
  Euro,
  ShieldCheck,
  Play,
  Star,
  Eye
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

// Types
import { DiagnosisResult } from '@/lib/diagnosisData'
import { diagnosisTrees } from '@/lib/diagnosisData'

interface Category {
  id: string
  name: string
  icon: React.ReactNode
  problemCount: number
  color: string
  beamColor: string
}


export default function Home() {
  const [quizState, setQuizState] = useState<'start' | 'housing' | 'area' | 'category' | 'problem' | 'diagnosis' | 'result'>('start')
  const [selectedHousing, setSelectedHousing] = useState<'apartamento' | 'vivenda' | null>(null)
  const [selectedArea, setSelectedArea] = useState<'cozinha' | 'casa-de-banho' | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProblemKey, setSelectedProblemKey] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null)

  // Housing Types
  const housingTypes = [
    {
      id: 'apartamento' as const,
      name: 'Apartamento',
      icon: '🏢',
      description: 'Moro em prédio com condomínio'
    },
    {
      id: 'vivenda' as const,
      name: 'Vivenda',
      icon: '🏠',
      description: 'Casa individual com fossa própria'
    }
  ]

  // Areas
  const areas = [
    {
      id: 'casa-de-banho' as const,
      name: 'Casa de Banho',
      icon: '🛁',
      description: 'Sanita, lavatório, chuveiro, banheira, bidê'
    },
    {
      id: 'cozinha' as const,
      name: 'Cozinha',
      icon: '🍳',
      description: 'Lava-louça, torneiras, máquinas'
    }
  ]

  // Area to Categories Mapping
  const areaToCategories: Record<string, string[]> = {
    'casa-de-banho': ['sanita', 'lavatorio', 'chuveiro', 'banheira'],
    'cozinha': ['cozinha']
  }

  // Categories Data
  const categories: Category[] = [
    { 
      id: 'sanita', 
      name: 'Sanita', 
      icon: <div className="w-24 h-24 relative mix-blend-multiply"><Image src="/images/categories/sanita.png" alt="Sanita" fill className="object-contain drop-shadow-md" /></div>, 
      problemCount: 6, 
      color: 'from-blue-100 to-cyan-50',
      beamColor: '#2563eb'
    },
    { 
      id: 'lavatorio', 
      name: 'Lavatório', 
      icon: <div className="w-24 h-24 relative mix-blend-multiply"><Image src="/images/categories/lavatorio.png" alt="Lavatório" fill className="object-contain drop-shadow-md" /></div>, 
      problemCount: 4, 
      color: 'from-cyan-100 to-blue-50', 
      beamColor: '#06b6d4' 
    },
    { 
      id: 'cozinha', 
      name: 'Cozinha', 
      icon: <div className="w-24 h-24 relative mix-blend-multiply"><Image src="/images/categories/cozinha.png" alt="Cozinha" fill className="object-contain drop-shadow-md" /></div>, 
      problemCount: 4, 
      color: 'from-orange-100 to-red-50', 
      beamColor: '#f97316' 
    },
    { 
      id: 'chuveiro', 
      name: 'Chuveiro', 
      icon: <div className="w-24 h-24 relative mix-blend-multiply"><Image src="/images/categories/chuveiro.png" alt="Chuveiro" fill className="object-contain drop-shadow-md" /></div>, 
      problemCount: 3, 
      color: 'from-teal-100 to-emerald-50', 
      beamColor: '#10b981' 
    },
    { 
      id: 'banheira', 
      name: 'Banheira', 
      icon: <div className="w-24 h-24 relative mix-blend-multiply"><Image src="/images/categories/banheira_v2.png" alt="Banheira" fill className="object-contain drop-shadow-md" /></div>, 
      problemCount: 4, 
      color: 'from-purple-100 to-indigo-50', 
      beamColor: '#a855f7' 
    },
  ]

  // Problems per category
  const categoryProblems: Record<string, { key: string; title: string; symptom: string }[]> = {
    'sanita': [
      { key: 'sanita-agua-correndo', title: 'Água a correr na sanita', symptom: 'Água correndo constantemente' },
      { key: 'nao-faz-descarga', title: 'Não faz descarga ou descarga fraca', symptom: 'Botão não funciona ou água fraca' },
      { key: 'sanita-entupida', title: 'Sanita entupida', symptom: 'Água sobe ou desce lentamente' },
      { key: 'sanita-vazamento', title: 'Vazamento na base', symptom: 'Água a sair pela base' },
      { key: 'sanita-mau-cheiro', title: 'Mau cheiro', symptom: 'Odor desagradável' },
      { key: 'sanita-agua-desce', title: 'Nível da água desce sozinho', symptom: 'Água na bacia desce sem fuga visível' },
    ],
    'lavatorio': [
      { key: 'lavatorio-entupido', title: 'Lavatório entupido', symptom: 'Água não escoa' },
      { key: 'lavatorio-mau-cheiro', title: 'Mau cheiro no lavatório', symptom: 'Odor desagradável' },
      { key: 'lavatorio-torneira', title: 'Torneira a pingar', symptom: 'Torneira não fecha' },
      { key: 'lavatorio-vazamento', title: 'Vazamento debaixo', symptom: 'Água no chão' },
    ],
    'cozinha': [
      { key: 'cozinha-entupido', title: 'Lava-louça entupido', symptom: 'Água não desce' },
      { key: 'cozinha-mau-cheiro', title: 'Mau cheiro no lava-louça', symptom: 'Odor desagradável' },
      { key: 'cozinha-agua-sobe', title: 'Água sobe da máquina', symptom: 'Quando usa máquina de lavar' },
      { key: 'cozinha-torneira', title: 'Torneira a pingar', symptom: 'Torneira não fecha' },
    ],
    'chuveiro': [
      { key: 'chuveiro-entupido', title: 'Água acumula', symptom: 'Não escoa bem' },
      { key: 'chuveiro-mau-cheiro', title: 'Mau cheiro no ralo', symptom: 'Odor desagradável' },
      { key: 'vazamento-chuveiro', title: 'Vazamento no chuveiro', symptom: 'Água na parede/teto' },
    ],
    'banheira': [
      { key: 'banheira-entupida', title: 'Banheira entupida', symptom: 'Escoa muito devagar' },
      { key: 'banheira-fuga', title: 'Fuga de água ou infiltração', symptom: 'Manchas no teto/parede' },
      { key: 'banheira-mau-cheiro', title: 'Mau cheiro na banheira', symptom: 'Odor a esgoto' },
      { key: 'banheira-barulho', title: 'Barulho estranho ao escoar', symptom: 'Gorgolejo ou borbulhar' },
    ],
  }

  // Get category name
  const getCategoryName = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId)
    return cat?.name || categoryId
  }

  // Select housing type
  const selectHousing = (housingId: 'apartamento' | 'vivenda') => {
    setSelectedHousing(housingId)
    setQuizState('area')
  }

  // Select area
  const selectArea = (areaId: 'cozinha' | 'casa-de-banho') => {
    setSelectedArea(areaId)
    setQuizState('category')
  }

  // Start diagnosis from category
  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setQuizState('problem')
  }

  // Get filtered categories based on selected area
  const getFilteredCategories = () => {
    if (!selectedArea) return categories
    const allowedIds = areaToCategories[selectedArea] || []
    return categories.filter(cat => allowedIds.includes(cat.id))
  }

  // Select a problem to diagnose
  const selectProblem = (problemKey: string) => {
    setSelectedProblemKey(problemKey)
    setCurrentQuestionIndex(0)
    setAnswers([])
    setDiagnosisResult(null)
    setQuizState('diagnosis')
  }

  // Answer a question
  const answerQuestion = (answerId: string) => {
    const newAnswers = [...answers, answerId]
    setAnswers(newAnswers)

    const tree = diagnosisTrees[selectedProblemKey || '']
    if (!tree) {
      setDiagnosisResult({
        id: 0, title: 'Problema Identificado', description: 'Identificámos o seu problema.',
        cause: 'Necessita de análise mais detalhada', difficulty: 'medio', time: 'Variável',
        priority: 'importante', solution: 'Consulte um profissional', isDIY: false, price: 4.99
      })
      setQuizState('result')
      return
    }

    const nextPath = tree.paths[answerId]

    if (nextPath && nextPath.startsWith('result-')) {
      const result = tree.results[nextPath]
      if (result) { setDiagnosisResult(result); setQuizState('result') }
    } else if (nextPath) {
      const nextQuestionIndex = tree.questions.findIndex(q => q.id === nextPath)
      if (nextQuestionIndex !== -1) setCurrentQuestionIndex(nextQuestionIndex)
    } else {
      const answerKey = newAnswers.join(',')
      const result = tree.results[answerKey]
      if (result) { setDiagnosisResult(result); setQuizState('result') }
      else if (currentQuestionIndex < tree.questions.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1)
      else {
        setDiagnosisResult({
          id: 0, title: 'Problema Identificado', description: 'Identificámos o seu problema.',
          cause: 'Necessita de análise mais detalhada', difficulty: 'medio', time: 'Variável',
          priority: 'importante', solution: 'Consulte um profissional', isDIY: false, price: 4.99
        })
        setQuizState('result')
      }
    }
  }

  // Go back
  const goBack = () => {
    if (quizState === 'area') { setQuizState('housing'); setSelectedHousing(null) }
    else if (quizState === 'category') { setQuizState('area'); setSelectedArea(null) }
    else if (quizState === 'problem') { setQuizState('category'); setSelectedCategory(null) }
    else if (quizState === 'diagnosis') {
      if (currentQuestionIndex > 0) { setCurrentQuestionIndex(currentQuestionIndex - 1); setAnswers(answers.slice(0, -1)) }
      else { setQuizState('problem'); setSelectedProblemKey(null); setAnswers([]) }
    } else if (quizState === 'result') { setQuizState('problem'); setSelectedProblemKey(null); setAnswers([]); setDiagnosisResult(null) }
    else setQuizState('start')
  }

  // Reset
  const resetQuiz = () => {
    setQuizState('start'); setSelectedHousing(null); setSelectedArea(null); setSelectedCategory(null); setSelectedProblemKey(null)
    setCurrentQuestionIndex(0); setAnswers([]); setDiagnosisResult(null)
  }

  // Start new
  const startNewDiagnosis = () => {
    if (selectedCategory) { setQuizState('problem'); setSelectedProblemKey(null); setAnswers([]); setDiagnosisResult(null) }
    else resetQuiz()
  }

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
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-800 overflow-x-hidden relative">
      {/* Premium Glassmorphism Background Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-400/20 blur-[120px]" />
        <div className="absolute top-[30%] left-[50%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-white/20 bg-white/30 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer" 
            whileHover={{ scale: 1.02 }}
            onClick={resetQuiz}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl animate-pulse" />
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
          </motion.div>
          
          <nav className="hidden md:flex items-center gap-6">
            <span className="text-blue-700 font-bold text-base">Diagnóstico</span>
            <Link href="/catalogo" className="text-slate-800 hover:text-blue-700 transition-colors text-base font-semibold">Catálogo</Link>
            <Link href="/precos" className="text-slate-800 hover:text-blue-700 transition-colors text-base font-semibold">Preços</Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 shadow-[0_10px_20px_rgba(59,130,246,0.3)] font-bold text-base px-6">
                <User className="w-5 h-5 mr-2" />
                Entrar
              </Button>
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          {/* START SCREEN */}
          {quizState === 'start' && (
            <motion.section
              key="start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section */}
              <div className="relative py-16 md:py-24">
                <div className="container mx-auto px-4">
                  <div className="max-w-5xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                      
                      <h2 className="text-6xl md:text-8xl font-black mb-8 leading-[1.05] text-slate-900 tracking-tighter">
                        Domine a sua <br />
                        <span className="text-striking-gradient underline decoration-blue-200 decoration-12 underline-offset-8 inline-block">Canalização</span>
                      </h2>
                      
                      <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                        Poupe tempo e dinheiro. Identifique o problema em <span className="text-blue-600 font-black">5 minutos</span> e saiba se pode resolver por conta própria.
                      </p>
                      
                      {/* Como Funciona - 3 Passos */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mt-16 mb-16 px-4"
                      >
                        <div className="text-center mb-10">
                          <Badge className="bg-cyan-500/10 text-cyan-600 border-cyan-200 mb-4 px-4 py-1">
                            Processo Simples
                          </Badge>
                          <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                            Como funciona o <span className="text-cyan-600">diagnóstico</span>?
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                          {[
                            {
                              step: '1',
                              title: 'Selecione o problema',
                              desc: 'Escolha a área e o equipamento com que tem dificuldades',
                              icon: <AlertTriangle className="w-6 h-6" />,
                              color: 'from-orange-400 to-orange-500'
                            },
                            {
                              step: '2',
                              title: 'Responda às perguntas',
                              desc: 'Siga o guia interativo com perguntas simples sobre os sintomas',
                              icon: <Activity className="w-6 h-6" />,
                              color: 'from-blue-400 to-cyan-500'
                            },
                            {
                              step: '3',
                              title: 'Receba a solução',
                              desc: 'Saiba a causa, a dificuldade e se pode resolver por conta própria',
                              icon: <CheckCircle2 className="w-6 h-6" />,
                              color: 'from-emerald-400 to-emerald-500'
                            }
                          ].map((item, index) => (
                            <motion.div
                              key={item.step}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.8 + index * 0.15 }}
                              className="relative"
                            >
                              <Card className="bg-white/50 backdrop-blur-xl border-white/60 hover:border-cyan-300/50 hover:bg-white/70 transition-all h-full">
                                <CardContent className="p-6 text-center">
                                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4 shadow-lg text-white`}>
                                    {item.icon}
                                  </div>
                                  <div className="text-cyan-600 font-black text-sm mb-2">PASSO {item.step}</div>
                                  <h4 className="text-slate-900 font-bold text-lg mb-2">{item.title}</h4>
                                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                </CardContent>
                              </Card>
                              {index < 2 && (
                                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                                  <ArrowRight className="w-6 h-6 text-slate-300" />
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="flex flex-col items-center justify-center gap-4"
                      >
                        <Button
                          size="lg"
                          className="btn-premium-strike bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 font-black text-xl px-12 py-10 rounded-[30px] transition-all duration-300 shadow-xl"
                          onClick={() => setQuizState('housing')}
                        >
                          <Play className="w-6 h-6 mr-3" />
                          Iniciar Diagnóstico
                        </Button>
                        <Link href="/catalogo" className="block w-full max-w-md">
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-full btn-premium-strike bg-gradient-to-r from-amber-400 to-orange-400 border-none text-slate-900 hover:from-amber-300 hover:to-orange-300 font-black text-lg px-8 py-8 rounded-[24px] transition-all duration-300 shadow-xl shadow-orange-500/20"
                          >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Explorar Catálogo de Soluções
                          </Button>
                        </Link>
                      </motion.div>

                      {/* High-Fidelity Statistics Bar */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.4, duration: 0.8 }}
                        className="mt-20 pt-16 border-t border-slate-100"
                      >
                        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                          {/* Stat Item 1 */}
                          <div className="flex items-center gap-4 group">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                              <Euro className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                              <div className="text-2xl font-black text-slate-900 leading-none">150€</div>
                              <div className="text-slate-500 text-sm font-bold mt-1">Poupança Média</div>
                            </div>
                          </div>

                          {/* Stat Item 2 */}
                          <div className="flex items-center gap-4 group">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                              <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                              <div className="text-2xl font-black text-slate-900 leading-none">2.500+</div>
                              <div className="text-slate-500 text-sm font-bold mt-1">Diagnósticos</div>
                            </div>
                          </div>

                          {/* Stat Item 3 */}
                          <div className="flex items-center gap-4 group">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                              <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                              <div className="text-2xl font-black text-slate-900 leading-none">94%</div>
                              <div className="text-slate-500 text-sm font-bold mt-1">Precisão</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Testimonials Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="mt-16 w-full max-w-6xl mx-auto"
                      >
                        <div className="text-center mb-16">
                          <Badge className="bg-orange-500/10 text-orange-600 border-orange-200 mb-4 px-4 py-1">
                            Testemunhos
                          </Badge>
                          <h3 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 tracking-tighter">
                            O que dizem os <span className="text-striking-gradient">Nossos Utilizadores</span>
                          </h3>
                          <p className="text-slate-500 font-medium text-lg">Histórias reais de pessoas que pouparam dinheiro com o nosso diagnóstico</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {[
                            {
                              name: 'João Silva',
                              location: 'Lisboa',
                              text: '"Pensei que ia ter de chamar um canalizador por 150€. Descobri que era apenas uma junta de 2€ e resolvi em 10 minutos!"',
                              savings: '148€',
                              rating: 5,
                              initial: 'J'
                            },
                            {
                              name: 'Maria Santos',
                              location: 'Porto',
                              text: '"Excelente ferramenta! Identificou o problema da minha torneira corretamente e poupei muito dinheiro."',
                              savings: '120€',
                              rating: 5,
                              initial: 'M'
                            },
                            {
                              name: 'Pedro Costa',
                              location: 'Braga',
                              text: '"Muito intuitivo. Em 5 minutos soube exatamente o que fazer e já não tenho a sanita a correr."',
                              savings: '180€',
                              rating: 5,
                              initial: 'P'
                            }
                          ].map((t, i) => (
                            <motion.div
                              key={i}
                              whileHover={{ y: -10 }}
                              className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group"
                            >
                              <div className="absolute top-6 right-6">
                                <Badge className="bg-emerald-500 text-white border-none px-3 py-1 font-bold text-sm">
                                  Poupou {t.savings}
                                </Badge>
                              </div>
                              
                              <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, j) => (
                                  <Star key={j} className="w-5 h-5 fill-orange-400 text-orange-400" />
                                ))}
                              </div>

                              <p className="text-slate-600 font-medium leading-relaxed mb-8 italic">
                                {t.text}
                              </p>

                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                                  {t.initial}
                                </div>
                                <div>
                                  <div className="font-black text-slate-900">{t.name}</div>
                                  <div className="text-slate-400 text-sm font-bold">{t.location}</div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                      
                    </motion.div>
                  </div>
                </div>
              </div>


            </motion.section>
          )}

          {/* CATEGORY SELECTION SCREEN */}
          {quizState === 'category' && (
            <motion.section
              key="category"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative min-h-[80vh] flex items-center py-20"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                  >
                    <Badge className="bg-indigo-500/10 text-indigo-600 border-indigo-200 mb-4 px-4 py-1">
                      Passo 3 de 3
                    </Badge>
                    <h3 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                      Que equipamento tem o <span className="text-indigo-600">problema</span>?
                    </h3>
                    <p className="text-slate-500 text-lg">
                      Selecione o equipamento específico.
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {getFilteredCategories().map((category, index) => (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -8 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className="bg-white/60 backdrop-blur-xl border-white/80 hover:border-indigo-400/50 hover:bg-white/80 cursor-pointer transition-all shadow-xl h-full flex flex-col items-center justify-center p-6"
                          onClick={() => selectCategory(category.id)}
                        >
                          <div className={`relative w-28 h-28 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-inner ring-4 ring-white/50 overflow-hidden`}>
                            {category.icon}
                          </div>
                          <h4 className="text-slate-900 font-bold text-xl text-center">{category.name}</h4>
                          <p className="text-slate-500 text-sm mt-2">{category.problemCount} problemas</p>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-12 flex justify-center">
                    <Button variant="ghost" onClick={goBack} className="text-slate-400 hover:text-indigo-600 hover:bg-white/40 font-bold uppercase tracking-widest text-xs">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* PROBLEM SELECTION SCREEN */}
          {quizState === 'problem' && selectedCategory && (
            <motion.section
              key="problem"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative min-h-[80vh] flex items-center py-20"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                  >
                    <Badge className="bg-blue-600/10 text-blue-600 border-blue-200 mb-4 px-4 py-1">
                      {getCategoryName(selectedCategory)}
                    </Badge>
                    <h3 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                      Qual é o <span className="text-blue-600">problema</span>?
                    </h3>
                  </motion.div>

                  <div className="space-y-4">
                    {categoryProblems[selectedCategory]?.map((problem, index) => (
                      <motion.div
                        key={problem.key}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 10 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card 
                          className="bg-white/50 backdrop-blur-xl border-white/60 hover:border-blue-400/50 hover:bg-white/70 cursor-pointer transition-all shadow-md group"
                          onClick={() => selectProblem(problem.key)}
                        >
                          <CardContent className="p-6 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-400/10 flex items-center justify-center group-hover:bg-blue-600/10 transition-colors">
                              <AlertTriangle className="w-7 h-7 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-slate-800 font-bold text-xl">{problem.title}</h4>
                              <p className="text-slate-500 font-medium">{problem.symptom}</p>
                            </div>
                            <ArrowRight className="w-6 h-6 text-blue-300 group-hover:text-blue-600 transition-colors" />
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-12 flex justify-center">
                    <Button variant="ghost" onClick={goBack} className="text-slate-400 hover:text-blue-600 hover:bg-white/40 font-bold uppercase tracking-widest text-xs">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar às categorias
                    </Button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* DIAGNOSIS SCREEN */}
          {quizState === 'diagnosis' && selectedProblemKey && (
            <motion.section
              key="diagnosis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative min-h-[80vh] flex items-center py-20"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                  {/* Progress Bar */}
                  <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">
                        {diagnosisTrees[selectedProblemKey] 
                          ? `PASSO ${currentQuestionIndex + 1} DE ${diagnosisTrees[selectedProblemKey].questions.length}`
                          : 'DIAGNÓSTICO'
                        }
                      </span>
                      <span className="text-blue-600 text-sm font-black">
                        {diagnosisTrees[selectedProblemKey] 
                          ? `${Math.round(((currentQuestionIndex + 1) / diagnosisTrees[selectedProblemKey].questions.length) * 100)}%`
                          : '50%'
                        }
                      </span>
                    </div>
                    <div className="h-3 bg-white/50 rounded-full overflow-hidden border border-white/40 shadow-inner">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: diagnosisTrees[selectedProblemKey] 
                          ? `${((currentQuestionIndex + 1) / diagnosisTrees[selectedProblemKey].questions.length) * 100}%`
                          : '50%'
                        }}
                      />
                    </div>
                  </div>

                  {/* Symptom Info */}
                  {diagnosisTrees[selectedProblemKey] && currentQuestionIndex === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8"
                    >
                      <Card className="bg-blue-600/5 border-blue-200/50 backdrop-blur-md">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-600/10 p-2 rounded-xl">
                              <AlertTriangle className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-blue-600/50 uppercase tracking-widest text-[10px] font-black mb-1">Sintoma DETETADO</p>
                              <p className="text-slate-800 font-bold text-lg">{diagnosisTrees[selectedProblemKey].symptom}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Current Question */}
                  {diagnosisTrees[selectedProblemKey] && diagnosisTrees[selectedProblemKey].questions[currentQuestionIndex] && (
                    <motion.div
                      key={`q-${currentQuestionIndex}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                    >
                      <div className="text-center mb-12">
                        <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[1.05]">
                          {diagnosisTrees[selectedProblemKey].questions[currentQuestionIndex].question}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-5 max-w-4xl mx-auto">
                        {diagnosisTrees[selectedProblemKey].questions[currentQuestionIndex].options.map((option, index) => (
                          <motion.div
                            key={option.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, x: 10 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card 
                              className="bg-white/40 backdrop-blur-xl border-white/60 hover:border-blue-400/50 hover:bg-white/80 cursor-pointer transition-all shadow-xl shadow-blue-500/5 overflow-hidden relative group rounded-3xl"
                              onClick={() => answerQuestion(option.id)}
                            >
                              <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <CardContent className="p-8">
                                <div className="flex items-center gap-6">
                                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-lg border border-slate-100 flex items-center justify-center text-blue-600 font-black text-2xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                    {String.fromCharCode(65 + index)}
                                  </div>
                                  <p className="text-slate-900 font-black text-2xl md:text-3xl tracking-tight leading-tight">{option.label}</p>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Generic Problem */}
                  {selectedProblemKey && !diagnosisTrees[selectedProblemKey] && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <Card className="bg-white/60 backdrop-blur-xl border-white/80 shadow-2xl p-10">
                        <CardContent className="p-0">
                          <div className="bg-blue-100/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <Activity className="w-12 h-12 text-blue-600 animate-pulse" />
                          </div>
                          <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Diagnóstico em desenvolvimento</h3>
                          <p className="text-slate-500 font-medium text-lg mb-10 max-w-md mx-auto">Este problema ainda não tem um guia interativo completo, mas a nossa equipa está a trabalhar nisso!</p>
                          <Button onClick={() => answerQuestion('generic')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-16 w-full max-w-xs rounded-2xl shadow-lg shadow-blue-500/30 text-lg transition-all active:scale-95">
                            Ver solução geral
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  <div className="mt-12 flex justify-center">
                    <Button variant="ghost" onClick={goBack} className="text-slate-400 hover:text-blue-600 hover:bg-white/40 font-bold uppercase tracking-widest text-xs">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {currentQuestionIndex > 0 ? 'Pergunta anterior' : 'Voltar aos problemas'}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* RESULT SCREEN */}
          {quizState === 'result' && diagnosisResult && (
            <motion.section
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative min-h-[80vh] flex items-center py-20"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                    {/* Success Icon */}
                    <motion.div 
                      className="text-center mb-10"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                      </div>
                    </motion.div>
 
                    <div className="grid md:grid-cols-5 gap-8">
                        {/* Free Result */}
                      <Card className="md:col-span-3 bg-white/40 backdrop-blur-2xl border-white/60 shadow-[0_40px_80px_rgba(59,130,246,0.1)] overflow-hidden rounded-3xl">
                        <div className="h-3 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500" />
                        <CardHeader className="p-10">
                          <Badge className={`mb-6 w-fit px-5 py-2 text-xs font-black uppercase tracking-widest rounded-full ${getPriorityColor(diagnosisResult.priority)}`}>
                            {getPriorityLabel(diagnosisResult.priority)}
                          </Badge>
                          <CardTitle className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-[1.05]">
                            {diagnosisResult.title}
                          </CardTitle>
                          <CardDescription className="text-slate-500 text-2xl font-medium leading-relaxed">
                            {diagnosisResult.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-10 pt-0 space-y-8">
                          <div className="bg-blue-50/50 backdrop-blur-md rounded-[2.5rem] p-8 border border-blue-100 shadow-inner group">
                            <p className="text-blue-600/60 uppercase tracking-widest text-xs font-black mb-3">CAUSA IDENTIFICADA</p>
                            <p className="text-slate-900 font-black text-2xl md:text-3xl tracking-tight group-hover:text-blue-600 transition-colors">{diagnosisResult.cause}</p>
                          </div>

                          <div className="flex flex-wrap gap-4">
                            <Badge className={`px-6 py-3 rounded-2xl text-base font-black shadow-lg ${getDifficultyColor(diagnosisResult.difficulty)}`}>
                              <Gauge className="w-5 h-5 mr-3" />
                              {getDifficultyLabel(diagnosisResult.difficulty)}
                            </Badge>
                            <Badge className="bg-white/80 text-slate-700 border border-slate-200 px-6 py-3 rounded-2xl text-base font-black shadow-lg">
                              <Clock className="w-5 h-5 mr-3" />
                              {diagnosisResult.time}
                            </Badge>
                            <Badge className={`px-6 py-3 rounded-2xl text-base font-black shadow-lg ${diagnosisResult.isDIY 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-white border-none'
                              : 'bg-gradient-to-r from-orange-500 to-red-400 text-white border-none'
                            }`}>
                              {diagnosisResult.isDIY 
                                ? <><Hammer className="w-5 h-5 mr-3" /> Faça você mesmo</>
                                : <><User className="w-5 h-5 mr-3" /> Especialista necessário</>
                              }
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Paid/Next Steps side */}
                      <div className="md:col-span-2 space-y-8">
                        {diagnosisResult.price > 0 && (
                          <Card className="bg-gradient-to-br from-blue-800 via-blue-900 to-slate-900 border-none shadow-[0_40px_80px_rgba(30,58,138,0.4)] overflow-hidden relative group rounded-3xl">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]" />
                            <CardContent className="p-10 relative z-10 text-white">
                              <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 ring-4 ring-white/5">
                                  <Lock className="w-8 h-8 text-cyan-300" />
                                </div>
                                <h4 className="text-3xl font-black tracking-tighter">Guia Completo</h4>
                              </div>
                              <p className="text-blue-100/80 text-xl mb-10 font-medium leading-relaxed">
                                Tutorial em HD com lista de compras, dicas de segurança e fotos reais da reparação.
                              </p>
                              
                              <div className="space-y-5">
                                <Button className="w-full h-20 bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-950 hover:from-yellow-300 hover:to-orange-300 font-black text-2xl rounded-2xl shadow-[0_20px_40px_rgba(234,179,8,0.3)] active:scale-95 transition-all border-b-4 border-orange-600">
                                  <ShoppingCart className="w-6 h-6 mr-3" />
                                  Pagar €{diagnosisResult.price.toFixed(2)}
                                </Button>
                                <Link href="/precos" className="block">
                                  <Button variant="outline" className="w-full h-16 border-white/20 text-white hover:bg-white/10 font-bold rounded-2xl backdrop-blur-md text-lg transition-transform hover:scale-105 active:scale-95">
                                    <Crown className="w-5 h-5 mr-3 text-yellow-400" />
                                    Membro Premium
                                  </Button>
                                </Link>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        <Card className="bg-white/40 backdrop-blur-xl border-white/50 border-dashed border-2 rounded-3xl">
                           <CardContent className="p-10 text-center">
                              <p className="text-slate-400 font-black text-sm mb-8 uppercase tracking-[0.2em]">Opções adicionais</p>
                              <div className="grid gap-4">
                                <Button onClick={startNewDiagnosis} className="h-16 bg-white border-2 border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-blue-400 font-black rounded-2xl text-lg shadow-xl shadow-slate-200/50 transition-all hover:scale-105 active:scale-95">
                                  <RefreshCw className="w-5 h-5 mr-3 text-blue-500" />
                                  Novo Diagnóstico
                                </Button>
                                <Link href="/catalogo">
                                  <Button variant="ghost" className="w-full h-16 text-blue-600 hover:bg-blue-50 font-black rounded-2xl text-lg transition-all hover:scale-105">
                                    Explorar Catálogo
                                  </Button>
                                </Link>
                              </div>
                           </CardContent>
                        </Card>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )}

          {/* HOUSING SELECTION SCREEN */}
          {quizState === 'housing' && (
            <motion.section
              key="housing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative min-h-[80vh] flex items-center py-20"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                  >
                    <Badge className="bg-indigo-500/10 text-indigo-600 border-indigo-200 mb-4 px-4 py-1">
                      Passo 1 de 3
                    </Badge>
                    <h3 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                      Qual é o seu tipo de <span className="text-indigo-600">habitação</span>?
                    </h3>
                    <p className="text-slate-500 text-lg">
                      Isto ajuda-nos a personalizar o diagnóstico para a sua situação específica.
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {housingTypes.map((housing, index) => (
                      <motion.div
                        key={housing.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className="bg-white/60 backdrop-blur-xl border-white/80 hover:border-indigo-400/50 hover:bg-white/80 cursor-pointer transition-all shadow-xl h-full"
                          onClick={() => selectHousing(housing.id)}
                        >
                          <CardContent className="p-8 text-center">
                            <div className="text-6xl mb-4">{housing.icon}</div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-2">{housing.name}</h4>
                            <p className="text-slate-500">{housing.description}</p>
                            <div className="mt-6 flex justify-center">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                                <ArrowRight className="w-6 h-6" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-12 flex justify-center">
                    <Button variant="ghost" onClick={goBack} className="text-slate-400 hover:text-indigo-600 hover:bg-white/40 font-bold uppercase tracking-widest text-xs">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* AREA SELECTION SCREEN */}
          {quizState === 'area' && (
            <motion.section
              key="area"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative min-h-[80vh] flex items-center py-20"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                  >
                    <Badge className="bg-indigo-500/10 text-indigo-600 border-indigo-200 mb-4 px-4 py-1">
                      Passo 2 de 3
                    </Badge>
                    <h3 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                      Em que <span className="text-indigo-600">área</span> da casa?
                    </h3>
                    <p className="text-slate-500 text-lg">
                      Selecione a divisão onde está o problema.
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {areas.map((area, index) => (
                      <motion.div
                        key={area.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className="bg-white/60 backdrop-blur-xl border-white/80 hover:border-indigo-400/50 hover:bg-white/80 cursor-pointer transition-all shadow-xl h-full"
                          onClick={() => selectArea(area.id)}
                        >
                          <CardContent className="p-8 text-center">
                            <div className="text-6xl mb-4">{area.icon}</div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-2">{area.name}</h4>
                            <p className="text-slate-500">{area.description}</p>
                            <div className="mt-6 flex justify-center">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                                <ArrowRight className="w-6 h-6" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-12 flex justify-center">
                    <Button variant="ghost" onClick={goBack} className="text-slate-400 hover:text-indigo-600 hover:bg-white/40 font-bold uppercase tracking-widest text-xs">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white/20 backdrop-blur-3xl border-t border-white/40 py-4 mt-20 relative z-10">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image 
                src="/logo-abstract.png" 
                alt="CanalizaDIY Logo" 
                width={40} 
                height={40}
                className="relative z-10"
              />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-xl tracking-tighter">CanalizaDIY</span>
              <p className="text-blue-600 text-[10px] font-bold uppercase tracking-widest mt-0.5">O seu especialista em casa</p>
            </div>
          </div>
          
          <div className="hidden md:flex gap-6 text-sm font-bold text-slate-500">
            <Link href="#" className="hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px]">Termos</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px]">Privacidade</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px]">Suporte</Link>
          </div>

          <div className="hidden md:block text-[10px] font-medium text-slate-400">
            © 2024 CanalizaDIY. Created with ❤️ for DIYers.
          </div>
        </div>
      </footer>
    </div>
  )
}
