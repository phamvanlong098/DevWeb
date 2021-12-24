const express = require('express')
const router = express.Router()
const mysqlModel = require('../app/models/MysqlModel')
const authenAuthor = require('./authenAuthor')

// doiMatKhau
router.get('/doiMatKhau', (req, res) => {
    res.render('special/doiMatKhau', {layout: 'onlybody'})
})

// doiMatKhau
router.post('/doiMatKhau', (req, res) => {
    let old_password = req.body.old_password
    let new_password = req.body.new_password
    let renew_password = req.body.renew_password
    let username = req.session.user.tai_khoan
    if(req.session.user.mat_khau == old_password) {
        mysqlModel.changePassword(username, new_password, (result) => {
            res.render('special/doiMatKhauThanhCong', {layout: 'onlybody'})
        })
    }
    else {
        res.render('error/error', {errCode: 400, errMsg: "Mật khẩu cũ của bạn không đúng.", layout: 'onlybody'})
    }
})

// dangxuat
router.get('/dangXuat', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

// quanlycapcon
router.get('/capcon', authenAuthor.checkManager, (req, res, next) => {
    let user = req.session.user
    mysqlModel.getTaiKhoanCon(user, (result) => {
        res.render('special/capcon', {user, result})
    })
})

// quanlycapcon/acount
router.get('/capcon/account', authenAuthor.checkManager, (req, res, next) => {
    let user = req.session.user
    mysqlModel.getTaiKhoanCon(user, (result) => {
        res.json(result)
    })
})

// quanlycapcon/deathline
router.get('/capcon/deathline', authenAuthor.checkManager, (req, res, next) => {
    let user = req.session.user
    mysqlModel.getThoiHan(user, (result) => {
        res.json(result)
    })
})

module.exports = router