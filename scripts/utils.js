const picModalLink = document.querySelector('.pic-popup__main');
const picModalDesc = document.querySelector('.pic-popup__subtitle');
const picModal = document.querySelector('.pic-popup');
const cardsList = document.querySelector('.elements__list');
const addCardModal = document.querySelector('#popup-place');
const picNameInput = addCardModal.querySelector('#popup-place__field-name');
const linkPicInput = addCardModal.querySelector('#popup-place__field-desc');

function closeModal(modalType) {
    modalType.classList.remove('popup_opened');
    document.removeEventListener('keydown',function (evt) {
        closingWithEsc(evt, modalType);
    });
    picNameInput.value = '';
    linkPicInput.value = '';
}

function closingWithEsc(event, modalType) {
    if (event.key === 'Escape') {
        closeModal(modalType);
    }
}

function openModal(modalType) {
    modalType.classList.add('popup_opened');
    document.addEventListener('keydown', evt => closingWithEsc(evt, modalType));
}

function submitLike(event) {
    event.target.classList.toggle('elements__like_liked');
}

function removeCard(event) {
    event.target.parentElement.remove();
}

function getPicInfo(event) {
    picModalLink.src = event.target.src;
    picModalDesc.textContent = event.target.parentElement.querySelector('.elements__pic-description').textContent;
}

function renderCard(cardEl) {
    cardsList.prepend(cardEl);
}


export {openModal, submitLike, removeCard,
        getPicInfo, picModal, renderCard,
        addCardModal, closeModal, closingWithEsc,
        picNameInput, linkPicInput}
