/* ── Sticky Navbar ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('pinned', window.scrollY > 60);
});

/* ── Service chip toggle ── */
function toggleChip(el) {
  el.classList.toggle('active');
}

/* ── FAQ accordion ── */
function toggleFaq(btn) {
  const body = btn.nextElementSibling;
  const isOpen = body.classList.contains('open');

  document.querySelectorAll('.faq-body').forEach(b => b.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(b => b.classList.remove('open'));

  if (!isOpen) {
    body.classList.add('open');
    btn.classList.add('open');
  }
}

/* ── Form submit ── */
function submitForm() {
  const firstName = document.getElementById('f-name').value.trim();
  const lastName  = document.querySelector('input[placeholder="Doe"]').value.trim();
  const email     = document.getElementById('f-email').value.trim();
  const phone     = document.querySelector('input[placeholder="+1 (555) 000-0000"]').value.trim();
  const subject   = document.getElementById('f-subject').value.trim();
  const msg       = document.getElementById('f-msg').value.trim();

  // Get selected services
  const selectedServices = Array.from(document.querySelectorAll('.s-chip.active'))
    .map(chip => chip.textContent)
    .join(', ');

  if (!firstName || !email || !subject || !msg) {
    alert('Please fill in all required fields.');
    return;
  }

  // Prepare email parameters
  const templateParams = {
    to_email: 'faizanmatee@gmail.com',
    from_name: firstName + ' ' + lastName,
    from_email: email,
    phone: phone || 'Not provided',
    subject: subject,
    services: selectedServices || 'Not specified',
    message: msg
  };

  // Send email using EmailJS
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
    .then(function(response) {
      console.log('Email sent successfully!', response.status, response.text);
      
      const toast = document.getElementById('formToast');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 5000);

      // Clear form
      document.getElementById('f-name').value    = '';
      document.querySelector('input[placeholder="Doe"]').value = '';
      document.getElementById('f-email').value   = '';
      document.querySelector('input[placeholder="+1 (555) 000-0000"]').value = '';
      document.getElementById('f-subject').value = '';
      document.getElementById('f-msg').value     = '';
      document.querySelectorAll('.s-chip').forEach(c => c.classList.remove('active'));
    }, function(error) {
      console.log('Failed to send email:', error);
      alert('Failed to send message. Please try again.');
    });
}
