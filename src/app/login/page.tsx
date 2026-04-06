import React from 'react';
import Link from 'next/link';
import { ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-800 relative overflow-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-400/20 blur-[120px]" />
      </div>

      <main className="flex-1 relative z-10 py-16 px-4">
        <div className="container mx-auto max-w-lg">
          <div className="mb-12">
            <Link href="/">
              <Button variant="ghost" className="text-slate-500 hover:text-blue-600 mb-6 uppercase tracking-widest text-xs font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            
            <h1 className="text-4xl font-black mb-4 text-slate-900 tracking-tighter text-center">
              Iniciar <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Sessão</span>
            </h1>
          </div>

          <Card className="bg-white/60 backdrop-blur-xl border-white/80 shadow-xl overflow-hidden">
            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Área Reservada</h2>
              <p className="text-slate-500 max-w-xl mx-auto text-base mb-8">
                O acesso à área reservada estará disponível em breve.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
