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

    getDancuByTinh(diaPhuongID, callback) {
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

    // tai khoan
    getTaiKhoan(callback) {
        let sql = `SELECT * FROM taiKhoan`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    getTaiKhoanCon(pid, callback) {
        let sql = `SELECT * FROM taikhoan WHERE tai_khoan LIKE '${pid}__';`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    checkUP(username, password, callback) {
        let sql = `SELECT * FROM taiKhoan WHERE tai_khoan='${username}' AND mat_khau='${password}'`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    getQuyen(role, callback) {
        let sql = `SELECT quyen FROM phanQuyen WHERE cap ='${role}' `
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    // khu vuc
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
        WHERE parent_id = ${id}`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    // khac
    
}


module.exports = new Query;