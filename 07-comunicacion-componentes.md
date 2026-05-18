# 7. Comunicación entre componentes

[← Índice](README.md) | [← Anterior: 6. Eventos](06-eventos-formularios.md) | [Siguiente: 8. Routing →](08-routing.md)

---

## Flujo unidireccional de datos

En React los datos **bajan** por **props** (de padres a hijos). Los hijos **no modifican** las props; si necesitan avisar al padre, llaman a una **función** recibida por props.

```
Padre (estado) ──props──> Hijo
Padre <──callback── Hijo (evento)
```

Este patrón se resume así: **los datos bajan, los eventos suben**.

## Callbacks en props

```tsx
type HijoProps = {
  valor: number;
  onIncrementar: () => void;
};

function Hijo({ valor, onIncrementar }: HijoProps) {
  return (
    <button type="button" onClick={onIncrementar}>
      Total: {valor}
    </button>
  );
}

function Padre() {
  const [total, setTotal] = useState(0);
  return (
    <Hijo
      valor={total}
      onIncrementar={() => setTotal((t) => t + 1)}
    />
  );
}
```

## Elevación de estado

Si dos **hermanos** deben mostrar o modificar los mismos datos, **sube el estado** al ancestro común más cercano y pásalo a cada hijo por props.

Ejemplo: lista de opciones + panel de detalle → el `id` seleccionado vive en el padre, no en cada hijo por separado.

---

## Lab: contador padre / hijo

### Paso 1 — `ClickCounterButton.tsx`

```tsx
import { useState } from 'react';

type Props = {
  onClickCountChange: (totalClicks: number) => void;
};

export function ClickCounterButton({ onClickCountChange }: Props) {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    const nuevoTotal = clicks + 1;
    setClicks(nuevoTotal);
    onClickCountChange(nuevoTotal);
  };

  return (
    <button type="button" onClick={handleClick}>
      Pulsado {clicks} veces (hijo)
    </button>
  );
}
```

### Paso 2 — `App.tsx`

```tsx
import { useState } from 'react';
import { ClickCounterButton } from './components/ClickCounterButton';

function App() {
  const [totalClicks, setTotalClicks] = useState(0);

  return (
    <main>
      <h1>Flujo de datos</h1>
      <p>Total registrado en el padre: {totalClicks}</p>
      <ClickCounterButton onClickCountChange={setTotalClicks} />
    </main>
  );
}

export default App;
```

Observa: el hijo tiene su propio contador local **y** notifica al padre en cada click. En ejercicios más avanzados podrías dejar solo el estado en el padre (fuente única de verdad).

---

## Lab B (opcional): lista + detalle

1. Estado en `App`: `seleccionado: string | null`.
2. `ListaOpciones` recibe `opciones: { id: string; label: string }[]` y `onSeleccionar(id: string)`.
3. `Detalle` recibe `id: string | null` y muestra la etiqueta o «Nada seleccionado».

Sin Redux ni Context: todo en el padre.

**Entrega:** commit `feat: flujo datos padre hijo`.
