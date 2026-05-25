import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Shield } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Logo from '../ui/Logo'

export default function AuthModal() {
  const { authModal, closeAuth, login, register, openAuth } = useAuth()
  const { open, tab } = authModal
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', bi: '' })
  const [errors, setErrors] = useState({})

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    login(form.email, form.password)
    setLoading(false)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name) errs.name = 'Nome é obrigatório'
    if (!form.email) errs.email = 'Email é obrigatório'
    if (!form.password || form.password.length < 6) errs.password = 'Mínimo 6 caracteres'
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    register(form)
    setLoading(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={closeAuth}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-petroleum-900/80 backdrop-blur-xl" />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-md glass-dark border border-white/10 rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
          >
            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <Logo size="sm" />
                <button onClick={closeAuth} className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                  <X size={18} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex glass rounded-xl p-1 mb-8">
                {['login', 'register'].map((t) => (
                  <button
                    key={t}
                    onClick={() => openAuth(t)}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      tab === t
                        ? 'bg-gold-500 text-petroleum-800 shadow-[0_2px_12px_rgba(245,178,27,0.3)]'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {t === 'login' ? 'Entrar' : 'Criar Conta'}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {tab === 'login' ? (
                  <motion.form
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleLogin}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Bem-vindo de volta</h2>
                      <p className="text-sm text-white/40">Entre na sua conta FINDOC</p>
                    </div>

                    <Input
                      label="Email"
                      icon={Mail}
                      type="email"
                      placeholder="seu@email.com"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      error={errors.email}
                    />

                    <div className="relative">
                      <Input
                        label="Palavra-passe"
                        icon={Lock}
                        type={showPass ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={form.password}
                        onChange={e => update('password', e.target.value)}
                        error={errors.password}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3.5 bottom-3 text-white/30 hover:text-white/60"
                      >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    <Button type="submit" variant="gold" size="lg" className="w-full mt-2" disabled={loading}>
                      {loading ? 'A entrar...' : 'Entrar na Conta'}
                    </Button>

                    <p className="text-center text-xs text-white/30">
                      Não tem conta?{' '}
                      <button type="button" onClick={() => openAuth('register')} className="text-gold-400 hover:text-gold-300">
                        Criar gratuitamente
                      </button>
                    </p>
                  </motion.form>
                ) : (
                  <motion.form
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleRegister}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Criar conta</h2>
                      <p className="text-sm text-white/40">Registe-se gratuitamente no FINDOC</p>
                    </div>

                    <Input
                      label="Nome completo"
                      icon={User}
                      placeholder="João Manuel Silva"
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      error={errors.name}
                    />
                    <Input
                      label="Email"
                      icon={Mail}
                      type="email"
                      placeholder="seu@email.com"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      error={errors.email}
                    />
                    <Input
                      label="BI / NIF"
                      icon={Shield}
                      placeholder="004523178LA045"
                      value={form.bi}
                      onChange={e => update('bi', e.target.value)}
                    />

                    <div className="relative">
                      <Input
                        label="Palavra-passe"
                        icon={Lock}
                        type={showPass ? 'text' : 'password'}
                        placeholder="Mínimo 6 caracteres"
                        value={form.password}
                        onChange={e => update('password', e.target.value)}
                        error={errors.password}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3.5 bottom-3 text-white/30 hover:text-white/60"
                      >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    <p className="text-xs text-white/30">
                      Ao criar conta, aceita os{' '}
                      <span className="text-gold-400">Termos de Uso</span> e a{' '}
                      <span className="text-gold-400">Política de Privacidade</span>.
                    </p>

                    <Button type="submit" variant="gold" size="lg" className="w-full" disabled={loading}>
                      {loading ? 'A criar conta...' : 'Criar Conta Gratuita'}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
