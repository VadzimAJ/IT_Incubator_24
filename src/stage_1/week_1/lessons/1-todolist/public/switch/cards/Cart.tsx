import React, {useState} from 'react'
import { Button } from './Button'

type CartPropsType = {
    title: string
    src: string
    numberLesson: number
    likes: number
}

export const Cart = ({title, src, numberLesson, likes}: CartPropsType) => {

  const kriczyKurva = () => {alert("kurva bober!!!!")}

  let простойСчётчик = 300
  

  const Быдлофункция = () => {
    простойСчётчик = простойСчётчик + 1
    console.log(простойСчётчик)
  }

  const [крутойСчетчик, функцияКрутогоСчётчика] = useState(likes)

  const обработкаКрутойФункции = () => {
    функцияКрутогоСчётчика (крутойСчетчик + 1)
  }

  return (
    <div className={'card'}>
                <img alt={'some img'} src={src}/>
                <p className={'topicLesson'}>{title}</p>
                <p className={'numberLesson'}>{numberLesson}</p>
                <div className={'footer'}>
                    <p>БыдлоЛайки: {простойСчётчик}</p>
                    <p>МегаЛайки: {крутойСчетчик}</p>
                </div>
                <Button title="bez useState"
                  pushTheButton={Быдлофункция}
                />
                <Button title="useState"
                  pushTheButton={обработкаКрутойФункции}
                />
                <Button title="222"
                  pushTheButton={kriczyKurva}
                />
            </div>
  )
}
