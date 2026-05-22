# Portfolio Alek - Mémoire Projet

## Objectif du site

Portfolio personnel d'Alek. Le site doit montrer une posture de **Product Builder & Tester** :
construire des produits digitaux, tester leur fiabilité, automatiser ce qui peut l'être, et
relier idée, usage, qualité et amélioration produit.

Le site n'est pas une landing page d'agence ni une page de vente agressive. Il doit donner envie
de comprendre le profil, puis surtout de regarder les projets et automatisations comme preuves
concrètes.

Objectifs principaux :

- crédibiliser le profil par des réalisations concrètes ;
- montrer une capacité à passer d'une idée/besoin/projet à un outil digital utilisable ;
- assumer le mélange produit, QA, IA générative, automatisation et workflows ;
- garder une voix humaine, directe, pas générique.

## Manière de travailler les textes

Important : Alek veut construire les textes lui-même. Le rôle de l'assistant est d'aider à la
prise de décision, à la cohérence, au rythme et aux risques de lecture, pas de reprendre la main
en proposant systématiquement "une meilleure version".

Bon comportement :

- attendre qu'Alek propose une phrase ou une direction ;
- dire ce que la phrase produit comme effet ;
- signaler uniquement les vrais problèmes : confusion, incohérence, ton trop générique,
  contradiction avec le positionnement, formulation qui crée une mauvaise lecture ;
- éviter les micro-réécritures non demandées quand la phrase est déjà dans la bonne direction ;
- ne pas valider mollement chaque idée, mais ne pas chercher à optimiser par réflexe.

## Stack technique

- Next.js 15 avec App Router
- React 19
- TypeScript
- Tailwind CSS 3
- Lucide React pour les icônes
- Police Inter via `next/font/google`
- Site statique, sans backend

Commandes utiles :

```bash
npm.cmd run dev
npm.cmd run build
```

Le serveur local habituel est `http://localhost:3000`.

## Structure actuelle

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/page.tsx
│   └── projects/[slug]/page.tsx
├── components/
│   ├── AutomationCard.tsx
│   ├── AutomationSection.tsx
│   ├── FadeIn.tsx
│   ├── Footer.tsx
│   ├── HeroShowcase.tsx
│   ├── Navbar.tsx
│   ├── ProductProjectsCarousel.tsx
│   ├── ProjectCards.tsx
│   ├── ProjectMockup.tsx
│   └── TypewriterText.tsx
└── data/
    ├── automations.ts
    └── projects.ts
