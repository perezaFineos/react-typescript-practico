import { useState } from "react";

export function Contador() {
  const [cuenta, setCuenta] = useState(0);

  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <button
        disabled={cuenta <= 0}
        type="button"
        onClick={() => setCuenta((c) => c - 1)}
      >
        −
      </button>
      <span>Cuenta: {cuenta}</span>
      <button
        disabled={cuenta >= 10}
        type="button"
        onClick={() => setCuenta((c) => c + 1)}
      >
        +
      </button>
      {cuenta === 10 && <span>¡Máximo alcanzado!</span>}
      <button type="button" onClick={() => setCuenta(0)}>
        Reiniciar
      </button>
    </div>
  );
}
