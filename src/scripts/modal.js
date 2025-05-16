import { validationSettings } from "./constants.js";
import { resetFormValidation } from "./validate.js";

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', (evt) => handleEscClosePopup(evt, popup));

    popup.addEventListener('mousedown', (evt) => handleOverlayClosePopup(evt, popup));
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', (evt) => handleEscClosePopup(evt, popup));
    popup.removeEventListener('mousedown', (evt) => handleOverlayClosePopup(evt, popup));

    // Добавляем сброс формы
    const form = popup.querySelector('form');
    if (form) {
        form.reset();
        // Сбрасываем ошибки валидации
        resetFormValidation(form);
        form.querySelectorAll('.popup__input').forEach(input => {
            input.classList.remove(validationSettings.inputErrorClass);
        });
        const errorElements = form.querySelectorAll('.popup__error');
        errorElements.forEach(error => {
            error.textContent = '';
            error.classList.remove(validationSettings.errorClass);
        });
    }
}

const handleEscClosePopup = (evt, popup) => {
    if (evt.key === 'Escape') {
        closeModal(popup);
    }
};

const handleOverlayClosePopup = (evt, popup) => {
    if (evt.target === evt.currentTarget) {
        closeModal(popup);
    }
};

/**Слушатели */
const setCloseEventListeners = (closeButtons) => {
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popup = button.closest('.popup');
            if (popup) {
                closeModal(popup);
            }
        });
    });
};

export {openModal, closeModal, setCloseEventListeners};
