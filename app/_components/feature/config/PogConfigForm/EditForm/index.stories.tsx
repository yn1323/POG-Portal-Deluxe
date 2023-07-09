import { type Meta, type StoryObj } from "@storybook/react";
import { FormProviderDecorator } from '@/config/Decorators'
import { EditForm  } from ".";

const meta = {
  title: 'feature/config/PogConfigForm/EditForm',
  component: EditForm ,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof EditForm >;
export default meta;

export const Basic: StoryObj<typeof meta> = {};
