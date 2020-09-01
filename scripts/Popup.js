export class Popup {
    constructor(selector) {
        this._modal = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._modal.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
    }

    close() {
        this._modal.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._modal.querySelector('.popup__cancel')
            .addEventListener('click', () => this.close())
    }
}
