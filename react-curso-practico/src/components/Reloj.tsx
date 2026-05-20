import { useState, useEffect } from "react";

function formatearHora(fecha: Date): string {
  return fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function Reloj() {
  const [hora, setHora] = useState(() => formatearHora(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => {
      setHora(formatearHora(new Date()));
      console.log("USE_EFFECT");
    }, 500);

    return () => {
      console.log("DESMONTANDO");
      window.clearInterval(id);
    };
  }, []);

  return (
    <div>
      <p>Hora: {hora}</p>
    </div>
  );
}
