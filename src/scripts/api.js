// Импорт конфигурации API из внешнего файла
import { apiConfig } from "./constants.js";

// Универсальная функция обработки ответа сервера
function processingServerResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// Функция получения начального набора карточек
function getInitialCards() {
    return fetch(`${apiConfig.link}cards`, {
        headers: apiConfig.headers,
    }).then(processingServerResponse);
}

// Функция добавления новуй карточки
function addNewCard({ name, link }) {
    return fetch(`${apiConfig.link}cards`, {
        method: "POST",
        headers: apiConfig.headers,
        body: JSON.stringify({ name, link }),
    }).then(processingServerResponse);
}

// Функция удаления карточки
function deleteCard(cardId) {
    return fetch(`${apiConfig.link}cards/${cardId}`, {
        method: "DELETE",
        headers: apiConfig.headers,
    }).then(processingServerResponse);
}

// Функция данных пользователя
function getUserData() {
    return fetch(`${apiConfig.link}users/me`, {
        headers: apiConfig.headers,
    }).then(processingServerResponse);
}

// Функция отправки данных пользователя
function sendUserData({ username, description }) {
    return fetch(`${apiConfig.link}users/me`, {
        method: "PATCH",
        headers: apiConfig.headers,
        body: JSON.stringify({ name: username, about: description }),
    }).then(processingServerResponse);
}

// Функция отправки данных о новом аватаре
function sendAvatarData({ avatar }) {
    return fetch(`${apiConfig.link}users/me/avatar`, {
        method: "PATCH",
        headers: apiConfig.headers,
        body: JSON.stringify({ avatar }), // Передаем ссылку на аватар
    }).then(processingServerResponse);
}

// Функция отправки лайка
function putCardLike(cardId) {
    return fetch(`${apiConfig.link}cards/${cardId}/likes`, {
        method: "PUT",
        headers: apiConfig.headers,
    }).then(processingServerResponse);
}

// Функция удаления лайка
function deleteCardLike(cardId) {
    return fetch(`${apiConfig.link}cards/${cardId}/likes`, {
        method: "DELETE",
        headers: apiConfig.headers,
    }).then(processingServerResponse);
}

// Экспорт всех функций
export { getInitialCards, addNewCard, deleteCard, getUserData, sendUserData, sendAvatarData, putCardLike, deleteCardLike };
