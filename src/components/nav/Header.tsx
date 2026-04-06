'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuiz } from '@/context/QuizContext'
import { usePathname } from 'next/navigation'

export function Header() {
  const { resetQuiz } = useQuiz()
  const pathname = usePathname()

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-b border-white/20 bg-white/30 backdrop-blur-xl sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer" 
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              if (pathname === '/') {
                resetQuiz()
              }
            }}
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
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" onClick={() => resetQuiz()} className={`${pathname === '/' ? 'text-blue-700 font-bold' : 'text-slate-800 hover:text-blue-700'} transition-colors text-base font-semibold`}>Diagnóstico</Link>
          <Link href="/catalogo" className={`${pathname === '/catalogo' ? 'text-blue-700 font-bold' : 'text-slate-800 hover:text-blue-700'} transition-colors text-base font-semibold`}>Catálogo</Link>
          <Link href="/precos" className={`${pathname === '/precos' ? 'text-blue-700 font-bold' : 'text-slate-800 hover:text-blue-700'} transition-colors text-base font-semibold`}>Preços</Link>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 shadow-[0_10px_20px_rgba(59,130,246,0.3)] font-bold text-base px-6">
              <User className="w-5 h-5 mr-2" />
              Entrar
            </Button>
          </Link>
        </nav>
      </div>
    </motion.header>
  )
}
