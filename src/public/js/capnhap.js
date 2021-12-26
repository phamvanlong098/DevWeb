function loadselect(iddiv,tenselect,idselect){
    var choose=''
    var id=''
    if(tenselect=='tinh'){
        choose='huyen'     
        if(iddiv=='hktt'){
            id='#huyen'
            $('#xa').html('')
            $('#xom').html('')
        }
       else{
        id='#huyen1'
        $('#xa1').html('')
        $('#xom1').html('')
       }
    }
    else if(tenselect=='huyen')
    {
        choose='xa'
        if(iddiv=='hktt')    {
            id='#xa'
            $('#xom').html('')
        }
        else  {
            id='#xa1'
            $('#xom1').html('')
        }
    }
    else if(tenselect=='xa')
    {
       choose='xom'
       if(iddiv=='hktt')
       id='#xom'
       else  id='#xom1'
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
var hktt=$('#HKTT').val() 
console.log(hktt)
var idTinhPerson=hktt.substr(0,2)
var idHuyenPerson=hktt.substr(0,4)
var idXaPerson=hktt.substr(0,6)
var idXomPerson=hktt.substr(0,8)

var dktt=$('#DKTT').val() 
console.log(dktt)
var idTinhPerson1=dktt.substr(0,2)
var idHuyenPerson1=dktt.substr(0,4)
var idXaPerson1=dktt.substr(0,6)
var idXomPerson1=dktt.substr(0,8)
// thêm hộ khẩu thường trú
fetch('http://localhost:3000/data/tinh').then(respon=>respon.json()).then(data=>{
    data.forEach(item=>{
        $('#tinh').append(`<option value="${item.id}">${item.ten}</option>`)
    })
    $('#tinh').val(idTinhPerson)
  
    
})
fetch(`http://localhost:3000/data/huyen/${idTinhPerson}`).then(respon=>respon.json()).then(data=>{
    var content=``
    data.forEach(item=>{
        content+=`<option value="${item.id}">${item.ten}</option>`  
    })
    $('#huyen').html(content)
    $('#huyen').val(idHuyenPerson)
})
fetch(`http://localhost:3000/data/xa/${idHuyenPerson}`).then(respon=>respon.json()).then(data=>{
        var content=``
        data.forEach(item=>{
            content+=`<option value="${item.id}">${item.ten}</option>`  
        })
        $('#xa').html(content)
        $('#xa').val(idXaPerson)
    })
    fetch(`http://localhost:3000/data/xom/${idXaPerson}`).then(respon=>respon.json()).then(data=>{
        var content=``
        data.forEach(item=>{
            content+=`<option value="${item.id}">${item.ten}</option>`  
        })
        $('#xom').html(content)
        $('#xom').val(idXomPerson)
    })
//chọn tỉnh
$('#tinh').change(function(){
    var a=$(this).val()
    loadselect('hktt','tinh',a)
})
//chọn huyện
$('#huyen').change(function(){
    var a=$(this).val()
loadselect('hktt','huyen',a)
})
// chọn xa
$('#xa').change(function(){
    var a=$(this).val()
loadselect('hktt','xa',a)
})
// thêm nơi ở hiện tại
fetch('http://localhost:3000/data/tinh').then(respon=>respon.json()).then(data=>{
    data.forEach(item=>{
        $('#tinh1').append(`<option value="${item.id}">${item.ten}</option>`)
        $('#tinh1').val(idTinhPerson1)
    })
})
fetch(`http://localhost:3000/data/huyen/${idTinhPerson1}`).then(respon=>respon.json()).then(data=>{
    var content=``
    data.forEach(item=>{
        content+=`<option value="${item.id}">${item.ten}</option>`  
    })
    $('#huyen1').html(content)
    $('#huyen1').val(idHuyenPerson1)
})
fetch(`http://localhost:3000/data/xa/${idHuyenPerson1}`).then(respon=>respon.json()).then(data=>{
        var content=``
        data.forEach(item=>{
            content+=`<option value="${item.id}">${item.ten}</option>`  
        })
        $('#xa1').html(content)
        $('#xa1').val(idXaPerson1)
    })
    fetch(`http://localhost:3000/data/xom/${idXaPerson1}`).then(respon=>respon.json()).then(data=>{
        var content=``
        data.forEach(item=>{
            content+=`<option value="${item.id}">${item.ten}</option>`  
        })
        $('#xom1').html(content)
        $('#xom1').val(idXomPerson1)
    })
// chọn tỉnh
$('#tinh1').change(function(){
    var a = $(this).val()
    loadselect('noioht','tinh',a)
})
// chọn huyện
$('#huyen1').change(function(){
    var a = $(this).val()
    loadselect('noioht','huyen',a)
}) 
// chọn xã
$('#xa1').change(function(){
    var a = $(this).val()
    loadselect('noioht','xa',a)
})