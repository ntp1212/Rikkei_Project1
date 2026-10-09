let table = document.getElementById('user-table-container');
let tbody = document.getElementById('table-body');
let inputSearch = document.getElementById('search-box');

// lấy dữ liệu từ localStorage
let userList = JSON.parse(localStorage.getItem('userList'));
// hàm cập nhật dữ liệu lên localStorage
let updateLocal = () => {
    localStorage.setItem('userList', JSON.stringify(userList));
};
// hiển thị dữ liệu
let currentPage = 1;
let userPerPage = 5;

let renderUserList = (ar) => {
    tbody.innerHTML = '';
    let start = (currentPage - 1) * userPerPage;
    let end = start+ userPerPage;
    let currentUser = ar.slice(start,end);
    currentUser.forEach(el => {
    let tr = document.createElement('tr')
    tr.className = 'user-row';
    tr.innerHTML = `
    <td>${el.usercode}</td>
            <td class="user-name">${el.username}</td>
            <td>${el.email}</td>
            <td>${el.role}</td>
            <td>${el.birthday}</td>
            <td>${el.status}</td>
            <td>
              <div class="action-buttons">
                <button class="btn-edit" >Sửa</button>
                <button class="btn-delete" data-email = "${el.email}">Xóa</button>
              </div>
            </td>`
            tbody.appendChild(tr);
});
}

//Hiển thị phần giao diện bảng từ dữ liệu users trong Local Storage
renderUserList(userList);

// Tính năng xoá từng hàng, từng bản ghi trong bảng dữ liệu users
tbody.addEventListener('click', (ev) => {
    let deleteBtn = ev.target.closest('.btn-delete');
        
    if (deleteBtn) {
        let confirmDelete = confirm("Bạn có muốn xóa dữ liệu???")
       if(confirmDelete) {
        let deleteEmail = deleteBtn.dataset.email;  
    let deleteIndex = userList.findIndex((user)=> {
         return user.email === deleteEmail;
    })
        userList.splice(deleteIndex,1);
        updateLocal();
        renderUserList(userList);
       }
    } 
    
    }
    
)


inputSearch.addEventListener('input', () => {
    let listSearch = userList.filter((el) => 
    {return el.username.toLowerCase().includes(inputSearch.value.trim().toLowerCase())
    })    
    renderUserList(listSearch);
})

// Tính năng hiển thị số trang tương ứng 5 đối tượng trên 1 trang
let previousPage = document.querySelector('.arrow-left');
let nextPage = document.querySelector('.arrow-right');
let totalPages = Math.ceil(userList.length / userPerPage);
  // previous
    previousPage.addEventListener('click', (ev)=> {
        if(currentPage >1) {
            currentPage--;
            renderUserList(userList);
        }
    })
    // next
    nextPage.addEventListener('click', (ev)=> {
        if(currentPage < totalPages) {
            currentPage++;
            renderUserList(userList);
        }
    })



//Tính năng điều hướng chuyển sang trang mới




//Tính năng điều hướng 
// sang trang chỉnh sửa (edit) thông tin người dùng
tbody.addEventListener('click',(ev) => {
    let edit = ev.target.classList.contains("btn-edit");
    if (edit) {
        let row = ev.target.closest(".user-row");
        let editName = row.querySelector(".user-name").innerText;      
        let user = userList.find((el) => {
                    return el.username === editName;
                    });
        localStorage.setItem('editUser',JSON.stringify(user));

        
       
        window.location.href = "http://127.0.0.1:5500/Project/Project_Template/Project_Template/pages/edit-user.html"
    }
})