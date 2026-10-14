import { spawnSync } from "node:child_process";

// pnpm/npm/yarn/bun dejan su nombre en esta variable al ejecutar un binario.
export function detectPackageManager() {
    const userAgent = process.env.npm_config_user_agent ?? "";
    const name = userAgent.split("/")[0];

    return ["pnpm", "npm", "yarn", "bun"].includes(name) ? name : "pnpm";
}

export function addDependencies(packageManager, packages, cwd, dev = false) {
    const command = packageManager === "npm" ? "install" : "add";
    const args = [command, ...(dev ? ["-D"] : []), ...packages];

    // En Windows pnpm/npm son scripts .cmd y necesitan pasar por la shell.
    const result =
        process.platform === "win32"
            ? spawnSync([packageManager, ...args].join(" "), {
                  cwd,
                  stdio: "inherit",
                  shell: true,
              })
            : spawnSync(packageManager, args, { cwd, stdio: "inherit" });

    return result.status === 0;
}
