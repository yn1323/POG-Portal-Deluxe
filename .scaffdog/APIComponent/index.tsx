export const {{ inputs.component | pascal }} = () => {
  fetch("/user")
    .then((res) => res.json())
    .then(console.log);
  return <div>aaa</div>
};
