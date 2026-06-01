export type ProjectStatus = 'live' | 'in-progress' | 'experiment' | 'archived'
export type ProjectCategory = 'product'
export type ProjectLinkIcon = 'link' | 'doc'

export interface ProjectLink {
  label: string
  url: string
  icon: ProjectLinkIcon
  sub?: string
}

export interface ProjectTextSection {
  body: string[]
}

export interface ProjectBuildSection extends ProjectTextSection {
  features: ProjectFeature[]
}

export interface ProjectFeature {
  title: string
  description: string
}

export interface ProjectImage {
  src: string
  alt: string
  width?: number
  height?: number
  full?: boolean
}

export interface ProjectCta {
  productUrl: string
  contactUrl: string
}

export interface Project {
  slug: string
  title: string
  tagline: string
  shortDescription: string
  cardImage: string
  heroImage: ProjectImage
  period: string
  status: ProjectStatus
  statusLabel: string
  category: ProjectCategory
  skills: string[]
  stack: string[]
  githubUrl: string
  links: ProjectLink[]
  need: ProjectTextSection
  build: ProjectBuildSection
  captures: ProjectImage[]
  now: ProjectTextSection
  cta: ProjectCta
}

export const projects: Project[] = [
  {
    slug: 'myqassist',
    title: 'MyQAssist',
    tagline:
      'SaaS métier pour QA fonctionnel. Utilisation de l’IA générative pour rédaction d’exigences et de cas de test.',
    shortDescription:
      'Application SaaS QA en beta publique pour transformer un document en exigences, cas de test, exports et indicateurs de couverture.',
    cardImage: '/screenshots/myqassist-card.webp',
    heroImage: {
      src: '/screenshots/myqassist-card.webp',
      alt: 'Vue principale de MyQAssist',
    },
    period: 'Janvier-Mars 2026',
    status: 'in-progress',
    statusLabel: 'Beta publique',
    category: 'product',
    skills: [
      'Cadrage du besoin QA',
      'Definition d’un MVP',
      'Decoupage du produit en jalons',
      'Pilotage de l’IA de code',
      'Tests fonctionnels',
      'Tests de non-regression',
    ],
    stack: ['SaaS', 'Next.js', 'Supabase', 'Stripe', 'Anthropic API', 'Claude Code'],
    githubUrl: '',
    links: [
      { label: 'myqassist.com', url: 'https://myqassist.com', icon: 'link' },
    ],
    need: {
      body: [
        'MyQAssist répond à un moment très concret du travail QA : recevoir une spécification fonctionnelle, des users story ou un document produit, puis devoir en faire une première base de tests fonctionnels. L’enjeu n’est pas de produire un scénario final à la place du QA, mais de réduire le temps perdu au démarrage.',
        'Le produit, grâce à l’IA générative, transforme le contexte fourni en exigences et en cas de test exploitables. Le QA garde ensuite la main : il relit, ajuste, complète ou supprime selon sa connaissance du produit, son expertise métier et le niveau de risque qu’il identifie.',
      ],
    },
    build: {
      body: [
        'Ce produit a été organisé en jalons de développement. Chaque jalon devait produire un résultat testable, être validée fonctionnellement, puis rester stable au développement du suivant.',
        'Le produit devait d’abord reposer sur une base technique suffisamment propre pour ne pas devenir fragile dès les premières fonctionnalités : application Next.js, authentification, structure SQL et routes API séparées par responsabilité ont servi de socle au reste du développement.',
        'Le cœur de MyQAssist s’est construit autour de la génération IA : transformer un contexte produit en exigences, produire des cas de test, valider les réponses JSON, gérer les clarifications et conserver le travail pour pouvoir revenir sur un projet existant.',
        'Une grande partie du travail a porté sur l’usage réel du produit. L’interface, les états de chargement, les erreurs, la validation des inputs, les exports CSV et l’analyse de couverture devaient rendre l’outil exploitable par un QA, pas seulement fonctionnel en démonstration.',
        'La robustesse a été traitée comme un sujet produit à part entière : sécurité des routes API, règles RLS Supabase, protection des projets, validation serveur des réponses IA, paiement, déploiement et mise en production devaient permettre au MVP de dépasser le stade du prototype.',
      ],
      features: [
        {
          title: 'Partir d’un besoin métier',
          description: 'Le produit a été cadré à partir d’un irritant concret du travail QA : passer d’une spec à une première base de tests.',
        },
        {
          title: 'Réduire l’idée à un MVP',
          description: 'J’ai isolé le parcours essentiel avant d’ajouter des fonctionnalités secondaires : contexte, génération, relecture, ajustement.',
        },
        {
          title: 'Construire par jalons',
          description: 'Chaque jalon devait être abordé de manière isolée, testable et validé avant de passer à l’étape suivante.',
        },
        {
          title: 'Piloter l’IA comme un outil de build',
          description: 'Claude Code a été utilisé avec un cadrage précis, des objectifs courts et un contexte produit maintenu tout au long du développement.',
        },
        {
          title: 'Tester pendant le build',
          description: 'À chaque évolution, j’ai vérifié le comportement attendu et les régressions possibles sur les jalons déjà validés.',
        },
      ],
    },
    captures: [
      {
        src: '/screenshots/myqassist-preview01.png',
        alt: 'Dashboard projet MyQAssist',
        width: 1900,
        height: 900,
        full: true,
      },
      {
        src: '/screenshots/myqassist-preview02.png',
        alt: 'Generation des exigences MyQAssist',
        width: 1900,
        height: 900,
      },
      {
        src: '/screenshots/myqassist-preview03.png',
        alt: 'Cas de test generes dans MyQAssist',
        width: 1900,
        height: 900,
      },
      {
        src: '/screenshots/myqassist-preview04.png',
        alt: 'Analyse de couverture MyQAssist',
        width: 1900,
        height: 900,
      },
      {
        src: '/screenshots/myqassist-preview05.png',
        alt: 'Edition des exigences dans MyQAssist',
        width: 1900,
        height: 900,
      },
      {
        src: '/screenshots/myqassist-preview06.png',
        alt: 'Export et suivi QA dans MyQAssist',
        width: 1900,
        height: 900,
      },
    ],
    now: {
      body: [
        'Le produit est actuellement en phase de bêta test et continue d’évoluer autour de la qualité des générations, de la clarté du dashboard et des premiers retours utilisateurs.',
      ],
    },
    cta: {
      productUrl: 'https://myqassist.com',
      contactUrl: '/#contact',
    },
  },
  {
    slug: 'king-of-paddock',
    title: 'King Of Paddock',
    tagline:
      'Application de Fantasy F1 avec système de championnats entre amis, ligue communautaire et scoring automatisé.',
    shortDescription:
      'Produit fantasy F1 lancé avec une vraie base utilisateurs, construit avec une agence puis repris avec un freelance pour continuer les évolutions.',
    cardImage: '/screenshots/king-of-paddock-card.webp',
    heroImage: {
      src: '/screenshots/king-of-paddock-card.webp',
      alt: 'Vue principale de King Of Paddock',
    },
    period: '2024-Aujourd’hui',
    status: 'live',
    statusLabel: 'En ligne',
    category: 'product',
    skills: [
      'Vision produit',
      'Backlog et priorisation',
      'Rédaction de user stories',
      'Tests fonctionnels',
      'Support utilisateurs',
      'Reprise du code',
      'Développement de features',
      'Automatisation scoring',
    ],
    stack: ['App PWA', 'React', 'Next.js', 'Symfony', 'Stripe', 'Claude Design'],
    githubUrl: '',
    links: [
      { label: 'kingofpaddock.com', url: 'https://app.kingofpaddock.com/', icon: 'link' },
    ],
    need: {
      body: [
        'King Of Paddock est né d’une idée simple : transformer les week-ends de Grand Prix en expérience fantasy entre amis. Les résultats réels de la Formule 1 deviennent la base d’un jeu de stratégie, avec championnats privés, choix de pilotes, scoring, classements et décisions à prendre tout au long de la saison.',
        'Le produit devait trouver l’équilibre entre accessibilité et profondeur de jeu : assez simple pour être compris rapidement, mais suffisamment riche pour créer de l’engagement, de la rivalité et des habitudes autour de chaque Grand Prix.',
      ],
    },
    build: {
      body: [
        'L’application King Of Paddock s’est construite en plusieurs phases : d’abord comme un produit cadré, testé et livré par une agence, puis comme une application reprise progressivement en interne pour continuer à la faire évoluer.',
        'Le travail a longtemps été centré sur la validation produit : tester les parcours, vérifier les règles de jeu, faire remonter les retours utilisateurs et transformer les problèmes observés en tickets clairs pour l’équipe de développement.',
        'La suite du build a déplacé le sujet vers l’évolution du produit : nouvelles features, améliorations UX, notifications, automatisation du scoring et reprise progressive de certaines parties du code à l’aide de l’IA générative et en collaboration avec un développeur senior.',
      ],
      features: [
        {
          title: 'Cadrage des règles de jeu',
          description: 'Définition des championnats, choix pilotes, scoring, classements et mécaniques fantasy autour des Grands Prix.',
        },
        {
          title: 'Validation produit et QA',
          description: 'Tests des livrables, vérification des parcours, identification des incohérences et remontées structurées à l’agence.',
        },
        {
          title: 'Retours utilisateurs',
          description: 'Organisation de tests avec des joueurs, collecte des irritants et priorisation des corrections ou évolutions à traiter.',
        },
        {
          title: 'Évolutions fonctionnelles',
          description: 'Ajout progressif de nouvelles features, dont un nouveau mode de jeu, des notifications et plusieurs améliorations UX.',
        },
        {
          title: 'Automatisation du scoring',
          description: 'Réduction des manipulations manuelles après les Grands Prix pour rendre la gestion du jeu plus rapide et fiable.',
        },
      ],
    },
    captures: [
      {
        src: '/screenshots/kop-app-preview01.png',
        alt: 'Écran mobile King Of Paddock',
        width: 430,
        height: 932,
      },
      {
        src: '/screenshots/kop-app-preview02.png',
        alt: 'Championnat mobile King Of Paddock',
        width: 430,
        height: 932,
      },
      {
        src: '/screenshots/kop-app-preview03.png',
        alt: 'Classement mobile King Of Paddock',
        width: 430,
        height: 932,
      },
      {
        src: '/screenshots/kop-app-preview04.png',
        alt: 'Sélection pilote mobile King Of Paddock',
        width: 430,
        height: 932,
      },
      {
        src: '/screenshots/kop-app-preview05.png',
        alt: 'Boutique mobile King Of Paddock',
        width: 430,
        height: 932,
      },
      {
        src: '/screenshots/kop-app-preview06.png',
        alt: 'Notifications mobile King Of Paddock',
        width: 430,
        height: 932,
      },
      {
        src: '/screenshots/kop-app-preview07.png',
        alt: 'Profil mobile King Of Paddock',
        width: 430,
        height: 932,
      },
    ],
    now: {
      body: [
        'Le produit est en constante évolution avec une migration technique en cours et de nouvelles features destinées à rendre le jeu plus fluide et plus engageant. Le produit compte déjà +100 utilisateurs et l’intérêt montré par les joueurs pour ce jeu me pousse sans cesse à réfléchir aux améliorations futures.',
      ],
    },
    cta: {
      productUrl: 'https://kingofpaddock.com',
      contactUrl: '/#contact',
    },
  },
  {
    slug: 'jcc-football',
    title: 'JCC Football',
    tagline:
      'Création d’un jeu de type cartes à collectionner et Fantasy football. Système de pack opening, ligue communautaire et data avancée.',
    shortDescription:
      'Side project construit pour explorer une app fantasy football avec cartes, packs, collection, équipes et interface admin.',
    cardImage: '/screenshots/jcc-football-card.webp',
    heroImage: {
      src: '/screenshots/jcc-football-card.webp',
      alt: 'Vue principale de JCC Football',
    },
    period: '2026',
    status: 'experiment',
    statusLabel: 'Prototype',
    category: 'product',
    skills: [
      'Conception produit',
      'Prototypage applicatif',
      'Structuration des données',
      'Logique de gameplay',
      'Tests des parcours utilisateurs',
    ],
    stack: ['App mobile', 'Next.js', 'Supabase', 'Codex', 'API Football', 'Live score'],
    githubUrl: '',
    links: [],
    need: {
      body: [
        'JCC Football est né après King Of Paddock, avec l’envie d’explorer un autre terrain de jeu : une fantasy football enrichie par une logique de cartes à collectionner. L’idée est de croiser les codes d’un jeu fantasy classique avec ceux d’une collection, où les cartes possédées peuvent influencer la composition, la valeur ou les performances d’une équipe.',
        'Le projet sert pour l’instant à tester les contours du concept : règles de collection, ouverture de packs, rareté des cartes, scoring des joueurs et lien entre data réelle et performance in game. L’objectif n’est pas encore de finaliser toute l’application, mais de vérifier si le mélange fantasy + collection peut produire une mécanique de jeu intéressante.',
      ],
    },
    build: {
      body: [
        'Le prototype a d’abord été construit autour de la mécanique de collection : ouverture de packs, ajout des cartes obtenues à la collection et premières règles autour de la disponibilité des joueurs.',
        'Le travail le plus structurant se trouve aujourd’hui côté data et admin. Une API football alimente la base de joueurs et leurs performances, puis un système de scoring interne traduit ces données en valeurs exploitables dans le jeu.',
        'L’espace admin permet de garder la main sur le prototype : sélectionner les joueurs disponibles, filtrer une base plus large, consulter les performances et préparer les règles qui pourront ensuite alimenter la partie fantasy de l’application.',
      ],
      features: [
        {
          title: 'Mécanique de packs',
          description: 'Ouverture de packs, ajout des cartes à la collection et premières règles de disponibilité.',
        },
        {
          title: 'Collection de cartes',
          description: 'Structure autour des joueurs, raretés, cartes possédées et logique de progression.',
        },
        {
          title: 'Intégration data football',
          description: 'Connexion à une API football pour récupérer les joueurs, clubs et performances réelles.',
        },
        {
          title: 'Scoring interne',
          description: 'Traduction des performances réelles en valeurs exploitables pour les mécaniques fantasy.',
        },
        {
          title: 'Espace admin',
          description: 'Sélection des joueurs disponibles, pilotage de la data et aperçu des performances du jeu.',
        },
      ],
    },
    captures: [
      {
        src: '/screenshots/jcc-foot-preview01.png',
        alt: 'Interface admin JCC Football',
        width: 1900,
        height: 900,
        full: true,
      },
      {
        src: '/screenshots/jcc-foot-preview02.png',
        alt: 'Gestion des joueurs JCC Football',
        width: 1900,
        height: 900,
      },
      {
        src: '/screenshots/jcc-foot-preview03.png',
        alt: 'Data football JCC Football',
        width: 1900,
        height: 900,
      },
      {
        src: '/screenshots/jcc-foot-preview04.png',
        alt: 'Configuration des cartes JCC Football',
        width: 1900,
        height: 900,
      },
      {
        src: '/screenshots/jcc-foot-preview05.png',
        alt: 'Aperçu des performances JCC Football',
        width: 1900,
        height: 900,
      },
      {
        src: '/screenshots/jcc-foot-preview06.webp',
        alt: 'Ouverture de pack mobile JCC Football',
        width: 1170,
        height: 2532,
      },
      {
        src: '/screenshots/jcc-foot-preview07.webp',
        alt: 'Collection mobile JCC Football',
        width: 1170,
        height: 2532,
      },
    ],
    now: {
      body: [
        'La mécanique de jeu est maintenant figée in-app. La logique fantasy et le système de scoring/affrontement restent encore à déterminer. Le prototype est toujours en cours de structuration, avec un soin particulier apporté à la logique de jeu, la data et les premiers parcours testables.',
      ],
    },
    cta: {
      productUrl: '',
      contactUrl: '/#contact',
    },
  },
  {
    slug: 'site-web-king-of-paddock',
    title: 'Website KOP',
    tagline:
      'Site internet de l’application King Of Paddock. Travail sur le référencement SEO et une page news d’informations F1.',
    shortDescription: '',
    cardImage: '/screenshots/king-of-paddock-site-card.webp',
    heroImage: {
      src: '/screenshots/king-of-paddock-site-card.webp',
      alt: 'Vue principale du site King Of Paddock',
    },
    period: '2022-Aujourd’hui',
    status: 'live',
    statusLabel: 'En ligne',
    category: 'product',
    skills: [
      'Cohérence produit',
      'Contenus orientés SEO',
      'Automatisation éditoriale',
      'Onboarding vers l’application',
      'Clarification du parcours',
      'Analyse des performances',
    ],
    stack: ['WordPress', 'SEO', 'Automatisation n8n', 'UX design', 'Landing page'],
    githubUrl: '',
    links: [
      { label: 'king-of-paddock.com', url: 'https://king-of-paddock.com/', icon: 'link' },
    ],
    need: {
      body: [
        'Le site King Of Paddock a été créé avant l’application. Il a d’abord servi à présenter le concept du jeu, à donner de la visibilité au projet et à recruter les premiers joueurs, à une période où les championnats étaient encore gérés manuellement sur tableurs.',
        'Cette première version avait un rôle simple : expliquer l’idée, rendre le projet plus concret et créer un point d’entrée public autour d’un jeu qui n’avait pas encore d’application dédiée. Le site posait les bases de l’univers King Of Paddock, avec les règles, le concept fantasy F1 et les premières informations utiles pour rejoindre le championnat.',
      ],
    },
    build: {
      body: [
        'Le site a été repris pour devenir plus clair, plus léger et plus utile. L’ancienne version était trop dense, avec beaucoup d’informations. La nouvelle approche se rapproche davantage d’une landing page, complétée par une page news.',
        'Le travail a surtout consisté à simplifier le parcours : présenter le jeu, renvoyer vers l’application, garder quelques règles accessibles et éviter de noyer les visiteurs dans des explications trop longues.',
        'La partie contenu repose aussi sur une logique d’automatisation. Les news F1 publiées sur le site sont alimentées par un workflow dédié, ce qui permet de maintenir une activité éditoriale régulière sans transformer la gestion du site en tâche manuelle lourde.',
      ],
      features: [
        {
          title: 'Support d’acquisition',
          description: 'Le site capte une partie des recherches autour de la Fantasy F1 et redirige les visiteurs vers l’application.',
        },
        {
          title: 'Présentation simplifiée du jeu',
          description: 'La structure a été allégée pour expliquer le concept sans perdre l’utilisateur dans un surplus d’informations.',
        },
        {
          title: 'Contenu éditorial',
          description: 'Une page news permet de faire vivre le site, d’améliorer le référencement et de garder un lien avec la communauté.',
        },
        {
          title: 'Automatisation des news',
          description: 'Les contenus F1 sont alimentés par un workflow d’automatisation pour réduire la charge de publication.',
        },
        {
          title: 'Support communautaire',
          description: 'Le site centralise le contact et les informations utiles autour de King Of Paddock.',
        },
      ],
    },
    captures: [
      {
        src: '/screenshots/kop-website-preview00.png',
        alt: 'Hero du site King Of Paddock',
        width: 1635,
        height: 832,
        full: true,
      },
      {
        src: '/screenshots/kop-website-preview01.png',
        alt: 'Page d’accueil du site King Of Paddock',
        width: 1609,
        height: 903,
      },
      {
        src: '/screenshots/kop-website-preview02.png',
        alt: 'Présentation du jeu King Of Paddock',
        width: 1810,
        height: 905,
      },
      {
        src: '/screenshots/kop-website-preview03.png',
        alt: 'Page news du site King Of Paddock',
        width: 1761,
        height: 896,
      },
      {
        src: '/screenshots/kop-website-preview04.webp',
        alt: 'Article F1 du site King Of Paddock',
        width: 1746,
        height: 901,
      },
      {
        src: '/screenshots/kop-website-preview05.png',
        alt: 'Section contact du site King Of Paddock',
        width: 1749,
        height: 909,
      },
    ],
    now: {
      body: [
        'Le site continue d’évoluer autour du contenu F1 et du jeu de fantasy. L’objectif à terme va être d’offrir aux joueurs un contenu communautaire se rapprochant davantage de leur expérience de jeu sur l’app, grâce à des liens plus étroits entre les deux composants de l’univers King Of Paddock.',
      ],
    },
    cta: {
      productUrl: 'https://king-of-paddock.com/',
      contactUrl: '/#contact',
    },
  },
]

export const productProjects = projects.filter((project) => project.category === 'product')
