import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from './Button';

function App() {

  const Jit = () => {
  return (<input/>)
}

  return (
    <div className="App">
      <Button title={'Кнопка'} Жмякалка={() => {alert("Boroda")}}/>
      <Button title={'Кропка'} Жмякалка={() => {alert("Koloda")}}/>
      <Button title={'sdfdsf'} Жмякалка={() => {alert("Boroda")}}/>
      <Jit/>
    </div>
  );
}

export default App;
