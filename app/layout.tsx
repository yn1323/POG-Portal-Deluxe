import { Providers } from '@/config/Providers'

export default function RootLayout({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
