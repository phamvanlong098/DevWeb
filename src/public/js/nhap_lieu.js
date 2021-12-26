console.log(window.innerWidth);
if (window.innerWidth < 1500)
    document.getElementById('divmarry').classList.add('div_marry') ;
//thêm nơi đăng ký khai sinh
fetch('http://localhost:3000/data/tinh').then(respon=>respon.json()).then(data=>{
    data.forEach(item=>{
        $('#inputBirthPlace').append(`<option value="${item.ten}">${item.ten}</option>`)
    })
})
function loadselect(iddiv,tenselect,idselect){
    var choose=''
    var id=''
    if(tenselect=='tinh'){
        choose='huyen'
       
        if(iddiv=='hktt'){
            id='#inputDistrict'
            $('#inputVillage').html('')
            $('#inputGroup').html('')
        }
       else{
        id='#inputDistrict1'
        $('#inputVillage1').html('')
        $('#inputGroup1').html('')
       }
    }
    else if(tenselect=='huyen')
    {
        choose='xa'
      
        if(iddiv=='hktt')    {
            id='#inputVillage'
            $('#inputGroup').html('')
        }
        else  {
            id='#inputVillage1'
            $('#inputGroup1').html('')

        }
    }
    else if(tenselect=='xa')
    {
       choose='xom'
       if(iddiv=='hktt')
       id='#inputGroup'
       else  id='#inputGroup1'
    }
    else {
        choose=''
        id=''
    }
    fetch(`http://localhost:3000/data/${choose}/${idselect}`).then(respon=>respon.json()).then(data=>{
        var content=``  
    data.forEach(item=>{
          
            content+=`<option value="${item.id}">${item.ten}</option>`
            
        })
        $(id).html(content)
    })
}
// thêm hộ khẩu thường trú
fetch('http://localhost:3000/data/tinh').then(respon=>respon.json()).then(data=>{
    data.forEach(item=>{
        $('#inputCity').append(`<option value="${item.id}">${item.ten}</option>`)
    })
})
//chọn tỉnh
$('#inputCity').change(function(){
    var a=$(this).val()
    loadselect('hktt','tinh',a)
})
//chọn huyện
$('#inputDistrict').change(function(){
    var a=$(this).val()
loadselect('hktt','huyen',a)
})
// chọn xa
$('#inputVillage').change(function(){
    var a=$(this).val()
loadselect('hktt','xa',a)
})


// thêm nơi ở hiện tại
fetch('http://localhost:3000/data/tinh').then(respon=>respon.json()).then(data=>{
    data.forEach(item=>{
        $('#inputCity1').append(`<option value="${item.id}">${item.ten}</option>`)
    })
})
// chọn tỉnh
$('#inputCity1').change(function(){
    var a = $(this).val()
    loadselect('noioht','tinh',a)
})


// chọn huyện
$('#inputDistrict1').change(function(){
    var a = $(this).val()
    loadselect('noioht','huyen',a)

}) 
// chọn xã
$('#inputVillage1').change(function(){
    var a = $(this).val()
    loadselect('noioht','xa',a)

})

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

