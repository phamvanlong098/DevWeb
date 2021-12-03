
const thongkeController = require('../app/controllers/ThongkeController')
const mysqlModel = require('../app/models/MysqlModel')
const nhaplieuRouter = require('./nhaplieu')

function route(app, db) {
    app.get('/', (req, res) => {
        res.render('home')
    })

    // thongke
    app.get('/thongke', thongkeController.index)

    // nhaplieu
    app.use('/nhaplieu', nhaplieuRouter)

    // dangnhap
    app.get('/dangnhap', (req, res) => {
        res.render('others/dangnhap')
    })
}

module.exports = route;