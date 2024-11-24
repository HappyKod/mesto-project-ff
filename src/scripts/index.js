import "../pages/index.css"
import "./popups.js";
import {initialCards} from "./cards.js";


const cards = document.querySelector(".places__list")


const deleteCard = event => event.target.closest('.card').remove()

const createCard = (cardData, deleteCallback) => {
    const templateCard = document.querySelector("#card-template").content.cloneNode(true);
    const card = templateCard.querySelector(".card");
    const cardImage = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__title");
    const cardBtnDelete = card.querySelector(".card__delete-button");
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardBtnDelete.addEventListener("click", deleteCallback);
    return card
}

initialCards.forEach(elm => {
    cards.append(createCard(elm, deleteCard));
})
