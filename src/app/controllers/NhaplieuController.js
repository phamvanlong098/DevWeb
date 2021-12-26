const mysqlModel = require('../models/MysqlModel')

class NhaplieuController {

    //[GET] nhaplieu
    index(req, res) {
        res.render('nhaplieu/taoMoi', {user: req.session.user})
    }

    //[POST] nhaplieu
    post(req, res) {
        // res.render('nhaplieu', {user: req.session.user})
        let body = req.body;
        let human = {
            "gioi_tinh" : body.gioiTinh,
            "ho_ten" : body.hoTen,
            "cccd" : body.cccd,
            "ngay_sinh" : body.ngaySinh,
            "ho_khau_thuong_tru" : body.to,
            "noi_dang_ky_tam_tru" : body.to1,
            "ton_giao" : body.ton_giao,
            "nhom_mau" : body.bloodType,
            "tinh_trang_hon_nhan" : body.ketHon,
            "noi_dang_ky_khai_sinh" : body.noi_dang_ky_khai_sinh,
            "quoc_tich" : body.nationality,
            "id_cha" : body.fatherID,
            "id_me" : body.motherID,
        }
        console.log(human)

        mysqlModel.insertDancu(human)
        // res.json({body, human})
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
        let body = req.body;
        let human = {
            "gioi_tinh" : body.gioiTinh,
            "ho_ten" : body.hoTen,
            "cccd" : body.cccd,
            "ngay_sinh" : body.ngaySinh,
            "ho_khau_thuong_tru" : body.to,
            "noi_dang_ky_tam_tru" : body.to1,
            "ton_giao" : body.ton_giao,
            "nhom_mau" : body.bloodType,
            "tinh_trang_hon_nhan" : body.ketHon,
            "noi_dang_ky_khai_sinh" : body.tinh,
            "quoc_tich" : body.nationality,
            "id_cha" : body.fatherID,
            "id_me" : body.motherID,
        }
        mysqlModel.updateDancu(human)
        res.json({body, human})

        // res.redirect('/thongke')
    }

    //[DELETE] nhaplieu/:id
    delete(req, res) {
        mysqlModel.deleteDancuByID(req.params.id)
        res.redirect('/thongke')
    
    }

}

module.exports = new NhaplieuController