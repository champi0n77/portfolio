/* Client-side validation only: no message is sent or stored. */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('contact-success');
  const fields = [
    { input: document.getElementById('full-name'), error: document.getElementById('name-error'), validate: value => value ? '' : 'Please enter your full name.' },
    { input: document.getElementById('email'), error: document.getElementById('email-error'), validate: value => !value ? 'Please enter your email address.' : (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address.') },
    { input: document.getElementById('phone'), error: document.getElementById('phone-error'), validate: value => !value.trim() ? 'Please enter your phone number.' : (/^\d+$/.test(value) ? '' : 'Use digits only for your phone number.') },
    { input: document.getElementById('message'), error: document.getElementById('message-error'), validate: value => value ? '' : 'Please enter a message.' }
  ];

  function validateField(field) {
    const value = field.input.id === 'phone' ? field.input.value : field.input.value.trim();
    const message = field.validate(value);
    field.error.textContent = message;
    field.input.setAttribute('aria-invalid', message ? 'true' : 'false');
    return !message;
  }

  fields.forEach(field => field.input.addEventListener('input', () => {
    success.hidden = true;
    if (field.input.getAttribute('aria-invalid') === 'true') validateField(field);
  }));

  form.addEventListener('submit', event => {
    event.preventDefault();
    success.hidden = true;
    const results = fields.map(validateField);
    const firstInvalid = results.indexOf(false);
    if (firstInvalid !== -1) { fields[firstInvalid].input.focus(); return; }
    success.textContent = 'Your details passed validation. This demo does not send or store your message.';
    success.hidden = false;
  });
});
