# Thumblify Frontend

Frontend (SPA) de Thumblify: generador de thumbnails con IA para videos de YouTube. Incluye landing, autenticacion, generacion de thumbnails con opciones y galerias (mis generaciones + comunidad).

## Stack

- React 19 + Vite 7 + TypeScript
- React Router (BrowserRouter)
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- i18next (ES/EN) + detector de idioma
- Axios (con cookies: `withCredentials: true`)
- Motion, Lenis, Sonner, Lucide

## Funcionalidades

- Generacion de thumbnails con:
  - titulo + prompt
  - estilo, aspect ratio, esquema de color
  - visibilidad (publico/privado)
  - imagenes de referencia (hasta 2) con rol: `auto | person | background | style`
- Mis generaciones: listado, abrir detalle, descargar y eliminar
- Comunidad: feed publico paginado ("Load more")
- Preview tipo YouTube (ruta `/preview` con `thumbnail_url` + `title`)
- Autenticacion: register/login/logout + verificacion de sesion
- i18n: ES/EN (persistencia en `localStorage` key `lng`)

## Requisitos

- Node.js (recomendado: 18+)
- npm

## Configuracion (variables de entorno)

Este frontend consume el backend via Axios en `src/configs/api.ts`.

- `VITE_API_URL` (opcional): Base URL del backend. Si no se define, usa `http://localhost:3000`.

Ejemplo `.env`:

```bash
VITE_API_URL=http://localhost:3000
```

Nota: actualmente existe un `.env` con `VITE_BASE_URL`, pero el codigo usa `VITE_API_URL`.

## Instalacion y uso

```bash
npm install
npm run dev
```

Otros comandos:

```bash
npm run build
npm run preview
npm run lint
```

Typecheck (opcional):

```bash
npx tsc -b
```

## Rutas

- `/` landing (hero/features/pricing/contact/cta)
- `/login` login/registro
- `/generate` formulario de generacion
- `/generate/:id` detalle de thumbnail (bloquea inputs y hace polling si esta generando)
- `/my-generations` galeria del usuario (requiere sesion)
- `/community` feed publico
- `/preview?thumbnail_url=...&title=...` vista tipo YouTube
- `/about` informacion (se muestra mas en navegacion cuando no hay sesion)
- `/contact` contacto

## Integracion con backend (contrato esperado)

Base: `VITE_API_URL`.

Auth (cookies):

- `POST /api/auth/register` body `{ name, email, password }`
- `POST /api/auth/login` body `{ email, password }`
- `POST /api/auth/logout`
- `GET /api/auth/verify`

Thumbnails:

- `POST /api/thumbnail/generate` (multipart/form-data)
  - fields: `title`, `prompt`, `style`, `aspect_ratio`, `color_scheme`, `text_overlay`, `isPublic`
  - files: `reference_images` (0..2)
  - opcional: `reference_hint` (ej: `img1=person,img2=background`)
- `GET /api/user/thumbnails` (mis thumbnails)
- `GET /api/user/thumbnails/:id` (detalle)
- `PATCH /api/thumbnail/:id/visibility` body `{ isPublic: boolean }`
- `DELETE /api/thumbnail/:id`
- `GET /api/thumbnail/community?page=1&limit=24`

Campos usados en frontend (ver `src/assets/assets.ts`):

- `thumbnail.image_url` (cuando esta listo)
- `thumbnail.isGenerating` (estado en listados)
- `thumbnail.isPublic` (comunidad vs privado)
- `thumbnail.reference_images` (URLs)

## Estructura del proyecto

- `src/main.tsx` bootstrap (router + `AuthProvider` + i18n)
- `src/App.tsx` layout global (navbar/footer) + rutas
- `src/pages/*` pantallas
- `src/sections/*` secciones de la landing
- `src/components/*` componentes reutilizables
- `src/context/AuthContext.tsx` estado auth + llamadas al backend
- `src/configs/api.ts` cliente Axios
- `src/i18n/index.js` configuracion i18next
- `src/locales/{es,en}/translations.json` textos
- `src/data/*` data para secciones (pricing/testimonials/footer)

## Notas de despliegue (SPA)

Al usar `BrowserRouter`, tu hosting debe reescribir rutas a `index.html`.

- Netlify: agregar `_redirects` con `/* /index.html 200`
- Vercel: agregar `vercel.json` con rewrite a `/index.html`

## Troubleshooting

- 401/No session: el frontend usa cookies (`withCredentials: true`). En el backend habilita CORS con `credentials: true` y `origin` correcto (ej `http://localhost:5173`).
- Generacion queda "cargando": el frontend hace polling en `/api/user/thumbnails/:id` hasta que exista `image_url`.
- Descarga: se asume URL tipo Cloudinary (reemplaza `/upload` por `/upload/fl_attachment`).
