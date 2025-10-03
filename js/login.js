// Login simple (educativo). Credenciales "quemadas".
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const errEl = document.getElementById('loginError');

  const CREDENTIALS = { user: 'estudiante', pass: 'contraseña123' };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = form.username.value.trim();
    const password = form.password.value.trim();

    if (username === CREDENTIALS.user && password === CREDENTIALS.pass) {
      // Guardamos un flag sencillo en sessionStorage (no seguro, solo demo)
      sessionStorage.setItem('loggedIn', 'true');
      window.location.href = 'index.html';
    } else {
      errEl.style.display = 'block';
      errEl.textContent = 'Usuario o contraseña incorrectos.';
      setTimeout(() => { errEl.style.display = 'none'; }, 3500);
    }
  });

  // Si ya está logueado, redirige directamente
  if (sessionStorage.getItem('loggedIn') === 'true' && location.pathname.endsWith('login.html')) {
    location.href = 'index.html';
  }
});
