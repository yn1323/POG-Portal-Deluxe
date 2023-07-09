'use client'

import {
  HStack,
  VStack,
  useColorModeValue,
  Button,
  Divider,
  Spacer,
  Box,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { JSX, useLayoutEffect, useState } from 'react'
import {
  FcPrevious,
  FcNext,
  FcHome,
  FcSupport,
  FcDonate,
  FcBullish,
  FcAddDatabase,
  FcUndo,
} from 'react-icons/fc'
import { useSession } from '@/hooks/auth/useSession'

const TopMenu = [
  { icon: <FcHome />, label: 'TOP', link: '/dashboard' },
  { icon: <FcBullish />, label: 'POGデータ', link: '/history' },
  {
    icon: <FcDonate />,
    label: 'ドラフト',
    link: '/timecard',
  },
] as const

const BottomMenu = [
  { icon: <FcAddDatabase />, label: 'POG登録', link: '/config/pog' },
  {
    icon: <FcSupport />,
    label: '設定',
    link: '/config/profile',
  },
] as const

type Props = {
  children: JSX.Element | JSX.Element[]
}

export const PcMenu = ({ children }: Props) => {
  const router = useRouter()
  const { logout, logoutPending } = useSession()

  const { isExpand, setIsExpand } = useExpandButton()
  const buttonHoverColor = useColorModeValue('gray.100', 'gray.700')
  const buttonProps = {
    variant: 'ghost',
    w: '100%',
    justifyContent: 'flex-start',
    _hover: { bg: buttonHoverColor },
    rounded: 0,
  }
  const drawerAnimation = {
    width: isExpand ? '200px' : '50px',
  }

  return (
    <HStack>
      <motion.div
        animate={drawerAnimation}
        initial={drawerAnimation}
        role="navigation"
        transition={{
          ease: 'backOut',
          duration: 0.2,
        }}
      >
        <VStack
          alignItems="flex-start"
          background={useColorModeValue('gray.50', undefined)}
          borderColor={useColorModeValue('gray.200', 'gray.600')}
          borderRight="1px"
          h="100vh"
          w="100%"
        >
          {isExpand && (
            <Button
              leftIcon={<FcPrevious />}
              onClick={() => setIsExpand(false)}
              {...buttonProps}
              aria-label="ナビゲーションのラベルを非表示"
              display={{ base: 'none', md: 'flex' }}
            />
          )}
          {!isExpand && (
            <Button
              leftIcon={<FcNext />}
              onClick={() => setIsExpand(true)}
              {...buttonProps}
              aria-label="ナビゲーションのラベルを表示"
              data-testid="openButton"
              display={{ base: 'none', md: 'flex' }}
            />
          )}
          <Divider display={{ base: 'none', md: 'flex' }} />
          {/* Linkタグが厳しそうなので、router.pushで遷移する */}
          {TopMenu.map(({ icon, label, link }, i) => (
            <Button
              leftIcon={icon}
              {...buttonProps}
              aria-label={label}
              key={i}
              onClick={() => router.push(link)}
            >
              {isExpand ? label : ''}
            </Button>
          ))}
          <Spacer />
          <Divider />
          {BottomMenu.map(({ icon, label, link }, i) => (
            <Button
              leftIcon={icon}
              {...buttonProps}
              aria-label={label}
              key={i}
              onClick={() => router.push(link)}
            >
              {isExpand ? label : ''}
            </Button>
          ))}
          <Button
            leftIcon={<FcUndo />}
            {...buttonProps}
            aria-label="ログアウト"
            isLoading={logoutPending}
            onClick={logout}
          >
            {isExpand ? 'ログアウト' : ''}
          </Button>
        </VStack>
      </motion.div>
      <Box
        h="100vh"
        m={0}
        p={4}
        role="main"
        w={`calc(100vw - ${drawerAnimation.width})`}
      >
        {children}
      </Box>
    </HStack>
  )
}

const LS_MENU_EXPAND_KEY = 'authLayoutPC'

export const useExpandButton = () => {
  const [isExpand, _setIsExpand] = useState(true)

  useLayoutEffect(() => {
    _setIsExpand(
      window
        ? !parseInt(window.localStorage.getItem(LS_MENU_EXPAND_KEY) ?? '1', 10)
        : false
    )
  }, [_setIsExpand])

  const setIsExpand = (nextExpandState: boolean) => {
    localStorage.setItem(LS_MENU_EXPAND_KEY, nextExpandState ? '0' : '1')
    _setIsExpand(nextExpandState)
  }

  return {
    isExpand,
    setIsExpand,
  }
}
