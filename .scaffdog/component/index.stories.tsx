import type { Meta, StoryObj } from "@storybook/react";

import { {{ inputs.component | pascal }}  } from ".";

const meta = {
  component: {{ inputs.component | pascal }} ,
  parameters: {
    args: {}
  },
} satisfies Meta<typeof {{ inputs.component | pascal }} >;
export default meta;

export const Basic: StoryObj<typeof meta> = {};
