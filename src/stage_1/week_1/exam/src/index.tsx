const student = {
  name: "Artur"
}

const newStudent = student 

const myFriend = {
  ...newStudent 
}

const newUser = { 
  name: "Leonid"
}

const myFriendName =  student.name !== myFriend.name 
    ? newUser.name
    : student.name

/*Какое значение получит переменная "myFriendName"?*/
console.log(myFriendName)