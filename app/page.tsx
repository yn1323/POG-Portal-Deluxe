'use client'

import { LoginForm } from '@/component/feature/LoginForm'
import { Animation } from '@/component/layout/Animation'
import { CenterBox } from '@/component/layout/CenterBox'

const Home = () => {
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
