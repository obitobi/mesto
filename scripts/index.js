import { submitLike, removeCard, renderCard, handlerCardClick } from './utils.js';
import {Card} from './Card.js';
import {UserInfo} from './UserInfo.js';
import {PopupWithForm} from "./PopupWithForm.js";

const userSelectors = {
    name: '.profile__name',
    info: '.profile__description'
}

const userInfo = new UserInfo(userSelectors);
const editProfileModal = new PopupWithForm('.popup', submitProfileInfo);
editProfileModal.setEventListeners();
const addCardModal = new PopupWithForm('#popup-place', submitCard);
addCardModal.setEventListeners();

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

function clickOnOverlay(event) {
    const evtClasses = event.target.classList;
    if (evtClasses.contains('popup') || evtClasses.contains('pic-popup')) {
        this.close();
    }
}

editProfileBtn.addEventListener('click', () => {
    editProfileModal.open();
    setProfileInfoInPopup(userInfo.getUserInfo());
});

// addCardModal.addEventListener('click', (evt) => clickOnOverlay(evt));
addCardBtn.addEventListener('click', () => addCardModal.open());
// closeCardModal.addEventListener('click', () => { closeModal(addCardModal) });
// formCard.addEventListener('submit', submitCard);
