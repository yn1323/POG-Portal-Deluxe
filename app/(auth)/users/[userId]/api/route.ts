import { NextRequest, NextResponse } from 'next/server'
import { serverCollection } from '@/firebase/server'

export const GET = async (
  _: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) => {
  const res = await serverCollection
    .doc('account')
    .collection('users')
    .doc(userId)
    .get()
    .catch(e => console.log(e))

  if (!res) {
    return { user: null }
  }
  const user = res.data()

  return NextResponse.json({ user: user })
}
