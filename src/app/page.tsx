import QuizEngine from '@/components/QuizEngine';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-24 overflow-hidden relative">
      <div className="w-full max-w-4xl space-y-8 z-10">
        <header className="text-center space-y-6 mb-16 relative">
          <div className="inline-block p-1 rounded-full bg-vibrant-blue/5 mb-4 border border-vibrant-blue/10">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-vibrant-blue px-4 py-1">Tech Diagnostic 2025</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-striking-gradient leading-[0.85]">
            CANALIZA DIY
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed opacity-80">
            O assistente de diagnóstico inteligente para resolver os seus problemas de canalização.
          </p>
        </header>

        <section className="relative animate-float">
          <QuizEngine />
        </section>

        <footer className="text-center pt-32 text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">
          <p>© 2025 CanalizaDIY — Designed for Excellence</p>
        </footer>
      </div>
      
      {/* Mega Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-vibrant-blue/15 rounded-full blur-[160px] -z-10 animate-pulse-glow" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-vibrant-cyan/15 rounded-full blur-[160px] -z-10 animate-pulse-glow" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-vibrant-indigo/10 rounded-full blur-[140px] -z-10" />
    </main>
  );
}
