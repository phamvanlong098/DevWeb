const mysqlModel = require('../models/MysqlModel')

class ThongkeController {

    //[GET] thongke
    index(req, res) {
        mysqlModel.getDancuAll((result) =>{
            res.render('thongke', {result})
        })
    }

}

module.exports = new ThongkeController