# 8. Routing en React

[← Índice](README.md) | [← Anterior: 7. Comunicación](07-comunicacion-componentes.md) | [Siguiente: 9. APIs →](09-consumo-apis.md)

---

## ¿Por qué React Router?

En una SPA solo hay un `index.html`. Al cambiar la URL no pides otra página al servidor: cambias **qué componente** se renderiza. **React Router** asocia rutas a componentes y actualiza la vista sin recargar.

## Instalación

En `mi-app`:

```bash
npm install react-router-dom
```

Los tipos van incluidos en el paquete desde la v6.

## `BrowserRouter`

Envuelve la aplicación en `main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

## Rutas y enlaces

```tsx
import { Routes, Route, Link } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Acerca from './pages/Acerca';
import NoEncontrado from './pages/NoEncontrado';

function App() {
  return (
    <>
      <nav>
        <Link to="/">Inicio</Link>
        {' | '}
        <Link to="/acerca">Acerca</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </>
  );
}

export default App;
```

- **`Link`**: navegación declarativa (no recarga la página).
- **`Routes` / `Route`**: tabla de rutas → componentes.
- **`path="*"`**: ruta comodín (404).

## Navegación programática

```tsx
import { useNavigate } from 'react-router-dom';

function FormularioGuardar() {
  const navigate = useNavigate();

  const guardar = () => {
    // ... guardar datos
    navigate('/');
  };

  return <button type="button" onClick={guardar}>Guardar y volver</button>;
}
```

Útil tras enviar un formulario o tras una acción que debe cambiar de pantalla.

---

## Lab: navegación básica

### Paso 1 — Páginas

**`src/pages/Inicio.tsx`**

```tsx
export default function Inicio() {
  return <h1>Inicio</h1>;
}
```

**`src/pages/Contacto.tsx`**

```tsx
export default function Contacto() {
  return (
    <section>
      <h1>Contacto</h1>
      <p>Formulario o datos de contacto aquí.</p>
    </section>
  );
}
```

**`src/pages/NoEncontrado.tsx`**

```tsx
import { Link } from 'react-router-dom';

export default function NoEncontrado() {
  return (
    <div>
      <h1>404</h1>
      <p>Página no encontrada.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}
```

### Paso 2 — Configurar `App.tsx`

Añade rutas `/`, `/contacto` y `*` como en el ejemplo anterior.

### Paso 3 — Probar

- Navega con los enlaces: la URL cambia (`/`, `/contacto`) sin recarga completa.
- Escribe manualmente una ruta inexistente (`/xyz`) y comprueba la página 404.

**Entrega:** commit `feat: react-router paginas basicas`.