function checkdob(dob) {
	while (dob.includes('/')) {
		dob = dob.replace('/', '');
	}

	while (dob.includes('-')) {
		dob = dob.replace('-', '');
	}

	for (i = 0; i < dob.length; i++) {
		if (!(dob.charAt(i) >= 0 && dob.charAt(i) <=9)) {
			return -1;
		}
	}

	if (dob.length != 8)
		return -1;
	dob = dob.substring(0,4) + '/' + dob.substring(4,6) + '/' + dob.substring(6);
	return dob;
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

document.getElementById('birthDay').onblur = function () {
    var dob = document.getElementById('birthDay').value;
    if (dob == "") {
        document.getElementById('errdob').innerHTML = "Xin mời nhập ngày sinh";
        document.getElementById('birthDay').classList.add('red_border');
    }
    else if(checkdob(dob) == -1){
        document.getElementById('errdob').innerHTML = "Ngày sinh không hợp lệ";
        document.getElementById('birthDay').classList.add('red_border');
    }
    else {
        var newDob = checkdob(dob);
        document.getElementById('birthDay').value = newDob;
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

document.getElementById('culture').onblur = function () {
    var cu = document.getElementById('culture').value;
    if (cu == "Choose...") {
        document.getElementById('errculture').innerHTML = "Xin mời chọn trình độ văn hóa";
        document.getElementById('culture').classList.add('red_border');
    } else {
        document.getElementById('errculture').innerHTML = "";
        document.getElementById('culture').classList.remove('red_border');
    }
}

document.getElementById('job').onblur = function () {
    var job = document.getElementById('job').value;
    if (job == "") {
        document.getElementById('errjob').innerHTML = "Xin mời nhập nghề nghiệp";
        document.getElementById('job').classList.add('red_border');
    } else {
        document.getElementById('errjob').innerHTML = "";
        document.getElementById('job').classList.remove('red_border');
    }
}

document.getElementById('religion').onblur = function () {
    var rl = document.getElementById('religion').value;
    if (rl == "") {
        document.getElementById('errreligion').innerHTML = "Xin mời nhập tôn giáo";
        document.getElementById('religion').classList.add('red_border');
    } else {
        document.getElementById('errreligion').innerHTML = "";
        document.getElementById('religion').classList.remove('red_border');
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
    if (inputcity == "") {
        document.getElementById('errcity').innerHTML = "Xin mời chọn Tỉnh/Thành phố";
        document.getElementById('inputCity').classList.add('red_border');
    } else {
        document.getElementById('errcity').innerHTML = "";
        document.getElementById('inputCity').classList.remove('red_border');
    }
}

document.getElementById('inputDistrict').onblur = function () {
    var inputcity = document.getElementById('inputCity').value;
    var inputdistrict = document.getElementById('inputDistrict').value;
    if (inputdistrict == "") {
        if (inputcity == "")
        document.getElementById('errdistrict').innerHTML = "Xin mời chọn Tỉnh/Thành phố";
        else
        document.getElementById('errdistrict').innerHTML = "Xin mời chọn Quận/Huyện";
        document.getElementById('inputDistrict').classList.add('red_border');
    } else {
        document.getElementById('errdistrict').innerHTML = "";
        document.getElementById('inputDistrict').classList.remove('red_border');
    }
}

document.getElementById('inputVillage').onblur = function () {
    var inputcity = document.getElementById('inputCity').value;
    var inputdistrict = document.getElementById('inputDistrict').value;
    var inputvillage = document.getElementById('inputVillage').value;
    if (inputvillage == "") {
        if (inputcity == "")
        document.getElementById('errvillage').innerHTML = "Xin mời chọn Tỉnh/Thành phố";
        else if (inputdistrict == "")
        document.getElementById('errvillage').innerHTML = "Xin mời chọn Quận/Huyện";
        else
        document.getElementById('errvillage').innerHTML = "Xin mời chọn Xã/Phường";
        document.getElementById('inputVillage').classList.add('red_border');
    } else {
        document.getElementById('errvillage').innerHTML = "";
        document.getElementById('inputVillage').classList.remove('red_border');
    }
}

document.getElementById('inputGroup').onblur = function () {
    var inputcity = document.getElementById('inputCity').value;
    var inputdistrict = document.getElementById('inputDistrict').value;
    var inputvillage = document.getElementById('inputVillage').value;
    var inputgroup = document.getElementById('inputGroup').value;
    if (inputgroup == "") {
        if (inputcity == "")
        document.getElementById('errgroup').innerHTML = "Xin mời chọn Tỉnh/Thành phố";
        else if (inputdistrict == "")
        document.getElementById('errgroup').innerHTML = "Xin mời chọn Quận/Huyện";
        else if (inputvillage == "")
        document.getElementById('errgroup').innerHTML = "Xin mời chọn Xã/Phường";
        else
        document.getElementById('errgroup').innerHTML = "Xin mời chọn Thôn/Tổ";
        document.getElementById('inputGroup').classList.add('red_border');
    } else {
        document.getElementById('errgroup').innerHTML = "";
        document.getElementById('inputGroup').classList.remove('red_border');
    }
}

document.getElementById('inputCity1').onblur = function () {
    var inputcity1 = document.getElementById('inputCity1').value;
    if (inputcity1 == "") {
        document.getElementById('errcity1').innerHTML = "Xin mời chọn Tỉnh/Thành phố";
        document.getElementById('inputCity1').classList.add('red_border');
    } else {
        document.getElementById('errcity1').innerHTML = "";
        document.getElementById('inputCity1').classList.remove('red_border');
    }
}

document.getElementById('inputDistrict1').onblur = function () {
    var inputcity = document.getElementById('inputCity1').value;
    var inputdistrict = document.getElementById('inputDistrict1').value;
    if (inputdistrict == "") {
        if (inputcity == "")
        document.getElementById('errdistrict1').innerHTML = "Xin mời chọn Tỉnh/Thành phố";
        else
        document.getElementById('errdistrict1').innerHTML = "Xin mời chọn Quận/Huyện";
        document.getElementById('inputDistrict1').classList.add('red_border');
    } else {
        document.getElementById('errdistrict1').innerHTML = "";
        document.getElementById('inputDistrict1').classList.remove('red_border');
    }
}

document.getElementById('inputVillage1').onblur = function () {
    var inputcity = document.getElementById('inputCity1').value;
    var inputdistrict = document.getElementById('inputDistrict1').value;
    var inputvillage = document.getElementById('inputVillage1').value;
    if (inputvillage == "") {
        if (inputcity == "")
        document.getElementById('errvillage1').innerHTML = "Xin mời chọn Tỉnh/Thành phố";
        else if (inputdistrict == "")
        document.getElementById('errvillage1').innerHTML = "Xin mời chọn Quận/Huyện";
        else
        document.getElementById('errvillage1').innerHTML = "Xin mời chọn Xã/Phường";
        document.getElementById('inputVillage1').classList.add('red_border');
    } else {
        document.getElementById('errvillage1').innerHTML = "";
        document.getElementById('inputVillage1').classList.remove('red_border');
    }
}

document.getElementById('inputGroup1').onblur = function () {
    var inputcity = document.getElementById('inputCity1').value;
    var inputdistrict = document.getElementById('inputDistrict1').value;
    var inputvillage = document.getElementById('inputVillage1').value;
    var inputgroup = document.getElementById('inputGroup1').value;
    if (inputgroup == "") {
        if (inputcity == "")
        document.getElementById('errgroup1').innerHTML = "Xin mời chọn Tỉnh/Thành phố";
        else if (inputdistrict == "")
        document.getElementById('errgroup1').innerHTML = "Xin mời chọn Quận/Huyện";
        else if (inputvillage == "")
        document.getElementById('errgroup1').innerHTML = "Xin mời chọn Xã/Phường";
        else
        document.getElementById('errgroup1').innerHTML = "Xin mời chọn Thôn/Tổ";
        document.getElementById('inputGroup1').classList.add('red_border');
    } else {
        document.getElementById('errgroup1').innerHTML = "";
        document.getElementById('inputGroup1').classList.remove('red_border');
    }
}

function submitForm() {
    var name = document.getElementById('fullname').value;
    if (name == "") {
        document.getElementById('errname').innerHTML = "Xin moi nhap ho ten";
        document.getElementById('fullname').classList.add('red_border');
        return false;
    } else {
        document.getElementById('errname').innerHTML = "";
        document.getElementById('fullname').classList.remove('red_border');
    }

    var dob = document.getElementById('birthDay').value;
    if (dob == "") {
        document.getElementById('errdob').innerHTML = "Xin mời nhập ngày sinh";
        document.getElementById('birthDay').classList.add('red_border');
        return false;
    } else {
        document.getElementById('errdob').innerHTML = "";
        document.getElementById('birthDay').classList.remove('red_border');
    }

    var nation = document.getElementById('nationality').value;
    if (nation == "") {
        document.getElementById('errnation').innerHTML = "Xin mời nhập quốc tịch";
        document.getElementById('nationality').classList.add('red_border');
        return false;
    } else {
        document.getElementById('errnation').innerHTML = "";
        document.getElementById('nationality').classList.remove('red_border');
    }

    var bt = document.getElementById('bloodType').value;
    if (bt == "") {
        document.getElementById('errbloodtype').innerHTML = "Xin mời nhập nhóm máu";
        document.getElementById('bloodType').classList.add('red_border');
        return false;
    } else {
        document.getElementById('errbloodtype').innerHTML = "";
        document.getElementById('bloodType').classList.remove('red_border');
    }

    var bp = document.getElementById('inputBirthPlace').value;
    if (bp == "Choose...") {
        document.getElementById('errBP').innerHTML = "Xin mời chọn nơi đăng ký khai sinh";
        document.getElementById('inputBirthPlace').classList.add('red_border');
        return false;
    } else {
        document.getElementById('errBP').innerHTML = "";
        document.getElementById('inputBirthPlace').classList.remove('red_border');
    }

    var rl = document.getElementById('religion').value;
    if (rl == "") {
        document.getElementById('errreligion').innerHTML = "Xin mời nhập tôn giáo";
        document.getElementById('religion').classList.add('red_border');
        return false;
    } else {
        document.getElementById('errreligion').innerHTML = "";
        document.getElementById('religion').classList.remove('red_border');
    }

    var fID = document.getElementById('fatherID').value;
    if (fID == "") {
        document.getElementById('errfid').innerHTML = "Xin mời nhập ID cha";
        document.getElementById('fatherID').classList.add('red_border');
        return false;
    } else {
        document.getElementById('errfid').innerHTML = "";
        document.getElementById('fatherID').classList.remove('red_border');
    }

    var mID = document.getElementById('motherID').value;
    if (mID == "") {
        document.getElementById('errmid').innerHTML = "Xin mời nhập ID mẹ";
        document.getElementById('motherID').classList.add('red_border');
        return false;
    } else {
        document.getElementById('errmid').innerHTML = "";
        document.getElementById('motherID').classList.remove('red_border');
    }

    var inputcity = document.getElementById('inputCity').value;
    if (inputcity == "") {
        document.getElementById('errcity').innerHTML = "Xin mời chọn Tỉnh/Thành phố";
        document.getElementById('inputCity').classList.add('red_border');
        return false;
    } else {
        document.getElementById('errcity').innerHTML = "";
        document.getElementById('inputCity').classList.remove('red_border');
    }

    var inputdistrict = document.getElementById('inputDistrict').value;
    if (inputdistrict == "") {
        document.getElementById('errdistrict').innerHTML = "Xin mời chọn Quận/Huyện";
        document.getElementById('inputDistrict').classList.add('red_border');
        return false;
    } else {
        document.getElementById('errdistrict').innerHTML = "";
        document.getElementById('inputDistrict').classList.remove('red_border');
    }

    var inputvillage = document.getElementById('inputVillage').value;
    if (inputvillage == "") {
        document.getElementById('errvillage').innerHTML = "Xin mời chọn Xã/Phường";
        document.getElementById('inputVillage').classList.add('red_border');
        return false;
    } else {
        document.getElementById('errvillage').innerHTML = "";
        document.getElementById('inputVillage').classList.remove('red_border');
    }

    var inputgroup = document.getElementById('inputGroup').value;
    if (inputgroup == "") {
        document.getElementById('errgroup').innerHTML = "Xin mời chọn Thôn/Tổ";
        document.getElementById('inputGroup').classList.add('red_border');
        return false;
    } else {
        document.getElementById('errgroup').innerHTML = "";
        document.getElementById('inputGroup').classList.remove('red_border');
    }

    var inputcity1 = document.getElementById('inputCity1').value;
    if (inputcity1 == "") {
        document.getElementById('errcity1').innerHTML = "Xin mời chọn Tỉnh/Thành phố";
        document.getElementById('inputCity1').classList.add('red_border');
        return false;
    } else {
        document.getElementById('errcity1').innerHTML = "";
        document.getElementById('inputCity1').classList.remove('red_border');
    }

    var inputdistrict1 = document.getElementById('inputDistrict1').value;
    if (inputdistrict1 == "") {
        document.getElementById('errdistrict1').innerHTML = "Xin mời chọn Quận/Huyện";
        document.getElementById('inputDistrict1').classList.add('red_border');
        return false;
    } else {
        document.getElementById('errdistrict1').innerHTML = "";
        document.getElementById('inputDistrict1').classList.remove('red_border');
    }

    var inputvillage1 = document.getElementById('inputVillage1').value;
    if (inputvillage1 == "") {
        document.getElementById('errvillage1').innerHTML = "Xin mời chọn Xã/Phường";
        document.getElementById('inputVillage1').classList.add('red_border');
        return false;
    } else {
        document.getElementById('errvillage1').innerHTML = "";
        document.getElementById('inputVillage1').classList.remove('red_border');
    }

    var inputgroup1 = document.getElementById('inputGroup1').value;
    if (inputgroup1 == "") {
        document.getElementById('errgroup1').innerHTML = "Xin mời chọn Thôn/Tổ";
        document.getElementById('inputGroup1').classList.add('red_border');
        return false;
    } else {
        document.getElementById('errgroup1').innerHTML = "";
        document.getElementById('inputGroup1').classList.remove('red_border');
    }
}












