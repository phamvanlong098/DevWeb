const authenAuthor = require('./authenAuthor')
const nhaplieuRouter = require('./nhaplieu')
const dataRouter = require('./data')
const thongkeRouter = require('./thongke')
const taikhoanRoute = require('./taikhoan')

function route(app, db) {
    // home
    app.get('/', (req, res) => {
        res.render('home')
    })

    // data
    app.use('/data', dataRouter)
    
    // thongke
    app.use('/thongke', thongkeRouter)
   
    // nhaplieu
    app.use('/nhaplieu', nhaplieuRouter)

    // taikhoan
    app.use('/taikhoan/', taikhoanRoute)

    // test
    app.get('/abc', authenAuthor.addview)
    
}

module.exports = route;
