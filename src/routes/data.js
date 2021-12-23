const express = require('express')
const router = express.Router()
const dataController = require('../app/controllers/DataController')
const mysqlModel = require('../app/models/MysqlModel')

// 
router.get('/', dataController.index)

//
router.get('/tinh', dataController.getTinh)
router.get('/huyen/:idTinh', dataController.getHuyenByTinhID)
router.get('/xa/:idHuyen', dataController.getXaByHuyenID)
router.get('/xom/:idXa', dataController.getXomByXaID)
router.get('/dancu/:idTinh', dataController.getDancuByTinh)
router.get('/search', dataController.searchDancu)
router.get('/bieudo/soDanTheoTinh/:soLuong', dataController.soDanTheoTinh)
router.get('/bieudo/tyLeGioiTinh', dataController.tyLeGioiTinh)



module.exports = router