import {renderCard, openModal, picModal, addCardModal, closeModal, picNameInput, linkPicInput} from './utils.js';
import {Card} from './Card.js';

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const closePicModal = document.querySelector('.pic-popup__cancel');

const editProfileBtn = document.querySelector('.profile__edit');
const profileModal = document.querySelector('.popup');
const closeProfileModal = document.querySelector('.popup__cancel');
const formProfile = document.querySelector('.popup__container');
const nameInput = document.querySelector('#popup__field-name');
const descInput = document.querySelector('#popup__field-desc');

const addCardBtn = document.querySelector('.profile__add-button');
const submitBtn = addCardModal.querySelector('.popup__submit');
const closeCardModal = addCardModal.querySelector('.popup__cancel');
const formCard = addCardModal.querySelector('.popup__container');


function getProfileInfo() {
    profileName.textContent = nameInput.value;
    profileDesc.textContent = descInput.value;
}

function submitProfileInfo(event) {
    event.preventDefault();
    getProfileInfo();
    closeModal(profileModal);
}

function disableBtn(btnEl) {
    btnEl.classList.add('popup__submit_disabled');
    btnEl.disabled = true;
}

function submitCard(event) {
    event.preventDefault();
    renderCard(new Card(picNameInput.value, linkPicInput.value, '#elements__card').getCard());
    closeModal(addCardModal);
    picNameInput.value = '';
    linkPicInput.value = '';
    disableBtn(submitBtn);
}

function clickOnOverlay(event, modalType) {
    const evtClasses = event.target.classList;
    if (evtClasses.contains('popup') || evtClasses.contains('pic-popup')) {
        closeModal(modalType);
    }
}

editProfileBtn.addEventListener('click', () => {
    openModal(profileModal);
    nameInput.value = profileName.textContent;
    descInput.value = profileDesc.textContent;
});

closeProfileModal.addEventListener('click', () => { closeModal(profileModal) });

formProfile.addEventListener('submit', submitProfileInfo);
profileModal.addEventListener('click', (evt) => clickOnOverlay(evt, profileModal));
addCardModal.addEventListener('click', (evt) => clickOnOverlay(evt, addCardModal));
picModal.addEventListener('click', (evt) => clickOnOverlay(evt, picModal));
addCardBtn.addEventListener('click', () => { openModal(addCardModal) });
closeCardModal.addEventListener('click', () => { closeModal(addCardModal) });
formCard.addEventListener('submit', submitCard);
closePicModal.addEventListener('click', () => { closeModal(picModal) });
