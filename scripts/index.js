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

const cardTemplate = document.querySelector("#elements__card").content;
const cardsList = document.querySelector('.elements__list');
initialCards.forEach(function (item) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.elements__pic').src = item.link;
    cardElement.querySelector('.elements__pic-description').textContent = item.name;
    cardElement.querySelector(".elements__like").addEventListener('click', submitLike);
    cardElement.querySelector(".elements__trash").addEventListener('click', onToggle);
    cardElement.querySelector(".elements__pic").addEventListener('click', picPopup);
    cardsList.append(cardElement);
})

const body = document.querySelector(".root");
const modalTempl = document.querySelector("#popup").content;
const modalTemplPic = document.querySelector("#pic-popup").content;
const editProfile = document.querySelector(".profile__edit");
const addImgBtn = document.querySelector(".profile__add-button");

let name = document.querySelector(".profile__name");
let descript = document.querySelector(".profile__description");

//Обработчик попапа при нажатии на фотографию
function picPopup(event) {
    if (event.target.classList.contains("elements__pic")) {
        const picTempl = modalTemplPic.cloneNode(true);
        picTempl.querySelector(".pic-popup__main").src = event.target.src;
        picTempl.querySelector(".pic-popup__subtitle").textContent = event.target.parentElement.querySelector(".elements__pic-description").textContent;
        picTempl.querySelector(".pic-popup__cancel").addEventListener('click', picPopup);
        body.append(picTempl);
    } else {
        body.querySelector(".pic-popup").animate([
            {opacity: 1},
            {opacity: 0}], {duration: 300});
        setTimeout(function () {
            body.querySelector(".pic-popup").remove();
        }, 300);
    }
}

function onToggle(event) {
    console.log(event.target);
    if (event.target.classList.contains("profile__edit")) {
        const editTempl = modalTempl.cloneNode(true);
        editTempl.querySelector(".popup__title").textContent = "Редактировать профиль";
        editTempl.querySelectorAll(".popup__field")[0].placeholder = "Введите имя";
        editTempl.querySelectorAll(".popup__field")[1].placeholder = "Введите описание";
        editTempl.querySelectorAll(".popup__field")[0].value = name.textContent;
        editTempl.querySelectorAll(".popup__field")[1].value = descript.textContent;
        editTempl.querySelector(".popup__submit").textContent = "Сохранить";
        editTempl.querySelector(".popup__cancel").addEventListener('click', onToggle);
        editTempl.querySelector(".popup__container").addEventListener('submit', submitProfile);
        body.append(editTempl);
    } else if (event.target.classList.contains("elements__trash")) {
        event.target.parentElement.remove();
    } else {
        if (null == document.querySelector('.popup_opened')) {
            const addImg = modalTempl.cloneNode(true);
            addImg.querySelector(".popup__title").textContent = "Новое место";
            addImg.querySelectorAll(".popup__field")[0].placeholder = "Название";
            addImg.querySelectorAll(".popup__field")[1].placeholder = "Ссылка на картинку";
            addImg.querySelector(".popup__submit").textContent = "Создать";
            addImg.querySelector(".popup__cancel").addEventListener('click', onToggle);
            addImg.querySelector(".popup__container").addEventListener('submit', submitImg);
            body.append(addImg);
        } else {
            body.querySelector(".popup").animate([
                {opacity: 1},
                {opacity: 0}], {duration: 300});
            setTimeout(function () {
                body.querySelector(".popup").remove();
            }, 300);
        }
    }
}

//Редактирование профиля (имя, описание)
function submitProfile(event) {
    event.preventDefault();
    name.textContent = document.querySelectorAll(".popup__field")[0].value;
    descript.textContent = document.querySelectorAll(".popup__field")[1].value;
    body.querySelector(".popup").remove();
}

//Добавление новой карточки
function submitImg(event) {
    event.preventDefault();
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.elements__pic').src = document.querySelectorAll(".popup__field")[1].value;
    cardElement.querySelector('.elements__pic-description').textContent = document.querySelectorAll(".popup__field")[0].value;
    cardElement.querySelector(".elements__like").addEventListener('click', submitLike);
    cardElement.querySelector(".elements__trash").addEventListener('click', onToggle);
    cardElement.querySelector(".elements__pic").addEventListener('click', picPopup);
    cardsList.prepend(cardElement);
    body.querySelector(".popup").remove();
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

//Обработчики кликов на кнопки редактирования профиля и добавления карточки
editProfile.addEventListener('click', onToggle);
addImgBtn.addEventListener('click', onToggle);
