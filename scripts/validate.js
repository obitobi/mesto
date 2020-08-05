const validationSettings = {
    form: '.popup__container',
    inputs: '.popup__field',
    submitBtn: '.popup__submit',
    inactiveBtn: '.popup__submit_disabled',
    inputErr: '.popup__input-error',
    errorClass: '.popup__input-error_visible'
};

function showInputErr(formEl, inputEl, errMessage) {
    const errEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add('popup__field_type_error');
    errEl.textContent = errMessage;
    errEl.classList.add('popup__input-error_active');
}

function hideInputErr(formEl, inputEl) {
    const errEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove('popup__field_type_error');
    errEl.classList.remove('popup__input-error_active');
    errEl.textContent = '';
}

function hasInvalidInput(inputList) {
    return inputList.some((i) => {
        return !i.validity.valid;
    });
}

function toggleBtnState(inputList, btnEl) {
    if(hasInvalidInput(inputList)) {
        btnEl.classList.add('popup__submit_disabled');
        btnEl.disabled = true;
    } else {
        btnEl.classList.remove('popup__submit_disabled');
        btnEl.disabled = false;
    }
}

function setEventListener(formEl) {
    const inputList = Array.from(formEl.querySelectorAll(validationSettings.inputs));
    const btnEl = formEl.querySelector(validationSettings.submitBtn);
    toggleBtnState(inputList, btnEl);
    inputList.forEach((i) => {
        i.addEventListener('input', () => {
            isValid(formEl, i);
            toggleBtnState(inputList, btnEl);
        });
    });
}

function enableValidation() {
    const formList = Array.from(document.querySelectorAll(validationSettings.form));
    formList.forEach((i) => {
        i.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListener(i);
    });
}

enableValidation();

function isValid(formEl, inputEl) {
    if (!inputEl.validity.valid) {
        showInputErr(formEl, inputEl, inputEl.validationMessage);
    } else {
        hideInputErr(formEl, inputEl);
    }
}