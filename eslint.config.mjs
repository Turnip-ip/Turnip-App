// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

import eslintPluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import eslint from "@eslint/js";

export default withNuxt(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...eslintPluginVue.configs["flat/recommended"],
  {
    ignores: ["components/ui/"],
  },
  {
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
        projectService: true,
      },
    },
  },
  {
    files: ["layouts/*.vue", "pages/**/*.vue"],
    rules: { "vue/multi-word-component-names": "off" },
  },
);
