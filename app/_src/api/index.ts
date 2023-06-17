export const makePath = (path: string) =>
  `${process.env.NEXT_PUBLIC_ENDPOINT_DOMAIN}${
    path[0] === '/' ? '' : '/'
  }${path}`
