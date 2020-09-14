import {Popup} from "./Popup.js";

class PopupWithSubmit extends Popup {

    constructor(selector, submit) {
        super(selector);
        this._submitHandler = submit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._modal.addEventListener('submit', this._submitHandler);
    }
}
