import type { Meta, StoryObj } from "@storybook/react";
import { rest } from "msw";

import {{ inputs.component | pascal }} from "./page";

const meta = {
  title: '{{ inputs.path }}/{{ inputs.component | pascal }}',
  component: {{ inputs.component | pascal }} ,
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
} satisfies Meta<typeof {{ inputs.component | pascal }} >;
export default meta;

export const Basic: StoryObj<typeof meta> = {};
