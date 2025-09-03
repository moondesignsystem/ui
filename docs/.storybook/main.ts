import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import type { StorybookConfig } from "@storybook/html-vite";

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: [
    {
      directory: "../stories",
    },
  ],

  staticDirs: ["../stories/assets"],

  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-themes"),
  ],

  framework: {
    name: getAbsolutePath("@storybook/html-vite"),
    options: {},
  },

  docs: {
    defaultName: "Getting started",
  },

  managerHead: (head) => `
   <!-- Google tag (gtag.js) -->
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-4PPRHN5E8L"
  ></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-4PPRHN5E8L");
  </script>
  <link rel="icon" href="https://assets.moon.io/symbols/product/moon.png" type="image/png">
    ${head}
    <style>.sidebar-header img {height: 24px}</style>
  `,
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
