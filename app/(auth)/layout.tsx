import { PcMenu } from '@/component/layout/PcMenu'

export default function AuthTemplate({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) {
  return <PcMenu>{children}</PcMenu>
}
