import { UserConfigForm } from '@/component/feature/config/UserConfigForm'
import { userConfigFormAction } from '@/component/feature/config/UserConfigForm/action'
import { Animation } from '@/component/layout/Animation'
import { GetSelf } from '@/page/(auth)/auth/self/route'
import { serverFetch } from '@/page/_src/api'

async function initialize() {
  const { user, authUser } = await serverFetch<GetSelf>('/auth/self')
  console.log(authUser)

  if (!user) {
    return { name: '', uid: '', picture: '', email: '' }
  }
  return { ...user, email: authUser.email ?? '' }
}

const Profile = async () => {
  const { name, picture, uid, email } = await initialize()

  return (
    <Animation>
      <UserConfigForm
        defaultValues={{ name, picture }}
        email={email}
        uid={uid}
        onSubmit={userConfigFormAction}
      />
    </Animation>
  )
}

export default Profile
