# 5.2. Lab — `useEffect`: reloj en vivo

[← Capítulo 5](05-estado-hooks.md) | [← Lab 5.1](05-01-lab-useState.md) | [Índice](README.md) | [Siguiente lab →](06-01-lab-formulario-contacto.md)

---

## Objetivo del laboratorio

Mostrar la **hora actual** que se actualiza cada segundo con `setInterval`, usando `useEffect` con **array de dependencias vacío** y **función de limpieza** al desmontar.

## Prerrequisitos

- Haber completado [2.1 Lab Vite](02-01-lab-vite.md) (proyecto React + TypeScript con Vite).
- Servidor de desarrollo en marcha (`npm run dev`) dentro de la carpeta de **tu** proyecto.

> Los paths de archivos (`src/...`) son **relativos a la raíz de tu proyecto Vite**. El nombre de la carpeta no importa; en ejemplos usamos `react-curso-practico` solo como referencia.

## Resultado esperado

Un reloj digital (`HH:MM:SS`) que avanza cada segundo. Si desmontas el componente (ver paso opcional), el intervalo se cancela.

---

## Paso 1 — Estado de la hora

**Objetivo:** guardar el texto a mostrar en React.

Crea **`src/components/Reloj.tsx`**:

```tsx
import { useState } from 'react'

function formatearHora(fecha: Date): string {
  return fecha.toLocaleTimeString('es-ES', { hour12: false })
}

export function Reloj() {
  const [hora, setHora] = useState(() => formatearHora(new Date()))

  return (
    <div>
      <p>Hora: {hora}</p>
    </div>
  )
}
```

**Comprobación:** la hora se muestra pero **no** se actualiza sola todavía.

---

## Paso 2 — `useEffect` con intervalo

**Objetivo:** sincronizar el estado con el reloj del sistema cada segundo.

Añade el import y el efecto en **`src/components/Reloj.tsx`**:

```tsx
import { useState, useEffect } from 'react'

function formatearHora(fecha: Date): string {
  return fecha.toLocaleTimeString('es-ES', { hour12: false })
}

export function Reloj() {
  const [hora, setHora] = useState(() => formatearHora(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => {
      setHora(formatearHora(new Date()))
    }, 1000)

    return () => {
      window.clearInterval(id)
    }
  }, [])

  return (
    <div>
      <p>Hora: {hora}</p>
    </div>
  )
}
```

- `[]` como segundo argumento: el efecto solo se monta **una vez**.
- El `return () => clearInterval(...)` es la **limpieza** al desmontar.

**Comprobación:** los segundos avanzan en el navegador.

---

## Paso 3 — Montar en `App`

**Objetivo:** ver el reloj en la aplicación principal.

Sustituye **`src/App.tsx`** por:

```tsx
import { Reloj } from './components/Reloj'

function App() {
  return (
    <div>
      <h1>Reloj con useEffect</h1>
      <Reloj />
    </div>
  )
}

export default App
```

**Comprobación:** título + hora en vivo.

---

## Paso 4 — (Opcional) Comprobar la limpieza

**Objetivo:** entender por qué hace falta `clearInterval`.

Añade en `App` un estado para mostrar u ocultar el reloj:

```tsx
import { useState } from 'react'
import { Reloj } from './components/Reloj'

function App() {
  const [visible, setVisible] = useState(true)

  return (
    <div>
      <h1>Reloj con useEffect</h1>
      <button type="button" onClick={() => setVisible((v) => !v)}>
        {visible ? 'Ocultar' : 'Mostrar'} reloj
      </button>
      {visible ? <Reloj /> : <p>Reloj desmontado</p>}
    </div>
  )
}

export default App
```

Abre la consola, pon un `console.log` temporal dentro del efecto y otro en la limpieza. Oculta el reloj: debe ejecutarse la limpieza.

**Comprobación:** al ocultar, no quedan intervalos activos (sin logs repetidos tras desmontar).

---

## Retos

1. **Reto A:** Muestra también la fecha (`toLocaleDateString`).
2. **Reto B:** Cambia el intervalo a 500 ms y observa el comportamiento.
3. **Reto C:** ¿Qué pasaría si omitieras el array `[]`? Prueba y anota en una frase.

---

## Qué has practicado

- Efectos secundarios con `useEffect`.
- Temporizadores y **cleanup** al desmontar.
- Dependencias vacías para ejecutar solo al montar.

**Siguiente:** [Capítulo 6](06-eventos-formularios.md) y [6.1 Lab formulario](06-01-lab-formulario-contacto.md).
