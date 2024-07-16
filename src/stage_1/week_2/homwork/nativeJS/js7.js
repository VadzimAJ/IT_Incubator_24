// const counterCreator = () => {
//   let preCount = 0
//   let underCount = 0
//   console.log(`preCount is ____ ${preCount++}`)
//   console.log('')
//   return (anon = () => {
//
//     let count = 0
//
//     console.log(`First count is _____${count ++}`)
//     console.log(`First underCount is ${++underCount}` )
//       return ( anonSecond = () => {
//           console.log(`second count is _____${count ++}`)
//           console.log(`second underCount is ${++underCount}` )
//         }
//     )
//   })
//
// }

// const counter = counterCreator()
// const copyCounter = counter
// const bigFlopCount = anon()
//
// console.log('Counter')
// counter ()
// console.log('')
// console.log('bigFlopCount')
// bigFlopCount()
// console.log('')
// console.log('copyCounter')
// copyCounter()
// console.log('')
// console.log('counterCreator')
// counterCreator()
// console.log('')
// console.log('anon')
// anon()
//
// console.log('Counter')
// counter ()
// console.log('')
// console.log('bigFlopCount')
// bigFlopCount()
// console.log('')
// console.log('copyCounter')
// copyCounter()
// console.log('')
// console.log('counterCreator')
// counterCreator()
// console.log('')
// console.log('anon')
// anon()
//
// console.log('Counter')
// counter ()
// console.log('')
// console.log('bigFlopCount')
// bigFlopCount()
// console.log('')
// console.log('copyCounter')
// copyCounter()
// console.log('')
// console.log('counterCreator')
// counterCreator()
// console.log('')
// console.log('anon')
// anon()


const saveUser = (logger) => (user) => {
  logger (`Save user id : ${user.id}`);
}

const saveAdmin = (logger) => (user) => {
  logger (`Save admin id : ${user.id}`);
}

const saveBook = (logger) => (user) => {
  logger (`Save book id : ${user.id}`);
}

const logger = (message) => {
  console.log(`LOG: ${message}`)
}


const main =() => {
  const userSaver = saveUser(logger);
  const adminSaver = saveAdmin(logger);
  const bookSaver = saveBook(logger);


  userSaver({id: 1});
  adminSaver({id: 2});
  bookSaver({id: 3});

}

main ()


// const delay (ms) => {
//
//   return new Promice((res) => setTimeout(res, ms));
//
// }
//
// delay(1000).then(console.log('Hello'));


const promiseFetch = (url) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej('rejected');
    }, 3000);
  })
}

promiseFetch()
  .catch((err) => t+'catch1')
  .catch((err) => t+'catch2')

