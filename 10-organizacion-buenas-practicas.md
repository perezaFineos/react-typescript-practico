# 10. Organización y buenas prácticas

[← Índice](README.md) | [← Anterior: 9. APIs](09-consumo-apis.md)

---

Has montado una SPA con Vite, componentes, estado, formularios, router y consumo de APIs. Este capítulo recoge cómo **organizar** el código cuando el proyecto crece y qué convenciones seguir en TypeScript.

## Estructura de carpetas (ejemplo)

```
src/
├── main.tsx
├── App.tsx
├── components/       # UI reutilizable (Boton, Tarjeta, Navbar)
├── pages/            # vistas ligadas a rutas (Inicio, Contacto)
├── hooks/            # hooks propios (useUsuarios, useDebounce)
├── services/         # llamadas HTTP (usuarios.ts, productos.ts)
├── types/            # tipos compartidos (Usuario.ts, Producto.ts)
└── styles/           # CSS global o módulos
```

No hace falta crear todas las carpetas el primer día; introdúcelas cuando aparezcan varios archivos del mismo tipo.

## Separación de responsabilidades

| Capa | Responsabilidad |
|------|-----------------|
| **Pages** | Componen la pantalla; conectan datos y layout |
| **Components** | Presentación y eventos locales |
| **Hooks** | Lógica con estado reutilizable |
| **Services** | URLs, `fetch`, transformación de respuestas |

Evita poner `fetch` largos dentro de JSX; extrae a servicios o hooks.

## TypeScript en React

- Tipa **props** con `type` o `interface`.
- Tipa el **estado** cuando no se infiere: `useState<Usuario | null>(null)`.
- Tipa **respuestas de API** y reutiliza esos tipos en componentes.
- Evita `any`; si el tipo es desconocido, usa `unknown` y **narrowing** (`if`, `typeof`, guards).
- Eventos: `React.ChangeEvent<HTMLInputElement>`, `React.FormEvent`, etc.

## Componentes pequeños

- Una responsabilidad clara por componente.
- Nombres descriptivos (`ListaUsuarios`, no `Lista2`).
- Extrae sub-UI repetida (tarjetas, filas de tabla, mensajes de error).

## Accesibilidad y formularios

- Asocia `<label>` con inputs (`htmlFor` / `id`).
- Usa `type="button"` en botones que no envían formularios.
- Mensajes de error visibles y enlazados cuando sea posible (`aria-live`, `role="alert"`).

## Rendimiento (noción)

- No optimices prematuramente; primero código claro.
- Más adelante: `React.memo`, `useMemo`, `useCallback` cuando midas cuellos de botella.
- Listas largas: virtualización (librerías especializadas).

## Próximos pasos de aprendizaje

| Tema | Para qué sirve |
|------|----------------|
| **Vitest + Testing Library** | Pruebas de componentes |
| **Context API** | Estado compartido sin prop drilling excesivo |
| **Zustand / Redux** | Estado global en apps grandes |
| **React Query / SWR** | Caché y sincronización de datos remotos |
| **Suspense y lazy** | Carga diferida de rutas y componentes |

## Cierre del curso

Con los diez bloques puedes:

1. Crear y desplegar un proyecto **React + TypeScript + Vite**.
2. Modelar UI con **componentes**, **props** y **estado**.
3. Gestionar **eventos** y **formularios** controlados.
4. Coordinar **padre e hijo** con flujo unidireccional.
5. Añadir **rutas** y consumir **APIs REST** con estados de carga y error.

Sigue practicando en tu fork: amplía tu proyecto Vite con un mini-proyecto propio (catálogo, agenda, panel simple) aplicando la misma estructura de carpetas.
