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

router.get('/dancu/all', dataController.getDancuToanQuoc)
router.get('/dancu/all/len', dataController.getDancuToanQuocLen)
router.get('/dancu/:idDiaPhuong', dataController.getDancuByDiaPhuong)
router.get('/dancu/:idDiaPhuong/len', dataController.getLengthDancuByDiaPhuong)
router.get('/search', dataController.searchDancu)

router.get('/bieudo/soDanTheoTinh/:soLuong', dataController.soDanTheoTinh)
router.get('/bieudo/tyLeGioiTinh', dataController.tyLeGioiTinh)
router.get('/bieudo/tongSoDan', dataController.tongSoDan)
router.get('/bieudo/soDanTheoDoTuoi', dataController.soDanTheoDoTuoi)



module.exports = router