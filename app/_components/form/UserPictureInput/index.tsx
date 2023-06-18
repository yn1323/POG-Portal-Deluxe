'use client'

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Image,
  HStack,
  Button,
} from '@chakra-ui/react'
import { useMemo, useRef } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  url: string
  onUploadImage: () => Promise<void>
}
export const UserPictureInput = ({ url, onUploadImage }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    register,
    formState: { errors },
  } = useFormContext<{ picture: string }>()

  const errorMessage = useMemo(
    () => errors.picture?.message,
    [errors.picture?.message]
  )

  const onClickButton = () => {
    inputRef.current?.click()
  }

  return (
    <FormControl id="picture" isInvalid={!!errors.picture}>
      <FormLabel>アバター</FormLabel>
      <InputGroup>
        <HStack justifyContent={'space-around'} w="100%">
          <Image borderRadius="full" boxSize="100px" src={url} alt="avatar" />
          <Button size="sm" onClick={() => onClickButton()}>
            画像アップロード
          </Button>
          <input
            type="file"
            ref={inputRef}
            hidden
            onChange={e => console.log(e)}
          />
        </HStack>
        <Input
          hidden
          data-testid="password"
          role="textbox"
          maxLength={40}
          {...register('picture')}
        />
      </InputGroup>
      {errorMessage && (
        <FormHelperText color="crimson">{errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}
