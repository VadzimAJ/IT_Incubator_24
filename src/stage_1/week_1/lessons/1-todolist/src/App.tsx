import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {log} from "node:util";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<TodolistType[]>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState({
    [todolistID1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todolistID2]: [
      {id: v1(), title: 'Rest API', isDone: true},
      {id: v1(), title: 'GraphQL', isDone: false},
    ],
  })
  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter} : el))
  }
  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
  }
  const removeToDo = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
		delete tasks[todolistId]
  }
  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)})
  }

  const addTask = ((todolistId: string, title: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false
    }
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
  })

  return (

    <div className="App">
      {

        todolists.map(tl => {
					console.clear()
          console.log(todolists)
					console.log(tasks)
          let tasksForTodolist = tasks[tl.id]
          if (tl.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
          }
          if (tl.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
          }
          return (
            <Todolist
              key={tl.id}
              todolistId={tl.id}
              title={tl.title}
              tasks={tasksForTodolist}
              removeToDo={removeToDo}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeTaskStatus}
              filter={tl.filter}
            />
          )
        })
      }
    </div>
  );
}

export default App;