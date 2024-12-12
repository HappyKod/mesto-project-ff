/**
 * enable validation forms
 *
 * @param {Object} config
 * @param {string} config.formSelector
 * @param {string} config.inputSelector
 * @param {string} config.submitButtonSelector
 * @param {string} config.inactiveButtonClass
 * @param {string} config.inputErrorClass
 * @param {string} config.errorClass
 */
export const enableValidation = (config) => {
    const formsList = Array.from(document.querySelectorAll(config.formSelector));
    formsList.forEach((form) => {
        validationForm(form, config);
    })
}

/**
 * clear validation forms
 * @param {HTMLFormElement} form
 *
 * @param {Object} config
 * @param {string} config.formSelector
 * @param {string} config.inputSelector
 * @param {string} config.submitButtonSelector
 * @param {string} config.inactiveButtonClass
 * @param {string} config.inputErrorClass
 * @param {string} config.errorClass
 *
 * @param {boolean} disableSubmit
 */
export const clearValidation = (form, config, disableSubmit = true) => {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideInputError(inputElement, form, config.errorClass, config.inputErrorClass);
    })
    if (disableSubmit) {
        submitButton.classList.add(config.inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove(config.inactiveButtonClass);
        submitButton.disabled = false;
    }

}


/**
 * Validate form
 *
 * @param {HTMLFormElement} form
 *
 * @param {Object} config
 * @param {string} config.formSelector
 * @param {string} config.inputSelector
 * @param {string} config.submitButtonSelector
 * @param {string} config.inactiveButtonClass
 * @param {string} config.inputErrorClass
 * @param {string} config.errorClass
 */
const validationForm = (form, config) => {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            validateInput(inputElement, form, config.errorClass, config.inputErrorClass);
            toggleButtonState(inputList, form.querySelector(config.submitButtonSelector), config.inactiveButtonClass)
        })
    })


}

/**
 * @param {HTMLInputElement} inputElement
 * @param {HTMLFormElement} form
 * @param {string} errorClass
 * @param {string} inputErrorClass
 */
const hideInputError = (inputElement, form, errorClass, inputErrorClass) => {
    const err = form.querySelector(`.${inputElement.name}-error`);
    err.classList.remove(errorClass);
    err.textContent = "";
    inputElement.classList.remove(inputErrorClass);
};

/**
 * @param {HTMLInputElement} inputElement
 * @param {HTMLFormElement} form
 * @param {string} errorMessage
 * @param {string} errorClass
 * @param {string} inputErrorClass
 */
const showInputError = (inputElement, form, errorMessage, errorClass, inputErrorClass) => {
    const err = form.querySelector(`.${inputElement.name}-error`);
    err.classList.add(errorClass);
    err.textContent = errorMessage;
    inputElement.classList.add(inputErrorClass);
};
/**
 * Validate input
 *
 * @param {HTMLInputElement} inputElement
 * @param {HTMLFormElement} form
 * @param {string} errorClass
 * @param {string} inputErrorClass
 *
 * @return {boolean}
 */
const validateInput = (inputElement, form, errorClass, inputErrorClass) => {
    if (!inputElement.validity.valid) {
        let errorMessage = inputElement.validationMessage;
        if (inputElement.validity.patternMismatch) {
            errorMessage = inputElement.dataset.errorMessage;
        }
        showInputError(inputElement, form, errorMessage, errorClass, inputErrorClass);
        return false;
    }
    hideInputError(inputElement, form, errorClass, inputErrorClass)
    return true;
}


/**
 *
 * @param {[HTMLInputElement]}inputList
 * @returns {boolean}
 */
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};
/**
 *
 * @param {[HTMLInputElement]} inputList
 * @param {HTMLElement} buttonElement
 * @param {string} classToggle
 */
const toggleButtonState = (inputList, buttonElement, classToggle) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(classToggle);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(classToggle);
    }
};