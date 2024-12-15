import "./pages/index.css";
import {createCard, deleteCard, likeCard,} from "./components/card.js";
import {closePopup, openPopup} from "./components/popup";
import {getProfile, initProfile} from "./components/profile";
import {clearValidation, enableValidation} from "./components/validation";
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

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

popupEditProfile.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close")) {
        closePopup(popupEditProfile)
    }
})

popupNewCard.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close")) {
        closePopup(popupNewCard)
    }
})

popupCardImage.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close")) {
        closePopup(popupCardImage)
    }
})

popupEditProfileImage.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close")) {
        closePopup(popupEditProfileImage)
    }
})

const deleteCardCallback = (event, cardID) => {
    deleteCardAPI(cardID)
        .then(() => deleteCard(event))
        .catch((error) => console.error("Error:", error));
}

const likeCardCallback = (event, cardID, isLiked) => {
    if (isLiked) {
        dislikeCardAPI(cardID)
            .then((json) => {
                likeCard(event, json.likes.length);
            })
            .catch((error) => console.log("Error:", error));

    } else {
        likeCardAPI(cardID)
            .then((json) => {
                likeCard(event, json.likes.length);
            })
            .catch((error) => console.log("Error:", error));
    }
}


// popup edit profile
export const createPopupEditProfileForm = () => {
    const profile = getProfile()
    popupEditProfileForm.name.value = profile.name;
    popupEditProfileForm.description.value = profile.about;
    return popupEditProfile
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
            btn.textContent = defaultBtnText;
        })
        .catch((error) => console.error("Error:", error))
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
            clearValidation(popupAddCardForm, validationConfig);
            closePopup(popupNewCard);
            btn.textContent = defaultBtnText;
        })
        .catch((error) => console.log('Error:', error))
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
    openPopup(popupNewCard)
})


editProfileBtn.addEventListener("click", () => {
    clearValidation(popupEditProfileForm, validationConfig, false);
    openPopup(createPopupEditProfileForm());
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
    .catch((error) => console.log('Error:', error))

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
            btn.textContent = defaultBtnText;
        })
        .catch((error) => console.log("Error:", error))
})

profileImage.addEventListener("click", () => {
    clearValidation(popupEditProfileImageForm, validationConfig, true);
    openPopup(popupEditProfileImage)
})

enableValidation(validationConfig);