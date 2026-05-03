/* ========================================
   CCC - Cargo & Container Carriers
   Complete JavaScript
   ======================================== */

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', function() {
  lucide.createIcons();
  
  // Initialize all components
  initHeader();
  initMobileMenu();
  initScrollToTop();
  initSmoothScroll();
  initScrollAnimations();
  initNewsletterForm();
  initStatsCounter();
});

/* ========================================
   Header Scroll Effect
   ======================================== */
function initHeader() {
  const header = document.getElementById('header');
  
  function updateHeader() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', updateHeader);
  updateHeader(); // Initial check
}

/* ========================================
   Mobile Menu Toggle
   ======================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  
  let isOpen = false;
  
  menuBtn.addEventListener('click', function() {
    isOpen = !isOpen;
    
    if (isOpen) {
      mobileMenu.classList.add('active');
      menuIcon.setAttribute('data-lucide', 'x');
    } else {
      mobileMenu.classList.remove('active');
      menuIcon.setAttribute('data-lucide', 'menu');
    }
    
    lucide.createIcons();
  });
  
  // Close menu when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      isOpen = false;
      mobileMenu.classList.remove('active');
      menuIcon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (isOpen && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      isOpen = false;
      mobileMenu.classList.remove('active');
      menuIcon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    }
  });
}

/* ========================================
   Scroll to Top Button
   ======================================== */
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTop');
  
  function updateScrollButton() {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }
  
  window.addEventListener('scroll', updateScrollButton);
  
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ========================================
   Smooth Scroll for Anchor Links
   ======================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      
      if (target) {
        e.preventDefault();
        
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ========================================
   Scroll Animations (Intersection Observer)
   ======================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-fade-up');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

/* ========================================
   Newsletter Form
   ======================================== */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const input = form.querySelector('input[type="email"]');
      const email = input.value;
      
      if (email) {
        // Show success message (you can customize this)
        alert('Thank you for subscribing! We will keep you updated.');
        input.value = '';
      }
    });
  }
}
emailjs.init("YOUR_PUBLIC_KEY");

const form = document.getElementById("newsletterForm");
const emailInput = document.getElementById("newsletterEmail");
const messageBox = document.getElementById("newsletterMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    messageBox.textContent = "Please enter a valid email address.";
    messageBox.className = "newsletter-message error";
    return;
  }

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    user_email: email
  }).then(() => {
    messageBox.textContent = "✅ Thank you! Newsletter subscription successful.";
    messageBox.className = "newsletter-message success";
    emailInput.value = "";
  }).catch(() => {
    messageBox.textContent = "❌ Something went wrong. Please try again.";
    messageBox.className = "newsletter-message error";
  });
});


/* ========================================
   Stats Counter Animation
   ======================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const countTo = parseInt(el.getAttribute('data-count'));
        
        if (countTo) {
          animateCounter(el, countTo);
        }
        
        observer.unobserve(el);
      }
    });
  }, observerOptions);
  
  statNumbers.forEach(el => {
    observer.observe(el);
  });
}

function animateCounter(element, target) {
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();
  const suffix = element.textContent.includes('%') ? '%' : '+';
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (target - start) * easeOutQuart);
    
    element.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}



/* ========================================
   Additional Utility Functions
   ======================================== */

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Parallax effect (optional - can be added to background elements)
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  window.addEventListener('scroll', throttle(() => {
    parallaxElements.forEach(el => {
      const speed = el.getAttribute('data-parallax') || 0.5;
      const yPos = -(window.pageYOffset * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  }, 16));
}

// Lazy loading images (modern browsers have native support)
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Active navigation link highlighting
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', throttle(() => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, 100));
}
// Initialize optional features
document.addEventListener('DOMContentLoaded', function() {
  // Uncomment to enable optional features
  // initParallax();
  // initLazyLoading();
  initActiveNavHighlight();
});