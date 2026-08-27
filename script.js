/* ═══════════════════════════════════════════════════════
   SMARTDEPT — Landing Page Scripts
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Navbar Scroll Effect ───
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ─── Mobile Toggle ───
  const toggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggle) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // ─── Reveal on Scroll ───
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children slightly
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach((el, i) => {
    // Add stagger to sibling reveals
    const parent = el.parentElement;
    const siblings = parent ? parent.querySelectorAll(':scope > .reveal') : [];
    if (siblings.length > 1) {
      const idx = Array.from(siblings).indexOf(el);
      el.dataset.delay = idx * 80;
    }
    revealObserver.observe(el);
  });

  // ─── Counter Animation ───
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * ease);
      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  // ─── Pipeline Scroll Fill ───
  const pipelineSection = document.querySelector('.section-workflow');
  const pipelineFill = document.getElementById('pipeline-fill');
  const pipelineStages = document.querySelectorAll('.pipeline-stage');

  if (pipelineSection && pipelineFill) {
    const pipelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', updatePipeline, { passive: true });
          updatePipeline();
        } else {
          window.removeEventListener('scroll', updatePipeline);
        }
      });
    }, { threshold: 0 });

    pipelineObserver.observe(pipelineSection);

    function updatePipeline() {
      const rect = pipelineSection.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportCenter = window.innerHeight / 2;
      const scrolled = viewportCenter - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));

      pipelineFill.style.height = (progress * 100) + '%';

      // Activate stages
      pipelineStages.forEach((stage, i) => {
        const stageProgress = (i + 1) / pipelineStages.length;
        if (progress >= stageProgress * 0.7) {
          stage.classList.add('active');
        } else {
          stage.classList.remove('active');
        }
      });
    }
  }

  // ─── Smooth Scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if open
        navLinks.classList.remove('active');
      }
    });
  });

  // ─── Parallax-lite for security badges ───
  const secBadges = document.querySelectorAll('.sec-badge');
  if (secBadges.length) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          secBadges.forEach((badge, i) => {
            const speed = (i % 2 === 0) ? 0.02 : -0.015;
            badge.style.transform = `translateY(${scrollY * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

});
