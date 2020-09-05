export class FormValidator {

    constructor(validationSettings, formElement) {
        this._validationSettings = validationSettings;
        this._formElement = formElement;
    }

    _setEventListener(formElement, validSettings) {
        const inputList = Array.from(formElement.querySelectorAll(validSettings.inputs));
        const buttonElement = formElement.querySelector(validSettings.submitBtn);
        this._toggleBtnState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(formElement, inputElement);
                this._toggleBtnState(inputList, buttonElement);
            });
        });
    }

    _isValid(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputErr(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputErr(formElement, inputElement);
        }
    }

    _toggleBtnState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            FormValidator.disableBtn(buttonElement);
        } else {
            buttonElement.classList.remove(this._validationSettings.inactiveBtn);
            buttonElement.disabled = false;
        }
    }

    _showInputErr(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._validationSettings.errorTypeField.slice(1));
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validationSettings.errorInputActive);
    }

    _hideInputErr(formElement, inputElement) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._validationSettings.errorTypeField.slice(1));
        errorElement.classList.remove(this._validationSettings.errorInputActive);
        errorElement.textContent = '';
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    static disableBtn(buttonElement) {
        /*
        Сделал через статический метод, поэтому и
        "захардкоженность" убрать не могу
        Чтобы вызвать этот метод мне нужно знать инстанс.
        А в этом проекте мы просто включаем валидацию для всех форм без разобора.
        */
        buttonElement.classList.add('popup__submit_disabled');
        buttonElement.disabled = true;
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => evt.preventDefault());
        this._setEventListener(this._formElement, this._validationSettings);
    }

}
