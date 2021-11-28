const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const morgan = require('morgan')
const port = 3000

// http log
app.use(morgan('combined'))

// express-handlebars
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
// app.set('views', path.join(__dirname, 'resources/views/layouts'));


// app
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  // res.send('123')
  res.render('home')
})


app.listen(port, () => {

  console.log(`Example app listening at http://localhost:${port}`)

})