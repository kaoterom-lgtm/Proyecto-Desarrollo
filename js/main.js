document.addEventListener('DOMContentLoaded', async () => {
  // Proteger acceso: requiere login
  if (sessionStorage.getItem('loggedIn') !== 'true') {
    if (!location.pathname.endsWith('login.html')) {
      location.href = 'login.html';
      return;
    }
  }

  const productsGrid = document.getElementById('productsGrid');
  const template = document.getElementById('product-template');
  let allProducts = [];

  // Carrito con localStorage
  function getCart(){ return JSON.parse(localStorage.getItem('cart') || '[]'); }
  function saveCart(cart){ localStorage.setItem('cart', JSON.stringify(cart)); }
  function updateCartBadge(){
    const badge = document.getElementById('cartCount');
    if (badge) badge.textContent = getCart().length;
  }

  // Renderizar productos
  function renderProducts(category = "Todos") {
    productsGrid.innerHTML = "";
    const filtered = category === "Todos" ? allProducts : allProducts.filter(p => p.category === category);

    if (filtered.length === 0) {
      productsGrid.innerHTML = `<p>No hay productos en esta categoría.</p>`;
      return;
    }

    filtered.forEach(prod => {
      const clone = template.content.cloneNode(true);
      clone.querySelector('.product-img').src = prod.img;
      clone.querySelector('.product-img').alt = prod.name;
      clone.querySelector('.product-name').textContent = prod.name;
      clone.querySelector('.product-desc').textContent = prod.description;
      clone.querySelector('.product-price').textContent = `$ ${prod.price.toFixed(2)}`;

      clone.querySelector('.buy-btn').addEventListener('click', () => {
        const cart = getCart();
        cart.push({ name: prod.name, price: prod.price });
        saveCart(cart);
        updateCartBadge();
        alert(`Se agregó al carrito: ${prod.name}`);
      });

      productsGrid.appendChild(clone);
    });
  }

  try {
    const res = await fetch('data/products.json');
    if (!res.ok) throw new Error("Error cargando productos");
    allProducts = await res.json();
    renderProducts("Todos");
    updateCartBadge();
  } catch (err) {
    console.error(err);
    productsGrid.innerHTML = `<p class="error">No se pudieron cargar los productos.</p>`;
  }

  // Detectar clics en sidebar
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-category]')) {
      e.preventDefault();
      const cat = e.target.getAttribute('data-category');
      renderProducts(cat);

      // Scroll suave al catálogo
      const catalogo = document.getElementById('productos');
      if (catalogo) {
        catalogo.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  // 🔹 Botón de cerrar sesión
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      const confirmar = confirm("¿Quieres cerrar sesión?");
      if (confirmar) {
        sessionStorage.removeItem('loggedIn');
        window.location.href = "login.html";
      }
    });
  }
});
