import React, { useState } from 'react';
import './App.css';
import { FullInput } from './components/Fullinput';

function App() {
    const [message, setMessage] = useState([
        { message: 'message1' },
        { message: 'message2' },
        { message: 'message3' },
        { message: 'message4' },
        { message: 'message5' }
    ])

    const addMassage = (title:string) => {
        let newMassage = {message: title}

        setMessage ([newMassage, ...message])

        
      }

    return (
        <div className="App">

            <FullInput addMassage={addMassage}/>

            {message.map((el, index) => {
                return (
                    <div key={index}>{el.message}</div>
                )
            })}
        </div>
    );
}
export default App;
