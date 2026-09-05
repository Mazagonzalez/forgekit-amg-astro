import fs from "node:fs";
import path from "node:path";

export function install(projectName) {
    const projectPath = path.join(process.cwd(), projectName);

    console.log(`🚀 Creando proyecto: ${projectName}`);
    console.log(`📁 Ubicación: ${projectPath}`);

    if (fs.existsSync(projectPath)) {
        console.log("❌ La carpeta del proyecto ya existe.");
        process.exit(1);
    }

    fs.mkdirSync(projectPath);

    const directories = [
        "public",
        "src",
        "src/assets",
        "src/components",
        "src/layouts",
        "src/lib",
        "src/pages",
        "src/styles",
    ];

    for (const directory of directories) {
        const directoryPath = path.join(projectPath, directory);

        fs.mkdirSync(directoryPath, { recursive: true });
    }

    console.log("✅ Estructura creada correctamente.");
}