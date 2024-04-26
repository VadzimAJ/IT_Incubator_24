
type NewComponentType = {
  students: StudentsPropsType[]
}

type StudentsPropsType = {
  id: number,
  name: string,
  age: number
}

export const NewComponent = (props:NewComponentType) => {

  const topCars = [
    {manufacturer:'BMW', model:'m5cs'},
    {manufacturer:'Mercedes', model:'e63s'},
    {manufacturer:'Audi', model:'rs6'}
  ]
  
  return (
    <div>
      <ul>
      {props.students.map((e)=> {
        return (
          <li key={e.id}> <span>{e.id}. {e.name}, age: {e.age}</span></li>
        )
      })}
    </ul>
    <ul>
      {topCars.map((e, index)=> {
        
        return (
          <li key={index}> <span>Concern: {e.manufacturer}, modell {e.model}</span></li>
        )
      })}
    </ul>
    </div>
    
  )
}