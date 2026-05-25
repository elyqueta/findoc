import { motion } from 'framer-motion'
import { ArrowRight, Shield } from 'lucide-react'
import Button from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function CTASection() {
  const { openAuth, user } = useAuth()
  const navigate = useNavigate()

  return (
    <section id="contato" className="section-pad relative overflow-hidden">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass-dark border border-gold-500/15 rounded-3xl p-10 md:p-16 text-center overflow-hidden"
        >
          {/* Decorative */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-petroleum-500/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-gold-500/5 rounded-full blur-[80px]" />

          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gold-500/15 border border-gold-500/25 flex items-center justify-center mx-auto mb-6">
              <Shield size={28} className="text-gold-400" />
            </div>

            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-5 leading-tight">
              Comece a pesquisar
              <br />
              <span className="text-gradient-gold">agora mesmo</span>
            </h2>

            <p className="text-white/45 max-w-lg mx-auto mb-9 leading-relaxed">
              Acesso gratuito para todos os cidadãos angolanos. Sem instalações, sem complicações.
              A sua pesquisa começa aqui.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="gold"
                size="xl"
                onClick={() => navigate('/pesquisar')}
              >
                Pesquisar Documento <ArrowRight size={20} />
              </Button>

              {!user && (
                <Button variant="ghost" size="xl" onClick={() => openAuth('register')}>
                  Criar Conta Gratuita
                </Button>
              )}
            </div>

            <p className="text-xs text-white/25 mt-6">
              100% gratuito · Sem cartão de crédito · Acesso imediato
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
