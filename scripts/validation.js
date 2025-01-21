const showInputError = (formElement, inputElement, errorMessage) => {
  const errorMessage = formElement.querySelector(``);
};

const hideInputError = (formElement, inputElement) => {};

const setEventListeners = (formElement) => {
  console.log("Вход в setEventListeners");

  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  console.log("Вход в hasInvalidInput");
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  console.log("Вход в toggleButtonState");
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_disabled");
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove("popup__button_disabled");
    buttonElement.removeAttribute("disabled");
  }
};

const checkInputValidity = (formElement, inputElement) => {
  console.log("Вход в checkInputValidity");
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const enadleValidation = () => {
  console.log("Вход в enadleValidation");
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};
