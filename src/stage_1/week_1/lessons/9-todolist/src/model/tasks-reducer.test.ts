
import { v1 } from 'uuid'
import { TasksStateType } from '../App'
import { 
  tasksReducer,
  removeTaskAC, 
  addTaskAC, 
  changeTaskStatusAC, 
  changeTaskTitleAC } from './tasks-reducer'
import { removeTodolistAC } from './todolists-reducer'


let todolistId1: string
let todolistId2: string
let startState: TasksStateType = {}

beforeEach (()=>{
  todolistId1 = v1()
  todolistId2 = v1()

  startState = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  }

})

test('correct task should be deleted from correct array', () => {
 
 
  const endState = tasksReducer(startState, 
    removeTaskAC( {
    todolistId: 'todolistId2',
    taskId: '2',
  }))
 
  expect(endState).toEqual({
    
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '3', title: 'tea', isDone: false },
    ],
  })
})

test('correct task should be added to correct array', () => {
 
  const endState = tasksReducer(startState, addTaskAC({ title: 'juce', todolistId: 'todolistId2' }))
 
  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juce')
  expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of tatus task should be changed', () => {

  const endState = tasksReducer(
    startState,
    changeTaskStatusAC({
      taskId: '2',
      isDone: false,
      todolistId: 'todolistId2',
    })
  )

  expect(endState['todolistId1'][1].isDone).toBeTruthy()
  expect(endState['todolistId2'][1].isDone).toBeFalsy()
})

test('status of Title task should be changed', () => {

  const endState = tasksReducer(
    startState,
    changeTaskTitleAC({
      taskId: '2',
      title: 'New Title',
      todolistId: 'todolistId2',
    })
  )

  expect(endState['todolistId1'][1].title).toBe('JS')
  expect(endState['todolistId2'][1].title).toBe('New Title')
})

test('property with todolistId should be deleted', () => {
 
  const action = removeTodolistAC('todolistId2')
 
  const endState = tasksReducer(startState, action)
 
  const keys = Object.keys(endState)
 
  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
  // or
  expect(endState['todolistId2']).toBeUndefined()
})