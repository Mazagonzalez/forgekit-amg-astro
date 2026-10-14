#!/usr/bin/env node
// Toda la lógica y la plantilla viven en forgekit-amg-astro.
import { run } from "forgekit-amg-astro/cli";

await run(process.argv.slice(2), { mode: "create" });
