const db = require('./MysqlConfig')

class Query {
    getDancuAll(callback) {
        let sql = "SELECT * FROM dancu;"
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    insertDancu(human) {
        let sql = `INSERT INTO dancu(cccd, hoTen, ngaySinh, gioiTinh, ketHon, queQuan) VALUES ('${human.cccd}', '${human.hoTen}', '${human.ngaySinh}', '${human.gioiTinh}', '${human.ketHon}', '${human.queQuan}' )`
        db.query(sql, (err) => {
            if (err) throw err;
        });
    }

    getDancuByID(id, callback) {
        let sql = `SELECT * FROM dancu where id = ${id};`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    updateDancu(human) {
        let sql = `UPDATE dancu SET cccd='${human.cccd}', hoTen='${human.hoTen}', ngaySinh='${human.ngaySinh}', gioiTinh='${human.gioiTinh}', ketHon='${human.ketHon}', queQuan='${human.queQuan}' WHERE id= ${human.id}`
        db.query(sql, (err) => {
            if (err) throw err;
        });
    }

    deleteDancuByID(id) {
        let sql = `DELETE FROM dancu WHERE id= ${id}`
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


    getXa(callback) {
        let sql = `SELECT * FROM xa`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    doSomething(sql, callback) {
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }
}


module.exports = new Query;