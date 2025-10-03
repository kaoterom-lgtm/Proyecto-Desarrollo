// Carga fragmentos HTML declarados en data-fragment
document.addEventListener('DOMContentLoaded', () => {
  const fragments = document.querySelectorAll('[data-fragment]');
  fragments.forEach(async (el) => {
    const url = el.getAttribute('data-fragment');
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('No se pudo cargar fragmento: ' + url);
      const html = await res.text();
      el.innerHTML = html;
    } catch (err) {
      console.error(err);
      el.innerHTML = `<div class="card">Error cargando componente: ${url}</div>`;
    }
  });
});
