const express = require('express')
const router = express.Router()
const mysqlModel = require('../app/models/MysqlModel')
const authenAuthor = require('./authenAuthor')

// quanlycapcon
router.get('/capcon', authenAuthor.checkManager, (req, res, next) => {
    let user = req.session.user
    res.render('special/capcon', {user})
})

function getCapCon(user) {
    switch (user.cap) {
		case 'Admin': {
            return 'A1'
			break;
		}
		case 'A1': {
			return 'A2'
			break;
		}
		case 'A2': {
			return 'A3'
			break;
		}
		case 'A3': {
			return 'B1'
			break;
		}
		case 'B1': {
			return 'B2'
			break;
		}
		default: {
			return;
		}
	}
}

// [PUT] capcon/acount
router.put('/capcon/account', authenAuthor.checkManager, (req, res, next) => {
    let tai_khoan = req.body.username
    let mat_khau = req.body.password
    let cap = getCapCon(req.session.user)
    mysqlModel.updateTaiKhoan({tai_khoan, mat_khau, cap}, (result) => {
        res.json(result)
    })
})

// [PUT] capcon/deathline
router.put('/capcon/deathline', authenAuthor.checkManager, (req, res, next) => {
    let tai_khoan = req.body.username
    let thoi_han = req.body.deathline
    let cap = getCapCon(req.session.user)
    mysqlModel.updateThoiHan({tai_khoan, thoi_han, cap}, (result) => {
        res.json(result)
    })
})

// [GET] capcon/account
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
            table = `taikhoan RIGHT JOIN tinh_thanhpho ON tinh_thanhpho.id = tai_khoan`
            where = `1`
            break;
        }
        case "A2" : {
            table = `taikhoan RIGHT JOIN huyen_quan ON huyen_quan.id = tai_khoan`
            where = `id LIKE '${username}%'`
            break;
        }
        case "A3" : {
            table = `taikhoan RIGHT JOIN xa_phuong ON xa_phuong.id = tai_khoan`
            where = `id LIKE '${username}%'`
            break;
        }
        case "B1" : {
            table = `taikhoan RIGHT JOIN xom_thonto ON xom_thonto.id = tai_khoan`
            where = `id LIKE '${username}%'`
            break;
        }
        default: {
            throw new Error("phan trang that bai!")
            break;
        }
    }
    mysqlModel.phanTrang({table, where, page}, (result) => {
        result.cap = user.cap
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
        case "Admin" : {
            table = `taikhoan`
            where = `cap = 'A1'`
            break;
        }
        case "A1" : {
            table = `tinh_thanhpho`
            where = `1`
            break;
        }
        case "A2" : {
            table = `huyen_quan`
            where = `id LIKE '${username}%'`
            break;
        }
        case "A3" : {
            table = `xa_phuong`
            where = `id LIKE '${username}%'`
            break;
        }
        case "B1" : {
            table = `xom_thonto`
            where = `id LIKE '${username}%'`
            break;
        }
        default: {
            throw new Error("phan trang that bai!")
            break;
        }
    }
    mysqlModel.phanTrang({table, where, page}, (result) => {
        result.cap = user.cap
        res.json(result)
    })
})

module.exports = router