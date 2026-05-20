export function emailValido(email: string): boolean {
  const texto = email.trim();
  if (texto.length < 5) return false;
  const arroba = texto.indexOf("@");
  const punto = texto.lastIndexOf(".");
  return arroba > 0 && punto > arroba + 1 && punto < texto.length - 1;
}
