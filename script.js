// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  initNavigation();
  initSmoothScrolling();
  initAnimations();
  initMobileMenu();
  initScrollEffects();
});

// Navigation functionality
function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      e.preventDefault();

      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Intersection Observer for animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    ".feature-card, .screenshot"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    document.addEventListener("click", function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }
    });
  }
}

// Scroll effects - active nav link
function initScrollEffects() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener("scroll", function () {
    let current = "";
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Image loading
function initImageLoading() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.classList.add("loaded");
    });

    if (img.complete) {
      img.classList.add("loaded");
    }
  });
}

initImageLoading();

// Scroll styling for navbar (heart-icon theme)
const additionalStyles = `
  .navbar.scrolled {
    background: linear-gradient(135deg, rgba(26, 10, 46, 0.98) 0%, rgba(45, 27, 78, 0.95) 50%, rgba(91, 33, 182, 0.92) 100%);
    box-shadow: 0 4px 30px rgba(124, 58, 237, 0.35), 0 0 20px rgba(233, 30, 140, 0.15);
  }

  .nav-menu.active {
    display: flex;
  }

  img {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  img.loaded {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .nav-menu {
      display: none;
    }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Keyboard: Escape closes mobile menu
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const navMenu = document.querySelector(".nav-menu");
    const navToggle = document.querySelector(".nav-toggle");

    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
  }
});

// Image error handling
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("error", function () {
      this.style.display = "none";
      console.warn("Failed to load image:", this.src);
    });
  });
});
