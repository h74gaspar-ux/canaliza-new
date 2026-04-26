'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Crown,
  Check,
  X,
  CreditCard,
  Shield,
  Star,
  Zap,
  Heart,
  Award,
  Clock,
  ArrowLeft,
  User
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Pricing Plans
const pricingPlans = [
  {
    id: 'individual',
    name: 'Solução Individual',
    price: 5.00,
    period: 'único',
    description: 'Acesso a uma solução completa',
    features: [
      '1 solução detalhada',
      'Passo-a-passo com fotos',
      'Lista de materiais',
      'Dicas de segurança',
      'Acesso vitalício'
    ],
    notIncluded: [
      'Acesso a todas as soluções',
      'Novos problemas adicionados',
      'Suporte prioritário'
    ]
  },
  {
    id: 'premium-monthly',
    name: 'Premium Mensal',
    price: 20.00,
    period: '/mês',
    description: 'Acesso ilimitado a todas as soluções',
    isPopular: true,
    badge: 'Mais Popular',
    features: [
      'Todas as soluções incluídas',
      'Novos problemas adicionados',
      'Suporte prioritário por email',
      'Guias em vídeo',
      'Cancelar a qualquer momento'
    ]
  },
  {
    id: 'premium-yearly',
    name: 'Premium Anual',
    price: 100.00,
    period: '/ano',
    description: 'Melhor valor - Poupa mais de 75%',
    badge: 'Melhor Valor',
    savings: 'Poupa €189.89/ano',
    features: [
      'Tudo do Premium Mensal',
      'Poupa mais de 75%',
      'Acesso antecipado a novos guias',
      'Comunidade exclusiva',
      '1 consulta gratuita com especialista'
    ]
  }
]

// Features Comparison
const comparisonFeatures = [
  { feature: 'Passo-a-passo detalhado', individual: true, premium: true },
  { feature: 'Lista de materiais', individual: true, premium: true },
  { feature: 'Dicas de segurança', individual: true, premium: true },
  { feature: 'Fotos explicativas', individual: true, premium: true },
  { feature: 'Vídeos tutoriais', individual: false, premium: true },
  { feature: 'Acesso a todas as soluções', individual: false, premium: true },
  { feature: 'Novos problemas adicionados', individual: false, premium: true },
  { feature: 'Suporte prioritário', individual: false, premium: true },
  { feature: 'Comunidade exclusiva', individual: false, premium: true },
  { feature: 'Consultas com especialistas', individual: false, premium: 'Anual' },
]

// FAQ
const faqs = [
  {
    question: 'O diagnóstico é gratuito?',
    answer: 'Sim! O diagnóstico interativo é 100% gratuito. Só paga se quiser ver a solução completa.'
  },
  {
    question: 'Posso cancelar a qualquer momento?',
    answer: 'Sim, pode cancelar a sua assinatura Premium a qualquer momento sem custos adicionais.'
  },
  {
    question: 'A solução individual expira?',
    answer: 'Não, uma vez comprada, a solução individual fica disponível para sempre na sua conta.'
  },
  {
    question: 'Quais os métodos de pagamento?',
    answer: 'Aceitamos cartões de crédito/débito, PayPal e MB Way. Todos os pagamentos são processados de forma segura.'
  },
  {
    question: 'Têm garantia de reembolso?',
    answer: 'Sim! Oferecemos garantia de reembolso de 30 dias. Se não ficar satisfeito, devolvemos o seu dinheiro.'
  }
]

