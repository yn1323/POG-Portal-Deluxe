import { revalidatePath } from 'next/cache'
import { PcMenu } from '@/component/layout/PcMenu'
import { getUserFromToken } from '@/services/auth/common'

async function initialLogin() {
  const res = await getUserFromToken()
  return res
}

async function reload() {
  'use server'
  // await revalidate('/')
  revalidatePath('/mogemoge')
}

const AuthTemplate = async ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const user = await initialLogin()
  return (
    <PcMenu>
      <div>{children}</div>
      <div>{JSON.stringify(user)}</div>
      <form action={reload}>
        <button>ALL Refresh</button>
      </form>
    </PcMenu>
  )
}

export default AuthTemplate
