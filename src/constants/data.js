export const STATS = [
  { value: 12847, label: 'Documentos Encontrados', suffix: '+' },
  { value: 347, label: 'Esquadras Conectadas', suffix: '' },
  { value: 89, label: 'Taxa de Devolução', suffix: '%' },
  { value: 58200, label: 'Usuários Ativos', suffix: '+' },
]

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Registe-se',
    description: 'Crie a sua conta segura com os seus dados pessoais e BI/NIF angolano.',
    icon: 'UserPlus',
  },
  {
    step: '02',
    title: 'Pesquise',
    description: 'Insira o número do documento ou referência para verificar se foi encontrado.',
    icon: 'Search',
  },
  {
    step: '03',
    title: 'Localize',
    description: 'Veja a esquadra ou entidade onde o seu documento está disponível para levantamento.',
    icon: 'MapPin',
  },
  {
    step: '04',
    title: 'Levante',
    description: 'Dirija-se ao local indicado com identificação e retire o seu documento.',
    icon: 'CheckCircle',
  },
]

export const BENEFITS = [
  {
    icon: 'Zap',
    title: 'Rapidez Imediata',
    description: 'Resultado em segundos. Sem filas, sem deslocamentos desnecessários.',
  },
  {
    icon: 'Shield',
    title: 'Segurança Total',
    description: 'Dados protegidos com criptografia de nível governamental.',
  },
  {
    icon: 'Globe',
    title: 'Cobertura Nacional',
    description: 'Integração com todas as províncias e municípios de Angola.',
  },
  {
    icon: 'Bell',
    title: 'Alertas Inteligentes',
    description: 'Notificações imediatas quando o seu documento for localizado.',
  },
  {
    icon: 'Smartphone',
    title: 'Acesso Universal',
    description: 'Disponível em qualquer dispositivo, a qualquer hora.',
  },
  {
    icon: 'Building2',
    title: 'Integração Oficial',
    description: 'Conectado ao Ministério da Justiça e Direitos Humanos de Angola.',
  },
]

export const ESQUADRAS = [
  { name: 'Esquadra Central de Luanda', province: 'Luanda', docs: 234, status: 'active' },
  { name: 'Esquadra do Rangel', province: 'Luanda', docs: 187, status: 'active' },
  { name: 'Departamento de Identificação', province: 'Luanda', docs: 312, status: 'active' },
  { name: 'Esquadra de Viana', province: 'Luanda', docs: 98, status: 'active' },
  { name: 'Conservatória do Huambo', province: 'Huambo', docs: 143, status: 'active' },
  { name: 'Esquadra Central de Benguela', province: 'Benguela', docs: 167, status: 'active' },
]

export const FAQS = [
  {
    question: 'Como sei se o meu documento foi encontrado?',
    answer: 'Basta pesquisar pelo número do documento ou referência na plataforma FINDOC. O sistema verifica automaticamente todas as esquadras e entidades parceiras registadas em Angola.',
  },
  {
    question: 'Quanto tempo demora a informação a ser actualizada?',
    answer: 'As esquadras parceiras actualizam os dados em tempo real. Novos documentos entrados são registados no sistema em até 24 horas após a recepção.',
  },
  {
    question: 'Preciso de me registar para pesquisar?',
    answer: 'A pesquisa básica é gratuita e não requer registo. No entanto, para receber alertas personalizados e acompanhar histórico, recomendamos criar uma conta.',
  },
  {
    question: 'O FINDOC tem autorização oficial?',
    answer: 'Sim. O FINDOC opera em parceria com o Ministério da Justiça e Direitos Humanos de Angola e a Polícia Nacional Angolana.',
  },
  {
    question: 'Os meus dados pessoais estão seguros?',
    answer: 'Absolutamente. Utilizamos criptografia de nível militar (AES-256) e conformidade total com a legislação de protecção de dados de Angola.',
  },
  {
    question: 'Posso registar um documento que encontrei?',
    answer: 'Sim. Qualquer cidadão pode reportar um documento encontrado através da plataforma. Os dados serão verificados e o proprietário notificado.',
  },
]

export const MOCK_DOCUMENTS = [
  {
    id: 'DOC-2024-001',
    type: 'Bilhete de Identidade',
    number: '004523178LA045',
    status: 'found',
    location: 'Esquadra Central de Luanda',
    province: 'Luanda',
    date: '2024-11-02',
    owner: 'J. M. S.',
  },
  {
    id: 'DOC-2024-002',
    type: 'Passaporte',
    number: 'N82341056',
    status: 'processing',
    location: 'Departamento de Identificação - Maianga',
    province: 'Luanda',
    date: '2024-11-05',
    owner: 'A. K.',
  },
  {
    id: 'DOC-2024-003',
    type: 'Carta de Condução',
    number: 'CC-LDA-2021-88234',
    status: 'found',
    location: 'Esquadra do Rangel',
    province: 'Luanda',
    date: '2024-10-28',
    owner: 'M. A. F.',
  },
]

export const MOCK_USER = {
  name: 'Carlos Manuel Silva',
  email: 'carlos.silva@email.com',
  bi: '004523178LA045',
  phone: '+244 923 456 789',
  province: 'Luanda',
  joinDate: '2024-01-15',
  avatar: null,
  verified: true,
  documents: [
    { id: 1, type: 'Bilhete de Identidade', number: '004523178LA045', status: 'active', registered: '2024-01-15' },
    { id: 2, type: 'Passaporte', number: 'N001234567', status: 'active', registered: '2024-03-22' },
    { id: 3, type: 'Carta de Condução', number: 'CC-LDA-2019-12345', status: 'expired', registered: '2024-01-15' },
  ],
  searches: [
    { id: 1, query: '004523178LA045', date: '2024-11-05', result: 'not_found' },
    { id: 2, query: 'N001234567', date: '2024-10-22', result: 'found' },
    { id: 3, query: 'CC-LDA-2019-12345', date: '2024-09-15', result: 'not_found' },
  ],
}

export const NAV_LINKS = [
  { label: 'Início', href: '/' },
  { label: 'Como Funciona', href: '/#como-funciona' },
  { label: 'Documentos', href: '/pesquisar' },
  { label: 'Esquadras', href: '/#esquadras' },
  { label: 'Segurança', href: '/#seguranca' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contacto', href: '/#contato' },
]
