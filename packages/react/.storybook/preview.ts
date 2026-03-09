import type { Preview } from "@storybook/react";

import "../src/styles/styles.css";
import "../src/components/Box/reset/reset.module.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
};

export default preview;
