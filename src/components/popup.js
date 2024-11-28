export const openPopup = (elm) => {
    elm.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscape)
    document.addEventListener("click", handleClickOutPopup);
}

export const closePopup = (elm) => {
    elm.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscape);
    document.removeEventListener("click", handleClickOutPopup);
}


const handleEscape = (evt) => {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector(".popup_is-opened"))
    }
}

const handleClickOutPopup = (evt) => {
    if (evt.target.classList.contains("popup")) {
        closePopup(evt.target);
    }
}