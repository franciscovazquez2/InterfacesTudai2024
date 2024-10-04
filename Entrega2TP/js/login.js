
document.addEventListener('DOMContentLoaded', inicio);

    function inicio() {
        "use strict"

        let buttonForm = document.querySelector("#button-form");
        let loginForm = document.querySelector("#login-form");

        buttonForm.addEventListener('click', validarForm);


        function validarForm(e) {
            e.preventDefault();
            console.log(e);
            loginForm.reset();
        }
    }