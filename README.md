# FINDOC — Plataforma Nacional de Rastreamento de Documentos

> Plataforma nacional angolana para rastrear e recuperar documentos perdidos.

## 🚀 Início Rápido

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📁 Estrutura do Projecto

```
src/
├── components/
│   ├── layout/       # Navbar, Footer, MainLayout
│   ├── sections/     # Seções da landing page
│   └── ui/           # Componentes reutilizáveis
├── constants/        # Dados mockados e constantes
├── hooks/            # useAuth, useCounter
└── pages/            # HomePage, SearchPage, DashboardPage
```

## 🎨 Identidade Visual

- **Primária:** Verde petróleo `#063B3B`
- **Secundária:** Verde profundo `#0B4F4F`
- **Accent:** Dourado vibrante `#F5B21B`
- **Tipografia:** Plus Jakarta Sans

## 🌐 Deploy no Vercel

1. Faça push para um repositório GitHub
2. Importe o projecto no [Vercel](https://vercel.com)
3. Configure: Framework = **Vite**, Build = `npm run build`, Output = `dist`
4. O `vercel.json` já trata do roteamento SPA

## 📱 Funcionalidades

- ✅ Landing page completa com todas as seções
- ✅ Sistema de pesquisa com resultados mockados
- ✅ Autenticação completa (login/registo) — mockada
- ✅ Dashboard de utilizador com todas as secções
- ✅ Design responsivo (mobile, tablet, desktop)
- ✅ Animações com Framer Motion
- ✅ Glassmorphism e efeitos premium
