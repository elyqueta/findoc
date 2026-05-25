import { motion } from 'framer-motion'
import { Building2, MapPin, FileText, CheckCircle } from 'lucide-react'
import { ESQUADRAS } from '../../constants/data'

export default function EsquadrasSection() {
  return (
    <section id="esquadras" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-petroleum-700/20 to-transparent" />

      <div className="relative container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-widest text-gold-500/70 uppercase mb-3">
            Rede Nacional
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Esquadras <span className="text-gradient-gold">parceiras</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Mais de 347 esquadras e departamentos em todas as províncias angolanas integradas na plataforma.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {ESQUADRAS.map((esq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-premium group hover:border-gold-500/20 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-petroleum-600/50 border border-white/5 flex items-center justify-center group-hover:border-gold-500/20 transition-colors">
                  <Building2 size={18} className="text-gold-400/70 group-hover:text-gold-400 transition-colors" />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-emerald-400 font-medium">Activa</span>
                </div>
              </div>

              <h4 className="text-sm font-semibold mb-1.5 group-hover:text-gold-400 transition-colors">
                {esq.name}
              </h4>

              <div className="flex items-center gap-1.5 text-xs text-white/35 mb-3">
                <MapPin size={11} /> {esq.province}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-white/40">
                  <FileText size={11} />
                  <span>{esq.docs} documentos</span>
                </div>
                <CheckCircle size={13} className="text-emerald-400/50" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-white/30">
            E mais <span className="text-gold-400">341 esquadras</span> em todas as províncias de Angola
          </p>
        </motion.div>
      </div>
    </section>
  )
}
