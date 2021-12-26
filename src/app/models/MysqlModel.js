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

    getDancuToanQuocLen(callback) {
        let sql = `SELECT COUNT(*) AS tong_so FROM dan_cu `
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    getDancuToanQuoc(page, callback) {
        let pagesize = 20
        let start = (page - 1) * pagesize
        let sql = `SELECT * FROM dan_cu limit ${start}, ${pagesize};`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    getDancuByDiaPhuong(diaPhuongID, page, callback) {
        let pagesize = 20
        let start = (page - 1) * pagesize
        let sql = `SELECT * FROM dan_cu WHERE ho_khau_thuong_tru LIKE '${diaPhuongID}%' limit ${start}, ${pagesize};`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    getLengthDancuByDiaPhuong(diaPhuongID, callback){
        let sql = `SELECT COUNT(*) as tong_so FROM dan_cu WHERE ho_khau_thuong_tru LIKE '${diaPhuongID}%';`
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

    phanTrangSearch(condition, callback) {
        let pagesize = 20
        let start = (condition.page - 1) * pagesize
        let sql1 = `SELECT COUNT(*) AS tong_so FROM dan_cu WHERE MATCH (ho_ten) AGAINST('${condition.key}');`
        let sql2 = `SELECT * FROM dan_cu WHERE MATCH (ho_ten) AGAINST('${condition.key}') LIMIT ${start}, ${pagesize};`
        let sql = sql1 + sql2
        db.query(sql, (err, results) => {
            if (err) throw err;
            let ketqua = {
                tong_so: results[0][0].tong_so,
                data: results[1]
            }
            callback(ketqua)
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
    tongSoDan(callback) {
        let sql = `SELECT COUNT(*) AS tong_so_dan FROM dan_cu;`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    tyLeGioiTinh(callback) {
        let sql = `SELECT gioi_tinh, COUNT(*) as so_luong FROM dan_cu GROUP BY gioi_tinh;`
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

    soDanTheoDoTuoi(callback){
        let sql = `SELECT "<15" AS do_tuoi, COUNT(*) as so_luong FROM dan_cu
        WHERE (year(now()) - year(ngay_sinh)) < 15
        UNION 
        SELECT "15-35", COUNT(*) FROM dan_cu
        WHERE (year(now()) - year(ngay_sinh)) BETWEEN  15 AND 35
        UNION 
        SELECT "36-64", COUNT(*) FROM dan_cu
        WHERE (year(now()) - year(ngay_sinh)) BETWEEN  36 AND 64
        UNION 
        SELECT ">64", COUNT(*) FROM dan_cu
        WHERE (year(now()) - year(ngay_sinh)) > 64;`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }
   
}


module.exports = new Query;