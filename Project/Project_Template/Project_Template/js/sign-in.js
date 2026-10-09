let signinForm = document.getElementById('sign-in-form');
let inputEmail = document.getElementById('email');
let inputPassword =document.getElementById('password');
let saveLoggin = document.querySelector('.save-loggin');
let msg =document.getElementById('msg');
let loginValidation =document.getElementById('login-validation');
let passwordCannotBlank =document.querySelector('.password-cannot-blank');
let emailCannotBlank =document.querySelector('.email-cannot-blank');
let loginToast = document.getElementById('login-toast');
let loginError = document.getElementById('login-error');
let closeBtn = document.querySelector('.close-btn');

//hàm đóng tất cả các thẻ mes eror
let closeMes = () => {
    msg.classList.remove('show');
    loginValidation.classList.add('hidden');
    passwordCannotBlank.classList.add('hidden');
    emailCannotBlank.classList.add('hidden');
    loginToast.classList.add('hidden');
    loginError.classList.add('hidden');
}
closeMes();

// ------------- kiểm tra email không trống --------------
let checkEmail = () => {
    if(inputEmail.value.trim() === '') {       
        msg.classList.add('show');
        loginValidation.classList.remove('hidden');
        emailCannotBlank.classList.remove('hidden');
        return false;
    } else {
        closeMes();
        return true;
    }
}
inputEmail.addEventListener('blur', () => {
    checkEmail();
})
// ------------- kiểm tra mật khẩu không trống ---------------
let checkPass = () => {
    if (inputPassword.value.trim() === '') {
        msg.classList.add('show');
        loginValidation.classList.remove('hidden');
        passwordCannotBlank.classList.remove('hidden');
        return false;
    } else{
        closeMes();
        return true;
    }
}
inputPassword.addEventListener('blur', () => {
    checkPass();
})
//  Lấy dữ liệu userList từ localStrorage
let userList = JSON.parse(localStorage.getItem('userList')) || [];;

// kiểm tra email. mật khẩu có tồn tại không
let flag = false;
isValid = () => {
    
    userList.forEach(el => {
        if (el.email === inputEmail.value 
            && el.password === inputPassword.value) {
            flag = true;
        } 
    });
    return flag;
}

// kiểm tra lại và đăng nhập
signinForm.addEventListener('submit', (ev)=> {
    ev.preventDefault();
    // kiểm tra lại
    let emailValid = checkEmail();
    let passValid = checkPass();
    if(!emailValid || !passValid) {
        return;
    }
    if (isValid()) {
         // tài khoản chính xác
        msg.classList.add('show');
        loginToast.classList.remove('hidden');
        flag = false;
        alert('Đăng nhập thành công')
        // chuyển hướng trang sang dashboard
        window.location.href = '../pages/dashboard.html'
        closeMes();
        inputPassword.value = '';
    } else {
        // Email hoặc mật khẩu không tồn tại.
        msg.classList.add('show');
        loginError.classList.remove('hidden');
        }
    }
)


// ------------------ Nút đóng thông báo ---------------
closeBtn.addEventListener('click',() => {
    closeMes();
})
