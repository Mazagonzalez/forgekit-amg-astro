# create-amg-astro

Crea un proyecto **Astro + React + Tailwind + ESLint + Prettier** con la estructura base de AMG.

```bash
pnpm create amg-astro mi-sitio
# o
npm create amg-astro@latest mi-sitio
```

Te pregunta el nombre (si no lo pasas) y si vas a usar TypeScript o JavaScript.

| Opción                            | Descripción                                        |
| --------------------------------- | -------------------------------------------------- |
| `--ts` `--js`                     | Elige el lenguaje sin preguntar                    |
| `--pnpm` `--npm` `--yarn` `--bun` | Fuerza el gestor de paquetes                       |
| `--no-install`                    | Solo copia la plantilla, sin instalar dependencias |

La plantilla y la lógica están en [forgekit-amg-astro](https://www.npmjs.com/package/forgekit-amg-astro).
