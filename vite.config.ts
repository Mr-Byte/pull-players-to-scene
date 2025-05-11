import copy from "rollup-plugin-copy";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        sourcemap: true,
        rollupOptions: {
            input: "src/module.ts",
            output: {
                entryFileNames: "module.js",
                format: "es",
            },
        },
    },
    plugins: [
        copy({
            targets: [{ src: "static/*", dest: "dist" }],
            hook: "writeBundle",
        }),
    ],
});
