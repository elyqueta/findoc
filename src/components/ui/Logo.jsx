import { FileSearch } from 'lucide-react'

export default function Logo({ size = 'md', className = '' }) {
  const sizes = {
    sm: { icon: 18, text: 'text-lg' },
    md: { icon: 22, text: 'text-xl' },
    lg: { icon: 28, text: 'text-3xl' },
  }
  const s = sizes[size]

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 rounded-lg bg-gold-500/20 blur-md" />
        <div className="relative bg-gradient-to-br from-petroleum-600 to-petroleum-700 border border-gold-500/30 rounded-lg p-1.5">
          <FileSearch size={s.icon} className="text-gold-500" />
        </div>
      </div>
      <span className={`font-display font-bold ${s.text} tracking-tight`}>
        FIN<span className="text-gradient-gold">DOC</span>
      </span>
    </div>
  )
}
