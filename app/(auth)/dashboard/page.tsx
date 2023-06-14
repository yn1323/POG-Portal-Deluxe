'use client'

import { Animation } from '@/component/layout/Animation'
import { useSession } from '@/hooks/useSession'

const Dashboard = () => {
  const { logout } = useSession()
  return (
    <Animation>
      <div>Dashboard</div>
      <button onClick={logout}>logout</button>
    </Animation>
  )
}

export default Dashboard
