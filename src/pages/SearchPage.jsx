import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { Search, FileText, MapPin, Calendar, CheckCircle, Clock, XCircle, AlertCircle, Filter } from 'lucide-react'
import { MOCK_DOCUMENTS } from '../constants/data'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const STATUS_CONFIG = {
  found: { label: 'Encontrado', color: 'green', Icon: CheckCircle },
  processing: { label: 'Em Processamento', color: 'gold', Icon: Clock },
  not_found: { label: 'Não Encontrado', color: 'red', Icon: XCircle },
}

function DocCard({ doc, delay }) {
  const status = STATUS_CONFIG[doc.status]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card-premium group hover:border-gold-500/20"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-petroleum-600/50 border border-white/5 flex items-center justify-center">
            <FileText size={18} className="text-gold-400/70" />
          </div>
          <div>
            <p className="text-xs text-white/35 mb-0.5">{doc.id}</p>
            <h4 className="font-semibold text-sm">{doc.type}</h4>
          </div>
        </div>
        <Badge variant={status.color}>
          <status.Icon size={10} />
          {status.label}
        </Badge>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <span className="text-white/20">Nº</span>
          <span className="font-mono">{doc.number}</span>
        </div>
        {doc.location && (
          <div className="flex items-center gap-2 text-xs text-white/40">
            <MapPin size={12} className="text-gold-400/50" />
            {doc.location}
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-white/40">
          <Calendar size={12} className="text-gold-400/50" />
          {new Date(doc.date).toLocaleDateString('pt-AO', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      {doc.status === 'found' && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <Button variant="gold" size="sm" className="w-full">
            Ver Detalhes para Levantamento
          </Button>
        </div>
      )}
    </motion.div>
  )
}

function EmptyState({ query }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20"
    >
      <div className="w-16 h-16 rounded-2xl glass border border-white/10 flex items-center justify-center mx-auto mb-5">
        <AlertCircle size={28} className="text-white/20" />
      </div>
      <h3 className="font-semibold mb-2">Nenhum resultado encontrado</h3>
      <p className="text-sm text-white/35 max-w-sm mx-auto">
        Não encontrámos nenhum documento com a referência "{query}". Verifique o número e tente novamente.
      </p>
    </motion.div>
  )
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const doSearch = async (q) => {
    if (!q.trim()) return
    setLoading(true)
    setSearched(false)
    await new Promise(r => setTimeout(r, 1000))
    // Mock: return all docs if query matches any doc number or return empty
    const found = MOCK_DOCUMENTS.filter(d =>
      d.number.toLowerCase().includes(q.toLowerCase()) ||
      d.id.toLowerCase().includes(q.toLowerCase()) ||
      q.length > 5 // show results for any long query (demo)
    )
    setResults(found)
    setSearched(true)
    setLoading(false)
  }

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) { setQuery(q); doSearch(q) }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchParams(query ? { q: query } : {})
    doSearch(query)
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8">
      <div className="container-max max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold tracking-widest text-gold-500/70 uppercase mb-3">
            Pesquisa Nacional
          </p>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Pesquisar <span className="text-gradient-gold">Documento</span>
          </h1>
          <p className="text-white/40 text-sm">
            Insira o número do seu BI, NIF, Passaporte ou Carta de Condução
          </p>
        </motion.div>

        {/* Search form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="mb-10"
        >
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Ex: 004523178LA045 ou N82341056..."
                className="w-full glass-dark border border-white/10 focus:border-gold-500/40 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-gold-500/15 transition-all"
              />
            </div>
            <Button type="submit" variant="gold" size="md" disabled={loading}>
              {loading ? 'A pesquisar...' : 'Pesquisar'}
            </Button>
          </div>

          {/* Type filters */}
          <div className="flex flex-wrap gap-2 mt-3">
            {['Todos', 'Bilhete de Identidade', 'Passaporte', 'Carta de Condução', 'NIF'].map((t) => (
              <button
                key={t}
                type="button"
                className="px-3 py-1.5 text-xs text-white/40 glass border border-white/5 hover:border-white/15 hover:text-white/70 rounded-lg transition-all"
              >
                {t}
              </button>
            ))}
          </div>
        </motion.form>

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-16 gap-4"
            >
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-2 border-gold-500/20" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold-500 animate-spin" />
              </div>
              <p className="text-sm text-white/30">A pesquisar em todas as esquadras...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        {!loading && searched && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {results.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-5">
                  <p className="text-sm text-white/40">
                    <span className="text-white font-semibold">{results.length}</span> resultado(s) para "{query}"
                  </p>
                  <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 glass px-3 py-1.5 rounded-lg border border-white/5 transition-all">
                    <Filter size={12} /> Filtrar
                  </button>
                </div>
                <div className="grid gap-4">
                  {results.map((doc, i) => (
                    <DocCard key={doc.id} doc={doc} delay={i * 0.08} />
                  ))}
                </div>
              </>
            ) : (
              <EmptyState query={query} />
            )}
          </motion.div>
        )}

        {/* Suggestions when empty */}
        {!searched && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <p className="text-xs text-white/25 uppercase tracking-widest mb-5">Pesquisas de demonstração</p>
            {MOCK_DOCUMENTS.map((doc, i) => (
              <button
                key={doc.id}
                onClick={() => { setQuery(doc.number); doSearch(doc.number) }}
                className="w-full card-premium text-left hover:border-gold-500/20 group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-gold-400/50 group-hover:text-gold-400 transition-colors" />
                  <div>
                    <p className="text-sm font-medium">{doc.type}</p>
                    <p className="text-xs font-mono text-white/30">{doc.number}</p>
                  </div>
                </div>
                <Badge variant={STATUS_CONFIG[doc.status].color}>
                  {STATUS_CONFIG[doc.status].label}
                </Badge>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
