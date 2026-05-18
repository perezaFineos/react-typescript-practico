# 9. Consumo de APIs

[← Índice](README.md) | [← Anterior: 8. Routing](08-routing.md) | [Siguiente: 10. Organización →](10-organizacion-buenas-practicas.md)

---

## Datos remotos en React

Las peticiones HTTP son **efectos secundarios**: encajan en `useEffect` (o en handlers tras un submit). Lo habitual:

1. Estados para `data`, `loading` y `error`.
2. `fetch` (o axios) dentro del efecto.
3. Actualizar la UI según el estado.

## Ejemplo con `fetch` y TypeScript

API de prueba: [JSONPlaceholder](https://jsonplaceholder.typicode.com/) — usuarios de ejemplo.

```tsx
type Usuario = { id: number; name: string; email: string };

function ListaUsuarios() {
  const [datos, setDatos] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    async function cargar() {
      try {
        setCargando(true);
        setError(null);
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: Usuario[] = await res.json();
        if (!cancelado) setDatos(json);
      } catch (e) {
        if (!cancelado) {
          setError(e instanceof Error ? e.message : 'Error desconocido');
        }
      } finally {
        if (!cancelado) setCargando(false);
      }
    }

    cargar();
    return () => {
      cancelado = true;
    };
  }, []);

  if (cargando) return <p>Cargando…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {datos.map((u) => (
        <li key={u.id}>
          {u.name} — {u.email}
        </li>
      ))}
    </ul>
  );
}
```

### Flag `cancelado`

Si el componente se desmonta antes de que termine el `fetch`, no debes llamar a `setState`. El flag evita avisos y fugas de memoria.

## Separar la llamada API (recomendado)

**`src/services/usuarios.ts`**

```tsx
export type Usuario = { id: number; name: string; email: string };

export async function obtenerUsuarios(): Promise<Usuario[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

El componente solo orquesta estado y UI; el servicio concentra la URL y el parseo.

## Axios (opcional)

```bash
npm install axios
```

```tsx
import axios from 'axios';

const { data } = await axios.get<Usuario[]>('https://jsonplaceholder.typicode.com/users');
```

Misma idea de estados `loading` / `error` / `data`.

---

## Lab: lista de usuarios

### Paso 1 — Servicio

Crea `src/services/usuarios.ts` como arriba.

### Paso 2 — Componente `ListaUsuarios.tsx`

Usa el ejemplo completo de este capítulo importando `obtenerUsuarios` desde el servicio.

### Paso 3 — Integrar

Muestra `<ListaUsuarios />` en `App` o en una ruta `/usuarios` si ya tienes React Router.

### Paso 4 (opcional) — Detalle al hacer clic

- Estado `usuarioId: number | null` en el padre.
- Al pulsar un usuario de la lista, guarda su `id`.
- Segundo `fetch` a `https://jsonplaceholder.typicode.com/users/${id}` o filtra del array ya cargado.

**Entrega:** commit `feat: fetch usuarios jsonplaceholder`.
