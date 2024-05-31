import React, { useState, ChangeEvent, MouseEventHandler } from "react"

type FullInputPropsType = {
  addMassage: (title: string) => void
}


export const FullInput = (props: FullInputPropsType) => {

  let [title, setTitle] = useState ('')


  const onCachangeInputHandler = (event:ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const onClickEventHandler = () => {
    props.addMassage(title)
    setTitle('')
  }

  

  return (
    <div>
      <input value ={title} onChange={onCachangeInputHandler}/>
      <button onClick={onClickEventHandler}>+</button>
    </div>
  )
}