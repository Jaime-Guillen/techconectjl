/**
 * TechConectJL — Carrito con Imágenes (Responsive Mobile v3)
 * <script src="js/carrito.js"></script> antes del </body>
 */

// ===================== ESTILOS =====================
(function injectStyles() {
  const css = `
    #tc-toast {
      position: fixed;
      bottom: 20px;
      right: 16px;
      left: 16px;
      z-index: 9999;
      background: #111;
      color: #fff;
      padding: 13px 18px;
      border-radius: 12px;
      font-size: 14px;
      box-shadow: 0 6px 24px rgba(0,0,0,.4);
      transform: translateY(120px);
      opacity: 0;
      transition: all .35s cubic-bezier(.34,1.56,.64,1);
      font-family: system-ui, sans-serif;
      line-height: 1.4;
    }
    @media(min-width:480px){
      #tc-toast { left:auto; max-width:300px; }
    }

    #carrito-contenido { font-family: system-ui, sans-serif; }

    .tc-wrap {
      max-width: 820px;
      margin: 0 auto;
      padding: 0 12px 32px;
    }

    .tc-item {
      display: grid;
      grid-template-columns: 70px 1fr auto auto auto;
      grid-template-rows: auto auto;
      gap: 6px 10px;
      align-items: center;
      padding: 14px 12px;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 14px;
      margin-bottom: 10px;
      box-shadow: 0 1px 4px rgba(0,0,0,.05);
    }

    .tc-item-img {
      grid-column: 1;
      grid-row: 1 / 3;
      width: 70px;
      height: 70px;
      object-fit: contain;
      border-radius: 10px;
      background: #f3f4f6;
      padding: 4px;
    }

    .tc-item-name {
      grid-column: 2 / 6;
      grid-row: 1;
      margin: 0;
      font-weight: 700;
      font-size: 13px;
      line-height: 1.35;
      color: #111;
      word-break: break-word;
    }

    .tc-item-unit {
      grid-column: 2;
      grid-row: 2;
      margin: 0;
      color: #6b7280;
      font-size: 12px;
      align-self: center;
    }

    .tc-qty {
      grid-column: 3;
      grid-row: 2;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .tc-qty-btn {
      width: 28px;
      height: 28px;
      border: 1px solid #d1d5db;
      background: #f9fafb;
      border-radius: 7px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }
    .tc-qty-btn:active { background: #e5e7eb; }

    .tc-qty-num {
      min-width: 20px;
      text-align: center;
      font-weight: 800;
      font-size: 14px;
    }

    .tc-item-sub {
      grid-column: 4;
      grid-row: 2;
      font-weight: 800;
      font-size: 14px;
      white-space: nowrap;
    }

    .tc-delete {
      grid-column: 5;
      grid-row: 2;
      background: none;
      border: none;
      cursor: pointer;
      color: #ef4444;
      font-size: 17px;
      padding: 4px;
      line-height: 1;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    .tc-summary {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 18px 16px;
      margin-top: 4px;
    }
    .tc-summary-row {
      display: flex;
      justify-content: space-between;
      color: #6b7280;
      margin-bottom: 10px;
      font-size: 14px;
      font-family: system-ui, sans-serif;
    }
    .tc-summary-total {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      font-weight: 800;
      font-family: system-ui, sans-serif;
    }
    .tc-summary hr {
      border: none;
      border-top: 2px solid #e2e8f0;
      margin: 12px 0;
    }
    .tc-btn-row {
      display: flex;
      flex-direction: column;
      gap: 9px;
      margin-top: 16px;
    }
    .tc-btn-secondary {
      width: 100%;
      padding: 13px;
      text-align: center;
      border: 2px solid #111;
      color: #111;
      text-decoration: none;
      border-radius: 10px;
      font-weight: 700;
      font-size: 14px;
      background: #fff;
      display: block;
      box-sizing: border-box;
      touch-action: manipulation;
    }
    .tc-btn-primary {
      width: 100%;
      padding: 14px;
      background: #111;
      color: #fff;
      border: none;
      border-radius: 10px;
      font-weight: 700;
      font-size: 15px;
      cursor: pointer;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }
    .tc-btn-primary:active { background: #333; }
    .tc-btn-danger {
      width: 100%;
      margin-top: 0;
      padding: 10px;
      background: none;
      border: 1px solid #ef4444;
      color: #ef4444;
      border-radius: 10px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      touch-action: manipulation;
      box-sizing: border-box;
    }
    .tc-empty {
      text-align: center;
      padding: 56px 20px;
      color: #6b7280;
      font-family: system-ui, sans-serif;
    }
    .tc-empty-icon { font-size: 64px; line-height: 1; margin-bottom: 14px; }
    .tc-empty h3 { font-size: 22px; margin: 0 0 8px; color: #111; }
    .tc-empty p  { margin: 0 0 22px; font-size: 15px; }
    .tc-empty a  {
      display: inline-block; padding: 13px 36px;
      background: #111; color: #fff; text-decoration: none;
      border-radius: 10px; font-weight: 700; font-size: 15px;
    }

    @media(min-width:540px){
      .tc-item {
        grid-template-columns: 80px 1fr auto auto auto;
      }
      .tc-item-img { width: 80px; height: 80px; }
      .tc-item-name { font-size: 15px; }
      .tc-item-sub { font-size: 16px; }
      .tc-btn-row { flex-direction: row; }
      .tc-btn-secondary { flex: 1; width: auto; }
      .tc-btn-primary    { flex: 2; width: auto; }
      .tc-btn-danger     { width: 100%; }
    }
  `;
  const s = document.createElement('style');
  s.textContent = css;
  document.head.appendChild(s);
})();

