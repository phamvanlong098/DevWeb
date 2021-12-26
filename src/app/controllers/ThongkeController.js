const mysqlModel = require('../models/MysqlModel')

class ThongkeController {

    //[GET] thongke
    index(req, res) {
        mysqlModel.getDancuAll((result) =>{
            res.render('thongke', {user: req.session.user, result})
        })
    }

}

module.exports = new ThongkeController