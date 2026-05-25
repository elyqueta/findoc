import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Shield, ExternalLink } from 'lucide-react'
import Logo from '../ui/Logo'

export default function Footer() {
  const year = new Date().getFullYear()

  const links = {
    Plataforma: [
      { label: 'Como Funciona', href: '/#como-funciona' },
      { label: 'Pesquisar Documento', href: '/pesquisar' },
      { label: 'Registar Documento', href: '/pesquisar' },
      { label: 'Esquadras Parceiras', href: '/#esquadras' },
    ],
    Informações: [
      { label: 'Segurança & Privacidade', href: '/#seguranca' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Termos de Uso', href: '#' },
      { label: 'Política de Privacidade', href: '#' },
    ],
    Institucional: [
      { label: 'Sobre o FINDOC', href: '#' },
      { label: 'Ministério da Justiça', href: '#', external: true },
      { label: 'Polícia Nacional', href: '#', external: true },
      { label: 'Contacto', href: '/#contato' },
    ],
  }

  return (
    <footer className="relative border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-petroleum-800/50 to-petroleum-900" />
      
      <div className="relative container-max px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo size="lg" className="mb-5" />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              A plataforma nacional angolana para rastreamento e recuperação de documentos perdidos. 
              Conectando cidadãos e esquadras em todo o país.
            </p>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:info@findoc.ao" className="flex items-center gap-2.5 text-sm text-white/40 hover:text-gold-400 transition-colors">
                <Mail size={15} /> info@findoc.ao
              </a>
              <a href="tel:+244222000000" className="flex items-center gap-2.5 text-sm text-white/40 hover:text-gold-400 transition-colors">
                <Phone size={15} /> +244 222 000 000
              </a>
              <span className="flex items-center gap-2.5 text-sm text-white/40">
                <MapPin size={15} /> Luanda, República de Angola
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-sm font-semibold text-white/90 mb-4">{group}</h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/80 transition-colors"
                    >
                      {item.label}
                      {item.external && <ExternalLink size={11} />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {year} FINDOC. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/25">
            <Shield size={12} className="text-gold-500/50" />
            Plataforma oficial certificada pelo Ministério da Justiça de Angola
          </div>
        </div>
      </div>
    </footer>
  )
}
