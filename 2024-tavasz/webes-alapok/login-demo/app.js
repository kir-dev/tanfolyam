function togglePw() {
    const pwField = document.getElementById('password');
    if (pwField.type == 'password') {
        pwField.type = 'text';
    } else {
        pwField.type = 'password';
    }

}