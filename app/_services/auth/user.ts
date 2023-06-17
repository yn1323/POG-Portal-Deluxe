import { cookies } from 'next/headers'
import { makePath } from '@/page/_src/api'
import { checkAuthentication } from '@/services/auth/common'

export type User = {
  user?: {
    uid: string
    name: string
    avatar: string
  }
}
export const getUserFromToken = async (
  token = cookies().get('token')?.value ?? ''
) => {
  const user = await checkAuthentication(token)

  if (!user) return {}

  const res = await fetch(makePath(`/users/${user.uid}/api`), {
    headers: {
      cookie: `token=${token}`,
    },
    cache: 'force-cache',
  })

  if (!res?.ok) return {}

  const json: User = await res.json()

  return json
}
