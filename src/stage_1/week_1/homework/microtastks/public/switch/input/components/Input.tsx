import React, { ChangeEvent } from 'react'

type InputPropsType = {
  setTitle: (title:string) => void
  title: string
}

export const Input = (prpos: InputPropsType) => {

  const onCachangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    prpos.setTitle(event.currentTarget.value)
  }

  return (
    <input value={prpos.title} onChange={onCachangeInputHandler} />
  )
}
