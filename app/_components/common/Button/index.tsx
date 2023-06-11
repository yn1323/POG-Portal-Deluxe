import { Button as LibButton } from '@chakra-ui/react'
import { useState } from 'react'

export const Button = () => {
  const a = useState()
  fetch('/user')
    .then(res => res.json())
    .then(console.log)
  return <LibButton>This is button</LibButton>
}
