// var instead of let/const for better older browsers compatibility
var passwordTextField;
var confpasswordTextField;
function togglePasswordTextFieldVisibility() {
    if (passwordTextField.attr('type') == "password") {
        passwordTextField.attr('type', 'text');
        confpasswordTextField.attr('type', 'text');
    } else {
        passwordTextField.attr('type', 'password');
        confpasswordTextField.attr('type', 'password');
    }
}

window.addEventListener('DOMContentLoaded', function() {
    passwordTextField = $("#password");
    confpasswordTextField = $("#confpassword");
    $("#show").change(togglePasswordTextFieldVisibility);
    $("#showadminpass").change(togglePasswordTextFieldVisibility);
});
