type ButtonPropsType = {
  name: string
  callBack: () => void
}

export const Button = (props:ButtonPropsType) => {

  const onClickHandler = () => {
    props.callBack()
    console.log()
  }

  return (
    <button onClick={onClickHandler}>{props.name}</button>
  )
}