# Portfolio Développeur Frontend - One Page

## 🎯 Présentation

Portfolio professionnel one-page conçu pour démontrer l'excellence technique et les compétences d'un développeur frontend intermédiaire. Ce site suit les meilleures pratiques du développement web moderne en 2025.

## ✨ Fonctionnalités

### Design & UX
- **Design Minimaliste & Professionnel** : Inspiré des portfolios acclamés comme celui de Brittany Chiang
- **Thème Sombre Automatique** : S'active selon les préférences système avec basculement manuel
- **Typographie Fluide** : Utilise `clamp()` pour une adaptation parfaite à toutes les tailles d'écran
- **Animations Subtiles** : Micro-interactions et animations au scroll pour une expérience engageante
- **Curseur Personnalisé** : Effet de curseur sur desktop pour une touche de créativité

### Performance
- **Mobile-First** : Approche responsive avec media queries progressives
- **Lazy Loading** : Chargement différé des images pour optimiser les performances
- **Images Modernes** : Support des formats WebP avec fallback
- **Code Optimisé** : HTML sémantique, CSS modulaire, JavaScript ES6+

### Accessibilité (WCAG 2.1)
- **Sémantique HTML5** : Utilisation exclusive de balises sémantiques
- **Contraste de couleurs** : Ratio minimum de 4.5:1 respecté
- **Navigation au clavier** : Tous les éléments interactifs sont accessibles
- **ARIA Labels** : Attributs ARIA pour améliorer l'accessibilité
- **Focus visible** : États de focus clairs pour la navigation au clavier
- **Respect des préférences** : Support de `prefers-reduced-motion`

### Interactivité
- **Navigation Intelligente** : Menu fixe avec indicateur de section active
- **Smooth Scroll** : Navigation fluide entre les sections
- **Menu Mobile** : Hamburger menu responsive pour mobile/tablette
- **Bouton Retour en Haut** : Apparaît automatiquement lors du scroll
- **Animations au Scroll** : Intersection Observer pour les animations d'apparition

## 📁 Structure du Projet

```
windsurf-project/
│
├── index.html          # Structure HTML5 sémantique
├── style.css           # Styles CSS avec variables et thème sombre
├── script.js           # JavaScript ES6+ modulaire
└── README.md           # Documentation du projet
```

## 🚀 Installation & Utilisation

### Installation Simple

1. **Téléchargez les fichiers** dans un dossier de votre choix
2. **Ouvrez `index.html`** dans votre navigateur préféré
3. C'est tout ! Le site fonctionne sans serveur

### Avec un serveur local (recommandé)

Pour tester avec un serveur local, utilisez l'une de ces méthodes :

**Option 1 : Python**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Option 2 : Node.js (http-server)**
```bash
npx http-server -p 8000
```

**Option 3 : PHP**
```bash
php -S localhost:8000
```

**Option 4 : VS Code Extension**
- Installez l'extension "Live Server"
- Clic droit sur `index.html` → "Open with Live Server"

Puis ouvrez votre navigateur à l'adresse : `http://localhost:8000`

## 🎨 Personnalisation

### Modifier les Couleurs

Dans `style.css`, modifiez les variables CSS (lignes 8-17) :

```css
:root {
  --bg-primary: #d61313ff;           /* Couleur de fond principale */
  --bg-secondary: #ffffff;         /* Couleur de fond secondaire */
  --text-primary: #333333;         /* Couleur du texte principal */
  --text-secondary: #666666;       /* Couleur du texte secondaire */
  --accent-color: #64ffda;         /* Couleur d'accentuation */
  --accent-hover: #52e5c4;         /* Couleur d'accentuation au survol */
}
```

### Modifier le Contenu

1. **Informations Personnelles** : Remplacez les placeholders dans `index.html`
   - Ligne 18 : `<title>`
   - Ligne 56 : Votre nom dans le hero
   - Ligne 57 : Votre sous-titre
   - Section Contact : Votre email et liens sociaux

2. **Projets** : Modifiez les cartes de projets (section `#projects`)
   - Images : Remplacez les URLs Unsplash par vos captures d'écran
   - Titres et descriptions
   - Technologies utilisées
   - Liens vers démos et code source

