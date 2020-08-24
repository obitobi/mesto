import  {openModal, removeCard, submitLike, getPicInfo, picModal, renderCard} from './utils.js';

export class Card {

    constructor(name, link, selector) {
        this._cardName = name;
        this._cardLink = link;
        this._selector = selector;
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
        cardEl.querySelector(selector).addEventListener('click',(event) => {
            openModal(picModal);
            getPicInfo(event);
        });
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

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach((i) => {
    renderCard(new Card(i.name, i.link, '#elements__card').getCard());
});
