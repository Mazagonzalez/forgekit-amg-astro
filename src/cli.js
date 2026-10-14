import fs from "node:fs";
import { install } from "./commands/install.js";
import { askProjectName } from "./utils/prompt.js";

const pkg = JSON.parse(
    fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

const OPTIONS = `
Opciones:
  --ts | --js                       Lenguaje (si no lo indicas, te lo pregunta)
  --pnpm | --npm | --yarn | --bun   Gestor de paquetes a usar (por defecto: el que ejecutó el comando)
  --no-install                      Solo copia la plantilla, sin instalar dependencias
  -h, --help                        Muestra esta ayuda
  -v, --version                     Muestra la versión
`;

const HELP = {
    forgekit: `
forgekit-amg-astro v${pkg.version}

Uso:
  forgekit-amg-astro install [nombre-proyecto] [opciones]
${OPTIONS}
Ejemplos:
  pnpm dlx forgekit-amg-astro install mi-sitio
  npx forgekit-amg-astro install mi-sitio --npm
`,
    create: `
create-amg-astro (forgekit-amg-astro v${pkg.version})

Uso:
  pnpm create amg-astro [nombre-proyecto] [opciones]
${OPTIONS}
Ejemplos:
  pnpm create amg-astro mi-sitio
  npm create amg-astro@latest mi-sitio
`,
};

/**
 * @param {string[]} args argumentos de la línea de comandos
 * @param {{ mode?: "forgekit" | "create" }} options
 *   "forgekit": `forgekit-amg-astro install <nombre>`
 *   "create":   `pnpm create amg-astro <nombre>` (sin subcomando)
 */
export async function run(args, { mode = "forgekit" } = {}) {
    const help = HELP[mode];
    const flags = args.filter((arg) => arg.startsWith("-"));
    const positionals = args.filter((arg) => !arg.startsWith("-"));

    if (flags.includes("-v") || flags.includes("--version")) {
        console.log(pkg.version);
        return;
    }

    if (flags.includes("-h") || flags.includes("--help")) {
        console.log(help);
        return;
    }

    let projectName;

    if (mode === "create") {
        projectName = positionals[0];
    } else {
        const [command, name] = positionals;

        if (!command) {
            console.log(help);
            return;
        }

        if (command !== "install") {
            console.log(`❌ Comando desconocido: ${command}`);
            console.log(help);
            process.exit(1);
        }

        projectName = name;
    }

    projectName ??= await askProjectName();

    if (!projectName) {
        console.log("❌ Falta el nombre del proyecto.");
        console.log(help);
        process.exit(1);
    }

    const packageManager = ["pnpm", "npm", "yarn", "bun"].find((pm) =>
        flags.includes(`--${pm}`),
    );

    const language = ["ts", "js"].find((lang) => flags.includes(`--${lang}`));

    await install(projectName, {
        packageManager,
        language,
        skipInstall: flags.includes("--no-install"),
    });
}
