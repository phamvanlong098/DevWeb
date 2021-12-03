const mysqlModel = require('../models/MysqlModel')

class NhaplieuController {

    //[GET] nhaplieu
    index(req, res) {
        res.render('nhaplieu/taoMoi')
    }

    //[POST] nhaplieu
    post(req, res) {
        // res.render('nhaplieu')
        let human = req.body;
        human['ngaySinh'] = 'nothing';
        human['queQuan'] = human.tinh;

        mysqlModel.insertDancu(human)
        res.redirect('/thongke')
    
    }

     //[GET] nhaplieu/:id/edit
     edit(req, res) {
        let human = mysqlModel.getDancuByID(req.params.id, (result => {
            result = result[0]
            res.render('nhaplieu/capNhat', {result})
        }))
    }

    //[PUT] nhaplieu/:id
    update(req, res) {
        let human = req.body;
        human['ngaySinh'] = 'nothing';
        human['queQuan'] = human.tinh;

        mysqlModel.updateDancu(human)
        res.redirect('/thongke')
    
    }

    //[DELETE] nhaplieu/:id
    delete(req, res) {
        mysqlModel.deleteDancuByID(req.params.id)
        res.redirect('/thongke')
    
    }

}

module.exports = new NhaplieuController