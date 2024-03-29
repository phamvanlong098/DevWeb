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

    phanTrang(condition, callback) {
        let pagesize = 20
        let start = (condition.page - 1) * pagesize
        let sql1 = `SELECT COUNT(*) AS tong_so FROM ${condition.table} WHERE ${condition.where};`
        let sql2 = `SELECT * FROM ${condition.table} WHERE ${condition.where} LIMIT ${start}, ${pagesize};`
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

    getDancuToanQuoc(page, callback) {
        let pagesize = 20
        let start = (page - 1) * pagesize
        let sql = `SELECT id, cccd, gioi_tinh, ho_ten, ngay_sinh, ton_giao, nhom_mau, tinh_trang_hon_nhan, noi_dang_ky_khai_sinh, quoc_tich, id_cha, id_me, tenXa(ho_khau_thuong_tru) AS ho_khau_thuong_tru, tenXa(noi_dang_ky_tam_tru) AS noi_dang_ky_tam_tru FROM dan_cu limit ${start}, ${pagesize};`
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results)
        });
    }

    getDancuByDiaPhuong(diaPhuongID, page, callback) {
        let pagesize = 20
        let start = (page - 1) * pagesize
        let sql = `SELECT id, cccd, gioi_tinh, ho_ten, ngay_sinh, ton_giao, nhom_mau, tinh_trang_hon_nhan, noi_dang_ky_khai_sinh, quoc_tich, id_cha, id_me, tenXa(ho_khau_thuong_tru) AS ho_khau_thuong_tru, tenXa(noi_dang_ky_tam_tru) AS noi_dang_ky_tam_tru FROM dan_cu WHERE ho_khau_thuong_tru LIKE '${diaPhuongID}%' limit ${start}, ${pagesize};`
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

    getDancuToanQuocLen(callback) {
        let sql = `SELECT COUNT(*) AS tong_so FROM dan_cu `
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
        let sql = `INSERT INTO dan_cu SET gioi_tinh = '${human.gioi_tinh}', cccd = '${human.cccd}',ho_ten = '${human.ho_ten}', ngay_sinh = '${human.ngay_sinh}', ho_khau_thuong_tru = '${human.ho_khau_thuong_tru}', noi_dang_ky_tam_tru = '${human.noi_dang_ky_tam_tru}', ton_giao = '${human.ton_giao}', nhom_mau = '${human.nhom_mau}', tinh_trang_hon_nhan = '${human.tinh_trang_hon_nhan}', noi_dang_ky_khai_sinh = '${human.noi_dang_ky_khai_sinh}', quoc_tich = '${human.quoc_tich}', id_cha = '${human.id_cha}', id_me = '${human.id_me}', hoc_van = '${human.hoc_van}', nghe_nghiep = '${human.nghe_nghiep}'`
        db.query(sql, (err) => {
            if (err) throw err;
        });
    }

    // notwork ultil update nhaplieu
    updateDancu(human) {
        let sql = `UPDATE dan_cu SET gioi_tinh = '${human.gioi_tinh}', cccd = '${human.cccd}', ho_ten = '${human.ho_ten}', ngay_sinh = '${human.ngay_sinh}', ho_khau_thuong_tru = '${human.ho_khau_thuong_tru}', noi_dang_ky_tam_tru = '${human.noi_dang_ky_tam_tru}', ton_giao = '${human.ton_giao}', nhom_mau = '${human.nhom_mau}', tinh_trang_hon_nhan = '${human.tinh_trang_hon_nhan}', noi_dang_ky_khai_sinh = '${human.noi_dang_ky_khai_sinh}', quoc_tich = '${human.quoc_tich}', id_cha = '${human.id_cha}', id_me = '${human.id_me}', hoc_van = '${human.hoc_van}', nghe_nghiep = '${human.nghe_nghiep}' WHERE id = '${human.id}'`
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

    // quanly/area
    updateArea(condition, callback) {
        let sql = `SELECT * FROM ${condition.table} WHERE id='${condition.id}'`
        db.query(sql, (err, results) => {
            if (err) throw err;
            if(results[0]) {
                let update = `UPDATE ${condition.table} SET ten='${condition.ten}' WHERE id='${condition.id}'`
                db.query(update, (err) => { if(err) throw err})
            }
            else {
                let insert = `INSERT INTO ${condition.table} SET ten='${condition.ten}', id='${condition.id}' `
                if(condition.parent_id) insert += `, parent_id = '${condition.parent_id}'`
                db.query(insert, (err) => { if(err) throw err})
            }

            callback(results)
        });
    }

    // quanly/area
    deleteArea(condition, callback) {
        let sql = `DELETE FROM  ${condition.table} WHERE id= ${condition.id}`
        db.query(sql, (err) => {
            if (err) throw err;
        });
    }

    // tai khoan
    updateTaiKhoan(user, callback) {
        let sql = `SELECT * FROM taikhoan WHERE tai_khoan='${user.tai_khoan}'`
        db.query(sql, (err, results) => {
            if (err) throw err;
            if(results[0]) {
                let update = `UPDATE taikhoan SET mat_khau='${user.mat_khau}', cap='${user.cap}' WHERE tai_khoan='${user.tai_khoan}'`
                db.query(update, (err) => { if(err) throw err})
            }
            else {
                let insert = `INSERT INTO taikhoan SET mat_khau='${user.mat_khau}', cap='${user.cap}', tai_khoan='${user.tai_khoan}'`
                db.query(insert, (err) => { if(err) throw err})
            }

            callback(results)
        });
    }

    getThoiHan(username, callback) {
        let sql = `SELECT * FROM taikhoan WHERE thoi_han > NOW() AND tai_khoan = '${username}';`
        db.query(sql, (err) => {
            if (err) throw err;
        });
    }

    // tai khoan
    updateThoiHan(user, callback) {
        let sql = `SELECT * FROM taikhoan WHERE tai_khoan='${user.tai_khoan}'`
        db.query(sql, (err, results) => {
            if (err) throw err;
            if(results[0]) {
                let update = `UPDATE taikhoan SET thoi_han='${user.thoi_han}', cap='${user.cap}' WHERE tai_khoan='${user.tai_khoan}'`

                db.query(update, (err) => { if(err) throw err})
            }
            else {
                let insert = `INSERT INTO taikhoan SET thoi_han='${user.thoi_han}', cap='${user.cap}', tai_khoan='${user.tai_khoan}', mat_khau='null'`

                db.query(insert, (err) => { if(err) throw err})
            }

            callback(results)
        });
    }

    // delete taikhoan
    deleteTaikhoan(id) {
        let sql = `DELETE FROM taikhoan WHERE tai_khoan= '${id}'`
        db.query(sql, (err) => {
            if (err) throw err;
        });
    }

    //  // thoi han
    //  getThoiHan(user, callback) {
    //     let sql1 = `SELECT COUNT(*) as tong_so FROM dan_cu WHERE ho_khau_thuong_tru LIKE '01%';`
    //     let sql2 = `SELECT * FROM dan_cu WHERE ho_khau_thuong_tru LIKE '01%';`
    //     let sql = sql1 + sql2
    //     db.query(sql, (err, results) => {
    //         if (err) throw err;
    //         callback(results)
    //     });
    // }

    // getTaiKhoanCon(user, callback) {
    //     let sql = ``
    //     let username = user.tai_khoan
    //     switch(user.cap) {
    //         case "Admin" : {
    //             sql = `SELECT * FROM taiKhoan WHERE cap != 'Admin' ORDER BY cap`
    //             break;
    //         }
    //         case "A1" : {
    //             sql = `SELECT * FROM taikhoan JOIN tinh_thanhpho ON tinh_thanhpho.id = tai_khoan WHERE cap = 'A2';`
    //             break;
    //         }
    //         case "A2" : {
    //             sql = `SELECT * FROM taikhoan JOIN huyen_quan ON huyen_quan.id = tai_khoan WHERE cap = 'A3' AND tai_khoan LIKE '${username}%';`
    //             break;
    //         }
    //         case "A3" : {
    //             sql = `SELECT * FROM taikhoan JOIN xa_phuong ON xa_phuong.id = tai_khoan WHERE cap = 'B1' AND tai_khoan LIKE '${username}%';`
    //             break;
    //         }
    //         case "B1" : {
    //             sql = `SELECT * FROM taikhoan JOIN xom_thonto ON xom_thonto.id = tai_khoan WHERE cap = 'B2' AND tai_khoan LIKE '${username}%';`
    //             break;
    //         }
    //         default: {
    //             sql = ``
    //             break;
    //         }
    //     }

    //     db.query(sql, (err, results) => {
    //         if (err) throw err;
    //         callback(results)
    //     });
    // }

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