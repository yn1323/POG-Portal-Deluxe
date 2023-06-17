import { cookies } from 'next/headers'
import { PcMenu } from '@/component/layout/PcMenu'
import { Auth } from '@/page/(auth)/auth/[token]/route'
import { serverFetch } from '@/page/_src/api'
import { getUserFromToken } from '@/services/auth/user'

async function initialLogin() {
  const { user } = await getUserFromToken()
  if (user) {
    return user
  }

  const authInfo = await serverFetch<Auth>(
    `/auth/${cookies().get('token')?.value ?? ''}`
  )

  return authInfo
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
    </PcMenu>
  )
}

export default AuthTemplate
