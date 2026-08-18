/**
 * JAVASCRIPT LOGIC — KHAWLA PORTFOLIO
 * Implements: Bilingual toggles (FR/EN), Dynamic Projects, Navigation active state on scroll,
 * Hamburger menu toggle, Intersection Observer scroll-reveals, and Form validation.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MOBILE HAMBURGER MENU TOGGLE
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinksList = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      navMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', !isOpen);
    });

    // Close menu when clicking any nav link
    navLinksList.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }


  // ==========================================
  // 2. STICKY HEADER & ACTIVE SCROLL SPY
  // ==========================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');

  const handleScroll = () => {
    // Toggle sticky navbar background
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active navigation scroll-spy
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinksList.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger immediately to set initial state


  // ==========================================
  // 3. PROJECTS DATA & DYNAMIC CARD RENDER
  // ==========================================
  // Supporting both French and English descriptions
  const projectsData = [
    {
      id: 1,
      name: "ZINA",
      category: {
        fr: "Projet Personnel",
        en: "Personal Project"
      },
      description: {
        fr: "ZINA est une plateforme e-commerce dédiée à la vente de bijoux et accessoires féminins. Le projet permet aux utilisateurs de découvrir les produits, consulter leurs détails, gérer un panier et une wishlist, puis passer des commandes. Une interface d’administration permet également de gérer les produits, catégories, stocks et commandes. Le projet a été développé principalement avec Laravel et MySQL.",
        en: "ZINA is an e-commerce platform dedicated to selling women's jewelry and accessories. The project allows users to discover products, view details, manage a cart and wishlist, and place orders. An admin interface also manages products, categories, inventory, and orders. Developed mainly with Laravel and MySQL."
      },
      technologies: ["Laravel", "PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
      githubUrl: "https://github.com/Kettayfi-05/zina",
      demoUrl: "",
      imageUrl: "assets/zina.jpg",
      featured: false
    },
    {
      id: 2,
      name: "DRIVENOW",
      category: {
        fr: "Projet Personnel",
        en: "Personal Project"
      },
      description: {
        fr: "DriveNow est une plateforme web de location de voitures développée avec Django et Python. Le projet permet aux utilisateurs de consulter les véhicules disponibles, rechercher et filtrer les voitures, voir leurs détails et effectuer des réservations. Il comprend également un espace administrateur permettant de gérer les véhicules, catégories, utilisateurs et réservations, avec une gestion des images et de la disponibilité des voitures.",
        en: "DriveNow is a car rental web platform developed with Django and Python. The project allows users to browse available vehicles, search and filter cars, view details, and make bookings. It also includes an admin panel to manage vehicles, categories, users, and reservations, with image upload and car availability management."
      },
      technologies: ["Django", "Python", "SQL", "CSS3", "JavaScript"],
      githubUrl: "https://github.com/Kettayfi-05/drivenow",
      demoUrl: "",
      imageUrl: "assets/drivenow.png",
      featured: false
    },
    {
      id: 3,
      name: "BRAVE ENERGY",
      category: {
        fr: "Projet Freelance / Personnel",
        en: "Freelance / Personal Project"
      },
      description: {
        fr: "Brave Energy est une plateforme e-commerce dédiée à la vente de produits électriques. Elle permet aux clients de consulter les produits et catégories, rechercher et filtrer les articles, gérer un panier et envoyer des demandes de commande ou de devis. Le projet intègre également un chatbot intelligent, un système de promotions, favoris et avis, ainsi qu’un espace administrateur pour gérer les produits, stocks, commandes, utilisateurs et contenu du site. Le projet est développé avec Laravel et MySQL.",
        en: "Brave Energy is an e-commerce platform dedicated to selling electrical supplies. It allows clients to browse products and categories, search and filter items, manage a shopping cart, and submit order or quote requests. The project also integrates an intelligent chatbot, a promo system, favorites and reviews, as well as an admin panel to manage products, inventory, orders, users, and site content. Developed with Laravel and MySQL."
      },
      technologies: ["Laravel", "PHP", "MySQL", "CSS3", "JavaScript"],
      githubUrl: "https://github.com/Kettayfi-05/brave-energy",
      demoUrl: "",
      imageUrl: "assets/brave_energy.png",
      featured: false
    }
  ];

  const projectsGrid = document.getElementById('projects-grid');

  const renderProjects = (lang) => {
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = projectsData.map(project => {
      const isFeatured = project.featured ? 'featured-project' : '';
      const techTags = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
      
      const categoryText = project.category[lang];
      const descText = project.description[lang];
      
      const actionText = lang === 'fr' ? 'VOIR LE CODE' : 'VIEW CODE';
      const demoText = lang === 'fr' ? 'DÉMO LIVE' : 'LIVE DEMO';
      
      const actionButton = project.demoUrl 
        ? `<a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-btn">${demoText} &rarr;</a>`
        : `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-btn">${actionText} &rarr;</a>`;
      
      const toggleBtnText = lang === 'fr' ? 'Voir plus' : 'Read more';

      return `
        <article class="project-card ${isFeatured}">
          <div class="project-info-box">
            <h3 class="project-title">${project.name}</h3>
            <div class="project-desc-wrapper">
              <p class="project-desc">${descText}</p>
              <button class="toggle-desc-btn" type="button">${toggleBtnText}</button>
            </div>
            <div class="project-img-frame">
              <img src="${project.imageUrl}" alt="Interface representation for project ${project.name}" class="project-img" loading="lazy">
            </div>
            <div class="project-tech">
              ${techTags}
            </div>
            <div class="project-links">
              ${actionButton}
            </div>
          </div>
        </article>
      `;
    }).join('');
  };


  // ==========================================
  // 4. BILINGUAL MULTILANGUAGE SWITCHER SYSTEM
  // ==========================================
  const langToggleBtn = document.getElementById('lang-toggle');
  
  // Updates inputs placeholders dynamically based on language
  const updateFormPlaceholders = (lang) => {
    const placeholderElements = document.querySelectorAll('[data-placeholder-fr]');
    placeholderElements.forEach(el => {
      const placeholderText = lang === 'fr' 
        ? el.getAttribute('data-placeholder-fr') 
        : el.getAttribute('data-placeholder-en');
      if (placeholderText) {
        el.setAttribute('placeholder', placeholderText);
      }
    });
  };

  const setLanguage = (lang) => {
    document.body.className = `lang-${lang}`;
    localStorage.setItem('preferred-language', lang);
    
    // Toggle button displays opposite language options
    if (langToggleBtn) {
      langToggleBtn.textContent = lang === 'fr' ? 'EN' : 'FR';
      langToggleBtn.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Changer en Français');
    }
    
    // Re-render sections dependent on variables
    renderProjects(lang);
    updateFormPlaceholders(lang);
  };
  
  // Retrieve saved language or default to French
  const initialLang = localStorage.getItem('preferred-language') || 'fr';
  setLanguage(initialLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const currentLang = document.body.classList.contains('lang-fr') ? 'fr' : 'en';
      const targetLang = currentLang === 'fr' ? 'en' : 'fr';
      setLanguage(targetLang);
    });
  }


  // ==========================================
  // 5. INTERSECTION OBSERVER FOR SCROLL REVEALS
  // ==========================================
  const scrollElements = document.querySelectorAll('.scroll-reveal');

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  scrollElements.forEach(el => revealOnScroll.observe(el));


  // ==========================================
  // 6. CONTACT FORM VALIDATION & HANDLING
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  const failMsg = document.getElementById('form-fail');
  const submitBtn = document.getElementById('btn-submit');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      successMsg.style.display = 'none';
      failMsg.style.display = 'none';

      const currentLang = document.body.classList.contains('lang-fr') ? 'fr' : 'en';

      // Inputs validations rules
      const fields = [
        { id: 'form-name', errorId: 'error-name', check: (val) => val.trim().length > 0 },
        { id: 'form-email', errorId: 'error-email', check: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) },
        { id: 'form-subject', errorId: 'error-subject', check: (val) => val.trim().length > 0 },
        { id: 'form-message', errorId: 'error-message', check: (val) => val.trim().length > 0 }
      ];

      let isFormValid = true;

      fields.forEach(field => {
        const inputEl = document.getElementById(field.id);
        const isValid = field.check(inputEl.value);

        if (!isValid) {
          inputEl.parentElement.classList.add('invalid');
          isFormValid = false;
        } else {
          inputEl.parentElement.classList.remove('invalid');
        }

        inputEl.addEventListener('input', () => {
          if (field.check(inputEl.value)) {
            inputEl.parentElement.classList.remove('invalid');
          }
        });
      });

      if (isFormValid) {
        submitBtn.disabled = true;
        submitBtn.textContent = currentLang === 'fr' ? 'ENVOI EN COURS...' : 'SENDING...';

        const formData = new FormData(contactForm);

        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        })
        .then(async (response) => {
          const json = await response.json();
          if (response.status === 200) {
            successMsg.style.display = 'flex';
            contactForm.reset();
          } else {
            console.error('Submission failed:', json);
            failMsg.style.display = 'block';
          }
        })
        .catch(error => {
          console.error('Error during submission:', error);
          failMsg.style.display = 'block';
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = currentLang === 'fr' ? 'ENVOYER LE MESSAGE →' : 'SEND MESSAGE →';
        });
      } else {
        const firstInvalid = contactForm.querySelector('.form-group.invalid');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }


  // Book click toggle handler (for mobile/tablet touch screens)
  const aboutBook = document.getElementById('about-book');
  if (aboutBook) {
    aboutBook.addEventListener('click', () => {
      aboutBook.classList.toggle('opened');
    });
    aboutBook.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        aboutBook.classList.toggle('opened');
      }
    });
  }

  // Event delegation click handler for "Voir plus" descriptions
  if (projectsGrid) {
    projectsGrid.addEventListener('click', (e) => {
      if (e.target.classList.contains('toggle-desc-btn')) {
        const btn = e.target;
        const desc = btn.previousElementSibling;
        desc.classList.toggle('expanded');
        
        const currentLang = document.body.classList.contains('lang-fr') ? 'fr' : 'en';
        if (desc.classList.contains('expanded')) {
          btn.textContent = currentLang === 'fr' ? 'Voir moins' : 'Read less';
        } else {
          btn.textContent = currentLang === 'fr' ? 'Voir plus' : 'Read more';
        }
      }
    });
  }

  // Lightbox Modal for Project Screenshots Zoom
  const lightbox = document.getElementById('project-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (projectsGrid && lightbox && lightboxImg && lightboxCaption) {
    // Click on image frame to open lightbox
    projectsGrid.addEventListener('click', (e) => {
      const frame = e.target.closest('.project-img-frame');
      if (frame) {
        const img = frame.querySelector('img');
        const card = frame.closest('.project-card');
        const title = card.querySelector('.project-title').textContent;
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
      }
    });

    // Close lightbox function
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Unlock background scrolling
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Close on click outside image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === lightboxClose) {
        closeLightbox();
      }
    });

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

});