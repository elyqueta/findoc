import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  FileText, Upload, CheckCircle, ChevronDown, Calendar,
  User, Hash, Building2, MapPin, MessageSquare, ArrowLeft,
  X, Image, AlertCircle, Loader2, Shield, Sparkles
} from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'

const DOCUMENT_TYPES = [
  { value: 'bi', label: 'Bilhete de Identidade' },
  { value: 'passport', label: 'Passaporte' },
  { value: 'license', label: 'Carta de Condução' },
  { value: 'voter', label: 'Cartão de Eleitor' },
  { value: 'military', label: 'Documento Militar' },
  { value: 'residence', label: 'Título de Residência' },
  { value: 'other', label: 'Outro' },
]

function SelectField({ label, icon: Icon, value, onChange, options, error, placeholder }) {
  const [open, setOpen] = useState(false)
  const selected = options.find(o => o.value === value)

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-white/70">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none z-10">
            <Icon size={18} />
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`w-full glass-dark rounded-xl py-3 pl-10 pr-10 text-left text-sm border transition-all duration-200
            ${error ? 'border-red-500/50' : 'border-white/10 focus:border-gold-500/50'}
            ${selected ? 'text-white' : 'text-white/30'}
          `}
        >
          {selected ? selected.label : placeholder || 'Seleccionar...'}
        </button>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} />
          </motion.div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full mt-1 left-0 right-0 z-50 glass-dark border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false) }}
                  className={`w-full text-left px-4 py-3 text-sm transition-all hover:bg-gold-500/10
                    ${value === opt.value ? 'text-gold-400 bg-gold-500/8' : 'text-white/70'}
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

function UploadZone({ label, file, onFile, onClear, hint }) {
  const ref = useRef()

  const handleDrop = (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f && f.type.startsWith('image/')) onFile(f)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-white/70">{label}</label>
      {file ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative glass-dark border border-gold-500/25 rounded-xl overflow-hidden"
        >
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-petroleum-900/40 flex items-end p-3">
            <span className="text-xs text-white/80 truncate flex-1">{file.name}</span>
            <button
              type="button"
              onClick={onClear}
              className="ml-2 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        </motion.div>
      ) : (
        <div
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => ref.current?.click()}
          className="glass-dark border-2 border-dashed border-white/10 hover:border-gold-500/30 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 group hover:bg-gold-500/3"
        >
          <input
            ref={ref}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => e.target.files[0] && onFile(e.target.files[0])}
          />
          <Image size={24} className="text-white/20 group-hover:text-gold-400/50 mx-auto mb-2 transition-colors" />
          <p className="text-xs text-white/35 group-hover:text-white/50 transition-colors">
            Clique ou arraste a imagem
          </p>
          {hint && <p className="text-[10px] text-white/20 mt-1">{hint}</p>}
        </div>
      )}
    </div>
  )
}

function SuccessOverlay({ docType, onDone }) {
  const label = DOCUMENT_TYPES.find(d => d.value === docType)?.label || 'Documento'
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-petroleum-900/90 backdrop-blur-xl" />
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280, delay: 0.1 }}
        className="relative glass-dark border border-gold-500/20 rounded-3xl p-10 max-w-md w-full text-center shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-gradient-to-r from-transparent via-gold-500/70 to-transparent rounded-full" />

        {/* Animated checkmark */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-gold-500/10 animate-pulse" />
          <div className="absolute inset-2 rounded-full bg-gold-500/15 border border-gold-500/25 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 400 }}
            >
              <CheckCircle size={32} className="text-gold-400" />
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <p className="text-xs font-semibold tracking-widest text-gold-500/60 uppercase mb-3">
            Cadastro Concluído
          </p>
          <h2 className="text-2xl font-display font-bold mb-2">Documento cadastrado!</h2>
          <p className="text-sm text-white/45 mb-8 leading-relaxed">
            O seu <span className="text-white/70">{label}</span> foi registado com sucesso no sistema FINDOC e adicionado ao seu perfil.
          </p>
          <Button variant="gold" size="lg" className="w-full" onClick={onDone}>
            <Shield size={16} /> Ver Meus Documentos
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const STEPS = [
  { id: 1, label: 'Tipo & Número' },
  { id: 2, label: 'Dados Pessoais' },
  { id: 3, label: 'Datas & Entidade' },
  { id: 4, label: 'Imagens' },
]

export default function RegisterDocumentPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    docType: '',
    docNumber: '',
    fullName: '',
    issueDate: '',
    expiryDate: '',
    issuer: '',
    issuePlace: '',
    notes: '',
  })
  const [frontImg, setFrontImg] = useState(null)
  const [backImg, setBackImg] = useState(null)

  const set = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }))
  }

  const validateStep = () => {
    const errs = {}
    if (step === 1) {
      if (!form.docType) errs.docType = 'Seleccione o tipo de documento'
      if (!form.docNumber.trim()) errs.docNumber = 'Número do documento é obrigatório'
    }
    if (step === 2) {
      if (!form.fullName.trim()) errs.fullName = 'Nome completo é obrigatório'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const nextStep = () => {
    if (validateStep()) setStep(s => Math.min(s + 1, 4))
  }
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    setSuccess(true)
  }

  const handleDone = () => navigate('/dashboard')

  const stepContent = {
    1: (
      <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="flex flex-col gap-5">
        <SelectField
          label="Tipo de Documento"
          icon={FileText}
          value={form.docType}
          onChange={v => set('docType', v)}
          options={DOCUMENT_TYPES}
          error={errors.docType}
          placeholder="Seleccione o tipo..."
        />
        <Input
          label="Número do Documento"
          icon={Hash}
          placeholder="Ex: 004523178LA045"
          value={form.docNumber}
          onChange={e => set('docNumber', e.target.value)}
          error={errors.docNumber}
        />
      </motion.div>
    ),
    2: (
      <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="flex flex-col gap-5">
        <Input
          label="Nome Completo"
          icon={User}
          placeholder="Ex: Carlos Manuel Silva"
          value={form.fullName}
          onChange={e => set('fullName', e.target.value)}
          error={errors.fullName}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-white/70">Observações</label>
          <textarea
            placeholder="Informações adicionais sobre o documento..."
            value={form.notes}
            onChange={e => set('notes', e.target.value)}
            rows={4}
            className="w-full glass-dark rounded-xl py-3 px-4 text-white placeholder-white/30 border border-white/10 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all duration-200 text-sm resize-none"
          />
        </div>
      </motion.div>
    ),
    3: (
      <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Data de Emissão"
            icon={Calendar}
            type="date"
            value={form.issueDate}
            onChange={e => set('issueDate', e.target.value)}
          />
          <Input
            label="Data de Validade"
            icon={Calendar}
            type="date"
            value={form.expiryDate}
            onChange={e => set('expiryDate', e.target.value)}
          />
        </div>
        <Input
          label="Entidade Emissora"
          icon={Building2}
          placeholder="Ex: Ministério do Interior"
          value={form.issuer}
          onChange={e => set('issuer', e.target.value)}
        />
        <Input
          label="Local de Emissão"
          icon={MapPin}
          placeholder="Ex: Luanda"
          value={form.issuePlace}
          onChange={e => set('issuePlace', e.target.value)}
        />
      </motion.div>
    ),
    4: (
      <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="flex flex-col gap-5">
        <UploadZone
          label="Frente do Documento"
          file={frontImg}
          onFile={setFrontImg}
          onClear={() => setFrontImg(null)}
          hint="JPG, PNG ou WebP · Máx. 5MB"
        />
        <UploadZone
          label="Verso do Documento (Opcional)"
          file={backImg}
          onFile={setBackImg}
          onClear={() => setBackImg(null)}
          hint="Opcional · JPG, PNG ou WebP"
        />
        <div className="glass-dark border border-white/5 rounded-xl p-4 flex gap-3">
          <AlertCircle size={16} className="text-gold-400/60 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-white/40 leading-relaxed">
            As imagens são armazenadas localmente para referência pessoal. Não são enviadas para nenhum servidor externo.
          </p>
        </div>
      </motion.div>
    ),
  }

  return (
    <>
      {success && <SuccessOverlay docType={form.docType} onDone={handleDone} />}

      <div className="min-h-screen pt-28 pb-20 px-4 md:px-8">
        <div className="container-max max-w-2xl">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Voltar ao Dashboard
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-5">
              <Sparkles size={24} className="text-gold-400" />
            </div>
            <p className="text-xs font-semibold tracking-widest text-gold-500/70 uppercase mb-3">
              Registo de Documentos
            </p>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
              Cadastrar <span className="text-gradient-gold">Documento</span>
            </h1>
            <p className="text-white/40 text-sm max-w-md mx-auto">
              Registe os seus documentos pessoais de forma segura e privada no sistema FINDOC.
            </p>
          </motion.div>

          {/* Step indicator */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between mb-8"
          >
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1.5">
                  <motion.div
                    animate={{
                      background: step > s.id
                        ? 'linear-gradient(135deg, #F5B21B, #fcd97a)'
                        : step === s.id
                          ? 'rgba(245,178,27,0.15)'
                          : 'rgba(255,255,255,0.05)',
                      borderColor: step >= s.id ? 'rgba(245,178,27,0.5)' : 'rgba(255,255,255,0.08)',
                    }}
                    className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
                  >
                    {step > s.id ? (
                      <CheckCircle size={16} className="text-petroleum-800" />
                    ) : (
                      <span className={`text-xs font-bold ${step === s.id ? 'text-gold-400' : 'text-white/25'}`}>
                        {s.id}
                      </span>
                    )}
                  </motion.div>
                  <span className={`text-[10px] font-medium hidden sm:block ${step === s.id ? 'text-gold-400' : 'text-white/25'}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-px mx-2 mt-[-14px]">
                    <motion.div
                      animate={{ opacity: step > s.id ? 1 : 0.2 }}
                      className="h-full bg-gradient-to-r from-gold-500/60 to-gold-500/20"
                    />
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-dark border border-white/8 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
          >
            {/* Card top accent */}
            <div className="h-0.5 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h3 className="font-semibold text-base">{STEPS[step - 1].label}</h3>
                <p className="text-xs text-white/35 mt-1">Passo {step} de {STEPS.length}</p>
              </div>

              <AnimatePresence mode="wait">
                {stepContent[step]}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={prevStep}
                  disabled={step === 1}
                  className={step === 1 ? 'opacity-0 pointer-events-none' : ''}
                >
                  <ArrowLeft size={16} /> Anterior
                </Button>

                {step < 4 ? (
                  <Button variant="gold" size="md" onClick={nextStep}>
                    Próximo →
                  </Button>
                ) : (
                  <Button
                    variant="gold"
                    size="md"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        A registar...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        Cadastrar Documento
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-xs text-white/20 mt-6 flex items-center justify-center gap-2"
          >
            <Shield size={12} className="text-gold-500/40" />
            Os dados são armazenados localmente e protegidos com criptografia AES-256
          </motion.p>
        </div>
      </div>
    </>
  )
}