export default function PrecosPage() {
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
            <Link href="/catalogo" className="text-slate-800 hover:text-blue-700 transition-colors text-base font-semibold">Catálogo</Link>
            <span className="text-blue-700 font-bold text-base">Preços</span>
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
      <main className="flex-1 relative z-10 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-blue-600/10 text-blue-600 border-blue-200/50 mb-4 px-4 py-1">
              <Crown className="w-4 h-4 mr-2" />
              Planos e Preços
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">
              Diagnóstico <span className="text-blue-600">gratuito</span>,<br />
              soluções <span className="text-cyan-600">acessíveis</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Pague apenas pelas soluções que precisa, ou assine Premium para acesso ilimitado
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={plan.isPopular ? 'md:-mt-4 md:mb-4' : ''}
              >
                <Card className={`bg-white/40 backdrop-blur-xl border-white/50 h-full flex flex-col relative overflow-hidden shadow-[0_30px_60px_rgba(59,130,246,0.1)] transition-all duration-300 ${plan.isPopular ? 'ring-4 ring-blue-500/30 -mt-6 mb-6' : ''}`}>
                  {plan.badge && (
                    <div className="absolute top-0 right-0">
                      <Badge className={`rounded-none rounded-bl-xl px-5 py-2 font-black tracking-wider text-xs uppercase ${plan.isPopular ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2 pt-10">
                    <CardTitle className="text-3xl font-black text-slate-900 tracking-tighter">{plan.name}</CardTitle>
                    <CardDescription className="text-slate-500 font-bold text-base mt-1">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-10 pt-6">
                    <div className="text-center mb-10">
                      <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-700 to-cyan-500">€{plan.price.toFixed(2)}</span>
                      <span className="text-slate-400 font-bold ml-2 text-lg">{plan.period}</span>
                      {plan.savings && (
                        <div className="mt-3">
                          <Badge variant="outline" className="text-cyan-600 border-cyan-200/50 bg-cyan-50 font-black px-3 py-1 text-xs">
                            {plan.savings}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="space-y-5 flex-1 mb-10">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="bg-blue-100 rounded-full p-1">
                            <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          </div>
                          <span className="text-slate-700 text-base font-bold tracking-tight">{feature}</span>
                        </div>
                      ))}
                      {plan.notIncluded?.map((feature, i) => (
                        <div key={i} className="flex items-center gap-4 opacity-30">
                          <X className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          <span className="text-slate-400 text-base font-medium line-through">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className={`w-full py-10 rounded-2xl font-black text-xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-b-4 ${plan.isPopular
                        ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 shadow-blue-500/30 border-blue-800'
                        : 'bg-white border-2 border-slate-200 text-slate-800 hover:bg-slate-50 shadow-slate-200/50 border-b-slate-300'
                        }`}
                    >
                      {plan.id === 'individual' ? (
                        <>
                          Comprar Solução
                        </>
                      ) : (
                        <>
                          <Crown className="w-6 h-6 mr-3" />
                          Assinar Agora
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {[
              { icon: Shield, text: "Pagamento Seguro" },
              { icon: CreditCard, text: "Garantia 30 dias" },
              { icon: Star, text: "4.9/5 Avaliação" },
              { icon: Heart, text: "Satisfação Garantida" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-500 bg-white/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/50 shadow-sm">
                <item.icon className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-bold tracking-tight">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto mb-24"
          >
            <h3 className="text-3xl font-extrabold text-center mb-10 text-slate-900 tracking-tight">Comparação de Planos</h3>
            <Card className="bg-white/40 backdrop-blur-xl border-white/50 overflow-hidden shadow-2xl shadow-blue-500/5 rounded-3xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="text-left p-6 text-slate-800 font-bold uppercase tracking-wider text-xs">Funcionalidade</th>
                      <th className="text-center p-6 text-slate-800 font-bold uppercase tracking-wider text-xs">Individual</th>
                      <th className="text-center p-6 text-blue-600 font-bold uppercase tracking-wider text-xs">Premium</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {comparisonFeatures.map((row, i) => (
                      <tr key={i} className="hover:bg-blue-50/20 transition-colors">
                        <td className="p-6 text-slate-700 font-medium">{row.feature}</td>
                        <td className="text-center p-6">
                          {row.individual === true ? (
                            <Check className="w-6 h-6 text-blue-500 mx-auto" />
                          ) : row.individual === false ? (
                            <X className="w-6 h-6 text-slate-200 mx-auto" />
                          ) : (
                            <span className="text-blue-600 font-bold text-sm">{row.individual}</span>
                          )}
                        </td>
                        <td className="text-center p-6">
                          {row.premium === true ? (
                            <Check className="w-6 h-6 text-blue-500 mx-auto" />
                          ) : row.premium === false ? (
                            <X className="w-6 h-6 text-slate-200 mx-auto" />
                          ) : (
                            <span className="text-blue-600 font-bold text-sm">{row.premium}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl mx-auto pb-20"
          >
            <h3 className="text-3xl font-extrabold text-center mb-12 text-slate-900 tracking-tight">Perguntas Frequentes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, i) => (
                <Card key={i} className="bg-white/40 backdrop-blur-xl border-white/50 shadow-lg shadow-blue-500/5 rounded-2xl hover:bg-white/60 transition-colors">
                  <CardContent className="p-6">
                    <h4 className="text-slate-900 font-bold mb-3 text-lg">{faq.question}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-yellow-400/10 to-[#64ffda]/10 border-yellow-400/30 max-w-xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Ainda com dúvidas?</h3>
                <p className="text-white/60 mb-6">
                  Experimente o diagnóstico gratuito sem compromisso
                </p>
                <Link href="/">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 py-4 px-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar ao Diagnóstico
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/20 backdrop-blur-3xl border-t border-white/40 py-16 mt-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-6">
              <div className="bg-white p-3 rounded-3xl shadow-xl shadow-blue-500/5 border border-slate-100 ring-8 ring-blue-500/5">
                <Image
                  src="/logo-abstract.png"
                  alt="CanalizaDIY Logo"
                  width={50}
                  height={50}
                />
              </div>
              <div>
                <span className="font-black text-slate-900 text-3xl tracking-tighter">CanalizaDIY</span>
                <p className="text-blue-600 text-xs font-black uppercase tracking-widest mt-1">O seu especialista em casa</p>
              </div>
            </div>

            <div className="flex gap-10 text-base font-black text-slate-500">
              <Link href="#" className="hover:text-blue-600 transition-colors uppercase tracking-widest text-xs">Termos</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors uppercase tracking-widest text-xs">Privacidade</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors uppercase tracking-widest text-xs">Suporte</Link>
            </div>

            <div className="text-xs font-medium text-slate-400">
              © 2024 CanalizaDIY. Created with ❤️ for DIYers.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
