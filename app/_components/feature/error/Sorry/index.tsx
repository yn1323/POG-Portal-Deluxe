'use client'

import { Button } from '@chakra-ui/react'
import Image from 'next/image'
import { CenterBox } from '@/component/layout/CenterBox'
import shockedImage from './images/shocked.png'

export const Sorry = () => {
  return (
    <CenterBox noBorder>
      <Image alt="" src={shockedImage} />
      <h2>ページを表示できませんでした。</h2>
      <p style={{ width: 'max-content' }}>
        しばらく経ってから試すか、下のボタンからリトライしてください。
      </p>
      <Button
        colorScheme="green"
        mt={4}
        onClick={() => (window.location.href = window.location.href)}
      >
        リトライ
      </Button>
    </CenterBox>
  )
}
