import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],

  /**
   * Note: this is a workaround that allows Vite to import `@prisma/client/runtime/*` from the
   * correct location (node_modules), rather than from the project directory.
   * 
   * See line 79 in `./app/generated/prisma/internal/class.ts` for the import statement.
   */
  resolve: {
    alias: [
      {
        find: /@prisma\/client\/runtime/,
        replacement: path.resolve(__dirname, "node_modules", "@prisma", "client", "runtime"),
      },
    ],
  },
});
