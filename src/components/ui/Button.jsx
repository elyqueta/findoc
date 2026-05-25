import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function Button({
  children,
  variant = 'gold',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    gold: 'bg-gold-500 text-petroleum-800 hover:bg-gold-400 shadow-[0_4px_20px_rgba(245,178,27,0.3)] hover:shadow-[0_6px_28px_rgba(245,178,27,0.45)]',
    ghost: 'glass text-white border border-white/10 hover:border-gold-500/30 hover:bg-petroleum-500/40',
    outline: 'border border-gold-500/40 text-gold-500 hover:bg-gold-500/10',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { y: -1 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  )
}
