import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {

    constructor(selector, submit) {
        super(selector);
        this._handleFormSubmit = submit;
        this._fields = this._modal.querySelectorAll('.popup__field');
        this.submitButton = this._modal.querySelector('.popup__submit');
        this._formValues = {};
    }

    _getInputValues() {
        this._modal.querySelectorAll('.popup__field')
            .forEach((input) => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._modal.addEventListener('submit', (evt) => this._handleFormSubmit(evt, this._getInputValues()));
    }

    close() {
        super.close();
        this._fields.forEach(item => item.value = '');
    }
}
