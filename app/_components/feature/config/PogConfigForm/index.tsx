'use client'

import { Box, Text } from '@chakra-ui/react'
import { CenterBox } from '@/component/layout/CenterBox'

type Props = {
  defaultValues?: []
}

export const PogConfigForm = ({ defaultValues = [] }: Props) => {
  defaultValues
  return (
    <CenterBox>
      <Box pb={4} w={360}>
        <Text fontSize="xl" textAlign="center">
          POGページ登録
        </Text>
      </Box>
    </CenterBox>
  )
}
