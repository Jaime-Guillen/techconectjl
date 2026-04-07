# 📱 Planificación del Proyecto Web: TechConectJL

Este documento detalla la estructura técnica y visual de la nueva plataforma propia de **TechConectJL**, diseñada para ofrecer móviles reacondicionados de alta calidad en Dos Hermanas, Sevilla.

---

## 🎨 Identidad Visual y Estilo
* **Colores Principales:** Morado (Corporativo) y Blanco.
* **Concepto:** Diseño limpio y profesional inspirado en referentes del sector como *Back Market*.
* **Misión:** Hacer la tecnología accesible ofreciendo productos de calidad contrastada.

---

## 🗺️ Estructura de la Web

### 1. Inicio (Home)
* **Cabecera (Header):**
    * Logo de TechConectJL.
    * **Barra de búsqueda:** Para localizar modelos específicos (iPhone, Samsung, etc.).
    * **Logueo de usuario:** Acceso para clientes y panel de administración para empleados (Tabla `User`).
    * Enlace al Carrito con contador de productos.
* **Cuerpo (Body):**
    * **Portada (Hero):** Imagen de impacto con el eslogan "Informática para todos".
    * **Sobre nosotros:** Breve descripción de la misión de sostenibilidad y economía circular de la empresa.
    * **Logos de marcas:** Apple, Samsung, Xiaomi, etc.
    * **Secciones destacadas:** Ofertas especiales (ahorro de hasta el 40%) y productos estrella de **Grado A**.

### 2. Catálogo de Productos
* **Listado Dinámico:** Generado a partir de la tabla `Product`.
* **Información por tarjeta:**
    * Imagen del dispositivo (Tabla `ProductImage`).
    * Descripción detallada y especificaciones técnicas.
    * **Grado de reacondicionado:** Etiquetas claras para Grado A, B o C.
    * Precio y botón **"Añadir al carro"**.

### 3. Carrito y Checkout
* Desglose de productos seleccionados (Tabla `OrderItem`).
* Cálculo automático de importes y total (Tabla `Order`).
* Formulario de confirmación con dirección de envío y facturación.

### 4. Contacto y Redes
* **Información de contacto:** Número de la empresa, correo electrónico y ubicación física en Dos Hermanas.
* **Redes Sociales:** Enlaces a Facebook Marketplace, Wallapop, Instagram y LinkedIn.

---

## 💾 Modelo de Datos (Estructura SQL)

La web se apoya en una base de datos relacional con las siguientes entidades principales:

1.  **User:** Gestión de perfiles, direcciones y permisos de administrador.
2.  **Product:** Almacena nombre, precio, stock y el estado del terminal (Grado A/B/C).
3.  **ProductImage:** Relación de imágenes para las galerías de los productos.
4.  **Order:** Cabecera de los pedidos realizados por los usuarios.
5.  **OrderItem:** Detalle de los productos incluidos en cada transacción.

---

## 📅 Hoja de Ruta (Planning de 8 Semanas)
* **Semanas 1-2:** Onboarding, análisis de competencia y diseño UI/UX en Figma.
* **Semanas 3-4:** Desarrollo del catálogo, fichas de producto y diseño responsive.
* **Semanas 5-6:** Implementación del carrito, sistema de pedidos y panel de administración.
* **Semanas 7-8:** Pruebas QA, optimización SEO y presentación final del proyecto.

---
> *Este documento forma parte del Plan de Prácticas de Desarrollador Web en TechConectJL.*