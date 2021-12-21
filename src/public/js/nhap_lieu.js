document.getElementById('fullname').onkeyup = function (e) {
    if (e.key == 'Enter') {
        document.getElementById('CCCD').focus()
    }
}

document.getElementById('CCCD').onkeyup = function (e) {
    if (e.key == 'Enter') {
        document.getElementById('birthDay').focus()
    }
}

document.getElementById('birthDay').onkeyup = function (e) {
    if (e.key == 'Enter') {
        document.getElementById('gender1').focus()
    }
}

document.getElementById('gender1').onkeyup = function (e) {
    if (e.key == 'Enter') {
        document.getElementById('honnhan1').focus()
    }
}

document.getElementById('honnhan1').onkeyup = function (e) {
    if (e.key == 'Enter') {
        document.getElementById('nationality').focus()
    }
}

document.getElementById('nationality').onkeyup = function (e) {
    if (e.key == 'Enter') {
        document.getElementById('bloodType').focus()
    }
}

document.getElementById('bloodType').onkeyup = function (e) {
    if (e.key == 'Enter') {
        document.getElementById('fatherID').focus()
    }
}

document.getElementById('fatherID').onkeyup = function (e) {
    if (e.key == 'Enter') {
        document.getElementById('motherID').focus()
    }
}

function upperTheFirst(val) {
    return val.replace(val.charAt(0), val.charAt(0).toUpperCase());
}

function titleCase(str) {
    var convertToArray = str.toLowerCase().split(' ');
    var upperFirst = convertToArray.map(upperTheFirst);
    var result = upperFirst.join(' ');
    while (result.indexOf("  ") != -1) {
        result = result.replace(/  /g, " ");
    }
    return result;
}

document.getElementById('fullname').onblur = function () {
    var name = document.getElementById('fullname').value;
    var newName = titleCase(name);
    document.getElementById('fullname').value = newName;
    if (name == "") {
        document.getElementById('errname').innerHTML = "Xin mời nhập họ tên";
        document.getElementById('fullname').classList.add('red_border');
    } else {
        document.getElementById('errname').innerHTML = "";
        document.getElementById('fullname').classList.remove('red_border');
    }

}

document.getElementById('CCCD').onblur = function () {
    var cccd = document.getElementById('CCCD').value;
    if (cccd == "") {
        document.getElementById('errcccd').innerHTML = "Xin mời nhập CCCD";
        document.getElementById('CCCD').classList.add('red_border');
    } else {
        document.getElementById('errcccd').innerHTML = "";
        document.getElementById('CCCD').classList.remove('red_border');
    }
}

document.getElementById('birthDay').onblur = function () {
    var dob = document.getElementById('birthDay').value;
    if (dob == "") {
        document.getElementById('errdob').innerHTML = "Xin mời nhập ngày sinh";
        document.getElementById('birthDay').classList.add('red_border');
    } else {
        document.getElementById('errdob').innerHTML = "";
        document.getElementById('birthDay').classList.remove('red_border');
    }
}

document.getElementById('nationality').onblur = function () {
    var nation = document.getElementById('nationality').value;
    if (nation == "") {
        document.getElementById('errnation').innerHTML = "Xin mời nhập quốc tịch";
        document.getElementById('nationality').classList.add('red_border');
    } else {
        document.getElementById('errnation').innerHTML = "";
        document.getElementById('nationality').classList.remove('red_border');
    }
}

document.getElementById('bloodType').onblur = function () {
    var bt = document.getElementById('bloodType').value;
    if (bt == "") {
        document.getElementById('errbloodtype').innerHTML = "Xin mời nhập nhóm máu";
        document.getElementById('bloodType').classList.add('red_border');
    } else {
        document.getElementById('errbloodtype').innerHTML = "";
        document.getElementById('bloodType').classList.remove('red_border');
    }
}

document.getElementById('inputBirthPlace').onblur = function () {
    var bp = document.getElementById('inputBirthPlace').value;
    if (bp == "Choose...") {
        document.getElementById('errBP').innerHTML = "Xin mời chọn nơi đăng ký khai sinh";
        document.getElementById('inputBirthPlace').classList.add('red_border');
    } else {
        document.getElementById('errBP').innerHTML = "";
        document.getElementById('inputBirthPlace').classList.remove('red_border');
    }
}

document.getElementById('fatherID').onblur = function () {
    var fID = document.getElementById('fatherID').value;
    if (fID == "") {
        document.getElementById('errfid').innerHTML = "Xin mời nhập ID cha";
        document.getElementById('fatherID').classList.add('red_border');
    } else {
        document.getElementById('errfid').innerHTML = "";
        document.getElementById('fatherID').classList.remove('red_border');
    }
}

