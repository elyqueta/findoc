import { motion } from 'framer-motion'
import { UserPlus, Search, MapPin, CheckCircle } from 'lucide-react'
import { HOW_IT_WORKS } from '../../constants/data'

const ICONS = { UserPlus, Search, MapPin, CheckCircle }

export default function HowItWorksSection() {
  return (
    <section id="como-funciona" className="section-pad relative">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest text-gold-500/70 uppercase mb-3">
            Processo Simples
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Como o FINDOC funciona
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Em apenas quatro passos simples, recupere o seu documento perdido sem sair de casa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
          <div className="hidden lg:block absolute top-12 left-[40%] right-[40%] h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

          {HOW_IT_WORKS.map((step, i) => {
            const Icon = ICONS[step.icon]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="card-premium group relative"
              >
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-7 h-7 bg-petroleum-700 border border-gold-500/30 rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-bold text-gold-400">{step.step}</span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
                  <Icon size={22} className="text-gold-400" />
                </div>

                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{step.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
