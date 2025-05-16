import { validationSettings } from "./constants.js";

export const resetFormValidation = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

    inputList.forEach((input) => {
        input.classList.remove(validationSettings.inputErrorClass);
        const errorElement = formElement.querySelector(`#input-${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = "";
            errorElement.classList.remove(validationSettings.errorClass);
        }
    });

    if (buttonElement) {
        buttonElement.classList.add(validationSettings.inactiveButtonClass);
        buttonElement.disabled = true;
    }
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#input-${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#input-${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

// Проверка наличия невалидных полей
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

// Функция для изменения состояния кнопки отправки
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationSettings.inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
    } else {
        buttonElement.classList.remove(validationSettings.inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
    }
};

// Функция для включения валидации
const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
        // Устанавливаем слушатели для всех инпутов и проверку состояния кнопки сразу
        setEventListeners(formElement);
    });
};

export { enableValidation, validationSettings };
