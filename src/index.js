const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const db = require('./app/models/MysqlConfig')
const methodOverride = require('method-override')
const route = require('./routes')
const app = express()
const port = 3000

// overide method to use put patch delete 
app.use(methodOverride('_method'))

// middleware cho req.body
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// http log
// app.use(morgan('combined'))

// express-handlebars
app.engine('hbs', exphbs({extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

// app
app.use(express.static(path.join(__dirname, 'public')))

// route direct
route(app, db)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)

})