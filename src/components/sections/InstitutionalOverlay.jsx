import { motion } from 'framer-motion'

function GridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(245,178,27,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245,178,27,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)',
        zIndex: 0,
      }}
    />
  )
}

function ScanLine({ top, delay = 0, width = '60%', opacity = 0.06 }) {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 h-px"
      style={{ top, width, background: 'linear-gradient(90deg, transparent, rgba(245,178,27,0.8), transparent)', opacity }}
      animate={{ opacity: [opacity, opacity * 3, opacity] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

function CornerBracket({ position = 'tl', size = 20, color = 'rgba(245,178,27,0.25)', className = '' }) {
  const styles = {
    tl: { top: 0, left: 0, borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` },
    tr: { top: 0, right: 0, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` },
    bl: { bottom: 0, left: 0, borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` },
    br: { bottom: 0, right: 0, borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` },
  }
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{ ...styles[position], width: size, height: size }}
    />
  )
}

function HUDPanel({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: 'easeOut' }}
      className={`absolute pointer-events-none hidden xl:block ${className}`}
    >
      <div className="relative" style={{ background: 'rgba(6,59,59,0.45)', border: '1px solid rgba(245,178,27,0.15)', borderRadius: 6, backdropFilter: 'blur(8px)', padding: '10px 14px' }}>
        <CornerBracket position="tl" size={8} color="rgba(245,178,27,0.5)" />
        <CornerBracket position="tr" size={8} color="rgba(245,178,27,0.5)" />
        <CornerBracket position="bl" size={8} color="rgba(245,178,27,0.5)" />
        <CornerBracket position="br" size={8} color="rgba(245,178,27,0.5)" />
        {children}
      </div>
    </motion.div>
  )
}

function PulsingDot({ color = '#F5B21B', delay = 0 }) {
  return (
    <span className="relative inline-flex" style={{ width: 8, height: 8 }}>
      <motion.span
        className="absolute inline-flex rounded-full"
        style={{ background: color, width: 8, height: 8, opacity: 0.4 }}
        animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, delay }}
      />
      <span className="relative inline-flex rounded-full" style={{ background: color, width: 8, height: 8 }} />
    </span>
  )
}

function CoordDisplay({ value, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <span style={{ fontSize: 8, color: 'rgba(245,178,27,0.45)', letterSpacing: '0.08em', fontFamily: 'monospace' }}>{label}</span>
      <span style={{ fontSize: 10, color: 'rgba(245,178,27,0.8)', fontFamily: 'monospace', letterSpacing: '0.05em' }}>{value}</span>
    </div>
  )
}

