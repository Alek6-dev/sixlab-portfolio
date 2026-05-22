# AGENTS.md

## Projet

Portfolio personnel d'Alexis, positionné **Product Builder & Tester**.

Note identite / marque :

- le nom a utiliser dans les nouvelles experiences de contact est **Alexis** ;
- le domaine achete est `sixlab.fr` ;
- direction future de naming : **Sixlab** / **6Lab by Alexis** ;
- le site n'est pas encore entierement renomme : garder en tete cette transition pour les prochaines passes de contenu.

Le site doit montrer :

- le passage d'une idée, d'un besoin ou d'un projet à un outil digital concret ;
- une approche mêlant produit, QA, IA générative, automatisation et workflows ;
- des projets et automatisations comme preuves principales ;
- une voix humaine, directe, non générique.

Ce n'est pas une landing page d'agence ni un site de vente agressif.

## Collaboration avec Alexis

Alexis veut écrire et décider lui-même les textes. L'agent doit aider à affiner, pas prendre la main.

À faire :

- attendre les propositions d'Alexis quand on travaille le wording ;
- aider à décider entre des nuances ;
- pointer les vrais risques de lecture ;
- préserver sa voix, même si elle est brute au départ ;
- intervenir quand un texte devient confus, générique ou incohérent avec le profil.

À éviter :

- proposer systématiquement une meilleure version ;
- réécrire par réflexe une phrase qui avance déjà dans la bonne direction ;
- valider tout mollement ;
- transformer le site en discours d'agence/freelance trop commercial.

Quand Alexis demande ou modifier un element dans le code, toujours donner le fichier et la ligne
precise a chercher, en plus de la classe ou valeur a changer.

## Stack

- Next.js 15, App Router
- React 19
- TypeScript
- Tailwind CSS 3
- Lucide React

Commandes :

```bash
npm.cmd run dev
npm.cmd run build
```

## Derniere session

Travail realise :

- bouton hero `Me contacter` relie a la section `Get in touch` via `#contact` ;
- image MyQAssist integree dans la card projet via `project.image` ;
- conversion propre de la derniere image en WebP avec `sharp` :
  - source testee : `ChatGPT Image 20 mai 2026, 16_52_59.png` ;
  - sortie : `public/screenshots/myqassist-card.webp` ;
  - taille : 1200 x 800 ;
  - poids observe : environ 33 Ko ;
- anciens essais `myqassist-card.png` et `myqassist-card.jpg` supprimes ;
- iconographie chat harmonisee : le submit mail/telephone utilise `Send` au lieu d'un chevron ;
- icone `Send` du submit contact legerement agrandie et ajustee optiquement.

Point important pour la suite :

- Alexis va continuer a travailler les textes et les images projet ;
- prochaine grosse passe prevue : responsive de la home avant d'attaquer plus loin les pages projets.

## Fichiers importants

- `src/app/page.tsx` : homepage, hero, focus areas, teaser about, sections produits et automatisations
- `src/app/about/page.tsx` : page À propos
- `src/data/projects.ts` : source de vérité des produits/projets applicatifs
- `src/data/automations.ts` : source de vérité des automatisations
- `src/components/ProductProjectsCarousel.tsx` : carousel des produits
- `src/components/ProjectCards.tsx` : cards produits
- `src/components/AutomationSection.tsx` : navigation des automatisations
- `src/components/AutomationCard.tsx` : card automatisation avec workflow animé
- `src/components/ContactSection.tsx` : section contact legere avec choix de canal
- `src/components/ContactChatWindow.tsx` : fenetre flottante de contact conversationnel
- `tailwind.config.ts` : tokens couleur
- `CLAUDE.md` : mémoire projet plus détaillée

## État actuel de la home

Ordre :

1. Hero `Product Builder & Tester`
2. `Mon travail au quotidien`
3. Card teaser `En quelques mots`
4. `Mes produits`
5. `Mes automatisations`
6. `Get in touch` / section contact

Les 3 items validés :

- `Construire à partir du besoin`
- `Tester la fiabilité des produits`
- `Automatiser des tâches`

## Section Mes Produits

La section affiche les projets applicatifs issus de `productProjects`.

Les cards produits sont alignées avec des hauteurs fixes par zone :

- titre/statut ;
- description ;
- stack ;
- lien `Voir le projet`.

La pagination du carousel est réelle et bouclée. Si le nombre de projets ne dépasse pas la vue, elle disparaît.

Notes recentes section produits :

- les cards produits acceptent un champ optionnel `image` dans `src/data/projects.ts` ;
- si `project.image` existe, `src/components/ProjectCards.tsx` affiche cette vraie image via `next/image` ;
- sinon la card garde le mockup React existant ;
- MyQAssist pointe actuellement vers `public/screenshots/myqassist-card.webp` ;
- pour les prochaines images projet : WebP, ratio 3:2, dimensions conseillees 1200 x 800 ;
- ne pas fallback en PNG/JPG si Alexis demande WebP ;
- `sharp` est disponible dans `node_modules` et peut convertir localement les images en WebP ;
- le carousel produits est une piste horizontale animee, avec 3 cards visibles desktop, 2 tablette, 1 mobile ;
- les points de pagination sont calcules selon le nombre de positions possibles.

