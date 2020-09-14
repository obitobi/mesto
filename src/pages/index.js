import {
    editProfileBtn,
    addCardBtn,
    nameInput,
    descInput,
    initialCards,
    validationSettings,
    url,
    token
} from '../utils/utils.js';
import {Card} from '../components/Card.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {Section} from "../components/Section.js";
import {FormValidator} from "../components/FormValidator.js";
import {Api} from "../components/Api.js";
import './index.css';

const userSelectors = {
    name: '.profile__name',
    info: '.profile__description'
}

const api = new Api({
    baseUrl: url,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
});

const userInfo = new UserInfo(userSelectors);
const editProfileModal = new PopupWithForm('.popup', submitProfileInfo);
const addCardModal = new PopupWithForm('#popup-place', submitCard);
const picModal = new PopupWithImage('.pic-popup');

api.getInitialCards().then((cards) => {
    const initialList = new Section({
        items: cards,
        renderer: (item) => {
            const card = createCard(item.name, item.link, item.likes.length, '#elements__card');
            initialList.addItem(card);
        }
    }, '.elements__list');
    return initialList;
}).then((cards) => cards.render());


function createCard(name, link, likes, selector) {
    return new Card(name, link, likes, selector, function () {
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
    api.updateProfileInfo(nameField, descriptionField)
        .then((data) => userInfo.setUserInfo(data.name, data.about));
    editProfileModal.close();
}

const formRender = new Section({
    items: [],
    renderer: {}
}, '.elements__list');

function submitCard(event, {nameField, descriptionField}) {
    event.preventDefault();
    api.addNewCard(nameField, descriptionField).then((card) => {
        formRender.addItem(createCard(card.name, card.link, card.likes.length, '#elements__card'));
    });
    FormValidator.disableBtn(addCardModal.submitButton);
    addCardModal.close();
}

//Включение валидации
Array.from(document.querySelectorAll(validationSettings.form))
    .forEach((item) => {
        new FormValidator(validationSettings, item).enableValidation();
    });

// initialList.render();

editProfileModal.setEventListeners();
addCardModal.setEventListeners();
picModal.setEventListeners();

editProfileBtn.addEventListener('click', () => {
    editProfileModal.open();
    setProfileInfoInPopup(userInfo.getUserInfo());
});

addCardBtn.addEventListener('click', () => addCardModal.open());

api.getProfileInfo().then((data) => {
    userInfo.setUserInfo(data.name, data.about);
})
