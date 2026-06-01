# AGENTS.md

## Projet

Portfolio personnel d'Alexis, positionne **Product Builder & Tester**.

Note identite / marque :

- le nom a utiliser dans les nouvelles experiences de contact est **Alexis** ;
- le domaine achete est `sixlab.fr` ;
- direction future de naming : **Sixlab** / **6Lab by Alexis** ;
- le site n'est pas encore entierement renomme : garder en tete cette transition.

Le site doit montrer :

- le passage d'une idee, d'un besoin ou d'un projet a un outil digital concret ;
- une approche melant produit, QA, IA generative, automatisation et workflows ;
- des projets et automatisations comme preuves principales ;
- une voix humaine, directe, non generique.

Ce n'est pas une landing page d'agence ni un site de vente agressif.

## Collaboration avec Alexis

Alexis veut ecrire et decider lui-meme les textes. L'agent doit aider a affiner, pas prendre la main.

A faire :

- attendre les propositions d'Alexis quand on travaille le wording ;
- aider a decider entre des nuances ;
- pointer les vrais risques de lecture ;
- preserver sa voix, meme si elle est brute au depart ;
- intervenir quand un texte devient confus, generique ou incoherent avec le profil.

A eviter :

- proposer systematiquement une meilleure version ;
- reecrire par reflexe une phrase qui avance deja dans la bonne direction ;
- valider tout mollement ;
- transformer le site en discours d'agence/freelance trop commercial.

Quand Alexis demande ou modifier un element dans le code, toujours donner le fichier et la ligne precise a chercher, en plus de la classe ou valeur a changer.

## Methode de travail

Alexis veut avancer plus consciemment sur le projet pour eviter de coder trop vite, de poser des solutions bancales, puis de revenir dessus ensuite.

Regle durable :

- pour une petite retouche visuelle localisee, l'agent peut agir directement ;
- pour tout code structurant, l'agent doit d'abord expliquer ce qu'il prevoit de faire et attendre validation avant de coder.

Est considere comme structurant :

- modification du modele de donnees ;
- changement de structure de composants ;
- creation/deplacement/suppression de fichiers importants ;
- changement de routing ou de dossier App Router ;
- logique partagee entre plusieurs pages ou composants ;
- fallback, compatibilite, abstraction ou helper susceptible d'impacter la comprehension du code.

Avant de coder du structurant, l'agent doit fournir un brief court avec :

- ce qu'il a compris ;
- ce qu'il compte modifier ;
- les fichiers concernes ;
- les alternatives possibles si elles existent ;
- les risques ou points d'attention ;
- les hypotheses prises.

Ne pas coder selon une interpretation personnelle sans la nommer. Ne pas ajouter de fallback, double logique, compatibilite cachee ou abstraction "pratique" sans l'expliquer avant.

Important pour la suite :

- ne pas ajouter de fallback, compatibilite cachee ou double logique sans l'expliquer avant ;
- garder les modeles de donnees simples et previsibles ;
- separer strictement structure de template et donnees propres a chaque projet.

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

Toujours verifier avec :

```bash
npm.cmd run build
```

## Derniere session

Travail realise :

- reprise des pages projet avec un template type case study inspire du mockup Claude Design ;
- hero image projet, factsheet sticky, sections narratives, captures et CTA projet/contact ;
- la structure fixe de la page projet a ete sortie de la data projet :
  - `src/app/projects/[slug]/projectTemplate.ts` contient les labels communs (`Stack & outils`, `Competences mobilisees`, `Periode`, `Statut`, `01 - Context`, `02 - Build`, `03 - Preview`, CTA, etc.) ;
  - `src/data/projects.ts` ne contient que les valeurs propres a chaque projet ;
- modele `Project` simplifie et plus scalable :
  - `cardImage` pour la card home ;
  - `heroImage` pour le hero de page projet ;
  - `period`, `status`, `statusLabel`, `skills`, `stack`, `githubUrl`, `links` pour la factsheet ;
  - `need`, `build`, `captures`, `now` pour le contenu de page projet ;
  - `cta.productUrl` et `cta.contactUrl` pour les boutons ;
