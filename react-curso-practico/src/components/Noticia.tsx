export type NoticiaData = {
  id: string;
  titulo: string;
  contenido: string;
};

type NoticiaProps = {
  noticia: NoticiaData;
};

export function Noticia({ noticia }: NoticiaProps) {
  return (
    <article
      style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem" }}
    >
      <h2>{noticia.titulo}</h2>
      <p>{noticia.contenido}</p>
    </article>
  );
}
