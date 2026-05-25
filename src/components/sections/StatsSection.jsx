import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCounter } from '../../hooks/useCounter'
import { STATS } from '../../constants/data'

function StatCard({ stat, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const { count, startCounting } = useCounter(stat.value, 2200)

  if (inView) startCounting()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="card-premium text-center relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <div className="text-4xl md:text-5xl font-display font-extrabold text-gradient-gold mb-2">
          {count.toLocaleString('pt-AO')}{stat.suffix}
        </div>
        <p className="text-sm text-white/50 font-medium">{stat.label}</p>
      </div>
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-petroleum-700/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-gold-500/5 rounded-full blur-[80px]" />

      <div className="relative container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-widest text-gold-500/70 uppercase mb-3">
            Impacto Nacional
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Angola confia no <span className="text-gradient-gold">FINDOC</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
