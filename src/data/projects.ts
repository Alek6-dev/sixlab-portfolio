export type ProjectStatus = 'live' | 'in-progress' | 'experiment' | 'archived'
export type ProjectCategory = 'product'

export interface Project {
  slug: string
  title: string
  tagline: string
  image?: string
  shortDescription: string
  year: string
  status: ProjectStatus
  statusLabel: string
  category: ProjectCategory
  role: string
  tags: string[]
  stack: string[]
  proofPoints: string[]
  sections: {
    context: string
    contribution: string
    features: string[]
    whatItShows: string
    nextSteps?: string
  }
}

export const projects: Project[] = [
  {
    slug: 'myqassist',
    title: 'MyQAssist',
    image: '/screenshots/myqassist-card.webp',
    tagline: 'SaaS métier pour QA fonctionnel. Utilisation de l’IA générative pour rédaction d’exigences et de cas de test.',
    shortDescription:
      'Application SaaS QA en bêta publique pour transformer un document en exigences, cas de test, exports et indicateurs de couverture.',
    year: '2025-2026',
    status: 'in-progress',
    statusLabel: 'Bêta publique',
    category: 'product',
    role: 'Conception produit, build assisté par IA, tests fonctionnels et itérations',
    tags: ['SaaS QA', 'Produit', 'IA appliquée'],
    stack: ['SaaS', 'Next.js', 'Supabase', 'Stripe', 'Anthropic API', 'Claude Code'],
    proofPoints: [
      'Authentification, upload PDF, dashboard et exports',
      'Génération d’exigences et de cas de test',
      'Analyse de couverture et parcours de paiement Stripe',
    ],
    sections: {
      context:
        'MyQAssist est parti d’un besoin très concret : montrer une compréhension sérieuse du métier QA en construisant un vrai produit, pas seulement une maquette ou un discours.',
      contribution:
        'J’ai cadré le produit, construit les principales fonctionnalités avec des outils de développement assistés par IA, testé les parcours et fait évoluer l’application à partir des comportements observés.',
      features: [
        'Authentification et espace utilisateur',
        'Upload de documents PDF',
        'Génération d’exigences et de cas de test',
        'Dashboard, exports et analyse de couverture',
        'Intégration Stripe pour le paiement',
      ],
      whatItShows:
        'Ce projet montre ma capacité à passer d’une idée produit à une application utilisable, avec une attention forte aux parcours, aux cas limites et à la fiabilité fonctionnelle.',
      nextSteps:
        'Le produit est en bêta et continue d’évoluer autour de la qualité des générations, de la clarté du dashboard et des retours utilisateurs.',
    },
  },
  {
    slug: 'king-of-paddock',
    title: 'King Of Paddock',
    tagline: 'Application de Fantasy F1 avec système de championnats entre amis, ligue communautaire et scoring automatisé.',
    shortDescription:
      'Produit fantasy F1 lancé avec une vraie base utilisateurs, construit avec une agence puis repris avec un freelance pour continuer les évolutions.',
    year: '2024-2026',
    status: 'live',
    statusLabel: 'En ligne',
    category: 'product',
    role: 'Produit, backlog, user stories, tests, support et nouvelles features',
    tags: ['Fantasy F1', 'Produit', 'App web'],
    stack: ['App PWA', 'React', 'Next.js', 'Symfony', 'Stripe', 'Claude Design'],
    proofPoints: [
      'Environ 100 utilisateurs',
      'Ligues, choix pilotes, scoring, classement et admin',
      'Travail en cours sur migration, notifications et automatisation résultats',
    ],
    sections: {
      context:
        'King of Paddock est un jeu fantasy F1 créé pour permettre à des fans de jouer entre amis autour des week-ends de Grand Prix.',
      contribution:
        'J’ai porté la vision produit, construit le backlog, rédigé des user stories, suivi les développements, testé les livrables, géré les retours utilisateurs et priorisé les évolutions.',
      features: [
        'Inscription et création de ligues',
        'Choix des pilotes et logique de scoring',
        'Classements, admin et paiement',
        'Support utilisateurs et animation de la communauté',
        'Chantiers en cours : notifications, nouveau mode de jeu, résultats via API',
      ],
      whatItShows:
        'Ce projet montre ma capacité à tenir un produit dans la durée : cadrer, tester, arbitrer, améliorer et faire le lien entre besoin utilisateur, technique et expérience de jeu.',
      nextSteps:
        'Le produit est en évolution avec une migration technique et de nouvelles features destinées à rendre le jeu plus fluide et plus engageant.',
    },
  },
  {
    slug: 'jcc-football',
    title: 'JCC Football',
    tagline: 'Création d’un jeu de type cartes à collectionner et Fantasy football. Système de pack opening, ligue communautaire et data avancée.',
    shortDescription:
      'Side project construit pour explorer une app fantasy football avec cartes, packs, collection, équipes et interface admin.',
    year: '2026',
    status: 'experiment',
    statusLabel: 'Prototype',
    category: 'product',
    role: 'Conception, prototypage applicatif, logique produit et tests',
    tags: ['Fantasy', 'Cartes', 'Prototype'],
    stack: ['App mobile', 'Next.js', 'Supabase', 'Codex', 'API Football', 'Live score'],
    proofPoints: [
      'Système de cartes et ouverture de packs',
      'Gestion des équipes et collection',
      'Interface admin et base de données',
    ],
    sections: {
      context:
        'JCC Football est un projet personnel pour mettre les mains dans la construction d’une app fantasy, avec une logique de collection inspirée des jeux de cartes.',
      contribution:
        'J’ai imaginé les mécanismes, construit les premiers parcours avec Codex, structuré les données et testé les comportements clefs autour des cartes, packs et équipes.',
      features: [
        'Création et collection de cartes joueurs',
        'Ouverture de packs',
        'Composition d’équipes',
        'Interface admin',
        'Première base de données pour supporter les parcours',
      ],
      whatItShows:
        'Ce prototype montre mon goût pour le build produit : partir d’une idée de gameplay, la transformer en interface et itérer sur les comportements réels.',
    },
  },
    {
    slug: 'site-web-king-of-paddock',
    title: 'Site web KOP',
    tagline: 'Site internet pour l’application King Of Paddock. Travail sur le référencement (SEO), page news d’informations F1.',
    shortDescription:
      '',
    year: '2026',
    status: 'live',
    statusLabel: 'En ligne',
    category: 'product',
    role: 'Conception, prototypage applicatif, logique produit et tests',
    tags: ['Fantasy', 'Cartes', 'Prototype'],
    stack: ['Workflow', 'Automatisation', 'n8n', 'Google Analytics', 'Google API'],
    proofPoints: [
      'Système de cartes et ouverture de packs',
      'Gestion des équipes et collection',
      'Interface admin et base de données',
    ],
    sections: {
      context:
        'JCC Football est un projet personnel pour mettre les mains dans la construction d’une app fantasy, avec une logique de collection inspirée des jeux de cartes.',
      contribution:
        'J’ai imaginé les mécanismes, construit les premiers parcours avec Codex, structuré les données et testé les comportements clefs autour des cartes, packs et équipes.',
      features: [
        'Création et collection de cartes joueurs',
        'Ouverture de packs',
        'Composition d’équipes',
        'Interface admin',
        'Première base de données pour supporter les parcours',
      ],
      whatItShows:
        'Ce prototype montre mon goût pour le build produit : partir d’une idée de gameplay, la transformer en interface et itérer sur les comportements réels.',
    },
  },
]

export const productProjects = projects.filter((project) => project.category === 'product')
