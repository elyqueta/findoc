import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search, Shield, CheckCircle, ArrowRight, FileText, CreditCard, Globe } from 'lucide-react'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { useAuth } from '../../hooks/useAuth'
import DocumentBackground from './DocumentBackground'
import InstitutionalOverlay from './InstitutionalOverlay'

const floatingCards = [
  {
    icon: CheckCircle,
    label: 'Documento Encontrado',
    sub: 'BI · Esquadra do Rangel',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    pos: 'top-[15%] right-[5%]',
    delay: 0,
  },
  {
    icon: FileText,
    label: '12.847 Documentos',
    sub: 'Recuperados este ano',
    color: 'text-gold-400',
    bg: 'bg-gold-500/10 border-gold-500/20',
    pos: 'bottom-[20%] left-[3%]',
    delay: 0.3,
  },
  {
    icon: Shield,
    label: 'Plataforma Segura',
    sub: 'Certificado pelo Ministério',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    pos: 'top-[55%] right-[2%]',
    delay: 0.6,
  },
]

export default function HeroSection() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { openAuth, user } = useAuth()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/pesquisar${query ? `?q=${encodeURIComponent(query)}` : ''}`)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-petroleum-gradient" />

      {/* Animated document backgrounds — behind everything */}
      <DocumentBackground />

      {/* Institutional HUD overlays and grid */}
      <InstitutionalOverlay />

      {/* Ambient light effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-petroleum-500/20 blur-[120px] pointer-events-none" style={{ zIndex: 2 }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gold-500/8 blur-[100px] pointer-events-none" style={{ zIndex: 2 }} />
      {/* Vignette to frame documents nicely */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 70% at 50% 50%, transparent 40%, rgba(3,31,31,0.7) 100%)',
          zIndex: 3,
        }}
      />

      {/* Floating Cards — above vignette */}
      {floatingCards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + card.delay, duration: 0.6 }}
          className={`absolute hidden xl:flex ${card.pos} items-center gap-3 glass-dark border ${card.bg} rounded-2xl px-4 py-3 animate-float`}
          style={{ animationDelay: `${card.delay}s`, zIndex: 10 }}
        >
          <card.icon size={18} className={card.color} />
          <div>
            <p className="text-xs font-semibold text-white">{card.label}</p>
            <p className="text-[10px] text-white/40">{card.sub}</p>
          </div>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative px-4 md:px-8 pt-32 pb-20 text-center container-max" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="gold" className="mb-6 mx-auto">
            <Globe size={11} />
            Plataforma Nacional Oficial · Angola
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.08] tracking-tight mb-6 max-w-4xl mx-auto"
        >
          Encontre o seu
          <br />
          <span className="text-gradient-gold">documento perdido</span>
          <br />
          com rapidez e segurança
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          O FINDOC conecta cidadãos angolanos com esquadras e entidades em todo o país,
          facilitando a recuperação de documentos perdidos de forma digital, segura e imediata.
        </motion.p>

        {/* Search bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="flex items-center glass-dark border border-white/10 rounded-2xl p-2 gap-2 focus-within:border-gold-500/40 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-3 flex-1 px-3">
              <Search size={20} className="text-white/30 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Insira número do BI, NIF, Passaporte ou referência..."
                className="flex-1 bg-transparent text-white placeholder-white/25 text-sm focus:outline-none"
              />
            </div>
            <Button type="submit" variant="gold" size="md" className="flex-shrink-0 rounded-xl">
              Pesquisar <ArrowRight size={16} />
            </Button>
          </div>
          <p className="text-xs text-white/25 mt-3">
            Ex: 004523178LA045 · N82341056 · CC-LDA-2021-88234
          </p>
        </motion.form>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          {!user && (
            <Button variant="ghost" size="lg" onClick={() => openAuth('register')}>
              <Shield size={18} /> Criar conta gratuita
            </Button>
          )}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 pt-12 border-t border-white/5 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { icon: Shield, label: 'Certificado pelo Ministério da Justiça' },
            { icon: CheckCircle, label: '89% Taxa de Devolução' },
            { icon: Globe, label: '347 Esquadras Conectadas' },
            { icon: CreditCard, label: 'Acesso Gratuito' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-white/30 text-xs font-medium">
              <item.icon size={14} className="text-gold-500/60" />
              {item.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}