function RadarArc({ size = 80, delay = 0 }) {
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '100%', height: '100%' }}>
        <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} fill="none" stroke="rgba(245,178,27,0.12)" strokeWidth="0.8" />
        <circle cx={size / 2} cy={size / 2} r={size / 3} fill="none" stroke="rgba(245,178,27,0.08)" strokeWidth="0.6" />
        <circle cx={size / 2} cy={size / 2} r={size / 6} fill="rgba(245,178,27,0.05)" stroke="rgba(245,178,27,0.15)" strokeWidth="0.6" />
        <motion.line
          x1={size / 2} y1={size / 2}
          x2={size / 2} y2={2}
          stroke="rgba(245,178,27,0.5)" strokeWidth="1"
          style={{ transformOrigin: `${size / 2}px ${size / 2}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay }}
        />
        <line x1={size / 2} y1="2" x2={size / 2} y2={size - 2} stroke="rgba(245,178,27,0.06)" strokeWidth="0.5" />
        <line x1="2" y1={size / 2} x2={size - 2} y2={size / 2} stroke="rgba(245,178,27,0.06)" strokeWidth="0.5" />
      </svg>
    </div>
  )
}

function WavePattern({ className = '' }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      <svg viewBox="0 0 200 60" style={{ width: 200, height: 60 }}>
        {[0, 1, 2, 3].map(i => (
          <motion.path
            key={i}
            d={`M0 ${30 + i * 8} Q50 ${22 + i * 8} 100 ${30 + i * 8} T200 ${30 + i * 8}`}
            fill="none"
            stroke="rgba(245,178,27,0.12)"
            strokeWidth="0.6"
            animate={{ d: [`M0 ${30 + i * 8} Q50 ${22 + i * 8} 100 ${30 + i * 8} T200 ${30 + i * 8}`, `M0 ${30 + i * 8} Q50 ${38 + i * 8} 100 ${30 + i * 8} T200 ${30 + i * 8}`, `M0 ${30 + i * 8} Q50 ${22 + i * 8} 100 ${30 + i * 8} T200 ${30 + i * 8}`] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

export default function InstitutionalOverlay() {
  return (
    <>
      <GridOverlay />

      {/* Scan lines — atmosphere */}
      <ScanLine top="22%" delay={0} width="55%" opacity={0.05} />
      <ScanLine top="58%" delay={1.4} width="40%" opacity={0.04} />
      <ScanLine top="80%" delay={2.8} width="30%" opacity={0.035} />

      {/* Top-left: coordinates HUD */}
      <HUDPanel className="top-32 left-8" delay={1.2}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <RadarArc size={52} delay={0} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <CoordDisplay label="LAT" value="-8.8159° S" />
            <CoordDisplay label="LON" value="13.2306° E" />
            <CoordDisplay label="REG" value="LUANDA-AO" />
          </div>
        </div>
      </HUDPanel>

      {/* Bottom-right: system status HUD */}
      <HUDPanel className="bottom-36 right-8" delay={1.5}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[
            { label: 'SISTEMA', status: 'OPERACIONAL', active: true },
            { label: 'REDE', status: '347 NÓS', active: true },
            { label: 'CIFRA', status: 'AES-256', active: true },
            { label: 'SINCRONIZAÇÃO', status: 'ACTIVO', active: true },
          ].map(({ label, status, active }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <PulsingDot color={active ? '#F5B21B' : 'rgba(245,178,27,0.3)'} />
              <span style={{ fontSize: 8, color: 'rgba(245,178,27,0.4)', letterSpacing: '0.1em', fontFamily: 'monospace', minWidth: 90 }}>{label}</span>
              <span style={{ fontSize: 9, color: 'rgba(245,178,27,0.75)', letterSpacing: '0.05em', fontFamily: 'monospace' }}>{status}</span>
            </div>
          ))}
        </div>
      </HUDPanel>

      {/* Top-right: auth verification mini panel */}
      <HUDPanel className="top-36 right-8" delay={1.8} >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 130 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', border: '1px solid rgba(245,178,27,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none"><path d="M8 2L10 6L14 6.5L11 9.5L11.5 14L8 12L4.5 14L5 9.5L2 6.5L6 6Z" stroke="rgba(245,178,27,0.8)" strokeWidth="1" fill="rgba(245,178,27,0.15)" /></svg>
            </div>
            <span style={{ fontSize: 9, color: 'rgba(245,178,27,0.7)', fontFamily: 'monospace', letterSpacing: '0.08em' }}>CERT. MINISTÉRIO</span>
          </div>
          <div style={{ height: '1px', background: 'rgba(245,178,27,0.1)' }} />
          <div style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(245,178,27,0.4)', lineHeight: 1.6 }}>
            <div>PROTOCOLO: HTTPS/2</div>
            <div>TOKEN: ██████████</div>
            <div>STATUS: VERIFICADO ✓</div>
          </div>
        </div>
      </HUDPanel>

      {/* Wave patterns — bottom decoration */}
      <WavePattern className="bottom-16 left-4 opacity-60" />
      <WavePattern className="top-16 right-4 opacity-40" />

      {/* Ambient light orbs */}
      <div className="absolute pointer-events-none" style={{ top: '10%', left: '15%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,178,27,0.04) 0%, transparent 70%)', zIndex: 0 }} />
      <div className="absolute pointer-events-none" style={{ bottom: '15%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(11,79,79,0.3) 0%, transparent 70%)', zIndex: 0 }} />
    </>
  )
}
