const express = require('express')
const router = express.Router()
const thongkeController = require('../app/controllers/ThongkeController')
const mysqlModel = require('../app/models/MysqlModel')

// thongke/
router.get('/', thongkeController.index)

//
router.get('/Tinh', thongkeController.gettinh)

//
router.get('/dancu', (req, res) => {
    mysqlModel.getDancuAll((result) => {
         res.json(result)
    })
})

//
router.get('/tinh', (req, res) => {
   mysqlModel.getTinh((result) => {
        res.json(result)
   })
})

module.exports = router