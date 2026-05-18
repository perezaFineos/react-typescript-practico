# 3.1. Lab — Lista de noticias (map, props y key)

[← Capítulo 3](03-jsx-renderizado.md) | [← Lab anterior](02-01-lab-vite.md) | [Índice](README.md) | [Siguiente lab →](04-01-lab-composicion.md)

---

## Objetivo del laboratorio

Mostrar una **lista de noticias** desde un JSON: componente hijo, `.map()`, **props** y **`key`** estable.

## Prerrequisitos

- [2.1 Lab Vite](02-01-lab-vite.md) completado.
- `npm run dev` en la carpeta de tu proyecto Vite.

> **Carpeta del proyecto:** si no se indica otra cosa, los paths son relativos a la raíz de **tu** proyecto (el que creaste en el lab 2.1).

## Resultado esperado

Tres noticias visibles. Consola **sin** aviso *unique "key" prop*.

---

## Paso 1 — Archivo de datos

**Objetivo:** datos fijos fuera de la UI.

Crea **`src/data/noticias.json`** (crea la carpeta `src/data` si hace falta):

```json
[
  {
    "id": "n1",
    "titulo": "Historiadores descubren que el caballo blanco de Santiago era blanco",
    "contenido": "Rem ab, animi ea pariatur praesentium at omnis obcaecati officia ipsum."
  },
  {
    "id": "n2",
    "titulo": "El caballo del ajedrez crea su propio juego de equitación",
    "contenido": "Necessitatibus, sed nostrum fugit consectetur aliquam quaerat repellat."
  },
  {
    "id": "n3",
    "titulo": "La orquesta del buque en el Canal de Suez se niega a dejar de tocar",
    "contenido": "Consectetur et consequatur sint. Quibusdam, nihil quasi modi dolorum."
  }
]
```

**Comprobación:** el JSON es válido; son exactamente 3 elementos.

---

## Paso 2 — Componente `Noticia`

**Objetivo:** encapsular la vista de una noticia.

Crea **`src/components/Noticia.tsx`**:

```tsx
export type NoticiaData = {
  id: string
  titulo: string
  contenido: string
}

type NoticiaProps = {
  noticia: NoticiaData
}

export function Noticia({ noticia }: NoticiaProps) {
  return (
    <article style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
      <h2>{noticia.titulo}</h2>
      <p>{noticia.contenido}</p>
    </article>
  )
}
```

**Comprobación:** TypeScript no marca errores en este archivo.

---

## Paso 3 — Importar JSON en `App`

**Objetivo:** verificar que la importación funciona.

Sustituye **`src/App.tsx`** por:

```tsx
import noticias from './data/noticias.json'

function App() {
  return (
    <div>
      <h1>Noticias</h1>
      <p>Hay {noticias.length} noticias en el JSON.</p>
    </div>
  )
}

export default App
```

**Comprobación:** en el navegador lees `Hay 3 noticias en el JSON.`

---

## Paso 4 — `map` sin `key` (observar el aviso)

**Objetivo:** ver por qué React exige `key`.

Añade el import y el listado **sin** `key`:

```tsx
import noticias from './data/noticias.json'
import { Noticia } from './components/Noticia'

function App() {
  return (
    <div>
      <h1>Noticias</h1>
      {noticias.map((noticia) => (
        <Noticia noticia={noticia} />
      ))}
    </div>
  )
}

export default App
```

Abre la consola del navegador (F12).

**Comprobación:** aparece el warning sobre `key`. Las tres noticias se ven igualmente.

---

## Paso 5 — Añadir `key` estable

**Objetivo:** eliminar el warning usando el `id` del dato.

Cambia solo la línea del `map` a:

```tsx
{noticias.map((noticia) => (
  <Noticia key={noticia.id} noticia={noticia} />
))}
```

**Comprobación:** el warning desaparece; siguen viéndose las 3 noticias.

---

## Paso 6 — Renderizado condicional

**Objetivo:** mostrar un mensaje solo si no hay noticias (aunque aquí siempre hay 3).

Debajo del `<h1>`, añade:

```tsx
{noticias.length === 0 && <p>No hay noticias publicadas.</p>}
```

**Comprobación:** el párrafo **no** se muestra (lista no vacía). Para probarlo, renombra temporalmente el JSON y confirma que el mensaje aparece.

---

## Retos

1. **Reto A:** Añade una cuarta noticia al JSON con `id` único y comprueba que aparece sin tocar el `.map`.
2. **Reto B:** Muestra solo el **título** en la lista y el **contenido** solo si `noticia.id === 'n1'` (operador `&&` o ternario).
3. **Reto C:** ¿Por qué no usar el índice del array como `key`? Escribe dos frases en tu cuaderno.

---

## Qué has practicado

- Importar JSON en Vite/TypeScript.
- `.map()` para listas en TSX.
- Props tipadas y atributo `key` con identificador estable.
- Condicional con `&&`.

**Siguiente:** [Capítulo 4](04-componentes.md) y [4.1 Lab Composición](04-01-lab-composicion.md).
