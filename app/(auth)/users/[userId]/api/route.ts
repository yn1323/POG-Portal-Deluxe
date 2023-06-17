import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { serverCollection } from '@/firebase/server'
import { checkAuthentication } from '@/services/auth/common'

export const GET = async (
  _: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) => {
  const token = cookies().get('token')?.value ?? ''

  if (!(await checkAuthentication(token))) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
  }

  const res = await serverCollection
    .doc('account')
    .collection('users')
    .doc(userId)
    .get()
  const users = res.data()

  return NextResponse.json({ revalidated: true, users })
}
