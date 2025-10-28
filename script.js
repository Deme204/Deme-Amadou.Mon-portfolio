/* ========================================
   PORTFOLIO INTERACTIF - JAVASCRIPT ES6+
   Architecture modulaire pour performances optimales
   ======================================== */

'use strict';

/* ========================================
   CONFIGURATION GLOBALE & CONSTANTES
   ======================================== */

const CONFIG = {
  scrollOffset: 100,
  animationThreshold: 0.1,
  cursorDelay: 100,
  scrollTopThreshold: 300
};

/* ========================================
   GESTION DU CURSEUR PERSONNALISÉ
   ======================================== */

class CustomCursor {
  constructor() {
    this.cursor = document.querySelector('.custom-cursor');
    this.cursorDot = document.querySelector('.custom-cursor-dot');
    this.cursorPosition = { x: 0, y: 0 };
    this.cursorDotPosition = { x: 0, y: 0 };
    
    if (window.innerWidth > 768) {
      this.init();
    }
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.cursorPosition.x = e.clientX;
      this.cursorPosition.y = e.clientY;
    });

    this.animate();
    this.handleInteractiveElements();
  }

  animate() {
    // Animation du curseur principal avec délai
    this.cursorDotPosition.x += (this.cursorPosition.x - this.cursorDotPosition.x) * 0.15;
    this.cursorDotPosition.y += (this.cursorPosition.y - this.cursorDotPosition.y) * 0.15;

    this.cursor.style.left = `${this.cursorPosition.x}px`;
    this.cursor.style.top = `${this.cursorPosition.y}px`;
    
    this.cursorDot.style.left = `${this.cursorDotPosition.x}px`;
    this.cursorDot.style.top = `${this.cursorDotPosition.y}px`;

    requestAnimationFrame(() => this.animate());
  }

  handleInteractiveElements() {
    const interactiveElements = document.querySelectorAll('a, button, .project-card');

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.style.transform = 'translate(-50%, -50%) scale(1.3)';
        this.cursor.style.opacity = '0.5';
      });

      el.addEventListener('mouseleave', () => {
        this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        this.cursor.style.opacity = '0.3';
      });
    });
  }
}

/* ========================================
   GESTION DE LA NAVIGATION
   ======================================== */

class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    
    this.init();
  }

  init() {
    this.handleMobileMenu();
    this.handleActiveLink();
    this.handleSmoothScroll();
    this.handleNavbarScroll();
  }

  handleMobileMenu() {
    this.navToggle.addEventListener('click', () => {
      this.navMenu.classList.toggle('active');
      this.navToggle.classList.toggle('active');
      
      const isExpanded = this.navToggle.getAttribute('aria-expanded') === 'true';
      this.navToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Fermer le menu au clic sur un lien
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        this.navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Fermer le menu au clic en dehors
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-container')) {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        this.navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  handleActiveLink() {
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          this.setActiveLink(sectionId);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  setActiveLink(sectionId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }

  handleSmoothScroll() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetPosition = targetSection.offsetTop - CONFIG.scrollOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  handleNavbarScroll() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Si on est en haut de la page, toujours afficher la navbar
      if (currentScroll <= 0) {
        this.navbar.classList.remove('scroll-down');
        this.navbar.style.transform = 'translateY(0)';
        lastScroll = currentScroll;
        return;
      }

      // Scroll vers le bas - cacher la navbar
      if (currentScroll > lastScroll && currentScroll > 100) {
        this.navbar.classList.add('scroll-down');
        this.navbar.style.transform = 'translateY(-100%)';
      } 
      // Scroll vers le haut - afficher la navbar
      else if (currentScroll < lastScroll) {
        this.navbar.classList.remove('scroll-down');
        this.navbar.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;
    });
  }
}

/* ========================================
   GESTION DU THÈME SOMBRE
   ======================================== */

class ThemeManager {
  constructor() {
    this.themeToggle = document.querySelector('.theme-toggle');
    this.currentTheme = localStorage.getItem('theme') || this.getSystemTheme();
    
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  applyTheme(theme) {
    // Marquer qu'un thème manuel a été défini
    document.documentElement.classList.add('theme-set');
    
    if (theme === 'dark') {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  }

  toggleTheme() {
    const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }
}

/* ========================================
   ANIMATIONS AU SCROLL (INTERSECTION OBSERVER)
   ======================================== */

class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('.fade-in');
    this.init();
  }

  init() {
    const observerOptions = {
      threshold: CONFIG.animationThreshold,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    this.elements.forEach(element => observer.observe(element));
  }
}

/* ========================================
   BOUTON CTA HERO - SCROLL VERS PROJETS
   ======================================== */

class HeroCTA {
  constructor() {
    this.ctaButton = document.querySelector('.cta-button');
    this.init();
  }

  init() {
    if (this.ctaButton) {
      this.ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        const projectsSection = document.querySelector('#projects');
        
        if (projectsSection) {
          const offsetPosition = projectsSection.offsetTop - CONFIG.scrollOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    }
  }
}

/* ========================================
   BOUTON RETOUR EN HAUT
   ======================================== */

class ScrollToTop {
  constructor() {
    this.button = document.querySelector('.scroll-top');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.toggleVisibility());
    this.button.addEventListener('click', () => this.scrollToTop());
  }

