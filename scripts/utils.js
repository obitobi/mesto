import {PopupWithImage} from "./PopupWithImage.js";

const cardsList = document.querySelector('.elements__list');
// const addCardModal = document.querySelector('#popup-place');
// const picNameInput = addCardModal.querySelector('#popup-place__field-name');
// const linkPicInput = addCardModal.querySelector('#popup-place__field-desc');

const picModal = new PopupWithImage('.pic-popup');
picModal.setEventListeners();

const handlerCardClick = (evt) => picModal.open(evt);


/*
function closingWithEsc(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_opened'));
    }
}
*/
//
// function closeModal(modalType) {
//     modalType.classList.remove('popup_opened');
//     // document.removeEventListener('keydown', closingWithEsc);
//     picNameInput.value = '';
//     linkPicInput.value = '';
// }
//
// function openModal(modalType) {
//     modalType.classList.add('popup_opened');
//     // document.addEventListener('keydown', closingWithEsc);
// }

function submitLike(event) {
    event.target.classList.toggle('elements__like_liked');
}

function removeCard(event) {
    event.target.parentElement.remove();
}

// function getPicInfo(event) {
//     picModalLink.src = event.target.src;
//     picModalDesc.textContent = event.target.parentElement.querySelector('.elements__pic-description').textContent;
// }

function renderCard(cardEl) {
    cardsList.prepend(cardEl);
}


export { submitLike, removeCard, renderCard, handlerCardClick }
