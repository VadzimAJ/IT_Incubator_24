import { useEffect, useState } from "react"
import { Button } from "./Button"

type CounterType = {
  counterAcc: number
  maxValue: number
  clickOnCounterOrSettings: boolean
  settingsValuesIsTrue: boolean
  upCounter: (counterAcc: number) => void
  resetCounter: () => void
  handleComponentClick: (settingsValuesIsTrue: boolean) => void
}

export const Counter = (props:CounterType) => {

  const {counterAcc, maxValue, clickOnCounterOrSettings, settingsValuesIsTrue, upCounter, resetCounter, handleComponentClick} = props

  const inputLimiter = () => {
    if (!clickOnCounterOrSettings){
      if(settingsValuesIsTrue){
        if (maxValue > counterAcc) {
          return counterAcc
        } return 'Limit of count is done'
      }
    }
    return 'Input values'
    
  }

  const focusDisabler = () => {
    if (clickOnCounterOrSettings) {
      handleComponentClick(false);
    }
  }

  return (
    <div className="counter-container" onClick={focusDisabler}>
      <div className="counter-container_vue">
          <span>{inputLimiter()}</span>
      </div>
      <div className="counter-container_button">
        <Button className='' title='inc' onClick={()=>{upCounter(counterAcc)}} isDisabled={clickOnCounterOrSettings || counterAcc >= maxValue}/>
        <Button title='reset' onClick={()=>{resetCounter()}} isDisabled={clickOnCounterOrSettings}/>
      </div>
  </div>
  )
}
