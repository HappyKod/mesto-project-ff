const createCardBtn = document.querySelector(".profile__add-button")
const popupNewCard = document.querySelector(".popup_type_new-card")

const handlerKeyClosedPopup = () => {
    popupNewCard.classList.remove("popup_is-opened")
    document.removeEventListener("keydown", handlerKeyClosedPopup)
}

createCardBtn.addEventListener("click", () => {
    popupNewCard.classList.add("popup_is-opened")
    document.addEventListener("keydown", handlerKeyClosedPopup)
})

document.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
        popupNewCard.classList.remove("popup_is-opened")
    }
})