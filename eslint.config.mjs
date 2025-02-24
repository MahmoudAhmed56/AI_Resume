import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    rules: {
      "no-unused-vars": "off", // Disable the default ESLint rule for unused variables
      "@typescript-eslint/no-unused-vars": "off", // Disable the TypeScript-specific rule for unused variables
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];

export default eslintConfig;
