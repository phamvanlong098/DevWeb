const mysqlModel = require('../models/MysqlModel')

class NhaplieuController {

    //[GET] nhaplieu
    index(req, res) {
        res.render('nhaplieu/taoMoi', {user: req.session.user})
    }

    //[POST] nhaplieu
    post(req, res) {
        // res.render('nhaplieu', {user: req.session.user})
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
            res.render('nhaplieu/capNhat', {user: req.session.user, result})
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