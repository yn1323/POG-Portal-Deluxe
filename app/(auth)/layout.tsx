import { PcMenu } from '@/component/layout/PcMenu'
import { GetSelf } from '@/page/(auth)/auth/self/route'
import { PostUser } from '@/page/(auth)/users/[userId]/route'
import { serverFetch } from '@/page/_src/api'

async function accountExistCheck() {
  const { user, isUserExistInDb } = await serverFetch<GetSelf>('/auth/self')

  if (isUserExistInDb || !user) {
    return
  }

  await serverFetch<PostUser>(`/users/${user.uid}`, {
    method: 'POST',
    query: {
      uid: user.uid,
      name: user.name,
      picture: user.picture,
    },
  })
}

async function initialize() {
  const { user } = await serverFetch<GetSelf>('/auth/self')
  if (!user) {
    return { name: '', uid: '' }
  }
  return user
}

const AuthTemplate = async ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  await accountExistCheck()

  const { name } = await initialize()
  return (
    <PcMenu>
      <div>name: {name}</div>
      <div>{children}</div>
    </PcMenu>
  )
}

export default AuthTemplate
