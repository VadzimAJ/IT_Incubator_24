import React from 'react'

type ButtonPropsType = {
  name: string,
  callBack: () => void
}



export const Button = (props:ButtonPropsType) => {

  const onClickEventHandler = () => {
    props.callBack()
  }

  return (
    <button onClick={onClickEventHandler}>{props.name}</button>
  )
}
