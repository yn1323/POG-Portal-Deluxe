import { Metadata } from 'next'
import { Providers } from '@/config/Providers'

export const metadata: Metadata = {
  title: 'POG-Portal',
  robots: {
    googleBot: 'false',
    index: false,
  },
}

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
