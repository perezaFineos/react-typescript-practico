import { emailValido } from "../utils/validarEmail";
import { useState, type FormEvent } from "react";

export function FormularioContacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const emailOk = emailValido(email);

  const nombreValido = (nombre: string): boolean => {
    return nombre.length >= 2;
  };

  const nombreOk = nombreValido(nombre);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailOk || !nombreOk) return;
    setResumen({ nombre, email, mensaje });
    setNombre("");
    setEmail("");
    setMensaje("");
  };

  type ResumenEnviado = { nombre: string; email: string; mensaje: string };
  const [resumen, setResumen] = useState<ResumenEnviado | null>(null);

  return (
    <form onSubmit={handleSubmit}>
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
      {!nombreOk && nombre.length > 0 && (
        <p style={{ color: "crimson" }}>
          Introduce un nombre de al menos 2 caracteres.
        </p>
      )}

      <label>
        Email
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      {!emailOk && email.length > 0 && (
        <p style={{ color: "crimson" }}>Introduce un email válido.</p>
      )}

      <label>
        Mensaje
        <textarea
          name="mensaje"
          rows={4}
          value={mensaje}
          maxLength={500}
          onChange={(e) => setMensaje(e.target.value)}
        />
        <p>{mensaje.length} / 500 caracteres</p>
      </label>
      <button type="submit" disabled={!emailOk || !nombreOk}>
        Enviar
      </button>

      <button type="reset" onClick={() => setResumen(null)}>
        Nuevo mensaje
      </button>

      {resumen && (
        <div
          style={{ marginTop: "1rem", padding: "1rem", background: "#f0f0f0" }}
        >
          <h3>Resumen enviado</h3>
          <p>
            <strong>Nombre:</strong> {resumen.nombre}
          </p>
          <p>
            <strong>Email:</strong> {resumen.email}
          </p>
          <p>
            <strong>Mensaje:</strong> {resumen.mensaje}
          </p>
        </div>
      )}
    </form>
  );
}
