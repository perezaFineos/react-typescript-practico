import noticias from "./data/noticias.json";
import { Noticia } from "./components/Noticia";

function App() {
  return (
    <div>
      <h1>Noticias</h1>
      {noticias.length === 0 && <p>No hay noticias publicadas.</p>}

      {noticias.map(
        (noticia) =>
          noticia.id === "n1" && <Noticia key={noticia.id} noticia={noticia} />,
      )}
    </div>
  );
}

export default App;
