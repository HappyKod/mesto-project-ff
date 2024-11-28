import "./pages/index.css"
import {initialCards} from "./components/cards.js";
import {createCard, deleteCard, likeCard,} from "./components/card.js";
import {closePopup, openPopup} from "./components/popup";
import {getProfile} from "./components/profile";


const cards = document.querySelector(".places__list")
const newCardBtn = document.querySelector(".profile__add-button")
const editProfileBtn = document.querySelector(".profile__edit-button")

const popupEditProfile = document.querySelector(".popup_type_edit")
const popupEditProfileForm = document.forms["edit-profile"];

const popupNewCard = document.querySelector(".popup_type_new-card ")
const popupAddCardForm = document.forms["new-place"];

const popupCardImage = document.querySelector(".popup_type_image")
const popupImg = popupCardImage.querySelector(".popup__image");
const popupDescription = popupCardImage.querySelector(".popup__caption");


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

// popup edit profile
export const createPopupEditProfileForm = () => {
    const profile = getProfile()
    popupEditProfileForm.name.value = profile.name;
    popupEditProfileForm.description.value = profile.description;
    popupEditProfileForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        profile.editProfile({
            name: popupEditProfileForm.name.value,
            description: popupEditProfileForm.description.value,
        })
        closePopup(popupEditProfile)
    })
    return popupEditProfile
}

// popup add card
export const createPopupAddCardForm = () => {

    popupAddCardForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        if (popupAddCardForm["place-name"].value !== "" && popupAddCardForm.link.value !== "") {
            cards.prepend(
                createCard({
                        name: popupAddCardForm["place-name"].value,
                        link: popupAddCardForm.link.value,
                    },
                    deleteCard,
                    likeCard,
                    openPopupImgCard));
            popupAddCardForm.reset();
            closePopup(popupNewCard)
        }
    })
    return popupNewCard
}

// popup view image card
export const createPopupImgCard = (card) => {
    popupDescription.textContent = card.name;
    popupImg.src = card.link;
    popupImg.alt = card.name;
    return popupCardImage
}

newCardBtn.addEventListener("click", () => {
    openPopup(createPopupAddCardForm())
})

editProfileBtn.addEventListener("click", () => {
    openPopup(createPopupEditProfileForm());
})

const openPopupImgCard = (card) => {
    openPopup(createPopupImgCard(card))
}

initialCards.forEach(elm => {
    cards.append(createCard(elm, deleteCard, likeCard, openPopupImgCard));
})