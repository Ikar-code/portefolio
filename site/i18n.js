/* ============================================================
   Portfolio – Lucas Rajany : traduction FR / EN
   Le HTML reste en français (langue par défaut). Chaque texte français
   est cherché dans le dictionnaire ci-dessous et remplacé par sa version
   anglaise quand on clique sur « EN ». Pour corriger une traduction,
   il suffit de modifier la ligne correspondante.
   ============================================================ */
(function () {
  'use strict';

  /* ── Dictionnaire : texte français (espaces normalisés) → anglais ── */
  var DICT = {
    // Écran de choix
    'Lucas Rajany · Portfolio': 'Lucas Rajany · Portfolio',
    'Nuit ou jour ?': 'Night or day?',
    'Mode nuit': 'Night mode',
    'Mode jour': 'Day mode',
    'Choisissez votre ambiance pour entrer': 'Pick your mood to enter',

    // Navigation
    'À propos': 'About',
    'Compétences': 'Skills',
    'Projets': 'Projects',
    'Parcours': 'Background',
    'Veille': 'Watch',
    'Contact': 'Contact',
    'Télécharger CV': 'Download CV',

    // Hero
    'Disponible pour un stage · Réunion': 'Available for an internship · Réunion',
    'Étudiant': 'Student in the',
    'passionné par le développement applicatif, l\'automatisation et les nouvelles technologies. Basé à Saint-Joseph, Île de La Réunion.':
      ', passionate about application development, automation and new technologies. Based in Saint-Joseph, Réunion Island.',
    'Voir mes projets': 'View my projects',
    'Me contacter': 'Contact me',

    // À propos
    'Étudiant BTS SIO SLAM': 'BTS SIO SLAM student',
    'Saint-Joseph, Île de La Réunion': 'Saint-Joseph, Réunion Island',
    'Permis B': 'Driving licence (B)',
    'Certification PIX': 'PIX certification',
    'À propos de moi': 'About me',
    'Développeur en': 'Developer in the',
    'devenir': 'making',
    'Je m\'appelle Lucas Rajany, étudiant en': 'My name is Lucas Rajany, a student in the',
    'BTS SIO option SLAM (Solutions Logicielles et Applications Métiers)': 'BTS SIO, SLAM option (Software Solutions and Business Applications)',
    'au Lycée Pierre Poivre à Saint-Joseph, Île de La Réunion. Passionné par la résolution de problèmes et le développement applicatif, je cherche à construire un parcours professionnel solide dans l\'informatique.':
      'at Lycée Pierre Poivre in Saint-Joseph, Réunion Island. Passionate about problem solving and application development, I aim to build a solid career in IT.',
    'Sérieux, motivé et organisé, j\'accorde une grande importance à l\'analyse et à l\'optimisation des solutions que je développe. Mon stage à la Mairie de Saint-Joseph m\'a permis de mettre en pratique l\'administration système, la conteneurisation et l\'automatisation avec des outils modernes.':
      'Serious, motivated and organised, I place great importance on analysing and optimising the solutions I build. My internship at Saint-Joseph Town Hall let me put system administration, containerisation and automation into practice with modern tools.',
    'Je suis actuellement ouvert à toute opportunité de stage en développement ou administration système sur La Réunion.':
      'I am currently open to any internship opportunity in development or system administration in Réunion.',
    'Travail d\'équipe': 'Teamwork',
    'Organisation': 'Organisation',
    'Adaptabilité': 'Adaptability',
    'Esprit d\'analyse': 'Analytical mind',
    'Curiosité': 'Curiosity',

    // Compétences
    'Mon': 'My technical',
    'technique': '',
    'Les outils et technologies utilisés dans mes projets.': 'The tools and technologies used in my projects.',
    'IA & Automatisation': 'AI & Automation',
    'Agents IA': 'AI agents',
    'Automatisation': 'Automation',
    'DevOps & Déploiement': 'DevOps & Deployment',
    'Outils': 'Tools',
    'Jeux vidéo & Design': 'Video games & Design',
    'Pencil (maquettage UI)': 'Pencil (UI mockups)',
    'Notions transverses': 'Cross-cutting skills',
    'Algorithmique': 'Algorithmics',
    'Architecture logicielle': 'Software architecture',
    'Pipeline IA': 'AI pipeline',
    'Analyse de données': 'Data analysis',

    // Projets
    'Ce que j\'ai': 'What I\'ve',
    'construit': 'built',
    'Projets personnels et scolaires, du développement web à l\'automatisation IA.':
      'Personal and school projects, from web development to AI automation.',
    'Projet personnel': 'Personal project',
    'Projet scolaire': 'School project',
    'Projet de stage': 'Internship project',
    'Média automatisé par IA': 'AI-automated news media',
    'Système complet de génération d\'articles d\'actualité automatisé. Le pipeline collecte des informations via scraping et flux RSS, vérifie les faits avec IA, rédige des articles journalistiques, effectue un contrôle qualité puis publie automatiquement le contenu.':
      'A complete system for automated news article generation. The pipeline collects information through scraping and RSS feeds, fact-checks with AI, writes journalistic articles, runs a quality check and then publishes the content automatically.',
    'Application de veille automatisée': 'Automated watch application',
    'Application web complète permettant de réaliser des veilles technologiques automatisées dans le domaine de l\'intelligence artificielle. L\'objectif : supprimer la friction de la veille manuelle.':
      'A complete web application for running automated technology watch in the field of artificial intelligence. The goal: remove the friction of manual monitoring.',
    'Projets scolaires BTS SIO': 'BTS SIO school projects',
    'Application': 'Application',
    'Application web simple permettant de gérer des données (ajout, modification, suppression). Développée dans le cadre du BTS SIO pour maîtriser les bases du développement back-end et de la gestion de base de données.':
      'A simple web application to manage data (add, edit, delete). Built as part of the BTS SIO to master the basics of back-end development and database management.',
    'Forge Git auto-hébergée & sécurisée': 'Self-hosted & secured Git forge',
    'Installation et mise en service de Forgejo sur une machine virtuelle Ubuntu pour l\'entreprise. Création des comptes utilisateurs, configuration des alertes par email et vérification de la sécurité des fichiers.':
      'Installation and commissioning of Forgejo on an Ubuntu virtual machine for the company. User account creation, email alert configuration and file security checks.',
    'Championnat sportif inter-villes': 'Inter-city sports championship',
    'Application web de gestion d\'une compétition sportive inspirée d\'Intervilles : équipes des villes de La Réunion, épreuves, saisie des résultats et classement public. Développée en PHP natif avec une architecture MVC.':
      'A web application to manage a sports competition inspired by Intervilles: teams from the towns of Réunion, events, results entry and a public ranking. Built in native PHP with an MVC architecture.',

    // Parcours
    'Formation &': 'Education &',
    'expériences': 'experience',
    'Mon cheminement académique et professionnel jusqu\'ici.': 'My academic and professional journey so far.',
    'Formation': 'Education',
    'Expériences': 'Experience',
    '2025 – 2027 · En cours': '2025 – 2027 · Ongoing',
    'BTS SIO – Option SLAM': 'BTS SIO – SLAM option',
    'Lycée Pierre Poivre · Saint-Joseph': 'Lycée Pierre Poivre · Saint-Joseph',
    'Bases en développement et algorithmique': 'Fundamentals of development and algorithmics',
    'Analyse de solutions applicatives': 'Analysis of application solutions',
    'Progression en programmation et conception logicielle': 'Progress in programming and software design',
    'Baccalauréat STI2D': 'STI2D Baccalaureate',
    'Diplôme National du Brevet (DNB)': 'National Diploma (DNB)',
    'Collège Joseph Hubert · Saint-Joseph': 'Collège Joseph Hubert · Saint-Joseph',
    'Juin – Juillet 2026 · 1 mois': 'June – July 2026 · 1 month',
    'Stage informatique': 'IT internship',
    'Mairie de Saint-Joseph': 'Saint-Joseph Town Hall',
    'Installation et config. d\'environnements Linux sur VM': 'Installing and configuring Linux environments on VMs',
    'Utilisation de Forgejo pour la gestion de dépôts Git auto-hébergés': 'Using Forgejo to manage self-hosted Git repositories',
    'Ansible pour l\'automatisation et la gestion de configurations': 'Ansible for automation and configuration management',
    'Docker pour l\'exécution d\'applications conteneurisées': 'Docker to run containerised applications',
    'Interventions techniques sur différents sites': 'Technical interventions on various sites',
    'Maintenance, diagnostic et support technique': 'Maintenance, diagnostics and technical support',
    'Stage d\'observation': 'Observation internship',
    'Observation informatique': 'IT observation',
    'Collège Mille Roches · Saint-André': 'Collège Mille Roches · Saint-André',
    'Découverte du métier d\'informaticien': 'Discovering the IT profession',
    'Observation d\'interventions techniques': 'Observing technical interventions',
    'Initiation à la maintenance et au diagnostic': 'Introduction to maintenance and diagnostics',

    // Veille
    'Veille technologique': 'Technology watch',
    'L\'impact de l\'IA sur la': 'The impact of AI on',
    'cybersécurité IoT': 'IoT cybersecurity',
    'Veille centrée sur l\'intelligence artificielle appliquée à la sécurité des objets connectés (AIoT) : menaces émergentes, défenses adaptatives, vulnérabilités matérielles et détection d\'anomalies par machine learning.':
      'A watch focused on artificial intelligence applied to the security of connected objects (AIoT): emerging threats, adaptive defences, hardware vulnerabilities and anomaly detection through machine learning.',
    'Pourquoi ce sujet': 'Why this topic',
    'Mon stage à la Mairie de Saint-Joseph m\'a fait manipuler des serveurs, des VM et des services exposés au quotidien (Forgejo, Postfix, comptes utilisateurs). Les objets connectés multiplient ce type de surface d\'attaque à une échelle beaucoup plus grande, avec des ressources bien plus limitées pour se défendre. Je voulais comprendre comment l\'IA change à la fois l\'attaque et la défense sur ce terrain.':
      'My internship at Saint-Joseph Town Hall had me working daily with servers, VMs and exposed services (Forgejo, Postfix, user accounts). Connected objects multiply this kind of attack surface on a much larger scale, with far more limited resources to defend themselves. I wanted to understand how AI changes both attack and defence in this field.',
    'Les repères du sujet': 'Key points of the topic',
    'Détection d\'anomalies par IA': 'AI-based anomaly detection',
    'Des modèles de machine learning apprennent le trafic « normal » d\'un objet connecté (fréquence, volume, destinataires) pour repérer un comportement suspect en temps réel, là où les signatures classiques ne suffisent plus face à des attaques inédites.':
      'Machine learning models learn the "normal" traffic of a connected object (frequency, volume, recipients) to spot suspicious behaviour in real time, where classic signatures are no longer enough against novel attacks.',
    'IA offensive': 'Offensive AI',
    'Les mêmes techniques sont utilisées par les attaquants : génération de malwares polymorphes, automatisation de la recherche de failles sur des firmwares IoT, phishing ciblé généré par LLM.':
      'The same techniques are used by attackers: generation of polymorphic malware, automated vulnerability hunting in IoT firmware, and LLM-generated targeted phishing.',
    'Contraintes matérielles': 'Hardware constraints',
    'Un objet connecté a peu de mémoire, de calcul et de batterie. Les modèles de détection doivent donc être allégés (edge AI, modèles compressés) pour tourner directement sur l\'appareil plutôt que dans le cloud.':
      'A connected object has little memory, computing power and battery. Detection models therefore have to be lightweight (edge AI, compressed models) to run directly on the device rather than in the cloud.',
    'Ma méthode': 'My method',
    'Collecte automatisée avec l\'application': 'Automated collection with the',
    'présentée ci-dessus : elle rassemble les articles publiés sur mon thème via le web et des flux RSS spécialisés.':
      'application presented above: it gathers articles published on my topic from the web and specialised RSS feeds.',
    'Tri manuel des résultats : je ne garde que ce qui concerne vraiment l\'IA appliquée à la sécurité IoT, avec une source fiable.':
      'Manual sorting of the results: I only keep what really concerns AI applied to IoT security, from a reliable source.',
    'Lecture directe de publications techniques et de retours d\'expérience sur des incidents IoT réels pour compléter la synthèse automatique.':
      'Direct reading of technical publications and feedback on real IoT incidents to complete the automatic summary.',
    'Résultat de ma veille': 'Results of my watch',
    'Retrouvez ici les articles collectés et synthétisés automatiquement sur mon sujet (voir le projet':
      'Find here the articles collected and automatically summarised on my topic (see the',
    'ci-dessus pour le détail de l\'outil).': 'project above for details on the tool).',
    'Accéder à la veille ↗': 'Open the watch ↗',

    // Contact
    'Travaillons': 'Let\'s work',
    'ensemble': 'together',
    'Ouvert à toute opportunité de stage ou collaboration. N\'hésitez pas à me contacter !':
      'Open to any internship or collaboration opportunity. Feel free to get in touch!',
    'Restons en contact': 'Let\'s keep in touch',
    'Étudiant en BTS SIO à La Réunion, je suis ouvert à toute opportunité de stage. Que vous ayez un projet ou une question, je réponds rapidement.':
      'A BTS SIO student in Réunion, I am open to any internship opportunity. Whether you have a project or a question, I reply quickly.',
    'Mon profil LinkedIn': 'My LinkedIn profile',
    'Mon GitHub': 'My GitHub',
    'Localisation': 'Location',
    'Prénom': 'First name',
    'Nom': 'Last name',
    'Sujet': 'Subject',
    'Envoyer le message →': 'Send message →',
    '✓ Votre application mail va s\'ouvrir avec le message prêt à envoyer.': '✓ Your mail app will open with the message ready to send.',
    '· Fait avec 💜 depuis La Réunion': '· Made with 💜 from La Réunion'
  };

  /* ── Attributs (aria-label, placeholder, title) ── */
  var ATTR = {
    'Choisissez le mode d\'affichage du portfolio': 'Choose how to display the portfolio',
    'Changer de mode jour / nuit': 'Switch day / night mode',
    'Entrer en mode nuit': 'Enter in night mode',
    'Entrer en mode jour': 'Enter in day mode',
    'Voir le projet : Le Fil du Lord': 'View project: Le Fil du Lord',
    'Voir le projet : Veille IA': 'View project: Veille IA',
    'Voir le projet : Projets scolaires BTS SIO': 'View project: BTS SIO school projects',
    'Voir le projet : Forgejo': 'View project: Forgejo',
    'Voir le projet : Entrevilles-Reu': 'View project: Entrevilles-Reu',
    'Opportunité de stage': 'Internship opportunity',
    'Bonjour Lucas, je souhaite vous proposer...': 'Hello Lucas, I would like to offer you...'
  };

  /* ── Textes pilotés par le JavaScript : [français, anglais] ── */
  var JS = {
    hsDown: ['Faites défiler ↓', 'Scroll down ↓'],
    hsSwipe: ['Glissez →', 'Swipe →'],
    mailSubject: ['Contact depuis le portfolio', 'Contact from the portfolio'],
    mailHello: ['Bonjour Lucas,', 'Hello Lucas,'],
    desc: [
      'Portfolio de Lucas Rajany, étudiant BTS SIO SLAM à La Réunion : développement, automatisation IA et DevOps.',
      'Portfolio of Lucas Rajany, BTS SIO SLAM student in Réunion Island: development, AI automation and DevOps.'
    ],
    title: ['Lucas Rajany – Portfolio', 'Lucas Rajany – Portfolio']
  };
  var ROLES = {
    fr: ['Étudiant BTS SIO SLAM', 'Développeur en formation', 'Passionné d\'automatisation IA', 'Curieux de systèmes & DevOps'],
    en: ['BTS SIO SLAM student', 'Developer in training', 'Passionate about AI automation', 'Curious about systems & DevOps']
  };

  var KEY = 'portfolio-lang';
  var SKIP = 'SCRIPT,STYLE,#typed,#hs-count,#hs-hint';
  var doc = document;
  var norm = function (s) { return s.replace(/\s+/g, ' ').trim(); };

  /* Langue de départ : choix mémorisé, sinon langue du navigateur (anglais si « en », français sinon) */
  var lang = 'fr';
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === 'fr' || saved === 'en') lang = saved;
    else if (/^en/i.test(navigator.language || '')) lang = 'en';
  } catch (e) {}

  /* Repérage unique de tous les nœuds à traduire */
  var texts = [];
  var attrs = [];
  (function collect() {
    var walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = walker.nextNode())) {
      var p = n.parentElement;
      if (!p || p.closest(SKIP)) continue;
      var k = norm(n.data);
      if (k && Object.prototype.hasOwnProperty.call(DICT, k)) texts.push({ node: n, raw: n.data, key: k });
    }
    doc.querySelectorAll('[aria-label],[placeholder],[title]').forEach(function (el) {
      ['aria-label', 'placeholder', 'title'].forEach(function (a) {
        var v = el.getAttribute(a);
        if (v && Object.prototype.hasOwnProperty.call(ATTR, v)) attrs.push({ el: el, attr: a, raw: v });
      });
    });
  })();

  var metaDesc = doc.querySelector('meta[name="description"]');

  function render() {
    var en = lang === 'en';
    texts.forEach(function (t) {
      if (!en) { t.node.data = t.raw; return; }
      var tr = DICT[t.key];
      var lead = /^\s*/.exec(t.raw)[0];
      var trail = /\s*$/.exec(t.raw)[0];
      if (/^[,.;:!?]/.test(tr)) lead = '';          // pas d'espace avant la ponctuation
      t.node.data = lead + tr + trail;
    });
    attrs.forEach(function (a) { a.el.setAttribute(a.attr, en ? ATTR[a.raw] : a.raw); });
    doc.documentElement.lang = lang;
    doc.title = JS.title[en ? 1 : 0];
    if (metaDesc) metaDesc.setAttribute('content', JS.desc[en ? 1 : 0]);
    doc.querySelectorAll('.lang-switch [data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
  }

  function set(next) {
    if (next !== 'fr' && next !== 'en') return;
    var changed = next !== lang;
    lang = next;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    render();
    if (changed) doc.dispatchEvent(new CustomEvent('languagechange', { detail: lang }));
  }

  doc.querySelectorAll('.lang-switch [data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { set(b.dataset.lang); });
  });

  render();

  window.I18N = {
    get lang() { return lang; },
    set: set,
    t: function (key) { return JS[key][lang === 'en' ? 1 : 0]; },
    roles: function () { return ROLES[lang]; }
  };
})();
