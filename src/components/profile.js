const profile = document.querySelector(".profile__info")
const profileName = profile.querySelector(".profile__title")
const profileDescription = profile.querySelector(".profile__description")
const profileAvatar = document.querySelector(".profile__image")


/**
 * @typedef {Object} ProfileData
 * @property {string} name
 * @property {string} about
 * @property {string} avatar
 * @property {string} _id
 * @property {string} cohort
 */

/**
 *
 * @type {ProfileData}
 */
let profileData = {};

/**
 *
 * @returns {ProfileData}
 */
export const getProfile = () => {
    return profileData
}

/**
 * @param {ProfileData} profile
 */
export const initProfile = (profile) => {
    profileData = profile;
    renderProfile();
}

const renderProfile = () => {
    profileName.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileAvatar.style.backgroundImage = `url(${profileData.avatar})`;
}