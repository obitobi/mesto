import {Popup} from "./Popup.js";

export class PopupWithSubmit extends Popup {

    constructor(selector) {
        super(selector);
    }

    setSubmitAction(submit) {
        this._submitHandler = submit;
    }

    close() {
        super.close();
        this._modal.removeEventListener('submit', this._submitHandler);
    }

    setEventListeners() {
        super.setEventListeners();
        this._modal.addEventListener('submit', this._submitHandler);
    }

}