// ===================== STORAGE =====================
function getCarrito() {
  try { return JSON.parse(localStorage.getItem('tc_carrito')) || []; }
  catch { return []; }
}
function saveCarrito(c) { localStorage.setItem('tc_carrito', JSON.stringify(c)); }

// ===================== CONTADOR NAV =====================
function actualizarContador() {
  const total = getCarrito().reduce((s, i) => s + i.cantidad, 0);
  document.querySelectorAll('a[href*="carrito.html"]').forEach(el => {
    el.textContent = `🛒 (${total})`;
  });
}

// ===================== TOAST =====================
function mostrarToast(nombre) {
  let t = document.getElementById('tc-toast');
  if (!t) { t = document.createElement('div'); t.id = 'tc-toast'; document.body.appendChild(t); }
  const n = nombre.length > 42 ? nombre.slice(0, 42) + '…' : nombre;
  t.innerHTML = `<span style="color:#4ade80;margin-right:6px">✓</span><strong>${n}</strong><br><span style="color:#aaa;font-size:12px">añadido al carrito</span>`;
  t.style.transform = 'translateY(0)'; t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.transform = 'translateY(120px)'; t.style.opacity = '0'; }, 3200);
}

// ===================== AÑADIR =====================
function addToCart(nombre, precio, imagen) {
  const c = getCarrito();
  const key = nombre + '|' + precio;
  const i = c.findIndex(x => x.key === key);
  if (i > -1) c[i].cantidad++;
  else c.push({ key, nombre, precio, imagen, cantidad: 1 });
  saveCarrito(c); actualizarContador(); mostrarToast(nombre);
}

// ===================== INIT CATÁLOGO =====================
function initCatalogo() {
  document.querySelectorAll('button, a').forEach(btn => {
    if (!btn.textContent.trim().match(/añadir al carrito/i)) return;

    let card = btn;
    for (let i = 0; i < 8; i++) {
      card = card.parentElement;
      if (!card) break;
      if (card.querySelector('img') && card.querySelector('h3')) break;
    }
    if (!card) return;

    const img = card.querySelector('img');
    const h3  = card.querySelector('h3');

    let precioEl = null;
    card.querySelectorAll('*').forEach(el => {
      if (precioEl) return;
      const t = el.textContent.trim();
      if (/^\d[\d\s.,]*€?$/.test(t) && !el.querySelector('*')) precioEl = el;
    });

    const nombre     = h3 ? h3.textContent.trim() : 'Producto';
    const imagen     = img ? img.src : '';
    const precioText = precioEl ? precioEl.textContent.replace(/[^\d]/g, '') : '0';
    const precio     = parseInt(precioText, 10) || 0;

    btn.style.cursor = 'pointer';
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      addToCart(nombre, precio, imagen);
      const orig = btn.innerHTML;
      btn.innerHTML = '✓ Añadido';
      btn.style.cssText += ';background:#16a34a!important;color:#fff!important;';
      setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.style.color = ''; }, 1600);
    });
  });
}

