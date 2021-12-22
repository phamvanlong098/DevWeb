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


module.exports = router