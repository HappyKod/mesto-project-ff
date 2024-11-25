import "./pages/index.css"
import {initialCards} from "./components/cards.js";
import {createCard, deleteCard, likeCard,} from "./components/card.js";
import {closePopup, newPopupAddCardForm, newPopupEditProfileForm, newPopupImgCard, openPopup} from "./components/popup";
import {getProfile} from "./components/profile";


const cards = document.querySelector(".places__list")
const newCardBtn = document.querySelector(".profile__add-button")
const editProfileBtn = document.querySelector(".profile__edit-button")


initialCards.forEach(elm => {
    cards.append(createCard(elm, deleteCard, likeCard));
})

newCardBtn.addEventListener("click", () => {
    openPopup(newPopupAddCardForm(createCard, deleteCard, likeCard, cards), closePopup)
})

editProfileBtn.addEventListener("click", () => {
    openPopup(newPopupEditProfileForm(getProfile()), closePopup);
})

cards.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card__image")) {
        openPopup(newPopupImgCard({
                src: evt.target.src,
                description: evt.target.closest(".card").querySelector(".card__title").textContent
            }
        ), closePopup)
    }
})