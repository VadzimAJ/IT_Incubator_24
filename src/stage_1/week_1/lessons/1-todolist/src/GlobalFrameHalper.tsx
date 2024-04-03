import { FilteredValuesType, TaskType } from './App';
import { Button } from './Button';
import {PropsType} from './Todolist';
import { Todolist } from './Todolist';

interface GlobalFrameHelperProps {
  children: {
    todolist: React.ReactNode; 
  }// Пропс для передачи дочернего компонента
}

export const GlobalFrameHelper = ({ children }: GlobalFrameHelperProps) =>{

  return (
    <div className='frame-body'>
      <div className='frame-app'>
      {children.todolist}
      </div>

      <div className='frame-app-helper'>
        <p> Hello World</p>
      </div>
      
    </div>
  )
  
}

