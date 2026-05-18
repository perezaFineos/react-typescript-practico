# 9.1. Lab — Consumo de API (JSONPlaceholder)

[← Capítulo 9](09-consumo-apis.md) | [← Lab 8.1](08-01-lab-react-router.md) | [Índice](README.md)

---

## Objetivo del laboratorio

Crear un **servicio** `usuarios.ts`, un componente **ListaUsuarios** que haga `fetch` en `useEffect`, y manejar estados **cargando**, **error** y **cancelación** del efecto al desmontar.

## Prerrequisitos

- Haber completado [2.1 Lab Vite](02-01-lab-vite.md) (proyecto React + TypeScript con Vite).
- Servidor de desarrollo en marcha (`npm run dev`) dentro de la carpeta de **tu** proyecto.

> Los paths de archivos (`src/...`) son **relativos a la raíz de tu proyecto Vite**. El nombre de la carpeta no importa; en ejemplos usamos `react-curso-practico` solo como referencia.

## Resultado esperado

Lista de nombres de usuarios desde [JSONPlaceholder](https://jsonplaceholder.typicode.com/users); mensaje de carga mientras llega la respuesta; mensaje de error si falla la red.

---

## Paso 1 — Tipo y servicio

**Objetivo:** separar la petición HTTP de la UI.

Crea **`src/types/usuario.ts`**:

```tsx
export type Usuario = {
  id: number
  name: string
  email: string
}
```

Crea **`src/services/usuarios.ts`**:

```tsx
import type { Usuario } from '../types/usuario'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

export async function obtenerUsuarios(signal?: AbortSignal): Promise<Usuario[]> {
  const res = await fetch(API_URL, { signal })
  if (!res.ok) {
    throw new Error(`Error HTTP ${res.status}`)
  }
  return res.json() as Promise<Usuario[]>
}
```

**Comprobación:** el archivo compila; la URL es accesible en el navegador.

---

## Paso 2 — Componente con estados iniciales

**Objetivo:** preparar `usuarios`, `cargando` y `error`.

Crea **`src/components/ListaUsuarios.tsx`**:

```tsx
import { useState } from 'react'
import type { Usuario } from '../types/usuario'

export function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  if (cargando) return <p>Cargando usuarios…</p>
  if (error) return <p role="alert">Error: {error}</p>

  return (
    <ul>
      {usuarios.map((u) => (
        <li key={u.id}>{u.name} ({u.email})</li>
      ))}
    </ul>
  )
}
```

**Comprobación:** al montar en `App` verás «Cargando…» de forma permanente (aún no hay `useEffect`).

---

## Paso 3 — `useEffect` con fetch

**Objetivo:** cargar datos al montar.

Añade en **`src/components/ListaUsuarios.tsx`**:

```tsx
import { useState, useEffect } from 'react'
import { obtenerUsuarios } from '../services/usuarios'
import type { Usuario } from '../types/usuario'

export function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false

    obtenerUsuarios()
      .then((data) => {
        if (!cancelado) {
          setUsuarios(data)
          setCargando(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelado) {
          setError(err instanceof Error ? err.message : 'Error desconocido')
          setCargando(false)
        }
      })

    return () => {
      cancelado = true
    }
  }, [])

  if (cargando) return <p>Cargando usuarios…</p>
  if (error) return <p role="alert">Error: {error}</p>

  return (
    <ul>
      {usuarios.map((u) => (
        <li key={u.id}>{u.name} ({u.email})</li>
      ))}
    </ul>
  )
}
```

**Comprobación:** tras un momento aparece la lista de usuarios (10 entradas).

---

## Paso 4 — `AbortController` en el servicio

**Objetivo:** cancelar el `fetch` al desmontar (además del flag).

Sustituye el efecto por:

```tsx
  useEffect(() => {
    const controller = new AbortController()
    let cancelado = false

    obtenerUsuarios(controller.signal)
      .then((data) => {
        if (!cancelado) {
          setUsuarios(data)
          setCargando(false)
        }
      })
      .catch((err: unknown) => {
        if (cancelado) return
        if (err instanceof Error && err.name === 'AbortError') return
        setError(err instanceof Error ? err.message : 'Error desconocido')
        setCargando(false)
      })

    return () => {
      cancelado = true
      controller.abort()
    }
  }, [])
```

**Comprobación:** desmontar rápido el componente (ver reto) no provoca warning de actualizar estado en componente desmontado.

---

## Paso 5 — Montar en `App`

**Objetivo:** ver la lista en la aplicación.

Sustituye **`src/App.tsx`** por:

```tsx
import { ListaUsuarios } from './components/ListaUsuarios'

function App() {
  return (
    <div>
      <h1>Usuarios de la API</h1>
      <ListaUsuarios />
    </div>
  )
}

export default App
```

**Comprobación:** título + lista o mensaje de carga/error según red.

---

## Paso 6 — Simular error (opcional)

**Objetivo:** comprobar la rama `error`.

Cambia temporalmente `API_URL` a una URL inválida, recarga, y vuelve a dejar la URL correcta.

**Comprobación:** se muestra el párrafo con `role="alert"`.

---

## Retos

1. **Reto A:** Botón «Recargar» que vuelva a llamar a la API sin recargar la página.
2. **Reto B:** Muestra solo los tres primeros usuarios con `.slice(0, 3)`.
3. **Reto C:** En `App`, alterna montar/desmontar `ListaUsuarios` con un botón y verifica en la pestaña Network que la petición se aborta.

---

## Qué has practicado

- Capa de servicio para HTTP.
- `useEffect` asíncrono con flag `cancelado` y `AbortSignal`.
- UI según estados cargando / éxito / error.

**Siguiente:** [Capítulo 10](10-organizacion-buenas-practicas.md).
