export const deleteCard = event => event.target.closest('.card').remove();
export const likeCard = (event, likeCount) => {
    const cardActions = event.target.closest(".card__actions");
    const likeButton = cardActions.querySelector(".card__like-button");
    const likeCounter = cardActions.querySelector(".card__like-counter");
    likeButton.classList.toggle('card__like-button_is-active');
    likeCounter.textContent = likeCount;
};

export const createCard = (cardData,
                           deleteCallback,
                           likeCallback,
                           openPopupCallback,
                           profileID) => {
    const templateCard = document.querySelector("#card-template").content.cloneNode(true);
    const card = templateCard.querySelector(".card");
    const cardImage = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__title");
    const cardBtnDelete = card.querySelector(".card__delete-button");
    const cardLike = card.querySelector(".card__like-button");
    const cardLikeCounter = card.querySelector(".card__like-counter");

    if (cardData.likes.some((profile) => profile._id === profileID)) {
        cardLike.classList.add("card__like-button_is-active");
    }
    if (cardData.owner._id !== profileID) {
        cardBtnDelete.style.display = "none";
    } else {
        cardBtnDelete.addEventListener("click", (event) => {
            deleteCallback(event, cardData._id);
        });
    }
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardLikeCounter.textContent = cardData.likes.length;
    cardLike.addEventListener("click", (event) => {
        likeCallback(event, cardData._id, cardLike.classList.contains("card__like-button_is-active"));
    });
    cardImage.addEventListener("click", () => openPopupCallback(cardData));

    return card
}