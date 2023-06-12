import { NextRequest, NextResponse } from 'next/server'
import { getServerAuth } from '@/firebase/server'

export const POST = async (request: NextRequest) => {
  const auth = getServerAuth()
  const token = request.headers.get('Authorization')?.split('Bearer ')[1]
  if (!token) {
    return NextResponse.json({ isAuthenticated: false })
  }
  const user = await auth.verifyIdToken(token).catch(() => null)
  if (!user) {
    return NextResponse.json({ isAuthenticated: false })
  }
  return NextResponse.json({ isAuthenticated: true })
}
