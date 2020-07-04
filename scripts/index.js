const modalWindow = document.querySelector(".popup");
const editProfileButton = document.querySelector(".profile__edit");
const cancelProfileButton = document.querySelector(".popup__cancel");
const nameValue = document.querySelector(".profile__name");
const descriptionValue = document.querySelector(".profile__description");

let formPopup = document.querySelector(".popup__container");
let nameInput = document.querySelectorAll(".popup__field")[0];
let descriptionInput = document.querySelectorAll(".popup__field")[1];

function onToggle() {
    if (modalWindow.classList.contains("popup_opened")) {
        modalWindow.classList.remove('popup_opened');
    } else {
        modalWindow.classList.add('popup_opened');
        nameInput.value = nameValue.textContent;
        descriptionInput.value = descriptionValue.textContent;
    }
}

function submitProfile(evt) {
    evt.preventDefault();
    nameValue.textContent = nameInput.value;
    descriptionValue.textContent = descriptionInput.value;
    modalWindow.classList.remove('popup_opened');
}

editProfileButton.addEventListener('click', onToggle);
cancelProfileButton.addEventListener('click', onToggle);
formPopup.addEventListener('submit', submitProfile);
