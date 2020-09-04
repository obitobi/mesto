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

    _setCustomCardListener(cardEl, selector, handler) {
        cardEl.querySelector(selector).addEventListener('click', handler);
    }

    submitLike(event) {
        event.target.classList.toggle('elements__like_liked');
    }

    removeCard(event) {
        event.target.parentElement.remove();
    }

    getCard() {
        this._cardElement = this._getCardTemplate();
        const picture = this._cardElement.querySelector('.elements__pic');
        picture.src = this._cardLink;
        picture.alt = this._cardName;
        this._cardElement.querySelector('.elements__pic-description').textContent = this._cardName;
        this._setCustomCardListener(this._cardElement, '.elements__like', this.submitLike);
        this._setCustomCardListener(this._cardElement, '.elements__trash', this.removeCard);
        this._setCustomCardListener(this._cardElement, '.elements__pic', this._handlerCardClick);

        return this._cardElement;
    }
}
