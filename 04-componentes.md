# 4. Componentes en React

[← Índice](README.md) | [← Anterior: 3. JSX](03-jsx-renderizado.md) | [Lab 4.1 →](04-01-lab-composicion.md) | [Siguiente: 5. Estado →](05-estado-hooks.md)

---

## Componentes funcionales

Un componente es una **función** que devuelve TSX. Es la forma recomendada en React moderno (con hooks sustituyen a gran parte de los componentes de clase).

```tsx
type SaludoProps = {
  nombre: string;
};

function Saludo({ nombre }: SaludoProps) {
  return <p>Hola, {nombre}</p>;
}

export default Saludo;
```

Convenciones:

- Nombre del componente en **PascalCase** (`Saludo`, `ListaProductos`).
- Un archivo por componente reutilizable (`Saludo.tsx`).
- `export default` para el componente principal del archivo.

## Props (propiedades)

Las **props** son datos que el **padre** pasa al **hijo**. Son de solo lectura: el hijo no debe mutarlas.

```tsx
<Tarjeta titulo="Oferta" precio={19.99} destacado />
```

En TypeScript defines un tipo para las props:

```tsx
type TarjetaProps = {
  titulo: string;
  precio: number;
  destacado?: boolean; // opcional
};

function Tarjeta({ titulo, precio, destacado = false }: TarjetaProps) {
  return (
    <article className={destacado ? 'tarjeta destacada' : 'tarjeta'}>
      <h2>{titulo}</h2>
      <p>{precio.toFixed(2)} €</p>
    </article>
  );
}
```

Si el padre cambia las props, React vuelve a renderizar el hijo con los nuevos valores.

## Composición con `children`

En lugar de pasar muchas props sueltas, puedes anidar contenido:

```tsx
type CajaProps = {
  children: React.ReactNode;
  titulo?: string;
};

function Caja({ children, titulo }: CajaProps) {
  return (
    <section className="caja">
      {titulo && <h2>{titulo}</h2>}
      {children}
    </section>
  );
}

function App() {
  return (
    <Caja titulo="Productos">
      <p>Contenido libre dentro de la caja.</p>
      <ul>
        <li>Item 1</li>
      </ul>
    </Caja>
  );
}
```

`React.ReactNode` acepta texto, elementos, fragmentos o arrays de ellos.

## Reutilización

El mismo componente con distintas props genera **instancias** independientes en el árbol:

```tsx
<Saludo nombre="Ana" />
<Saludo nombre="Luis" />
```

Cada instancia mantiene su propio estado si lo tiene internamente.

---

## Lab: composición de componentes

Crea la carpeta `src/components/` en `mi-app`.

### Paso 1 — `Tarjeta.tsx`

```tsx
type TarjetaProps = {
  titulo: string;
  children: React.ReactNode;
};

export function Tarjeta({ titulo, children }: TarjetaProps) {
  return (
    <article className="tarjeta">
      <h3>{titulo}</h3>
      {children}
    </article>
  );
}
```

### Paso 2 — `ListaProductos.tsx`

```tsx
import { Tarjeta } from './Tarjeta';

export type Producto = { id: number; nombre: string; precio: number };

type ListaProductosProps = {
  productos: Producto[];
};

export function ListaProductos({ productos }: ListaProductosProps) {
  return (
    <div className="grid">
      {productos.map((p) => (
        <Tarjeta key={p.id} titulo={p.nombre}>
          <p>{p.precio.toFixed(2)} €</p>
        </Tarjeta>
      ))}
    </div>
  );
}
```

### Paso 3 — Usar en `App.tsx`

```tsx
import { ListaProductos } from './components/ListaProductos';

const productos = [
  { id: 1, nombre: 'Teclado', precio: 49.9 },
  { id: 2, nombre: 'Ratón', precio: 24.5 },
];

function App() {
  return (
    <main>
      <h1>Tienda demo</h1>
      <ListaProductos productos={productos} />
    </main>
  );
}

export default App;
```

Opcional: añade estilos mínimos en `App.css` (`.grid`, `.tarjeta`).

**Entrega:** commit `feat: tarjeta y lista productos`.
