const db = require('./MysqlConfig')

db.connect(function(err) {
    if (err) {
        console.log("Can't connect to MySQL!!!")
        throw err;
    }
    console.log("Connected to MySQL!!!")
});

class Query {
    getDancuAll(callback) {
        let sql = "SELECT * FROM dan_cu;"
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    getDancuByDiaPhuongID(diaPhuongID, callback) {
        let sql = `SELECT * FROM dan_cu WHERE ho_khau_thuong_tru LIKE '${diaPhuongID}%';`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    getDancuByID(id, callback) {
        let sql = `SELECT * FROM dan_cu where id = ${id};`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    // notwork ultil update nhaplieu
    insertDancu(human) {
        let sql = `INSERT INTO dancu(cccd, hoTen, ngaySinh, gioiTinh, ketHon, queQuan) VALUES ('${human.cccd}', '${human.hoTen}', '${human.ngaySinh}', '${human.gioiTinh}', '${human.ketHon}', '${human.queQuan}' )`
        db.query(sql, (err) => {
            if (err) throw err;
        });
    }

    // notwork ultil update nhaplieu
    updateDancu(human) {
        let sql = `UPDATE dancu SET cccd='${human.cccd}', hoTen='${human.hoTen}', ngaySinh='${human.ngaySinh}', gioiTinh='${human.gioiTinh}', ketHon='${human.ketHon}', queQuan='${human.queQuan}' WHERE id= ${human.id}`
        db.query(sql, (err) => {
            if (err) throw err;
        });
    }

    deleteDancuByID(id) {
        let sql = `DELETE FROM dan_cu WHERE id= ${id}`
        db.query(sql, (err) => {
            if (err) throw err;
        });
    }

    getTaiKhoan(callback) {
        let sql = `SELECT * FROM taiKhoan`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    getTinh(callback) {
        let sql = `SELECT * FROM tinh_thanhPho`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    getHuyenByTinhID(id, callback) {
        let sql = `SELECT * FROM huyen_quan 
        WHERE parent_id = ${id}`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }
    getXaByHuyenID(id, callback) {
        let sql = `SELECT * FROM xa_phuong 
        WHERE parent_id = ${id}`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }
    getXomByXaID(id, callback) {
        let sql = `SELECT * FROM xom_thonTo 
        JOIN xa_phuong ON xom_thonTo.parent_id = xa_phuong.id
        WHERE xa_phuong.id = ${id}`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }
}


module.exports = new Query;