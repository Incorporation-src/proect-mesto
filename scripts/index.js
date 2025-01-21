const placesList = document.querySelector(".places__list");

// Находим модальные окна
const popupGeneral = document.querySelectorAll(".popup");
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

// Находим кнопки
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupCloseButton = document.querySelectorAll(".popup__close");

// Находим текстовые части профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Находим форму в DOM
const profileFormElement = profilePopup.querySelector(".popup__form");
const cardFormElement = cardPopup.querySelector(".popup__form");

// Находим поля формы в DOM
const nameFormInput = profileFormElement.querySelector(".popup__input_type_name");
const jobFormInput = profileFormElement.querySelector(".popup__input_type_description");

const nameCardInput = cardFormElement.querySelector(".popup__input_type_card-name");
const linkCardInput = cardFormElement.querySelector(".popup__input_type_url");

popupGeneral.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// Функция отображения карточек
function createCard(nameValue, linkValue) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  const cardName = cardElement.querySelector(".card__title");
  const cardImg = cardElement.querySelector(".card__image");

  cardName.textContent = nameValue;
  cardImg.src = linkValue;
  cardImg.alt = nameValue;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_is-active");

    console.log("Нажата кнопка лайка");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardDeleteButton.closest(".card").remove();

    console.log("Нажата кнопка удаления");
  });

  cardImg.addEventListener("click", () => {
    const popupCurentImage = document.querySelector(".popup__image");
    const popupCaption = document.querySelector(".popup__caption");

    popupCurentImage.src = linkValue;
    popupCurentImage.alt = nameValue;
    popupCaption.textContent = nameValue;

    openModal(imagePopup);

    console.log("Модальное окно картинки карточки открыто");
  });

  return cardElement;
}

function loadPreparedCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData.name, cardData.link);

    placesList.append(cardElement);
  });
}

// Функция обработки редактирования профиля
function handleProfileFormSubmit(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();

  // Получение значений полей jobInput и nameInput из свойства value
  const userName = nameFormInput.value;
  const userJob = jobFormInput.value;

  // Вставка новых значений в текстовые поля профиля
  profileTitle.textContent = userName;
  profileDescription.textContent = userJob;

  // Закрытие модального окна
  closeModal(profilePopup);
}

// Функция добавления карточки
function handleCardFormSubmit(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();

  // Получение значений полей nameCardInput и linkCardInput из свойства value
  const cardName = nameCardInput.value;
  const cardLink = linkCardInput.value;

  // Вставка новой карточки
  const cardElement = createCard(cardName, cardLink);

  placesList.prepend(cardElement);

  closeModal(cardPopup);

  cardFormElement.reset();
}

// Функция открытия модального окна
function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

// Функция закрытия модального окна
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");

  console.log("Данное модальное окно закрыто");
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
cardFormElement.addEventListener("submit", handleCardFormSubmit);

// Обработчик открытия модального окна
profileEditButton.addEventListener("click", () => {
  nameFormInput.value = profileTitle.textContent;
  jobFormInput.value = profileDescription.textContent;

  openModal(profilePopup);
  console.log("Модальное окно изменения профиля открыто");
});

profileAddButton.addEventListener("click", () => {
  openModal(cardPopup);
  console.log("Модальное окно добавления карточки открыто");
});

// Обработчик закрытия модального окна
popupCloseButton.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    if (popup) {
      closeModal(popup);
    }
  });
});

loadPreparedCards();

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
