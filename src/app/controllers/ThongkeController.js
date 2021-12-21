const mysqlModel = require('../models/MysqlModel')

class ThongkeController {

    //[GET] thongke
    index(req, res) {
        mysqlModel.getDancuAll((result) =>{
            res.render('thongke', {result})
        })
        
    }

    gettinh(req, res) {
        mysqlModel.getTinh((result1) =>{
            res.render('thongke', {result1})
        })
    }

    // /thongke/idTinh
    huyen(req, res) {
        let id = req.params.idTinh;
        mysqlModel.getHuyenByTinhID( id , (result) =>{
            res.json(result)
        })
    }

    // thongke/:idTinh/:idHuyen/:idXa/:idXom
    getFull(req, res) {
        
        res.send(`Tinh: ${req.params.idTinh}, Huyen: ${req.params.idHuyen}, ${req.params.idXa}, ${req.params.idXom}`)
    }
}

module.exports = new ThongkeController