document.getElementById('motherID').onblur = function () {
    var mID = document.getElementById('motherID').value;
    if (mID == "") {
        document.getElementById('errmid').innerHTML = "Xin mời nhập ID mẹ";
        document.getElementById('motherID').classList.add('red_border');
    } else {
        document.getElementById('errmid').innerHTML = "";
        document.getElementById('motherID').classList.remove('red_border');
    }
}

document.getElementById('inputCity').onblur = function () {
    var inputcity = document.getElementById('inputCity').value;
    if (inputcity == "Choose...") {
        document.getElementById('errcity').innerHTML = "Xin mời chọn Tỉnh/Thành phố";
        document.getElementById('inputCity').classList.add('red_border');
    } else {
        document.getElementById('errcity').innerHTML = "";
        document.getElementById('inputCity').classList.remove('red_border');
    }
}

document.getElementById('inputDistrict').onblur = function () {
    var inputdistrict = document.getElementById('inputDistrict').value;
    if (inputdistrict == "Choose...") {
        document.getElementById('errdistrict').innerHTML = "Xin mời chọn Quận/Huyện";
        document.getElementById('inputDistrict').classList.add('red_border');
    } else {
        document.getElementById('errdistrict').innerHTML = "";
        document.getElementById('inputDistrict').classList.remove('red_border');
    }
}

document.getElementById('inputVillage').onblur = function () {
    var inputvillage = document.getElementById('inputVillage').value;
    if (inputvillage == "Choose...") {
        document.getElementById('errvillage').innerHTML = "Xin mời chọn Xã/Phường";
        document.getElementById('inputVillage').classList.add('red_border');
    } else {
        document.getElementById('errvillage').innerHTML = "";
        document.getElementById('inputVillage').classList.remove('red_border');
    }
}

document.getElementById('inputCity1').onblur = function () {
    var inputcity1 = document.getElementById('inputCity1').value;
    if (inputcity1 == "Choose...") {
        document.getElementById('errcity1').innerHTML = "Xin mời chọn Tỉnh/Thành phố";
        document.getElementById('inputCity1').classList.add('red_border');
    } else {
        document.getElementById('errcity1').innerHTML = "";
        document.getElementById('inputCity1').classList.remove('red_border');
    }
}

document.getElementById('inputDistrict1').onblur = function () {
    var inputdistrict1 = document.getElementById('inputDistrict1').value;
    if (inputdistrict1 == "Choose...") {
        document.getElementById('errdistrict1').innerHTML = "Xin mời chọn Quận/Huyện";
        document.getElementById('inputDistrict1').classList.add('red_border');
    } else {
        document.getElementById('errdistrict1').innerHTML = "";
        document.getElementById('inputDistrict1').classList.remove('red_border');
    }
}

document.getElementById('inputVillage1').onblur = function () {
    var inputvillage1 = document.getElementById('inputVillage1').value;
    if (inputvillage1 == "Choose...") {
        document.getElementById('errvillage1').innerHTML = "Xin mời chọn Xã/Phường";
        document.getElementById('inputVillage1').classList.add('red_border');
    } else {
        document.getElementById('errvillage1').innerHTML = "";
        document.getElementById('inputVillage1').classList.remove('red_border');
    }
}

