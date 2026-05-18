# Requisitos

[← Índice](README.md) | [Siguiente: 1. Introducción →](01-introduccion-react-ecosistema.md)

---

## Entorno recomendado: GitHub Codespaces

1. Haz **fork** de este repositorio en tu cuenta de GitHub.
2. Abre un **Codespace**: en el repo, *Code* → *Codespaces* → *Create codespace on main*.
3. **Proyecto de práctica:** lo crearás en el **[Lab 2.1 — Vite](02-01-lab-vite.md)** (guion paso a paso). El nombre de la carpeta lo eliges tú; los labs siguientes usan el mismo proyecto (rutas `src/...` relativas a su raíz).

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

Cuando el Codespace esté listo, lee [1. Introducción a React](01-introduccion-react-ecosistema.md) y después el [Lab 2.1](02-01-lab-vite.md).
