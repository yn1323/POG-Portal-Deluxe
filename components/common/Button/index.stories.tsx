import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";
import { rest } from "msw";

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