- ancienne logique `caseStudy`, `outcome`, `next`, `sections`, `proofPoints`, `primaryCta`, `secondaryCta`, `role`, `type` retiree ;
- `outcome` / `Ce que ca demontre` supprime car le wording ne convenait pas ;
- une seule section finale reste : `now`, rendue par le template comme `04 - Now` / `La suite` ;
- regle CTA unique : URL remplie = bouton affiche, URL vide = bouton masque ;
- `src/components/ProjectCards.tsx` lit maintenant `project.cardImage` pour la home.
- les liens GitHub suivent la meme regle : `githubUrl` rempli = lien GitHub affiche dans la card liens ; `githubUrl: ''` = lien masque ;
- `ContactSection` supporte `variant="home"` et `variant="project"` ; les pages projet reutilisent le meme bandeau que la home, avec un wording projet ;
- les skills de la factsheet sont une liste avec icones `ChevronRight`, alignees verticalement avec le texte.

Travail contenu MyQAssist realise :

- `01 - Context` est en place avec un positionnement clair : MyQAssist aide le QA a passer de la feuille blanche a une premiere base de tests fonctionnels, sans remplacer son jugement ;
- `02 - Build` est en place, avec un texte centre sur la methode de construction par jalons ;
- le `build.body` actuel raconte la methode de construction par jalons, autour de quatre themes : socle technique, moteur IA, usage reel, robustesse ;
- la liste `build.features` est conservee au format titre + description et ne doit pas etre remplacee par les jalons ;
- les textes MyQAssist qui avaient des caracteres casses ont ete nettoyes (`need.body`, `build.body`, `now.body`, tagline, skills).
- `03 - Preview` utilise les captures `myqassist-preview01.png` a `myqassist-preview06.png`.

Travail contenu King Of Paddock app realise :

- page projet `king-of-paddock` stabilisee sur le fond ;
- `01 - Context` pose le jeu fantasy F1, les week-ends de Grand Prix, la strategie, les championnats prives et l'equilibre accessibilite/profondeur ;
- `02 - Build` raconte la construction en plusieurs phases : produit cadre/livre avec agence, validation produit/QA, puis reprise progressive des evolutions avec IA generative et developpeur senior ;
- `build.features` resume les axes : cadrage des regles de jeu, validation produit et QA, retours utilisateurs, evolutions fonctionnelles, automatisation du scoring ;
- `03 - Preview` utilise les captures mobiles `kop-app-preview01.png` a `kop-app-preview07.png` ;
- `04 - Now` est en place avec la migration technique, les nouvelles features et la base utilisateurs.

Travail contenu JCC Football realise :

- page projet `jcc-football` stabilisee sur le fond ;
- positionnement : prototype d'exploration fantasy football + cartes a collectionner, sans survendre l'app comme produit finalise ;
- `01 - Context` explique le melange fantasy + collection, les cartes, packs, raretes, scoring et lien entre data reelle et performance in game ;
- `02 - Build` met l'accent sur la mecanique de packs, la collection, la data football, le scoring interne et l'espace admin ;
- `03 - Preview` mixe 5 captures desktop admin visibles et 2 captures mobiles accessibles dans la galerie (`jcc-foot-preview01` a `07`) ;
- `04 - Now` precise que la mecanique de jeu in-app est figee, mais que la logique fantasy et scoring/affrontement restent a determiner.

Travail contenu Website KOP realise :

- page projet `site-web-king-of-paddock` travaillee sur le fond ;
- `01 - Context` explique que le site existait avant l'application, servait a presenter le concept, recruter les premiers joueurs et donner un point d'entree public au jeu ;
- `02 - Build` explique la reprise du site, sa simplification en logique landing page, la page news et l'automatisation editoriale ;
- `build.features` couvre acquisition, presentation simplifiee, contenu editorial, automatisation des news et support communautaire ;
- `03 - Preview` utilise les captures `kop-website-preview00.png` a `kop-website-preview05.png` ;
- skills actuelles : coherence produit, contenus orientes SEO, automatisation editoriale, onboarding vers l'application, clarification du parcours, analyse des performances ;
- stack actuelle : WordPress, SEO, Automatisation n8n, UX design, Landing page.

Contact chat / Brevo :

- le chat de contact n'est plus seulement simule ;
- route API creee : `src/app/api/contact/route.ts` ;
- `ContactChatWindow` envoie maintenant vers `/api/contact` ;
- l'envoi passe par l'API transactionnelle Brevo via `fetch`, sans package externe ;
- fichier local cree : `.env.local` avec `BREVO_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` ;
- ne jamais commiter `.env.local` ;
- test local reussi : Alexis a recu un mail Brevo avec le message et l'email de contact ;
- comme l'adresse actuelle est Gmail, Brevo peut afficher un expediteur technique `brevosend.com` : c'est acceptable pour tester ;
- en production, il faudra ajouter les memes variables d'environnement dans l'hebergeur ;
- plus tard, pour un expediteur propre, creer/valider une adresse type `contact@sixlab.fr` et authentifier le domaine dans Brevo.

