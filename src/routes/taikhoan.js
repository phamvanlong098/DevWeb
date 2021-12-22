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
router.get('/capcon', authenAuthor.checkManager, (req, res, next) => {
    let user = req.session.user
    let pid = req.session.user.tai_khoan
    if(user.cap == "admin" || user.cap == "A1") pid = "";
    mysqlModel.getTaiKhoanCon(pid, (result) => {
        res.render('special/capcon', {user: user, result})
    })
})

module.exports = router