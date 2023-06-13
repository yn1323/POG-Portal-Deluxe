import type { Meta, StoryObj } from '@storybook/react'
import { MailInput } from '.'
import { FormProviderDecorator } from '@/config/Decorators'

const meta = {
  title: 'form/MailInput',
  component: MailInput,
  args: {
    disabled: false,
  },
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof MailInput>
export default meta

export const Basic: StoryObj<typeof meta> = {}
