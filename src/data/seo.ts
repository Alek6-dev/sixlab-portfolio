export const siteUrl = 'https://www.sixlab.fr'

export const defaultSeo = {
  siteName: 'Sixlab',
  title: 'Sixlab - Applications web, logiciels sur mesure et automatisations',
  description:
    "Portfolio d'Alexis autour de la création d'applications web, de logiciels sur mesure, d'automatisations et de produits digitaux conçus, testés et améliorés.",
}

export const aboutSeo = {
  title: 'À propos - Alexis, Product Builder & Tester',
  description:
    "Découvrez le profil d'Alexis : produit, QA, développement web assisté par IA, automatisation et méthode pour cadrer, construire, tester et améliorer des produits digitaux.",
}

export const projectSeo: Record<string, { title: string; description: string }> = {
  myqassist: {
    title: 'MyQAssist - SaaS QA assisté par IA',
    description:
      "Projet SaaS QA pour transformer un contexte produit en exigences, cas de test, exports et indicateurs de couverture avec l'aide de l'IA générative.",
  },
  'king-of-paddock': {
    title: 'King Of Paddock - Application fantasy F1',
    description:
      'Application fantasy F1 avec championnats privés, scoring automatisé, parcours utilisateurs, évolutions produit et tests fonctionnels.',
  },
  'jcc-football': {
    title: 'JCC Football - Prototype fantasy football et cartes',
    description:
      "Prototype d'application fantasy football avec cartes à collectionner, packs, data football, scoring interne et interface admin.",
  },
  'site-web-king-of-paddock': {
    title: 'Website KOP - Site web, SEO et automatisation éditoriale',
    description:
      "Site web pour King Of Paddock, pensé comme support d'acquisition avec contenus SEO, page news F1 et automatisation éditoriale.",
  },
}