Galerie preview projet :

- composant : `src/components/ProjectPreviewGallery.tsx` ;
- 5 captures visibles maximum ;
- si plus de 5 captures : overlay `+n` sur la derniere vignette visible ;
- clic sur une capture : lightbox sombre avec image arrondie, navigation precedent/suivant, fermeture par croix, clic fond ou touche Escape ;
- detection automatique du layout sur les 5 images visibles :
  - majorite paysage : layout desktop en 2 lignes (2 captures puis 3 captures) ;
  - majorite portrait : layout mobile en une grille sans scrollbar ;
- pour les galeries mixtes, placer les 5 images qui doivent definir le layout en premier dans `captures`.

Point important pour la suite :

- ne pas remettre de labels structurels dans `src/data/projects.ts` ;
- la data injecte du contenu dans un template fixe ;
- prochain gros point bloque avant mise en ligne : la page `about`, qu'Alexis a jugee non faite / pas satisfaisante ;
- ensuite : relecture globale des pages projet et de la home ;
- avant production : ajouter les variables Brevo dans l'hebergeur, deployer, puis brancher le domaine `sixlab.fr`.

## Fichiers importants

- `src/app/page.tsx` : homepage, hero, focus areas, teaser about, sections produits et automatisations
- `src/app/about/page.tsx` : page A propos
- `src/app/projects/[slug]/page.tsx` : template dynamique des pages projet
- `src/app/projects/[slug]/projectTemplate.ts` : structure fixe des pages projet, labels, titres de section et CTA
- `src/data/projects.ts` : source de verite des produits/projets applicatifs
- `src/data/automations.ts` : source de verite des automatisations
- `src/components/ProductProjectsCarousel.tsx` : carousel des produits
- `src/components/ProjectCards.tsx` : cards produits
- `src/components/AutomationSection.tsx` : navigation des automatisations
- `src/components/AutomationCard.tsx` : card automatisation avec workflow anime
- `src/components/ContactSection.tsx` : section contact legere avec choix de canal
- `src/components/ContactChatWindow.tsx` : fenetre flottante de contact conversationnel
- `tailwind.config.ts` : tokens couleur
- `CLAUDE.md` : memoire projet plus detaillee

## Etat actuel de la home

Ordre :

1. Hero `Product Builder & Tester`
2. `Mon travail au quotidien`
3. Card teaser `En quelques mots`
4. `Mes produits`
5. `Mes automatisations`
6. `Get in touch` / section contact

Les 3 items valides :

- `Construire a partir du besoin`
- `Tester la fiabilite des produits`
- `Automatiser des taches`

## Section Mes Produits

La section affiche les projets applicatifs issus de `productProjects`.

Les cards produits sont alignees avec des hauteurs fixes par zone :

- titre/statut ;
- description ;
- stack ;
- lien `Voir le projet`.

Notes recentes section produits :

- les cards produits utilisent `cardImage` dans `src/data/projects.ts` ;
- `src/components/ProjectCards.tsx` affiche cette vraie image via `next/image` ;
- si un projet n'a pas d'image exploitable, garder un fallback propre via `ProjectMockup` ;
- MyQAssist pointe actuellement vers `public/screenshots/myqassist-card.webp` ;
- pour les prochaines images projet : WebP, ratio 3:2, dimensions conseillees 1200 x 800 ;
- ne pas fallback en PNG/JPG si Alexis demande WebP ;
- `sharp` est disponible dans `node_modules` et peut convertir localement les images en WebP ;
- le carousel produits est une piste horizontale animee, avec 3 cards visibles desktop, 2 tablette, 1 mobile.

## Pages Projet

Les pages projet utilisent une route dynamique Next.js :

- dossier : `src/app/projects/[slug]/` ;
- exemple : `/projects/myqassist` charge le projet dont `slug` vaut `myqassist`.

Principe important :

- `projectTemplate.ts` contient la structure qui ne change pas d'un projet a l'autre ;
- `projects.ts` contient uniquement les donnees qui changent par projet ;
- ne pas dupliquer les labels `Stack & outils`, `Competences mobilisees`, `Periode`, `Statut`, `01 - Context`, `03 - Preview`, etc. dans chaque projet.

Structure actuelle du modele `Project` :

