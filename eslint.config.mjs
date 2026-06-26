import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Forcer l'utilisation de const quand possible
      "prefer-const": "error",
      // Interdire les variables inutilisées (sauf préfixées par _)
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      // Pas de console.log en prod (utiliser un logger)
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      // Forcer les types explicites sur les fonctions exportées
      "@typescript-eslint/explicit-module-boundary-types": "off",
      // Interdire any implicite
      "@typescript-eslint/no-explicit-any": "warn"
    }
  }
];

export default eslintConfig;
