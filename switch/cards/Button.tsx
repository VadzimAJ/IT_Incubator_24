import React from 'react'

type ПрінімаюНаРот = {
  title: string
  pushTheButton: () => void

} 



export const Button = ({title, pushTheButton}:ПрінімаюНаРот) => {
  const onClickHandler = () => {
    pushTheButton()
  }
  
  return (
    <button onClick={onClickHandler}>{title}</button>
  )
}
