import type { Meta, StoryObj } from "@storybook/react";
import { rest } from "msw";

import Page from "./page";

const meta = {
  title: 'pages/{{ inputs.path }}/{{ inputs.component | camel }}',
  component: Page,
  args: {},
  parameters: {
    msw: {
      handlers: [
        rest.get("/user", (_, res, ctx) => {
          return res(
            ctx.json({
              firstName: "Neil",
              lastName: "Maverick",
            })
          );
        }),
      ],
    },
  },
} satisfies Meta<typeof Page >;
export default meta;

export const Basic: StoryObj<typeof meta> = {};
