"use client";

import React from 'react';
import { DiagnosisResult } from '@/lib/diagnosisData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Wrench, Clock, Euro, RefreshCcw, Sparkles, ChevronRight } from 'lucide-react';

interface DiagnosisResultCardProps {
  result: DiagnosisResult;
  onReset: () => void;
}

export default function DiagnosisResultCard({ result, onReset }: DiagnosisResultCardProps) {
  const getDifficultyColor = (diff: string) => {
    if (diff === 'simples') return 'bg-green-500/10 text-green-600 border-green-200';
    if (diff === 'medio') return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
    return 'bg-red-500/10 text-red-600 border-red-200';
  };

  return (
    <Card className="overflow-hidden glassmorphism animate-in fade-in slide-in-from-bottom-10 duration-1000 shadow-2xl border-none">
      <CardHeader className="pt-12 pb-8 px-8 md:px-12">
        <div className="flex items-center gap-2 text-vibrant-blue mb-4">
          <Sparkles className="w-5 h-5 fill-vibrant-blue/20" />
          <span className="text-xs font-black uppercase tracking-[0.3em]">Diagnóstico Concluído</span>
        </div>
        <CardTitle className="text-4xl md:text-5xl font-black text-striking-gradient mb-6 leading-tight">
          {result.title}
        </CardTitle>
        <p className="text-xl text-muted-foreground font-medium leading-relaxed italic border-l-4 border-vibrant-blue/20 pl-6">
          "{result.description}"
        </p>
      </CardHeader>
      
      <CardContent className="px-8 md:px-12 pb-12 space-y-10">
        <div className="flex flex-wrap gap-4">
          <Badge variant="outline" className={`rounded-full px-5 py-2 text-sm font-bold border-2 ${getDifficultyColor(result.difficulty)}`}>
            <Wrench className="w-4 h-4 mr-2" /> {result.difficulty.toUpperCase()}
          </Badge>
          <Badge variant="outline" className="rounded-full px-5 py-2 text-sm font-bold border-2 bg-muted/50 border-muted text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" /> {result.time}
          </Badge>
        </div>

        <Separator className="opacity-10 bg-black/10 dark:bg-white/10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-60">A Causa Provável</h4>
            <p className="text-lg font-bold leading-relaxed">{result.cause}</p>
          </div>
          <div className="p-8 rounded-[2rem] bg-vibrant-blue/5 border-2 border-vibrant-blue/10 space-y-4 shadow-inner">
            <h4 className="text-xs font-black uppercase tracking-widest text-vibrant-blue">Solução Recomendada</h4>
            <p className="text-lg font-bold leading-relaxed">{result.solution}</p>
          </div>
        </div>

        <div className="pt-4">
          <div className="inline-flex items-center gap-6 p-6 rounded-[2rem] glassmorphism border-vibrant-blue/20 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-vibrant-blue/10 flex items-center justify-center">
              <Euro className="w-8 h-8 text-vibrant-blue" />
            </div>
            <div>
              <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Custo Estimado</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tighter">~{result.price}€</span>
                <span className="text-sm font-bold text-muted-foreground/60">incl. IVA</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-vibrant-blue/[0.03] border-t border-black/5 dark:border-white/5 p-8 flex flex-col sm:flex-row justify-between gap-4">
        <Button variant="ghost" onClick={onReset} className="h-14 px-8 rounded-full font-bold text-muted-foreground hover:text-vibrant-blue hover:bg-vibrant-blue/5 transition-all">
          <RefreshCcw className="w-5 h-5 mr-2" /> Refazer Teste
        </Button>
        <Button className="btn-premium-strike h-14 group">
          Ver Guia Passo-a-Passo
          <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
}
