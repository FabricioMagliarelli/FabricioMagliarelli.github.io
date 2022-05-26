const nameElement = document.querySelector("#name");
const emailElement = document.querySelector("#email");
const comentElement = document.querySelector("#coment");
const form = document.querySelector("#support-form");

//validacion nombre
const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = nameElement.value.trim();

    if (!isRequired(username)) {
        showError(nameElement, 'El campo "Nombre" no puede quedar en blanco.');
    } else if (!isBetween(username.length, min, max)) {
        showError(nameElement, `El nombre tiene que tener entre ${min} y ${max} caracteres.`)
    } else {
        showSuccess(nameElement);
        valid = true;
    }
    return valid;
};


//validacion mail
const checkEmail = () => {
    let valid = false;
    const email = emailElement.value.trim();
    if (!isRequired(email)) {
        showError(emailElement, 'El campo "Email" no puede quedar en blanco.');
    } else if (!isEmailValid(email)) {
        showError(emailElement, 'El Email no es valido.')
    } else {
        showSuccess(emailElement);
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

//validacion comentario
const checkComent = () => {

    let valid = false;

    const min = 1,
        max = 400;

    const coment = comentElement.value.trim();

    if (!isRequired(coment)) {
        showError(comentElement, 'El campo "Descripción" no puede quedar en blanco.');
    } else if (!isBetween(coment.length, min, max)) {
        showError(comentElement, `La descripción tiene que tener entre ${min} y ${max} caracteres.`)
    } else {
        showSuccess(comentElement);
        valid = true;
    }
    return valid;
};


const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate forms
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isComentValid = checkComent();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isComentValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        form.submit();
    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};
// 
form.addEventListener('input', function (e) {
    switch (e.target.id) {
        case 'name':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'coment':
            checkComent();
            break;

    }
});

