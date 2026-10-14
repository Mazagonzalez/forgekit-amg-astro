import readline from "node:readline/promises";

export async function askLanguage() {
    // Sin terminal interactiva (CI, pipes) no se puede preguntar: se usa TS.
    if (!process.stdin.isTTY) {
        return "ts";
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    try {
        while (true) {
            const answer = (
                await rl.question("¿Vas a usar TypeScript o JavaScript? (ts/js) [ts]: ")
            )
                .trim()
                .toLowerCase();

            if (answer === "" || answer === "ts" || answer === "typescript") {
                return "ts";
            }
            if (answer === "js" || answer === "javascript") {
                return "js";
            }

            console.log("   Responde ts o js.");
        }
    } finally {
        rl.close();
    }
}
