import type { Meta, StoryObj } from "@storybook/react";
import { rest } from "msw";

import { {{ inputs.component | pascal }}  } from ".";

const meta = {
  component: {{ inputs.component | pascal }} ,
  parameters: {
    args: {},
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
