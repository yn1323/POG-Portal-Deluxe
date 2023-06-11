'use client'

type Props = {}

export const {{ inputs.component | pascal }} = ({}: Props) => {
  fetch("/user")
    .then((res) => res.json())
    .then(console.log);
  return <div>aaa</div>
};
