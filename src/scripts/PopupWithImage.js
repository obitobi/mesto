import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {

    constructor(selector) {
        super(selector);
    }

    open(evt) {
        this._modal.querySelector('.pic-popup__main').src = evt.target.src;
        this._modal.querySelector('.pic-popup__subtitle').textContent =
            evt.target.parentElement.querySelector('.elements__pic-description').textContent;
        super.open();
    }
}
