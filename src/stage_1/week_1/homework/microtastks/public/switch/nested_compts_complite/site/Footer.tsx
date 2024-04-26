type FooterPropsType = {
  titleForFooter: string
}

export const Footer = (props:FooterPropsType) => {
  return (
    <footer>
      {props.titleForFooter}
    </footer>
  )
}