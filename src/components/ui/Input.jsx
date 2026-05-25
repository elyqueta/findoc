import clsx from 'clsx'

export default function Input({
  label,
  icon: Icon,
  error,
  className = '',
  containerClass = '',
  ...props
}) {
  return (
    <div className={clsx('flex flex-col gap-1.5', containerClass)}>
      {label && (
        <label className="text-sm font-medium text-white/70">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
            <Icon size={18} />
          </div>
        )}
        <input
          className={clsx(
            'w-full glass-dark rounded-xl py-3 pr-4 text-white placeholder-white/30',
            'border border-white/10 focus:border-gold-500/50 focus:outline-none',
            'focus:ring-2 focus:ring-gold-500/20 transition-all duration-200 text-sm',
            Icon ? 'pl-10' : 'pl-4',
            error && 'border-red-500/50 focus:border-red-500/50',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
