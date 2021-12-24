
var areaManager = document.querySelector('.areaManager')
var accountManager = document.querySelector('.accountManager')
var timeManager = document.querySelector('.timeManager')
var tableContainer = document.querySelector('.table-container')
var table = document.querySelector('.table')

areaManager.onclick = function () {
	document.querySelector('.active').classList.remove('active')
	this.classList.add('active')
}

accountManager.onclick = function () {
	document.querySelector('.active').classList.remove('active')
	this.classList.add('active')

	fetch('./capcon/account')
	.then(response => response.json())
	.then(data => {
		let html = `<table class="table table-hover mt-4">
		<thead class="table-primary">
		  <tr>
			<th scope="col">#</th>
			<th scope="col">Khu vực</th>
			<th scope="col">Tài khoản</th>
			<th scope="col">Mật khẩu</th>
		  </tr>
		</thead>
		<tbody>`
		if(!data[0].ten) {
			html = `<table class="table table-hover mt-4">
				<thead class="table-primary">
				<tr>
					<th scope="col">#</th>
					<th scope="col">Tài khoản</th>
					<th scope="col">Mật khẩu</th>
				</tr>
				</thead>
				<tbody>`
		}
		html += data.reduce((result, item, index) => {
			if(item.ten) {
				return result += `
				<tr>
					<th scope="row">${index + 1}</th>
					<td>${item.ten}</td>
					<td>${item.tai_khoan}</td>
					<td>${item.mat_khau}</td>
				</tr>`
			}
			else {
				return result += `
				<tr>
					<th scope="row">${index + 1}</th>
					<td>${item.tai_khoan}</td>
					<td>${item.mat_khau}</td>
				</tr>`
			}
		}, "")
		html += `</tbody>
		</table>`
		tableContainer.innerHTML = html;
	})
}

timeManager.onclick = function () {
	document.querySelector('.active').classList.remove('active')
	this.classList.add('active')

	
	fetch('./capcon/account')
	.then(response => response.json())
	.then(data => {
		let html = `<table class="table table-hover mt-4">
		<thead class="table-primary">
		  <tr>
			<th scope="col">#</th>
			<th scope="col">Khu vực</th>
			<th scope="col">Thời hạn</th>
		  </tr>
		</thead>
		<tbody>`
		if(!data[0].ten) {
			html = `<table class="table table-hover mt-4">
			<thead class="table-primary">
			<tr>
				<th scope="col">#</th>
				<th scope="col">Tài khoản</th>
				<th scope="col">Thời hạn</th>
			</tr>
			</thead>
			<tbody>`
		}
		html += data.reduce((result, item, index) => {
			if(item.ten) {
				return result += `
				<tr>
					<th scope="row">${index + 1}</th>
					<td>${item.ten}</td>
					<td>${item.han_chot}</td>
				</tr>
				`
			}
			else {
				return result += `
				<tr>
					<th scope="row">${index + 1}</th>
					<td>${item.tai_khoan}</td>
					<td>${item.han_chot}</td>
				</tr>
				`
			}
		}, "")
		html += `</tbody>
		</table>`
		tableContainer.innerHTML = html;
	})

}

document.addEventListener('DOMContentLoaded', function() {
	accountManager.click()
 }, false);