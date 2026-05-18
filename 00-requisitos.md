# Requisitos

[← Índice](README.md) | [Siguiente: 1. Introducción →](01-introduccion-react-ecosistema.md)

---

## Entorno recomendado: GitHub Codespaces

1. Haz **fork** de este repositorio en tu cuenta de GitHub.
2. Abre un **Codespace**: en el repo, *Code* → *Codespaces* → *Create codespace on main*.
3. Crea el proyecto de práctica (lo usarás en todos los labs):

```bash
npm create vite@latest mi-app -- --template react-ts
cd mi-app
npm install
npm run dev
```

Abre la URL que muestra la terminal (por defecto `http://localhost:5173`). Cada capítulo añade código en esa misma carpeta `mi-app`.

## Extensiones y configuración

Este repositorio incluye:

- `.devcontainer/` — contenedor con Node.js listo para el curso.
- `.vscode/extensions.json` — ESLint, Prettier y snippets útiles para React.

No hace falta instalar nada extra en el Codespace; al abrirlo, VS Code/Cursor sugerirá las extensiones.

## En local (alternativa)

Si trabajas en tu máquina:

| Requisito | Detalle |
|-----------|---------|
| Node.js | Versión LTS (18 o superior recomendada) |
| npm | Viene con Node (`npm -v`) |
| Editor | VS Code, Cursor u otro con soporte TypeScript |
| Navegador | Chrome, Firefox o Edge actualizado |

Comprueba la instalación:

```bash
node -v
npm -v
```

## Conocimientos previos

Se asume que ya dominas:

- **HTML** — etiquetas semánticas, formularios básicos.
- **CSS** — selectores, flexbox o grid a nivel introductorio.
- **JavaScript (ES6+)** — funciones flecha, destructuring, módulos `import`/`export`, promesas.

No es necesario conocer React de antemano. TypeScript se introduce de forma progresiva en los ejemplos (tipos en props, estado y respuestas de API).

## Convenciones del curso

- Archivos de componentes: extensión **`.tsx`** cuando incluyen TSX.
- Servidor de desarrollo: **`npm run dev`** (Vite), no `npm start` (Create React App).
- Commits opcionales en tu fork al terminar cada lab, con mensajes descriptivos (`feat: contador useState`, etc.).

Cuando el entorno esté listo, continúa con [1. Introducción a React](01-introduccion-react-ecosistema.md).
