export const deleteCard = event => event.target.closest('.card').remove();
export const likeCard = event => event.target.closest('.card__like-button').classList.toggle('card__like-button_is-active');

export const createCard = (cardData,
                           deleteCallback,
                           likeCallback,
                           openPopupCallback) => {
    const templateCard = document.querySelector("#card-template").content.cloneNode(true);
    const card = templateCard.querySelector(".card");
    const cardImage = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__title");
    const cardBtnDelete = card.querySelector(".card__delete-button");
    const cardLike = card.querySelector(".card__like-button");

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardBtnDelete.addEventListener("click", deleteCallback);
    cardLike.addEventListener("click", likeCallback);
    cardImage.addEventListener("click", () => openPopupCallback(cardData));

    return card
}