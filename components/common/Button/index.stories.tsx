import type { Meta, StoryObj } from "@storybook/react";
import { rest } from "msw";

import { Button } from ".";

const meta = {
  component: Button,
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
} satisfies Meta<typeof Button>;
export default meta;

export const Basic: StoryObj<typeof meta> = {};
