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

const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");

const picModal = document.querySelector(".pic-popup");
const picModalLink = document.querySelector(".pic-popup__main");
const picModalDesc = document.querySelector(".pic-popup__subtitle");
const cancelPicModal = document.querySelector(".pic-popup__cancel");

const editProfileBtn = document.querySelector(".profile__edit");
const profileModal = document.querySelector(".popup");
const closeProfileModal = document.querySelector(".popup__cancel");
const formProfile = document.querySelector(".popup__container");
let nameInput = document.querySelector("#popup__field-name");
let descInput = document.querySelector("#popup__field-desc");

const addCardBtn = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector(".popup-place");
const closeCardModal = document.querySelector(".popup-place__cancel");
const formCard = document.querySelector(".popup-place__container");
let picNameInput = document.querySelector("#popup-place__field-name");
let linkPicInput = document.querySelector("#popup-place__field-desc");

function createCard(link, description) {
    const cardTemplate = document.querySelector("#elements__card").content;
    const cardsList = document.querySelector('.elements__list');
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.elements__pic').src = link;
    cardElement.querySelector('.elements__pic-description').textContent = description;
    cardElement.querySelector(".elements__like").addEventListener('click', submitLike);
    cardElement.querySelector(".elements__trash").addEventListener('click', removeCard);
    cardElement.querySelector(".elements__pic").addEventListener('click', togglePicModal);
    cardsList.prepend(cardElement);
}

function toggleProfileModal() {
    if (profileModal.classList.contains("popup_opened")) {
        profileModal.classList.remove("popup_opened");
    } else {
        profileModal.classList.add("popup_opened");
        nameInput.value = profileName.textContent;
        descInput.value = profileDesc.textContent;
    }
}

function toggleCardModal() {
    if (addCardModal.classList.contains("popup-place_opened")) {
        addCardModal.classList.remove("popup-place_opened");
    } else {
        addCardModal.classList.add("popup-place_opened");
    }
}

function togglePicModal(event) {
    if (picModal.classList.contains("pic-popup_opened")) {
        picModal.classList.remove("pic-popup_opened");
    } else {
        picModal.classList.add("pic-popup_opened");
        picModalLink.src = event.target.src;
        picModalDesc.textContent = event.target.parentElement.querySelector(".elements__pic-description").textContent;
    }
}

function submitProfileInfo(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDesc.textContent = descInput.value;
    profileModal.classList.remove('popup_opened');
}

function submitCard(event) {
    event.preventDefault();
    createCard(linkPicInput.value, picNameInput.value);
    toggleCardModal();
    picNameInput.value = "";
    linkPicInput.value = "";
}

//Простановка лайка
function submitLike(event) {
    const likeClass = event.target.classList;
    if (likeClass.contains("elements__like_liked")) {
        likeClass.remove("elements__like_liked")
    } else {
        likeClass.add("elements__like_liked");
    }
}

function removeCard(event) {
    event.target.parentElement.remove();
}

editProfileBtn.addEventListener('click', toggleProfileModal);
closeProfileModal.addEventListener('click', toggleProfileModal);
formProfile.addEventListener('submit', submitProfileInfo);

addCardBtn.addEventListener('click', toggleCardModal);
closeCardModal.addEventListener('click', toggleCardModal);
formCard.addEventListener('submit', submitCard);

cancelPicModal.addEventListener('click', togglePicModal);

initialCards.forEach(function (item) {
    createCard(item.link, item.name);
});
