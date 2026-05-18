# 4.1. Lab — Composición con `children` (Tarjeta y lista)

[← Capítulo 4](04-componentes.md) | [← Lab 3.1](03-01-lab-lista-noticias.md) | [Índice](README.md) | [Siguiente lab →](05-01-lab-useState.md)

---

## Objetivo del laboratorio

Crear un componente **Tarjeta** reutilizable que reciba **`children`**, usarlo dentro de **ListaProductos** y montar todo en **App**. Practicarás composición sin duplicar estilos de contenedor.

## Prerrequisitos

- Haber completado [2.1 Lab Vite](02-01-lab-vite.md) (proyecto React + TypeScript con Vite).
- Servidor de desarrollo en marcha (`npm run dev`) dentro de la carpeta de **tu** proyecto.

> Los paths de archivos (`src/...`) son **relativos a la raíz de tu proyecto Vite**. El nombre de la carpeta no importa; en ejemplos usamos `react-curso-practico` solo como referencia.

## Resultado esperado

Pantalla con el título «Catálogo» y varias tarjetas con borde; cada tarjeta muestra nombre y precio de un producto ficticio.

---

## Paso 1 — Tipo `Producto`

**Objetivo:** definir la forma de los datos antes de los componentes.

Crea **`src/types/producto.ts`**:

```tsx
export type Producto = {
  id: string
  nombre: string
  precio: number
}
```

**Comprobación:** el archivo guarda sin errores de TypeScript.

---

## Paso 2 — Componente `Tarjeta` con `children`

**Objetivo:** un contenedor visual que acepte cualquier contenido interno vía `children`.

Crea **`src/components/Tarjeta.tsx`**:

```tsx
import type { ReactNode } from 'react'

type TarjetaProps = {
  children: ReactNode
  titulo?: string
}

export function Tarjeta({ children, titulo }: TarjetaProps) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
    }}>
      {titulo ? <h3 style={{ marginTop: 0 }}>{titulo}</h3> : null}
      {children}
    </div>
  )
}
```

**Comprobación:** puedes importar `Tarjeta` en otro archivo sin error del editor.

---

## Paso 3 — Probar `Tarjeta` en `App`

**Objetivo:** verificar que `children` se renderiza antes de la lista completa.

Sustituye **`src/App.tsx`** por:

```tsx
import { Tarjeta } from './components/Tarjeta'

function App() {
  return (
    <div>
      <h1>Composición</h1>
      <Tarjeta titulo="Prueba">
        <p>Contenido dentro de la tarjeta.</p>
      </Tarjeta>
    </div>
  )
}

export default App
```

**Comprobación:** en el navegador ves el título, la tarjeta con borde y el párrafo interior.

---

## Paso 4 — Datos de productos

**Objetivo:** lista fija en memoria (sin API).

Crea **`src/data/productos.ts`**:

```tsx
import type { Producto } from '../types/producto'

export const productos: Producto[] = [
  { id: 'p1', nombre: 'Teclado mecánico', precio: 89.99 },
  { id: 'p2', nombre: 'Ratón ergonómico', precio: 45.5 },
  { id: 'p3', nombre: 'Monitor 27"', precio: 249 },
]
```

**Comprobación:** `productos.length` es 3.

---

## Paso 5 — Componente `ListaProductos`

**Objetivo:** mapear productos y delegar el layout de cada ítem a `Tarjeta`.

Crea **`src/components/ListaProductos.tsx`**:

```tsx
import { Tarjeta } from './Tarjeta'
import type { Producto } from '../types/producto'

type ListaProductosProps = {
  items: Producto[]
}

export function ListaProductos({ items }: ListaProductosProps) {
  return (
    <div>
      {items.map((producto) => (
        <Tarjeta key={producto.id} titulo={producto.nombre}>
          <p>Precio: {producto.precio.toFixed(2)} €</p>
        </Tarjeta>
      ))}
    </div>
  )
}
```

**Comprobación:** TypeScript no se queja de `items` ni de `key`.

---

## Paso 6 — Integrar en `App`

**Objetivo:** componer la aplicación con un solo componente de lista.

Sustituye **`src/App.tsx`** por:

```tsx
import { ListaProductos } from './components/ListaProductos'
import { productos } from './data/productos'

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Catálogo</h1>
      <ListaProductos items={productos} />
    </div>
  )
}

export default App
```

**Comprobación:** ves tres tarjetas con nombre y precio; consola sin warnings de `key`.

---

## Retos

1. **Reto A:** Añade un pie opcional en `Tarjeta` con otra prop `pie?: ReactNode` y muéstralo debajo de `children`.
2. **Reto B:** Ordena los productos por precio descendente antes del `.map()` (sin mutar el array original: usa `[...items].sort(...)`).
3. **Reto C:** Extrae los estilos inline de `Tarjeta` a una clase CSS en `index.css`.

---

## Qué has practicado

- Prop `children` tipada con `ReactNode`.
- Composición: componentes pequeños que se ensamblan en `App`.
- Reutilizar UI (`Tarjeta`) en un listado con `.map()` y `key`.

**Siguiente:** [Capítulo 5](05-estado-hooks.md) y [5.1 Lab useState](05-01-lab-useState.md).
