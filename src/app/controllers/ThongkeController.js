const mysqlModel = require('../models/MysqlModel')

class ThongkeController {

    //[GET] thongke
    index(req, res) {
        mysqlModel.getDancuAll((result) =>{
            res.render('thongke', {result})
        })
    }

    gettinh(req, res) {
        mysqlModel.getTinh((result) =>{
            res.render('thongke', {result})
        })
    }

    // /thongke/huyen/idHuyen
    huyen(req, res) {
        let id = req.params.idHuyen;
        mysqlModel.getHuyenByTinhID( id , (result) =>{
            res.render('thongke',{result})
        })
    }

    // thongke/:idTinh/:idHuyen/:idXa/:idXom
    getFull(req, res) {
        
        res.send(`Tinh: ${req.params.idTinh}, Huyen: ${req.params.idHuyen}, ${req.params.idXa}, ${req.params.idXom}`)
    }
}

module.exports = new ThongkeController