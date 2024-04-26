type BodyPropsType = {
  titleForBody: string
}

export const Body = (props:BodyPropsType) => {
  return (
    <body>{props.titleForBody}</body>
  )
}