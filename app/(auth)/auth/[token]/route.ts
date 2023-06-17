import { NextRequest, NextResponse } from 'next/server'
import { getServerAuth } from '@/firebase/server'

export type Auth = {
  isAuthenticated: boolean
  user?: any
}
export const GET = async (
  _: NextRequest,
  { params: { token } }: { params: { token: string } }
) => {
  const auth = getServerAuth()
  const user = await auth.verifyIdToken(token).catch(e => console.log(e))

  return NextResponse.json({ user })
}
