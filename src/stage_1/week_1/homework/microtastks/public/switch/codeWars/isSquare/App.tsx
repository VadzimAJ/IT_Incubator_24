import React, {useState} from 'react';
import './App.css';


function isSquare (n : number) : boolean {
    if (n < 0) {
        return false
    } else {
        return ((Math.sqrt(n)%1) ? false : true)
    }
}
console.log (isSquare(1));

function App () {
    return (
        <div></div>
    );
}
export default App;
