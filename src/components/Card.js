export class Card {

    constructor({name, link, likes}, isMine,  selector,
                {handlerCardClick, handlerCardDelete, handlerLikeClick, handlerDislike}) {
        this._cardName = name;
        this._cardLink = link;
        this._likes = likes.length;
        this._isMine = isMine;
        this._selector = selector;
        this._handlerCardClick = handlerCardClick;
        this._handlerCardDelete = handlerCardDelete;
        this._handlerLikeClick = handlerLikeClick;
        this._handlerDislike = handlerDislike;
    }

    setLiked(isLiked) {
        this._isLiked = isLiked;
    }

    getIsMine() {
        return this._isMine;
    }

    setLikes(evt, likes) {
        this._likes = likes;
        evt.target.parentElement.querySelector('.elements__likes').textContent = likes;
        this._likesToggleEventListeners(evt);
    }

    _likesToggleEventListeners(evt) {
        if (this._isLiked) {
            evt.target.removeEventListener('click', this._handlerLikeClick);
            evt.target.addEventListener('click', this._handlerDislike);
        } else {
            evt.target.removeEventListener('click', this._handlerDislike);
            evt.target.addEventListener('click', this._handlerLikeClick);
        }
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
        this._cardElement.querySelector('.elements__likes').textContent = this._likes;
        if (this._isLiked) {
            this._cardElement.querySelector('.elements__like').classList.add('elements__like_liked');
            this._setCustomCardListener(this._cardElement, '.elements__like', this._handlerDislike);
        } else {
            this._setCustomCardListener(this._cardElement, '.elements__like', this._handlerLikeClick);
        }
        if (this._isMine) {
            this._setCustomCardListener(this._cardElement, '.elements__trash', this._handlerCardDelete);
        } else {
            this._cardElement.querySelector('.elements__trash').style.display = 'none';
        }
        this._setCustomCardListener(this._cardElement, '.elements__pic', this._handlerCardClick);

        return this._cardElement;
    }
}
