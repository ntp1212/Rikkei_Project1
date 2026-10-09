// lấy các biến cần thiết
const usercode = document.getElementById("user-code");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const role = document.getElementById("role");
const dob = document.getElementById("dob");
let statusValue = document.querySelector(
  '.status-option input[name="status"]:checked',
);
const description = document.getElementById("description");
const editForm = document.getElementById("edit-user-form");
const backBtn = document.getElementById("back-btn");
const editBtn = document.getElementById("save-btn");
const openEye = document.getElementById('open-eye');
const closeEye = document.getElementById('close-eye');

// lấy dữ liệu từ localStorage
let userList = JSON.parse(localStorage.getItem("userList"));
let editUser = JSON.parse(localStorage.getItem("editUser"));
usercode.value = editUser.usercode;
username.value = editUser.username;
email.value = editUser.email;
password.value = editUser.password;
role.value = editUser.role;
dob.value= editUser.birthday;
statusValue = editUser.status;
description.value = editUser.description;

// Tính năng điều hướng quay lại trang user management
backBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  const conFirm = confirm("Bạn có chắc muốn thoát khỏi trang?");
  if (conFirm) {
    window.location.href =
      "http://127.0.0.1:5500/Project/Project_Template/Project_Template/pages/dashboard.html";
  }
});


// Validate mật khẩu không được để trống (Trang edit user)
// Validate mật khẩu tối thiểu 8 ký tự (Trang edit user)
// Ít nhất 8 ký tự
let regexPassLength = /^.{8,}$/;
// Có ít nhất 1 chữ số
let regexPassNumber = /(?=.*\d)/;
// Có ít nhất 1 chữ hoa, 1 chữ thường
let regexPassUpperLower = /(?=.*[A-Z])(?=.*[a-z])/;
// Có ít nhất 1 ký tự đặc biệt
let regexSpecial = /(?=.*[^A-Za-z0-9\s])/;
// Không có khoảng trắng
let regexSpace = /^\S+$/;

let checkPass = () => {
    if (password.value.trim() === "") {
    // mật khẩu bị bỏ trống 
    password.closest(".password-input").querySelector(".mes").innerText =
      "Vui lòng không để mật khẩu trống";
    return false;
  } else if (!regexPassLength.test(password.value.trim())) {
    // mật khẩu ít hơn 8 kí tự sau khi blur vào và nhấc ra
    password.closest(".password-input").querySelector(".mes").innerText =
    'Mật khẩu phải có trên 8 kí tự'
    return false;
  } else if (!regexPassNumber.test(password.value)) {
    // mật khẩu không có số
    password.closest(".password-input").querySelector(".mes").innerText =
    'Mật khẩu phải có ít nhất 1 số'
    return false;
  } else if (!regexPassUpperLower.test(password.value)) {
    // Mật khẩu phải có chữ hoa và chữ thường
    password.closest(".password-input").querySelector(".mes").innerText =
    'Mật khẩu phải có chữ hoa và chữ thường'
    return false;
  } else {
    password.closest(".password-input").querySelector(".mes").innerText = '';
    return true;
  }
};
password.addEventListener("blur", () => {
  checkPass();
});
// nút xem mật khẩu
openEye.addEventListener('click', (ev) => {
    password.type = 'text'
    openEye.style.display = 'none'
    closeEye.style.display = 'block'
    
})
closeEye.addEventListener('click', (ev) => {
    password.type = 'password'
    closeEye.style.display = 'none'
    openEye.style.display = 'block'
    
})

// Validate username không được để trống (Trang edit user)
let checkUser = () => {
    if(username.value.trim()=== '') {
        username.closest('.input-element').querySelector('.mes').innerText = 
        "Vui lòng không bỏ trống Username"
        return false;
    } else {
        username.closest('.input-element').querySelector('.mes').innerText = '';
        return true;
    }
}
username.addEventListener('blur', () => {
    checkUser();
})

// Tính năng save thông tin cập nhật của user (Trang edit user)
editForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if(checkPass() && checkUser()) {
        const selectedStatus = document.querySelector(
        'input[name="status"]:checked');
    let newUser = {
        usercode: usercode.value,
      username: username.value,
      email:email.value,
      password: password.value,
      role: role.value,
      birthday: dob.value,
      status: selectedStatus.value,
      description: description.value,
    }
    let index = userList.findIndex((user) => {
        return user.usercode === newUser.usercode
    })
    if (index !== -1) {
        userList[index] = newUser;
        localStorage.setItem('userList', JSON.stringify(userList));
        alert("Cập nhật thành công");
    }
    }
        
})