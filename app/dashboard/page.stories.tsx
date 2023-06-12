import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'
import Dashboard from './page'

const meta = {
  title: ' /Dashboard',
  component: Dashboard,
  args: {},
  parameters: {
    msw: {
      handlers: [
        rest.get('/user', (_, res, ctx) => {
          return res(
            ctx.json({
              firstName: 'Neil',
              lastName: 'Maverick',
            })
          )
        }),
      ],
    },
  },
} satisfies Meta<typeof Dashboard>
export default meta

export const Basic: StoryObj<typeof meta> = {}
