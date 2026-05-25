import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, User, LogOut, ChevronDown } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { NAV_LINKS } from '../../constants/data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, logout, openAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setUserMenuOpen(false)
  }, [location])

  const handleNavClick = (href) => {
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          const id = href.replace('/#', '')
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        const id = href.replace('/#', '')
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(href)
    }
    setMobileOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-navbar py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container-max px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <Logo size="md" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-3.5 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => navigate('/pesquisar')}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              aria-label="Pesquisar"
            >
              <Search size={20} />
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 glass px-3 py-2 rounded-xl border border-white/10 hover:border-gold-500/30 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
                    <User size={14} className="text-gold-400" />
                  </div>
                  <span className="text-sm font-medium max-w-[120px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} className="text-white/40" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-52 glass-dark border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                    >
                      <div className="p-3 border-b border-white/10">
                        <p className="text-sm font-semibold truncate">{user.name}</p>
                        <p className="text-xs text-white/40 truncate">{user.email}</p>
                      </div>
                      <div className="p-1.5">
                        <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                          <User size={14} /> Minha Área
                        </Link>
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false) }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <LogOut size={14} /> Terminar Sessão
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => openAuth('login')}>
                  Entrar
                </Button>
                <Button variant="gold" size="sm" onClick={() => openAuth('register')}>
                  Criar Conta
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => navigate('/pesquisar')}
              className="p-2 text-white/60 hover:text-white rounded-lg transition-all"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-petroleum-900/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 glass-dark border-l border-white/10 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8 mt-16">
                <Logo size="md" />
                <button onClick={() => setMobileOpen(false)} className="p-2 text-white/50 hover:text-white rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 flex-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left px-4 py-3 text-base text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="flex flex-col gap-3 mt-6">
                {user ? (
                  <>
                    <Button variant="ghost" onClick={() => { navigate('/dashboard'); setMobileOpen(false) }}>
                      <User size={16} /> Minha Área
                    </Button>
                    <Button variant="danger" onClick={() => { logout(); setMobileOpen(false) }}>
                      <LogOut size={16} /> Terminar Sessão
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" onClick={() => { openAuth('login'); setMobileOpen(false) }}>Entrar</Button>
                    <Button variant="gold" onClick={() => { openAuth('register'); setMobileOpen(false) }}>Criar Conta</Button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
