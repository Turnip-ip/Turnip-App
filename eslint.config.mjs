import withNuxt from "./.nuxt/eslint.config.mjs";

import eslintPluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

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
    rules: {
      "vue/max-attributes-per-line": "off",
    },
  },
  {
    files: ["layouts/*.vue", "pages/**/*.vue"],
    rules: { "vue/multi-word-component-names": "off" },
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  eslintConfigPrettier,
);
