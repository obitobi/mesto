import  { removeCard, submitLike } from './utils.js';

export class Card {

    constructor(name, link, selector, handlerCardClick) {
        this._cardName = name;
        this._cardLink = link;
        this._selector = selector;
        this._handlerCardClick = handlerCardClick;
    }

    _getCardTemplate() {
        const cardTemplate = document.querySelector(this._selector).content;
        return cardTemplate.cloneNode(true);
    }

    _setSubmitLikeListener(cardEl, selector) {
        cardEl.querySelector(selector).addEventListener('click', submitLike);
    }

    _setRemoveCardListener(cardEl, selector) {
        cardEl.querySelector(selector).addEventListener('click', removeCard);
    }

    _setToggleCardListener(cardEl, selector) {
        cardEl.querySelector(selector).addEventListener('click',this._handlerCardClick);
    }

    getCard() {
        this._cardElement = this._getCardTemplate();
        this._cardElement.querySelector('.elements__pic').src = this._cardLink;
        this._cardElement.querySelector('.elements__pic').alt = this._cardName;
        this._cardElement.querySelector('.elements__pic-description').textContent = this._cardName;
        this._setSubmitLikeListener(this._cardElement, '.elements__like');
        this._setRemoveCardListener(this._cardElement, '.elements__trash');
        this._setToggleCardListener(this._cardElement, '.elements__pic');
        return this._cardElement;
    }
}
