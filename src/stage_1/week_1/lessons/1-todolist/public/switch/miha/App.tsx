import { Todolist } from './Todolist';
import './App.css';

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}


function App() {
    const task1 = [
        //0
        {id: 1, title:'HTML&CSS', isDone:false},
        //1
        {id: 2, title:'JS HUES&CSS', isDone:true},
        //2
        {id: 3, title:'HTML&CSS', isDone:true}
    ]

    const task2 = [
        {id: 1, title:'MILK', isDone:true},
        
        {id: 2, title:'Patato', isDone:false},

        {id: 3, title:'Beer', isDone:false}
        
    ]


    const a = 1;


    const titleTodolist1 = "Whot to Learen"
    const titleTodolist2 = 'Whot to Buy'

    console.log (a)
    console.log(task2[0].title)

    return (

        
        <div className="App">
            <Todolist title= {titleTodolist1} task = {task1}/>
            <Todolist title=  {titleTodolist2} task = {task2}/>
        </div>
    );
}


export default App;
