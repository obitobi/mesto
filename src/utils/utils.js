//Кнопки
const editProfileBtn = document.querySelector('.profile__edit');
const editProfileAvatarBtn = document.querySelector('.profile__container');
const addCardBtn = document.querySelector('.profile__add-button');
//Инпуты
const nameInput = document.querySelector('#popup__field-name');
const descInput = document.querySelector('#popup__field-desc');
const avatarInput = document.querySelector('#update-avatar-popup__pic-link');
const avatarLink = document.querySelector('.profile__avatar');

const url = 'https://mesto.nomoreparties.co/v1/cohort-15';
const token = '49a75c0f-916c-427e-bed4-87859e997b2f';

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
    inactiveBtn: 'popup__submit_disabled',
    inputErr: '.popup__input-error',
    errorClass: '.popup__input-error_visible',
    errorTypeField: '.popup__field_type_error',
    errorInputActive: 'popup__input-error_active'
};


export { initialCards, validationSettings, editProfileBtn, avatarInput,
    addCardBtn, nameInput, descInput, url, token, editProfileAvatarBtn, avatarLink }
