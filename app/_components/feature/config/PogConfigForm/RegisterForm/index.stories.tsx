import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { RegisterForm } from '.'

const meta = {
  title: 'feature/config/PogConfigForm/RegisterForm',
  component: RegisterForm,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof RegisterForm>
export default meta

export const Basic: StoryObj<typeof meta> = {}
