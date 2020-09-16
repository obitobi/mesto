import {
    editProfileBtn,
    addCardBtn,
    nameInput,
    descInput,
    initialCards,
    editProfileAvatarBtn,
    validationSettings,
    url,
    avatarInput,
    token,
    avatarLink
} from '../utils/utils.js';
import {Card} from '../components/Card.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {Section} from "../components/Section.js";
import {FormValidator} from "../components/FormValidator.js";
import {Api} from "../components/Api.js";
import {PopupWithSubmit} from "../components/PopupWithSubmit.js";
import './index.css';


const userSelectors = {
    name: '.profile__name',
    info: '.profile__description',
    avatar: '.profile__avatar'
}

const api = new Api({
    baseUrl: url,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
});

//Modals
const userInfo = new UserInfo(userSelectors);
const editProfileModal = new PopupWithForm('.popup', submitProfileInfo);
const addCardModal = new PopupWithForm('#popup-place', submitCard);
const picModal = new PopupWithImage('.pic-popup');
const submitModal = new PopupWithSubmit('#confirm-popup');
const avatarModal = new PopupWithForm('#update-avatar-popup', submitAvatar);

//Getting initialCards
api.getInitialCards().then((cards) => {
    const initialList = new Section({
        items: cards,
        renderer: (item) => {
            const card = createCard(item,'#elements__card');
            initialList.addItem(card);
        }
    }, '.elements__list');
    return initialList;
}).then((cards) => cards.render())
    .catch((rej) => console.log(rej));

function createCard(data, selector) {
    //Нужно для случая создания карточки
    let isMine = true;
    isMine = data.owner._id === userInfo.id;
    let isLiked = false;
    data.likes.forEach((item) => {
        if (item._id === userInfo.id) {
            isLiked = true;
        }
    });
    const card = new Card(data, isMine, selector,
        {
            handlerCardClick: function() {
                return handlerCardClick(data.name, data.link);
            },
            handlerCardDelete: (evt) => {
                submitModal.setSubmitAction((event) => {
                    event.preventDefault();
                    api.deleteCard(data._id)
                        .then((res) => {
                            card.removeCard(evt);
                            console.log('Card was removed with status: '+ res.status);
                        })
                        .catch((rej) => console.log(rej));
                    submitModal.close();
                    });
                handlerTrashClick();
            },
            handlerLikeClick: (evt) => {
                card.submitLike(evt);
                api.like(data._id).then(res => {
                    card.setLiked(true);
                    card.setLikes(evt, res.likes.length);
                    console.log('Liked');
                }).catch((rej) => console.log(rej));
            },
            handlerDislike: (evt) => {
                card.submitLike(evt);
                api.removeLike(data._id).then(res => {
                    card.setLiked(false);
                    card.setLikes(evt, res.likes.length)
                    console.log('Disliked');
                }).catch((rej) => console.log(rej));
        }
        }
    );
    card.setLiked(isLiked);
    return card.getCard();
}

function handlerCardClick(name, link) {
    picModal.open(name, link);
}

function handlerTrashClick() {
    submitModal.setEventListeners();
    submitModal.open();
}

function setProfileInfoInPopup({name, info}) {
    nameInput.value = name;
    descInput.value = info;
}

function setAvatarLinkInPopup(link) {
    avatarInput.value = link;
}

function submitProfileInfo(event, {nameField, descriptionField}) {
    event.preventDefault();
    const submitBtn = event.target.querySelector('.popup__submit');
    renderLoading(true, submitBtn);
    api.updateProfileInfo(nameField, descriptionField)
        .then((data) => userInfo.setUserInfo(data.name, data.about))
        .catch((rej) => console.log(rej))
        .finally(() => renderLoading(false, submitBtn));
    editProfileModal.close();
}

function submitAvatar(event, {descriptionField}) {
    event.preventDefault();
    const submitBtn = event.target.querySelector('.popup__submit');
    renderLoading(true, submitBtn);
    api.updateProfileAvatar(descriptionField)
        .then((data) => {
            userInfo.setAvatar(data.avatar);
        })
        .catch((rej) => console.log(rej))
        .finally(() => renderLoading(false, submitBtn));
    avatarModal.close();
}

const formRender = new Section({
    items: [],
    renderer: {}
}, '.elements__list');

function submitCard(event, {nameField, descriptionField}) {
    event.preventDefault();
    renderLoading(true, addCardModal.submitButton);
    api.addNewCard(nameField, descriptionField).then((card) => {
        formRender.addItem(createCard(card, '#elements__card'));
    }).finally(() => renderLoading(false, addCardModal.submitButton));
    FormValidator.disableBtn(addCardModal.submitButton);
    addCardModal.close();
}

function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = 'Сохранение...';
    } else {
        button.textContent = 'Сохранить';
    }
}

//Включение валидации
Array.from(document.querySelectorAll(validationSettings.form))
    .forEach((item) => {
        new FormValidator(validationSettings, item).enableValidation();
    });


editProfileModal.setEventListeners();
addCardModal.setEventListeners();
picModal.setEventListeners();
avatarModal.setEventListeners();

editProfileBtn.addEventListener('click', () => {
    editProfileModal.open();
    setProfileInfoInPopup(userInfo.getUserInfo());
});
editProfileAvatarBtn.addEventListener('click', () => {
    avatarModal.open();
    setAvatarLinkInPopup(avatarLink.src);
});
addCardBtn.addEventListener('click', () => addCardModal.open());

api.getProfileInfo().then((data) => {
    userInfo.setUserInfo(data.name, data.about, data._id);
    userInfo.setAvatar(data.avatar);
})
