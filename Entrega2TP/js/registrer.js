"use strict"
document.addEventListener('DOMContentLoaded', init);

function init() {


    const users = [{
        username: 'a@a.c',
        password: 'p'
    }];

    let validations = {
        validDate: false,
        validName: false,
        validSurname: false,
        validNickname: false,
        validPass: false,
        validReplipass: false,
        validMail: false
    };

    let passRepit;


    
    const regexLetters = /^[a-zA-Z\s]*$/;
    const regexNumLet = /^[a-zA-Z0-9\s]*$/;
    const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato a@a.c


    const registrerForm = document.querySelector("#registrer-form");
    const inputName = document.querySelector('#inputRegName');
    const messageName = document.querySelector('#messageName');
    const inputSurname = document.querySelector('#inputSurname');
    const messageSurnme = document.querySelector('#messageSurnme');
    const inputNickname = document.querySelector('#inputNickname');
    const messageNickname = document.querySelector('#messegeNickname');
    const inputMail = document.querySelector('#inputMail');
    const messegeMail = document.querySelector('#messegeMail');
    const inputPass = document.querySelector('#inputPass');
    const messegePass = document.querySelector('#messegePass');
    const inputRepit = document.querySelector('#inputRepit');
    const messageRepit = document.querySelector('#messageRepit');
    const inputDate = document.querySelector('#inputDate');
    const messageDate = document.querySelector('#messageDate');
    const btnPopoverOff = document.querySelector('#btn-popover-off');
    const btnPopoverOn = document.querySelector('#btn-popover-on');
    const popoverOK = document.querySelector('#id-popover-on');
    const popoverOFF = document.querySelector('#id-popover-off');



    inputName.addEventListener('input', ()=>{ validations.validName = validateInfo(inputName,messageName,regexLetters);});
    inputName.addEventListener('blur', ()=>{if(!validations.validName)addBad(inputName)});
    inputSurname.addEventListener('input', ()=>{validations.validSurname = validateInfo(inputSurname,messageSurnme,regexLetters);});
    inputSurname.addEventListener('blur', ()=>{ if(!validations.validSurname)addBad(inputSurname)});
    inputNickname.addEventListener('input',()=>{validations.validNickname = validateInfo(inputNickname,messageNickname,regexNumLet);});
    inputNickname.addEventListener('blur', ()=> {if(!validations.validNickname)addBad(inputNickname)});
    inputMail.addEventListener('input',()=>{validations.validMail = validateMail(inputMail,messegeMail,regexMail)});
    inputMail.addEventListener('blur',()=>{if(!validations.validMail)addBad(inputMail)});
    inputPass.addEventListener('input',()=>{validations.validPass = validatePass(inputPass, messegePass)});
    inputPass.addEventListener('blur',()=>{if(!validations.validPass)addBad(inputPass)});
    inputRepit.addEventListener('input', ()=>{ validations.validReplipass = validateRepitPass(inputRepit, messageRepit)});
    inputRepit.addEventListener('blur', ()=>{if(!validations.validReplipass)addBad(inputRepit)});

    inputDate.addEventListener('blur', ()=>{validations.validDate = validateDate(inputDate,messageDate)});

    registrerForm.addEventListener('submit', validateRegistrer);
    btnPopoverOn.addEventListener('click', ()=>{window.location.href = '../home.html';});
    btnPopoverOff.addEventListener('click', (event)=>{
                                            event.preventDefault();
                                            popoverOFF.hidePopover();});
    
    function validateRegistrer(event){
        event.preventDefault();
        if(validAll()){
            popoverOK.showPopover();
        }else{
            popoverOFF.showPopover();
        }
    }

    function validAll(){
      return Object.values(validations).every(element => element === true);
    }

    function validateDate(input,message){

        const inputDate = new Date(input.value);
        if(isNaN(inputDate)){
            createMessageBadDate(message);
            addBad(input);
            return false;
        }else{
            deleteMessageBad(message);
            removeBad(input);
            return true;
        }
   
    }


    function createMessageBadDate(message){
        deleteMessageBad(message);
        let span = document.createElement("span");
        span.textContent = "Fecha erronea, formato a ingresar YYYY-MM-DD";
        message.appendChild(span);
    }


    function validateRepitPass(input, message){
        if(passRepit === input.value){
            deleteMessageBad(message);
            removeBad(input);
            return false;
        }else{
            createMessagePassRepit(message);
            addBad(input);
            return true;
        }
    }

    function createMessagePassRepit (message){
        deleteMessageBad(message);
        let span = document.createElement("span");
        span.textContent = "Las contraseñas no condicen";
        message.appendChild(span);
    }


    function validatePass(input, message){
        const value = input.value;
        let errors = [];

        if (value.length < 8) {
            errors.push("La contraseña debe tener al menos 8 caracteres.");
        }
        if (!/[a-z]/.test(value)) {
            errors.push("La contraseña debe contener al menos una letra minúscula.");
        }
        if (!/[A-Z]/.test(value)) {
            errors.push("La contraseña debe contener al menos una letra mayúscula.");
        }
        if (!/\d/.test(value)) {
            errors.push("La contraseña debe contener al menos un número.");
        }
        if (!/[@$!%*?&]/.test(value)) {
            errors.push("La contraseña debe contener al menos un carácter especial.");
        }

        if(errors.length > 0){
            messagePassword (message, errors);
            addBad(input);
            return false;
        }else{
            deleteAllMessage(message);
            removeBad(input);
            passRepit = value;
            return true;
        }
    }


    function messagePassword (message, errors){
        deleteAllMessage(message);
        errors.forEach(element =>{
            let div = document.createElement("div");
            let span = document.createElement("span");
                                        span.textContent = element;
                                        div.appendChild(span);
                                        message.appendChild(div);});
    }

    function deleteAllMessage(message){
        while (message.firstChild) {
            message.removeChild(message.firstChild);
        }
    }

    function validateInfo(input, message, regex){
        const value = input.value;
        if(!regex.test(value)){
            createMessageBad(message, value[value.length - 1]);
            addBad(input);
            return false;
        }else {
            deleteMessageBad(message);
            removeBad(input);
            return true;
        }

    };

    function createMessageBad(message, value){
        deleteMessageBad(message);
        let span = document.createElement("span");
        span.textContent = "Ingrese Solo letras " + "Ingreso" + value;
        message.appendChild(span);
        }

    function deleteMessageBad(message){
        if(message.lastChild){
        message.removeChild(message.lastChild);
        }
    }

    function validateMail(input, message, regex){
        const value = input.value;
        if(!regex.test(value)){
            createMessageBadMail(message);
            addBad(input);
        }else if(!existMail(value)) {
            deleteMessageBad(message);
            removeBad(input);
            }else{   
                createMessageMailExist(message);
                addBad(input)}

    };

    function existMail(value){
        let exist = false;
        users.forEach(element => { 
            if(value.localeCompare(element.username, undefined, { sensitivity: 'base' }) === 0)
                {exist = true;}});
        return exist;
    }

    function createMessageMailExist(message){
        deleteMessageBad(message);
        let span = document.createElement("span");
        span.textContent = "El mail ya se encuentra registrado";
        message.appendChild(span);
    }

    function createMessageBadMail (message){
        deleteMessageBad(message);
        let span = document.createElement("span");
        span.textContent = "Formato de mail incorrecto";
        message.appendChild(span);
    }

    function addBad(input){
        input.classList.remove('border-ok-login');
        input.classList.add('border-bad-login');
    }

    function removeBad(input) {
        input.classList.remove('border-bad-login');
        input.classList.add('border-ok-login');
    }

    function removeClass(input){
        input.classList.remove('border-ok-login');
        input.classList.remove('border-bad-login');
    }

}