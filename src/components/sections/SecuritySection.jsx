import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Server, Key, CheckCircle } from 'lucide-react'

const features = [
  { icon: Lock, title: 'Criptografia AES-256', desc: 'Os seus dados são protegidos com o mesmo padrão usado por governos e militares.' },
  { icon: Eye, title: 'Privacidade Total', desc: 'Apenas você e autoridades competentes têm acesso aos seus dados pessoais.' },
  { icon: Server, title: 'Servidores Seguros', desc: 'Infraestrutura de alto nível com backups automáticos e redundância total.' },
  { icon: Key, title: 'Autenticação Segura', desc: 'Sistema de verificação de identidade integrado com bases de dados oficiais.' },
  { icon: Shield, title: 'Conformidade Legal', desc: 'Totalmente em conformidade com a legislação angolana de protecção de dados.' },
  { icon: CheckCircle, title: 'Auditoria Contínua', desc: 'Sistema auditado regularmente por especialistas em segurança informática.' },
]

export default function SecuritySection() {
  return (
    <section id="seguranca" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-petroleum-800/40 to-transparent" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-petroleum-600/20 rounded-full blur-[100px]" />

      <div className="relative container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Central shield */}
              <div className="w-48 h-48 mx-auto relative">
                <div className="absolute inset-0 rounded-full bg-gold-500/5 blur-2xl animate-pulse-gold" />
                <div className="relative w-full h-full rounded-full glass border-2 border-gold-500/20 flex items-center justify-center shadow-gold">
                  <Shield size={64} className="text-gold-400" />
                </div>
              </div>

              {/* Orbiting elements */}
              {[Lock, Key, Eye, Server].map((Icon, i) => {
                const angle = (i / 4) * 360
                const rad = (angle * Math.PI) / 180
                const r = 110
                const x = Math.cos(rad) * r
                const y = Math.sin(rad) * r
                return (
                  <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: i * 5 }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transformOrigin: 'center' }}
                  >
                    <div
                      className="absolute w-10 h-10 glass border border-gold-500/20 rounded-xl flex items-center justify-center"
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                      <Icon size={16} className="text-gold-400/60" />
                    </div>
                  </motion.div>
                )
              })}

              <p className="text-center text-xs text-white/25 mt-8">Protecção de dados certificada</p>
            </div>
          </motion.div>

          {/* Text + Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <p className="text-xs font-semibold tracking-widest text-gold-500/70 uppercase mb-3">
              Segurança & Privacidade
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 leading-tight">
              Os seus dados estão <span className="text-gradient-gold">completamente seguros</span>
            </h2>
            <p className="text-white/45 mb-8 leading-relaxed">
              Utilizamos as mais avançadas tecnologias de protecção de dados para garantir
              que as suas informações pessoais nunca sejam comprometidas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={14} className="text-gold-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-0.5">{f.title}</h4>
                      <p className="text-xs text-white/35 leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
