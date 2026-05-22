export type AutomationStatus = 'live' | 'in-progress' | 'experiment'
export type AutomationNodeType = 'input' | 'process' | 'analysis' | 'output'

export interface AutomationFlowNode {
  id: string
  label: string
  type: AutomationNodeType
  task: string
}

export interface Automation {
  slug: string
  title: string
  description: string
  status: AutomationStatus
  statusLabel: string
  stack: string[]
  href?: string
  flow: {
    nodes: AutomationFlowNode[]
  }
}

export const automations: Automation[] = [
  {
    slug: 'automation-ga4',
    title: 'Automatisation Google Analytics',
    description:
      'Workflow automatisé qui récupère les données Google Analytics d’un site web, génère une analyse synthétique du trafic et envoie un rapport hebdomadaire par email.',
    status: 'in-progress',
    statusLabel: 'En cours',
    stack: ['Analyse de données', 'Automatisation', 'n8n', 'Google Analytics', 'Google API'],
    flow: {
      nodes: [
        {
          id: 'ga4',
          label: 'GA4',
          type: 'input',
          task: 'Récupération des sessions, pages vues, sources de trafic et événements clés.',
        },
        {
          id: 'extraction',
          label: 'Extraction',
          type: 'process',
          task: 'Extraction et structuration des données utiles via Google Analytics API.',
        },
        {
          id: 'analyse',
          label: 'Analyse',
          type: 'analysis',
          task: 'Analyse synthétique des tendances, variations et signaux importants.',
        },
        {
          id: 'rapport',
          label: 'Rapport',
          type: 'process',
          task: 'Génération d’un rapport hebdomadaire sur-mesure.',
        },
        {
          id: 'email',
          label: 'Email',
          type: 'output',
          task: 'Envoi automatique du rapport par email tous les lundis.',
        },
      ],
    },
  },
  {
    slug: 'f1-results-pipeline',
    title: 'Pipeline scoring Fantasy F1',
    description:
      'Génération automatisé des résultats d’une Fantasy F1 via la récupération des data F1 live timing, le formatage des données sur Google Sheets et l’import par script sur l’application de jeu.',
    status: 'live',
    statusLabel: 'Workflow utilisé',
    stack: ['API F1 live timing', 'Script Python', 'Google Sheets', 'Intégration produit'],
    flow: {
      nodes: [
        {
          id: 'api',
          label: 'API F1',
          type: 'input',
          task: 'Récupération automatique des résultats et données de course depuis l’API F1 live timing.',
        },
        {
          id: 'structuration',
          label: 'Formatage',
          type: 'process',
          task: 'Nettoyage, tri et structuration des données pour les rendre exploitables.',
        },
        {
          id: 'export-sheets',
          label: 'Sheets',
          type: 'process',
          task: 'Alimentation d’un tableau Google Sheets pour contrôler et vérifier les données.',
        },
        {
          id: 'export-csv',
          label: 'Export',
          type: 'output',
          task: 'Intégration des données de scoring directement dans l’application.',
        },
      ],
    },
  },
  {
    slug: 'f1-news-automation',
    title: 'Automatisation d’articles et news F1',
    description:
      'Workflow éditorial qui collecte des sources d’articles, regroupe les sujets proches par matching et génère un brouillon rédactionnelle assistée par IA.',
    status: 'live',
    statusLabel: 'Workflow utilisé',
    stack: ['n8n', 'Flux RSS', 'Anthropic API', 'IA générative', 'Google Cloud Console'],
    flow: {
      nodes: [
        {
          id: 'rss',
          label: 'RSS',
          type: 'input',
          task: 'Collecte automatique de plusieurs flux RSS et sources d’actualité F1.',
        },
        {
          id: 'regroupement',
          label: 'Tri',
          type: 'process',
          task: 'Matching des sujets similaires pour traîier l’actualité récente et utile.',
        },
        {
          id: 'generation',
          label: 'IA',
          type: 'analysis',
          task: 'Rédaction assistée par l’IA d’un brouillon d’article à partir des informations collectées.',
        },
        {
          id: 'brouillon',
          label: 'Brouillon',
          type: 'output',
          task: 'Envoi d’un brouillon structuré dans Google Drive, prêt à être relu, ajusté et publié manuellement.',
        },
      ],
    },
  },
]
