# forgekit-amg-astro

CLI para crear proyectos **Astro + React + Tailwind + ESLint + Prettier** con mi estructura base.

## Uso

```bash
pnpm create amg-astro mi-sitio
```

También funciona con `npm create amg-astro@latest mi-sitio`, `pnpm dlx forgekit-amg-astro install mi-sitio`
o instalándolo global (`pnpm add -g forgekit-amg-astro`) y usando `forgekit-amg-astro install mi-sitio`.

Te pregunta el nombre (si no lo pasas) y si vas a usar **TypeScript o JavaScript**, y luego instala todo en su última versión.

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

## Paquetes

- `forgekit-amg-astro` (raíz): la CLI, la lógica y la plantilla.
- [`create-amg-astro`](packages/create-amg-astro): envoltorio mínimo para `pnpm create amg-astro`. Usa `forgekit-amg-astro` por dentro,
  así que al cambiar la plantilla solo hace falta publicar `forgekit-amg-astro` (mientras siga en la versión 1.x).

## Publicar

```bash
pnpm version patch            # o minor / major
pnpm publish
git push --follow-tags
```

`create-amg-astro` solo se vuelve a publicar si cambia su propio código o si `forgekit-amg-astro` pasa a 2.x
(entonces actualiza la dependencia en `packages/create-amg-astro/package.json`):

```bash
cd packages/create-amg-astro
pnpm publish
```

## Desarrollo local

```bash
# deja disponible el comando forgekit-amg-astro (enlazado a esta carpeta)
pnpm add -g link:C:/Users/DESARROLLO/Desktop/forgekit-amg-astro
forgekit-amg-astro install prueba
pnpm test                 # copia la plantilla sin instalar y la borra
```
