const authenAuthor = require('./authenAuthor')
const nhaplieuRouter = require('./nhaplieu')
const dataRouter = require('./data')
const thongkeRouter = require('./thongke')
const taikhoanRoute = require('./taikhoan')
const mysqlModel = require('../app/models/MysqlModel')

function route(app) {
    // home
    app.get('/', (req, res) => {
        res.render('home', {user: req.session.user})
    })

    // dangnhap
    app.get('/dangnhap', (req, res, next) => {
        res.render('special/dangnhap', {layout: 'onlybody'})
    })

    app.post('/dangnhap', (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        mysqlModel.checkUP(username, password, (result) => {
            result = result[0];
            if(result) {
                req.session.user = result;
                res.redirect('/')
            }
            else {
                res.send('username or password is incorrect')
            }
        })
    })

    // app.use('/', authenAuthor.checklogin)

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
    

    // 404
    app.use('/', (req, res, next) => {
        res.render('error/404', {layout: 'onlybody'})
    })
}

module.exports = route;
