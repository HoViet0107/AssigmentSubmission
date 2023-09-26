let pMessage;
let uPessage;

export function validateUsername(username) {
  if (username.length < 4) {
    uPessage = "Tên đăng nhập phải lớn hơn 4 ký tự";
    return false;
  }

  if (username.length > 20) {
    uPessage = "Tên đăng nhập tối đa 20 ký tự";
    return false;
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    uPessage = "Tên đăng nhập không hợp lệ";
    return false;
  }

  if (!username.trim()) {
    uPessage = "Tên đăng nhập không được để trống";
    return false;
  }

  return true;
}

export function validatePassword(password) {
  if (password.length < 6) {
    pMessage = "Mật khẩu phải lớn hơn 6 ký tự!";
    return false;
  }

  if (password.length > 16) {
    pMessage = "Mật khẩu phải tối đa 16 ký tự!";
    return false;
  }

  if (!password.trim()) {
    pMessage = "Mật khẩu không được để trống!";
    return false;
  }

  if (/\s/.test(password)) {
    pMessage = "Mật khẩu không được chứa khoảng trắng!";
    return false;
  }
  return true;
}

export function getPMessage() {
  return pMessage; // Hàm này trả về giá trị của message
}
export function getUMessage() {
  return uPessage; // Hàm này trả về giá trị của message
}
