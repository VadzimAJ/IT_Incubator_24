import React from 'react'

type FFFFF = {
  title: string
  Жмякалка: () => void
}

export const Button = (передача: FFFFF) => {

  const КнопокаДав = () => передача.Жмякалка()

  return (
    <button onClick={ КнопокаДав }>{передача.title}</button>
  )
}
