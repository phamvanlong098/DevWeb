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
    res.render('special/capcon', {user})
})

// // quanlycapcon/acount
// router.get('/capcon/account', authenAuthor.checkManager, (req, res, next) => {
//     let user = req.session.user
//     mysqlModel.getTaiKhoanCon(user, (result) => {
//         res.json(result)
//     })
// })

// quanlycapcon/deathline
router.get('/capcon/account', authenAuthor.checkManager, (req, res, next) => {
    let user = req.session.user;
    let username = user.tai_khoan;
    let table = ""
    let where = ""
    let page = parseInt(req.query.page);
    if(!page || page < 1) page = 1;
    switch(user.cap) {
        case "Admin" : {
            table = `taiKhoan`
            where = `cap != 'Admin' ORDER BY cap`
            break;
        }
        case "A1" : {
            table = `taikhoan JOIN tinh_thanhpho ON tinh_thanhpho.id = tai_khoan`
            where = `cap = 'A2'`
            break;
        }
        case "A2" : {
            table = `taikhoan JOIN huyen_quan ON huyen_quan.id = tai_khoan`
            where = `cap = 'A3' AND tai_khoan LIKE '${username}%'`
            break;
        }
        case "A3" : {
            table = `taikhoan JOIN xa_phuong ON xa_phuong.id = tai_khoan`
            where = `cap = 'B1' AND tai_khoan LIKE '${username}%'`
            break;
        }
        case "B1" : {
            table = `taikhoan JOIN xom_thonto ON xom_thonto.id = tai_khoan`
            where = `cap = 'B2' AND tai_khoan LIKE '${username}%'`
            break;
        }
        default: {
            throw new Error("phan trang that bai!")
            break;
        }
    }
    mysqlModel.phanTrang({table, where, page}, (result) => {
        res.json(result)
    })
})

// capcon/area
router.get('/capcon/area', authenAuthor.checkManager, (req, res, next) => {
    let user = req.session.user;
    let username = user.tai_khoan;
    let table = ""
    let where = ""
    let page = parseInt(req.query.page);
    if(!page || page < 1) page = 1;
    switch(user.cap) {
        case "A1" : {
            table = `tinh_thanhpho`
            where = `1`
            break;
        }
        case "A2" : {
            table = `huyen_quan`
            where = `1`
            break;
        }
        case "A3" : {
            table = `xa_phuong`
            where = `1`
            break;
        }
        case "B1" : {
            table = `xom_thonto`
            where = `1`
            break;
        }
        default: {
            throw new Error("phan trang that bai!")
            break;
        }
    }
    mysqlModel.phanTrang({table, where, page}, (result) => {
        res.json(result)
    })
})

module.exports = router