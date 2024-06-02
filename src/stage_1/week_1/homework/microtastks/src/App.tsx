import React, {useState} from 'react';
import './App.css';
import { FieldComponent } from './FieldComponent';


function isSquare (n : number) : boolean {
    if (n < 0) {
        return false
    } else {
        return ((Math.sqrt(n)%1) ? false : true)
    }
}
console.log (isSquare(9));

function App () {
    return (
        <div>
            <FieldComponent/>
        </div>
    );
}
export default App;
