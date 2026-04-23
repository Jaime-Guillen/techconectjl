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
    Object.assign(t.style, {
      position:'fixed', bottom:'24px', right:'24px', zIndex:'9999',
      background:'#111', color:'#fff', padding:'14px 22px',
      borderRadius:'12px', fontSize:'14px', maxWidth:'300px',
      boxShadow:'0 6px 24px rgba(0,0,0,.4)',
      transform:'translateY(100px)', opacity:'0',
      transition:'all .35s cubic-bezier(.34,1.56,.64,1)',
      fontFamily:'system-ui,sans-serif', lineHeight:'1.4'
    });
    document.body.appendChild(t);
  }
  const n = nombre.length > 45 ? nombre.slice(0, 45) + '…' : nombre;
  t.innerHTML = `<span style="color:#4ade80;margin-right:6px">✓</span><strong>${n}</strong><br><span style="color:#aaa;font-size:12px">añadido al carrito</span>`;
  t.style.transform = 'translateY(0)'; t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.transform='translateY(100px)'; t.style.opacity='0'; }, 3200);
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

    // Subir hasta encontrar contenedor con img + h3
    let card = btn;
    for (let i = 0; i < 8; i++) {
      card = card.parentElement;
      if (!card) break;
      if (card.querySelector('img') && card.querySelector('h3')) break;
    }
    if (!card) return;

    const img = card.querySelector('img');
    const h3  = card.querySelector('h3');

    // Buscar precio: primer texto que sea solo número+€
    let precioEl = null;
    card.querySelectorAll('*').forEach(el => {
      if (precioEl) return;
      const t = el.textContent.trim();
      if (/^\d[\d\s.,]*€?$/.test(t) && !el.querySelector('*')) precioEl = el;
    });

    const nombre     = h3 ? h3.textContent.trim() : 'Producto';
    const imagen     = img ? img.src : '';
    const precioText = precioEl ? precioEl.textContent.replace(/[^\d]/g,'') : '0';
    const precio     = parseInt(precioText, 10) || 0;

    btn.style.cursor = 'pointer';
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      addToCart(nombre, precio, imagen);
      const orig = btn.innerHTML;
      const origBg = btn.style.background;
      const origColor = btn.style.color;
      btn.innerHTML = '✓ Añadido';
      btn.style.cssText += ';background:#16a34a!important;color:#fff!important;';
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = origBg;
        btn.style.color = origColor;
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
      <div style="text-align:center;padding:64px 20px;color:#6b7280;">
        <div style="font-size:72px;line-height:1;margin-bottom:16px">🛒</div>
        <h3 style="font-size:24px;margin:0 0 8px;color:#111">Tu carrito está vacío</h3>
        <p style="margin:0 0 24px">Explora el catálogo y encuentra tu dispositivo ideal.</p>
        <a href="catalogo.html" style="
          display:inline-block;padding:13px 36px;background:#111;color:#fff;
          text-decoration:none;border-radius:10px;font-weight:700;font-size:15px;">
          Ver Catálogo
        </a>
      </div>`;
    return;
  }

  let rows = '';
  carrito.forEach((item, idx) => {
    const sub = item.precio * item.cantidad;
    rows += `
      <div style="display:flex;align-items:center;gap:16px;padding:16px;
        background:#fff;border:1px solid #e5e7eb;border-radius:14px;
        margin-bottom:12px;box-shadow:0 1px 4px rgba(0,0,0,.05);">
        ${item.imagen
          ? `<img src="${item.imagen}" alt="${item.nombre}"
               onerror="this.style.display='none'"
               style="width:82px;height:82px;object-fit:contain;border-radius:10px;
                      background:#f3f4f6;padding:4px;flex-shrink:0;">`
          : `<div style="width:82px;height:82px;background:#f3f4f6;border-radius:10px;
                          display:flex;align-items:center;justify-content:center;
                          font-size:32px;flex-shrink:0;">📱</div>`}
        <div style="flex:1;min-width:0;">
          <p style="margin:0 0 4px;font-weight:700;font-size:15px;line-height:1.4;
                    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            ${item.nombre}
          </p>
          <p style="margin:0;color:#6b7280;font-size:13px;">${item.precio}€ / unidad</p>
        </div>
        <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
          <button onclick="cambiarCantidad(${idx},-1)"
            style="width:32px;height:32px;border:1px solid #d1d5db;background:#f9fafb;
                   border-radius:8px;cursor:pointer;font-size:18px;font-weight:700;
                   display:flex;align-items:center;justify-content:center;">−</button>
          <span style="min-width:28px;text-align:center;font-weight:800;font-size:16px;">${item.cantidad}</span>
          <button onclick="cambiarCantidad(${idx},1)"
            style="width:32px;height:32px;border:1px solid #d1d5db;background:#f9fafb;
                   border-radius:8px;cursor:pointer;font-size:18px;font-weight:700;
                   display:flex;align-items:center;justify-content:center;">+</button>
        </div>
        <div style="min-width:72px;text-align:right;flex-shrink:0;">
          <p style="margin:0;font-weight:800;font-size:17px;">${sub}€</p>
        </div>
        <button onclick="eliminarItem(${idx})" title="Eliminar"
          style="background:none;border:none;cursor:pointer;color:#ef4444;
                 font-size:20px;padding:4px;line-height:1;flex-shrink:0;">🗑</button>
      </div>`;
  });

  const total      = carrito.reduce((s,i) => s + i.precio * i.cantidad, 0);
  const totalItems = carrito.reduce((s,i) => s + i.cantidad, 0);

  wrap.innerHTML = `
    <div style="max-width:820px;margin:0 auto;padding:0 8px;">
      ${rows}
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:24px;margin-top:4px;">
        <div style="display:flex;justify-content:space-between;color:#6b7280;margin-bottom:10px;">
          <span>Subtotal (${totalItems} producto${totalItems!==1?'s':''})</span>
          <span>${total}€</span>
        </div>
        <div style="display:flex;justify-content:space-between;color:#6b7280;margin-bottom:10px;">
          <span>Envío</span>
          <span style="color:#16a34a;font-weight:600;">A consultar</span>
        </div>
        <hr style="border:none;border-top:2px solid #e2e8f0;margin:14px 0;">
        <div style="display:flex;justify-content:space-between;font-size:22px;font-weight:800;">
          <span>Total</span>
          <span>${total}€</span>
        </div>
        <div style="display:flex;gap:12px;margin-top:22px;flex-wrap:wrap;">
          <a href="catalogo.html" style="
            flex:1;min-width:130px;padding:13px;text-align:center;
            border:2px solid #111;color:#111;text-decoration:none;
            border-radius:10px;font-weight:700;font-size:14px;">
            ← Seguir comprando
          </a>
          <button onclick="finalizarCompra()" style="
            flex:2;min-width:160px;padding:13px;background:#111;color:#fff;
            border:none;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer;">
            Finalizar compra →
          </button>
        </div>
        <button onclick="vaciarCarrito()" style="
          display:block;width:100%;margin-top:10px;padding:9px;background:none;
          border:1px solid #ef4444;color:#ef4444;border-radius:10px;
          cursor:pointer;font-size:13px;font-weight:600;">
          🗑 Vaciar carrito
        </button>
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