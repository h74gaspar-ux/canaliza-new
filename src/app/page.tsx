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
import { useQuiz } from '@/context/QuizContext'
import { Header } from '@/components/nav/Header'

interface Category {
  id: string
  name: string
  icon: React.ReactNode
  problemCount: number
  color: string
  beamColor: string
}


export default function Home() {
  const {
    quizState, setQuizState,
    selectedHousing, setSelectedHousing,
    selectedArea, setSelectedArea,
    selectedCategory, setSelectedCategory,
    selectedProblemKey, setSelectedProblemKey,
    currentQuestionIndex, setCurrentQuestionIndex,
    answers, setAnswers,
    diagnosisResult, setDiagnosisResult,
    resetQuiz
  } = useQuiz()

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
    },
    {
      id: 'canaliza-diy' as const,
      name: 'Canaliza Geral',
      icon: '🧰',
      description: 'Problemas gerais, tubagens, pressão e ruídos'
    }
  ]

  // Area to Categories Mapping
  const areaToCategories: Record<string, string[]> = {
    'casa-de-banho': ['sanita', 'lavatorio', 'chuveiro', 'banheira'],
    'cozinha': ['cozinha'],
    'canaliza-diy': ['canaliza-diy']
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
      name: 'Lava loiça', 
      icon: <div className="w-24 h-24 relative mix-blend-multiply"><Image src="/images/categories/cozinha.png" alt="Lava loiça" fill className="object-contain drop-shadow-md" /></div>, 
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
    { 
      id: 'canaliza-diy', 
      name: 'Canaliza Geral', 
      icon: <div className="w-24 h-24 relative flex items-center justify-center mix-blend-multiply"><Hammer className="w-16 h-16 text-slate-700 drop-shadow-md" /></div>, 
      problemCount: 4, 
      color: 'from-slate-200 to-gray-50', 
      beamColor: '#475569' 
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
      { key: 'banheira-vazamento', title: 'Fuga de água ou infiltração', symptom: 'Manchas no teto/parede' },
      { key: 'banheira-mau-cheiro', title: 'Mau cheiro na banheira', symptom: 'Odor a esgoto' },
      { key: 'banheira-torneira', title: 'Torneira a pingar', symptom: 'Torneira não fecha' },
    ],
    'canaliza-diy': [
      { key: 'baixa-pressao', title: 'Baixa Pressão de Água', symptom: 'Água sai sem força' },
      { key: 'fuga-oculta', title: 'Possível Fuga de Água Oculta', symptom: 'Acha que tem uma fuga' },
      { key: 'ruido-canos', title: 'Ruídos Estranhos nos Canos', symptom: 'Sons de batidas ou assobios' },
      selectedHousing === 'vivenda'
        ? { key: 'termoacumulador-frio', title: 'Problemas no Termoacumulador (Cilindro)', symptom: 'Cilindro elétrico não aquece ou pinga' }
        : { key: 'esquentador-frio', title: 'Água Fria no Esquentador', symptom: 'Esquentador não aquece' },
      { key: 'falha-bombas', title: 'Falha em Bombas de Esgoto', symptom: 'Inundação na cave (Sump Pumps)' },
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
  const selectArea = (areaId: string) => {
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
        priority: 'importante', solution: 'Consulte um profissional', isDIY: false, price: 5.00
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
          priority: 'importante', solution: 'Consulte um profissional', isDIY: false, price: 5.00
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
  }


  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-800 overflow-x-hidden">
      <Header />

      <main className="flex-1 flex flex-col relative z-10 pt-8">
        <div className="container mx-auto px-4 flex-1 flex flex-col max-w-5xl">
          
          <AnimatePresence mode="wait">
            {/* Start Step */}
            {quizState === 'start' && (
              <motion.div
                key="start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 flex flex-col items-center justify-center text-center py-12"
              >
                <div className="mb-8 relative">
                   <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                   <div className="relative bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-blue-500/10 border border-slate-100 ring-12 ring-blue-500/5">
                    <Image 
                      src="/images/canalizador-logo.png" 
                      alt="Canalizador Especialista" 
                      width={160} 
                      height={160}
                      className="rounded-3xl"
                    />
                   </div>
                   <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-blue-600 to-cyan-500 p-4 rounded-2xl shadow-xl border-2 border-white">
                      <Sparkles className="w-6 h-6 text-white animate-spin-slow" />
                   </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 tracking-tighter leading-[0.9]">
                    Diagnóstico <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500">
                      Inteligente
                    </span>
                  </h2>
                  <p className="text-slate-500 max-w-xl mx-auto mb-10 text-xl font-medium leading-relaxed">
                    Identifique a origem do problema e saiba exatamente como resolver antes de chamar um profissional.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => setQuizState('housing')}
                      className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 shadow-[0_20px_40px_rgba(59,130,246,0.3)] font-black text-xl px-12 py-10 rounded-[2rem] transition-all hover:scale-105 active:scale-95 group border-b-4 border-blue-800"
                    >
                      Começar Avaliação
                      <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Button>
                    
                    <Link href="/catalogo">
                      <Button variant="outline" className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xl px-10 py-10 rounded-[2rem] transition-all hover:border-blue-300">
                        Ver Catálogo
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-70">
                    <div className="flex items-center gap-2 justify-center">
                      <ShieldCheck className="w-5 h-5 text-blue-500" />
                      <span className="text-xs font-bold uppercase tracking-widest">Seguro</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <span className="text-xs font-bold uppercase tracking-widest">Rápido</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <Clock className="w-5 h-5 text-cyan-500" />
                      <span>Gratuito</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span>Eficaz</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Housing Step */}
            {quizState === 'housing' && (
              <motion.div
                key="housing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 py-8"
              >
                <div className="text-center mb-12">
                   <Badge className="bg-blue-100 text-blue-600 border-blue-200 mb-4 px-4 py-1 font-bold">Passo 1 de 4</Badge>
                   <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Onde é o problema?</h3>
                   <p className="text-slate-500 text-lg font-medium">O tipo de habitação influencia a origem de certas avarias.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {housingTypes.map(h => (
                    <motion.div 
                      key={h.id}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all border-2 h-full rounded-[2.5rem] overflow-hidden ${
                          selectedHousing === h.id 
                            ? 'border-blue-500 bg-blue-50/50 shadow-2xl shadow-blue-500/10' 
                            : 'border-slate-100 hover:border-blue-200 bg-white/50 backdrop-blur-sm'
                        }`}
                        onClick={() => selectHousing(h.id)}
                      >
                        <CardContent className="p-10 text-center flex flex-col items-center h-full">
                          <div className="text-7xl mb-8 filter drop-shadow-xl">{h.icon}</div>
                          <CardTitle className="text-3xl font-black mb-3 text-slate-900">{h.name}</CardTitle>
                          <CardDescription className="text-slate-500 text-lg font-medium">{h.description}</CardDescription>
                          
                          <div className="mt-8 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                            <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-white" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Area Step */}
            {quizState === 'area' && (
              <motion.div
                key="area"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 py-8"
              >
                <div className="flex items-center gap-4 mb-10">
                   <Button variant="ghost" onClick={goBack} className="rounded-2xl hover:bg-white p-2">
                     <ArrowLeft className="w-6 h-6" />
                   </Button>
                   <div>
                     <Badge className="bg-cyan-100 text-cyan-600 border-cyan-200 mb-1 font-bold">Passo 2 de 4</Badge>
                     <h3 className="text-3xl font-black text-slate-900 tracking-tight">Qual a zona afetada?</h3>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {areas.map(a => (
                    <motion.div
                      key={a.id}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all border-2 h-full rounded-[2rem] overflow-hidden ${
                          selectedArea === a.id 
                            ? 'border-blue-500 bg-blue-50/50 shadow-xl' 
                            : 'border-slate-100 bg-white shadow-lg shadow-slate-100/50'
                        }`}
                        onClick={() => selectArea(a.id)}
                      >
                        <CardContent className="p-8 text-center flex flex-col items-center h-full">
                          <div className="text-6xl mb-6">{a.icon}</div>
                          <CardTitle className="text-2xl font-black mb-3 text-slate-900 tracking-tight leading-tight">{a.name}</CardTitle>
                          <CardDescription className="text-slate-500 font-medium">{a.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Category Step */}
            {quizState === 'category' && (
              <motion.div
                key="category"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 py-8"
              >
                <div className="flex items-center gap-4 mb-10">
                   <Button variant="ghost" onClick={goBack} className="rounded-2xl hover:bg-white p-2">
                     <ArrowLeft className="w-6 h-6" />
                   </Button>
                   <div>
                     <Badge className="bg-indigo-100 text-indigo-600 border-indigo-200 mb-1 font-bold">Passo 3 de 4</Badge>
                     <h3 className="text-3xl font-black text-slate-900 tracking-tight">O que está a falhar?</h3>
                   </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {getFilteredCategories().map(cat => (
                    <motion.div
                      key={cat.id}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className="cursor-pointer transition-all border-2 border-slate-100 bg-white hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 h-full rounded-[2rem] group"
                        onClick={() => selectCategory(cat.id)}
                      >
                        <CardContent className="p-8 text-center flex flex-col items-center">
                          <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
                             {cat.icon}
                          </div>
                          <CardTitle className="text-xl font-black text-slate-900 tracking-tight mb-2">{cat.name}</CardTitle>
                          <div className="text-blue-500 text-xs font-black uppercase tracking-widest">{cat.problemCount} Opções</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Problem Selection Step */}
            {quizState === 'problem' && (
              <motion.div
                key="problem"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 py-8"
              >
                <div className="flex items-center gap-4 mb-10">
                   <Button variant="ghost" onClick={goBack} className="rounded-2xl hover:bg-white p-2">
                     <ArrowLeft className="w-6 h-6" />
                   </Button>
                   <div>
                     <Badge className="bg-orange-100 text-orange-600 border-orange-200 mb-1 font-bold">Passo Final</Badge>
                     <h3 className="text-3xl font-black text-slate-900 tracking-tight">Selecione o sintoma:</h3>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {categoryProblems[selectedCategory || '']?.map(p => (
                      <motion.div
                        key={p.key}
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Button
                          variant="outline"
                          onClick={() => selectProblem(p.key)}
                          className="w-full h-auto p-6 flex flex-col items-start text-left bg-white border-2 border-slate-100 hover:border-blue-400 hover:bg-blue-50/30 rounded-3xl transition-all shadow-sm"
                        >
                          <span className="text-lg font-black text-slate-900 mb-1">{p.title}</span>
                          <span className="text-slate-500 text-sm font-medium">{p.symptom}</span>
                        </Button>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Diagnosis (Quiz Questions) Step */}
            {quizState === 'diagnosis' && (
              <motion.div
                key="diagnosis"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 flex flex-col items-center justify-center py-12"
              >
                <div className="w-full max-w-2xl bg-white/40 backdrop-blur-xl border-2 border-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                   {/* Progress bar */}
                   <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestionIndex + 1) / (diagnosisTrees[selectedProblemKey ||'']?.questions.length || 1)) * 100}%` }}
                      />
                   </div>

                   <Button variant="ghost" onClick={goBack} className="absolute top-6 left-6 rounded-xl hover:bg-white">
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Voltar
                   </Button>

                   <div className="pt-10 text-center">
                    <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs mb-6">Estamos a analisar...</p>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-12 tracking-tight leading-tight">
                      {diagnosisTrees[selectedProblemKey || '']?.questions[currentQuestionIndex].question}
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                      {diagnosisTrees[selectedProblemKey || '']?.questions[currentQuestionIndex].options.map(opt => (
                        <Button
                          key={opt.id}
                          onClick={() => answerQuestion(opt.id)}
                          className="h-auto py-6 px-8 rounded-2xl bg-white border-2 border-slate-100 text-slate-800 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-bold text-lg transition-all active:scale-95 shadow-lg shadow-slate-200/50"
                        >
                          {opt.label}
                        </Button>
                      ))}
                    </div>
                   </div>
                </div>
              </motion.div>
            )}

            {/* Result Step */}
            {quizState === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 py-12"
              >
                {diagnosisResult ? (
                  <div className="max-w-4xl mx-auto space-y-8">
                     <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-xl border-4 border-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
                        
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                           <CheckCircle2 className="w-48 h-48 text-blue-600" />
                        </div>

                        <div className="relative z-10">
                           <Badge className="bg-blue-600 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-8">Diagnóstico Concluído</Badge>
                           <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">{diagnosisResult.title}</h2>
                           <p className="text-slate-600 text-xl font-medium leading-relaxed max-w-2xl mb-12">{diagnosisResult.description}</p>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                              <div className="bg-white/60 p-8 rounded-[2.5rem] border border-white shadow-sm">
                                 <div className="flex items-center gap-3 mb-4">
                                    <AlertTriangle className="w-6 h-6 text-orange-500" />
                                    <h4 className="text-slate-400 font-bold uppercase tracking-widest text-xs">Causa Provável</h4>
                                 </div>
                                 <p className="text-slate-900 font-black text-xl leading-tight">{diagnosisResult.cause}</p>
                              </div>
                              
                              <div className="bg-white/60 p-8 rounded-[2.5rem] border border-white shadow-sm">
                                  <div className="flex items-center gap-6">
                                     <div>
                                        <h4 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Dificuldade</h4>
                                        <Badge variant="outline" className={`px-4 py-1 font-black text-sm rounded-lg ${
                                          diagnosisResult.difficulty === 'simples' ? 'text-green-600 bg-green-50 border-green-200' :
                                          diagnosisResult.difficulty === 'medio' ? 'text-orange-600 bg-orange-50 border-orange-200' : 
                                          'text-red-600 bg-red-50 border-red-200'
                                        }`}>
                                           {diagnosisResult.difficulty.toUpperCase()}
                                        </Badge>
                                     </div>
                                     <div className="w-px h-12 bg-slate-200" />
                                     <div>
                                        <h4 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Tempo Est.</h4>
                                        <div className="flex items-center gap-2 font-black text-slate-800 italic">
                                          <Clock className="w-4 h-4 text-blue-500" />
                                          {diagnosisResult.time}
                                        </div>
                                     </div>
                                  </div>
                              </div>
                           </div>

                           <Card className="bg-gradient-to-br from-blue-700 to-[#1a5fa8] border-none p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                              <CardHeader className="p-0 mb-8">
                                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                       <CardTitle className="text-white text-3xl font-black tracking-tight mb-2">Solução Detalhada</CardTitle>
                                       <CardDescription className="text-blue-100/60 font-medium text-lg italic">Passo-a-passo, materiais e dicas para resolver sozinho.</CardDescription>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-3xl border border-white/20 text-center">
                                       <span className="text-blue-100/60 font-black text-xs uppercase tracking-widest block mb-1">Preço Público</span>
                                       <span className="text-white text-4xl font-black">€{diagnosisResult.price.toFixed(2)}</span>
                                    </div>
                                 </div>
                              </CardHeader>
                              <CardContent className="p-0">
                                 <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 font-black text-2xl py-10 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-4">
                                    <ShoppingCart className="w-8 h-8" />
                                    Desbloquear Agora
                                 </Button>
                                 <div className="mt-8 flex flex-wrap justify-center gap-6">
                                    <div className="flex items-center gap-2 text-blue-100 opacity-60 text-sm font-bold">
                                       <CheckCircle2 className="w-4 h-4" />
                                       Garantia de Satisfação
                                    </div>
                                    <div className="flex items-center gap-2 text-blue-100 opacity-60 text-sm font-bold">
                                       <Clock className="w-4 h-4" />
                                       Download Imediato
                                    </div>
                                 </div>
                              </CardContent>
                           </Card>
                        </div>
                     </div>

                     <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                         <Button 
                           variant="ghost" 
                           onClick={resetQuiz}
                           className="text-slate-400 font-black uppercase tracking-widest text-xs hover:text-blue-600"
                         >
                           <ArrowLeft className="w-4 h-4 mr-2" />
                           Novo Diagnóstico
                         </Button>
                         
                         <div className="w-2 h-2 rounded-full bg-slate-200 hidden md:block" />

                         <Link href="/precos">
                           <Button 
                             className="bg-slate-900 text-white hover:bg-slate-800 font-black px-8 py-4 rounded-2xl shadow-xl flex items-center gap-3 transition-all hover:scale-110"
                           >
                              <Crown className="w-5 h-5 text-yellow-400" />
                              Ver Planos Premium
                           </Button>
                         </Link>
                     </div>
                  </div>
                ) : (
                  <div className="text-center py-20">
                     <p>A carregar resultado...</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Branding Area (Only visible at start) */}
          {quizState === 'start' && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="py-12 border-t border-slate-100/50 mt-auto"
            >
               <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-50">
                        <Droplet className="w-6 h-6 text-blue-500" />
                     </div>
                     <div>
                        <h4 className="text-lg font-black text-slate-800 tracking-tighter">Canaliza DIY</h4>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">O seu assistente de confiança</p>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-12 font-black text-slate-300 text-xs uppercase tracking-widest italic">
                     <div>Expertise Local</div>
                     <div>Soluções Ecológicas</div>
                     <div>Segurança Garantida</div>
                  </div>
               </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
