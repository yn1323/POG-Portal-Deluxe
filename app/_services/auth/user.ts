import { cookies } from 'next/headers'
import { GetUser } from '@/page/(auth)/users/[userId]/route'
import { serverFetch } from '@/page/_src/api'
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

  if (!user) return { user: null }

  const userInfo = await serverFetch<GetUser>(`/users/${user.uid}`)

  return userInfo
}
