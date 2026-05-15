import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  globalIgnores([
    "**/node_modules/",
    "**/public/",
    "**/.cache/",
    "**/build/",
    "**/dist/"
  ]),
  {
    extends: compat.extends(
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:jest/recommended",
      "prettier",
      "plugin:prettier/recommended",
      "plugin:react-hooks/recommended"
    ),

    plugins: {
      prettier
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        process: true
      },

      ecmaVersion: 2020,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    rules: {
      "prettier/prettier": "error",
      "no-console": ["warn", { allow: ["error"] }],
      "no-alert": "error",
      "no-unused-vars": ["error", { caughtErrors: "none" }]
    },

    settings: {
      jest: {
        version: "27.5.1"
      },
      react: {
        createClass: "createReactClass",
        pragma: "React",
        version: "detect"
      },
      propWrapperFunctions: [
        "forbidExtraProps",
        { property: "freeze", object: "Object" },
        { property: "myFavoriteWrapper" }
      ],
      linkComponents: [
        "Hyperlink",
        { name: "Link", linkAttribute: "to" }
      ]
    }
  }
]);
