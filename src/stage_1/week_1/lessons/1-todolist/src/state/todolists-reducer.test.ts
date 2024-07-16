import { AddTodolistAC, changeTodolistFilterAC, changeTodolistTitle, removeTodolistAC, todolistsReducer } from './todolists-reducer'
import { v1 } from 'uuid'
import { TasksStateType, TodolistType } from '../App'
import { tasksReducer } from './tasks-reducer'

let todolistId1: string
let todolistId2: string
let startState: Array <TodolistType>


beforeEach(() => {
  todolistId1 = v1(); // Используем глобальные переменные для хранения id
  todolistId2 = v1();

  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
});

test('correct todolist should be removed', () => {
  // let todolistId1 = v1()
  // let todolistId2 = v1()

  // // 1. Стартовый state
  // const startState: TodolistType[] = [
  //   { id: todolistId1, title: 'What to learn', filter: 'all' },
  //   { id: todolistId2, title: 'What to buy', filter: 'all' },
  // ]

  // 2. Действие
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

  // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
  // в массиве останется один тудулист
  expect(endState.length).toBe(1)
  // удалится нужный тудулист, а не любой
  expect(endState[0].id).toBe(todolistId2)
})

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: TodolistType[] = [];

  const action = AddTodolistAC('new todolist');
  

  //????????????????????????????
      //????????????????????????????
      //????????????????????????????
      
  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)
  console.log('endTasksState is ', endTasksState)
  console.log('endTodolistsState is ', endTodolistsState)
  
  //????????????????????????????
      //????????????????????????????
      //????????????????????????????

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id


  expect(idFromTasks).toBe(action.payload.todolistId)
  expect(idFromTodolists).toBe(action.payload.todolistId)
  
})

test('correct todolist should change its name', () => {

  const newTitile = 'New Todolist'
  const endState = todolistsReducer(startState, changeTodolistTitle(todolistId2, newTitile))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTitile)
})


test('correct filter of todolist should be changed', () => {

  const newFilter = 'completed'
  const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})

test('property with todolistId should be deleted', () => {
  const startState: TasksStateType = {
      'todolistId1': [
          {id: '1', title: 'CSS', isDone: false},
          {id: '2', title: 'JS', isDone: true},
          {id: '3', title: 'React', isDone: false}
      ],
      'todolistId2': [
          {id: '1', title: 'bread', isDone: false},
          {id: '2', title: 'milk', isDone: true},
          {id: '3', title: 'tea', isDone: false}
      ]
  }

  const action = removeTodolistAC('todolistId2')

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})
