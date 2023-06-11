import type { Preview } from "@storybook/react";
import { initialize, mswDecorator } from "msw-storybook-addon";

// Initialize MSW
initialize();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    chromatic: { viewports: [414, 1080] },
  },
};

export default preview;
export const decorators = [mswDecorator];
