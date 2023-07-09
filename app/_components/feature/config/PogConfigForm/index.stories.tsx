import { type Meta, type StoryObj } from "@storybook/react";
import { FormProviderDecorator } from '@/config/Decorators'
import { PogConfigForm  } from ".";

const meta = {
  title: 'feature/config/PogConfigForm',
  component: PogConfigForm ,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof PogConfigForm >;
export default meta;

export const Basic: StoryObj<typeof meta> = {};
