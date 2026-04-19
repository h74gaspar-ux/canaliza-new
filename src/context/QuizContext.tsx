'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { DiagnosisResult } from '@/lib/diagnosisData'

type QuizState = 'start' | 'housing' | 'area' | 'category' | 'problem' | 'diagnosis' | 'result'

interface QuizContextType {
  quizState: QuizState
  setQuizState: (state: QuizState) => void
  selectedHousing: 'apartamento' | 'vivenda' | null
  setSelectedHousing: (housing: 'apartamento' | 'vivenda' | null) => void
  selectedArea: string | null
  setSelectedArea: (area: string | null) => void
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  selectedProblemKey: string | null
  setSelectedProblemKey: (key: string | null) => void
  currentQuestionIndex: number
  setCurrentQuestionIndex: (index: number) => void
  answers: string[]
  setAnswers: (answers: string[]) => void
  diagnosisResult: DiagnosisResult | null
  setDiagnosisResult: (result: DiagnosisResult | null) => void
  resetQuiz: () => void
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [quizState, setQuizState] = useState<QuizState>('start')
  const [selectedHousing, setSelectedHousing] = useState<'apartamento' | 'vivenda' | null>(null)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProblemKey, setSelectedProblemKey] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null)

  const resetQuiz = () => {
    setQuizState('start')
    setSelectedHousing(null)
    setSelectedArea(null)
    setSelectedCategory(null)
    setSelectedProblemKey(null)
    setCurrentQuestionIndex(0)
    setAnswers([])
    setDiagnosisResult(null)
  }

  return (
    <QuizContext.Provider
      value={{
        quizState, setQuizState,
        selectedHousing, setSelectedHousing,
        selectedArea, setSelectedArea,
        selectedCategory, setSelectedCategory,
        selectedProblemKey, setSelectedProblemKey,
        currentQuestionIndex, setCurrentQuestionIndex,
        answers, setAnswers,
        diagnosisResult, setDiagnosisResult,
        resetQuiz
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}
