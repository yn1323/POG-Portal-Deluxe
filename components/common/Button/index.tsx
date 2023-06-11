import { Button as LibButton } from "@chakra-ui/react";

export const Button = () => {
  fetch("/user")
    .then((res) => res.json())
    .then(console.log);
  return <LibButton>This is button</LibButton>;
};
