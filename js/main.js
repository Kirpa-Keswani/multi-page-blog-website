/* =====================================================
   MyBlog - main.js (shared by all three pages)
   Each block below does one small job and is safe to run
   on any page: if an element is missing, it is skipped.
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* 1. Current year in the footer */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* 2. Mobile menu (hamburger) */
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* 3. Scroll effects: header shrink, progress bar, back-to-top button */
  var header = document.getElementById('siteHeader');
  var progress = document.getElementById('scrollProgress');
  var toTop = document.getElementById('toTop');

  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (progress && max > 0) progress.style.transform = 'scaleX(' + (y / max) + ')';
    if (toTop) toTop.classList.toggle('show', y > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* 4. Scroll reveal: elements with class "reveal" fade in when seen */
  var reveals = document.querySelectorAll('.reveal');
  reveals.forEach(function (el) {
    var siblings = Array.prototype.filter.call(el.parentElement.children, function (c) {
      return c.classList.contains('reveal');
    });
    el.style.transitionDelay = (siblings.indexOf(el) % 4) * 0.12 + 's';
  });

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* 5. Number counters on the home page */
  var counters = document.querySelectorAll('[data-count]');
  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
    });
  }

  /* 6. Blog filter buttons */
  var filters = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('#posts .card');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var category = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      cards.forEach(function (card) {
        var show = category === 'all' || card.getAttribute('data-category') === category;
        card.classList.toggle('hide', !show);
        card.classList.remove('pop');
        if (show) {
          card.classList.add('visible');
          void card.offsetWidth; /* restart the animation */
          card.classList.add('pop');
        }
      });
    });
  });

  /* 7. Contact form validation (demo only: nothing is sent) */
  var form = document.getElementById('contactForm');
  if (form) {
    var success = document.getElementById('formSuccess');
    var rules = {
      name: function (v) { return v.trim().length >= 2; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      message: function (v) { return v.trim().length >= 10; }
    };

    function check(input) {
      var ok = rules[input.name](input.value);
      input.parentElement.classList.toggle('error', !ok);
      return ok;
    }

    form.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('blur', function () { if (input.value) check(input); });
      input.addEventListener('input', function () {
        if (input.parentElement.classList.contains('error')) check(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allOk = true;
      form.querySelectorAll('input, textarea').forEach(function (input) {
        if (!check(input)) allOk = false;
      });
      if (allOk) {
        success.classList.add('show');
        form.reset();
        setTimeout(function () { success.classList.remove('show'); }, 6000);
      }
    });
  }
});
