import { Animation } from '@/component/layout/Animation'

async function initialize() {
  // 'use server'
  const { user } = await getUserFromToken()
}

const {{ inputs.component | pascal }} = async () => {
  await initialize()

  return <Animation><div>main</div></Animation>;
};

export default {{ inputs.component | pascal }};
