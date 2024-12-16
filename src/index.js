import "./pages/index.css";
import {createCard, deleteCard, likeCard,} from "./components/card.js";
import {closePopup, openPopup} from "./components/popup";
import {getProfile, initProfile} from "./components/profile";
import {clearValidation, enableValidation, toggleButtonState} from "./components/validation";
import {
    createCardAPI,
    deleteCardAPI,
    dislikeCardAPI,
    editProfileAPI,
    editProfileAvatarAPI,
    getInitialCardsAPI,
    getInitProfileAPI,
    likeCardAPI
} from "./components/api";
import {validationConfig as config, validationConfig} from "./components/constans";

const btnTextProcessSave = "Сохранение..."

const cards = document.querySelector(".places__list");
const newCardBtn = document.querySelector(".profile__add-button");
const editProfileBtn = document.querySelector(".profile__edit-button");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupEditProfileImage = document.querySelector(".popup_type_edit-image");
const popupEditProfileImageForm = document.forms["edit-image"];
const popupEditProfileForm = document.forms["edit-profile"];

const popupNewCard = document.querySelector(".popup_type_new-card ");
const popupAddCardForm = document.forms["new-place"];

const popupCardImage = document.querySelector(".popup_type_image");
const popupImg = popupCardImage.querySelector(".popup__image");
const popupDescription = popupCardImage.querySelector(".popup__caption");

const profileImage = document.querySelector(".profile__image");

const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});


const deleteCardCallback = (event, cardID) => {
    deleteCardAPI(cardID)
        .then(() => deleteCard(event))
        .catch(console.error);
}

const likeCardCallback = (event, cardID, isLiked) => {
    if (isLiked) {
        dislikeCardAPI(cardID)
            .then((json) => {
                likeCard(event, json.likes.length);
            })
            .catch(console.error);

    } else {
        likeCardAPI(cardID)
            .then((json) => {
                likeCard(event, json.likes.length);
            })
            .catch(console.error);
    }
}


popupEditProfileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const btn = evt.target.querySelector(".button")
    const defaultBtnText = btn.textContent;
    btn.textContent = btnTextProcessSave;
    editProfileAPI({
        name: popupEditProfileForm.name.value,
        about: popupEditProfileForm.description.value,
    })
        .then((profile) => {
            initProfile(profile);
            closePopup(popupEditProfile);
        })
        .catch(console.error)
        .finally(btn.textContent = defaultBtnText);
})

popupAddCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const btn = evt.target.querySelector(".button")
    const defaultBtnText = btn.textContent;
    btn.textContent = btnTextProcessSave;
    createCardAPI({
        name: popupAddCardForm["place-name"].value,
        link: popupAddCardForm.link.value,
    })
        .then((newCard) => {
            cards.prepend(
                createCard(newCard,
                    deleteCardCallback,
                    likeCardCallback,
                    openPopupImgCard,
                    newCard.owner._id));
            popupAddCardForm.reset();
            closePopup(popupNewCard);
        })
        .catch(console.error)
        .finally(btn.textContent = defaultBtnText);
})

// popup view image card
export const createPopupImgCard = (card) => {
    popupDescription.textContent = card.name;
    popupImg.src = card.link;
    popupImg.alt = card.name;
    return popupCardImage
}

clearValidation(popupAddCardForm, validationConfig);
newCardBtn.addEventListener("click", () => {
    toggleButtonState(
        Array.from(popupAddCardForm.querySelectorAll(config.inputSelector)),
        popupAddCardForm.querySelector(".button"),
        config.inactiveButtonClass
    );
    openPopup(popupNewCard)
})


editProfileBtn.addEventListener("click", () => {
    clearValidation(popupEditProfileForm, validationConfig);
    const profile = getProfile()
    popupEditProfileForm.name.value = profile.name;
    popupEditProfileForm.description.value = profile.about;
    toggleButtonState(
        Array.from(popupEditProfileForm.querySelectorAll(config.inputSelector)),
        popupEditProfileForm.querySelector(".button"),
        config.inactiveButtonClass
    );
    openPopup(popupEditProfile);
})

const openPopupImgCard = (card) => {
    openPopup(createPopupImgCard(card))
}

Promise.all([getInitialCardsAPI, getInitProfileAPI])
    .then(([initialCards, profile]) => {
        initProfile(profile);
        initialCards.forEach(elm => {
            cards.append(createCard(elm, deleteCardCallback, likeCardCallback, openPopupImgCard, profile._id));
        });
    })
    .catch(console.error)

popupEditProfileImageForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const btn = evt.target.querySelector(".button")
    const defaultBtnText = btn.textContent;
    btn.textContent = btnTextProcessSave;
    editProfileAvatarAPI(popupEditProfileImageForm.link.value)
        .then((profile) => {
            initProfile(profile);
            evt.target.reset();
            closePopup(popupEditProfileImage);
        })
        .catch(console.error)
        .finally(btn.textContent = defaultBtnText);
})


profileImage.addEventListener("click", () => {
    clearValidation(popupEditProfileImageForm, validationConfig);
    toggleButtonState(
        Array.from(popupEditProfileImageForm.querySelectorAll(config.inputSelector)),
        popupEditProfileImageForm.querySelector(".button"),
        config.inactiveButtonClass
    );
    openPopup(popupEditProfileImage)
})

enableValidation(validationConfig);