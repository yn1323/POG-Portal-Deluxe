import { NextRequest, NextResponse } from 'next/server'
import { getServerAuth } from '@/firebase/server'
import { BaseFetch } from '@/page/_src/api'

export type GetAuth = BaseFetch & {
  response: {
    // アプリ内で使用する最低限のみに絞る
    name: string
    picture: string
    uid: string
  }
  requestOptions: {
    query: {
      token: string
    }
  }
}

export const GET = async (
  _: NextRequest,
  { params: { token } }: { params: { token: string } }
) => {
  const auth = getServerAuth()
  const user = await auth.verifyIdToken(token).catch(e => console.log(e))

  return NextResponse.json({ ...user })
}
