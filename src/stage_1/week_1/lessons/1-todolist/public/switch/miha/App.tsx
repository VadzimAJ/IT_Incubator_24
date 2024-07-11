import { Todolist } from './Todolist';
import './App.css';

function App() {
    return (
        <div className="App">
            <Todolist title="Whot to Learen" />
            <Todolist title= {1}/>
            <Todolist title= {false}/>
        </div>
    );

    const a = 'asd'
    console.log(a)
}


export default App;
