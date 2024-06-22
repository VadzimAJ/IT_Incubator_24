import React, { ChangeEvent, useState } from 'react'

type PropsType = {
  value: string
  tag: keyof JSX.IntrinsicElements
  onChange: (newTitle: string) => void
}

export const EditableTag = ({value, tag: Tag, onChange}: PropsType) => {

  const [editMode, setEditMode] = useState (false)
  const [title, setTitile] = useState (value)

  const activeEditModeHandler = () => {
    setEditMode(!editMode)
  }

  const deactivateEditModeHandler = () => {
    setEditMode(!editMode)
    onChange(title)
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
                    {value}
                  </Tag>}
      
    </>
    
  )
}