import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored Live2D widget. Third-party 2018-era code we deliberately do not
    // own or restyle — it is served as a sealed static asset, never bundled.
    // It is audited (all third-party network calls stripped) but not linted.
    "public/**",
  ]),
]);

export default eslintConfig;
