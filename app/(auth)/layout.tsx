import { cookies } from 'next/headers'
import { PcMenu } from '@/component/layout/PcMenu'
import { GetAuth } from '@/page/(auth)/auth/[token]/route'
import { PostUser } from '@/page/(auth)/users/[userId]/route'
import { serverFetch } from '@/page/_src/api'
import { getUserFromToken } from '@/services/auth/user'

async function accountExistCheck() {
  const { user } = await getUserFromToken()

  if (user) return

  const authInfo = await serverFetch<GetAuth>(
    `/auth/${cookies().get('token')?.value ?? ''}`
  )

  const initialRegister = await serverFetch<PostUser>(
    `/users/${authInfo.uid}`,
    {
      method: 'POST',
      query: {
        uid: authInfo.uid,
        name: authInfo.name,
        picture: authInfo.picture,
      },
    }
  )
}

const AuthTemplate = async ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  await accountExistCheck()
  return (
    <PcMenu>
      <div>{children}</div>
    </PcMenu>
  )
}

export default AuthTemplate
