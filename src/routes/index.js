
const thongkeController = require('../app/controllers/ThongkeController')
const nhaplieuController = require('../app/controllers/NhaplieuController')
const mysqlModel = require('../app/models/MysqlModel')

function route(app, db) {
    app.get('/', (req, res) => {
        res.render('home')
    })

    // thongke
    app.get('/thongke', thongkeController.index)

    // nhaplieu
    app.put('/nhaplieu/:id', nhaplieuController.update)
    app.get('/nhaplieu/:id/edit', nhaplieuController.edit)
    app.post('/nhaplieu', nhaplieuController.post)
    app.get('/nhaplieu', nhaplieuController.index)


    // dangnhap
    app.get('/dangnhap', (req, res) => {
        res.render('others/dangnhap')
    })


    // database
    // insertdancu
    app.get('/insertdancu', (req, res) => {
        let sql = "INSERT INTO `dancu`(`hoTen`, `ngaySinh`, `gioiTinh`, `ketHon`, `queQuan`) VALUES ('Nguyễn Văn A', '1999/1/1', true, false, 'quê quán')"
        db.query(sql, (err, results) => {
        if (err) throw err;
        res.send('Insert successfully!!!')
        });
    });

    // getdancu
    app.get('/getdancu', (req, res) => {
        mysqlModel.getDancu((result) => res.send(result))
    });

    // // gettinhthanhpho
    // app.get('/gettinhthanh', (req, res) => {
    //     let sql = "SELECT * FROM xa;"
    //     db.query(sql, (err, results) => {
    //     if (err) throw err;
    //     res.send(results)
    //     });
    // });
    

}

module.exports = route;