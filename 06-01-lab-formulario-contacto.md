# 6.1. Lab — Formulario de contacto controlado

[← Capítulo 6](06-eventos-formularios.md) | [← Lab 5.2](05-02-lab-useEffect-reloj.md) | [Índice](README.md) | [Siguiente lab →](07-01-lab-flujo-datos.md)

---

## Objetivo del laboratorio

Formulario **controlado** con campos nombre, email y mensaje; validar email; deshabilitar envío si es inválido; `preventDefault` en submit y mostrar un **resumen** enviado.

## Prerrequisitos

- Haber completado [2.1 Lab Vite](02-01-lab-vite.md) (proyecto React + TypeScript con Vite).
- Servidor de desarrollo en marcha (`npm run dev`) dentro de la carpeta de **tu** proyecto.

> Los paths de archivos (`src/...`) son **relativos a la raíz de tu proyecto Vite**. El nombre de la carpeta no importa; en ejemplos usamos `react-curso-practico` solo como referencia.

## Resultado esperado

Formulario con tres campos; el botón **Enviar** deshabilitado si el email no es válido; tras enviar, un bloque de resumen con los datos (el formulario puede vaciarse o quedar como prefieras en el último paso).

---

## Paso 1 — Esqueleto del formulario

**Objetivo:** estructura HTML sin estado.

Crea **`src/components/FormularioContacto.tsx`**:

```tsx
export function FormularioContacto() {
  return (
    <form>
      <h2>Contacto</h2>
      <label>
        Nombre
        <input type="text" name="nombre" />
      </label>
      <label>
        Email
        <input type="email" name="email" />
      </label>
      <label>
        Mensaje
        <textarea name="mensaje" rows={4} />
      </label>
      <button type="submit">Enviar</button>
    </form>
  )
}
```

Añade estilos mínimos en **`src/App.css`** si quieres (opcional): `label { display: block; margin-bottom: 1rem; }`.

Monta en **`src/App.tsx`**:

```tsx
import { FormularioContacto } from './components/FormularioContacto'

function App() {
  return (
    <div>
      <h1>Formulario</h1>
      <FormularioContacto />
    </div>
  )
}

export default App
```

**Comprobación:** el formulario se ve; al pulsar Enviar la página **se recarga** (comportamiento por defecto del navegador).

---

## Paso 2 — Estado para los tres campos

**Objetivo:** un `useState` por campo (patrón controlado).

Sustituye el contenido de **`src/components/FormularioContacto.tsx`** por:

```tsx
import { useState } from 'react'

export function FormularioContacto() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')

  return (
    <form>
      <h2>Contacto</h2>
      <label>
        Nombre
        <input
          type="text"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Mensaje
        <textarea
          name="mensaje"
          rows={4}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
      </label>
      <button type="submit">Enviar</button>
    </form>
  )
}
```

**Comprobación:** lo que escribes en cada campo queda reflejado al borrar y volver a escribir (control total desde React).

---

## Paso 3 — Función de validación de email

**Objetivo:** regla simple reutilizable.

Crea **`src/utils/validarEmail.ts`**:

```tsx
export function emailValido(email: string): boolean {
  const texto = email.trim()
  if (texto.length < 5) return false
  const arroba = texto.indexOf('@')
  const punto = texto.lastIndexOf('.')
  return arroba > 0 && punto > arroba + 1 && punto < texto.length - 1
}
```

En **`FormularioContacto.tsx`**, importa y calcula:

```tsx
import { emailValido } from '../utils/validarEmail'

// dentro del componente:
const emailOk = emailValido(email)
```

**Comprobación:** con `email` vacío, `emailOk` es `false`; con `a@b.co` es `true`.

---

## Paso 4 — Deshabilitar el botón Enviar

**Objetivo:** feedback antes de enviar.

Cambia el botón a:

```tsx
<button type="submit" disabled={!emailOk}>
  Enviar
</button>
```

Opcional: muestra un aviso junto al campo email:

```tsx
{!emailOk && email.length > 0 && (
  <p style={{ color: 'crimson' }}>Introduce un email válido.</p>
)}
```

**Comprobación:** con `test@` el botón sigue deshabilitado; con `test@ejemplo.com` se habilita.

---

## Paso 5 — `preventDefault` y estado «enviado»

**Objetivo:** capturar el submit sin recargar la página.

Añade estado y manejador en **`FormularioContacto.tsx`** (importa `FormEvent` desde `react`):

```tsx
import { useState, type FormEvent } from 'react'

const [enviado, setEnviado] = useState(false)

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  if (!emailOk) return
  setEnviado(true)
}
```

Enlaza el formulario:

```tsx
<form onSubmit={handleSubmit}>
```

**Comprobación:** al enviar con email válido la página **no** se recarga.

---

## Paso 6 — Resumen tras enviar

**Objetivo:** mostrar los datos capturados.

Debajo del `</form>` (o dentro del mismo componente), añade:

```tsx
{enviado && (
  <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f0f0' }}>
    <h3>Resumen enviado</h3>
    <p><strong>Nombre:</strong> {nombre}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Mensaje:</strong> {mensaje}</p>
  </div>
)}
```

**Comprobación:** tras Enviar ves el bloque de resumen con los tres valores.

---

## Paso 7 — Limpiar campos tras enviar (opcional recomendado)

**Objetivo:** dejar el formulario listo para otro mensaje.

Dentro de `handleSubmit`, después de `setEnviado(true)`:

```tsx
setNombre('')
setEmail('')
setMensaje('')
```

**Comprobación:** los inputs quedan vacíos pero el resumen sigue mostrando lo que se envió (guarda una copia en otro estado si quieres que el resumen no se borre al limpiar — reto).

---

## Retos

1. **Reto A:** Exige nombre de al menos 2 caracteres para habilitar Enviar.
2. **Reto B:** Añade contador de caracteres del mensaje (máx. 500).
3. **Reto C:** Botón «Nuevo mensaje» que oculta el resumen y pone `enviado` a `false`.

---

## Qué has practicado

- Inputs controlados (`value` + `onChange`).
- Validación en el cliente y `disabled` en botones.
- `onSubmit` y `preventDefault`.

**Siguiente:** [Capítulo 7](07-comunicacion-componentes.md) y [7.1 Lab flujo de datos](07-01-lab-flujo-datos.md).
