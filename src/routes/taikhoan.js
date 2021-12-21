const express = require('express')
const router = express.Router()
const mysqlModel = require('../app/models/MysqlModel')
const authenAuthor = require('./authenAuthor')

// doiMatKhau
router.get('/doiMatKhau', (req, res) => {
    res.render('special/doiMatKhau', {layout: 'onlybody'})
})

// dangxuat
router.get('/dangXuat', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

// quanlycapcon
router.get('/capcon', authenAuthor.checkManager, (req, res) => {
    mysqlModel.getTaiKhoan((result) => {
        res.render('special/capcon', {user: req.session.user, result})
    })
})

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