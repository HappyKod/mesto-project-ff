const profile = document.querySelector(".profile__info")
const profileName = profile.querySelector(".profile__title")
const profileDescription = profile.querySelector(".profile__description")

export const editProfile = (profile) => {
    profileName.textContent = profile.name;
    profileDescription.textContent = profile.description;
}

export const getProfile = () => {
    return {
        name: profileName.textContent,
        description: profileDescription.textContent,
        editProfile: editProfile
    }
}