
document.addEventListener('DOMContentLoaded', inicio);

    function inicio() {
        "use strict"

        let users = [{
            username: 'admin@gmail.com',
            password: 'password'
        }];

        /*Boton abrir seccion user*/
        const userHeader = document.getElementById('user-header');
        const usmenu = document.querySelector('.seccion-usuario');
        
        const loginForm = document.querySelector("#login-form");
        const inputMail = document.querySelector('#inputMail');
        const inputPass = document.querySelector('#inputPass');
        
        loginForm.addEventListener('submit', validarForm);
        userHeader.addEventListener('click',()=>{usmenu.classList.toggle('userHidden');});
        
        function validarForm(e) {
            e.preventDefault();
            const message = document.querySelector('#message-login');
            if(!validateUser()){
                loginForm.reset();
                messageError(message);
            }else{
                window.location.href = '../Entrega2TP/home.html';
            }
        }

        function validateUser(){
            let validated = false;
            const valuePass = inputPass.value.toLowerCase();
            const valueUser = inputMail.value.toLowerCase();
            users.forEach(element => { 
                if( (valueUser.localeCompare(element.username, undefined, { sensitivity: 'base' }) === 0) &&
                    (valuePass.localeCompare(element.password, undefined, { sensitivity: 'base' }) === 0))
                    {validated = true;}});
            return validated;
        }



    function messageError(message){
        deleteMessage(message);
        let span = document.createElement("span");
        span.textContent = "Email y/o password incorrectos";
        span.classList.add('error-message');
        message.appendChild(span);
    }

    function deleteMessage(message){
        if(message.lastChild){
            message.removeChild(message.lastChild);
            }
    }
    }
