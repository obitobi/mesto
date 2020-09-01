import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {

    constructor(selector, submit) {
        super(selector);
        this._submit = submit;
    }

    _getInputValues() {
        return this._modal.querySelectorAll('.popup__field');
    }

    getFirstFieldValue() {
        return this._modal.querySelector('#popup-place__field-name').value;
    }

    getSecondFieldValue() {
        return this._modal.querySelector('#popup-place__field-desc').value;
    }

    setEventListeners() {
        super.setEventListeners();
        this._modal.addEventListener('submit', this._submit);
    }

    close() {
        super.close();
        this._getInputValues().forEach(item => item.value = '');
    }

}
