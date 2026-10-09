// lấy biến
const userCode = document.getElementById("user-code");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const role = document.getElementById("role");
const dob = document.getElementById("dob");
let statusValue = document.querySelector(
  '.status-option input[name="status"]:checked',
);

const description = document.getElementById("description");
const addForm = document.getElementById("add-new-user-form");
const openEye = document.getElementById("open-eye");
const closeEye = document.getElementById("close-eye");
const backBtn = document.getElementById("back-btn");
const submitBtn = document.getElementById("submit-btn");

//lấy dữ liệu từ localStorage
let userList = JSON.parse(localStorage.getItem("userList"));

// User code phải được tự động sinh ra là một đại lượng unique (độc nhất) (Trang add user)
userCode.value = `U${userList.length + 1}`;
// Validate họ và tên không được để trống (Trang add user)
let checkUsernameBlank = () => {
  if (userName.value.trim() === "") {
    userName.closest(".input-element").querySelector(".mes").innerText =
      "Username không được bỏ trống";
    return false;
  } else {
    userName.closest(".input-element").querySelector(".mes").innerText = "";
    return true;
  }
};
userName.addEventListener("blur", () => {
  checkUsernameBlank();
});

// Validate email không được để trống (Trang add user)
let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let checkEmail = () => {
  if (email.value.trim() === "") {
    email.closest(".input-element").querySelector(".mes").innerText =
      "Email không được để trống";
    return false;
    // Validate email phải đúng định dạng (Trang add user)
  } else if (!regexEmail.test(email.value)) {
    email.closest(".input-element").querySelector(".mes").innerText =
      "Email không đúng định dạng";
    return false;
  } else {
    email.closest(".input-element").querySelector(".mes").innerText = "";
    return true;
  }
};
email.addEventListener("blur", () => {
  checkEmail();
});

// Validate mật khẩu không được để trống (Trang add user)
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

    // Validate mật khẩu tối thiểu 8 ký tự (Trang add user)
  } else if (!regexPassLength.test(password.value.trim())) {
    // mật khẩu ít hơn 8 kí tự sau khi blur vào và nhấc ra
    password.closest(".password-input").querySelector(".mes").innerText =
      "Mật khẩu phải có trên 8 kí tự";
    return false;
  } else if (!regexPassNumber.test(password.value)) {
    // mật khẩu không có số
    password.closest(".password-input").querySelector(".mes").innerText =
      "Mật khẩu phải có ít nhất 1 số";
    return false;
  } else if (!regexPassUpperLower.test(password.value)) {
    // Mật khẩu phải có chữ hoa và chữ thường
    password.closest(".password-input").querySelector(".mes").innerText =
      "Mật khẩu phải có chữ hoa và chữ thường";
    return false;
  } else {
    password.closest(".password-input").querySelector(".mes").innerText = "";
    return true;
  }
};
password.addEventListener("blur", () => {
  checkPass();
});
// nút xem mật khẩu
openEye.addEventListener("click", (ev) => {
  password.type = "text";
  openEye.style.display = "none";
  closeEye.style.display = "block";
});
closeEye.addEventListener("click", (ev) => {
  password.type = "password";
  closeEye.style.display = "none";
  openEye.style.display = "block";
});

// Tính năng thêm mới user
addForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  checkEmail();
  checkPass();
  checkUsernameBlank();
  if (checkEmail() && checkPass() && checkUsernameBlank()) {
    // Kiểm tra email đã tồn tại chưa
    let isExist = userList.some((user) => {
      return user.email === email.value.trim();
    });

    if (isExist) {
      email.closest(".input-element").querySelector(".mes").innerText =
        "Email đã có tài khoản. Vui lòng sử dung email khác";
      return;
    } else {
      // Tạo tài khoản mới
      let selectedStatus = document.querySelector(
        'input[name="status"]:checked',
      );
      let newUser = {
        usercode: userCode.value,
        username: username.value,
        email: email.value,
        password: password.value,
        role: role.value,
        birthday: dob.value,
        status: selectedStatus.value,
        description: description.value,
      };
      
      userList.push(newUser);
      localStorage.setItem('userList',JSON.stringify(userList));
      
    }
  }
});

// Tính năng điều hướng quay lại trang user management
backBtn.addEventListener("click", () => {
  let conFirmQues = confirm("Bạn có muốn quay lại trang Dashboard???");
  if (conFirmQues) {
    window.location.href = "./dashboard.html";
  }
});
