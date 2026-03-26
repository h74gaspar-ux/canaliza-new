"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, RefreshCcw, HelpCircle } from 'lucide-react';
import { toiletLeakDiagnosis, DiagnosisTree, DiagnosisResult } from '@/lib/diagnosisData';
import DiagnosisResultCard from './DiagnosisResultCard';

export default function QuizEngine() {
  const [history, setHistory] = useState<string[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(toiletLeakDiagnosis.questions[0].id);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleOptionSelect = (optionId: string) => {
    const newHistory = [...history, optionId];
    const pathKey = newHistory.join(',');
    const nextStep = toiletLeakDiagnosis.paths[pathKey] || toiletLeakDiagnosis.paths[optionId];

    if (nextStep === 'RESULT') {
      setResult(toiletLeakDiagnosis.results[pathKey] || toiletLeakDiagnosis.results[optionId]);
      setIsFinished(true);
    } else if (nextStep) {
      setHistory(newHistory);
      setCurrentQuestionId(nextStep);
    }
  };

  const resetQuiz = () => {
    setHistory([]);
    setCurrentQuestionId(toiletLeakDiagnosis.questions[0].id);
    setIsFinished(false);
    setResult(null);
  };

  if (isFinished && result) {
    return <DiagnosisResultCard result={result} onReset={resetQuiz} />;
  }

  const currentQuestion = toiletLeakDiagnosis.questions.find(q => q.id === currentQuestionId)!;
  const progress = Math.min((history.length / 3) * 100, 95);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 space-y-6">
      <Card className="border-2 shadow-lg glassmorphism overflow-hidden">
        <Progress value={progress} className="h-2 rounded-none bg-muted" />
        <CardHeader className="pt-8 pb-4">
          <div className="flex items-center gap-2 text-primary mb-2">
            <HelpCircle className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Diagnóstico</span>
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pb-8">
          {currentQuestion.options.map((opt) => (
            <Button
              key={opt.id}
              variant="outline"
              className="w-full justify-between py-8 px-6 text-lg font-semibold rounded-2xl hover:bg-vibrant-blue/5 hover:border-vibrant-blue/50 hover:shadow-lg transition-all transform hover:scale-[1.01] group border-2"
              onClick={() => handleOptionSelect(opt.id)}
            >
              <span className="text-left">{opt.label}</span>
              <div className="w-8 h-8 rounded-full border-2 border-muted flex items-center justify-center group-hover:bg-vibrant-blue group-hover:border-vibrant-blue transition-all">
                <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
      <div className="text-center">
        <Button variant="link" onClick={resetQuiz} className="flex items-center gap-1">
          <RefreshCcw className="w-4 h-4" /> Recomeçar
        </Button>
      </div>
    </div>
  );
}