// ===================== RENDER CARRITO =====================
function renderCarrito() {
  const wrap = document.getElementById('carrito-contenido');
  if (!wrap) return;

  const carrito = getCarrito();

  if (!carrito.length) {
    wrap.innerHTML = `
      <div class="tc-empty">
        <div class="tc-empty-icon">🛒</div>
        <h3>Tu carrito está vacío</h3>
        <p>Explora el catálogo y encuentra tu dispositivo ideal.</p>
        <a href="catalogo.html">Ver Catálogo</a>
      </div>`;
    return;
  }

  let rows = '';
  carrito.forEach((item, idx) => {
    const sub = item.precio * item.cantidad;
    rows += `
      <div class="tc-item">
        ${item.imagen
          ? `<img src="${item.imagen}" alt="${item.nombre}" class="tc-item-img" onerror="this.style.display='none'">`
          : `<div class="tc-item-img" style="display:flex;align-items:center;justify-content:center;font-size:28px;">📱</div>`}
        <p class="tc-item-name">${item.nombre}</p>
        <p class="tc-item-unit">${item.precio}€/ud</p>
        <div class="tc-qty">
          <button class="tc-qty-btn" onclick="cambiarCantidad(${idx},-1)">−</button>
          <span class="tc-qty-num">${item.cantidad}</span>
          <button class="tc-qty-btn" onclick="cambiarCantidad(${idx},1)">+</button>
        </div>
        <span class="tc-item-sub">${sub}€</span>
        <button class="tc-delete" onclick="eliminarItem(${idx})" title="Eliminar">🗑</button>
      </div>`;
  });

  const total      = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const totalItems = carrito.reduce((s, i) => s + i.cantidad, 0);

  wrap.innerHTML = `
    <div class="tc-wrap">
      ${rows}
      <div class="tc-summary">
        <div class="tc-summary-row">
          <span>Subtotal (${totalItems} producto${totalItems !== 1 ? 's' : ''})</span>
          <span>${total}€</span>
        </div>
        <div class="tc-summary-row">
          <span>Envío</span>
          <span style="color:#16a34a;font-weight:600;">A consultar</span>
        </div>
        <hr>
        <div class="tc-summary-total">
          <span>Total</span>
          <span>${total}€</span>
        </div>
        <div class="tc-btn-row">
          <a href="catalogo.html" class="tc-btn-secondary">← Seguir comprando</a>
          <button onclick="finalizarCompra()" class="tc-btn-primary">Finalizar compra →</button>
          <button onclick="vaciarCarrito()" class="tc-btn-danger">🗑 Vaciar carrito</button>
        </div>
      </div>
    </div>`;
}

// ===================== ACCIONES =====================
function cambiarCantidad(idx, delta) {
  const c = getCarrito();
  c[idx].cantidad += delta;
  if (c[idx].cantidad <= 0) c.splice(idx, 1);
  saveCarrito(c); actualizarContador(); renderCarrito();
}
function eliminarItem(idx) {
  const c = getCarrito(); c.splice(idx, 1);
  saveCarrito(c); actualizarContador(); renderCarrito();
}
function vaciarCarrito() {
  if (confirm('¿Vaciar el carrito?')) { saveCarrito([]); actualizarContador(); renderCarrito(); }
}
function finalizarCompra() {
  alert('¡Gracias por tu interés! Contáctanos vía WhatsApp o email para confirmar tu pedido.');
}

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
  actualizarContador();
  initCatalogo();
  renderCarrito();
});