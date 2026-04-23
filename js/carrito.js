/**
 * TechConectJL — Carrito con Imágenes (Responsive Mobile)
 * Incluir al final del <body> en catalogo.html y carrito.html:
 * <script src="js/carrito.js"></script>
 */

// ===================== ESTILOS RESPONSIVE =====================
(function injectStyles() {
  const css = `
    #tc-toast {
      position: fixed;
      bottom: 20px;
      right: 16px;
      z-index: 9999;
      background: #111;
      color: #fff;
      padding: 12px 18px;
      border-radius: 12px;
      font-size: 14px;
      max-width: min(300px, calc(100vw - 32px));
      box-shadow: 0 6px 24px rgba(0,0,0,.4);
      transform: translateY(100px);
      opacity: 0;
      transition: all .35s cubic-bezier(.34,1.56,.64,1);
      font-family: system-ui, sans-serif;
      line-height: 1.4;
    }

    #carrito-contenido {
      font-family: system-ui, sans-serif;
    }

    .tc-wrap {
      max-width: 820px;
      margin: 0 auto;
      padding: 0 12px;
    }

    .tc-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 14px;
      margin-bottom: 10px;
      box-shadow: 0 1px 4px rgba(0,0,0,.05);
    }

    .tc-item-img {
      width: 80px;
      height: 80px;
      object-fit: contain;
      border-radius: 10px;
      background: #f3f4f6;
      padding: 4px;
      flex-shrink: 0;
    }

    .tc-item-placeholder {
      width: 80px;
      height: 80px;
      background: #f3f4f6;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      flex-shrink: 0;
    }

    .tc-item-info {
      flex: 1;
      min-width: 0;
    }

    .tc-item-name {
      margin: 0 0 3px;
      font-weight: 700;
      font-size: 14px;
      line-height: 1.35;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .tc-item-unit {
      margin: 0;
      color: #6b7280;
      font-size: 12px;
    }

    .tc-qty {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-shrink: 0;
    }

    .tc-qty-btn {
      width: 30px;
      height: 30px;
      border: 1px solid #d1d5db;
      background: #f9fafb;
      border-radius: 8px;
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
      min-width: 24px;
      text-align: center;
      font-weight: 800;
      font-size: 15px;
    }

    .tc-item-sub {
      min-width: 60px;
      text-align: right;
      flex-shrink: 0;
    }

    .tc-item-sub p {
      margin: 0;
      font-weight: 800;
      font-size: 16px;
    }

    .tc-delete {
      background: none;
      border: none;
      cursor: pointer;
      color: #ef4444;
      font-size: 18px;
      padding: 6px;
      line-height: 1;
      flex-shrink: 0;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    .tc-summary {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 20px;
      margin-top: 4px;
    }

    .tc-summary-row {
      display: flex;
      justify-content: space-between;
      color: #6b7280;
      margin-bottom: 10px;
      font-size: 14px;
    }

    .tc-summary-total {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      font-weight: 800;
    }

    .tc-summary hr {
      border: none;
      border-top: 2px solid #e2e8f0;
      margin: 12px 0;
    }

    .tc-btn-row {
      display: flex;
      gap: 10px;
      margin-top: 18px;
      flex-wrap: wrap;
    }

    .tc-btn-secondary {
      flex: 1;
      min-width: 120px;
      padding: 13px 10px;
      text-align: center;
      border: 2px solid #111;
      color: #111;
      text-decoration: none;
      border-radius: 10px;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      background: #fff;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    .tc-btn-primary {
      flex: 2;
      min-width: 140px;
      padding: 13px 10px;
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
      display: block;
      width: 100%;
      margin-top: 8px;
      padding: 10px;
      background: none;
      border: 1px solid #ef4444;
      color: #ef4444;
      border-radius: 10px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    .tc-empty {
      text-align: center;
      padding: 56px 20px;
      color: #6b7280;
    }
    .tc-empty-icon { font-size: 64px; line-height: 1; margin-bottom: 14px; }
    .tc-empty h3 { font-size: 22px; margin: 0 0 8px; color: #111; }
    .tc-empty p { margin: 0 0 22px; font-size: 15px; }
    .tc-empty a {
      display: inline-block;
      padding: 13px 36px;
      background: #111;
      color: #fff;
      text-decoration: none;
      border-radius: 10px;
      font-weight: 700;
      font-size: 15px;
    }

    @media (max-width: 480px) {
      .tc-item { gap: 10px; padding: 12px 10px; }
      .tc-item-img, .tc-item-placeholder { width: 62px; height: 62px; }
      .tc-item-name { font-size: 13px; }
      .tc-item-sub p { font-size: 14px; }
      .tc-summary-total { font-size: 18px; }
      .tc-btn-row { flex-direction: column; }
      .tc-btn-secondary, .tc-btn-primary { flex: none; width: 100%; min-width: unset; }
      .tc-summary { padding: 16px; }
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
})();

// ===================== ALMACENAMIENTO =====================
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
  if (!t) {
    t = document.createElement('div');
    t.id = 'tc-toast';
    document.body.appendChild(t);
  }
  const n = nombre.length > 42 ? nombre.slice(0, 42) + '…' : nombre;
  t.innerHTML = `<span style="color:#4ade80;margin-right:6px">✓</span><strong>${n}</strong><br><span style="color:#aaa;font-size:12px">añadido al carrito</span>`;
  t.style.transform = 'translateY(0)';
  t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => {
    t.style.transform = 'translateY(100px)';
    t.style.opacity = '0';
  }, 3200);
}

// ===================== AÑADIR AL CARRITO =====================
function addToCart(nombre, precio, imagen) {
  const c = getCarrito();
  const key = nombre + '|' + precio;
  const i = c.findIndex(x => x.key === key);
  if (i > -1) c[i].cantidad++;
  else c.push({ key, nombre, precio, imagen, cantidad: 1 });
  saveCarrito(c);
  actualizarContador();
  mostrarToast(nombre);
}

// ===================== DETECTAR TARJETAS DEL CATÁLOGO =====================
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
      e.preventDefault();
      e.stopPropagation();
      addToCart(nombre, precio, imagen);
      const orig = btn.innerHTML;
      btn.innerHTML = '✓ Añadido';
      btn.style.cssText += ';background:#16a34a!important;color:#fff!important;';
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.style.color = '';
      }, 1600);
    });
  });
}

// ===================== RENDERIZAR CARRITO =====================
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
          ? `<img src="${item.imagen}" alt="${item.nombre}" class="tc-item-img"
               onerror="this.style.display='none'">`
          : `<div class="tc-item-placeholder">📱</div>`}
        <div class="tc-item-info">
          <p class="tc-item-name">${item.nombre}</p>
          <p class="tc-item-unit">${item.precio}€ / unidad</p>
        </div>
        <div class="tc-qty">
          <button class="tc-qty-btn" onclick="cambiarCantidad(${idx},-1)">−</button>
          <span class="tc-qty-num">${item.cantidad}</span>
          <button class="tc-qty-btn" onclick="cambiarCantidad(${idx},1)">+</button>
        </div>
        <div class="tc-item-sub">
          <p>${sub}€</p>
        </div>
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
        </div>
        <button onclick="vaciarCarrito()" class="tc-btn-danger">🗑 Vaciar carrito</button>
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
  if (confirm('¿Vaciar el carrito?')) {
    saveCarrito([]); actualizarContador(); renderCarrito();
  }
}
function finalizarCompra() {
  alert('¡Gracias por tu interés! Contáctanos vía WhatsApp o email para confirmar tu pedido.');
}

// ===================== ARRANQUE =====================
document.addEventListener('DOMContentLoaded', () => {
  actualizarContador();
  initCatalogo();
  renderCarrito();
});