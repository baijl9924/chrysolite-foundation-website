/* ==========================================================================
   Chrysolite Empowerment and Education Foundation
   Site behaviour — vanilla JS, no build step.
   Loaded after the template's own scripts.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 1. Donation amount chips ---------- */
  var chips = document.querySelectorAll('.amount-chip[data-amount]');
  var donateLink = document.getElementById('donateLink');
  var customInput = document.getElementById('donateCustom');

  function setAmount(amount) {
    if (!donateLink) return;
    var base = donateLink.dataset.base || donateLink.getAttribute('href').split('?')[0];
    donateLink.dataset.base = base;
    donateLink.setAttribute('href', base + '?amount=' + encodeURIComponent(amount) + '&currency=NGN');
    var label = donateLink.querySelector('[data-donate-label]');
    if (label) label.textContent = 'Donate \u20A6' + Number(amount).toLocaleString('en-NG');
  }

  if (chips.length) {
    Array.prototype.forEach.call(chips, function (chip) {
      chip.addEventListener('click', function () {
        Array.prototype.forEach.call(chips, function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        if (customInput) customInput.value = '';
        setAmount(chip.dataset.amount);
      });
    });
    var active = document.querySelector('.amount-chip.is-active[data-amount]');
    if (active) setAmount(active.dataset.amount);
  }

  if (customInput) {
    customInput.addEventListener('input', function () {
      var v = parseInt(customInput.value, 10);
      if (v > 0) {
        Array.prototype.forEach.call(chips, function (c) { c.classList.remove('is-active'); });
        setAmount(v);
      }
    });
  }

  /* ---------- 2. Forms ----------
     These forms are front-end only — they do NOT send anywhere yet.
     See README.md → "Connecting the forms" to wire them up
     (Formspree / Netlify Forms / your own endpoint / a Google Form). */
  Array.prototype.forEach.call(document.querySelectorAll('form[data-demo-form]'), function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      if (status) {
        status.textContent = form.dataset.successMessage ||
          'Thank you — your message has been received.';
        status.style.display = 'block';
      }
      form.reset();
    });
  });

  /* ---------- 3. Current year in footer ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- 4. Anchor offset for the fixed header ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), function (a) {
    var href = a.getAttribute('href');
    if (!href || href === '#') return;
    a.addEventListener('click', function (e) {
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: top, behavior: 'smooth' });
      if (history.replaceState) history.replaceState(null, '', href);
    });
  });
})();
