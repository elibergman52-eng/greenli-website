/* greenLi — central form delivery.
 *
 * Every form on the site (contact, extraction simulation, newsletter signups)
 * POSTs its data as JSON to a single n8n webhook. The webhook workflow emails
 * the submission to the team, so the recipient address lives in ONE place (the
 * n8n "Send Email" node) and can be changed there without touching the site.
 *
 * The endpoint below is the n8n production webhook URL. Update it if the
 * workflow path or n8n instance ever changes.
 */
(function () {
  var GREENLI_WEBHOOK = 'https://elib.app.n8n.cloud/webhook/greenli-forms';

  function post(payload) {
    try {
      return fetch(GREENLI_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true            // let it complete even as the UI swaps to success
      }).catch(function () {});
    } catch (e) { /* never block the success UX on a delivery hiccup */ }
  }

  // Collect name/id -> value for every field in a form (skip file inputs/buttons).
  function serialize(form) {
    var out = {};
    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      if (el.type === 'file' || el.type === 'submit' || el.type === 'button') {
        if (el.type === 'file' && el.files && el.files.length) out.attachment = el.files[0].name;
        return;
      }
      var key = el.name || el.id;
      if (!key) return;
      var v = (el.value || '').trim();
      if (v) out[key] = v;
    });
    return out;
  }

  // Capture phase so we read the values before any inline handler clears the UI.
  document.addEventListener('submit', function (ev) {
    var form = ev.target;
    if (!(form instanceof HTMLFormElement)) return;

    if (form.id === 'contact-form-el') {
      var type = /contact-simulation/.test(location.pathname) ? 'extraction_simulation' : 'contact';
      post(Object.assign({ formType: type, sourceUrl: location.href }, serialize(form)));
      return;
    }
    // Any other form that carries an email field is treated as a newsletter signup.
    var email = form.querySelector('input[type="email"]');
    if (form.id === 'newsletter-form' || email) {
      post({ formType: 'newsletter', email: email ? email.value.trim() : '', sourceUrl: location.href });
    }
  }, true);

  // Footer newsletter widgets that use a button (no <form>): index / mle / technology.
  function wireButtonNewsletters() {
    document.querySelectorAll('#footer-nl-wrap').forEach(function (w) {
      var btn = w.querySelector('button');
      var email = w.querySelector('input[type="email"]');
      if (!btn || !email) return;
      btn.addEventListener('click', function () {
        if (email.value.trim()) post({ formType: 'newsletter', email: email.value.trim(), sourceUrl: location.href });
      }, true);
    });
  }

  if (document.readyState !== 'loading') wireButtonNewsletters();
  else document.addEventListener('DOMContentLoaded', wireButtonNewsletters);
})();
