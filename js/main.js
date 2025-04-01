/**
 * Portfolio Website - JavaScript Functions
 * Author: Vishnu Vardhan Putta
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS with much faster animations
  AOS.init({
    duration: 400, // Faster animations
    easing: 'ease-out',
    once: true, // Only animate once for better performance
    mirror: false,
    disable: 'mobile', // Disable on mobile for better performance
  });

  // Initialize all functionality
  initMobileNav();
  initHeaderScrollEffect();
  initBackToTopButton();
  initScrollSpy();
  initThemeToggle();
  initProjectFilters();
  initOptimizedParticles();
  initEqualHeights();
});

/**
 * Mobile Navigation Functionality
 */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  // Toggle mobile menu when hamburger is clicked
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');

    // Add/remove body scroll lock
    document.body.style.overflow = navLinks.classList.contains('active')
      ? 'hidden'
      : '';
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('active') &&
      !e.target.closest('.nav-links') &&
      !e.target.closest('.hamburger')
    ) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Header Scroll Effect
 */
function initHeaderScrollEffect() {
  const header = document.getElementById('header');

  if (!header) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      header.style.padding = '0.625rem 0';
      header.style.boxShadow = '0 0.25rem 1.25rem rgba(0, 0, 0, 0.2)';
    } else {
      header.classList.remove('scrolled');
      header.style.padding = '1rem 0';
      header.style.boxShadow = 'none';
    }
  });
}

/**
 * Back to Top Button
 */
function initBackToTopButton() {
  const backToTopButton = document.getElementById('backToTop');

  if (!backToTopButton) return;

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    backToTopButton.classList.toggle('visible', window.scrollY > 500);
  });

  // Scroll to top when button is clicked
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

/**
 * Scroll Spy - Using highlight effect
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (sections.length === 0 || navLinks.length === 0) return;

  // Handle scroll event
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100; // Offset for header

    // Find current section
    let currentActive = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentActive = section.getAttribute('id');
      }
    });

    // Update active classes - simpler approach
    navLinks.forEach((link) => {
      // Only add active to the current section link
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${currentActive}`
      );
    });
  });
}

/**
 * Theme Toggle
 */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const darkIcon = document.getElementById('darkIcon');
  const lightIcon = document.getElementById('lightIcon');

  if (!themeToggle || !darkIcon || !lightIcon) return;

  // Check system preference or local storage
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('theme');

  // Set theme based on stored preference or system preference
  if (storedTheme === 'light') {
    document.body.classList.add('light-mode');
  } else if (storedTheme === 'dark') {
    document.body.classList.remove('light-mode');
  } else if (prefersDarkMode) {
    document.body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
  }

  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem(
      'theme',
      document.body.classList.contains('light-mode') ? 'light' : 'dark'
    );
  });
}

/**
 * Theme Toggle
 */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const darkIcon = document.getElementById('darkIcon');
  const lightIcon = document.getElementById('lightIcon');

  if (!themeToggle || !darkIcon || !lightIcon) return;

  // Check stored theme first (user preference takes priority)
  const storedTheme = localStorage.getItem('theme');

  // Then check system preference
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply the appropriate theme
  if (storedTheme === 'light') {
    // User explicitly chose light mode
    document.body.classList.add('light-mode');
  } else if (storedTheme === 'dark') {
    // User explicitly chose dark mode
    document.body.classList.remove('light-mode');
  } else {
    // No stored preference, use system preference
    if (prefersDarkMode) {
      document.body.classList.remove('light-mode');
      // Don't store theme when using system preference
    } else {
      document.body.classList.add('light-mode');
      // Don't store theme when using system preference
    }
  }

  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const newTheme = document.body.classList.contains('light-mode')
      ? 'light'
      : 'dark';
    localStorage.setItem('theme', newTheme);
  });

  // Add event listener for system preference changes
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      // Only apply system preference if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        document.body.classList.toggle('light-mode', !e.matches);
      }
    });
}

/**
 * Performance-optimized particle system
 */
function initOptimizedParticles() {
  const particlesContainer = document.getElementById('particles-container');

  if (!particlesContainer) return;

  // Create fewer particles for better performance
  const particleCount = window.innerWidth > 768 ? 50 : 30;

  for (let i = 0; i < particleCount; i++) {
    createOptimizedParticle(particlesContainer);
  }

  // Pause animations when tab is not visible
  document.addEventListener('visibilitychange', () => {
    const particles = document.querySelectorAll('.particle');
    if (document.hidden) {
      particles.forEach((p) => (p.style.animationPlayState = 'paused'));
    } else {
      particles.forEach((p) => (p.style.animationPlayState = 'running'));
    }
  });
}

/**
 * Create a single optimized particle
 */
function createOptimizedParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';

  // Random properties but fewer variations for better performance
  const size = Math.random() * 4 + 2;
  // Limit positions to stay within boundaries
  const posX = Math.random() * 95;
  const posY = Math.random() * 95;
  const duration = Math.random() * 20 + 10; // Faster animations

  // Set styles directly for better performance
  particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${posX}%;
        top: ${posY}%;
        animation-duration: ${duration}s;
        background-color: var(--${
          Math.random() > 0.5 ? 'primary' : 'secondary'
        });
        opacity: ${Math.random() * 0.2 + 0.1};
    `;

  // Add to container
  container.appendChild(particle);

  // Recycle particles less frequently for better performance
  setTimeout(() => {
    if (particle.parentNode) {
      particle.remove();
      // Only create a new particle if user is actively viewing the page
      if (!document.hidden) {
        createOptimizedParticle(container);
      }
    }
  }, duration * 1000);
}

/**
 * Equal Heights for cards
 */
function initEqualHeights() {
  // Wait for images to load for accurate heights
  window.addEventListener('load', () => {
    equalizeHeights('.project-description-container');
    equalizeHeights('.skill-content');

    // Also equalize on window resize
    window.addEventListener(
      'resize',
      debounce(() => {
        equalizeHeights('.project-description-container', true);
        equalizeHeights('.skill-content', true);
      }, 200)
    );
  });
}

/**
 * Equalize heights of elements
 */
function equalizeHeights(selector, reset = false) {
  const elements = document.querySelectorAll(selector);
  if (elements.length <= 1) return;

  // Reset heights if needed
  if (reset) {
    elements.forEach((el) => (el.style.height = 'auto'));
  }

  // Skip on mobile devices
  if (window.innerWidth < 768) return;

  // Get max height and apply to all
  let maxHeight = 0;
  elements.forEach((el) => {
    maxHeight = Math.max(maxHeight, el.offsetHeight);
  });

  elements.forEach((el) => {
    el.style.height = `${maxHeight}px`;
  });
}

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

/**
 * Handle page load events
 */
window.addEventListener('load', function () {
  // Hide loading screen
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('loader-hidden');
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 1000);
  }

  // Force recalculation of element heights after page is fully loaded
  setTimeout(() => {
    equalizeHeights('.project-description-container', true);
    equalizeHeights('.skill-content', true);

    // Refresh AOS animations
    AOS.refresh();
  }, 100);
});