3. **Compétences** : Adaptez la liste des compétences selon votre stack

### Changer les Polices

Dans le `<head>` de `index.html`, remplacez le lien Google Fonts :

```html
<link href="https://fonts.googleapis.com/css2?family=VotrePolice&display=swap" rel="stylesheet">
```

Puis mettez à jour les variables CSS :

```css
--font-body: 'VotrePolice', sans-serif;
--font-heading: 'VotrePolice', sans-serif;
```

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : 
  - Variables CSS (Custom Properties)
  - Flexbox & Grid
  - Media Queries (Mobile-First)
  - Animations & Transitions
  - `clamp()` pour la typographie responsive
- **JavaScript ES6+** :
  - Classes & Modules
  - Arrow Functions
  - Template Literals
  - Destructuring
  - Intersection Observer API
  - LocalStorage API

## 📱 Compatibilité Navigateurs

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

**Note** : Le curseur personnalisé est désactivé automatiquement sur mobile/tablette.

## 🔧 Optimisations Implémentées

### Performance
- [x] Lazy loading des images
- [x] Minification recommandée pour la production
- [x] Utilisation de formats d'images modernes (WebP)
- [x] Pas de dépendances externes (jQuery, Bootstrap, etc.)
- [x] Code JavaScript modulaire et optimisé

### SEO
- [x] Balises meta appropriées
- [x] Structure HTML5 sémantique
- [x] Attributs `alt` descriptifs sur les images
- [x] Hiérarchie de titres logique (H1-H6)

### Accessibilité
- [x] Navigation au clavier complète
- [x] ARIA labels sur les éléments interactifs
- [x] Ratios de contraste respectés
- [x] Support de `prefers-reduced-motion`
- [x] Tailles de cibles tactiles ≥ 48x48px

## 📊 Scores Lighthouse (Attendus)

Avec ce code optimisé, vous devriez obtenir des scores excellents :

- **Performance** : 95-100
- **Accessibility** : 95-100
- **Best Practices** : 95-100
- **SEO** : 95-100

## 🎓 Points d'Excellence Technique

Ce portfolio démontre :

1. **Maîtrise des Fondamentaux** : HTML, CSS, JavaScript vanilla sans frameworks
2. **Architecture Moderne** : Code modulaire orienté objet (Classes ES6)
3. **Responsive Design** : Mobile-first avec breakpoints intelligents
4. **Accessibilité** : Respect des standards WCAG 2.1
5. **Performance** : Optimisations avancées (Lazy loading, Intersection Observer)
6. **UX Moderne** : Animations fluides, thème sombre, micro-interactions
7. **Code Propre** : Commenté, organisé, maintenable

## 📝 Checklist Avant Déploiement

- [ ] Remplacer tous les placeholders (nom, email, liens)
- [ ] Ajouter vos vrais projets avec captures d'écran
- [ ] Mettre à jour les liens GitHub et LinkedIn
- [ ] Tester sur différents navigateurs
- [ ] Tester sur mobile et tablette
- [ ] Vérifier l'accessibilité avec WAVE
- [ ] Tester les performances avec Lighthouse
- [ ] Minifier CSS et JavaScript pour la production
- [ ] Optimiser et compresser les images
- [ ] Configurer un domaine personnalisé

## 🚀 Déploiement

### Options Gratuites Recommandées

1. **GitHub Pages**
   - Push vers un repo GitHub
   - Activer GitHub Pages dans les settings
   - URL : `username.github.io/repo-name`

2. **Netlify**
   - Drag & drop le dossier sur netlify.com
   - Déploiement instantané avec domaine personnalisé

3. **Vercel**
   - Import depuis GitHub
   - Déploiement automatique à chaque commit

4. **Cloudflare Pages**
   - Upload direct ou connexion Git
   - CDN mondial gratuit

## 📞 Support & Contact

Pour toute question ou amélioration, n'hésitez pas à :
- Ouvrir une issue sur GitHub
- Me contacter via le formulaire de contact du site

## 📄 Licence

Ce code est fourni comme template de portfolio. Vous êtes libre de l'utiliser et de le modifier pour votre usage personnel ou professionnel.

---

**Développé avec ❤️ et du code propre**

*Version 1.0.0 - Janvier 2025*
