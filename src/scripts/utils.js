//Кнопки
const editProfileBtn = document.querySelector('.profile__edit');
const addCardBtn = document.querySelector('.profile__add-button');
const submitBtn = document.querySelector('.popup__submit');
//Инпуты
const nameInput = document.querySelector('#popup__field-name');
const descInput = document.querySelector('#popup__field-desc');
const placeName = document.querySelector('#popup-place__field-name');
const placeLink = document.querySelector('#popup-place__field-desc');

function submitLike(event) {
    event.target.classList.toggle('elements__like_liked');
}

function removeCard(event) {
    event.target.parentElement.remove();
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

const validationSettings = {
    form: '.popup__container',
    inputs: '.popup__field',
    submitBtn: '.popup__submit',
    inactiveBtn: '.popup__submit_disabled',
    inputErr: '.popup__input-error',
    errorClass: '.popup__input-error_visible'
};

export { submitLike, removeCard, initialCards, placeName, placeLink, validationSettings,
    editProfileBtn, addCardBtn, submitBtn, nameInput, descInput }