```

`src/data/projects.ts` est la source de vérité des produits/projets applicatifs.
`src/data/automations.ts` est la source de vérité des automatisations.

## Homepage actuelle

Ordre de la home :

1. Hero `Product Builder & Tester`
2. Section `Mon travail au quotidien`
3. Card teaser `En quelques mots`
4. `Mes produits`
5. `Mes automatisations`

### Section "Mon travail au quotidien"

Les 3 items validés :

- `Construire à partir du besoin`
- `Tester la fiabilité des produits`
- `Automatiser des tâches`

Ces titres sont stables. Les descriptions peuvent encore être travaillées.

### Card teaser "En quelques mots"

Ajoutée dans `src/app/page.tsx` via le composant local `AboutTeaser`.

Rôle de la section :

- casser légèrement le rythme après les 3 items ;
- humaniser la home ;
- donner envie d'aller sur la page À propos ;
- ne pas prendre la place principale des projets.

Design :

- grande card cohérente avec les mini-cards d'icônes ;
- `rounded-lg`, bordure `border-line`, fond `bg-panel/70` ;
- photo actuelle via `aboutTeaser.image: '/profile/alek-portrait.webp'` ;
- lien texte simple vers `/about`, sans forme/pill/bouton ;
- texte avec effet typewriter au scroll.

Texte en cours :

```text
Constamment animé par la résolution de problématiques, je réfléchis sans cesse aux idées qui donnent vie à un projet. J’ai construit mes propres produits et outils avec cette logique, et je veux aujourd’hui l’appliquer à de nouveaux besoins. Cadrer, construire, tester, améliorer, avec l’IA générative comme accélérateur et la fiabilité comme exigence.
```

## Mes produits

La section s'appelle actuellement `Mes produits`.

Elle affiche les entrées `productProjects` issues de `src/data/projects.ts`.

Projets produits actuels :

- `myqassist` : SaaS QA, bêta publique ;
- `king-of-paddock` : fantasy F1 en ligne ;
- `jcc-football` : prototype fantasy football en cartes ;
- `site-web-king-of-paddock` : site web KOP.

Les anciens workflows ont été retirés de `projects.ts` pour éviter la section fourre-tout.

Les cards produits utilisent des hauteurs fixes internes pour éviter les décalages :

- zone titre/statut ;
- zone description ;
- zone stack ;
- CTA aligné en bas.

Le carousel `ProductProjectsCarousel` :

- affiche 3 projets par vue ;
- boucle avec précédent/suivant ;
- masque la pagination si elle n'est pas nécessaire ;
- utilise des dots et flèches.

## Mes automatisations

La section est alimentée par `src/data/automations.ts`.

Automatisations actuelles :

- `automation-ga4` : automatisation Google Analytics ;
- `f1-results-pipeline` : pipeline résultats F1 ;
- `f1-news-automation` : automatisation articles F1.

Chaque automatisation contient :

```ts
{
  slug: string
  title: string
  description: string
  status: 'live' | 'in-progress' | 'experiment'
  statusLabel: string
  stack: string[]
  flow: {
    nodes: Array<{
      id: string
      label: string
      type: 'input' | 'process' | 'analysis' | 'output'
      task: string
    }>
  }
}
```

### Workflow animé

Le workflow est rendu dans `AutomationCard.tsx`.

Comportement :

- les nodes sont distribués sur la largeur commune du schéma et de la liste ;
- les nodes et liaisons s'adaptent au nombre d'étapes ;
- `idle` : node sombre ;
- `running` : node ambre avec glow local ;
- `done` : node vert ;
- la liaison se remplit avec une boule animée ;
- la liaison reste ambre tant que le node de droite est en cours ;
- elle passe verte quand le node de droite est validé ;
- pause finale de `cyclePauseMs = 4500` avant redémarrage.

Sous le schéma, la liste des tâches est synchronisée avec les nodes.

États des lignes :

- attente : icône `CircleDashed`, gris sombre ;
- en cours : icône `Hourglass`, ambre ;
- validé : icône `Check`, vert, et texte en `text-copy`.

Les lignes gardent un style fixe pour éviter une animation trop chargée.

Gestion de hauteur :

- la card automatisation a une hauteur stable ;
- zones texte/description/stack/CTA stabilisées côté gauche ;
- zone workflow stabilisée côté droit ;
- jusqu'à 5 lignes : les lignes sont centrées verticalement dans l'espace prévu ;
- à partir de 6 lignes : scroll interne dans la liste, avec suivi automatique de l'étape active.

Pagination automatisations :

- flèches carrées avec bordure ambre ;
- compteur type `01 / 03` ;
- index actif en `brand`, total en blanc ;
- taille légèrement plus petite que le premier mockup, mais lisible.

## Design System

Palette définie dans `tailwind.config.ts` :

- `canvas` : fond global sombre ;
- `panel` : surfaces/cards ;
- `line` : bordures ;
- `copy` : textes ;
- `brand` : accent orange/ambre ;
- `status` et `project` : badges/projets.

Principes visuels :

- dark minimal ;
- accent ambre/orange ;
- pas de blobs/orbs décoratifs ;
- éviter les cards imbriquées ;
- coins `rounded-lg` maximum pour rester cohérent ;
- boutons cohérents : boutons pleins/outline dans le hero, liens texte simples ailleurs ;
- Lucide React pour les icônes.

Titres de section :

- uppercase ;
- tracking large ;
- `text-brand-200` ;
- lignes horizontales fines autour/à côté selon le contexte.

## Points à faire plus tard

- Revalider le responsive global de toute la home.
- Continuer à enrichir/affiner les données des automatisations.
- Travailler les prochaines sections : offre, outils/stack ou contact.
- Renseigner les liens LinkedIn/contact définitifs.
- Reprendre une photo pro pour une posture freelance plus actuelle.
