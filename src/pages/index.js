import { editProfileBtn, addCardBtn, nameInput, descInput, initialCards, validationSettings} from '../utils/utils.js';
import {Card} from '../components/Card.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {Section} from "../components/Section.js";
import {FormValidator} from "../components/FormValidator.js";
import './index.css';

const userSelectors = {
    name: '.profile__name',
    info: '.profile__description'
}
//Спасибо за такое тщательное ревью, многое осознал
//например: объявления дом-элемента в конструкторе, чтобы не искать его каждый раз
//Создание объектов
const userInfo = new UserInfo(userSelectors);
const editProfileModal = new PopupWithForm('.popup', submitProfileInfo);
const addCardModal = new PopupWithForm('#popup-place', submitCard);
const picModal = new PopupWithImage('.pic-popup');

const initialList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createCard(item.name, item.link, '#elements__card');
        initialList.addItem(card);
    }
}, '.elements__list');

function createCard(name, link, selector) {
    return new Card(name, link, selector,function () {
            return handlerCardClick(name, link);
        }).getCard();
}

function handlerCardClick(name, link) {
    picModal.open(name, link);
}

function setProfileInfoInPopup({name, info}) {
    nameInput.value = name;
    descInput.value = info;
}

function submitProfileInfo(event, {nameField, descriptionField}) {
    event.preventDefault();
    userInfo.setUserInfo(nameField, descriptionField);
    editProfileModal.close();
}

const formRender = new Section({
    items: [],
    renderer: {}
}, '.elements__list');

function submitCard(event, {nameField, descriptionField}) {
    event.preventDefault();
    formRender.addItem(createCard(nameField, descriptionField, '#elements__card'));
    FormValidator.disableBtn(addCardModal.submitButton);
    addCardModal.close();
}

//Включение валидации
Array.from(document.querySelectorAll(validationSettings.form))
    .forEach((item) => {
        new FormValidator(validationSettings, item).enableValidation();
    });

initialList.render();

editProfileModal.setEventListeners();
addCardModal.setEventListeners();
picModal.setEventListeners();

editProfileBtn.addEventListener('click', () => {
    editProfileModal.open();
    setProfileInfoInPopup(userInfo.getUserInfo());
});

addCardBtn.addEventListener('click', () => addCardModal.open());

