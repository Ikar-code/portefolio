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
    '· Fait avec 💜 depuis La Réunion': '· Made with 💜 from La Réunion',
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
    'Projet de stage : installation, sécurisation et audit d\'une forge Git Forgejo auto-hébergée sur Ubuntu.': 'Internship project: installation, hardening and audit of a self-hosted Forgejo Git forge on Ubuntu.'
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
    'Forgejo — Forge Git auto-hébergée | Lucas Rajany': 'Forgejo — Self-hosted Git forge | Lucas Rajany',
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
