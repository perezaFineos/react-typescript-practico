# 10. Organización y buenas prácticas

[← Índice](README.md) | [← Anterior: 9. APIs](09-consumo-apis.md)

---

## Estructura de carpetas (ejemplo)

```
src/
├── main.tsx
├── App.tsx
├── components/     # UI reutilizable
├── pages/          # vistas por ruta
├── hooks/          # hooks propios
├── types/          # tipos compartidos
├── services/       # llamadas API
└── styles/
```

## Separación de responsabilidades

- **Componentes** — presentación y eventos locales.
- **Hooks** — lógica reutilizable con estado.
- **Services** — fetch/axios aislado de la UI.

## TypeScript

- Tipa props y respuestas de API.
- Evita `any`; usa `unknown` y narrowing si el tipo es incierto.

## Reutilización

- Componentes pequeños y con una responsabilidad clara.
- Extrae constantes y tipos a archivos dedicados.

## Próximos pasos

- Testing con Vitest y Testing Library.
- Estado global si la app crece (Context, Zustand, Redux).
- Profundizar en patrones de composición y accesibilidad en formularios.
