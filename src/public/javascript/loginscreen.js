var bol1 = true;
var bol2 = true;
var bol = true;

//kiểm tra tk mk
function error () {
    var un = document.getElementById('un').value;
    var pass = document.getElementById('pass').value;
    if (un == "") {
        document.getElementById('error').style.display = 'inherit';
        document.getElementById('un').style.borderColor = 'red';
        document.getElementById('pass').style.marginBottom = '0px';
        bol1 = false;
    }
    else {
        document.getElementById('un').style.borderColor = 'black';
        document.getElementById('un').style.borderWidth = '0.5px';
        document.getElementById('un').style.borderStyle = 'solid';
        bol1 = true;
    }
    if (pass == "") {
        document.getElementById('error').style.display = 'inherit';
        document.getElementById('pass').style.borderColor = 'red';
        document.getElementById('pass').style.marginBottom = '0px';
        bol2 = false;
    }
    else {
        document.getElementById('pass').style.borderColor = 'black';
        document.getElementById('pass').style.borderWidth = '0.5px';
        document.getElementById('pass').style.borderStyle = 'solid';
        bol2 = true;
    }
    /*
    Thêm điều kiện if khi mk không đúng
    */

    if (bol1 == false || bol2 == false) // tk hoặc mk không đúng thì sẽ hiện viền đỏ và không kết nối đến link
        bol = false;
    else
        bol = true;
    return bol;
}