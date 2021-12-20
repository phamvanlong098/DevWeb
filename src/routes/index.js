
const thongkeController = require('../app/controllers/ThongkeController')
const mysqlModel = require('../app/models/MysqlModel')
const nhaplieuRouter = require('./nhaplieu')

function route(app, db) {
    app.get('/', (req, res) => {
        res.render('home')
    })

    // thongke
    app.get('/thongke', thongkeController.index)
    app.get('/thongke/Tinh', thongkeController.gettinh)
    // nhaplieu
    app.use('/nhaplieu', nhaplieuRouter)

    // dangnhap
    app.get('/taikhoan/dangnhap', (req, res) => {
        res.render('special/dangnhap', {layout: 'onlybody'})
    })

    // doiMatKhau
    app.get('/taikhoan/doiMatKhau', (req, res) => {
        res.render('special/doiMatKhau', {layout: 'onlybody'})
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

    // quanlycapcon
    app.get('/sidebar', (req, res) => {
        res.render('test/sidebar', {})
    })

    app.get('/xa', (req, res) => {
       mysqlModel.getXa((result) => {
            res.json(result)
       })
    })
}

module.exports = route;