function submitForm() {
    var name = document.getElementById('fullname').value;
    if (name == "") {
        document.getElementById('errname').innerHTML = "Xin moi nhap ho ten";
        document.getElementById('fullname').classList.add('red_border');
    } else {
        document.getElementById('errname').innerHTML = "";
        document.getElementById('fullname').classList.remove('red_border');
    }

    var cccd = document.getElementById('CCCD').value;
    if (cccd == "") {
        document.getElementById('errcccd').innerHTML = "Xin moi nhap CCCD";
        document.getElementById('CCCD').classList.add('red_border');
    } else {
        document.getElementById('errcccd').innerHTML = "";
        document.getElementById('CCCD').classList.remove('red_border');
    }

    var dob = document.getElementById('birthDay').value;
    if (dob == "") {
        document.getElementById('errdob').innerHTML = "Xin moi nhap ho ten";
        document.getElementById('birthDay').classList.add('red_border');
    } else {
        document.getElementById('errdob').innerHTML = "";
        document.getElementById('birthDay').classList.remove('red_border');
    }

    var name = document.getElementById('fullname').value;
    if (name == "") {
        document.getElementById('errname').innerHTML = "Xin moi nhap ho ten";
        document.getElementById('fullname').classList.add('red_border');
    } else {
        document.getElementById('errname').innerHTML = "";
        document.getElementById('fullname').classList.remove('red_border');
    }

    var nation = document.getElementById('nationality').value;
    if (nation == "") {
        document.getElementById('errnation').innerHTML = "Xin mời nhập quốc tịch";
        document.getElementById('nationality').classList.add('red_border');
    } else {
        document.getElementById('errnation').innerHTML = "";
        document.getElementById('nationality').classList.remove('red_border');
    }

    var bt = document.getElementById('bloodType').value;
    if (bt == "") {
        document.getElementById('errbloodtype').innerHTML = "Xin mời nhập nhóm máu";
        document.getElementById('bloodType').classList.add('red_border');
    } else {
        document.getElementById('errbloodtype').innerHTML = "";
        document.getElementById('bloodType').classList.remove('red_border');
    }

    var bp = document.getElementById('inputBirthPlace').value;
    if (bp == "Choose...") {
        document.getElementById('errBP').innerHTML = "Xin mời chọn nơi đăng ký khai sinh";
        document.getElementById('inputBirthPlace').classList.add('red_border');
    } else {
        document.getElementById('errBP').innerHTML = "";
        document.getElementById('inputBirthPlace').classList.remove('red_border');
    }

    var fID = document.getElementById('fatherID').value;
    if (fID == "") {
        document.getElementById('errfid').innerHTML = "Xin mời nhập ID cha";
        document.getElementById('fatherID').classList.add('red_border');
    } else {
        document.getElementById('errfid').innerHTML = "";
        document.getElementById('fatherID').classList.remove('red_border');
    }

    var mID = document.getElementById('motherID').value;
    if (mID == "") {
        document.getElementById('errmid').innerHTML = "Xin mời nhập ID mẹ";
        document.getElementById('motherID').classList.add('red_border');
    } else {
        document.getElementById('errmid').innerHTML = "";
        document.getElementById('motherID').classList.remove('red_border');
    }

    var inputcity = document.getElementById('inputCity').value;
    if (inputcity == "Choose...") {
        document.getElementById('errcity').innerHTML = "Xin mời chọn Tỉnh/Thành phố";
        document.getElementById('inputCity').classList.add('red_border');
    } else {
        document.getElementById('errcity').innerHTML = "";
        document.getElementById('inputCity').classList.remove('red_border');
    }

    var inputdistrict = document.getElementById('inputDistrict').value;
    if (inputdistrict == "Choose...") {
        document.getElementById('errdistrict').innerHTML = "Xin mời chọn Quận/Huyện";
        document.getElementById('inputDistrict').classList.add('red_border');
    } else {
        document.getElementById('errdistrict').innerHTML = "";
        document.getElementById('inputDistrict').classList.remove('red_border');
    }

    var inputvillage = document.getElementById('inputVillage').value;
    if (inputvillage == "Choose...") {
        document.getElementById('errvillage').innerHTML = "Xin mời chọn Xã/Phường";
        document.getElementById('inputVillage').classList.add('red_border');
    } else {
        document.getElementById('errvillage').innerHTML = "";
        document.getElementById('inputVillage').classList.remove('red_border');
    }

    var inputcity1 = document.getElementById('inputCity1').value;
    if (inputcity1 == "Choose...") {
        document.getElementById('errcity1').innerHTML = "Xin mời chọn Tỉnh/Thành phố";
        document.getElementById('inputCity1').classList.add('red_border');
    } else {
        document.getElementById('errcity1').innerHTML = "";
        document.getElementById('inputCity1').classList.remove('red_border');
    }

    var inputdistrict1 = document.getElementById('inputDistrict1').value;
    if (inputdistrict1 == "Choose...") {
        document.getElementById('errdistrict1').innerHTML = "Xin mời chọn Quận/Huyện";
        document.getElementById('inputDistrict1').classList.add('red_border');
    } else {
        document.getElementById('errdistrict1').innerHTML = "";
        document.getElementById('inputDistrict1').classList.remove('red_border');
    }

    var inputvillage1 = document.getElementById('inputVillage1').value;
    if (inputvillage1 == "Choose...") {
        document.getElementById('errvillage1').innerHTML = "Xin mời chọn Xã/Phường";
        document.getElementById('inputVillage1').classList.add('red_border');
    } else {
        document.getElementById('errvillage1').innerHTML = "";
        document.getElementById('inputVillage1').classList.remove('red_border');
    }
}












