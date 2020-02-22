const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]

function loginCheck(loginData) {

  const user = users.find(user => {
    return user.email === loginData.email
  })

  if (!user) {
    return { isChecked: false, msg: "Email doesn't exist" }
  }

  if (user.password === loginData.password) {
    return { isChecked: true, msg: "success", user }
  } else {
    return { isChecked: false, msg: "Password is incorrect" }
  }

}

module.exports = loginCheck
