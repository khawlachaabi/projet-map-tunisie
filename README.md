# 🗺️ Carte Interactive de la Tunisie

Une carte interactive moderne et élégante des 24 régions de la Tunisie, avec des animations fluides, un mode sombre, et de nombreuses fonctionnalités pour une expérience utilisateur exceptionnelle.

## ✨ Fonctionnalités

### 🎨 Interface Moderne
- **Design élégant** avec dégradés et effets de verre (glassmorphism)
- **Mode sombre/clair** avec transition fluide
- **Animations sophistiquées** pour toutes les interactions
- **Responsive design** parfaitement adapté mobile, tablette et desktop

### 🔍 Recherche Intelligente
- Recherche en temps réel de régions
- Mise en surbrillance des résultats
- Recherche par nom, type ou description
- Résultats instantanés avec aperçu

### 🗺️ Carte Interactive
- **Zoom et pan** sur la carte SVG
- **Hover preview** des régions
- **Sélection avec verrouillage** pour explorer en détail
- **Animations au survol** avec effet de pulsation
- **Marqueur spécial** pour la capitale (Tunis)
- **Hotspot pour Djerba** (île cliquable)
### 🏠 Écran d'accueil
![Accueil](Capture/map.png)

### 💾 Fonctionnalités Avancées
- **Favoris** : Sauvegarde locale des régions favorites
- **Partage** : Partage natif ou copie dans le presse-papier
- **Thème persistant** : Le thème choisi est sauvegardé
- **Notifications toast** : Retours visuels pour chaque action
- **Statistiques** : Affichage du nombre de régions, superficie, population

### ♿ Accessibilité
- Labels ARIA pour les lecteurs d'écran
- Navigation au clavier complète
- Contraste élevé en mode sombre
- Support du mode "reduced motion"
- Focus visible sur tous les éléments interactifs

## 📁 Structure du Projet

```
projet-carte-tunisie/
├── index.html          # Page principale
├── style.css           # Styles avec mode sombre
├── script.js           # Logique interactive
├── README.md          # Documentation
└── assets/
    ├── image.svg       # Carte SVG de la Tunisie
    └── images/
        └── icones/     # Images des régions
            ├── Tunis.png
            ├── Sfax.png
            ├── Bizerte.png
            └── ...
```

## 🚀 Installation & Utilisation

### Option 1 : GitHub Pages (Recommandé)

1. **Fork le repository** sur GitHub
2. Va dans **Settings** > **Pages**
3. Sélectionne la branche `main` et le dossier `/root`
4. Clique sur **Save**
5. Ton site sera disponible à `https://ton-username.github.io/nom-du-repo/`

### Option 2 : Local

1. Clone le repository :
```bash
git clone https://github.com/ton-username/carte-tunisie.git
cd carte-tunisie
```

2. Ouvre `index.html` dans ton navigateur
   - Double-clic sur le fichier, ou
   - Utilise un serveur local (Live Server, Python, etc.)

### Option 3 : Serveur Local

#### Avec Python :
```bash
# Python 3
python -m http.server 8000

# Puis ouvre http://localhost:8000
```

#### Avec Node.js :
```bash
npx serve
```

## 🎯 Chemins Relatifs Optimisés

Tous les chemins sont relatifs et fonctionnent parfaitement avec GitHub Pages :

- ✅ `assets/image.svg` (carte principale)
- ✅ `assets/images/icones/*.png` (images des régions)
- ✅ `style.css` (styles)
- ✅ `script.js` (JavaScript)

## 🎨 Personnalisation

### Modifier les Couleurs

Dans `style.css`, modifie les variables CSS :

```css
:root {
  --region-primary: #dc2626;    /* Couleur principale (rouge) */
  --region-hover: #b91c1c;      /* Couleur au survol */
  --region-selected: #991b1b;   /* Couleur sélection */
}
```

### Ajouter une Région

Dans `script.js`, ajoute une entrée dans `regionContent` :

```javascript
const regionContent = {
  nouvelle_region: {
    title: 'Nouvelle Région',
    img: 'assets/images/icones/nouvelle.png',
    type: 'Description courte',
    desc: 'Description détaillée de la région...'
  },
  // ...
};
```

### Modifier le Thème

Le thème par défaut est clair. Pour changer :

