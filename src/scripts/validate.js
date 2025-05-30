import { validationSettings } from "./constants.js";

// Проверка что URL ведет на реальное изображение
const checkImageExists = (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
};

// Проверка валидности URL и доступности изображения
const isImageUrlValid = async (url) => {
    if (!/^https?:\/\//i.test(url)) return false;

    try {
        new URL(url);
        return await checkImageExists(url);
    } catch {
        return false;
    }
};

// Дополнительная проверка URL
const isUrlValid = (url) => {
    try {
        if (!/^https?:\/\//i.test(url)) return false;

        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Расширенные сообщения об ошибках
const getErrorMessage = async (input) => {
    if (input.validity.valueMissing) {
        return "Это обязательное поле";
    }

    if (input.type === "url" || input.classList.contains("popup__input_type_url")) {
        if (!/^https?:\/\//i.test(input.value)) {
            return "URL должен начинаться с http:// или https://";
        }

        try {
            new URL(input.value);
        } catch {
            return "Введите корректный URL (например: https://example.com/image.jpg)";
        }

        if (input.value && !(await checkImageExists(input.value))) {
            return "Изображение по этому адресу недоступно";
        }
    }

    return input.validationMessage;
};

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
    if (!errorElement) return;

    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#input-${inputElement.id}-error`);
    if (!errorElement) return;

    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = "";
};

// Асинхронная проверка валидности
const checkInputValidity = async (formElement, inputElement) => {
    let isValid = inputElement.validity.valid;

    if (isValid && (inputElement.type === "url" || inputElement.classList.contains("popup__input_type_url"))) {
        isValid = await isImageUrlValid(inputElement.value);
    }

    const errorMessage = await getErrorMessage(inputElement);

    if (!isValid) {
        showInputError(formElement, inputElement, errorMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
    return isValid;
};

// Модифицированный обработчик ввода
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

    // Инициализация состояния кнопки
    toggleButtonState(inputList, buttonElement);

    let checkTimeout;

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            clearTimeout(checkTimeout);

            const quickCheck = () => {
                const isValidFormat = inputElement.validity.valid;
                if (!isValidFormat) {
                    checkInputValidity(formElement, inputElement);
                }
                toggleButtonState(inputList, buttonElement);
            };

            if (inputElement.type === "url" || inputElement.classList.contains("popup__input_type_url")) {
                quickCheck();
                checkTimeout = setTimeout(async () => {
                    await checkInputValidity(formElement, inputElement);
                    await toggleButtonState(inputList, buttonElement);
                }, 800);
            } else {
                quickCheck();
            }
        });

        inputElement.addEventListener("blur", async function () {
            clearTimeout(checkTimeout);
            await checkInputValidity(formElement, inputElement);
            await toggleButtonState(inputList, buttonElement);
        });
    });
};

const hasInvalidInput = async (inputList) => {
    for (const inputElement of inputList) {
        if (!inputElement.validity.valid) {
            return true;
        }

        if (inputElement.type === "url" || inputElement.classList.contains("popup__input_type_url")) {
            if (!isUrlValid(inputElement.value)) {
                return true;
            }
            // Добавляем проверку доступности изображения
            const imageExists = await checkImageExists(inputElement.value);
            if (!imageExists) {
                return true;
            }
        }
    }
    return false;
};

const toggleButtonState = async (inputList, buttonElement) => {
    if (!buttonElement) return;

    if (await hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationSettings.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validationSettings.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

export { enableValidation };
