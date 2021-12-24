$(document).ready(function(){
    let data=JSON.parse('{{{json result}}}')
    var content1=``
    data.forEach(element => {
      content1+=`<tr>
                <td data-title="CCCD" class="ok1">${element.id}</td>
                <td data-title="Họ và tên">${element.ho_ten}</td>
                <td data-title="Ngày sinh">${element.ngay_sinh}</td>
                <td data-title="Giới tính">${element.gioi_tinh}</td>
                <td data-title="Nhóm máu">${element.nhom_mau}</td>
                <td data-title="Tình trạng hôn nhân">${element.tinh_trang_hon_nhan}</td>
                <td data-title="Nơi đăng ký khai sinh">${element.noi_dang_ky_khai_sinh}</td>
                <td data-title="Hộ khẩu thường trú">${element.ho_khau_thuong_tru}</td>
                <td data-title="Nơi đăng ký tạm trú">${element.noi_dang_ky_tam_tru}</td>
                <td data-title="Tôn giáo">${element.ton_giao}</td>
                <td data-title="Quốc tịch">${element.quoc_tich}</td>
                <td data-title="CCCD Cha">${element.id_cha}</td>
                <td data-title="CCCD Mẹ">${element.id_me}</td>
                <td ><a href="/nhaplieu/{{this.id}}/edit"><i class="far fa-edit"></i></a></td>
                <td><a href="#" data-id="{{this.id}}" data-bs-toggle="modal" data-bs-target="#delete-human"><i class="far fa-trash-alt"></i></a></td>
        </tr>`
    });
    $("#ok tbody").html(content1) 
  //  chọn tỉnh quận huyện
  fetch("http://localhost:3000/data/tinh").then(respon=> respon.json()).then(data =>{
    data.forEach(item=>{
      $("#tinh").append(`<option data-id="${item.id}">${item.ten}</option>`)
    })
  })
  var arr=[]
$("#tinh").change(function(){
  var b=$("#tinh option:selected").first().data("id")
  for(let i=0;i<data.length;i++){ 
     $(`tr:nth-child(${i+1})`).css("display","")
 }
 for(let i=0;i<data.length;i++){
   var idnguoi=data[i]["ho_khau_thuong_tru"].substr(0,2)
   if(Number(idnguoi)!=Number(b)){
     $(`tr:nth-child(${i+1})`).css("display","none")
   }
   else{
    arr.push(i+1)
   }
 }
  $("#xa").html("")
  fetch(`http://localhost:3000/data/huyen/${b}`).then(respon=>respon.json()).then(data =>{
    var content=``
    data.forEach(item=>{
     content+=`<option data-id="${item.id}">${item.ten}</option>`  
    })
    $("#huyen").html(content)
  })
})
$("#huyen").change(function(){
  arr.forEach(item=>{
    $(`tr:nth-child(${item})`).css("display","")
  })
   var c = $("#huyen option:selected").first().data("id")
 arr.forEach(item=>{
  var idnguoi=data[item-1]["ho_khau_thuong_tru"].substr(0,4)
  if(Number(idnguoi)!=Number(c)){
    $(`tr:nth-child(${item})`).css("display","none")
    console.log(item)
  }
 })
  fetch(`http://localhost:3000/data/xa/${c}`)
  .then(Response=>Response.json())
  .then(data=>{
    var content=``
    data.forEach(item=>{
      content+=`<option data-id="${item.id}">${item.ten}</option>`
    })
    $("#xa").html(content)
  })
})
  })
  document.addEventListener("DOMContentLoaded", function(){
    let modelSubmitBtn = document.getElementById('submit-btn')
    let deleteForm = document.getElementById('delete-form')
    let id;
    let exampleModal = document.getElementById('delete-human')
      exampleModal.addEventListener('show.bs.modal', function (event) {
      // Button that triggered the modal
      var button = event.relatedTarget
      // Extract info from data-bs-* attributes
      id = button.getAttribute('data-id')
    })
    modelSubmitBtn.onclick = function() {
      deleteForm.action = `/nhaplieu/${id}?_method=DELETE`
      deleteForm.submit();
    }
  });