import clsx from 'clsx'

export default function Badge({ children, variant = 'gold', className = '' }) {
  const variants = {
    gold: 'bg-gold-500/15 text-gold-400 border-gold-500/25',
    green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    blue: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
    red: 'bg-red-500/15 text-red-400 border-red-500/25',
    gray: 'bg-white/5 text-white/60 border-white/10',
  }
  return (
    <span className={clsx(
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border tracking-wide',
      variants[variant], className
    )}>
      {children}
    </span>
  )
}
