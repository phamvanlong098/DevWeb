const authenAuthor = require('./authenAuthor')
const nhaplieuRouter = require('./nhaplieu')
const dataRouter = require('./data')
const thongkeRouter = require('./thongke')
const taikhoanRoute = require('./taikhoan')
const quanlyRoute = require('./quanly')
const mysqlModel = require('../app/models/MysqlModel')

function route(app) {
    // home
    app.get('/', (req, res) => {
        // let user = {
        //     tai_khoan: "admin",
        //     mat_khau: "admin",
        //     cap: "admin"
        // }
        // let roles = ["Full"]
        // req.session.user = user
        // req.session.roles = roles
        res.render('home', {user: req.session.user})
    })

    // dangnhap
    app.get('/dangnhap', (req, res, next) => {
        res.render('special/dangnhap', {layout: 'onlybody'})
    })

    app.post('/dangnhap', 
    (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        mysqlModel.checkUP(username, password, (result) => {
            result = result[0];
            if(result) {
                req.session.user = result
                next()
            }
            else {
                res.send('username or password is incorrect')
                return;
            }
            
        })
    },
    (req, res, next) => {
        mysqlModel.getQuyen(req.session.user.cap, (roles) => {
            req.session.roles = []
            roles.map((role) => {
                req.session.roles.push(role.quyen)
            })
            res.redirect('/')
        })
    }
    )

// check dangNhap = on/off
app.use('/', authenAuthor.checkLogin)

    // data
    app.use('/data', dataRouter)

    // check dangNhap = on/off
    app.use('/', authenAuthor.checkLogin)

    
    // thongke
    app.use('/thongke', thongkeRouter)
   
    // nhaplieu
    app.use('/nhaplieu', authenAuthor.checkCreate, nhaplieuRouter)
    
    // capcon
    app.use('/quanly', authenAuthor.checkManager, quanlyRoute)

    // taikhoan
    app.use('/taikhoan/', taikhoanRoute)
    
    // 404
    app.use('/', (req, res, next) => {
        res.render('error/error', 
        {errCode: 404, errMsg: "Trang này không tồn tại.", layout: 'onlybody'})
    })
}

module.exports = route;
