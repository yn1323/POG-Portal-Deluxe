'use client'

import { useRouter } from 'next/navigation'
import { LoginForm } from '@/component/feature/LoginForm'
import { Animation } from '@/component/layout/Animation'
import { CenterBox } from '@/component/layout/CenterBox'
import { useSession } from '@/hooks/useSession'

const Home = () => {
  const router = useRouter()

  useSession({
    afterLogin: () => router.push('/dashboard'),
  })

  return (
    <Animation>
      <main>
        <CenterBox>
          <LoginForm />
        </CenterBox>
      </main>
    </Animation>
  )
}

export default Home
