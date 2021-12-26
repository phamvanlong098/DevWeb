var areaManager = document.querySelector('.areaManager')
var accountManager = document.querySelector('.accountManager')
var timeManager = document.querySelector('.timeManager')
var tableContainer = document.querySelector('.table-container')
var table = document.querySelector('.table')
var inputs;
var currentPage = 1;
var tong_so = 1;
let isAdmin = false;

areaManager.onclick = function() {
	document.querySelector('.active').classList.remove('active')
	this.classList.add('active')
	setPaging()
	render(1)

}

accountManager.onclick = function() {
	document.querySelector('.active').classList.remove('active')
	this.classList.add('active')
	setPaging()
	render(1)
}

timeManager.onclick = function() {
	document.querySelector('.active').classList.remove('active')
	this.classList.add('active')
	setPaging()
	render(1)
}

function render(pageNumber) {
	let api = getAPI()
	fetch(api + '?page=' + pageNumber)
	.then(response => response.json())
	.then(res => {
		if(res.cap == 'Admin') isAdmin = true
		html = getHTML(res)
		tableContainer.innerHTML = html;

		inputs = document.querySelectorAll('td input')
		Array.from(inputs).forEach((input) => {
			input.onchange = function() {
				putChange(this)
			}
		})
	})

	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
}

function getAPI() {
	let api = "";
	let active = document.querySelector('.active').getAttribute('module')
	switch (active) {
		case 'areaManager': {
			api = "./capcon/area"
			break;
		}
		case 'accountManager': {
			api = "./capcon/account"
			break;
		}
		case 'timeManager': {
			api = "./capcon/account"
			break;
		}
		default: {
			return;
		}
	}
	return api;
}

function getHTML(res) {
	let html = "";
	let cap = res.cap
	res = res.data
	let active = document.querySelector('.active').getAttribute('module')
	switch (active) {
		case 'areaManager': {
			if(cap == 'Admin') {
				html = `<table class="table table-hover mt-4">
				<thead class="bg-blue text-danger">
				<tr>
					<th scope="col">#</th>
					<th scope="col">Tài khoản</th>
					<th scope="col">Mật khẩu</th>
					<th scope="col">Xóa</th>
				</tr>
				</thead>
				<tbody>`
				html += res.reduce((result, item, index) => {
					return result += `<tr>
							<th scope="row">${index + 1}</th>
							<td>${item.tai_khoan}</td>
							<td><input name="mat_khau" username="${item.tai_khoan}" value="${item.mat_khau}"></td>
							<td><a href="#" data-id="${item.tai_khoan}" data-bs-toggle="modal" data-bs-target="#delete-human"><i class="far fa-trash-alt"></i></a></td>
						</tr>`
				}, "")
				html += `</tbody> </table>`
				if(currentPage == tong_so_page) {
					html += `
							<form class="createArea" method="POST" action="./capcon/area?_method=PUT/">
								<input name="tai_khoan" placeholder="Tên đăng nhập">
								<input name="mat_khau" placeholder="Mật khẩu">
								<button type="submit" class="btn btn-primary btn-sm" onclick="createArea(event)" >Tạo mới</button>

							</form>`
				}

			}
			else {
				html = `<table class="table table-hover mt-4">
				<thead class="bg-blue text-danger">
				<tr>
					<th scope="col">#</th>
					<th scope="col">Mã khu vực</th>
					<th scope="col">Khu vực</th>
					<th scope="col">Xóa</th>
				</tr>
				</thead>
				<tbody>`
				html += res.reduce((result, item, index) => {
					return result += `<tr>
							<th scope="row">${index + 1}</th>
							<td>${item.id}</td>
							<td><input name="ten" username="${item.id}" value="${item.ten}"></td>
							<td><a href="#" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#delete-human"><i class="far fa-trash-alt"></i></a></td>
						</tr>`
				}, "")
				html += `</tbody> </table>`
				if(currentPage == tong_so_page) {
					html += `
					<form class="createArea" method="POST" action="./capcon/area?_method=PUT/">
						<input name="id" placeholder="Mã khu vực">
						<input name="ten" placeholder="Tên khu vực">
						<button type="submit" class="btn btn-primary btn-sm" onclick="createArea(event)" >Tạo mới</button>
					</form>`
				}
			
			}
			break;
		}
		case 'accountManager': {
			if(cap == 'Admin') {
				html = `<table class="table table-hover mt-4">
				<thead class="bg-blue text-danger">
				<tr>
					<th scope="col">#</th>
					<th scope="col">Tài khoản</th>
					<th scope="col">Mật khẩu</th>
				</tr>
				</thead>
				<tbody>`
				html += res.reduce((result, item, index) => {
					return result += `<tr>
							<th scope="row">${index + 1}</th>
							<td>${item.tai_khoan}</td>
							<td><input name="mat_khau" username="${item.tai_khoan}" value="${item.mat_khau}"></td>
						</tr>`
				}, "")
				html += `</tbody> </table>`
			}
			else {
				html = `<table class="table table-hover mt-4">
				<thead class="bg-blue text-danger">
				<tr>
					<th scope="col">#</th>
					<th scope="col">Khu vực</th>
					<th scope="col">Tài khoản</th>
					<th scope="col">Mật khẩu</th>
				</tr>
				</thead>
				<tbody>`
				html += res.reduce((result, item, index) => {
					return result += `<tr>
							<th scope="row">${index + 1}</th>
							<td>${item.ten}</td>
							<td>${item.id}</td>
							<td><input name="mat_khau" username="${item.id}" value="${item.mat_khau}"></td>
						</tr>`
				}, "")
				html += `</tbody> </table>`
			}
			break;
		}
		case 'timeManager': {
			if(cap == 'Admin') {
				html = `<table class="table table-hover mt-4">
				<thead class="bg-blue text-danger">
				<tr>
					<th scope="col">#</th>
					<th scope="col">Tài khoản</th>
					<th scope="col">Thời hạn</th>
				</tr>
				</thead>
				<tbody>`
				html += res.reduce((result, item, index) => {
					return result += `<tr>
							<th scope="row">${index + 1}</th>
							<td>${item.tai_khoan}</td>
							<td><input name="mat_khau" username="${item.tai_khoan}" value="${item.thoi_han}"></td>
						</tr>`
				}, "")
				html += `</tbody> </table>`
			}
			else {
				html = `<table class="table table-hover mt-4">
				<thead class="bg-blue text-danger">
				<tr>
					<th scope="col">#</th>
					<th scope="col">Khu vực</th>
					<th scope="col">Thời hạn</th>
				</tr>
				</thead>
				<tbody>`
				html += res.reduce((result, item, index) => {
					return result += `<tr>
							<th scope="row">${index + 1}</th>
							<td>${item.ten}</td>
							<td><input name="mat_khau" username="${item.id}" value="${item.thoi_han}"></td>
						</tr>`
				}, "")
				html += `</tbody> </table>`
			}
			break;
		}
		default: {
			return;
		}
	}

	return html
}

