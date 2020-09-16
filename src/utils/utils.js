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


export { validationSettings, editProfileBtn, avatarInput,
    addCardBtn, nameInput, descInput, url, token, editProfileAvatarBtn, avatarLink }
