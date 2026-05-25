import { motion } from 'framer-motion'
import { Zap, Shield, Globe, Bell, Smartphone, Building2 } from 'lucide-react'
import { BENEFITS } from '../../constants/data'

const ICONS = { Zap, Shield, Globe, Bell, Smartphone, Building2 }

export default function BenefitsSection() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-gold-500/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-petroleum-500/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-widest text-gold-500/70 uppercase mb-3">
              Por que FINDOC
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
              A solução digital que Angola
              <span className="text-gradient-gold"> precisava</span>
            </h2>
            <p className="text-white/45 leading-relaxed mb-8">
              Desenvolvido em parceria com o Ministério da Justiça e a Polícia Nacional,
              o FINDOC é a resposta moderna ao problema de documentos perdidos em Angola.
              Tecnologia de alto nível ao serviço do cidadão.
            </p>

            {/* Mini stats */}
            <div className="flex gap-8">
              {[
                { v: '24h', l: 'Actualização' },
                { v: '18', l: 'Províncias' },
                { v: '100%', l: 'Gratuito' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-gradient-gold">{item.v}</div>
                  <div className="text-xs text-white/35 mt-0.5">{item.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-2 gap-4">
            {BENEFITS.map((b, i) => {
              const Icon = ICONS[b.icon]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card-premium group"
                >
                  <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-3 group-hover:bg-gold-500/20 transition-colors">
                    <Icon size={17} className="text-gold-400" />
                  </div>
                  <h4 className="text-sm font-semibold mb-1.5">{b.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{b.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
