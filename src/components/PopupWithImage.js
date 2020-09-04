import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {

    constructor(selector) {
        super(selector);
        this._picLink = this._modal.querySelector('.pic-popup__main');
        this._picDescription = this._modal.querySelector('.pic-popup__subtitle');
    }

    open(name, link) {
        this._picLink.src = link;
        this._picDescription.textContent = name;
        super.open();
    }
}
