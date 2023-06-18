import { RequestInit } from 'next/dist/server/web/spec-extension/request'
import { cookies } from 'next/headers'
import { getCookie } from '@/page/_src/client'

export const makePath = (path: string) =>
  `${process.env.NEXT_PUBLIC_ENDPOINT_DOMAIN}${
    path[0] === '/' ? '' : '/'
  }${path}`

export type BaseFetch = {
  response: unknown
  requestOptions?: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    query: Record<string, string | number>
    cache?: RequestInit['cache']
  }
}

const baseFetch = async <T extends BaseFetch>(
  path: string,
  options?: T['requestOptions'],
  cookie = ''
): Promise<T['response'] | {}> => {
  const method = options?.method ?? 'GET'
  const query = options?.query ?? {}

  const targetUrl =
    method === 'GET' && query && Object.keys(query).length > 0
      ? `${makePath(path)}?${Object.entries(query)
          .map(([key, value]) => `${key}=${value}`)
          .join('&')}`
      : makePath(path)

  const body = method === 'GET' ? {} : { body: JSON.stringify(query) }

  const cache = { cache: options?.cache ?? 'force-cache' }

  const res = await fetch(targetUrl, {
    method,
    ...body,
    headers: {
      cookie: `token=${cookie}`,
      'Content-Type': 'application/json',
    },
    ...cache,
  })
  if (!res.ok) return {}
  const json: T['response'] = await res.json()
  return json
}

export const serverFetch = async <T extends BaseFetch>(
  path: string,
  options?: T['requestOptions']
): Promise<T['response']> => {
  return await baseFetch(path, options, cookies().get('token')?.value ?? '')
}

export const clientFetch = async <T extends BaseFetch>(
  path: string,
  options?: T['requestOptions']
): Promise<T['response']> => {
  return await baseFetch(path, options, getCookie('token'))
}
