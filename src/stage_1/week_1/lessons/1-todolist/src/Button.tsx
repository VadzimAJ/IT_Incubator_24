
import React from 'react'

type ButtonPropsType = {
  title: string
  onClick: () => void
  className?: string
  isDisabled?: boolean
  
} 



export const Button = ({title, className, isDisabled, onClick}:ButtonPropsType) => {
  const onClickHandler = () => {
    onClick()
  }
  
  return (
    <button className={className} onClick={onClickHandler} disabled ={isDisabled}>
      {title}
    </button>
  )
}
