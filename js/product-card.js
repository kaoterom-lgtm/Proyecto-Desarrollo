// Web Component <product-card>
class ProductCard extends HTMLElement {
  static get observedAttributes(){ return ['name','price','desc','img']; }

  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.shadowRoot.innerHTML = `
      <style>
        :host{display:block; font-family:inherit}
        .card{background:white; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.06); overflow:hidden; display:flex; flex-direction:column}
        img{width:100%; height:140px; object-fit:cover}
        .body{padding:0.7rem; display:flex; flex-direction:column; gap:0.4rem}
        h4{margin:0; font-size:1rem}
        p{margin:0; color:#666; font-size:0.9rem}
        .meta{display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem}
        button{padding:0.4rem 0.6rem; border-radius:8px; border:none; cursor:pointer; background:#0066cc; color:white}
      </style>
      <article class="card">
        <img id="img" src="" alt="Producto">
        <div class="body">
          <h4 id="name"></h4>
          <p id="desc"></p>
          <div class="meta">
            <strong id="price"></strong>
            <button id="add">Agregar</button>
          </div>
        </div>
      </article>
    `;
  }

  connectedCallback(){
    this._upgradeProps();
    this._render();
    this.shadowRoot.getElementById('add').addEventListener('click', () => {
      const detail = { name: this.getAttribute('name'), price: this.getAttribute('price') };
      this.dispatchEvent(new CustomEvent('add-to-cart', { detail, bubbles:true, composed:true }));
      alert(`Añadido: ${detail.name} — ${detail.price}`);
    });
  }

  attributeChangedCallback(){ this._render(); }

  _upgradeProps(){
    // Mueva cualquier propiedad establecida antes de la definición a atributos
    ['name','price','desc','img'].forEach(prop => {
      if (this.hasOwnProperty(prop)) {
        const val = this[prop];
        delete this[prop];
        this.setAttribute(prop, val);
      }
    });
  }

  _render(){
    const name = this.getAttribute('name') || '';
    const price = this.getAttribute('price') || '';
    const desc = this.getAttribute('desc') || '';
    const img = this.getAttribute('img') || 'assets/images/freno.jpg';
    this.shadowRoot.getElementById('name').textContent = name;
    this.shadowRoot.getElementById('price').textContent = price;
    this.shadowRoot.getElementById('desc').textContent = desc;
    const imgEl = this.shadowRoot.getElementById('img');
    imgEl.src = img;
    imgEl.alt = name;
  }
}

customElements.define('product-card', ProductCard);
