import React, { useState } from 'react';
import './App.css';
import { FullInput } from './components/Fullinput';
import {Input} from './components/Input';
import {Button} from './components/Button';

function App() {
    const [message, setMessage] = useState([
        { message: 'message1' },
        { message: 'message2' },
        { message: 'message3' },
        { message: 'message4' },
        { message: 'message5' }
    ])

    let [title, setTitle] = useState ('')
    console.log(title)

    const addMassage = (title:string) => {
        let newMassage = {message: title}

        setMessage ([newMassage, ...message])
        setTitle('')
    }

    const callBackButtonHandler = () => {
        addMassage(title)
    }

    return (
        <div className="App">

            {/* <FullInput addMassage={addMassage}/> */}
            <>
            <Input setTitle={setTitle} title={title} />
            <Button name = {'+'} callBack={callBackButtonHandler}/>
            </>
            {message.map((el, index) => {
                return (
                    <div key={index}>{el.message}</div>
                )
            })}
            
            
        </div>
    );
}
export default App;
