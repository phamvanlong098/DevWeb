var bol1 = -1;
var bol2 = -1;
var bol3 = -1;
var bol1a = -1;
var bol1b = -1;
var bol1c = -1;
var bol = true;

//kiểm tra tk mk
function validatePassword(pw) {

    return pw.length > 6;

}
function error () {
    var oldPass = document.getElementById('pass1').value;
    var newPass = document.getElementById('pass2').value;
    var resetPass = document.getElementById('pass3').value;
    if (oldPass == "") {
        document.getElementById('error').style.display = 'inherit';
        document.getElementById('pass1').style.borderColor = 'red';
        document.getElementById('pass3').style.marginBottom = '0px';
        bol1a = 1;
    }
    else {
        document.getElementById('pass1').style.borderColor = 'black';
        document.getElementById('pass1').style.borderWidth = '0.5px';
        document.getElementById('pass1').style.borderStyle = 'solid';
        bol1a = 0;
    }
    if (newPass == "") {
        document.getElementById('error').style.display = 'inherit';
        document.getElementById('pass2').style.borderColor = 'red';
        document.getElementById('pass3').style.marginBottom = '0px';
        bol1b = 1;
    }
    else {
        document.getElementById('pass2').style.borderColor = 'black';
        document.getElementById('pass2').style.borderWidth = '0.5px';
        document.getElementById('pass2').style.borderStyle = 'solid';
        bol1b = 0;
    }

    if (resetPass == "") {
        document.getElementById('error').style.display = 'inherit';
        document.getElementById('pass3').style.borderColor = 'red';
        document.getElementById('pass3').style.marginBottom = '0px';
        bol1c = 1;
    }
    else {
        document.getElementById('pass3').style.borderColor = 'black';
        document.getElementById('pass3').style.borderWidth = '0.5px';
        document.getElementById('pass3').style.borderStyle = 'solid';
        bol1c = 0;
    }
    if (bol1a == 1 || bol1b == 1 || bol1c == 1)
        bol1 = 1;
    else
        bol1 = 0;

    if (bol1 == 0) {
        if (resetPass != newPass) {
            document.getElementById('error').style.display = 'inherit';
            document.getElementById('pass3').style.marginBottom = '0px';
            document.getElementById('pass3').style.borderColor = 'red';
            document.getElementById('error').innerHTML = 'Mật khẩu nhập lại phải giống mật khẩu mới';
            bol2 = 1;
        }
        else {
            document.getElementById('pass3').style.borderColor = 'black';
            document.getElementById('pass3').style.borderWidth = '0.5px';
            document.getElementById('pass3').style.borderStyle = 'solid';
            bol2 = 0;
        }

        if (bol2 == 0) {
            if (!validatePassword(newPass) && bol2 == 0) {
                document.getElementById('error').style.display = 'inherit';
                document.getElementById('pass2').style.borderColor = 'red';
                document.getElementById('pass3').style.marginBottom = '0px';
                document.getElementById('error').innerHTML = 'Mật khẩu phải có hơn 6 kí tự';
                bol3 = 1;
            }
            else {
                bol3 = 0;
            }
        }
    }


    if (bol1 == 1 || bol2 == 1 || bol3 == 1) // không thay đổi thì sẽ hiện viền đỏ và không kết nối đến link
        bol = false;
    else
        bol = true;
    return bol;
}