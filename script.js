// ============ SMOOTH SCROLL BEHAVIOR ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============ NAVBAR SCROLL EFFECT ============
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
  }
});

// ============ INTERSECTION OBSERVER (FADE IN ON SCROLL) ============
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all project cards, stat cards, skill cards
document.querySelectorAll('.project-card, .stat-card, .skill-category, .timeline-item').forEach(el => {
  observer.observe(el);
});

// Add fade-in animation class
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    animation: fadeInUp 0.6s ease-out !important;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// ============ HAMBURGER MENU (MOBILE) ============
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });

  // Close menu when link clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.style.display = 'none';
    });
  });
}

// ============ COUNTER ANIMATION (STATS) ============
const animateCounter = (element, target, duration = 1000) => {
  let start = 0;
  const increment = target / (duration / 16);
  
  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
};

// Trigger counter when stat card comes into view
document.querySelectorAll('.stat-number').forEach(stat => {
  observer.observe(stat);
});

// ============ PARALLAX SCROLL EFFECT ============
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroBefore = document.querySelector('.hero::before');
  const heroAfter = document.querySelector('.hero::after');
  
  if (scrollY < window.innerHeight) {
    document.documentElement.style.setProperty('--scroll', scrollY * 0.5 + 'px');
  }
});

// ============ CONSOLE MESSAGE ============
console.log('%cWelcome to the Portfolio! 🚀', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cMade with ❤️ and JavaScript', 'font-size: 14px; color: #ec4899;');

// ============ ACTIVE LINK HIGHLIGHTING ============
const highlightActiveLink = () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
};

// Add active link styling
const activeStyle = document.createElement('style');
activeStyle.textContent = `
  .nav-links a.active {
    color: #6366f1;
    font-weight: 700;
  }

  .nav-links a.active::after {
    width: 100%;
  }
`;
document.head.appendChild(activeStyle);

highlightActiveLink();

// ============ RANDOM GRADIENT ANIMATION (OPTIONAL) ============
const animateGradient = () => {
  const gradients = [
    'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
    'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #6366f1 100%)'
  ];

  let index = 0;
  const contactSection = document.querySelector('.contact');
  
  if (contactSection) {
    setInterval(() => {
      index = (index + 1) % gradients.length;
      contactSection.style.background = gradients[index];
      contactSection.style.transition = 'background 8s ease-in-out';
    }, 8000);
  }
};

animateGradient();

// ============ PAGE LOAD ANIMATION ============
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// Set initial opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';
