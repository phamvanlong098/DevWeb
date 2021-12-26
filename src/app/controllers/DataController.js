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

    // data/dancu/all?page=
    getDancuToanQuoc(req, res) {
        let page = parseInt( req.query.page);
        if(!page || page < 1) page = 1;
        mysqlModel.getDancuToanQuoc(page, (result) =>{
            res.json(result)
        })
    }

    // data/dancu/:idDiaPhuong
    getDancuByDiaPhuong(req, res) {
        let id = req.params.idDiaPhuong;
        let page = parseInt(req.query.page);
        if(!page || page < 1) page = 1;
        mysqlModel.getDancuByDiaPhuong(id, page, (result) =>{
            res.json(result)
        })
    }
    
    // data/search?key=
    searchDancu(req, res) {
        // let key = req.query.key;
        // mysqlModel.searchDancu(key, (result) =>{
        //     res.json(result)
        // })

        let key = req.query.key;
        let page = parseInt( req.query.page);
        if(!page || page < 1) page = 1;
        mysqlModel.phanTrangSearch({key, page}, (result) =>{
            res.json(result)
        })
    }


    // /bieudo/soDanTheoTinh/:soLuong
    soDanTheoTinh(req, res) {
        let soLuong = req.params.soLuong;
        mysqlModel.soDanTheoTinh(soLuong , (result) =>{
            res.json(result)
        })
    }

    // /bieudo/tyLeGioiTinh
    tyLeGioiTinh(req, res) {
        mysqlModel.tyLeGioiTinh( (result) =>{
            res.json(result)
        })
    }
    // /bieudo/tongSoDan
    tongSoDan(req, res) {
        mysqlModel.tongSoDan( (result) =>{
            res.json(result)
        })
    }
    // /bieudo/soDanTheoDoTuoi
    soDanTheoDoTuoi(req, res) {
        mysqlModel.soDanTheoDoTuoi( (result) =>{
            res.json(result)
        })
    }

     // data/dancu/all/len
     getDancuToanQuocLen(req, res) {
        mysqlModel.getDancuToanQuocLen( (result) =>{
            res.json(result)
        })
    }

     // data/dancu/:idDiaPhuong/len
     getLengthDancuByDiaPhuong(req, res) {
        let id = req.params.idDiaPhuong;
        mysqlModel.getLengthDancuByDiaPhuong(id, (result) =>{
            res.json(result)
        })
    }


}

module.exports = new DataController