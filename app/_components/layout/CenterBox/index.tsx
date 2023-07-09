'use client'

import { VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { useScreenSize } from '@/hooks/ui/useScreenSize'

type PropTypes = {
  children: JSX.Element | JSX.Element[]
  noBorder?: boolean
}

export const CenterBox: FC<PropTypes> = ({ children, noBorder }) => {
  const { isPC } = useScreenSize()
  return (
    <VStack h="calc(100vh - 100px)" justifyContent="center">
      {isPC ? (
        <VStack
          border={noBorder ? undefined : '1px'}
          borderColor="gray.200"
          borderRadius="20px"
          px={4}
          py={12}
          shadow={noBorder ? undefined : 'md'}
          w="400px"
        >
          {children}
        </VStack>
      ) : (
        children
      )}
    </VStack>
  )
}
