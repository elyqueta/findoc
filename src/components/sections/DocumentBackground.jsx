import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

function AngolaPassport({ opacity = 0.12, rotate = -8, scale = 1 }) {
  return (
    <svg
      viewBox="0 0 200 280"
      style={{ width: '100%', height: '100%', opacity, transform: `rotate(${rotate}deg) scale(${scale})` }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#063B3B" />
          <stop offset="100%" stopColor="#0B4F4F" />
        </linearGradient>
        <linearGradient id="pg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5B21B" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fcd97a" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* Passport body */}
      <rect x="4" y="4" width="192" height="272" rx="8" fill="url(#pg1)" stroke="#F5B21B" strokeWidth="0.8" strokeOpacity="0.5" />
      {/* Top decorative strip */}
      <rect x="4" y="4" width="192" height="38" rx="8" fill="#0A4545" />
      <rect x="4" y="32" width="192" height="10" fill="#0A4545" />
      {/* Country text area */}
      <text x="100" y="24" textAnchor="middle" fill="#F5B21B" fontSize="8" fontWeight="600" fontFamily="sans-serif" letterSpacing="3">REPÚBLICA DE ANGOLA</text>
      <text x="100" y="35" textAnchor="middle" fill="#F5B21B" fontSize="6" fontFamily="sans-serif" letterSpacing="2" opacity="0.7">PASSAPORTE · PASSPORT</text>
      {/* Emblem circle */}
      <circle cx="100" cy="90" r="34" fill="none" stroke="#F5B21B" strokeWidth="0.6" strokeOpacity="0.4" />
      <circle cx="100" cy="90" r="28" fill="#F5B21B" fillOpacity="0.08" stroke="#F5B21B" strokeWidth="0.4" strokeOpacity="0.3" />
      {/* Simplified emblem */}
      <path d="M100 66 L104 78 L116 78 L107 86 L110 98 L100 90 L90 98 L93 86 L84 78 L96 78 Z" fill="#F5B21B" fillOpacity="0.5" />
      <circle cx="100" cy="90" r="8" fill="none" stroke="#F5B21B" strokeWidth="0.8" strokeOpacity="0.6" />
      {/* Photo placeholder */}
      <rect x="30" y="132" width="52" height="66" rx="3" fill="#0A4545" stroke="#F5B21B" strokeWidth="0.4" strokeOpacity="0.4" />
      <rect x="35" y="137" width="42" height="36" rx="2" fill="#063B3B" />
      <ellipse cx="56" cy="155" rx="12" ry="10" fill="#0B4F4F" stroke="#F5B21B" strokeWidth="0.3" strokeOpacity="0.3" />
      <rect x="40" y="163" width="32" height="6" rx="3" fill="#0B4F4F" stroke="#F5B21B" strokeWidth="0.3" strokeOpacity="0.3" />
      {/* Data lines */}
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x="92" y={132 + i * 13} width={80 - i * 8} height="4" rx="2" fill="#F5B21B" fillOpacity="0.15" />
      ))}
      {/* MRZ Zone */}
      <rect x="10" y="218" width="180" height="48" rx="4" fill="#0A4545" stroke="#F5B21B" strokeWidth="0.3" strokeOpacity="0.25" />
      <text x="18" y="232" fill="#F5B21B" fontSize="5.5" fontFamily="monospace" opacity="0.5">P&lt;AGO&lt;&lt;SILVA&lt;&lt;CARLOS&lt;&lt;MANUEL&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</text>
      <text x="18" y="244" fill="#F5B21B" fontSize="5.5" fontFamily="monospace" opacity="0.5">N001234567&lt;0AGO8501015M2811301&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</text>
      <text x="18" y="256" fill="#F5B21B" fontSize="5.5" fontFamily="monospace" opacity="0.4">AO9523178LA045&lt;&lt;8A&lt;&lt;&lt;0&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</text>
      {/* Security pattern */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <circle key={i} cx={20 + i * 22} cy="210" r="1.5" fill="#F5B21B" fillOpacity="0.2" />
      ))}
    </svg>
  )
}

