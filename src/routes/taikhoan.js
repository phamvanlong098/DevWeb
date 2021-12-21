const express = require('express')
const router = express.Router()
const mysqlModel = require('../app/models/MysqlModel')

// dangnhap
router.get('/dangnhap', (req, res) => {
    res.render('special/dangnhap', {layout: 'onlybody'})
})

// doiMatKhau
router.get('/doiMatKhau', (req, res) => {
    res.render('special/doiMatKhau', {layout: 'onlybody'})
})

// dangxuat
router.get('/dangXuat', (req, res) => {
    res.redirect('/')
})

// quanlycapcon
router.get('/capcon', (req, res) => {
    mysqlModel.getTaiKhoan((result) => {
        res.render('special/capcon', {result})
    })
})


// session
router.get('/', (req, res, next) => {
    res.redirect('/taikhoan/login')
})

router.get('/login', (req, res, next) => {
    res.render('special/login')
})

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    mysqlModel.getTaiKhoan((result) => {
        res.json(result)
    })
})


// router.post('/logout', (req, res, next) => {
//     req.session.destroy()
//     res.status(300).redirect('/')
// })


// function checklogin(req, res, next) {
//     if(req.session.data) {
//         next()
//     }
//     else {
//         res.status(300).redirect('/login')
//     }
// }

// function checkStudent(req, res, next) {
//     const role = req.session.data.role;
//     if(role === 'student' || role === 'teacher' || role === 'manager') {
//         next()
//     }
//     else{
//         res.send('NO PERMITTION')
//     }
// }
// function checkTeacher(req, res, next) {
//     const role = req.session.data.role;
//     if(role === 'teacher' || role === 'manager') {
//         next()
//     }
//     else{
//         res.send('NO PERMITTION')
//     }
// }
// function checkManager(req, res, next) {
//     const role = req.session.data.role;
//     if(role === 'manager') {
//         next()
//     }
//     else{
//         res.send('NO PERMITTION')
//     }
// }

// router.get('/student', checklogin, checkStudent, (req, res, next) => {
//     res.sendFile(path.join(__dirname, 'logout.html'))
// })
// router.get('/teacher', checklogin, checkTeacher, (req, res, next) => {
//     res.send('teacher')
// })
// router.get('/manager', checklogin, checkManager, (req, res, next) => {
//     res.send('manager')
// })


module.exports = router