import {PopupWithImage} from "./PopupWithImage.js";

const placeName = document.querySelector('#popup-place__field-name');
const placeLink = document.querySelector('#popup-place__field-desc');

const picModal = new PopupWithImage('.pic-popup');
picModal.setEventListeners();

const handlerCardClick = (evt) => picModal.open(evt);

function submitLike(event) {
    event.target.classList.toggle('elements__like_liked');
}

function removeCard(event) {
    event.target.parentElement.remove();
}

function renderCard(container, cardEl) {
    container.prepend(cardEl);
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


export { submitLike, removeCard, renderCard, handlerCardClick, initialCards, placeName,
    placeLink }
