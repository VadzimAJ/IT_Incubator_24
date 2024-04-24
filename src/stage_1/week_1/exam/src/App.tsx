
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { UsersList } from './UserList';
import { Button } from './Button'; // Импорт компонента Button из файла Button.tsx

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

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
      </header>
      <UsersList /> {/* Использование компонента UsersList */}
      <Button onClick={handleClick} /> {/* Передача функции handleClick в компонент Button */}
    </div>
  );
}

export default App;
