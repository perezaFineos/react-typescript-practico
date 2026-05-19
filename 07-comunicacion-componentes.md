# 7. Comunicación entre componentes (avanzado)

[← Índice](README.md) | [← Anterior: 6. Eventos](06-eventos-formularios.md) | [Lab 7.1 →](07-01-lab-useContext.md) | [Siguiente: 8. Routing →](08-routing.md)

---

En capítulos anteriores ya viste **props**, **callbacks** y **elevación de estado** (cap. 4–6) con `useState`. Aquí el problema es otro: cuando el árbol crece, pasar las mismas props por muchos niveles intermedios (**prop drilling**) vuelve el código frágil y repetitivo.

Este bloque presenta tres herramientas para compartir lógica y estado sin cablear cada nivel:

| Herramienta | Para qué sirve |
|-------------|----------------|
| **Context + `useContext`** | Valor accesible en profundidad sin pasarlo manualmente por cada hijo |
| **HOC** (Higher Order Component) | Función que envuelve un componente y le añade comportamiento reutilizable |
| **`useReducer`** | Estado con **acciones** y un `reducer`; útil cuando varios cambios siguen reglas |

---

## Prop drilling

Ejemplo simplificado:

```
App (tema)
 └── Layout (recibe tema, no lo usa)
      └── Sidebar (recibe tema, no lo usa)
           └── BotonTema (finalmente usa tema)
```

`Layout` y `Sidebar` solo **reenvían** props. Con Context, `App` publica el tema y `BotonTema` lo lee directamente.

---

## Context API y `useContext`

1. **`createContext`** — crea el “canal” de datos.
2. **`<MiContext.Provider value={...}>`** — envuelve la rama que debe recibir el valor.
3. **`useContext(MiContext)`** — cualquier hijo (a cualquier profundidad) lee el valor actual.

```tsx
import { createContext, useContext, useState, type ReactNode } from 'react'

type Tema = 'claro' | 'oscuro'

const TemaContext = createContext<Tema>('claro')

function BotonTema() {
  const tema = useContext(TemaContext)
  return <span>Tema actual: {tema}</span>
}

function App() {
  const [tema, setTema] = useState<Tema>('claro')
  return (
    <TemaContext.Provider value={tema}>
      <BotonTema />
    </TemaContext.Provider>
  )
}
```

**Cuándo usarlo:** tema, idioma, usuario logueado, preferencias globales de UI. No sustituye a todo el estado local: un input de formulario sigue en `useState` del componente que lo muestra.

---

## Higher Order Components (HOC)

Un **HOC** es una **función** que recibe un componente y devuelve **otro** componente con capacidades extra (patrón “envolver”).

Convención: nombre que empieza por **`with`** (`withData`, `withLoading`).

```tsx
import type { ComponentType } from 'react'

function withSaludo<P extends object>(Wrapped: ComponentType<P>) {
  return function ComponenteConSaludo(props: P) {
    return (
      <>
        <p>Hola desde el HOC</p>
        <Wrapped {...props} />
      </>
    )
  }
}
```

**Cuándo usarlo:** lógica transversal repetida (cargar datos, spinner, permisos). Hoy también se resuelve con **hooks personalizados**; los HOC siguen apareciendo en código legacy y librerías.

---

## `useReducer`

Similar a Redux en miniatura: un **`reducer(state, action)`** centraliza **cómo** cambia el estado.

```tsx
type Estado = { cuenta: number }
type Accion =
  | { type: 'incrementar' }
  | { type: 'decrementar' }
  | { type: 'reiniciar' }

function reducer(estado: Estado, accion: Accion): Estado {
  switch (accion.type) {
    case 'incrementar':
      return { cuenta: estado.cuenta + 1 }
    case 'decrementar':
      return { cuenta: estado.cuenta - 1 }
    case 'reiniciar':
      return { cuenta: 0 }
    default:
      return estado
  }
}

const [estado, dispatch] = useReducer(reducer, { cuenta: 0 })

// dispatch({ type: 'incrementar' })
```

| `useState` | `useReducer` |
|------------|--------------|
| Cambios simples y locales | Varias acciones relacionadas |
| Poco boilerplate | Reglas de actualización en un solo sitio |
| Un valor o pocos campos | Objeto de estado con transiciones claras |

---

## Laboratorios

Ejecuta los tres en orden en tu proyecto Vite (mismo del [lab 2.1](02-01-lab-vite.md)):

| Lab | Tema |
|-----|------|
| [7.1 useContext](07-01-lab-useContext.md) | Idioma de la app sin prop drilling |
| [7.2 HOC](07-02-lab-hoc-withData.md) | `withData` + fetch reutilizable |
| [7.3 useReducer](07-03-lab-useReducer.md) | Contador con acciones tipadas |

Cada lab es un archivo dedicado con objetivo por paso, comprobaciones y retos.
