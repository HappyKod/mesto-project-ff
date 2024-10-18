// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const deleteCard = event => event.target.closest('.card').remove()

const createCard = (cardData, deleteCallback) => {
    const templateCard = document.querySelector("#card-template").content.cloneNode(true);
    let card = templateCard.querySelector(".card");
    let cardImage = card.querySelector(".card__image");
    let cardTitle = card.querySelector(".card__title");
    let cardBtnDelete = card.querySelector(".card__delete-button");
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardBtnDelete.addEventListener("click", deleteCallback);
    return card
}

const cards = document.querySelector(".places__list")
initialCards.forEach(elm => {
    cards.append(createCard(elm, deleteCard));
})
