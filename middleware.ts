import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 未ログイン判定
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value ?? ''
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const res = await fetch(new URL('/api/auth/isAuthenticated', request.url), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
  const json = await res.json()

  if (!json.isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: '/moge',
}
