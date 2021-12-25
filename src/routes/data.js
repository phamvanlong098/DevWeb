const express = require('express')
const router = express.Router()
const dataController = require('../app/controllers/DataController')
const mysqlModel = require('../app/models/MysqlModel')
const authenAuthor = require('./authenAuthor')

// 
router.get('/', dataController.index)

//
router.get('/tinh', authenAuthor.checkLogin, dataController.getTinh)
router.get('/huyen/:idTinh', authenAuthor.checkLogin, dataController.getHuyenByTinhID)
router.get('/xa/:idHuyen', authenAuthor.checkLogin, dataController.getXaByHuyenID)
router.get('/xom/:idXa', authenAuthor.checkLogin, dataController.getXomByXaID)

router.get('/dancu/all', authenAuthor.checkLogin, dataController.getDancuToanQuoc)
router.get('/dancu/:idDiaPhuong', authenAuthor.checkLogin, dataController.getDancuByDiaPhuong)
router.get('/search', authenAuthor.checkLogin, dataController.searchDancu)

router.get('/bieudo/soDanTheoTinh/:soLuong', dataController.soDanTheoTinh)
router.get('/bieudo/tyLeGioiTinh', dataController.tyLeGioiTinh)
router.get('/bieudo/tongSoDan', dataController.tongSoDan)
router.get('/bieudo/soDanTheoDoTuoi', dataController.soDanTheoDoTuoi)

module.exports = router