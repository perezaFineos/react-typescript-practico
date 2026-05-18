# 2. Entorno de desarrollo

[← Índice](README.md) | [← Anterior: 1. Introducción](01-introduccion-react-ecosistema.md) | [Lab 2.1 →](02-01-lab-vite.md) | [Siguiente: 3. JSX →](03-jsx-renderizado.md)

---

## Node.js y npm

**Node.js** ejecuta JavaScript y TypeScript en la terminal. **npm** instala dependencias del proyecto y ejecuta scripts definidos en `package.json`.

```bash
node -v
npm -v
```

## Vite: herramienta recomendada

**Vite** es un bundler y servidor de desarrollo muy rápido, basado en módulos ES nativos. En este curso usamos la plantilla oficial **react-ts** (React + TypeScript).

```bash
npm create vite@latest mi-app -- --template react-ts
cd mi-app
npm install
npm run dev
```

Abre la URL que muestra la consola (por defecto `http://localhost:5173`). Los cambios en el código se reflejan al instante (**HMR**, Hot Module Replacement).

## Estructura del proyecto

```
mi-app/
├── index.html          # entrada HTML; apunta a /src/main.tsx
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── main.tsx        # createRoot + render
    ├── App.tsx         # componente raíz
    ├── App.css
    ├── index.css
    └── vite-env.d.ts   # tipos para imports de Vite
```

| Archivo | Rol |
|---------|-----|
| `index.html` | Contiene `<div id="root">`; Vite inyecta el bundle |
| `main.tsx` | Monta React en `#root` |
| `App.tsx` | Primer componente visible |
| `vite.config.ts` | Plugins (React) y opciones de build |
| `tsconfig.json` | Reglas TypeScript (`strict`, `jsx`, etc.) |

## Scripts habituales

| Comando | Acción |
|---------|--------|
| `npm run dev` | Servidor de desarrollo con recarga |
| `npm run build` | Genera carpeta `dist/` para producción |
| `npm run preview` | Sirve el build localmente (p. ej. puerto 4173) |

## Herramientas de desarrollo

- **Editor**: VS Code / Cursor con ESLint y Prettier (incluidos en este repo).
- **React DevTools**: extensión de navegador para inspeccionar el árbol de componentes y el estado.
- **TypeScript**: errores de tipos en el editor antes de ejecutar.

---

## Lab: proyecto inicial con Vite

Trabaja en la carpeta `mi-app` creada en [Requisitos](00-requisitos.md) o sigue estos pasos desde cero.

### Paso 1 — Crear y arrancar

```bash
npm create vite@latest mi-app -- --template react-ts
cd mi-app
npm install
npm run dev
```

### Paso 2 — Revisar `main.tsx`

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

El operador `!` indica a TypeScript que `getElementById('root')` no devuelve `null`.

`StrictMode` ayuda a detectar efectos secundarios problemáticos en desarrollo (doble renderizado de efectos, avisos de APIs obsoletas).

### Paso 3 — Personalizar `App.tsx`

```tsx
function App() {
  return (
    <div>
      <h1>Hola — React + TypeScript + Vite</h1>
      <p>Edita este archivo y guarda: la página se actualiza sola.</p>
    </div>
  )
}

export default App
```

### Paso 4 — Build de producción

```bash
npm run build
npm run preview
```

Comprueba que en `dist/` quedan HTML, JS y CSS estáticos listos para desplegar en cualquier hosting estático.

**Entrega:** captura de pantalla o commit en tu fork con mensaje `feat: proyecto base vite react-ts`.
