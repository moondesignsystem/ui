import type { StorybookConfig } from "@storybook/html-vite";

const config: StorybookConfig = {
  stories: [
    {
      directory: "../stories",
    },
  ],

  staticDirs: ["../stories/assets"],

  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
  ],

  framework: {
    name: "@storybook/html-vite",
    options: {},
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
