import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigate, useNavigate } from 'react-router-dom'
import {
  User, FileText, Search, Settings, Shield, Bell, LogOut,
  CheckCircle, Clock, XCircle, Edit3, Upload, ChevronRight,
  Home, AlertCircle, Eye, Lock, Phone, Mail, MapPin, Calendar,
  Trash2, Plus
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Input from '../components/ui/Input'

const STATUS_CFG = {
  active: { label: 'Activo', color: 'green', Icon: CheckCircle },
  expired: { label: 'Expirado', color: 'red', Icon: XCircle },
  processing: { label: 'Em Análise', color: 'gold', Icon: Clock },
}

const SEARCH_CFG = {
  found: { label: 'Encontrado', color: 'green' },
  not_found: { label: 'Não Encontrado', color: 'red' },
}

function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 text-left ${
        active
          ? 'bg-gold-500/15 text-gold-400 border border-gold-500/20'
          : 'text-white/50 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={17} />
      <span className="font-medium">{label}</span>
      {active && <ChevronRight size={14} className="ml-auto" />}
    </button>
  )
}

function DashboardHome({ user }) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1">Olá, {user.name.split(' ')[0]} 👋</h2>
        <p className="text-sm text-white/40">Bem-vindo à sua área pessoal FINDOC</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Documentos', value: user.documents.length, icon: FileText, color: 'text-gold-400' },
          { label: 'Pesquisas', value: user.searches.length, icon: Search, color: 'text-blue-400' },
          { label: 'Encontrados', value: user.searches.filter(s => s.result === 'found').length, icon: CheckCircle, color: 'text-emerald-400' },
          { label: 'Alertas', value: 0, icon: Bell, color: 'text-white/30' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="card-premium"
          >
            <s.icon size={20} className={`${s.color} mb-3`} />
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-white/35">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Verification status */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card-premium border-emerald-500/20 mb-6"
      >
        <div className="flex items-center gap-3">
          <CheckCircle size={20} className="text-emerald-400" />
          <div>
            <p className="text-sm font-semibold">Conta Verificada</p>
            <p className="text-xs text-white/35">A sua identidade foi verificada com sucesso</p>
          </div>
          <Badge variant="green" className="ml-auto">Verificado</Badge>
        </div>
      </motion.div>

      {/* Recent activity */}
      <h3 className="font-semibold mb-4 text-sm text-white/60 uppercase tracking-wider">Actividade Recente</h3>
      <div className="space-y-3">
        {user.searches.slice(0, 3).map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.07 }}
            className="glass-dark border border-white/5 rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-petroleum-600/50 flex items-center justify-center">
                <Search size={14} className="text-gold-400/60" />
              </div>
              <div>
                <p className="text-sm font-mono">{s.query}</p>
                <p className="text-xs text-white/30">{new Date(s.date).toLocaleDateString('pt-AO')}</p>
              </div>
            </div>
            <Badge variant={SEARCH_CFG[s.result]?.color || 'gray'}>
              {SEARCH_CFG[s.result]?.label || 'Desconhecido'}
            </Badge>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function MyDocuments({ user }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-1">Meus Documentos</h2>
          <p className="text-sm text-white/40">Gerir os seus documentos registados</p>
        </div>
        <Button variant="gold" size="sm">
          <Plus size={16} /> Adicionar
        </Button>
      </div>

      <div className="space-y-4">
        {user.documents.map((doc, i) => {
          const s = STATUS_CFG[doc.status]
          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card-premium group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-petroleum-600/50 border border-white/5 flex items-center justify-center group-hover:border-gold-500/15 transition-colors">
                    <FileText size={20} className="text-gold-400/70" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{doc.type}</h4>
                    <p className="text-xs font-mono text-white/35 mt-0.5">{doc.number}</p>
                    <p className="text-xs text-white/25 mt-1">
                      <Calendar size={10} className="inline mr-1" />
                      Registado em {new Date(doc.registered).toLocaleDateString('pt-AO')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={s.color}>
                    <s.Icon size={10} /> {s.label}
                  </Badge>
                  <button className="p-1.5 text-white/20 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function SearchHistory({ user }) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1">Histórico de Pesquisas</h2>
        <p className="text-sm text-white/40">As suas pesquisas anteriores</p>
      </div>

      <div className="space-y-3">
        {user.searches.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card-premium"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-petroleum-600/50 flex items-center justify-center">
                  <Search size={15} className="text-gold-400/60" />
                </div>
                <div>
                  <p className="font-mono text-sm font-medium">{s.query}</p>
                  <p className="text-xs text-white/30 mt-0.5">
                    {new Date(s.date).toLocaleDateString('pt-AO', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={SEARCH_CFG[s.result]?.color || 'gray'}>
                  {SEARCH_CFG[s.result]?.label}
                </Badge>
                <button className="text-xs text-gold-400/60 hover:text-gold-400 transition-colors">
                  Repetir
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Profile({ user }) {
  const [editing, setEditing] = useState(false)
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-1">Meu Perfil</h2>
          <p className="text-sm text-white/40">As suas informações pessoais</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setEditing(!editing)}>
          <Edit3 size={15} /> {editing ? 'Cancelar' : 'Editar'}
        </Button>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-5 mb-8 p-5 glass-dark border border-white/5 rounded-2xl">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gold-500/15 border-2 border-gold-500/25 flex items-center justify-center">
            <User size={32} className="text-gold-400" />
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-gold-500 rounded-full flex items-center justify-center shadow-lg">
            <Upload size={12} className="text-petroleum-800" />
          </button>
        </div>
        <div>
          <h3 className="font-bold text-lg">{user.name}</h3>
          <p className="text-sm text-white/40">{user.email}</p>
          <Badge variant="green" className="mt-2">
            <CheckCircle size={10} /> Conta Verificada
          </Badge>
        </div>
      </div>

      {/* Info fields */}
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { label: 'Nome Completo', icon: User, value: user.name },
          { label: 'Email', icon: Mail, value: user.email },
          { label: 'Telefone', icon: Phone, value: user.phone },
          { label: 'BI / NIF', icon: Shield, value: user.bi },
          { label: 'Província', icon: MapPin, value: user.province },
          { label: 'Membro desde', icon: Calendar, value: new Date(user.joinDate).toLocaleDateString('pt-AO') },
        ].map((field) => (
          <div key={field.label}>
            {editing && field.label !== 'Membro desde' && field.label !== 'BI / NIF' ? (
              <Input
                label={field.label}
                icon={field.icon}
                defaultValue={field.value}
              />
            ) : (
              <div className="glass-dark border border-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1.5 text-white/30">
                  <field.icon size={13} />
                  <span className="text-xs">{field.label}</span>
                </div>
                <p className="text-sm font-medium">{field.value}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {editing && (
        <div className="mt-5 flex gap-3">
          <Button variant="gold">Guardar Alterações</Button>
          <Button variant="ghost" onClick={() => setEditing(false)}>Cancelar</Button>
        </div>
      )}
    </div>
  )
}

function AccountSecurity() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1">Segurança da Conta</h2>
        <p className="text-sm text-white/40">Proteja a sua conta FINDOC</p>
      </div>

      <div className="space-y-4">
        {[
          {
            icon: Lock, title: 'Palavra-passe', desc: 'Última alteração há 30 dias',
            action: 'Alterar', status: null,
          },
          {
            icon: Shield, title: 'Verificação em dois passos', desc: 'Adicione uma camada extra de segurança',
            action: 'Activar', status: null,
          },
          {
            icon: Eye, title: 'Sessões activas', desc: '1 dispositivo activo',
            action: 'Ver todas', status: null,
          },
          {
            icon: AlertCircle, title: 'Notificações de segurança', desc: 'Receber alertas por email',
            action: 'Configurar', status: 'Activo',
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="card-premium flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-petroleum-600/50 border border-white/5 flex items-center justify-center">
                <item.icon size={18} className="text-gold-400/70" />
              </div>
              <div>
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-xs text-white/35">{item.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {item.status && <Badge variant="green">{item.status}</Badge>}
              <Button variant="ghost" size="sm">{item.action}</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const TABS = [
  { id: 'home', label: 'Início', icon: Home },
  { id: 'documents', label: 'Meus Documentos', icon: FileText },
  { id: 'searches', label: 'Histórico', icon: Search },
  { id: 'profile', label: 'Perfil', icon: User },
  { id: 'security', label: 'Segurança', icon: Shield },
  { id: 'settings', label: 'Definições', icon: Settings },
]

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')
  const [mobileNav, setMobileNav] = useState(false)

  if (!user) return <Navigate to="/" replace />

  const tabProps = { user }
  const content = {
    home: <DashboardHome {...tabProps} />,
    documents: <MyDocuments {...tabProps} />,
    searches: <SearchHistory {...tabProps} />,
    profile: <Profile {...tabProps} />,
    security: <AccountSecurity />,
    settings: (
      <div className="text-center py-20">
        <Settings size={40} className="text-white/15 mx-auto mb-4" />
        <p className="text-white/30">Definições em desenvolvimento</p>
      </div>
    ),
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container-max px-4 md:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="hidden md:flex flex-col w-64 flex-shrink-0">
            <div className="glass-dark border border-white/5 rounded-2xl p-4 sticky top-28">
              {/* User mini */}
              <div className="flex items-center gap-3 p-3 mb-4 border-b border-white/5 pb-4">
                <div className="w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-500/25 flex items-center justify-center">
                  <User size={16} className="text-gold-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{user.name.split(' ')[0]}</p>
                  <p className="text-xs text-white/30 truncate">{user.email}</p>
                </div>
              </div>

              <nav className="flex flex-col gap-1">
                {TABS.map((tab) => (
                  <NavItem
                    key={tab.id}
                    icon={tab.icon}
                    label={tab.label}
                    active={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  />
                ))}
              </nav>

              <div className="mt-4 pt-4 border-t border-white/5">
                <button
                  onClick={() => { logout(); navigate('/') }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all text-left"
                >
                  <LogOut size={17} /> Terminar Sessão
                </button>
              </div>
            </div>
          </div>

          {/* Mobile nav */}
          <div className="md:hidden w-full mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gold-500/15 text-gold-400 border border-gold-500/20'
                      : 'glass border border-white/5 text-white/40'
                  }`}
                >
                  <tab.icon size={13} /> {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {content[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