function AngolaBI({ opacity = 0.1, rotate = 6, scale = 1 }) {
  return (
    <svg
      viewBox="0 0 320 200"
      style={{ width: '100%', height: '100%', opacity, transform: `rotate(${rotate}deg) scale(${scale})` }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="big1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#052E2E" />
          <stop offset="100%" stopColor="#0B4F4F" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="314" height="194" rx="10" fill="url(#big1)" stroke="#F5B21B" strokeWidth="0.8" strokeOpacity="0.45" />
      {/* Header band */}
      <rect x="3" y="3" width="314" height="36" rx="10" fill="#063B3B" />
      <rect x="3" y="28" width="314" height="11" fill="#063B3B" />
      <text x="160" y="18" textAnchor="middle" fill="#F5B21B" fontSize="9" fontWeight="600" fontFamily="sans-serif" letterSpacing="2.5">REPÚBLICA DE ANGOLA</text>
      <text x="160" y="29" textAnchor="middle" fill="#F5B21B" fontSize="6.5" fontFamily="sans-serif" letterSpacing="1.5" opacity="0.7">BILHETE DE IDENTIDADE</text>
      {/* Photo area */}
      <rect x="16" y="50" width="72" height="90" rx="5" fill="#052E2E" stroke="#F5B21B" strokeWidth="0.5" strokeOpacity="0.4" />
      <ellipse cx="52" cy="80" rx="18" ry="16" fill="#0B4F4F" stroke="#F5B21B" strokeWidth="0.3" strokeOpacity="0.3" />
      <rect x="26" y="96" width="52" height="10" rx="5" fill="#0B4F4F" />
      {/* Angola flag colors strip */}
      <rect x="16" y="148" width="72" height="5" rx="2" fill="#CC0000" fillOpacity="0.7" />
      <rect x="16" y="155" width="72" height="5" rx="2" fill="#000000" fillOpacity="0.5" />
      <rect x="16" y="160" width="72" height="5" rx="2" fill="#F5B21B" fillOpacity="0.6" />
      {/* Data fields */}
      <text x="102" y="62" fill="#F5B21B" fontSize="6" fontFamily="sans-serif" opacity="0.5" letterSpacing="0.5">APELIDO · SURNAME</text>
      <rect x="102" y="65" width="120" height="7" rx="2" fill="#F5B21B" fillOpacity="0.12" />
      <text x="102" y="84" fill="#F5B21B" fontSize="6" fontFamily="sans-serif" opacity="0.5" letterSpacing="0.5">NOME · GIVEN NAMES</text>
      <rect x="102" y="87" width="140" height="7" rx="2" fill="#F5B21B" fillOpacity="0.12" />
      <text x="102" y="106" fill="#F5B21B" fontSize="6" fontFamily="sans-serif" opacity="0.5" letterSpacing="0.5">Nº BI</text>
      <rect x="102" y="109" width="90" height="7" rx="2" fill="#F5B21B" fillOpacity="0.12" />
      <text x="200" y="106" fill="#F5B21B" fontSize="6" fontFamily="sans-serif" opacity="0.5" letterSpacing="0.5">DATA NASCIMENTO</text>
      <rect x="200" y="109" width="100" height="7" rx="2" fill="#F5B21B" fillOpacity="0.12" />
      <text x="102" y="128" fill="#F5B21B" fontSize="6" fontFamily="sans-serif" opacity="0.5" letterSpacing="0.5">VALIDADE · EXPIRY</text>
      <rect x="102" y="131" width="70" height="7" rx="2" fill="#F5B21B" fillOpacity="0.12" />
      {/* MRZ */}
      <rect x="16" y="168" width="288" height="22" rx="4" fill="#052E2E" stroke="#F5B21B" strokeWidth="0.3" strokeOpacity="0.2" />
      <text x="22" y="179" fill="#F5B21B" fontSize="5" fontFamily="monospace" opacity="0.45">IDAGO004523178LA045&lt;&lt;&lt;0&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</text>
      <text x="22" y="186" fill="#F5B21B" fontSize="5" fontFamily="monospace" opacity="0.45">8501015M2811301AGO&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;5SILVA&lt;&lt;CARLOS&lt;&lt;MANUEL</text>
      {/* Chip */}
      <rect x="238" y="130" width="38" height="28" rx="4" fill="#F5B21B" fillOpacity="0.15" stroke="#F5B21B" strokeWidth="0.6" strokeOpacity="0.5" />
      <rect x="244" y="136" width="10" height="8" rx="1" fill="#F5B21B" fillOpacity="0.2" />
      <rect x="258" y="136" width="10" height="8" rx="1" fill="#F5B21B" fillOpacity="0.2" />
      <rect x="244" y="148" width="10" height="4" rx="1" fill="#F5B21B" fillOpacity="0.15" />
      <rect x="258" y="148" width="10" height="4" rx="1" fill="#F5B21B" fillOpacity="0.15" />
    </svg>
  )
}

function DriversLicense({ opacity = 0.09, rotate = 3, scale = 1 }) {
  return (
    <svg
      viewBox="0 0 320 200"
      style={{ width: '100%', height: '100%', opacity, transform: `rotate(${rotate}deg) scale(${scale})` }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="dlg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#031f1f" />
          <stop offset="100%" stopColor="#0B4F4F" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="314" height="194" rx="10" fill="url(#dlg1)" stroke="#F5B21B" strokeWidth="0.8" strokeOpacity="0.4" />
      {/* Left accent strip */}
      <rect x="3" y="3" width="28" height="194" rx="10" fill="#0A4545" />
      <rect x="22" y="3" width="9" height="194" fill="#0A4545" />
      {/* Vertical text */}
      <text x="17" y="140" textAnchor="middle" fill="#F5B21B" fontSize="7" fontFamily="sans-serif" letterSpacing="2" opacity="0.7" transform="rotate(-90, 17, 100)">CARTA DE CONDUÇÃO</text>
      {/* Header */}
      <text x="185" y="24" textAnchor="middle" fill="#F5B21B" fontSize="9" fontWeight="600" fontFamily="sans-serif" letterSpacing="2">ANGOLA</text>
      <text x="185" y="34" textAnchor="middle" fill="#F5B21B" fontSize="5.5" fontFamily="sans-serif" letterSpacing="1.5" opacity="0.6">DRIVING LICENCE · PERMIS DE CONDUIRE</text>
      {/* Photo */}
      <rect x="40" y="48" width="66" height="82" rx="5" fill="#052E2E" stroke="#F5B21B" strokeWidth="0.5" strokeOpacity="0.4" />
      <ellipse cx="73" cy="74" rx="17" ry="15" fill="#0B4F4F" stroke="#F5B21B" strokeWidth="0.3" strokeOpacity="0.3" />
      <rect x="51" y="88" width="44" height="8" rx="4" fill="#0B4F4F" />
      {/* Fields */}
      {[
        { label: '1. APELIDO', y: 52 },
        { label: '2. NOME', y: 70 },
        { label: '3. DATA NASC.', y: 88 },
        { label: '4b. Nº', y: 106 },
        { label: '5. RESIDÊNCIA', y: 124 },
      ].map(({ label, y }) => (
        <g key={y}>
          <text x="118" y={y} fill="#F5B21B" fontSize="5.5" fontFamily="sans-serif" opacity="0.45" letterSpacing="0.5">{label}</text>
          <rect x="118" y={y + 3} width={label.includes('RESIDÊNCIA') ? 170 : 120} height="6" rx="2" fill="#F5B21B" fillOpacity="0.1" />
        </g>
      ))}
      {/* Category boxes */}
      {['B', 'C', 'D', 'E'].map((cat, i) => (
        <g key={cat}>
          <rect x={118 + i * 40} y={142} width="32" height="22" rx="4" fill="#F5B21B" fillOpacity={i === 0 ? 0.25 : 0.08} stroke="#F5B21B" strokeWidth="0.4" strokeOpacity="0.4" />
          <text x={134 + i * 40} y={157} textAnchor="middle" fill="#F5B21B" fontSize="10" fontWeight="600" fontFamily="sans-serif" opacity={i === 0 ? 0.8 : 0.3}>{cat}</text>
        </g>
      ))}
      {/* Bottom security strip */}
      <rect x="40" y="170" width="266" height="18" rx="4" fill="#052E2E" stroke="#F5B21B" strokeWidth="0.3" strokeOpacity="0.2" />
      <text x="48" y="180" fill="#F5B21B" fontSize="5" fontFamily="monospace" opacity="0.4">CC-LDA-2021-88234&lt;&lt;AGO&lt;&lt;0&lt;B&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</text>
    </svg>
  )
}

const DOCS = [
  { id: 'passport', Component: AngolaPassport, aspect: '200/280' },
  { id: 'bi', Component: AngolaBI, aspect: '320/200' },
  { id: 'license', Component: DriversLicense, aspect: '320/200' },
]

export default function DocumentBackground() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % DOCS.length)
    }, 4200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Document 1 — top right, large */}
      <AnimatePresence mode="wait">
        {DOCS.map(({ id, Component }, i) =>
          active === i ? (
            <motion.div
              key={`tr-${id}`}
              initial={{ opacity: 0, rotate: -12, scale: 0.88, y: -30 }}
              animate={{ opacity: 1, rotate: -10, scale: 1, y: 0 }}
              exit={{ opacity: 0, rotate: -8, scale: 0.9, y: -20 }}
              transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute"
              style={{
                top: '-4%',
                right: '-6%',
                width: id === 'passport' ? '260px' : '380px',
                filter: 'blur(1.5px)',
              }}
            >
              <Component opacity={0.11} rotate={-10} />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Document 2 — bottom left, medium */}
      <AnimatePresence mode="wait">
        {DOCS.map(({ id, Component }, i) => {
          const nextIdx = (active + 1) % DOCS.length
          return nextIdx === i ? (
            <motion.div
              key={`bl-${id}`}
              initial={{ opacity: 0, rotate: 8, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, rotate: 6, scale: 1, y: 0 }}
              exit={{ opacity: 0, rotate: 10, scale: 0.88, y: 20 }}
              transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              className="absolute"
              style={{
                bottom: '2%',
                left: '-5%',
                width: id === 'passport' ? '200px' : '320px',
                filter: 'blur(2px)',
              }}
            >
              <Component opacity={0.09} rotate={6} />
            </motion.div>
          ) : null
        })}
      </AnimatePresence>

      {/* Document 3 — center left, faint background layer */}
      <motion.div
        className="absolute"
        animate={{ y: [0, -12, 0], rotate: [-14, -12, -14] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          top: '20%',
          left: '2%',
          width: '180px',
          filter: 'blur(3px)',
          opacity: 0.055,
        }}
      >
        <AngolaPassport opacity={1} rotate={0} />
      </motion.div>

      {/* Document 4 — far right mid, very faint */}
      <motion.div
        className="absolute"
        animate={{ y: [0, 14, 0], rotate: [8, 10, 8] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          top: '38%',
          right: '-2%',
          width: '240px',
          filter: 'blur(3.5px)',
          opacity: 0.05,
        }}
      >
        <AngolaBI opacity={1} rotate={0} />
      </motion.div>
    </div>
  )
}
