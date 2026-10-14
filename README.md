# forgekit-amg-astro

CLI para crear proyectos **Astro + React + Tailwind + ESLint + Prettier** con mi estructura base.

## Uso

```bash
pnpm dlx forgekit-amg-astro install mi-sitio
# o
npx forgekit-amg-astro install mi-sitio
```

Te pregunta si vas a usar **TypeScript o JavaScript** y luego instala todo en su última versión.

| Opción                            | Descripción                                        |
| --------------------------------- | -------------------------------------------------- |
| `--ts` `--js`                     | Elige el lenguaje sin preguntar                    |
| `--pnpm` `--npm` `--yarn` `--bun` | Fuerza el gestor de paquetes                       |
| `--no-install`                    | Solo copia la plantilla, sin instalar dependencias |

## Qué genera

```
mi-sitio/
├── .vscode/            extensions.json, launch.json
├── public/             favicon.svg, favicon.ico
├── src/
│   ├── layouts/        Layout.astro
│   ├── pages/          index.astro
│   └── styles/         global.css, components.css, scrollbar.css, animations.css
├── .gitignore
├── .prettierrc.json
├── .prettierignore
├── astro.config.mjs    React + Tailwind
├── eslint.config.js    ignora dist/ y .astro/, revisa .astro (+ TS con typescript-eslint)
└── tsconfig.json       (jsconfig.json si eliges JS)
```

Dependencias: `astro`, `@astrojs/react`, `react`, `react-dom`, `tailwindcss`, `@tailwindcss/vite`
(+ `@types/react`, `@types/react-dom` con TS).

Dev: `eslint`, `@eslint/js`, `globals`, `eslint-plugin-astro`, `prettier`, `prettier-plugin-astro`, `prettier-plugin-tailwindcss`
(+ `typescript-eslint`, `typescript@6` con TS: typescript-eslint aún no soporta TS 7).

## Personalizar la plantilla

- [`templates/astro/base`](templates/astro/base): archivos comunes a TS y JS.
- [`templates/astro/ts`](templates/astro/ts) y [`templates/astro/js`](templates/astro/js): lo que cambia según el lenguaje (`tsconfig`/`jsconfig`, `eslint.config.js` y `Layout.astro`).
- El `.gitignore` se guarda como `_gitignore` porque npm lo elimina al publicar.
- Las dependencias se cambian en [`src/commands/install.js`](src/commands/install.js).

## Desarrollo local

```bash
# deja disponible el comando forgekit-amg-astro (enlazado a esta carpeta)
pnpm add -g link:C:/Users/DESARROLLO/Desktop/forgekit-amg-astro
forgekit-amg-astro install prueba
pnpm test                 # copia la plantilla sin instalar y la borra
```
