import { UserConfigForm } from '@/component/feature/userConfig/UserConfigForm'
import { Animation } from '@/component/layout/Animation'
import { CenterBox } from '@/component/layout/CenterBox'
import { GetSelf } from '@/page/(auth)/auth/self/route'
import { serverFetch } from '@/page/_src/api'

async function initialize() {
  const { user } = await serverFetch<GetSelf>('/auth/self')
  if (!user) {
    return { name: '', uid: '' }
  }
  return user
}

const Config = async () => {
  const { name, uid } = await initialize()
  return (
    <Animation>
      <CenterBox>
        <UserConfigForm defaultValues={{ name }} uid={uid} />
      </CenterBox>
    </Animation>
  )
}

export default Config
