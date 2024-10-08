
document.addEventListener('DOMContentLoaded', inicio);

    function inicio() {
        "use strict"

        let users = [{
            username: 'a',
            password: 'p'
        }];

        const loginForm = document.querySelector("#login-form");
        const inputMail = document.querySelector('#inputMail');
        const inputPass = document.querySelector('#inputPass');
        const popoverOK = document.querySelector('#id-popover-on');
        const popoverOFF = document.querySelector('#id-popover-off');
        const btnPopoverOff = document.querySelector('#btn-popover-off');
        const btnPopoverOn = document.querySelector('#btn-popover-on');
        const btnApple = document.querySelector('#btn-apple');
        const btnFacebook = document.querySelector('#btn-facebook');
        const btnGoogle = document.querySelector('#btn-google');

        btnPopoverOff.addEventListener('click', ()=>{loginForm.reset();});
        btnPopoverOn.addEventListener('click', ()=>{window.location.href = '../home.html';});
        btnApple.addEventListener('click', validarRedes);
        btnFacebook.addEventListener('click', validarRedes);
        btnGoogle.addEventListener('click', validarRedes);
        loginForm.addEventListener('submit', validarForm);

        
        function validarRedes(event){
            event.preventDefault();
            popoverOK.showPopover();
        }
        
        function validarForm(e) {
            e.preventDefault();
            if(!validateUser()){
                popoverOFF.showPopover();
            }else{
                popoverOK.showPopover();
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

    }
