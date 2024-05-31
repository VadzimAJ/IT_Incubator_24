import { Agent } from 'http'
import React from 'react'

export type ManType = {
  name: string
  age: number
}


function MapLesson() {
  const people: Array<ManType> = [
    {name: 'Andrey Andreyev', age: 33},
    {name: 'Alex Alexeev', age: 29},
    {name: 'Dmitro Dmitryev', age: 19}
  ]

  // const manToDevTransormator = (man: ManType) => ({
  //     stack: ['css, html', 'js, ts', 'tdd', 'react' ],
  //     firstName: man.name.split(" ")[0],
  //     lastName: man.name.split(" ")[1]
  // })

  // let d1 = manToDevTransormator(people[0]);
  // console.log(d1);

  const devArr = people.map (man => ({
    stack: ['css, html', 'js, ts', 'tdd', 'react' ],
    firstName: man.name.split(" ")[0],
    lastName: man.name.split(" ")[1]
}));

  const message = people.map (man => `Hello ${man.name.split(' ')[0]}. Welcome to Hub`)
 
console.log(devArr);

  return (
    <div>
      {devArr.map((dev, index) => (
          <div key={index}>
            <p> Firts Name : {dev.firstName}</p>
            <p> Last Name : {dev.lastName}</p>
            <p> Stack: {dev.stack.join(', ')}</p>
            <p>_______</p>
          </div>
          
        ))
      }

    </div>
  )
}

export default MapLesson