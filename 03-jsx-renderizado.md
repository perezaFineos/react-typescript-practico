# 3. JSX y renderizado

[← Índice](README.md) | [← Anterior: 2. Entorno](02-entorno-desarrollo.md) | [Lab 3.1 →](03-01-lab-lista-noticias.md) | [Siguiente: 4. Componentes →](04-componentes.md)

---

## TSX (JSX + TypeScript)

En archivos **`.tsx`** mezclas marcado y lógica. El compilador transforma TSX en llamadas a `React.createElement` (o equivalente del runtime moderno).

```tsx
const titulo = 'Hola mundo';

function Saludo() {
  return <h1>{titulo}</h1>;
}
```

Reglas básicas:

- Un componente debe devolver **un solo elemento raíz** (o un fragmento `<>...</>`).
- Atributos HTML usan **camelCase** en React: `className`, `htmlFor`, `onClick`.
- Etiquetas vacías se cierran solas: `<img src="..." alt="" />`.

## Expresiones embebidas

Entre `{ }` va cualquier **expresión** JavaScript válida: variables, operadores, llamadas a funciones.

```tsx
const deshabilitado = true;

<button type="button" disabled={deshabilitado}>
  Botón {deshabilitado ? 'deshabilitado' : 'habilitado'}
</button>
```

No puedes poner sentencias (`if`, `for`) directamente dentro de `{ }`; usa operadores ternarios, `&&` o extrae lógica antes del `return`.

## Renderizado condicional

### Operador ternario

Muestra un elemento u otro según la condición:

```tsx
function AuthBotones({ logueado }: { logueado: boolean }) {
  return (
    <div>
      {logueado ? <button type="button">Logout</button> : <button type="button">Login</button>}
    </div>
  );
}
```

### Operador `&&`

Si solo quieres mostrar algo cuando la condición es verdadera:

```tsx
{error && <p className="error">{error}</p>}
```

Equivale a «si hay error, pinta el párrafo».

### `if` fuera del JSX

Para ramas largas, usa `if` antes del `return`:

```tsx
function Panel({ logueado }: { logueado: boolean }) {
  if (!logueado) {
    return <p>Debes iniciar sesión</p>;
  }
  return <p>Contenido privado</p>;
}
```

## Listas y `.map()`

Para iterar un array y generar elementos:

```tsx
type Noticia = { id: number; titulo: string };

const noticias: Noticia[] = [
  { id: 1, titulo: 'React 19' },
  { id: 2, titulo: 'TypeScript 5.5' },
];

<ul>
  {noticias.map((n) => (
    <li key={n.id}>{n.titulo}</li>
  ))}
</ul>
```

## Atributo `key`

React exige una **`key` estable y única** entre hermanos de una lista. Ayuda a reconciliar cambios sin repintar toda la lista.

```tsx
// Evitar: la posición cambia si reordenas o borras
items.map((item, index) => <li key={index}>{item.texto}</li>);

// Preferible: identificador del dato
items.map((item) => <li key={item.id}>{item.texto}</li>);
```

Si no pones `key`, verás un aviso en consola: *Each child in a list should have a unique "key" prop*.

---

## Lab: render dinámico y condicional

En `mi-app`, edita `App.tsx` o crea `src/ListaDemo.tsx` e impórtalo desde `App`.

### Paso 1 — Datos tipados

```tsx
type Tarea = { id: number; texto: string; hecha: boolean };

const tareasIniciales: Tarea[] = [
  { id: 1, texto: 'Configurar Vite', hecha: true },
  { id: 2, texto: 'Practicar TSX', hecha: false },
  { id: 3, texto: 'Añadir router', hecha: false },
];
```

### Paso 2 — Estado y lista

```tsx
import { useState } from 'react';

function ListaDemo() {
  const [tareas, setTareas] = useState(tareasIniciales);
  const [soloPendientes, setSoloPendientes] = useState(false);

  const visibles = soloPendientes ? tareas.filter((t) => !t.hecha) : tareas;

  return (
    <section>
      <h2>Tareas</h2>
      <label>
        <input
          type="checkbox"
          checked={soloPendientes}
          onChange={(e) => setSoloPendientes(e.target.checked)}
        />
        Solo pendientes
      </label>
      <ul>
        {visibles.map((t) => (
          <li key={t.id}>
            {t.hecha ? '✓ ' : '○ '}
            {t.texto}
          </li>
        ))}
      </ul>
      {visibles.length === 0 && <p>No hay tareas que mostrar.</p>}
    </section>
  );
}

export default ListaDemo;
```

### Paso 3 — Comprobar

- Alterna el checkbox: la lista se filtra (condicional + `map`).
- Añade una tarea más al array y verifica que cada `key={t.id}` sigue siendo única.

**Entrega:** commit `feat: lista condicional con keys`.
