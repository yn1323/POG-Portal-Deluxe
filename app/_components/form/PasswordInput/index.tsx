'use client'

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { RiLockPasswordLine } from 'react-icons/ri'

type Props = {}

export const PasswordInput: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  return (
    <FormControl id="password" isInvalid={!!errors.password}>
      <FormLabel>パスワード</FormLabel>
      <InputGroup>
        <InputLeftElement color="gray.300" pointerEvents="none">
          <RiLockPasswordLine />
        </InputLeftElement>
        <Input
          data-testid="password"
          role="textbox"
          type="password"
          autoComplete="current-password"
          maxLength={16}
          required
          {...register('password', {
            required: true,
            minLength: 8,
          })}
        />
      </InputGroup>
      <FormHelperText color={errors.password ? 'crimson' : undefined}>
        8文字以上16文字以内で入力してください
      </FormHelperText>
    </FormControl>
  )
}
