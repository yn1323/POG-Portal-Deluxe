import { PogRegisterForm } from '@/component/feature/pogConfig/PogRegisterForm'
import { Animation } from '@/component/layout/Animation'
import { GetSelf } from '@/page/(auth)/auth/self/route'
import { serverFetch } from '@/page/_src/api'

async function initialize() {
  const { user } = await serverFetch<GetSelf>('/auth/self')
  if (!user?.uid) {
    throw 'error'
  }

  return user
}

const Config = async () => {
  await initialize()

  return (
    <Animation>
      <PogRegisterForm />
    </Animation>
  )
}

export default Config
