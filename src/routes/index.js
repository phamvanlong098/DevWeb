
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
    app.get('/taikhoan/dangnhap', (req, res) => {
        res.render('special/dangnhap')
    })

    // doiMatKhau
    app.get('/taikhoan/doiMatKhau', (req, res) => {
        res.render('special/doiMatKhau')
    })

    // dangxuat
    app.get('/taikhoan/dangXuat', (req, res) => {
        res.redirect('/')
    })

    // quanlycapcon
    app.get('/taikhoan/capcon', (req, res) => {
        mysqlModel.getTaiKhoan((result) => {
            res.render('special/capcon', {result})
        })
    })

    app.get('/xa', (req, res) => {
       mysqlModel.getXa((result) => {
            res.json(result)
       })
    })
}

module.exports = route;