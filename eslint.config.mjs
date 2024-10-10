// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

// @ts-expect-error we don't need type for this module
import eslintPluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
// @ts-expect-error we don't need type for this module
import eslint from "@eslint/js";

export default withNuxt(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  eslint.configs.recommended,
  // @ts-expect-error The config return a lint error
  ...tseslint.configs.strictTypeChecked,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
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
);
