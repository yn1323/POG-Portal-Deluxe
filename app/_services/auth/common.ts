import { cookies } from 'next/headers'
import { getServerAuth } from '@/firebase/server'
import { makePath } from '@/page/_src/api'

export const checkAuthentication = async (token?: string) => {
  const auth = getServerAuth()
  if (!token) return false

  const user = await auth.verifyIdToken(token).catch(e => console.log(e))
  return user ?? false
}

export const getUserFromToken = async (
  token = cookies().get('token')?.value ?? ''
) => {
  const user = await checkAuthentication(token)

  if (!user) return null

  const res = await fetch(makePath(`/users/${user.uid}/api`), {
    headers: {
      cookie: `token=${token}`,
    },
    cache: 'force-cache',
  })

  if (!res?.ok) return null

  return res.json()
}
