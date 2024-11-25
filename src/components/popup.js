export const openPopup = (elm, deleteCallback) => {
    elm.classList.add("popup_is-opened");
    elm.querySelector(".popup__close").addEventListener("click", () => deleteCallback(elm))
    document.addEventListener("keydown", (evt) => {
        if (evt.key === "Escape") {
            deleteCallback(elm);
        }
    })
}

export const closePopup = (elm) => {
    elm.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closePopup);
}

document.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
        closePopup(evt.target);
    }
})

// popup edit profile
export const newPopupEditProfileForm = (profile) => {
    const editProfilePopup = document.querySelector(".popup_type_edit")
    const popupEditProfileForm = document.forms["edit-profile"];

    popupEditProfileForm.name.value = profile.name;
    popupEditProfileForm.description.value = profile.description;
    popupEditProfileForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        profile.editProfile({
            name: popupEditProfileForm.name.value,
            description: popupEditProfileForm.description.value,
        })
        closePopup(editProfilePopup)
    })
    return editProfilePopup
}

// popup add card
export const newPopupAddCardForm = (addCallback, deleteCallback, likeCallback, cards) => {
    const addCardPopup = document.querySelector(".popup_type_new-card")
    const popupAddCardForm = document.forms["new-place"];

    popupAddCardForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        if (popupAddCardForm["place-name"].value !== "" && popupAddCardForm.link.value !== "") {
            cards.prepend(addCallback({
                name: popupAddCardForm["place-name"].value,
                link: popupAddCardForm.link.value,
            }, deleteCallback, likeCallback));
            popupAddCardForm.reset();
            closePopup(addCardPopup)
        }
    })
    return addCardPopup
}

// popup view image card
export const newPopupImgCard = (card) => {
    const viewImagePopup = document.querySelector(".popup_type_image");
    const popupImg = viewImagePopup.querySelector(".popup__image");
    const popupDescription = viewImagePopup.querySelector(".popup__caption");

    popupDescription.textContent = card.description;
    popupImg.src = card.src;
    popupImg.alt = card.description;
    return viewImagePopup
}