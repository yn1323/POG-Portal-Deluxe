import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { getServerAuth } from '@/firebase/server'
import { GetUser } from '@/page/(auth)/users/[userId]/route'
import { BaseFetch, serverFetch } from '@/page/_src/api'

type Pog = {
  name: string
  url: string
}

export type GetPogs = BaseFetch & {
  request: {
    userId: string
  }
  response: {
    pogs: Pog[]
  }
}

export const GET = async (req: NextRequest) => {
  const token = cookies().get('token')?.value ?? ''

  const auth = getServerAuth()
  const user = await auth.verifyIdToken(token).catch(e => console.log(e))

  if (!user) {
    return NextResponse.json({ isAuthenticated: false })
  }

  const firestoreUser = await serverFetch<GetUser>(`/users/${user.uid}`)

  return NextResponse.json({
    isAuthenticated: true,
    isUserExistInDb: !!firestoreUser,
    user: firestoreUser.user ?? user,
    authUser: user,
  })
}
