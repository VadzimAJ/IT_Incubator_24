import './App.css';
import {Todolist} from './Todolist';

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

function App() {

    const task1 = [
        {id : 1, title: "HTML&CSS", isDone: false },
        {id : 2, title: "JS -HUES&CSS", isDone: true },
        {id : 3, title: "React", isDone: true},
        {id : 4, title: "Pypurka", isDone: true}
    ]

    const task2 = [
        {id : 1, title: "Potato", isDone: true },
        {id : 2, title: "Bread", isDone: false },
        {id : 3, title: "Oil", isDone: false }
    ]

    return (
        <div className="App">
        <Todolist title="Whot to learn" task = {task1} />
        <Todolist title="Whot to Buy" task = {task2} />
        </div>
    );
}

export default App;