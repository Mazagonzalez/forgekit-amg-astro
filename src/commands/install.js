import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { copyDir } from "../utils/fs.js";
import {
    addDependencies,
    detectPackageManager,
} from "../utils/package-manager.js";
import { askLanguage } from "../utils/prompt.js";

const TEMPLATES_PATH = fileURLToPath(
    new URL("../../templates/astro", import.meta.url),
);

// Se instalan siempre en su última versión.
const DEPENDENCIES = [
    "astro",
    "@astrojs/react",
    "react",
    "react-dom",
    "tailwindcss",
    "@tailwindcss/vite",
];

const TS_DEPENDENCIES = ["@types/react", "@types/react-dom"];

const DEV_DEPENDENCIES = [
    "eslint",
    "@eslint/js",
    "globals",
    "eslint-plugin-astro",
    "prettier",
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
];

// typescript-eslint aún no soporta TypeScript 7: quitar el @6 cuando lo haga.
const TS_DEV_DEPENDENCIES = ["typescript-eslint", "typescript@6"];

export async function install(projectName, options = {}) {
    const projectPath = path.resolve(process.cwd(), projectName);
    const packageManager = options.packageManager ?? detectPackageManager();

    if (fs.existsSync(projectPath) && fs.readdirSync(projectPath).length > 0) {
        console.log(`❌ La carpeta ${projectName} ya existe y no está vacía.`);
        process.exit(1);
    }

    const language = options.language ?? (await askLanguage());

    console.log(`\n🚀 Creando proyecto: ${projectName} (${language.toUpperCase()})`);
    console.log(`📁 Ubicación: ${projectPath}`);

    copyDir(path.join(TEMPLATES_PATH, "base"), projectPath);
    copyDir(path.join(TEMPLATES_PATH, language), projectPath);

    // npm elimina los .gitignore al publicar, por eso la plantilla usa _gitignore.
    fs.renameSync(
        path.join(projectPath, "_gitignore"),
        path.join(projectPath, ".gitignore"),
    );

    const packageJsonPath = path.join(projectPath, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    packageJson.name = toPackageName(path.basename(projectPath));
    fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

    console.log("✅ Plantilla copiada.");

    const isTs = language === "ts";
    const dependencies = isTs ? [...DEPENDENCIES, ...TS_DEPENDENCIES] : DEPENDENCIES;
    const devDependencies = isTs
        ? [...DEV_DEPENDENCIES, ...TS_DEV_DEPENDENCIES]
        : DEV_DEPENDENCIES;

    if (options.skipInstall) {
        printNextSteps(projectName, packageManager, dependencies, devDependencies);
        return;
    }

    console.log(`📦 Instalando dependencias con ${packageManager}...`);

    const installed =
        addDependencies(packageManager, dependencies, projectPath) &&
        addDependencies(packageManager, devDependencies, projectPath, true);

    if (!installed) {
        console.log("❌ Falló la instalación de dependencias.");
        process.exit(1);
    }

    printNextSteps(projectName, packageManager);
}

function toPackageName(name) {
    return (
        name
            .toLowerCase()
            .replace(/[^a-z0-9-~]+/g, "-")
            .replace(/^[-.~]+|-+$/g, "") || "astro-project"
    );
}

function printNextSteps(
    projectName,
    packageManager,
    pendingDependencies,
    pendingDevDependencies,
) {
    const run = packageManager === "npm" ? "npm run" : packageManager;
    const add = packageManager === "npm" ? "npm install" : `${packageManager} add`;

    console.log("\n✨ Proyecto listo. Siguientes pasos:\n");
    console.log(`   cd ${projectName}`);
    if (pendingDependencies) {
        console.log(`   ${add} ${pendingDependencies.join(" ")}`);
        console.log(`   ${add} -D ${pendingDevDependencies.join(" ")}`);
    }
    console.log(`   ${run} dev\n`);
}