- `slug`, `title`, `tagline`, `shortDescription` ;
- `cardImage` pour la card home ;
- `heroImage` pour le hero de la page projet ;
- `period`, `status`, `statusLabel`, `category` ;
- `skills`, `stack`, `githubUrl`, `links` ;
- `need` : texte de la section `01 - Context` ;
- `build` : texte + `features` de la section `02 - Build` ;
- `captures` : images de la section `03 - Preview` ;
- `now` : section finale `04 - Now` / `La suite` ;
- `cta.productUrl`, `cta.contactUrl`.

Regle des CTA :

- `cta.productUrl` rempli : affiche le bouton `Voir le produit en ligne` ;
- `cta.productUrl: ''` : masque ce bouton ;
- `cta.contactUrl` rempli : affiche le bandeau contact projet ;
- `cta.contactUrl: ''` : masque ce bandeau ;
- `githubUrl` rempli : affiche le lien GitHub dans la card liens ;
- `githubUrl: ''` : masque le lien GitHub.

Ordre actuel de la page projet :

1. retour aux projets ;
2. hero image, bouton produit si `productUrl`, titre projet ;
3. factsheet gauche : stack & outils, competences mobilisees, periode, statut, liens ;
4. contenu droite : `01 - Context`, `02 - Build`, `03 - Preview`, `04 - Now` ;
5. bandeau contact projet sur toute la largeur du bloc si `contactUrl` est rempli.

Regle preview :

- `captures` alimente `ProjectPreviewGallery` ;
- renseigner `width` et `height` quand c'est possible, surtout pour les captures portrait/mobile ;
- pour une galerie mixte desktop/mobile, l'ordre des 5 premieres captures determine le layout visible ;
- eviter les barres de scroll dans les previews.

Ne pas utiliser :

- `caseStudy` ;
- `sections` ;
- `proofPoints` ;
- `outcome` ;
- `next` ;
- `primaryCta` / `secondaryCta`.

## Section Mes Automatisations

La section est alimentee par `src/data/automations.ts`.

Chaque automatisation contient :

- `title`, `description`, `status`, `statusLabel`, `stack` ;
- `flow.nodes[]` avec `id`, `label`, `type`, `task`.

Le workflow est anime :

- node `idle` : sombre ;
- node `running` : orange/ambre avec glow local ;
- node `done` : vert ;
- les liaisons se remplissent avec une boule animee ;
- la liaison reste jaune tant que le node de droite est en cours ;
- elle passe verte quand le node de droite est valide.

Sous le schema, une liste de taches synchronisee explique concretement ce que fait chaque etape.

Notes recentes section automatisations :

- la card automatisation utilise un effet de pile dynamique ;
- `src/components/AutomationSection.tsx` calcule les cards derriere via `automations.slice(activeIndex + 1)` ;
- si une nouvelle automatisation est ajoutee, la pile s'adapte automatiquement.

## Section Contact / Get in touch

La section contact est volontairement plus interactive qu'un formulaire classique.

Etat actuel :

- la card reste legere : texte a gauche, boutons de contact a droite ;
- la section `Get in touch` porte l'ancre `id="contact"` dans `src/app/page.tsx` ;
- le bouton `Me contacter` du hero pointe vers `#contact` ;
- titre actuel : `Un projet a faire avancer ?` ;
- texte actuel : `Idee naissante, besoin a cadrer, produit a tester ou workflow a structurer : quelques lignes suffisent pour lancer la discussion.` ;
- boutons icones : message, LinkedIn, GitHub, calendrier ;
- le bouton calendrier est un placeholder `bientot`.

Comportement du bouton message :

- ouvre une vraie fenetre flottante en bas a droite du site ;
- le reste du site passe derriere un overlay sombre legerement floute ;
- la fenetre est une interface de contact conversationnelle, pas un chatbot live ;
- header : avatar/initiale `A`, nom `Alexis`, bouton fermeture ;
- le bouton d'envoi du message et le bouton d'envoi du moyen de contact utilisent tous les deux l'icone Lucide `Send` ;
- l'envoi est simule cote front : rien ne part encore par email, webhook ou API.

Important :

- ne pas afficher `Message asynchrone` sous le nom Alexis dans le header ;
- ne pas donner une vibe service client / chatbot support ;
- garder une interface sobre, personnelle, compacte, dans le langage dark minimal du site.

## Design

Respecter les tokens Tailwind existants :

- `canvas`, `panel`, `line`, `copy`, `brand`, `status`

Principes :

- dark minimal ;
- accent ambre/orange ;
- `rounded-lg`, pas d'ovales gratuits ;
- eviter les cards imbriquees ;
- pas de blobs/orbs decoratifs ;
- liens texte simples quand le CTA ne doit pas etre un bouton ;
- Lucide React pour les icones.
