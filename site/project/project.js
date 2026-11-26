/* ============================================================
   Pages projet – Lucas Rajany
   Thème jour/nuit (partagé avec l'accueil), traduction FR/EN,
   scroll fluide (Lenis), animations (anime.js).
   ============================================================ */
(function () {
  'use strict';
  window.__projReady = true;

  var doc = document;
  var root = doc.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) root.classList.add('reduced');

  /* ── 1. THÈME (mémorisé par la page d'accueil, modifiable ici) ── */
  function currentTheme() { return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark'; }
  var toggle = doc.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('portfolio-theme', next); } catch (e) {}
    });
  }

  /* ── 2. TRADUCTION FR / EN ─────────────────────────────────── */
  var DICT = {
    // Navigation / commun
    '← Retour au portfolio': '← Back to portfolio',
    '← Retour aux projets': '← Back to projects',
    'Continuer la visite': 'Keep exploring',
    'Projet précédent': 'Previous project',
    'Projet suivant': 'Next project',
    'Projets scolaires': 'School projects',
    'Voir les réalisations': 'View the work done',
    '· BTS SIO option SLAM · La Réunion': '· BTS SIO SLAM option · Réunion Island',
    'Type': 'Type',
    'Statut': 'Status',
    'Hébergement': 'Hosting',
    'Application': 'Application',
    'Projet personnel': 'Personal project',
    'Projet scolaire': 'School project',
    'Projet de stage': 'Internship project',
    'Sécurité': 'Security',

    // Le Fil du Lord
    'Projet personnel · Média automatisé par IA': 'Personal project · AI-automated news media',
    'Système complet de média d\'actualité francophone automatisé par IA. Le projet combine recherche d\'informations, vérification factuelle, génération journalistique, contrôle qualité et publication automatique.':
      'A complete French-language news media system automated by AI. The project combines information research, fact-checking, journalistic generation, quality control and automatic publishing.',
    'Voir le site en production ↗': 'View the live site ↗',
    'Voir le pipeline': 'View the pipeline',
    'En production': 'In production',
    'Description': 'Description',
    'Le Fil du Lord est une plateforme capable de transformer automatiquement des sujets d\'actualité en articles publiables.':
      'Le Fil du Lord is a platform that automatically turns news topics into publishable articles.',
    'Le système utilise plusieurs étapes IA spécialisées afin de limiter les erreurs : recherche de sujets, validation des informations, détection des doublons, rédaction journalistique et évaluation avant publication.':
      'The system relies on several specialised AI steps to limit errors: topic research, information validation, duplicate detection, journalistic writing and evaluation before publishing.',
    'Ce que le système': 'What the system',
    'fait': 'does',
    'Recherche d\'actualité': 'News research',
    'Gemini avec accès Google Search identifie des sujets récents et pertinents.': 'Gemini with Google Search access identifies recent, relevant topics.',
    'Vérification factuelle': 'Fact-checking',
    'Les sujets sont analysés avant rédaction afin de confirmer les informations importantes.': 'Topics are analysed before writing to confirm the key information.',
    'Anti-doublons intelligent': 'Smart duplicate detection',
    'Le système compare les nouveaux sujets avec les articles existants dans Supabase.': 'The system compares new topics with the articles already stored in Supabase.',
    'Rédaction automatique': 'Automatic writing',
    'Groq génère un article structuré avec titre, angle éditorial et contenu.': 'Groq generates a structured article with a title, editorial angle and content.',
    'Contrôle qualité': 'Quality control',
    'Gemini attribue un score sur 10 et refuse les articles insuffisants.': 'Gemini gives a score out of 10 and rejects insufficient articles.',
    'Retry automatique': 'Automatic retry',
    'Si un article obtient un mauvais score, le pipeline tente un nouveau sujet ou une nouvelle génération.': 'If an article gets a poor score, the pipeline tries a new topic or a new generation.',
    'Publication': 'Publishing',
    'Les articles validés sont enregistrés dans Supabase puis affichés sur le site.': 'Validated articles are saved in Supabase and then displayed on the site.',
    'Pipeline': 'Execution',
    'd\'exécution': 'pipeline',
    'GitHub Actions lance automatiquement le pipeline via cron.': 'GitHub Actions automatically launches the pipeline via cron.',
    'Recherche de sujets avec Gemini et Google Search.': 'Topic research with Gemini and Google Search.',
    'Vérification des doublons et stockage dans Supabase.': 'Duplicate check and storage in Supabase.',
    'Validation du sujet et création du dossier journalistique.': 'Topic validation and creation of the journalistic file.',
    'Rédaction automatique de l\'article.': 'Automatic writing of the article.',
    'Scoring qualité IA avant publication.': 'AI quality scoring before publishing.',
    'Publication automatique si le score est suffisant.': 'Automatic publishing if the score is high enough.',
    'Agents IA': 'AI agents',
    'utilisés': 'used',
    'Agent recherche — Scraping + flux RSS': 'Research agent — Scraping + RSS feeds',
    'Le système récupère automatiquement les informations depuis différentes sources grâce au scraping web et aux flux RSS. Les données brutes sont collectées puis transformées en sujets exploitables pour le pipeline éditorial.':
      'The system automatically retrieves information from various sources through web scraping and RSS feeds. Raw data is collected and then turned into usable topics for the editorial pipeline.',
    'Agent vérification — Gemini 2.5 Flash Lite': 'Verification agent — Gemini 2.5 Flash Lite',
    'Analyse les sujets collectés avant rédaction. Il vérifie la cohérence des informations, les dates, les acteurs concernés et les faits disponibles afin de limiter les erreurs et les informations inventées.':
      'Analyses the collected topics before writing. It checks the consistency of the information, the dates, the people involved and the available facts to limit errors and invented information.',
    'Agent rédaction — Qwen3-32B (Groq)': 'Writing agent — Qwen3-32B (Groq)',
    'Transforme les informations vérifiées en article journalistique complet. Le modèle génère le titre, l\'angle éditorial et le contenu final en respectant la ligne éditoriale du média Le Fil du Lord.':
      'Turns the verified information into a complete journalistic article. The model generates the title, editorial angle and final content while following the editorial line of Le Fil du Lord.',
    'Agent qualité — Gemini 3.1 Flash Lite': 'Quality agent — Gemini 3.1 Flash Lite',
    'Évalue chaque article avant publication avec un score sur 10. Il analyse la fiabilité, la structure, la qualité rédactionnelle et le respect des règles éditoriales avant validation.':
      'Evaluates each article before publishing with a score out of 10. It analyses reliability, structure, writing quality and compliance with editorial rules before validation.',
    'Architecture': 'Technical',
    '18 mars 2026': 'March 18, 2026',
    'Système': 'System',
    'Node.js orchestre les appels IA, la logique métier, les retries et la publication.': 'Node.js orchestrates the AI calls, business logic, retries and publishing.',
    'Base de données': 'Database',
    'Supabase stocke sujets, articles, scores, statuts et journaux.': 'Supabase stores topics, articles, scores, statuses and logs.',
    'React + TypeScript affiche les articles et fournit une interface d\'administration.': 'React + TypeScript displays the articles and provides an admin interface.',
    'Déploiement': 'Deployment',
    'GitHub Actions automatise l\'exécution et Vercel héberge l\'application.': 'GitHub Actions automates execution and Vercel hosts the application.',
    'Points': 'Key',
    'clés': 'points',
    'Pipeline complet de la recherche à la publication.': 'Complete pipeline from research to publishing.',
    'Double contrôle IA avec vérification et scoring.': 'Double AI check with verification and scoring.',
    'Système anti-doublons basé sur les événements.': 'Event-based duplicate detection system.',
    'Traçabilité complète grâce aux logs.': 'Full traceability thanks to logs.',
    'Architecture évolutive pour ajouter de nouveaux agents IA.': 'Scalable architecture to add new AI agents.',
    'Le Fil du Lord : média d\'actualité francophone entièrement automatisé par IA (recherche, vérification, rédaction, contrôle qualité, publication).':
      'Le Fil du Lord: a French-language news media fully automated by AI (research, verification, writing, quality control, publishing).',

    // Veille IA
    'Projet personnel · Application de veille automatisée': 'Personal project · Automated watch application',
    'Application de veille technologique automatisée, principalement dans le domaine de l\'intelligence artificielle : elle recherche, score, résume et publie sans intervention humaine après configuration.':
      'An automated technology-watch application, mainly in the field of artificial intelligence: it searches, scores, summarises and publishes with no human intervention once configured.',
    'Accéder à l\'application ↗': 'Open the application ↗',
    'Voir les fonctionnalités': 'View the features',
    'Publié le': 'Published',
    '8 avril 2026': 'April 8, 2026',
    'Présentation du': 'Project',
    'projet': 'overview',
    'J\'ai conçu et développé Veille IA, une application web complète permettant de réaliser des veilles technologiques automatisées, principalement dans le domaine de l\'intelligence artificielle.':
      'I designed and built Veille IA, a complete web application for running automated technology watch, mainly in the field of artificial intelligence.',
    'L\'objectif : supprimer le travail manuel de recherche et de synthèse. L\'app recherche, score, résume et publie automatiquement — sans intervention humaine après configuration.':
      'The goal: remove the manual work of research and synthesis. The app searches, scores, summarises and publishes automatically — with no human intervention once configured.',
    'Fonctionnalités': 'Main',
    'principales': 'features',
    '1. Recherche multi-sources automatisée': '1. Automated multi-source search',
    'Saisie de sujets multiples (ex : cybersécurité IA, LLM, deepfake…). Recherche simultanée via DuckDuckGo et flux RSS spécialisés IA. Déduplication sémantique des résultats pour éviter les doublons.':
      'Entry of multiple topics (e.g. AI cybersecurity, LLM, deepfake…). Simultaneous search through DuckDuckGo and AI-specialised RSS feeds. Semantic deduplication of the results to avoid duplicates.',
    '2. Scoring et filtrage intelligent': '2. Smart scoring and filtering',
    'Chaque article reçoit un score basé sur la pertinence, la langue, la fiabilité de la source et la fraîcheur. Filtrage automatique des sources gouvernementales, low-quality et hors-sujet. Classement des contenus les plus pertinents en tête.':
      'Each article gets a score based on relevance, language, source reliability and freshness. Automatic filtering of government, low-quality and off-topic sources. The most relevant content is ranked first.',
    '3. Résumés IA par article': '3. AI summaries per article',
    'Analyse du contenu de chaque page. Génération de 3 à 5 points clés en français via Groq API (LLaMA 3). Synthèse globale structurée par thème (menaces, outils, tendances…).':
      'Analysis of each page\'s content. Generation of 3 to 5 key points in French via the Groq API (LLaMA 3). Overall summary structured by theme (threats, tools, trends…).',
    '4. Publication automatique': '4. Automatic publishing',
    'Mise à jour d\'une page WordPress via l\'API REST. Upload direct sur hébergement FTP en HTML statique. Fusion intelligente du contenu : les anciens sujets sont conservés, les nouveaux s\'ajoutent.':
      'Update of a WordPress page through the REST API. Direct upload to FTP hosting as static HTML. Smart content merging: old topics are kept and new ones are added.',
    '5. Historique et comparaison': '5. History and comparison',
    'Sauvegarde de toutes les sessions par utilisateur dans Supabase. Comparaison entre deux sessions : articles nouveaux, disparus, évolutions. Analyse comparative générée par IA. Import d\'historiques depuis un fichier HTML existant.':
      'All sessions are saved per user in Supabase. Comparison between two sessions: new articles, removed ones, changes. AI-generated comparative analysis. Import of histories from an existing HTML file.',
    '6. Veille automatique planifiée': '6. Scheduled automatic watch',
    'Chaque utilisateur choisit ses sujets et son heure d\'envoi. Un cron GitHub Actions tourne toutes les heures (gratuit). Envoi automatique d\'un email HTML récapitulatif — sans que l\'utilisateur soit connecté.':
      'Each user chooses their topics and sending time. A GitHub Actions cron runs every hour (free). Automatic sending of an HTML summary email — without the user having to be logged in.',
    '7. Personnalisation du thème de publication': '7. Publication theme customisation',
    'Éditeur de thème visuel intégré (couleurs, police, taille…). 4 presets : Catppuccin, Light, Nord, Dracula. Aperçu live avant publication.':
      'Built-in visual theme editor (colours, font, size…). 4 presets: Catppuccin, Light, Nord, Dracula. Live preview before publishing.',
    '8. Gestion des utilisateurs et abonnements': '8. User and subscription management',
    'Inscription / connexion via Supabase Auth. Plan gratuit : 1 recherche offerte. Plan payant à 2,99€/mois : recherches illimitées + veille auto + email quotidien. Paiement via Stripe.':
      'Sign-up / login through Supabase Auth. Free plan: 1 free search. Paid plan at €2.99/month: unlimited searches + automatic watch + daily email. Payment through Stripe.',
    'Stack': 'Technical',
    'Couche': 'Layer',
    'Technologie': 'Technology',
    'Frontend / Backend': 'Frontend / Backend',
    'Base de données & Auth': 'Database & Auth',
    'IA résumés & synthèse': 'AI summaries & synthesis',
    'Recherche web': 'Web search',
    'Hébergement app': 'App hosting',
    'Cron automatique': 'Automatic cron',
    'Paiement': 'Payment',
    'Ce que j\'ai': 'What I',
    'appris': 'learned',
    'Architecture multi-utilisateurs avec isolation complète des données': 'Multi-user architecture with complete data isolation',
    'Gestion de la fusion de données sans écrasement (upsert par clé)': 'Handling data merging without overwriting (upsert by key)',
    'Orchestration d\'un pipeline IA : recherche → scoring → résumés → publication': 'Orchestrating an AI pipeline: search → scoring → summaries → publishing',
    'Déploiement d\'un service complet avec authentification, paiement et automatisation': 'Deploying a complete service with authentication, payment and automation',
    'Contraintes RGPD pour un service en ligne (hébergement EU)': 'GDPR constraints for an online service (EU hosting)',
    'Améliorations': 'Planned',
    'prévues': 'improvements',
    'Export PDF / Markdown des veilles': 'PDF / Markdown export of the watches',
    'Sources personnalisées par l\'utilisateur (ajout de flux RSS propres)': 'User-defined sources (adding their own RSS feeds)',
    'Notifications push navigateur': 'Browser push notifications',
    'Dashboard analytique (tendances sur la durée, mots-clés émergents)': 'Analytics dashboard (trends over time, emerging keywords)',
    'L\'application est disponible en ligne :': 'The application is available online:',
    'Veille IA : application web de veille technologique automatisée (recherche multi-sources, scoring, résumés IA, publication automatique).':
      'Veille IA: an automated technology-watch web application (multi-source search, scoring, AI summaries, automatic publishing).',

    // Projets scolaires
    'Projets scolaires · BTS SIO': 'School projects · BTS SIO',
    'Mes projets réalisés pendant le BTS SIO : une application web simple, un site WordPress en local et des exercices d\'algorithmique.':
      'My projects completed during the BTS SIO: a simple web application, a local WordPress site and algorithmics exercises.',
    'Voir les 3 projets': 'View the 3 projects',
    'Formation': 'Programme',
    'Projets': 'Projects',
    'Mes': 'My',
    'projets scolaires': 'school projects',
    'Projet 1 — Application': 'Project 1 — Simple',
    'simple': 'application',
    '(BTS SIO)': '(BTS SIO)',
    'Description :': 'Description:',
    'Objectif :': 'Goal:',
    'Création d\'une application web simple permettant de gérer des données (ajout, modification, suppression).': 'Creation of a simple web application to manage data (add, edit, delete).',
    'Comprendre la logique du développement web et la communication avec une base de données.': 'Understand the logic of web development and how it communicates with a database.',
    'Projet 2 — Site web': 'Project 2 —',
    'Création d\'un site web (portfolio) en local avec installation complète de WordPress.': 'Creation of a website (portfolio) locally with a complete WordPress installation.',
    'Apprendre à configurer un serveur local, gérer une base de données et personnaliser un site.': 'Learn to set up a local server, manage a database and customise a site.',
    'Projet 3 — Exercices d\'': 'Project 3 — ',
    'algorithmique': 'Algorithmics exercises',
    'Résolution de problèmes logiques et création d\'algorithmes simples.': 'Solving logic problems and creating simple algorithms.',
    'Développer la logique de programmation et les bases nécessaires au développement.': 'Develop programming logic and the fundamentals needed for development.',
    'Les projets réalisés en BTS SIO option SLAM : application web PHP, site WordPress en local, exercices d\'algorithmique.':
      'Projects completed in the BTS SIO SLAM option: a PHP web application, a local WordPress site and algorithmics exercises.',
    'Projets scolaires BTS SIO | Lucas Rajany': 'BTS SIO school projects | Lucas Rajany',

    // Entrevilles-Reu
    'Projet scolaire · BTS SIO SLAM':
      'School project · BTS SIO SLAM',
    'Application web de gestion d\'une compétition sportive inspirée des jeux Intervilles : des équipes représentant les villes de La Réunion s\'affrontent dans des épreuves, les organisateurs saisissent les résultats et le public suit le classement.':
      'A web application for managing a sports competition inspired by the Intervilles games: teams representing the towns of La Réunion compete in events, organisers enter the results and the public follows the rankings.',
    'PHP 8 natif':
      'Native PHP 8',
    'Architecture MVC':
      'MVC architecture',
    'Voir le site en ligne ↗':
      'View the live site ↗',
    'Voir le code sur GitHub ↗':
      'View the code on GitHub ↗',
    'Voir l\'architecture':
      'View the architecture',
    'Mon rôle':
      'My role',
    'Site, back-end & déploiement':
      'Website, back-end & deployment',
    'InfinityFree (PHP gratuit)':
      'InfinityFree (free PHP hosting)',
    'En pause, remise en ligne avant les épreuves':
      'On hold, back online before the exams',
    'Projet du BTS SIO (option SLAM), parmi mes réalisations de fin d\'année. Le sujet « Intervilles Challenge » demande une application permettant d\'organiser et de gérer une compétition où plusieurs équipes de villes différentes enchaînent des épreuves sportives. Les organisateurs gèrent équipes, participants, épreuves et résultats, tandis que les visiteurs consultent scores et classement.':
      'Project from the BTS SIO programme (SLAM option), one of my end-of-year projects. The “Intervilles Challenge” brief calls for an application to organise and run a competition in which several teams from different towns go through a series of sports events. Organisers manage teams, participants, events and results, while visitors view scores and rankings.',
    'Projet mené en équipe :':
      'Team project:',
    'la conception de la base de données a été réalisée par un coéquipier, et j\'ai développé le site (back-end PHP, vues, authentification, déploiement).':
      'the database was designed by a teammate, and I built the website (PHP back-end, views, authentication, deployment).',
    'Ce que l\'application':
      'What the application',
    'permet':
      'does',
    'Espace public':
      'Public area',
    'Tableau de bord':
      'Dashboard',
    'Nombre de villes, de sports, d\'équipes et d\'épreuves, répartition par statut (à venir, en cours, terminées) et prochaines épreuves.':
      'Number of towns, sports, teams and events, breakdown by status (upcoming, ongoing, finished) and next events.',
    'Calendrier chronologique de toutes les épreuves.':
      'Chronological schedule of all the events.',
    'Détail d\'une épreuve':
      'Event details',
    'Équipes participantes, score et classement.':
      'Participating teams, score and ranking.',
    'Équipes':
      'Teams',
    'Liste des équipes, puis détail avec les membres : capitaine, pénalités, récompenses individuelles.':
      'List of teams, then a detail page with the members: captain, penalties, individual awards.',
    'Classement général':
      'Overall ranking',
    'Classement inter-villes calculé automatiquement.':
      'Inter-town ranking calculated automatically.',
    'Thème clair / sombre':
      'Light / dark theme',
    'Choix mémorisé dans le navigateur du visiteur.':
      'Choice remembered in the visitor\'s browser.',
    'Comptes utilisateurs':
      'User accounts',
    'Inscription et connexion':
      'Sign-up and login',
    'Création de compte avec choix facultatif de la ville, connexion sécurisée.':
      'Account creation with an optional choice of town, secure login.',
    'Page profil':
      'Profile page',
    'Équipes de l\'utilisateur et rôle associé.':
      'The user\'s teams and associated role.',
    'Espace administrateur':
      'Admin area',
    'Accès réservé':
      'Restricted access',
    'Réservé aux administrateurs, avec gestion des rôles.':
      'Reserved for administrators, with role management.',
    'Gestion des données':
      'Data management',
    'Création, modification et suppression des villes, sports, équipes et épreuves.':
      'Create, edit and delete towns, sports, teams and events.',
    'Gestion des épreuves':
      'Event management',
    'Changement de statut, inscription des équipes et saisie des résultats (score, classement).':
      'Status changes, team registration and result entry (score, ranking).',
    'utilisées':
      'used',
    'PHP 8 natif, sans Composer ni framework : tout est écrit à la main.':
      'Native PHP 8, with no Composer and no framework: everything is hand-written.',
    'PostgreSQL hébergé sur Supabase, interrogé via son API REST (PostgREST) avec cURL.':
      'PostgreSQL hosted on Supabase, queried through its REST API (PostgREST) with cURL.',
    'HTML5, CSS3 et un peu de JavaScript pour le thème. Design « dashboard esport » sombre à accents néon, variante claire, variables CSS, polices Rajdhani et Inter, responsive.':
      'HTML5, CSS3 and a little JavaScript for the theme. Dark “esport dashboard” design with neon accents, a light variant, CSS variables, Rajdhani and Inter fonts, responsive.',
    'Git et GitHub, avec un workflow GitHub Actions qui envoie les fichiers en FTP à chaque git push vers InfinityFree (hébergement PHP gratuit).':
      'Git and GitHub, with a GitHub Actions workflow that sends the files over FTP on every git push to InfinityFree (free PHP hosting).',
    'Tout est écrit à la main, sans Composer ni framework, pour comprendre et pouvoir expliquer chaque brique. Voici le chemin d\'une requête :':
      'Everything is hand-written, with no Composer and no framework, to understand and be able to explain every building block. Here is the path of a request:',
    'Front controller :':
      'Front controller:',
    'index.php est l\'unique point d\'entrée, et .htaccess y redirige toutes les requêtes.':
      'index.php is the single entry point, and .htaccess redirects every request to it.',
    'Routeur maison :':
      'Custom router:',
    'associe l\'URL à un contrôleur et à une méthode, avec gestion des paramètres comme /epreuves/{id}.':
      'maps the URL to a controller and a method, handling parameters such as /epreuves/{id}.',
    'Contrôleurs :':
      'Controllers:',
    'un par domaine fonctionnel (accueil, authentification, épreuves, équipes, classement, profil, administration).':
      'one per functional area (home, authentication, events, teams, ranking, profile, administration).',
    'Modèles :':
      'Models:',
    'une classe par entité (Ville, Sport, Equipe, MembreEquipe, Epreuve, Participation, Utilisateur), qui contiennent toutes les requêtes.':
      'one class per entity (Ville, Sport, Equipe, MembreEquipe, Epreuve, Participation, Utilisateur), holding all the queries.',
    'Vues :':
      'Views:',
    'un fichier PHP par page, assemblé dans un layout commun avec des partials (navbar, footer).':
      'one PHP file per page, assembled in a shared layout with partials (navbar, footer).',
    'Le dossier Core regroupe aussi une classe Auth, un client Supabase, un autoloader et un contrôleur de base.':
      'The Core folder also holds an Auth class, a Supabase client, an autoloader and a base controller.',
    'en 7 tables':
      'in 7 tables',
    'Rôle':
      'Role',
    'Villes participantes':
      'Participating towns',
    'Disciplines proposées dans les épreuves':
      'Sports offered in the events',
    'Comptes, identifiants et rôles':
      'Accounts, credentials and roles',
    'Équipes représentant une ville':
      'Teams representing a town',
    'Membres d\'une équipe, avec rôle, pénalités et récompenses':
      'Team members, with role, penalties and awards',
    'Épreuves, planning et statut':
      'Events, schedule and status',
    'Inscription d\'une équipe à une épreuve et son résultat':
      'A team\'s registration to an event, and its result',
    'Deux choix de conception':
      'Two design choices',
    'fusionne l\'inscription d\'une équipe à une épreuve et son résultat. Le statut sert à l\'inscription, tandis que le score et le classement restent vides tant que l\'épreuve n\'a pas eu lieu : une table de moins.':
      'merges the registration of a team to an event and its result. The status is used for the registration, while the score and ranking stay empty until the event has taken place: one table fewer.',
    'porte le rôle interne (capitaine ou joueur) ainsi que les pénalités et récompenses individuelles, avec une clé primaire composée qui empêche un doublon dans une équipe.':
      'holds the internal role (captain or player) as well as individual penalties and awards, with a composite primary key that prevents duplicates within a team.',
    'Le classement par ville n\'est pas stocké : il est recalculé à la volée par une vue SQL qui additionne les scores des équipes de chaque ville.':
      'The ranking by town is not stored: it is recomputed on the fly by an SQL view that adds up the scores of each town\'s teams.',
    'de l\'application':
      'of the application',
    'Mots de passe hachés avec password_hash() et password_verify(), jamais stockés en clair ni en session.':
      'Passwords hashed with password_hash() and password_verify(), never stored in plain text or in the session.',
    'Sessions PHP natives et contrôle d\'accès par rôle (exigerConnexion(), exigerAdmin()).':
      'Native PHP sessions and role-based access control (exigerConnexion(), exigerAdmin()).',
    'Échappement systématique des sorties (htmlspecialchars) contre les failles XSS.':
      'Systematic output escaping (htmlspecialchars) against XSS flaws.',
    'Dossiers sensibles protégés par .htaccess (Require all denied).':
      'Sensitive folders protected by .htaccess (Require all denied).',
    'Clés Supabase hors du dépôt Git, dans un fichier ignoré par .gitignore.':
      'Supabase keys kept out of the Git repository, in a file ignored by .gitignore.',
    'Mutations passées uniquement en POST.':
      'State-changing actions only sent through POST.',
    'Défis':
      'Challenges',
    'rencontrés':
      'faced',
    'Un hébergement qui n\'exécute pas le PHP':
      'A host that does not run PHP',
    'Problème :':
      'Problem:',
    'sur Vercel, le navigateur téléchargeait les fichiers au lieu de les exécuter, et GitHub Pages n\'exécute pas le PHP non plus.':
      'on Vercel, the browser downloaded the files instead of running them, and GitHub Pages does not run PHP either.',
    'Solution :':
      'Solution:',
    'passage à un hébergeur PHP gratuit, en gardant GitHub pour le code.':
      'switch to a free PHP host, keeping GitHub for the code.',
    'Pilote PostgreSQL absent':
      'Missing PostgreSQL driver',
    'Accès aux données':
      'Data access',
    'l\'extension PDO PostgreSQL n\'était pas disponible sur l\'hébergement gratuit.':
      'the PDO PostgreSQL extension was not available on the free hosting.',
    'PDO remplacé par des appels à l\'API REST de Supabase en cURL, via un client dédié.':
      'PDO replaced with calls to Supabase\'s REST API through cURL, via a dedicated client.',
    'Fichiers .env refusés':
      '.env files rejected',
    'l\'hébergeur refuse les fichiers dont le nom commence par un point.':
      'the host rejects files whose name starts with a dot.',
    'la configuration se charge désormais depuis un fichier PHP (env.local.php) créé sur le serveur et exclu de Git.':
      'the configuration is now loaded from a PHP file (env.local.php) created on the server and excluded from Git.',
    'Authentification absente du schéma':
      'Authentication missing from the schema',
    'la table utilisateur n\'avait pas de colonne mot de passe.':
      'the user table had no password column.',
    'écriture d\'une migration SQL séparée, pour ne pas modifier le travail de l\'équipe sans validation.':
      'wrote a separate SQL migration, so as not to change the team\'s work without approval.',
    'Changement de pile en cours de route':
      'Switching stacks midway',
    'Choix techniques':
      'Technical choices',
    'le projet a démarré en Next.js et React.':
      'the project started in Next.js and React.',
    'reprise complète en PHP et MVC, pour maîtriser le code et pouvoir le défendre à l\'oral.':
      'complete rewrite in PHP and MVC, to master the code and be able to defend it in the oral exam.',
    'Fonctionnalités manquantes détectées en test':
      'Missing features found during testing',
    'Tests':
      'Testing',
    'pas d\'inscription, lien de profil sans route, vue de classement non créée.':
      'no sign-up, a profile link with no route, ranking view not created.',
    'ajout des routes, des contrôleurs et des vues correspondants.':
      'added the matching routes, controllers and views.',
    'mobilisées':
      'used',
    'Développement web back-end en PHP et conception d\'un routeur MVC.':
      'Back-end web development in PHP and design of an MVC router.',
    'Modélisation et requêtes sur base relationnelle (PostgreSQL, jointures, vues, clés composées).':
      'Modelling and querying a relational database (PostgreSQL, joins, views, composite keys).',
    'Consommation d\'une API REST (PostgREST / Supabase) en cURL.':
      'Consuming a REST API (PostgREST / Supabase) with cURL.',
    'Authentification, gestion de rôles et sécurité applicative.':
      'Authentication, role management and application security.',
    'CI/CD avec GitHub Actions et déploiement FTP.':
      'CI/CD with GitHub Actions and FTP deployment.',
    'HTML/CSS responsive, variables CSS, thème clair / sombre.':
      'Responsive HTML/CSS, CSS variables, light / dark theme.',
    'Travail en équipe, Git, diagnostic et contournement de contraintes d\'hébergement.':
      'Teamwork, Git, diagnosing and working around hosting constraints.',
    'Pistes':
      'Room for',
    'd\'amélioration':
      'improvement',
    'Jeton CSRF sur tous les formulaires.':
      'CSRF token on every form.',
    'Upload de logos de villes et de photos de participants.':
      'Upload of town logos and participant photos.',
    'Historique détaillé des résultats par épreuve et export PDF du classement.':
      'Detailed history of results per event and PDF export of the ranking.',
    'Notifications par e-mail à la validation d\'une inscription.':
      'Email notifications when a registration is approved.',
    'Remplacer la clé service_role par des règles RLS et une clé à droits limités.':
      'Replace the service_role key with RLS rules and a limited-privilege key.',
    'Envie de voir le code ou d\'essayer l\'application ?':
      'Want to see the code or try the application?',
    'Application web PHP en architecture MVC pour gérer un championnat sportif inter-villes à La Réunion : équipes, épreuves, résultats et classement. Projet BTS SIO SLAM.':
      'PHP web application with an MVC architecture to manage an inter-town sports championship in La Réunion: teams, events, results and ranking. BTS SIO SLAM project.',

    // Forgejo
    'Projet de stage · Gestion d\'infrastructure Git': 'Internship project · Git infrastructure management',
    'Installation et configuration d\'une forge Git auto-hébergée Forgejo sur Ubuntu afin de permettre la gestion de dépôts de code et la collaboration entre développeurs.':
      'Installation and configuration of a self-hosted Forgejo Git forge on Ubuntu to manage code repositories and enable collaboration between developers.',
    'Lieu': 'Location',
    'Mairie de Saint-Joseph': 'Saint-Joseph Town Hall',
    'Environnement': 'Technical',
    'Ubuntu (VM)': 'Ubuntu (VM)',
    'Serveur': 'Server',
    'Contexte': 'Project',
    'du projet': 'context',
    'Ce projet a été réalisé en environnement virtuel Ubuntu. L\'objectif principal était de déployer une forge Git interne sécurisée et performante, offrant une alternative souveraine aux solutions cloud tierces pour les organisations désireuses de conserver le contrôle de leurs données.':
      'This project was carried out in an Ubuntu virtual environment. The main goal was to deploy a secure, high-performance internal Git forge, offering a sovereign alternative to third-party cloud solutions for organisations that want to keep control of their data.',
    'Objectifs': 'Targeted',
    'visés': 'objectives',
    'Déploiement initial': 'Initial deployment',
    'Installer Forgejo sur une machine virtuelle Ubuntu.': 'Install Forgejo on an Ubuntu virtual machine.',
    'Configuration système': 'System configuration',
    'Initialiser et configurer le service pour assurer sa persistance.': 'Initialise and configure the service so that it persists.',
    'Contrôle des accès': 'Access control',
    'Gérer l\'approvisionnement et les droits des utilisateurs.': 'Manage user provisioning and permissions.',
    'Validation fonctionnelle': 'Functional validation',
    'Tester l\'ensemble des opérations courantes liées à Git.': 'Test all the common Git-related operations.',
    'Audit de conformité': 'Compliance audit',
    'Réaliser une analyse complète de la sécurité de la plateforme.': 'Carry out a complete security analysis of the platform.',
    'Système de notification': 'Notification system',
    'Configurer les alertes et les communications par email.': 'Configure alerts and email communications.',
    'Serveur Git': 'Git server',
    'Outils': 'Tools',
    'Virtualisation': 'Virtualisation',
    'Machine virtuelle': 'Virtual machine',
    'Compétences': 'Skills',
    'mobilisées (BTS)': 'used (BTS)',
    'SysAdmin & Réseau': 'SysAdmin & Networking',
    'Administration Linux, Gestion des services système, Configuration réseau, Protocole SMTP.': 'Linux administration, system service management, network configuration, SMTP protocol.',
    'DevOps & Sécurité': 'DevOps & Security',
    'Gestion des versions (Git), Gestion fine des utilisateurs, Analyse de sécurité, Rédaction de documentation technique.': 'Version control (Git), fine-grained user management, security analysis, technical documentation writing.',
    'Réalisations': 'Work done',
    'et pipeline': '& pipeline',
    'Installation Forgejo :': 'Forgejo installation:',
    'Déploiement du serveur, configuration globale, initialisation du compte administrateur et mise en service de l\'interface web.': 'Server deployment, global configuration, administrator account initialisation and commissioning of the web interface.',
    'Tests Git :': 'Git tests:',
    'Création de dépôts, validation des commandes de base (Clone, Commit, Push, Pull) depuis les postes clients.': 'Repository creation, validation of the basic commands (Clone, Commit, Push, Pull) from client machines.',
    'Sécurisation applicative :': 'Application hardening:',
    'Désactivation complète des inscriptions publiques, obligation stricte de connexion et restriction de l\'accès aux utilisateurs autorisés.': 'Public sign-ups completely disabled, login strictly required and access restricted to authorised users.',
    'Notifications :': 'Notifications:',
    'Installation et configuration du serveur SMTP Postfix en mode local, suivi de la validation de l\'envoi des emails.': 'Installation and configuration of the Postfix SMTP server in local mode, followed by validation of email delivery.',
    'Audit de sécurité': 'Security audit',
    '& corrections': '& fixes',
    'Points positifs': 'Positive points',
    'Service système pleinement fonctionnel, configuration générale sécurisée et vérification réussie des secrets de sécurité (générés automatiquement avec une complexité suffisante).': 'Fully working system service, securely configured overall, and successful check of the security secrets (automatically generated with sufficient complexity).',
    'Point d\'amélioration': 'Area for improvement',
    'Lors de l\'analyse des répertoires de l\'application, des permissions trop ouvertes ont été détectées sur certains fichiers sensibles (base de données interne et journaux accessibles en lecture globale).': 'While analysing the application directories, overly open permissions were found on some sensitive files (internal database and logs readable by everyone).',
    'Correctif proposé': 'Proposed fix',
    'Application immédiate du principe de moindre privilège via la restriction stricte des droits d\'accès aux seuls utilisateurs autorisés (le compte de service et l\'administrateur racine).': 'Immediate application of the principle of least privilege by strictly restricting access rights to authorised users only (the service account and the root administrator).',
    'Résultats': 'Results',
    'obtenus': 'achieved',
    'L\'ensemble des fonctionnalités a été validé avec succès. Les opérations Git fonctionnent correctement et la plateforme est totalement opérationnelle pour un usage collaboratif fluide et sécurisé.': 'All the features were successfully validated. Git operations work correctly and the platform is fully operational for smooth, secure collaborative use.',
    'Comparaison': 'Comparison',
    'Forgejo / GitHub': 'Forgejo / GitHub',
    'Détail des missions de mon stage à la Mairie de Saint-Joseph (juin – juillet 2026) : automatisation Ansible, sécurité, sauvegarde, restauration et déploiement de machines virtuelles.':
      'Details of my internship tasks at Saint-Joseph Town Hall (June – July 2026): Ansible automation, security, backup, restore and virtual machine deployment.',
    'Critère': 'Criterion',
    'Local': 'Local',
    'Cloud': 'Cloud',
    'Contrôle des données': 'Data control',
    'Total': 'Full',
    'Limité': 'Limited',
    'Administration': 'Administration',
    'À gérer soi-même': 'Self-managed',
    'Gérée par GitHub': 'Managed by GitHub',
    'Conclusion': 'Conclusion',
    '& bilan': '& review',
    'Ce projet de stage m\'a permis d\'acquérir une compréhension fine du fonctionnement d\'une forge Git auto-hébergée et de développer mes compétences en gestion des services Linux. L\'exécution de l\'audit m\'a également sensibilisé aux bonnes pratiques indispensables en matière de sécurité des infrastructures.': 'This internship project gave me a detailed understanding of how a self-hosted Git forge works and let me develop my Linux service management skills. Carrying out the audit also made me aware of the essential good practices in infrastructure security.',
    'Projet de stage : installation, sécurisation et audit d\'une forge Git Forgejo auto-hébergée sur Ubuntu.': 'Internship project: installation, hardening and audit of a self-hosted Forgejo Git forge on Ubuntu.',

    // Stages (détail des missions)
    'Stage à la Mairie de Saint-Joseph — Détail des missions | Lucas Rajany':
      'Internship at Saint-Joseph Town Hall — Task details | Lucas Rajany',
    'Stage 1 · Réalisé · Juin – Juillet 2026':
      'Internship 1 · Completed · June – July 2026',
    'Stage à la Mairie de Saint-Joseph':
      'Internship at Saint-Joseph Town Hall',
    'Détail des missions : automatisation d\'une infrastructure avec Ansible, sécurité, sauvegarde, restauration et déploiement de machines virtuelles, ainsi que des interventions de support dans les services de la commune.':
      'Task details: infrastructure automation with Ansible, security, backup, restore and virtual machine deployment, plus support work in the town\'s departments.',
    'Voir le journal semaine par semaine':
      'See the week-by-week logbook',
    'Durée':
      'Duration',
    '1er juin – 3 juillet 2026':
      'June 1 – July 3, 2026',
    'Service':
      'Department',
    'Systèmes d\'information':
      'Information systems',
    'Équipe':
      'Team',
    'Binôme avec Erwan':
      'Pair with Erwan',
    'du stage':
      'of the internship',
    'Stage d\'un mois au sein du service informatique de la Mairie de Saint-Joseph. Les deux premiers jours ont été consacrés à l\'observation et à des interventions de support dans plusieurs services de la commune. Le reste du stage a porté sur un projet d\'infrastructure réalisé en binôme avec Erwan : automatiser avec Ansible la gestion d\'un parc de 7 machines virtuelles (serveur Forgejo, trois serveurs Wazuh, un contrôleur de domaine Windows et un poste client Windows, plus la VM de contrôle Ansible) hébergées sur Proxmox.':
      'One-month internship in the IT department of Saint-Joseph Town Hall. The first two days were spent observing and doing support work in several of the town\'s departments. The rest of the internship focused on an infrastructure project carried out in a pair with Erwan: using Ansible to automate the management of a fleet of 7 virtual machines (a Forgejo server, three Wazuh servers, a Windows domain controller and a Windows client, plus the Ansible control VM) hosted on Proxmox.',
    'Des points d\'avancement réguliers avec les tuteurs de stage ont orienté le travail : sécurisation des mots de passe, scan réel des ports, audit de sécurité approfondi, test réel de restauration, puis provisionnement de VM et interface web. L\'installation de Forgejo a été faite en parallèle par mon binôme. Le projet Forgejo est détaillé sur':
      'Regular progress meetings with the internship tutors steered the work: password hardening, a real port scan, an in-depth security audit, a real restore test, then VM provisioning and a web interface. Forgejo was installed in parallel by my partner. The Forgejo project is detailed on',
    'sa propre page':
      'its own page',
    'Mes missions':
      'My tasks',
    'semaine par semaine':
      'week by week',
    'Semaine 1 (1er – 5 juin) : support sur site, puis premiers pas avec Ansible.':
      'Week 1 (June 1 – 5): on-site support, then first steps with Ansible.',
    'Observation et interventions dans plusieurs services de la commune. Configuration du réseau de la VM de contrôle (Netplan, IP fixe, recherche de la bonne passerelle), installation d\'Ansible, inventaire, clé SSH, premier playbook « Hello World ». Création des playbooks de vérification, de mise à jour, de rapport, de sauvegarde de Forgejo et de pare-feu UFW. Mise en place d\'Ansible Vault pour chiffrer les mots de passe et d\'un fichier de log sur le serveur.':
      'Observation and interventions in several of the town\'s departments. Network setup of the control VM (Netplan, static IP, finding the right gateway), Ansible installation, inventory, SSH key, first “Hello World” playbook. Creation of the check, update, report, Forgejo backup and UFW firewall playbooks. Setup of Ansible Vault to encrypt passwords and of a log file on the server.',
    'Semaine 2 (8 – 12 juin) : tout le parc, Linux et Windows.':
      'Week 2 (June 8 – 12): the whole fleet, Linux and Windows.',
    'Activation de WinRM sur les machines Windows, inventaire complet des 7 serveurs, mots de passe tous déplacés dans le Vault. Playbooks adaptés aux deux systèmes. Création du playbook d\'audit de sécurité, puis du playbook de sauvegarde centralisée (Forgejo, Wazuh, Active Directory) avec vérification de la sauvegarde : mots de passe bien hachés dans la base. Mise en conformité de tous les playbooks avec ansible-lint.':
      'WinRM enabled on the Windows machines, full inventory of the 7 servers, all passwords moved into the Vault. Playbooks adapted to both systems. Creation of the security audit playbook, then of the centralised backup playbook (Forgejo, Wazuh, Active Directory) with a backup check: passwords properly hashed in the database. All playbooks brought up to ansible-lint standards.',
    'Semaine 3 (15 – 19 juin) : automatisation et restauration.':
      'Week 3 (June 15 – 19): automation and restore.',
    'Handlers pour le pare-feu, tâches planifiées avec cron (correction d\'un décalage horaire et d\'un chemin de configuration introuvable), rotation des sauvegardes sur 14 jours, premier playbook de restauration avec plusieurs niveaux de confirmation. Réunion d\'avancement avec les tuteurs : Vault et organisation des variables validés ; demandes de scan réel des ports, d\'audit approfondi et de vrai test de restauration.':
      'Handlers for the firewall, scheduled tasks with cron (fixing a time zone offset and a missing configuration path), 14-day backup rotation, first restore playbook with several confirmation levels. Progress meeting with the tutors: Vault and variable organisation approved; requests for a real port scan, a deeper audit and a real restore test.',
    'Semaine 4 (22 – 26 juin) : tests réels et déploiement de VM.':
      'Week 4 (June 22 – 26): real tests and VM deployment.',
    'Test de restauration sur toute l\'infrastructure et correction de bugs de fond. Remplacement de la liste de ports supposés par un vrai scan, avec des règles de pare-feu propres à chaque serveur Wazuh. Création d\'un playbook qui crée de 1 à 10 VM Ubuntu via l\'API Proxmox (installation automatique, mot de passe aléatoire, détection des identifiants et IP libres). Installation de Semaphore UI en conteneur Docker.':
      'Restore test across the whole infrastructure and fixing of deep bugs. Replacing the assumed port list with a real scan, with firewall rules specific to each Wazuh server. Creation of a playbook that builds 1 to 10 Ubuntu VMs through the Proxmox API (automatic install, random password, detection of free IDs and IPs). Installation of Semaphore UI in a Docker container.',
    'Semaine 5 (29 juin – 3 juillet) : sécurité, CI/CD et documentation.':
      'Week 5 (June 29 – July 3): security, CI/CD and documentation.',
    'Nettoyage des anciennes règles de pare-feu et activation du pare-feu Windows (avec snapshot préalable). Approfondissement de l\'audit : mises à jour de sécurité en attente et configuration SSH réellement appliquée. Webhook Forgejo vers Semaphore pour lancer ansible-lint à chaque push, code-server (VS Code dans le navigateur), organisation du tableau de bord Semaphore, formulaire de confirmation pour la restauration. Documentation finale, rapport de stage et journal de bord.':
      'Clean-up of old firewall rules and Windows firewall activation (with a prior snapshot). Deeper audit: pending security updates and the SSH configuration actually applied. Forgejo to Semaphore webhook to run ansible-lint on every push, code-server (VS Code in the browser), organisation of the Semaphore dashboard, confirmation form for the restore. Final documentation, internship report and logbook.',
    'Interventions':
      'On-site',
    'sur site':
      'interventions',
    'Service de restauration':
      'Catering department',
    'Un problème de réception de mails venait d\'une date erronée sur le serveur (2086 au lieu de 2026).':
      'A mail reception problem came from a wrong date on the server (2086 instead of 2026).',
    'Résidence pour personnes âgées':
      'Residence for the elderly',
    'Création de comptes utilisateurs pour les animatrices et attribution de droits d\'accès à des dossiers.':
      'Creating user accounts for the activity leaders and granting access rights to folders.',
    'Service communication':
      'Communication department',
    'Problèmes réseau et d\'accès internet, ordinateur en panne faute de mises à jour Windows.':
      'Network and internet access problems, a computer faulty for lack of Windows updates.',
    'Bibliothèque':
      'Library',
    'Problème d\'applications non résolu sur place, faute d\'ordinateur disponible pour tester.':
      'Application problem not solved on site, for lack of a computer to test on.',
    'Difficultés':
      'Difficulties',
    'et solutions':
      'and solutions',
    'Restauration de Forgejo':
      'Forgejo restore',
    'La commande de restauration prévue n\'existe pas. Reconstruction de la procédure à partir de la structure réelle d\'une sauvegarde, et découverte au passage d\'une erreur de configuration mail qui rendait les sauvegardes vides.':
      'The planned restore command does not exist. Rebuilt the procedure from the real structure of a backup, and discovered along the way a mail configuration error that was making backups empty.',
    'Restauration de Wazuh':
      'Wazuh restore',
    'Une recherche de fichiers s\'exécutait sur le contrôleur et non sur le serveur cible, ce qui faisait échouer l\'extraction sans erreur visible. Remplacement par un module qui s\'exécute côté cible.':
      'A file lookup ran on the controller rather than the target server, silently breaking the extraction. Replaced with a module that runs on the target side.',
    'Tâches cron en échec':
      'Failing cron jobs',
    'Le mot de passe du Vault était introuvable car cron ne s\'exécutait pas depuis le dossier du projet. Ajout d\'un changement de dossier au début de chaque commande et de logs dédiés.':
      'The Vault password could not be found because cron did not run from the project folder. Added a change of directory at the start of each command and dedicated logs.',
    'Création de VM':
      'VM creation',
    'Le modèle cloud-init ne démarrait pas (format d\'image différent de celui attendu). Changement d\'approche vers l\'installation automatique d\'Ubuntu, puis correction de huit bugs successifs.':
      'The cloud-init template would not boot (image format different from the expected one). Switched to Ubuntu\'s automatic installation, then fixed eight successive bugs.',
    'Interface Semaphore':
      'Semaphore interface',
    'Variables du Vault non définies et droits de lecture sur les fichiers sensibles : chargement du Vault dans chaque play et permissions limitées au strict nécessaire.':
      'Undefined Vault variables and read permissions on sensitive files: Vault loaded in each play and permissions limited to the strict minimum.',
    'Alertes par mail':
      'Email alerts',
    'Rejet par Gmail d\'un serveur auto-hébergé sans configuration DNS adaptée. Validation de toute la chaîne en interne, test retiré du périmètre final et noté comme limite.':
      'Gmail rejected a self-hosted server without proper DNS setup. The whole chain was validated internally, the test was removed from the final scope and noted as a limit.',
    '7 machines virtuelles':
      '7 virtual machines',
    'Serveur Forgejo, trois serveurs Wazuh, contrôleur de domaine et poste client Windows, VM de contrôle Ansible.':
      'Forgejo server, three Wazuh servers, Windows domain controller and client, Ansible control VM.',
    '9 playbooks Ansible':
      '9 Ansible playbooks',
    'État des serveurs, rapport, mises à jour, pare-feu, audit, sauvegarde, restauration, création de VM, tâches planifiées. Profil « production » d\'ansible-lint atteint.':
      'Server status, report, updates, firewall, audit, backup, restore, VM creation, scheduled tasks. ansible-lint “production” profile reached.',
    'Sauvegarde et restauration testées':
      'Backup and restore tested',
    'Sauvegardes centralisées, rotation sur 14 jours et restauration validée en conditions réelles sur Forgejo et Wazuh.':
      'Centralised backups, 14-day rotation and restore validated in real conditions on Forgejo and Wazuh.',
    'Création de VM en une commande':
      'VM creation in one command',
    'De 1 à 10 VM Ubuntu avec comptes, clé SSH et mot de passe aléatoire générés automatiquement.':
      'From 1 to 10 Ubuntu VMs with accounts, SSH key and random password generated automatically.',
    'Interface et CI/CD':
      'Interface and CI/CD',
    'Semaphore pour lancer les playbooks en un clic, code-server pour les éditer, lint automatique à chaque push sur Forgejo.':
      'Semaphore to run playbooks in one click, code-server to edit them, automatic lint on every push to Forgejo.',
    'Sécurité documentée':
      'Documented security',
    'Mots de passe chiffrés, accès SSH par clé pour Ansible, pare-feu actif sur les serveurs. Les risques acceptés et les limites du lab sont documentés.':
      'Encrypted passwords, key-based SSH access for Ansible, firewall active on the servers. Accepted risks and lab limits are documented.',
    'Administration systèmes et réseaux':
      'Systems and network administration',
    'Linux et Windows Server, réseau, pare-feu, virtualisation Proxmox, SSH, WinRM, services système.':
      'Linux and Windows Server, networking, firewalls, Proxmox virtualisation, SSH, WinRM, system services.',
    'Automatisation et DevOps':
      'Automation and DevOps',
    'Ansible, Vault, cron, conteneurs Docker, intégration continue avec Forgejo et Semaphore, versionnement Git.':
      'Ansible, Vault, cron, Docker containers, continuous integration with Forgejo and Semaphore, Git versioning.',
    'Cybersécurité':
      'Cybersecurity',
    'Audit, durcissement, sauvegarde et restauration, gestion des secrets, analyse de risques et décisions documentées.':
      'Audit, hardening, backup and restore, secrets management, risk analysis and documented decisions.',
    'Travail en équipe et documentation':
      'Teamwork and documentation',
    'Binôme avec Erwan, réunions avec les tuteurs, journal de bord quotidien, documentation technique et rapport de stage.':
      'Pair work with Erwan, meetings with the tutors, daily logbook, technical documentation and internship report.',
    'Bilan':
      'Review',
    'et suite':
      'and next steps',
    'Ce stage m\'a fait passer de la théorie à la pratique : une infrastructure qui tourne, qui se sauvegarde et qui se restaure vraiment, avec des erreurs de logique que seul un test réel révèle. J\'ai appris à documenter mes choix, y compris les risques acceptés, et à travailler avec des retours réguliers des tuteurs.':
      'This internship took me from theory to practice: an infrastructure that runs, backs itself up and really restores, with logic errors that only a real test reveals. I learned to document my choices, including accepted risks, and to work with regular feedback from the tutors.',
    'Un second stage est prévu du 25 janvier au 5 mars 2027. Il sera détaillé ici dès qu\'il sera réalisé.':
      'A second internship is planned from January 25 to March 5, 2027. It will be detailed here once completed.',
    'Section':
      'Section',
    'Mes stages':
      'My internships',
    'Projet associé':
      'Related project',
    '← Retour aux stages':
      '← Back to internships',
    'Voir tout le stage':
      'See the whole internship'
  };
  var ATTR = {
    'Changer de mode jour / nuit': 'Switch day / night mode'
  };
  var NOTE = {};   // réservé

  var KEY = 'portfolio-lang';
  var SKIP = 'SCRIPT,STYLE';
  var norm = function (s) { return s.replace(/\s+/g, ' ').trim(); };
  var has = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };
  var lang = 'fr';
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === 'fr' || saved === 'en') lang = saved;
    else if (/^en/i.test(navigator.language || '')) lang = 'en';
  } catch (e) {}

  var texts = [], attrs = [];
  (function collect() {
    var w = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) {
      var p = n.parentElement;
      if (!p || p.closest(SKIP)) continue;
      var k = norm(n.data);
      var ov = p.getAttribute('data-en');            // traduction imposée (cas où le même mot a deux sens)
      if (k && (ov !== null || has(DICT, k))) texts.push({ node: n, raw: n.data, key: k, tr: ov !== null ? ov : DICT[k] });
    }
    doc.querySelectorAll('[aria-label],[title]').forEach(function (el) {
      ['aria-label', 'title'].forEach(function (a) {
        var v = el.getAttribute(a);
        if (v && has(ATTR, v)) attrs.push({ el: el, attr: a, raw: v });
      });
    });
  })();

  var origTitle = doc.title;
  var meta = doc.querySelector('meta[name="description"]');
  var origDesc = meta ? meta.getAttribute('content') : '';
  var T_TITLE = {
    'Entrevilles-Reu — Championnat sportif inter-villes | Lucas Rajany': 'Entrevilles-Reu — Inter-town sports championship | Lucas Rajany',
    'Forgejo — Forge Git auto-hébergée | Lucas Rajany': 'Forgejo — Self-hosted Git forge | Lucas Rajany',
    'Stage à la Mairie de Saint-Joseph — Détail des missions | Lucas Rajany': 'Internship at Saint-Joseph Town Hall — Task details | Lucas Rajany',
    'Le Fil du Lord — Média automatisé par IA | Lucas Rajany': 'Le Fil du Lord — AI-automated news media | Lucas Rajany',
    'Projets scolaires BTS SIO | Lucas Rajany': 'BTS SIO school projects | Lucas Rajany',
    'Veille IA — Application de veille technologique | Lucas Rajany': 'Veille IA — Technology watch application | Lucas Rajany'
  };

  function render() {
    var en = lang === 'en';
    texts.forEach(function (t) {
      if (!en) { t.node.data = t.raw; return; }
      var tr = t.tr;
      var lead = /^\s*/.exec(t.raw)[0], trail = /\s*$/.exec(t.raw)[0];
      if (/^[,.;:!?]/.test(tr)) lead = '';
      t.node.data = lead + tr + trail;
    });
    attrs.forEach(function (a) { a.el.setAttribute(a.attr, en ? ATTR[a.raw] : a.raw); });
    doc.documentElement.lang = lang;
    doc.title = en && has(T_TITLE, origTitle) ? T_TITLE[origTitle] : origTitle;
    if (meta) meta.setAttribute('content', en && has(DICT, norm(origDesc)) ? DICT[norm(origDesc)] : origDesc);
    doc.querySelectorAll('.lang-switch [data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
  }
  doc.querySelectorAll('.lang-switch [data-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.dataset.lang;
      try { localStorage.setItem(KEY, lang); } catch (e) {}
      render();
    });
  });
  render();

  /* ── 3. SCROLL FLUIDE + barre de progression + nav ─────────── */
  var progress = doc.getElementById('scroll-progress');
  var nav = doc.getElementById('nav');
  function onScroll(y) {
    var max = root.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (nav) nav.classList.toggle('scrolled', y > 40);
  }
  var lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', function (e) { onScroll(e.scroll); });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
  } else {
    window.addEventListener('scroll', function () { onScroll(window.scrollY); }, { passive: true });
  }
  onScroll(window.scrollY);

  // Liens d'ancre internes (#pipeline, #projets…)
  doc.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = doc.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(t, { offset: -70 });
      else t.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ── 4. ANIMATIONS : entrée de l'en-tête + apparition au scroll ── */
  var reveals = doc.querySelectorAll('.reveal');
  var heroIn = doc.querySelectorAll('.a-in');
  if (window.anime && !reduced) {
    anime({ targets: heroIn, opacity: [0, 1], translateY: [34, 0], duration: 1000, delay: anime.stagger(110, { start: 150 }), easing: 'easeOutExpo' });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target;
          io.unobserve(el);
          anime({ targets: el, opacity: [0, 1], translateY: [36, 0], duration: 800, easing: 'easeOutCubic', complete: function () { el.style.transform = ''; } });
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    } else reveals.forEach(function (el) { el.style.opacity = 1; });
  } else {
    heroIn.forEach(function (el) { el.style.opacity = 1; });
    reveals.forEach(function (el) { el.style.opacity = 1; });
  }
})();
