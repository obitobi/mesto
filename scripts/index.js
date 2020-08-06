import './validate.js';

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

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

const picModal = document.querySelector('.pic-popup');
const picModalLink = document.querySelector('.pic-popup__main');
const picModalDesc = document.querySelector('.pic-popup__subtitle');
const closePicModal = document.querySelector('.pic-popup__cancel');


const editProfileBtn = document.querySelector('.profile__edit');
const profileModal = document.querySelector('.popup');
const closeProfileModal = document.querySelector('.popup__cancel');
const formProfile = document.querySelector('.popup__container');
const nameInput = document.querySelector('#popup__field-name');
const descInput = document.querySelector('#popup__field-desc');

const addCardBtn = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('#popup-place');
const submitBtn = addCardModal.querySelector('.popup__submit');
const closeCardModal = addCardModal.querySelector('.popup__cancel');
const formCard = addCardModal.querySelector('.popup__container');
const picNameInput = addCardModal.querySelector('#popup-place__field-name');
const linkPicInput = addCardModal.querySelector('#popup-place__field-desc');

const cardTemplate = document.querySelector('#elements__card').content;
const cardsList = document.querySelector('.elements__list');

function createCard(link, description) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.elements__pic').src = link;
    cardElement.querySelector('.elements__pic-description').textContent = description;
    cardElement.querySelector('.elements__like').addEventListener('click', submitLike);
    cardElement.querySelector('.elements__trash').addEventListener('click', removeCard);
    cardElement.querySelector('.elements__pic').addEventListener('click', function (event) {
        openModal(picModal);
        getPicInfo(event);
    });
    return cardElement;
}

function renderCard(cardEl) {
    cardsList.prepend(cardEl);
}

function openModal(modalType) {
    modalType.classList.add('popup_opened');
    document.addEventListener('keydown', evt => closingWithEsc(evt, modalType));
}

function closeModal(modalType) {
    modalType.classList.remove('popup_opened');
    document.removeEventListener('keydown', evt => closingWithEsc(evt, modalType));
}

function getProfileInfo() {
    profileName.textContent = nameInput.value;
    profileDesc.textContent = descInput.value;
}

function submitProfileInfo(event) {
    event.preventDefault();
    getProfileInfo();
    closeModal(profileModal);
}

function getPicInfo(event) {
    picModalLink.src = event.target.src;
    picModalDesc.textContent = event.target.parentElement.querySelector('.elements__pic-description').textContent;
}

function submitCard(event) {
    event.preventDefault();
    renderCard(createCard(linkPicInput.value, picNameInput.value));
    closeModal(addCardModal);
    picNameInput.value = '';
    linkPicInput.value = '';
    disableBtn(submitBtn);
}

//Простановка лайка
function submitLike(event) {
    event.target.classList.toggle('elements__like_liked');
}

function removeCard(event) {
    event.target.parentElement.remove();
}

function clickOnOverlay(event, modalType) {
    const evtClasses = event.target.classList;
    if (evtClasses.contains('popup') || evtClasses.contains('pic-popup')) {
        closeModal(modalType);
    }
}

function closingWithEsc(event, modalType) {
    if (event.key === 'Escape') {
        closeModal(modalType);
    }
}


editProfileBtn.addEventListener('click', function () {
    openModal(profileModal);
    nameInput.value = profileName.textContent;
    descInput.value = profileDesc.textContent;
});


closeProfileModal.addEventListener('click', function () {
    closeModal(profileModal);
});
formProfile.addEventListener('submit', submitProfileInfo);
profileModal.addEventListener('click', evt => clickOnOverlay(evt, profileModal));
addCardModal.addEventListener('click', evt => clickOnOverlay(evt, addCardModal));
picModal.addEventListener('click', evt => clickOnOverlay(evt, picModal));
addCardBtn.addEventListener('click', function () {
    openModal(addCardModal);
});
closeCardModal.addEventListener('click', function () {
    closeModal(addCardModal);
});
formCard.addEventListener('submit', submitCard);
closePicModal.addEventListener('click', function () {
    closeModal(picModal);
});

initialCards.forEach(function (item) {
    renderCard(createCard(item.link, item.name));
});
