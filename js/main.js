// ===========================================
// 1. Web Component: <product-card> con Shadow DOM [cite: 35, 37]
// ===========================================
class ProductCard extends HTMLElement {
    constructor() {
        super();
        // Usar Shadow DOM para encapsular la estructura y estilos 
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Obtener atributos [cite: 36]
        const nombre = this.getAttribute('nombre') || 'Producto Desconocido';
        const precio = this.getAttribute('precio') || '0.00';
        const descripcion = this.getAttribute('descripcion') || '';
        const imagen = this.getAttribute('imagen') || '';

        this.shadowRoot.innerHTML = `
            <style>
                /* Estilos encapsulados dentro del Shadow DOM */
                .card {
                    border: 1px solid #ddd;
                    padding: 15px;
                    text-align: center;
                    box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
                    transition: transform 0.3s;
                    background-color: #fff;
                }
                .card:hover {
                    transform: translateY(-5px);
                }
                .card img {
                    max-width: 100%;
                    height: auto;
                }
                .card h3 {
                    color: #A52A2A; /* Color de joyería (ejemplo) */
                    margin: 10px 0;
                }
                .card p.price {
                    font-weight: bold;
                    color: #DAA520; /* Dorado */
                }
            </style>
            <div class="card">
                <img src="./img/${imagen}" alt="${nombre}">
                <h3>${nombre}</h3>
                <p>${descripcion}</p>
                <p class="price">$${parseFloat(precio).toFixed(2)}</p>
                <button>Comprar</button>
            </div>
        `;
    }
}

// Definir el Web Component personalizado [cite: 35]
customElements.define('product-card', ProductCard);


// ===========================================
// 2. Lógica de Carga de Fragmentos HTML (Header, Footer, Sidebar) [cite: 22]
// ===========================================

/**
 * Carga un fragmento HTML de forma dinámica.
 * @param {string} url - Ruta del fragmento.
 * @param {string} containerId - ID del contenedor donde se insertará.
 */
async function loadFragment(url, containerId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al cargar el fragmento: ${response.statusText}`);
        }
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error('Error cargando fragmento:', error);
    }
}

// Cargar todos los fragmentos
loadFragment('./components/header.html', 'header-container');
loadFragment('./components/footer.html', 'footer-container');
loadFragment('./components/sidebar.html', 'sidebar-container');


// ===========================================
// 3. Renderización de Productos (Fetch + Plantillas + Web Component) [cite: 33]
// ===========================================

async function renderProducts() {
    const container = document.getElementById('product-list-container');
    const template = document.getElementById('product-template');

    // Cargar productos usando la API Fetch [cite: 33]
    try {
        const response = await fetch('./data/productos.json');
        const products = await response.json();

        products.forEach((product, index) => {
            // Requisito: Usar <product-card> para parte de la renderización [cite: 38]
            if (index % 2 === 0) { // Usamos el Web Component para los productos pares
                const card = document.createElement('product-card');
                card.setAttribute('nombre', product.nombre);
                card.setAttribute('precio', product.precio);
                card.setAttribute('descripcion', product.descripcion);
                card.setAttribute('imagen', product.imagen);
                container.appendChild(card);
            } else { // Usamos la plantilla <template> para los productos impares [cite: 29]
                // 1. Clonar la plantilla [cite: 29]
                const clone = template.content.cloneNode(true);
                
                // 2. Rellenar datos
                clone.querySelector('.product-image').src = `./img/${product.imagen}`;
                clone.querySelector('.product-image').alt = product.nombre;
                clone.querySelector('.product-name').textContent = product.nombre;
                clone.querySelector('.product-description').textContent = product.descripcion;
                clone.querySelector('.product-price').textContent = `$${product.precio.toFixed(2)}`;
                
                // 3. Insertar en el contenedor
                container.appendChild(clone);
            }
        });

    } catch (error) {
        console.error('Error cargando o renderizando productos:', error);
        container.innerHTML = '<p class="error-message">No se pudieron cargar los productos.</p>';
    }
}

document.addEventListener('DOMContentLoaded', renderProducts);