  toggleVisibility() {
    if (window.pageYOffset > CONFIG.scrollTopThreshold) {
      this.button.classList.add('visible');
    } else {
      this.button.classList.remove('visible');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

/* ========================================
   GESTION DE L'ANNÉE ACTUELLE DANS LE FOOTER
   ======================================== */

const updateCurrentYear = () => {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
};

/* ========================================
   CHARGEMENT DIFFÉRÉ DES IMAGES
   ======================================== */

class LazyImageLoader {
  constructor() {
    this.images = document.querySelectorAll('img[loading="lazy"]');
    this.init();
  }

  init() {
    // Si le navigateur supporte le lazy loading natif, on ne fait rien
    if ('loading' in HTMLImageElement.prototype) {
      return;
    }

    // Sinon, on utilise l'Intersection Observer
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    this.images.forEach(img => imageObserver.observe(img));
  }
}

/* ========================================
   GESTION DES CARTES PROJET - ACCESSIBILITÉ
   ======================================== */

class ProjectCards {
  constructor() {
    this.cards = document.querySelectorAll('.project-card');
    this.init();
  }

  init() {
    this.cards.forEach(card => {
      // Ajout de la navigation au clavier
      card.setAttribute('tabindex', '0');
      
      // Animation au focus pour accessibilité
      card.addEventListener('focus', () => {
        card.style.transform = 'translateY(-8px)';
      });

      card.addEventListener('blur', () => {
        card.style.transform = 'translateY(0)';
      });

      // Permettre d'activer avec Entrée
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const firstLink = card.querySelector('.project-link');
          if (firstLink) {
            firstLink.click();
          }
        }
      });
    });
  }
}

/* ========================================
   GESTION DES PERFORMANCES
   ======================================== */

class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    // Désactiver les animations si l'utilisateur préfère reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.style.scrollBehavior = 'auto';
    }

    // Lazy loading pour les ressources non critiques
    this.deferNonCriticalCSS();
  }

  deferNonCriticalCSS() {
    // Cette fonction peut être utilisée pour charger des CSS non critiques
    // de manière asynchrone après le chargement de la page
    const loadDeferredStyles = () => {
      const addStylesNode = document.getElementById('deferred-styles');
      if (addStylesNode) {
        const replacement = document.createElement('div');
        replacement.innerHTML = addStylesNode.textContent;
        document.body.appendChild(replacement);
        addStylesNode.parentElement.removeChild(addStylesNode);
      }
    };

    const raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    
    if (raf) {
      raf(() => window.setTimeout(loadDeferredStyles, 0));
    } else {
      window.addEventListener('load', loadDeferredStyles);
    }
  }
}

/* ========================================
   ANALYTICS & TRACKING (Optionnel)
   ======================================== */

class Analytics {
  constructor() {
    this.init();
  }

  init() {
    // Tracking des clics sur les liens de projets
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const projectTitle = e.target.closest('.project-card')
          .querySelector('.project-title').textContent;
        
        // Vous pouvez intégrer Google Analytics ou autre ici
        console.log(`Projet cliqué: ${projectTitle}`);
      });
    });

    // Tracking du temps passé sur la page
    this.trackTimeOnPage();
  }

  trackTimeOnPage() {
    const startTime = Date.now();

    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      console.log(`Temps passé sur la page: ${timeSpent} secondes`);
      // Envoyer à votre service d'analytics
    });
  }
}

/* ========================================
   GESTION DU FORMULAIRE DE CONTACT
   ======================================== */

class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.status = document.getElementById('formStatus');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Créer le corps de l'email
    const mailtoBody = `Nom: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
    
    // Créer le lien mailto
    const mailtoLink = `mailto:amadou.deme.pro@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;
    
    // Ouvrir le client email
    window.location.href = mailtoLink;
    
    // Afficher un message de confirmation
    this.showStatus('Votre client email va s\'ouvrir. Merci de votre message !', 'success');
    
    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      this.form.reset();
      this.hideStatus();
    }, 3000);
  }

  showStatus(message, type) {
    this.status.textContent = message;
    this.status.className = `form-status ${type}`;
    this.status.style.display = 'block';
  }

  hideStatus() {
    this.status.style.display = 'none';
  }
}

/* ========================================
   INITIALISATION DE L'APPLICATION
   ======================================== */

class App {
  constructor() {
    this.init();
  }

  init() {
    // Vérifier que le DOM est complètement chargé
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeModules());
    } else {
      this.initializeModules();
    }
  }

  initializeModules() {
    // Initialisation de tous les modules
    // new CustomCursor(); // Curseur personnalisé désactivé
    new Navigation();
    new ThemeManager();
    new ScrollAnimations();
    new HeroCTA();
    new ScrollToTop();
    new LazyImageLoader();
    new ProjectCards();
    new PerformanceOptimizer();
    new Analytics();
    new ContactForm();

    // Mise à jour de l'année dans le footer
    updateCurrentYear();

    // Animation d'entrée pour le hero
    this.animateHeroOnLoad();

    console.log('🚀 Portfolio initialisé avec succès!');
  }

  animateHeroOnLoad() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      setTimeout(() => {
        heroContent.classList.add('visible');
      }, 100);
    }
  }
}

/* ========================================
   DÉMARRAGE DE L'APPLICATION
   ======================================== */

const portfolio = new App();

/* ========================================
   GESTION DES ERREURS GLOBALES
   ======================================== */

window.addEventListener('error', (e) => {
  console.error('Erreur détectée:', e.error);
  // Vous pouvez envoyer ces erreurs à un service de monitoring
});

// Gestion des promesses rejetées
window.addEventListener('unhandledrejection', (e) => {
  console.error('Promise rejetée:', e.reason);
});

/* ========================================
   EXPORT POUR TESTS (Optionnel)
   ======================================== */

// Si vous utilisez un système de modules, vous pouvez exporter les classes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CustomCursor,
    Navigation,
    ThemeManager,
    ScrollAnimations,
    HeroCTA,
    ScrollToTop,
    LazyImageLoader,
    ProjectCards,
    PerformanceOptimizer,
    Analytics,
    App
  };
}
