# 7.1. Lab — Flujo de datos (padre e hijo)

[← Capítulo 7](07-comunicacion-componentes.md) | [← Lab 6.1](06-01-lab-formulario-contacto.md) | [Índice](README.md) | [Siguiente lab →](08-01-lab-react-router.md)

---

## Objetivo del laboratorio

Practicar el patrón **los datos bajan (props), los eventos suben (callbacks)**: el **padre** guarda el total de clicks; el **hijo** cuenta pulsaciones locales y notifica al padre con una función recibida por props.

## Prerrequisitos

- Haber completado [2.1 Lab Vite](02-01-lab-vite.md) (proyecto React + TypeScript con Vite).
- Servidor de desarrollo en marcha (`npm run dev`) dentro de la carpeta de **tu** proyecto.

> Los paths de archivos (`src/...`) son **relativos a la raíz de tu proyecto Vite**. El nombre de la carpeta no importa; en ejemplos usamos `react-curso-practico` solo como referencia.

## Resultado esperado

Texto «Total de clicks (padre): N» y un botón del hijo que indica cuántas veces se ha pulsado en el hijo; ambos números coinciden tras cada click.

---

## Paso 1 — Crear el hijo sin callback

**Objetivo:** estado local solo en el botón.

Crea **`src/components/ClickCounterButton.tsx`**:

```tsx
import { useState } from 'react'

export function ClickCounterButton() {
  const [clicks, setClicks] = useState(0)

  const handleClick = () => {
    setClicks(clicks + 1)
  }

  return (
    <button type="button" onClick={handleClick}>
      He sido pulsado {clicks} veces (hijo)
    </button>
  )
}
```

**Comprobación:** el botón incrementa su propio contador; el padre aún no sabe nada.

---

## Paso 2 — Tipar la prop de callback

**Objetivo:** contrato entre padre e hijo.

Modifica el hijo para recibir `onClickCountChange`:

```tsx
import { useState } from 'react'

type ClickCounterButtonProps = {
  onClickCountChange: (totalClicks: number) => void
}

export function ClickCounterButton({ onClickCountChange }: ClickCounterButtonProps) {
  const [clicks, setClicks] = useState(0)

  const handleClick = () => {
    const nuevoTotal = clicks + 1
    setClicks(nuevoTotal)
    onClickCountChange(nuevoTotal)
  }

  return (
    <button type="button" onClick={handleClick}>
      He sido pulsado {clicks} veces (hijo)
    </button>
  )
}
```

**Comprobación:** TypeScript exige la prop si importas el componente en otro sitio.

---

## Paso 3 — Estado en el padre (`App`)

**Objetivo:** la fuente de verdad del total global está en el padre.

Sustituye **`src/App.tsx`** por:

```tsx
import { useState } from 'react'
import { ClickCounterButton } from './components/ClickCounterButton'

function App() {
  const [totalClicks, setTotalClicks] = useState(0)

  const handleChildClickCountChange = (totalFromChild: number) => {
    setTotalClicks(totalFromChild)
  }

  return (
    <div>
      <h1>Flujo de datos</h1>
      <p>Total de clicks (padre): {totalClicks}</p>
      <ClickCounterButton onClickCountChange={handleChildClickCountChange} />
    </div>
  )
}

export default App
```

**Comprobación:** cada click actualiza **a la vez** el texto del hijo y el del padre con el mismo número.

---

## Paso 4 — Repasar el flujo

**Objetivo:** verbalizar el patrón unidireccional.

1. El hijo actualiza su `clicks` local.
2. El hijo llama `onClickCountChange(nuevoTotal)`.
3. El padre ejecuta `setTotalClicks`.
4. React vuelve a renderizar padre e hijo con datos coherentes.

**Comprobación:** puedes explicar en dos frases qué baja por props y qué sube por callback.

---

## Retos

1. **Reto A:** Añade un segundo hijo idéntico; ¿el total del padre debería ser la suma de ambos? Implementa dos contadores independientes en el padre.
2. **Reto B:** Pasa el `totalClicks` del padre al hijo como prop `totalGlobal` y muéstralo junto al contador local.
3. **Reto C:** Reset global desde el padre que ponga a 0 padre e hijo (pista: `key` en el hijo o callback `onReset`).

---

## Qué has practicado

- Estado en el componente padre.
- Funciones como props (callbacks).
- Comunicación hijo → padre sin modificar el estado del padre desde el hijo directamente.

**Siguiente:** [Capítulo 8](08-routing.md) y [8.1 Lab React Router](08-01-lab-react-router.md).