```javascript
// Dans script.js
let theme = localStorage.getItem('tunisiaMapTheme') || 'dark'; // 'light' ou 'dark'
```

## 📱 Compatibilité

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile (iOS Safari, Chrome Android)

## 🔧 Technologies

- **HTML5** : Structure sémantique
- **CSS3** : Variables CSS, Grid, Flexbox, Animations
- **JavaScript ES6+** : Modules, Arrow functions, Async/await
- **SVG** : Carte vectorielle interactive tracée avec Inkscape
- **LocalStorage** : Sauvegarde des préférences

## 🎨 Processus de Création

### Cartographie
La carte de la Tunisie a été entièrement tracée à la main avec **Inkscape**, un logiciel libre et open-source de dessin vectoriel :

1. **Traçage manuel** des frontières de chaque gouvernorat
2. **Optimisation** des paths SVG pour la performance
3. **Attribution d'IDs** uniques à chaque région
4. **Export SVG** optimisé pour le web
5. **Intégration** dans l'interface interactive

Cette approche permet :
- ✅ Une carte **légère** et **rapide** (format vectoriel)
- ✅ Un **zoom infini** sans perte de qualité
- ✅ Une **personnalisation totale** des couleurs et styles
- ✅ Une **interactivité** poussée avec JavaScript

**Inkscape** est un excellent choix pour la cartographie web car il offre :
- 🎯 Précision du tracé vectoriel
- 🎨 Outils de dessin professionnels
- 📐 Gestion des calques et objets
- 💾 Export SVG optimisé
- 🆓 Gratuit et open-source

## 🌟 Améliorations Ajoutées

1. **Mode Sombre** : Thème sombre élégant avec transition fluide
2. **Recherche** : Barre de recherche avec résultats en temps réel
3. **Favoris** : Système de favoris avec sauvegarde locale
4. **Partage** : Partage natif avec fallback copie clipboard
5. **Toast** : Notifications élégantes pour les actions
6. **Animations** : Transitions fluides partout
7. **Skeleton** : Placeholder pendant chargement images
8. **Stats** : Panneau de statistiques animées
9. **Accessibilité** : Navigation clavier, ARIA, focus visible
10. **Performance** : Optimisations CSS/JS, lazy loading

## 🎓 Guide d'Utilisation

### Pour l'Utilisateur

1. **Explorer** : Survole les régions pour voir un aperçu
2. **Sélectionner** : Clique pour verrouiller une région
3. **Zoomer** : Utilise les contrôles de zoom ou la molette
4. **Rechercher** : Tape dans la barre de recherche
5. **Favoris** : Clique sur ❤️ pour sauvegarder
6. **Partager** : Clique sur 🔗 pour partager
7. **Thème** : Toggle ☀️/🌙 pour changer de thème

### Pour le Développeur

```javascript
// Accéder à une région programmatiquement
window.showRegionInfo('tunis');

// Sélectionner une région
window.setPinnedRegion('sfax');

// Contrôler le zoom
window.__mapTransform.setZoom(1.5);
window.__mapTransform.setPan(100, 50);
```

## 🐛 Bugs Connus / Limitations

- Les images des régions doivent être présentes dans `assets/images/icones/`
- Le fichier SVG doit être dans `assets/image.svg`
- Certains navigateurs anciens peuvent avoir des problèmes avec les variables CSS

## 📝 Licence

Ce projet est libre d'utilisation pour des projets éducatifs et personnels.

## 👨‍💻 Contributions

Les contributions sont les bienvenues ! N'hésite pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit tes changements (`git commit -am 'Ajout fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème :
- Ouvre une **Issue** sur GitHub
- Consulte la documentation dans le code
- Vérifie que tous les fichiers sont au bon endroit

## 🎉 Crédits

- **Carte SVG** : Tracé personnalisé réalisé avec [Inkscape](https://inkscape.org/) 🎨
- **Cartographie** : Traçage manuel des 24 gouvernorats de Tunisie
- **Icons** : SVG icons inline
- **Design** : Interface moderne avec glassmorphism
- **Fonts** : System fonts pour performance optimale
- **Développement** : HTML5, CSS3, JavaScript vanilla

---

Fait avec ❤️ pour découvrir la Tunisie

*Carte réalisée avec Inkscape - Logiciel libre de dessin vectoriel*
