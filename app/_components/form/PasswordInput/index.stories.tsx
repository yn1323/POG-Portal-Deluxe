import type { Meta, StoryObj } from '@storybook/react'
import { PasswordInput } from '.'
import { FormProviderDecorator } from '@/config/Decorators'

const meta = {
  title: 'form/PasswordInput',
  component: PasswordInput,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof PasswordInput>
export default meta

export const Basic: StoryObj<typeof meta> = {}
