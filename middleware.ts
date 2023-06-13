import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const logInPath = ['/dashboard']
const notLoggedInPath = ['/']

// 未ログイン判定
export async function middleware(request: NextRequest, response: NextResponse) {
  console.log('fire')
  const token = request.cookies.get('token')?.value ?? ''
  const path = new URL(request.nextUrl).pathname
  const isLoginPath = logInPath.some(p => path.startsWith(p))
  const isNotLoginPath = notLoggedInPath.some(p => path === p)

  if (!token && isNotLoginPath) {
    return NextResponse.next()
  }

  const res = await fetch(new URL('/api/auth/isAuthenticated', request.url), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
  const json = await res.json()

  const { isAuthenticated } = json
  console.log(isAuthenticated)

  if (isNotLoginPath && isAuthenticated) {
    return NextResponse.rewrite(new URL('/dashboard', request.url))
  }
  if (isLoginPath && !isAuthenticated) {
    request.cookies.delete('token')
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [...logInPath, ...notLoggedInPath],
}
