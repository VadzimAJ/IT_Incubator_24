import React, { ChangeEvent, useState } from 'react'

type PropsType = {
  value: string
  tag: keyof JSX.IntrinsicElements
}

export const EditableTag = ({value, tag: Tag}: PropsType) => {

  const [editMode, setEditMode] = useState (false)
  const [title, setTitile] = useState (value)

  const activeEditModeHandler = () => {
    setEditMode(!editMode)
  }

  const deactivateEditModeHandler = () => {
    setEditMode(!editMode)
  }

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitile(event.currentTarget.value)
  }

  return (
    <>
      {editMode ? <input 
                    value={title} 
                    onChange={changeTitleHandler}
                    onBlur={deactivateEditModeHandler} 
                    autoFocus
                    /> : 
                  <Tag 
                    onDoubleClick={activeEditModeHandler}> 
                    {title}
                  </Tag>}
      
    </>
    
  )
}