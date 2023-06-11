import type { Meta, StoryObj } from '@storybook/react'
import { LoginButton } from '.'

const meta = {
  title: 'feature/LoginForm/LoginButton',
  component: LoginButton,
  args: {
    handleGoogleLogin: () => {},
    isLoading: false,
  },
  parameters: {},
} satisfies Meta<typeof LoginButton>
export default meta

export const Basic: StoryObj<typeof meta> = {}
