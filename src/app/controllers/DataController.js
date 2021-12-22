const mysqlModel = require('../models/MysqlModel')

class DataController {

    //[GET] thongke
    index(req, res) {
       res.render('data', {user: req.session.user})
    }

    // data/tinh
    getTinh(req, res) {
        mysqlModel.getTinh((result) =>{
            res.json(result)
        })
    }

    // data/huyen/:idTinh
    getHuyenByTinhID(req, res) {
        let id = req.params.idTinh;
        mysqlModel.getHuyenByTinhID(id , (result) =>{
            res.json(result)
        })
    }

    // data/xa/:idHuyen
    getXaByHuyenID(req, res) {
        let id = req.params.idHuyen;
        mysqlModel.getXaByHuyenID(id , (result) =>{
            res.json(result)
        })
    }

    // data/xom/:idXa
    getXomByXaID(req, res) {
        let id = req.params.idXa;
        mysqlModel.getXomByXaID(id , (result) =>{
            res.json(result)
        })
    }

    // data/xom/:idXa
    getDancuByTinh(req, res) {
        let id = req.params.idTinh;
        mysqlModel.getDancuByTinh(id , (result) =>{
            res.json(result)
        })
    }

}

module.exports = new DataController