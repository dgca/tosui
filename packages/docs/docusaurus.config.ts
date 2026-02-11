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
        generateMarkdownFiles: true,
        includeOrder: [
          "**/introduction*",
          "**/get-started*",
          "**/guide/spacing*",
          "**/guide/colors*",
          "**/guide/responsive*",
          "**/guide/state-styling*",
          "**/guide/component-patterns*",
          "**/guide/customization*",
          "**/components/box*",
          "**/components/text*",
          "**/components/heading*",
          "**/components/stack*",
          "**/components/hstack*",
          "**/components/vstack*",
          "**/components/flex*",
          "**/components/grid*",
          "**/components/container*",
          "**/components/divider*",
          "**/components/spacer*",
          "**/components/button*",
          "**/components/icon-button*",
          "**/components/input*",
          "**/components/select*",
          "**/components/textarea*",
          "**/components/checkbox*",
          "**/components/radio*",
          "**/components/switch*",
          "**/components/form-field*",
          "**/components/label*",
          "**/components/link*",
          "**/components/tabs*",
          "**/components/breadcrumb*",
          "**/components/menu*",
          "**/components/pagination*",
          "**/components/alert*",
          "**/components/badge*",
          "**/components/progress*",
          "**/components/skeleton*",
          "**/components/spinner*",
          "**/components/avatar*",
          "**/components/card*",
          "**/components/image*",
          "**/components/list*",
          "**/components/code*",
          "**/components/modal*",
          "**/components/tooltip*",
          "**/components/popover*",
          "**/components/accordion*",
        ],
        rootContent: `@tosui/react is a React component library with 40 components, CSS Modules styling, and responsive props.

## Quick Reference

- **Install**: \`npm install @tosui/react\`
- **Setup**: \`import "@tosui/react/styles.css";\` in your entry point
- **Import**: \`import { Box, Text, Button } from "@tosui/react";\`
- **Spacing**: 4px base unit with multipliers 0-32 (e.g. \`p={4}\` = 16px)
- **Colors**: Semantic tokens — \`foreground\`, \`foreground-muted\`, \`primary-default\`, \`error-default\`, etc.
- **Responsive**: \`<Box p={{ base: 2, md: 4, lg: 6 }} />\`
- **Polymorphic**: \`<Box as="section" />\`, \`<Text as="label" />\`

## IMPORTANT: Box Props Are Shared

Box is the foundational primitive. Most non-compound components inherit Box's styling props. This means you can use spacing, color, layout, border, and responsive props directly on components like Button, Input, Text, Stack, etc.

For example: \`<Button mt={4} />\`, \`<Input w="100%" />\`, \`<Text color="foreground-muted" mb={2} />\`, \`<Stack p={{ base: 4, md: 8 }} />\`

**Box props include**: \`p\`, \`pt\`, \`pr\`, \`pb\`, \`pl\`, \`px\`, \`py\`, \`m\`, \`mt\`, \`mr\`, \`mb\`, \`ml\`, \`mx\`, \`my\` (spacing 0-32), \`w\`, \`h\`, \`minW\`, \`maxW\`, \`minH\`, \`maxH\` (sizing), \`display\`, \`position\`, \`overflow\`, \`zIndex\` (layout), \`flexDirection\`, \`justifyContent\`, \`alignItems\`, \`alignSelf\`, \`flexWrap\`, \`gap\` (flexbox), \`gridTemplateColumns\`, \`gridTemplateRows\` (grid), \`color\`, \`bg\`, \`borderColor\` (colors), \`border\`, \`borderX\`, \`borderY\`, \`borderTop\`, \`borderRight\`, \`borderBottom\`, \`borderLeft\`, \`borderStyle\` (borders), \`rounded\`, \`roundedTop\`, \`roundedBottom\`, \`roundedLeft\`, \`roundedRight\` (roundness), \`shadow\`, \`opacity\`, \`cursor\`, \`pointerEvents\`, \`userSelect\`, \`textAlign\`, \`whiteSpace\`, \`fontSize\`, \`fontWeight\`, \`lineHeight\` (and more).

**Components that accept Box props**: Box, Text, Heading, Stack, HStack, VStack, Flex, Grid, Container, Divider, Spacer, Button, IconButton, Input, Select, Textarea, Label, Link, Code, Spinner, Skeleton, Progress, Badge, Alert, Image, Avatar.

**Compound components** (Modal, Popover, Tooltip, Accordion, Menu, Tabs, Card, Breadcrumb, Pagination, FormField, Checkbox, Radio, Switch) have their own focused APIs and do NOT accept Box props directly.

## Component Categories

- **Primitives**: Box, Text, Heading
- **Layout**: Stack, HStack, VStack, Flex, Grid, Container, Divider, Spacer
- **Forms**: Button, IconButton, Input, Select, Textarea, Checkbox, Radio, Switch, FormField, Label
- **Navigation**: Link, Tabs, Breadcrumb, Menu, Pagination
- **Feedback**: Alert, Badge, Progress, Skeleton, Spinner
- **Data Display**: Avatar, Card, Image, List, Code
- **Overlays**: Modal, Tooltip, Popover, Accordion`,
        fullRootContent: `Complete documentation for @tosui/react — a React component library with 40 components.

## Essential Setup

\`\`\`tsx
// 1. Install
npm install @tosui/react

// 2. Import styles in your entry point
import "@tosui/react/styles.css";

// 3. Optionally import IBM Plex fonts
import "@tosui/react/fonts.css";

// 4. Use components
import { Box, Text, Heading, Button } from "@tosui/react";
\`\`\`

## Key Concepts

- **Spacing system**: 4px base unit × multiplier. \`p={4}\` = 16px, \`p={8}\` = 32px. Range: 0-32.
- **Color tokens**: Semantic names that adapt to light/dark mode. Use \`foreground\`, \`foreground-muted\`, \`primary-default\`, \`surface\`, \`border\`, etc.
- **Responsive props**: Mobile-first. \`<Box p={{ base: 2, md: 4 }} />\` — breakpoints: base (0), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px).
- **Polymorphic**: Most components accept \`as\` prop to change rendered element. \`<Box as="nav" />\`, \`<Text as="label" />\`.
- **State styling**: \`_hover\`, \`_focus\`, \`_active\`, \`_disabled\` props on Box for interactive states.
- **Theming**: Override CSS variables to customize. \`--t-light-primary-default\`, \`--t-dark-primary-default\`, \`--t-spacing-unit\`, etc.

## IMPORTANT: Box Props Are Shared Across Most Components

Box is the foundational primitive. Most non-compound components inherit ALL of Box's styling props. This means you can use spacing, sizing, color, layout, border, shadow, roundness, and responsive props directly on these components.

Examples:
- \`<Button mt={4} px={6} />\` — spacing on Button
- \`<Input w="100%" mb={4} />\` — sizing and margin on Input
- \`<Text color="foreground-muted" mb={2} />\` — color and margin on Text
- \`<Stack p={{ base: 4, md: 8 }} bg="surface" rounded="lg" />\` — responsive padding, background, and roundness on Stack
- \`<Badge bg="error-subtle" color="error-default" />\` — colors on Badge

### Available Box Props

**Spacing** (values 0-32, each = 4px): \`p\`, \`pt\`, \`pr\`, \`pb\`, \`pl\`, \`px\`, \`py\`, \`m\`, \`mt\`, \`mr\`, \`mb\`, \`ml\`, \`mx\`, \`my\`, \`gap\`, \`gapRow\`, \`gapColumn\`
**Sizing**: \`w\`, \`h\`, \`minW\`, \`maxW\`, \`minH\`, \`maxH\`
**Layout**: \`display\`, \`position\`, \`overflow\`, \`zIndex\`
**Flexbox**: \`flexDirection\`, \`justifyContent\`, \`alignItems\`, \`alignSelf\`, \`flexWrap\`, \`flex\`, \`flexGrow\`, \`flexShrink\`, \`flexBasis\`
**Grid**: \`gridTemplateColumns\`, \`gridTemplateRows\`, \`justifySelf\`
**Colors**: \`color\`, \`bg\`, \`borderColor\`
**Borders**: \`border\`, \`borderX\`, \`borderY\`, \`borderTop\`, \`borderRight\`, \`borderBottom\`, \`borderLeft\`, \`borderStyle\`
**Roundness**: \`rounded\`, \`roundedTop\`, \`roundedBottom\`, \`roundedLeft\`, \`roundedRight\`, \`roundedTopLeft\`, \`roundedTopRight\`, \`roundedBottomLeft\`, \`roundedBottomRight\`
**Effects**: \`shadow\`, \`opacity\`
**Interactions**: \`cursor\`, \`pointerEvents\`, \`userSelect\`
**Typography**: \`fontSize\`, \`fontFamily\`, \`fontWeight\`, \`lineHeight\`, \`textAlign\`, \`whiteSpace\`
**State**: \`_hover\`, \`_focus\`, \`_active\`, \`_disabled\` (each accepts an object of the above props)

### Which Components Accept Box Props

**Accept Box props** (use spacing, colors, layout, etc. directly): Box, Text, Heading, Stack, HStack, VStack, Flex, Grid, Container, Divider, Spacer, Button, IconButton, Input, Select, Textarea, Label, Link, Code, Spinner, Skeleton, Progress, Badge, Alert, Image, Avatar.

**Do NOT accept Box props** (compound components with focused APIs): Modal, Popover, Tooltip, Accordion, Menu, Tabs, Card, Breadcrumb, Pagination, FormField, Checkbox, Radio, Switch. Wrap these in a Box if you need layout props.

## Component Categories

- **Primitives**: Box, Text, Heading — foundation for all layouts
- **Layout**: Stack, HStack, VStack, Flex, Grid, Container, Divider, Spacer
- **Forms**: Button, IconButton, Input, Select, Textarea, Checkbox, Radio, Switch, FormField, Label
- **Navigation**: Link, Tabs, Breadcrumb, Menu, Pagination
- **Feedback**: Alert, Badge, Progress, Skeleton, Spinner
- **Data Display**: Avatar, Card, Image, List, Code
- **Overlays**: Modal, Tooltip, Popover, Accordion`,
        customLLMFiles: [
          {
            filename: "llms-components.txt",
            includePatterns: [
              "**/components/*.md",
              "**/components/*.mdx",
              "**/components/**/*.md",
              "**/components/**/*.mdx",
              "docs/components/*",
            ],
            fullContent: true,
            title: "@tosui/react Components",
            description:
              "Complete reference for all 40 Tosui components with props, examples, and usage patterns.",
          },
          {
            filename: "llms-guide.txt",
            includePatterns: [
              "**/introduction*",
              "**/get-started*",
              "**/guide/*.md",
              "**/guide/*.mdx",
              "**/guide/**/*.md",
              "**/guide/**/*.mdx",
              "docs/introduction*",
              "docs/get-started*",
              "docs/guide/*",
            ],
            fullContent: true,
            title: "@tosui/react Guide",
            description:
              "Setup, design tokens, responsive styling, state styling, component patterns, and customization.",
          },
        ],
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
          to: "/playground",
          position: "left",
          label: "Playground",
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
