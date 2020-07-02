//Хотел узнать, не слишком ли это длинные названия переменных?
const openModalWindow = document.querySelector(".popup");
const editProfileButton = document.querySelector(".profile__edit");
const cancelProfileButton = document.querySelector(".popup__cancel");
const submitProfileButton = document.querySelector(".popup__submit");

let nameInput = document.querySelectorAll(".popup__field")[0];
let descriptionInput = document.querySelectorAll(".popup__field")[1];
openModalWindow.classList.remove('popup_opened');

editProfileButton.addEventListener('click', () => {
    openModalWindow.classList.add('popup_opened');
    nameInput.value = document.querySelector(".profile__name").textContent;
    descriptionInput.value = document.querySelector(".profile__description").textContent;
});

cancelProfileButton.addEventListener('click', () => {
    openModalWindow.classList.remove('popup_opened');
});

submitProfileButton.addEventListener('click', () => {
    document.querySelector(".profile__name").textContent = nameInput.value;
    document.querySelector(".profile__description").textContent = descriptionInput.value;
    openModalWindow.classList.remove('popup_opened');
});
