# 5.1. Lab — `useState`: contador incremental

[← Capítulo 5](05-estado-hooks.md) | [← Lab 4.1](04-01-lab-composicion.md) | [Índice](README.md) | [Siguiente lab →](05-02-lab-useEffect-reloj.md)

---

## Objetivo del laboratorio

Construir un **contador** paso a paso: primero botones sin estado, luego `useState`, mostrar el valor, enlazar `onClick` y añadir **reinicio**. Todo en componentes **funcionales** (no clases).

## Prerrequisitos

- Haber completado [2.1 Lab Vite](02-01-lab-vite.md) (proyecto React + TypeScript con Vite).
- Servidor de desarrollo en marcha (`npm run dev`) dentro de la carpeta de **tu** proyecto.

> Los paths de archivos (`src/...`) son **relativos a la raíz de tu proyecto Vite**. El nombre de la carpeta no importa; en ejemplos usamos `react-curso-practico` solo como referencia.

## Resultado esperado

Botones **−** y **+** que modifican un número visible, y un botón **Reiniciar** que vuelve a 0.

---

## Paso 1 — Arrancar el proyecto

**Objetivo:** tener el servidor listo.

En la carpeta de tu proyecto:

```bash
npm run dev
```

Abre la URL que indique Vite (suele ser `http://localhost:5173`).

**Comprobación:** la app carga sin error en consola.

---

## Paso 2 — `Contador` sin estado

**Objetivo:** maquetar la UI antes de añadir lógica.

Crea **`src/components/Contador.tsx`**:

```tsx
export function Contador() {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <button type="button">−</button>
      <span>Cuenta: </span>
      <button type="button">+</button>
    </div>
  )
}
```

**Comprobación:** los botones se ven pero no cambian ningún número al pulsar.

---

## Paso 3 — Mostrar `Contador` en `App`

**Objetivo:** integrar el componente en la raíz.

Sustituye **`src/App.tsx`** por:

```tsx
import { Contador } from './components/Contador'

function App() {
  return (
    <div>
      <h1>useState</h1>
      <Contador />
    </div>
  )
}

export default App
```

**Comprobación:** ves el contador bajo el título en el navegador.

---

## Paso 4 — Importar y declarar `useState`

**Objetivo:** reservar el estado `cuenta` con valor inicial 0.

En **`src/components/Contador.tsx`**, añade el import y el hook (los botones siguen sin `onClick`):

```tsx
import { useState } from 'react'

export function Contador() {
  const [cuenta, setCuenta] = useState(0)

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <button type="button">−</button>
      <span>Cuenta: </span>
      <button type="button">+</button>
    </div>
  )
}
```

**Comprobación:** no hay errores de TypeScript; el valor aún no se muestra en pantalla.

---

## Paso 5 — Mostrar el valor en el `<span>`

**Objetivo:** enlazar la vista al estado.

Cambia el `<span>` a:

```tsx
<span>Cuenta: {cuenta}</span>
```

**Comprobación:** siempre lees `Cuenta: 0` (los botones aún no modifican el estado).

---

## Paso 6 — `onClick` en + y −

**Objetivo:** actualizar el estado con `setCuenta`.

Sustituye los botones por:

```tsx
<button type="button" onClick={() => setCuenta(cuenta - 1)}>−</button>
<span>Cuenta: {cuenta}</span>
<button type="button" onClick={() => setCuenta(cuenta + 1)}>+</button>
```

**Comprobación:** al pulsar + y − el número cambia en pantalla sin recargar la página.

---

## Paso 7 — Botón Reiniciar

**Objetivo:** volver al valor inicial con una sola acción.

Añade después del botón **+**:

```tsx
<button type="button" onClick={() => setCuenta(0)}>Reiniciar</button>
```

**Comprobación:** tras varios clics en +, **Reiniciar** deja la cuenta en 0.

---

## Retos

1. **Reto A:** Impide bajar de 0 (no permitir negativos).
2. **Reto B:** Usa la forma funcional de `setCuenta`: `setCuenta((c) => c + 1)`.
3. **Reto C:** Muestra un mensaje «¡Máximo alcanzado!» cuando `cuenta === 10`.

---

## Qué has practicado

- `useState` con valor inicial y par `[valor, setter]`.
- Eventos `onClick` en componentes funcionales.
- Renderizado que reacciona al cambio de estado.

**Siguiente:** [5.2 Lab useEffect — reloj](05-02-lab-useEffect-reloj.md).
