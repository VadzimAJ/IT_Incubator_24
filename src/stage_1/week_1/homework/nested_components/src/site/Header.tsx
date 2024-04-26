type HeaderType = {
  titleForHeader: string
}

export const Header = (props:HeaderType) => {
  return (
    <header>{props.titleForHeader}</header>
  )
}
