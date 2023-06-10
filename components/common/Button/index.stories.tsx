import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;
export default meta;

export const Basic: StoryObj<typeof meta> = {};
