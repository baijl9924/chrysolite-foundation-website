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
     Two modes, chosen automatically:

       (a) FORM_ENDPOINT is set -> the form is POSTed there and the visitor
           stays on the page. Use this once a form service is connected:
           Formspree, Netlify Forms, Basin, or your own handler.
           See README.md -> "Connecting the forms".

       (b) FORM_ENDPOINT is empty -> the form is handed to the visitor's own
           email app as a pre-filled message addressed to FALLBACK_EMAIL.
           Nothing is lost and nothing is sent anywhere behind the visitor's
           back, but they do have to press send.

     The endpoint below is a Formspree form. Note it is SHARED with the
     Rapha Ministries site, so every submission carries a `_subject` prefixed
     with the foundation's name and a `_page` field naming the exact page —
     that is how the two sites' enquiries stay tellable apart in the inbox.
     If Chrysolite ever gets its own Formspree form, swap the URL here only. */
  var FORM_ENDPOINT = 'https://formspree.io/f/xoejlrwr';
  var FALLBACK_EMAIL = 'connect@chrysolite-foundation.org';

  function fieldLabel(form, name) {
    var el = form.elements[name];
    if (el && el.labels && el.labels.length) {
      return el.labels[0].textContent.replace(/\s+/g, ' ').trim();
    }
    return name;
  }

  Array.prototype.forEach.call(document.querySelectorAll('form[data-demo-form]'), function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');

      function show(message, isError) {
        if (!status) return;
        status.textContent = message;
        status.style.display = 'block';
        if (isError) status.classList.add('is-error');
        else status.classList.remove('is-error');
      }

      if (FORM_ENDPOINT) {
        show('Sending\u2026');
        /* Send FormData so file inputs and every field type survive, but add
           two identifying fields first. The endpoint is shared with another
           site, so without these the inbox could not tell which foundation an
           enquiry came from or which of the four forms it was submitted on. */
        var payload = new FormData(form);
        payload.append('_subject', '[Chrysolite] ' + (form.dataset.formName || 'Enquiry'));
        payload.append('_page', window.location.href);
        fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: payload
        }).then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          show(form.dataset.successMessage || 'Thank you \u2014 your message has been received.');
          form.reset();
        }).catch(function () {
          show('Sorry \u2014 that did not send. Please email ' + FALLBACK_EMAIL +
               ' directly and we will pick it up.', true);
        });
        return;
      }

      /* No endpoint configured: hand the enquiry to the visitor's mail app.
         This clicks a temporary anchor rather than assigning window.location:
         if the visitor has no mail app registered, assigning location can leave
         them staring at a blank page, whereas a protocol-handler click on an
         anchor simply does nothing and the message below still explains the
         fallback. */
      var lines = [];
      new FormData(form).forEach(function (value, name) {
        if (String(value).trim()) lines.push(fieldLabel(form, name) + ': ' + value);
      });
      var mailto = 'mailto:' + FALLBACK_EMAIL +
        '?subject=' + encodeURIComponent('[Website] ' + (form.dataset.formName || 'Enquiry')) +
        '&body=' + encodeURIComponent(lines.join('\n'));
      var handoff = document.createElement('a');
      handoff.href = mailto;
      handoff.style.display = 'none';
      document.body.appendChild(handoff);
      handoff.click();
      document.body.removeChild(handoff);
      show('Your email app is opening with this message ready to send \u2014 press send to deliver it. ' +
           'If nothing opened, email ' + FALLBACK_EMAIL + ' directly.');
    });
  });

  /* ---------- 3. Draft notes ----------
     The notes addressed to whoever maintains the site are hidden by default
     so the site can go live exactly as it stands. Append ?draft=1 to any
     page URL to reveal them again while you are still filling things in. */
  if (/[?&]draft=1(&|$)/.test(window.location.search)) {
    document.body.classList.add('is-draft');
  }

  /* ---------- 4. Current year in footer ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- 5. Anchor offset for the fixed header ---------- */
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
