import {ManType} from './MapLesson'

  let people: Array<ManType> = []

  beforeEach (() => {
    people = [
      {name: 'Andrey Andreyev', age: 33},
      {name: 'Alex Alexeev', age: 29},
      {name: 'Dmitro Dmitryev', age: 19}
    ]
  })

  test ("shold get ", () => {
    const message = people.map (man => `Hello ${man.name.split(' ')[0]}. Welcome to Hub`)

    expect(message.length).toBe(3);
    expect(message[0]).toBe('Hello Andrey. Welcome to Hub');
    expect(message[1]).toBe('Hello Alex. Welcome to Hub');
    expect(message[2]).toBe('Hello Dmitro. Welcome to Hub');
  })