function setPaging() {
	currentPage = 1
	let api = getAPI()
	$('#paging').pagination({
		dataSource: api + '?page=1',
		locator: 'data',
		totalNumberLocator: function(response) {
			tong_so_page =  Math.ceil(response.tong_so / 20)
			tong_so = response.tong_so
			return response.tong_so;
		},
		pageSize: 20,
		// autoHidePrevious: true,
		// autoHideNext: true,
	
		afterPageOnClick: function(event, pageNumber) {
			currentPage = pageNumber
			render(pageNumber)
		},
	
		afterPreviousOnClick: function(event, pageNumber) {
			if(currentPage > 1)
			render(--currentPage)
		},
	
		afterNextOnClick: function(event, pageNumber) {
			if(currentPage < tong_so_page)
			render(++currentPage)
		}
	})
}

function putChange(input) {
	let api = ""
	let payload = {}
	let active = document.querySelector('.active').getAttribute('module')
	switch (active) {
		case 'areaManager': {
			api = "./capcon/area"
			payload.id = input.getAttribute('username')
			payload.ten = input.value
			break;
		}
		case 'accountManager': {
			api = "./capcon/account"
			payload.username = input.getAttribute('username')
			payload.password = input.value
			break;
		}
		case 'timeManager': {
			api = "./capcon/deathline"
			payload.username = input.getAttribute('username')
			payload.deathline = input.value
			break;
		}
		default: {
			return;
		}
	}
	console.log(payload)

	fetch(api, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	})
}

function createArea(event) {
	event.preventDefault()
	let formArea = document.querySelector('.createArea')
	let payload = {}
	if(isAdmin) {
		let id = formArea.querySelector("input[name='tai_khoan']").value
		let ten = formArea.querySelector("input[name='mat_khau']").value
		payload = {id, ten}
	}
	else {
		let id = formArea.querySelector("input[name='id']").value
		let ten = formArea.querySelector("input[name='ten']").value
		payload = {id, ten}
	}
	console.log(payload)


	fetch('./capcon/area', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	})
	.then(res => {
		render(currentPage)
	})

}

document.addEventListener('DOMContentLoaded', function() {
	areaManager.click()
	
}, false);

// delete manage
var modalSubmitBtn = document.getElementById('submit-btn')
var modalDismissBtn = document.getElementById('dismiss-btn')
var deleteForm = document.getElementById('delete-form')
var id;
var exampleModal = document.getElementById('delete-human')
exampleModal.addEventListener('show.bs.modal', function (event) {
// Button that triggered the modal
var button = event.relatedTarget
// Extract info from data-bs-* attributes
id = button.getAttribute('data-id')
})

modalSubmitBtn.onclick = function() {
	let payload = {id}
	fetch('./capcon/area', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	})
	.then(res => {
	})
	render(currentPage)
	modalDismissBtn.click()
}
