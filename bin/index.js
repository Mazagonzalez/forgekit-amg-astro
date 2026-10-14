#!/usr/bin/env node
import fs from "node:fs";
import { install } from "../src/commands/install.js";

const pkg = JSON.parse(
    fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

const HELP = `
forgekit-amg-astro v${pkg.version}

Uso:
  forgekit-amg-astro install <nombre-proyecto> [opciones]

Opciones:
  --ts | --js                       Lenguaje (si no lo indicas, te lo pregunta)
  --pnpm | --npm | --yarn | --bun   Gestor de paquetes a usar (por defecto: el que ejecutó el comando)
  --no-install                      Solo copia la plantilla, sin instalar dependencias
  -h, --help                        Muestra esta ayuda
  -v, --version                     Muestra la versión

Ejemplos:
  pnpm dlx forgekit-amg-astro install mi-sitio
  npx forgekit-amg-astro install mi-sitio --npm
`;

const args = process.argv.slice(2);
const flags = args.filter((arg) => arg.startsWith("-"));
const [command, projectName] = args.filter((arg) => !arg.startsWith("-"));

if (flags.includes("-v") || flags.includes("--version")) {
    console.log(pkg.version);
    process.exit(0);
}

if (!command || flags.includes("-h") || flags.includes("--help")) {
    console.log(HELP);
    process.exit(0);
}

if (command !== "install") {
    console.log(`❌ Comando desconocido: ${command}`);
    console.log(HELP);
    process.exit(1);
}

if (!projectName) {
    console.log("❌ Falta el nombre del proyecto.");
    console.log("   Ejemplo: forgekit-amg-astro install mi-sitio");
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
