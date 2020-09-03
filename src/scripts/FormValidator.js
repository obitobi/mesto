export class FormValidator {
    constructor(validationSettings, formElement) {
        this._validationSettings = validationSettings;
        this._formElement = formElement;
    }

    _setEventListener(formEl, validSettings) {
        const inputList = Array.from(formEl.querySelectorAll(validSettings.inputs));
        const btnEl = formEl.querySelector(validSettings.submitBtn);
        this._toggleBtnState(inputList, btnEl);
        inputList.forEach((i) => {
            i.addEventListener('input', () => {
                this._isValid(formEl, i);
                this._toggleBtnState(inputList, btnEl);
            });
        });
    }

    _isValid(formEl, inputEl) {
        if (!inputEl.validity.valid) {
            this._showInputErr(formEl, inputEl, inputEl.validationMessage);
        } else {
            this._hideInputErr(formEl, inputEl);
        }
    }

    _toggleBtnState(inputList, btnEl) {
        if (this._hasInvalidInput(inputList)) {
            this._disableBtn(btnEl);
        } else {
            btnEl.classList.remove('popup__submit_disabled');
            btnEl.disabled = false;
        }
    }

    _showInputErr(formEl, inputEl, errMessage) {
        const errEl = formEl.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.add('popup__field_type_error');
        errEl.textContent = errMessage;
        errEl.classList.add('popup__input-error_active');
    }

    _hideInputErr(formEl, inputEl) {
        const errEl = formEl.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove('popup__field_type_error');
        errEl.classList.remove('popup__input-error_active');
        errEl.textContent = '';
    }

    _hasInvalidInput(inputList) {
        return inputList.some((i) => {
            return !i.validity.valid;
        });
    }

    _disableBtn(btnEl) {
        btnEl.classList.add('popup__submit_disabled');
        btnEl.disabled = true;
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => evt.preventDefault());
        this._setEventListener(this._formElement, this._validationSettings);
    }

}