## Section Mes Automatisations

La section est alimentée par `src/data/automations.ts`.

Chaque automatisation contient :

- `title`, `description`, `status`, `statusLabel`, `stack` ;
- `flow.nodes[]` avec `id`, `label`, `type`, `task`.

Le workflow est animé :

- node `idle` : sombre ;
- node `running` : orange/ambre avec glow local ;
- node `done` : vert ;
- les liaisons se remplissent avec une boule animée ;
- la liaison reste jaune tant que le node de droite est en cours ;
- elle passe verte quand le node de droite est validé.

Sous le schéma, une liste de tâches synchronisée explique concrètement ce que fait chaque étape.

Indicateurs de ligne :

- attente : `CircleDashed`, gris ;
- en cours : `Hourglass`, ambre ;
- validé : `Check`, vert.

La liste garde une hauteur stable :

- jusqu'à 5 lignes : contenu centré verticalement dans son espace ;
- à partir de 6 lignes : scroll interne, avec suivi automatique de l'étape active.

La pagination automatisations suit le mockup : flèches carrées, compteur `01 / 03`, index accentué et total blanc.

Notes recentes section automatisations :

- la card automatisation utilise un effet de pile dynamique ;
- `src/components/AutomationSection.tsx` calcule les cards derriere via `automations.slice(activeIndex + 1)` ;
- quand la premiere automatisation est active, les suivantes apparaissent derriere ;
- quand la deuxieme est active, seules les suivantes restantes apparaissent ;
- quand la derniere est active, il n'y a plus rien derriere ;
- si une nouvelle automatisation est ajoutee, la pile s'adapte automatiquement ;
- les elements derriere doivent rester opaques, propres, alignes, et ne doivent pas dessiner de traits visibles a l'interieur de la card active.

Reglages utiles dans `AutomationSection.tsx` :

- `stackOffsetPx` : espacement vertical entre les cards de la pile ;
- `stackPaddingPx` : espace reserve sous la card active ;
- `insetInline` dans le style de la card empilee : retrait horizontal.

## Section Contact / Get in touch

La section contact est volontairement plus interactive qu'un formulaire classique.

Etat actuel :

- la card reste legere : texte a gauche, boutons de contact a droite ;
- la section `Get in touch` porte l'ancre `id="contact"` dans `src/app/page.tsx` ;
- le bouton `Me contacter` du hero pointe vers `#contact` ;
- titre actuel : `Un projet a faire avancer ?` ;
- texte actuel : `Idee naissante, besoin a cadrer, produit a tester ou workflow a structurer : quelques lignes suffisent pour lancer la discussion.` ;
- boutons icones : message, LinkedIn, GitHub, calendrier ;
- le bouton calendrier est un placeholder `bientot` ;
- au hover/focus des boutons, une phrase courte apparait sous les boutons :
  - `Envoyer un message`
  - `Me contacter sur LinkedIn`
  - `Voir mes projets`
  - `Reserver un creneau`

Comportement du bouton message :

- ouvre une vraie fenetre flottante en bas a droite du site ;
- le reste du site passe derriere un overlay sombre legerement floute ;
- la fenetre est une interface de contact conversationnelle, pas un chatbot live ;
- header : avatar/initiale `A`, nom `Alexis`, bouton fermeture ;
- le bouton d'envoi du message et le bouton d'envoi du moyen de contact utilisent tous les deux l'icone Lucide `Send` ;
- parcours actuel :
  1. Alexis demande de parler du sujet ;
  2. l'utilisateur saisit son message ;
  3. le message utilisateur apparait dans la conversation ;
  4. Alexis demande comment recontacter ;
  5. choix `Mail` ou `Telephone` ;
  6. validation simple du format email ou telephone cote front ;
  7. message final de confirmation.

Important :

- ne pas afficher `Message asynchrone` sous le nom Alexis dans le header ;
- ne pas donner une vibe service client / chatbot support ;
- garder une interface sobre, personnelle, compacte, dans le langage dark minimal du site ;
- pour l'instant l'envoi est simule cote front : rien ne part encore par email, webhook ou API.

## Design

Respecter les tokens Tailwind existants :

- `canvas`, `panel`, `line`, `copy`, `brand`, `status`

Principes :

- dark minimal ;
- accent ambre/orange ;
- `rounded-lg`, pas d'ovales gratuits ;
- éviter les cards imbriquées ;
- pas de blobs/orbs décoratifs ;
- liens texte simples quand le CTA ne doit pas être un bouton ;
- Lucide React pour les icônes.

Toujours vérifier avec :

```bash
npm.cmd run build
```
