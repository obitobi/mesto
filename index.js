const openModalWindow = document.querySelector(".popup");
const editProfileButton = document.querySelector(".profile__edit");
const cancelProfileButton = document.querySelector(".popup__cancel");
const nameValue = document.querySelector(".profile__name");
const descriptionValue = document.querySelector(".profile__description");

let formPopup = document.querySelector(".popup__container");
let nameInput = document.querySelectorAll(".popup__field")[0];
let descriptionInput = document.querySelectorAll(".popup__field")[1];

function openModal() {
    openModalWindow.classList.add('popup_opened');
    nameInput.value = nameValue.textContent;
    descriptionInput.value = descriptionValue.textContent;
}

function closeModal() {
    openModalWindow.classList.remove('popup_opened');
}

function submitProfile(evt) {
    evt.preventDefault();
    nameValue.textContent = nameInput.value;
    descriptionValue.textContent = descriptionInput.value;
    openModalWindow.classList.remove('popup_opened');
}

editProfileButton.addEventListener('click', openModal);
cancelProfileButton.addEventListener('click', closeModal);
formPopup.addEventListener('submit', submitProfile);
