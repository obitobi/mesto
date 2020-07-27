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
        toggleModal(picModal);
        getPicInfo(event);
    });
    return cardElement;
}

function renderCard(cardEl) {
    cardsList.prepend(cardEl);
}

function toggleModal(modalType) {
    modalType.classList.toggle('popup_opened');
}

function getProfileInfo() {
    profileName.textContent = nameInput.value;
    profileDesc.textContent = descInput.value;
}

function submitProfileInfo(event) {
    event.preventDefault();
    getProfileInfo();
    toggleModal(profileModal);
}

function getPicInfo(event) {
    picModalLink.src = event.target.src;
    picModalDesc.textContent = event.target.parentElement.querySelector('.elements__pic-description').textContent;
}

function submitCard(event) {
    event.preventDefault();
    renderCard(createCard(linkPicInput.value, picNameInput.value));
    toggleModal(addCardModal);
    picNameInput.value = '';
    linkPicInput.value = '';
}

//Простановка лайка
function submitLike(event) {
    event.target.classList.toggle('elements__like_liked');
}

function removeCard(event) {
    event.target.parentElement.remove();
}

editProfileBtn.addEventListener('click', function () {
    toggleModal(profileModal);
    nameInput.value = profileName.textContent;
    descInput.value = profileDesc.textContent;
});
closeProfileModal.addEventListener('click', function () {
    toggleModal(profileModal);
});
formProfile.addEventListener('submit', submitProfileInfo);
addCardBtn.addEventListener('click', function () {
    toggleModal(addCardModal);
});
closeCardModal.addEventListener('click', function () {
    toggleModal(addCardModal);
});
formCard.addEventListener('submit', submitCard);
closePicModal.addEventListener('click', function () {
    toggleModal(picModal);
});

initialCards.forEach(function (item) {
    renderCard(createCard(item.link, item.name));
});
