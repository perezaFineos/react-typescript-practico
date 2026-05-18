# 5. Estado y hooks

[← Índice](README.md) | [← Anterior: 4. Componentes](04-componentes.md) | [Lab 5.1 →](05-01-lab-useState.md) | [Siguiente: 6. Eventos →](06-eventos-formularios.md)

---

## ¿Qué es el estado?

El **estado** son datos que pertenecen al componente y que, al cambiar, provocan un **nuevo renderizado**. Las props vienen del padre; el estado se gestiona dentro del componente (o se eleva al padre, capítulo 7).

## Reglas de los hooks

1. Solo llamar hooks en el **nivel superior** del componente (no dentro de `if`, bucles ni funciones anidadas).
2. Solo llamar hooks desde **componentes funcionales** o hooks personalizados.

## `useState`

```tsx
import { useState } from 'react';

function Contador() {
  const [cuenta, setCuenta] = useState(0);

  return (
    <div>
      <button type="button" onClick={() => setCuenta((c) => c - 1)}>-</button>
      <span>{cuenta}</span>
      <button type="button" onClick={() => setCuenta((c) => c + 1)}>+</button>
    </div>
  );
}
```

- `useState(valorInicial)` devuelve `[valor, setValor]`.
- Puedes tener varios `useState` en el mismo componente.
- Si el nuevo valor depende del anterior, usa la forma funcional: `setCuenta((c) => c + 1)`.

Con TypeScript puedes tipar el estado:

```tsx
const [nombre, setNombre] = useState<string>('');
const [items, setItems] = useState<Producto[]>([]);
```

## `useEffect`

Sirve para **efectos secundarios**: timers, suscripciones, peticiones HTTP, sincronizar con APIs del navegador.

```tsx
import { useEffect, useState } from 'react';

function Reloj() {
  const [hora, setHora] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    const id = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(id); // cleanup al desmontar
  }, []); // [] = solo al montar

  return <p>{hora}</p>;
}
```

### Array de dependencias

| Dependencias | Cuándo se ejecuta el efecto |
|--------------|-----------------------------|
| `[]` | Solo tras el primer render (montaje) |
| `[a, b]` | Al montar y cuando `a` o `b` cambian |
| omitido | Tras **cada** render (usar con cuidado) |

Siempre que crees intervalos, listeners o suscripciones, devuelve una función de **limpieza** en el `return` del efecto.

---

## Lab A: contador con `useState`

**Archivo:** `src/components/Contador.tsx`

```tsx
import { useState } from 'react';

export function Contador() {
  const [cuenta, setCuenta] = useState(0);

  return (
    <div>
      <button type="button" onClick={() => setCuenta((c) => c - 1)}>-</button>
      <span>Cuenta: {cuenta}</span>
      <button type="button" onClick={() => setCuenta((c) => c + 1)}>+</button>
      <button type="button" onClick={() => setCuenta(0)}>Reset</button>
    </div>
  );
}
```

Importa `<Contador />` en `App.tsx`.

## Lab B: reloj con `useEffect`

**Archivo:** `src/components/Reloj.tsx` — código del ejemplo anterior.

Comprueba en React DevTools que al desmontar el componente (quitarlo de `App`) el intervalo se limpia (no debe seguir actualizando en segundo plano).

## Lab C (opcional): input reflejado

```tsx
function Eco() {
  const [texto, setTexto] = useState('');

  return (
    <div>
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe algo"
      />
      <p>Vista previa: {texto || '(vacío)'}</p>
    </div>
  );
}
```

**Entrega:** commit `feat: contador y reloj con hooks`.
