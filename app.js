const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
// cookie-parser
const cookieParser = require('cookie-parser')

// require js
const loginCheck = require('./loginCheck.js')
const loginHash = require('./loginHash.js')
const loggedinCheck = require('./loggedinCheck.js')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

// setting routes
app.get('/', (req, res) => {

  // check logged in
  const { isLoggedin, user } = loggedinCheck(req.cookies.login_JWT)
  if (isLoggedin) {
    res.render('index', { user })
  } else {
    res.redirect('/login')
  }

})

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  const { isChecked, msg, user } = loginCheck({ email, password })

  if (isChecked) {
    // hash
    const login_JWT = loginHash(email)

    // Cookie
    res.cookie('login_JWT', login_JWT, { maxAge: 600000 })

    res.redirect('/')
  } else {
    res.render('login', { msg })
  }

})

app.get('/logout', (req, res) => {
  // delete Cookie
  res.clearCookie('login_JWT')

  res.redirect('/login')
})

app.listen(port, () => {
  console.log(`App is listening on localhost:${port}`)
})
