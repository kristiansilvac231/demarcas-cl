# DeMarcas.cl

Landing de conversión para registro de marcas comerciales en Chile ante INAPI. Sitio estático de una sola página (HTML + CSS + JS vanilla). Deploy en Vercel vía GitHub.

## Stack

- HTML5 semántico
- CSS3 (un solo archivo `styles/main.css`, sin frameworks)
- JavaScript vanilla (`scripts/main.js`)
- Google Fonts (Inter)
- Sin dependencias externas ni build tools

---

## Deploy en Vercel

1. Sube el repositorio a GitHub
2. Ve a [vercel.com](https://vercel.com) → **Add New Project**
3. Importa el repositorio de GitHub
4. Framework Preset: **Other** (sin build command, sin output directory)
5. Click **Deploy**

Vercel detecta automáticamente que es un sitio estático y sirve `index.html` en la raíz.

> El archivo `vercel.json` ya incluye `cleanUrls`, `trailingSlash: false` y headers de seguridad.

---

## Cómo actualizar los links de pago (Flow)

Los placeholders de pago están en `index.html`. Busca los `href` de los botones de cada plan:

| Plan | Placeholder actual | Reemplazar con |
|------|--------------------|----------------|
| Registro Asistido | `#plan-asistido` | URL real de Flow |
| Registro Completo | `#plan-completo` | URL real de Flow |
| Registro Blindado | `#plan-blindado` | URL real de Flow |

Son 2 apariciones del botón "CTA final" de precios más los botones dentro de las cards. Busca en el archivo:

```
href="#plan-asistido"
href="#plan-completo"
href="#plan-blindado"
```

---

## Cómo cambiar el mes de la oferta

**Barra superior (`index.html`):**
Busca el texto dentro de `.urgency-bar` y edita la línea:

```html
Registro Completo con 35% descuento — solo hasta el 31 de julio
```

**Contador de días (`scripts/main.js`):**
Busca la línea con `deadline` y cambia la fecha límite:

```js
const deadline = new Date('2026-07-31T23:59:59-04:00');
```

Cambia `2026-07-31` por la nueva fecha en formato `YYYY-MM-DD`.

---

## Estructura del proyecto

```
demarcas-cl/
├── index.html          ← página principal (todo el HTML)
├── styles/
│   └── main.css        ← todos los estilos
├── scripts/
│   └── main.js         ← smooth scroll, FAQ, countdown
├── assets/
│   ├── logo.svg        ← logo de la marca
│   └── favicon.svg     ← ícono del navegador
├── vercel.json         ← config de deploy
├── .gitignore
└── README.md
```
