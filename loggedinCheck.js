// require secret json
const secret = require('./secret.json').secret
// require crypto
const crypto = require('crypto');

// users
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

function loggedinCheck(JWT) {
  // check JWT exist
  if (JWT === undefined || JWT.split('.').length !== 3) {
    return { isLoggedin: false }
  }

  // check signature
  const signature = crypto.createHmac('sha256', `${JWT.split('.')[0]}.${JWT.split('.')[1]}, ${secret}`).update("json").digest("base64");

  if (JWT.split('.')[2] === signature) {

    // payload
    const payload_base64 = JWT.split('.')[1]
    const payload_json = JSON.parse(Buffer.from(payload_base64, 'base64').toString())

    const user = users.find(user => {
      return user.email === payload_json.email
    })

    return { isLoggedin: true, user }

  }
  return { isLoggedin: false }

  // // header
  // const header_base64 = JWT.split('.')[0]
  // const header_json = JSON.parse(Buffer.from(header_base64, 'base64').toString())

}

module.exports = loggedinCheck