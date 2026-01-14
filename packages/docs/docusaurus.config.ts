import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Tosui",
  tagline: "A themable, orderly, simple UI system for React web applications",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://dgca.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/tosui/",

  // GitHub pages deployment config.
  projectName: "tosui", // Usually your repo name.
  organizationName: "dgca", // Usually your GitHub org/user name.
  trailingSlash: false,

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    [
      "docusaurus-plugin-llms",
      {
        title: "@tosui/react",
        description:
          "A themable, orderly, simple UI component library for React with constraint-driven design.",
        excludeImports: true,
        removeDuplicateHeadings: true,
      },
    ],
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/social-card.png",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Tosui",
      logo: {
        alt: "Tosui Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "guideSidebar",
          position: "left",
          label: "Guide",
        },
        {
          type: "docSidebar",
          sidebarId: "componentsSidebar",
          position: "left",
          label: "Components",
        },
        {
          href: "https://github.com/dgca/tosui",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "Guide",
          items: [
            {
              label: "Introduction",
              to: "/docs/introduction",
            },
            {
              label: "Get Started",
              to: "/docs/get-started",
            },
          ],
        },
        {
          title: "Components",
          items: [
            {
              label: "Primitives",
              to: "/docs/components/box",
            },
            {
              label: "Layout",
              to: "/docs/components/stack",
            },
            {
              label: "Forms",
              to: "/docs/components/input",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/dgca/tosui",
            },
          ],
        },
      ],
      copyright: `Maintained by <a href="https://www.linkedin.com/in/dan-cortes-8954b345/" target="_blank" rel="noopener noreferrer">Dan Cortes</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
