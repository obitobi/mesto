import { renderCard, handlerCardClick, initialCards } from './utils.js';
import {Card} from './Card.js';
import {UserInfo} from './UserInfo.js';
import {PopupWithForm} from "./PopupWithForm.js";
import {Section} from "./Section.js";

const userSelectors = {
    name: '.profile__name',
    info: '.profile__description'
}

const userInfo = new UserInfo(userSelectors);
const editProfileModal = new PopupWithForm('.popup', submitProfileInfo);
const addCardModal = new PopupWithForm('#popup-place', submitCard);

const editProfileBtn = document.querySelector('.profile__edit');
const nameInput = document.querySelector('#popup__field-name');
const descInput = document.querySelector('#popup__field-desc');


const addCardBtn = document.querySelector('.profile__add-button');
const submitBtn = document.querySelector('.popup__submit');


function setProfileInfoInPopup({name, info}) {
    nameInput.value = name;
    descInput.value = info;
}

function submitProfileInfo(event) {
    event.preventDefault();
    userInfo.setUserInfo(nameInput.value, descInput.value);
    editProfileModal.close();
}

function disableBtn(btnEl) {
    btnEl.classList.add('popup__submit_disabled');
    btnEl.disabled = true;
}

function submitCard(event) {
    event.preventDefault();
    renderCard(new Card(
        addCardModal.getFirstFieldValue(),
        addCardModal.getSecondFieldValue(),
        '#elements__card',
        handlerCardClick).getCard());
    addCardModal.close();
    disableBtn(submitBtn);
}


editProfileModal.setEventListeners();
addCardModal.setEventListeners();
editProfileBtn.addEventListener('click', () => {
    editProfileModal.open();
    setProfileInfoInPopup(userInfo.getUserInfo());
});

addCardBtn.addEventListener('click', () => addCardModal.open());

const initialList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item.name, item.link, '#elements__card', handlerCardClick).getCard();
        initialList.addItem(card);
    }}, '.elements__list');
initialList.render();
