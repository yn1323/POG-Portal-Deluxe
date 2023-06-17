import { cookies } from 'next/headers'
import { getCookie } from '@/page/_src/client'

export const makePath = (path: string) =>
  `${process.env.NEXT_PUBLIC_ENDPOINT_DOMAIN}${
    path[0] === '/' ? '' : '/'
  }${path}`

type FetchOptions = {}
export const serverFetch = async <T>(path: string): Promise<T | {}> => {
  const res = await fetch(makePath(path), {
    headers: {
      cookie: `token=${cookies().get('token')?.value ?? ''}`,
    },
    cache: 'force-cache',
  })
  if (!res.ok) return {}
  const json: T = await res.json()
  return json
}

export const clientFetch = async <T>(path: string): Promise<T | {}> => {
  const res = await fetch(makePath(path), {
    headers: {
      cookie: `token=${getCookie('token')}`,
    },
    cache: 'force-cache',
  })
  if (!res.ok) return {}
  const json: T = await res.json()
  return json
}
