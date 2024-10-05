
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

        //inputMail.addEventListener('input', userValidate);
        //inputPass.addEventListener('input', passValidate)
        
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
    /*
       
        function userValidate(){
            const value = inputMail.value.toLowerCase();
            const messageMail = document.querySelector('#message-mail');

            if(!validateMail(value)){
                createMessageBad(messageMail);
                inputMail.classList.remove('border-ok-login');
                inputMail.classList.add('border-bad-login');
                userOK = true;
            }else {
                deleteMessageBad(messageMail);
                inputMail.classList.remove('border-bad-login');
                inputMail.classList.add('border-ok-login');
            }
        };

        function createMessageBad(messageMail){
            if(!messageMail.lastChild){
            let span = document.createElement("span");
            span.textContent = "Usuario incorrecto";
            messageMail.appendChild(span);
            }
        }

        function deleteMessageBad(messageMail){
            if(messageMail.lastChild){
            messageMail.removeChild(messageMail.lastChild);
            }
        }

        function validateMail(value){
            let validated = false;
            users.forEach(element => { if(value.localeCompare(element.username, undefined, { sensitivity: 'base' }) === 0) {validated = true;}});
            return validated;
        }

        ////// PASSWORD /////

        function passValidate(){
            const messagePass = document.querySelector('#message-pass');
            const passValue = inputPass.value.toLowerCase();
            const userValue = inputMail.value.toLowerCase();

            console.log(passValue);
            console.log(userValue);

            if(!validatePass(userValue,passValue)){
                createMessagePassBad(messagePass);
                inputPass.classList.remove('border-ok-login');
                inputPass.classList.add('border-bad-login');
                passOK = true;
            }else {
                deleteMessagePassBad(messagePass);
                inputPass.classList.remove('border-bad-login');
                inputPass.classList.add('border-ok-login');
            }
        };

        function createMessagePassBad(messagePass){
            if(!messagePass.lastChild){
            let span = document.createElement("span");
            span.textContent = "Password incorrecto";
            messagePass.appendChild(span);
            }
        }

        function deleteMessagePassBad(messagePass){
            if(messagePass.lastChild){
            messagePass.removeChild(messagePass.lastChild);
            }
        }

        function validatePass(valueUser,valuePass){
            let validated = false;
            users.forEach(element => { 
                if( (valueUser.localeCompare(element.username, undefined, { sensitivity: 'base' }) === 0) &&
                    (valuePass.localeCompare(element.password, undefined, { sensitivity: 'base' }) === 0))
                    {validated = true;}});
            return validated;
        }

        


    }
        */