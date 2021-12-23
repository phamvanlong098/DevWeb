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

    searchDancu(key, callback) {
        let sql = `SELECT * FROM dan_cu WHERE MATCH (ho_ten) AGAINST('${key}');`
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

    getTaiKhoanCon(user, callback) {
        let sql = `SELECT * FROM taiKhoan`
        switch(user.cap) {
            case "Admin" : {
                sql = `SELECT * FROM taiKhoan WHERE cap != 'Admin' ORDER BY cap`
                break;
            }
            case "A1" : {
                sql = `SELECT * FROM taikhoan WHERE cap = 'A2';`
                break;
            }
            default: {
                sql = `SELECT * FROM taikhoan WHERE tai_khoan LIKE '${user.tai_khoan}__';`
                break;
            }
        }

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

    changePassword(username, password, callback) {
        let sql = `UPDATE taiKhoan SET mat_khau='${password}' WHERE tai_khoan='${username}'`
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

    // bieu do
    tyLeGioiTinh(callback) {
        let sql = `SELECT gioi_tinh, COUNT(*) FROM dan_cu GROUP BY gioi_tinh;`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    soDanTheoTinh(soLuong, callback) {
        let sql = `SELECT tinh_thanhpho.ten, COUNT(*) as so_dan FROM dan_cu
        JOIN tinh_thanhpho ON tinh_thanhpho.id = LEFT(ho_khau_thuong_tru, 2)
        GROUP BY LEFT(ho_khau_thuong_tru, 2)
        ORDER BY so_dan DESC
        LIMIT ${soLuong};`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    
}


module.exports = new Query;