# 6. Eventos y formularios

[← Índice](README.md) | [← Anterior: 5. Estado](05-estado-hooks.md) | [Lab 6.1 →](06-01-lab-formulario-contacto.md) | [Siguiente: 7. Comunicación →](07-comunicacion-componentes.md)

---

## Eventos sintéticos

React no usa los eventos nativos directamente, sino **eventos sintéticos** normalizados entre navegadores. La API es muy similar a la del DOM.

Los nombres van en **camelCase**: `onClick`, `onChange`, `onSubmit`.

```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  console.log('Pulsado');
};

<button type="button" onClick={handleClick}>Pulsar</button>
```

### Tipos habituales (TypeScript)

| Evento | Tipo |
|--------|------|
| Click en botón | `React.MouseEvent<HTMLButtonElement>` |
| Cambio en input | `React.ChangeEvent<HTMLInputElement>` |
| Envío de formulario | `React.FormEvent<HTMLFormElement>` |

React elimina los listeners al desmontar el componente; no hace falta hacerlo a mano.

## Inputs controlados

En un input **controlado**, el valor vive en el **estado** y el input lo refleja:

```tsx
const [email, setEmail] = useState('');

<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>;
```

Ventajas: validación en tiempo real, botón deshabilitado según reglas, un solo origen de verdad.

## Formularios

En el `submit` del formulario, llama a `preventDefault()` para evitar la recarga de la página:

```tsx
const [nombre, setNombre] = useState('');
const [mensaje, setMensaje] = useState('');

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log({ nombre, mensaje });
};

<form onSubmit={handleSubmit}>
  <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
  <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
  <button type="submit">Enviar</button>
</form>
```

---

## Lab: formulario de contacto

Crea `src/components/FormularioContacto.tsx`.

### Paso 1 — Estado y tipos

```tsx
import { useState, type FormEvent } from 'react';

type Resumen = { nombre: string; email: string; mensaje: string };

export function FormularioContacto() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState<Resumen | null>(null);

  const emailValido = email.includes('@');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviado({ nombre, email, mensaje });
  };

  return (
    <section>
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Mensaje
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={4}
          />
        </label>
        <button type="submit" disabled={!emailValido}>
          Enviar
        </button>
      </form>

      {enviado && (
        <aside>
          <h3>Resumen enviado</h3>
          <p><strong>{enviado.nombre}</strong> ({enviado.email})</p>
          <p>{enviado.mensaje}</p>
        </aside>
      )}
    </section>
  );
}
```

### Paso 2 — Integrar en `App.tsx`

Importa el formulario y comprueba:

- El botón está deshabilitado si el email no contiene `@`.
- Al enviar, aparece el resumen sin recargar la página.

**Entrega:** commit `feat: formulario contacto controlado`.
