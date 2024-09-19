import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './logo.png';
import logo1 from './logo.jpg';
import logo2 from './dzigueda.jpg';
import bober from './bober.jpg';
import { Button } from './Button';
import { Counter } from './Counter';
import { Settings } from './SettingsOfCounter';

export type StrartCounterType = {
    startValue: number
    maxValue: number
    counterAcc: number
    clickOnCounterOrSettings: boolean
    settingsValuesIsTrue: boolean
}

function App() {

    const [startValues, setStartValues] = useState<StrartCounterType> ({
        startValue: 0,
        maxValue: 10,
        counterAcc: 0,
        clickOnCounterOrSettings: true,
        settingsValuesIsTrue: true
    })

    const upCounter = () => {
        setStartValues(prevState => {
            const newCounterAcc = prevState.counterAcc + 1;
            console.log(`Updating counterAcc to ${newCounterAcc}`);
            return {
                ...prevState,
                counterAcc: newCounterAcc
            };
        });
    }

    const setSettings = (startValue: number, maxValue: number) => {
        setStartValues({...startValues, startValue: startValue, maxValue: maxValue});
    }

    const resetCounter = () => {
        localStorage.clear();
        localStorage.setItem('counterValue', JSON.stringify(startValues.startValue));
        setStartValues({...startValues, counterAcc: startValues.startValue});
    }

    const handleComponentClick = (clickOnCounterOrSettings: boolean) => {
        setStartValues({...startValues, clickOnCounterOrSettings: clickOnCounterOrSettings});
    }

    useEffect(() => {
        console.log('State updated:', startValues);
    }, [startValues]);

    return (
        <div className="App">
            <Settings
                startValue={startValues.startValue}
                maxValue={startValues.maxValue}
                clickOnCounterOrSettings={startValues.clickOnCounterOrSettings}
                settingsValuesIsTrue={startValues.settingsValuesIsTrue}
                setSettings={setSettings}
                handleComponentClick={handleComponentClick}
            />
            <Counter
                counterAcc={startValues.counterAcc}
                maxValue={startValues.maxValue}
                clickOnCounterOrSettings={startValues.clickOnCounterOrSettings}
                settingsValuesIsTrue={startValues.settingsValuesIsTrue}
                upCounter={upCounter}
                resetCounter={resetCounter}
                handleComponentClick={handleComponentClick}
            />
        </div>
    );
}

export default App;
