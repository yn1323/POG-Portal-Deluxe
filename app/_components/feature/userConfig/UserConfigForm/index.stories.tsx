import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { UserConfigForm } from '.'

const meta = {
  title: 'feature/userConfig/UserConfigForm',
  component: UserConfigForm,
  args: {
    uid: 'hoge',
  },
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof UserConfigForm>
export default meta

export const Basic: StoryObj<typeof meta> = {}
