export interface AboutStat {
  value: string
  label: string
}

export interface AboutProcessStep {
  title: string
  description: string
}

export interface AboutQuestion {
  question: string
  answer: string | string[]
  links?: {
    label: string
    href: string
  }[]
}

export const about = {
  name: 'Alexis',
  role: 'Product Builder & Tester',
  availability: 'Disponible actuellement',
  portrait: {
    src: '/profile/alek-portrait.webp',
    alt: "Portrait d'Alexis",
  },
  hero: {
    title: 'Alexis',
    intro:
      "Product Builder & Tester",
  },
  stats: [
    { value: '+10', label: 'produits construits' },
    { value: 'Produit & QA', label: 'concevoir, itérer, tester' },
    { value: 'Stack adaptable', label: 'selon le besoin' },
  ] satisfies AboutStat[],
  who: {
    title: 'Un profil hybride',
    paragraphs: [
      "Mon profil hybride vient de mon parcours : d'abord testeur sur ma propre application, je me suis ensuite pris de passion pour le code et le développement web.",
      "À travers mes formations en QA et en développement, puis mes projets personnels, j'ai progressivement renforcé ma vision produit initiée avec King Of Paddock, tout en développant mes compétences techniques.",
      "L'IA générative est ensuite devenue l'outil d'accélération qui me manquait pour passer de mes idées à des produits construits en quelques semaines. Mais ma priorité reste la même : créer des outils fiables, utilisables et suffisamment solides pour être livrés.",
      "Mon passé de testeur est un vrai atout dans cette approche. Il me pousse à penser aux parcours, aux cas limites, aux bugs possibles, à la sécurité et à tout ce qui peut fragiliser un produit pendant la phase de développement.",
      "Cette polyvalence volontaire me permet de prendre un problème de bout en bout, sans laisser le sujet se perdre entre produit, technique et qualité.",
    ],
  },
  method: {
    title: 'Construire, tester, améliorer',
    intro: [
      "Ma manière de travailler est assez simple : l'objectif est de rendre les idées manipulables rapidement, puis les challenger avec des tests, des retours et des cas concrets d'utilisation.",
      "L’IA m’aide à accélérer l’exécution, mais elle ne remplace pas le cadrage, les choix produit et la vérification de la fiabilité des fonctionnalités livrées.",
    ],
    steps: [
      {
        title: 'Construire',
        description: "D'un besoin à une première version utilisable.",
      },
      {
        title: 'Tester',
        description: 'Parcours, cas limites, comportements fragiles.',
      },
      {
        title: 'Améliorer',
        description: "Corriger à partir de ce que le produit révèle une fois utilisé.",
      },
    ] satisfies AboutProcessStep[],
  },
  concrete: {
    title: 'Du cadrage au suivi',
    items: [
      'Cadrer un besoin et apporter ma vision produit',
      'Construire des apps, outils web, dashboards et workflows',
      'Tester des parcours, cas limites et comportements fragiles',
      'Itérer avec une approche produit, qualité et usage réel',
    ],
  },
  clarity: {
    title: 'Travailler ensemble',
    intro: "Quelques repères simples pour comprendre le format dans lequel j'interviens.",
    items: [
      {
        title: 'Disponibilité limitée',
        description: 'Je prends un nombre limité de projets afin d’en assurer un meilleur suivi.',
      },
      {
        title: 'Échange direct',
        description: 'Un contact permanent avec un interlocuteur unique à chaque étape du projet.',
      },
      {
        title: 'Format adaptable',
        description: "Mission courte, prototype, outil interne ou amélioration d'un produit existant.",
      },
      {
        title: 'Priorité au concret',
        description: "L'objectif est d'avancer vers un produit testable rapidement, sans le faire au détriment de la qualité.",
      },
    ],
  },
  profile: [
    { label: 'Basé à', value: 'Lyon - France (remote)' },
    { label: 'Langues', value: 'Français - Anglais' },
    { label: 'Focus', value: 'Produit - QA - IA' },
  ],
  questions: [
    {
      question: 'Travailles-tu en freelance ?',
      answer:
        "En effet, j'interviens sur des missions plus ou moins longues, selon le besoin, la disponibilité et le niveau d'accompagnement attendu. Je développe également en parallèle mes propres projets comme MyQAssist.",
      links: [{ label: 'MyQAssist', href: '/projects/myqassist' }],
    },
    {
      question: "À quel moment peux-tu intervenir sur un projet ?",
      answer:
        "Je peux intervenir dès l'idée en vous accompagnant à la mise en place du projet, sur un prototype à construire, ou encore sur un produit existant à tester, améliorer et fiabiliser.",
    },
    {
      question: 'Quel type de projet peux-tu accompagner ?',
      answer:
        "Principalement des apps, des outils web comme des sites internet ou des landing page, des dashboards ou autres types de produits internes. Je peux également mettre en place des automatisations afin de libérer des équipes de tâches manuelles répétitives.",
    },
    {
      question: "L'IA fait tout le travail ?",
      answer: [
        "L'IA fait partie intégrante de mon environnement de travail, mais elle ne remplace pas ma vision fonctionnelle du produit.",
        "Elle change ma capacité d'exécution : je peux produire plus vite, travailler sur des stacks différentes, comparer plusieurs approches techniques et passer de l'idée au produit fonctionnel sans rester bloqué sur chaque détail de code. Mon rôle reste de cadrer la direction, comprendre ce qui est généré, challenger les choix proposés et vérifier la fiabilité.",
      ],
    },
  ] satisfies AboutQuestion[],
}
