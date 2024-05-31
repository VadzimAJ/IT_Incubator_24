import React, {useState} from 'react';
import './App.css';


const a = 7;
const toBinary = a.toString(2)
const count = toBinary.split('0').join('').length;
console.log (count);

function App () {
    return (
        <div></div>
    );
}
export default App;
