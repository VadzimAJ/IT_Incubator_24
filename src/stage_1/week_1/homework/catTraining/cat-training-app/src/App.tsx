import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from './Button';

function App() {

  const [color, setColor] = useState ({color1: true, color2: true})

  const alertOnClick = () => {
    setColor((prevColor) => ({ ...prevColor, color1: !prevColor.color1 }));
  };

  const alertOnClick2 = () => {
    setColor((prevColor) => ({ ...prevColor, color2: !prevColor.color2 }));
  };

  const onOffColor = (c:boolean) => {
    return c ? 'green' :'red';
    }

  const divStyle = {
    width: '20px',
    height: '20px', 
    borderRadius: '10px', 
    backgroundColor: onOffColor(color.color1)
  }

  const divStyle2 = {
    width: '20px',
    height: '20px', 
    borderRadius: '10px', 
    backgroundColor: onOffColor(color.color2)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div style={divStyle}></div>
        <div style={divStyle2}></div>
        <Button title={'Knopka'} callBack={alertOnClick}/>
        <Button title={'Hyepka'} callBack={alertOnClick2}/>
      </header>
    </div>
  );
}

export default App;
