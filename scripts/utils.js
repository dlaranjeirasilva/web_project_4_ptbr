import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const cardsSection = document.querySelector(".cards");

const modalList = document.querySelectorAll(".modal");
const modalProfile = document.querySelector("#modal-profile");

const modalProfileInfoName = document.querySelector(".profile-info__name");
const modalProfileInforAboutMe = document.querySelector(".profile-info__about-me");
const modalProfileCloseButton = document.querySelector("#profile-modal__button");
const modalCard = document.querySelector("#modal-card");
const modalCardCloseButton = document.querySelector("#card-modal__button");

const modalPopup = document.querySelector("#modal-popup");
const modalPopupButton = document.querySelector("#popup-modal__button");

const profileInfoButton = document.querySelector(".profile-info__button");
const cardAddButton = document.querySelector(".profile__button");

const formProfileElement = document.querySelector("#form-profile");
const formCardElement = document.querySelector("#form-card");
const formName = document.querySelector("#name-input");
const formAboutMe = document.querySelector("#about-me-input");

export const toggleModal = (modal) => {
  modal.classList.toggle("modal_opened");
};

export const handleModalClick = (evt, modal) => {
  if (evt.target.classList.contains("modal")) {
    toggleModal(modal);
  }
};

export function handleProfileFormSubmit(e) {
  e.preventDefault();

  modalProfileInfoName.textContent = formName.value;
  modalProfileInforAboutMe.textContent = formAboutMe.value;

  toggleModal(e.target.parentElement.parentElement);
}

export function clearInputs() {
  const formInputList = document.querySelectorAll(".form__input");

  formInputList.forEach((formInput) => {
    const errorElement = formInput.nextElementSibling;
    formInput.value = "";
    formInput.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
  });
}

export function fillProfileInfo() {
  formName.value = modalProfileInfoName.textContent;
  formAboutMe.value = modalProfileInforAboutMe.textContent;

  const profileFormValidator = new FormValidator({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  }, formProfileElement);
  profileFormValidator.enableValidation();

  const cardFormValidator = new FormValidator({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  }, formCardElement);
  cardFormValidator.enableValidation();
}

export function handleCardFormSubmit(e) {
  e.preventDefault();

  const newCard = new Card(
    e.target.firstElementChild.nextElementSibling.value,
    e.target.lastElementChild.previousElementSibling.previousElementSibling.value,
    '#card-template'
    );
  cardsSection.prepend(newCard.generateCard());

  e.target.lastElementChild.previousElementSibling.previousElementSibling.value =
    "";
  e.target.firstElementChild.nextElementSibling.value = "";
  toggleModal(e.target.parentElement.parentElement);
}

export function addEventListeners() {
  profileInfoButton.addEventListener("click", () => {
    toggleModal(modalProfile);
  });

  cardAddButton.addEventListener("click", () => {
    toggleModal(modalCard);
  });

  modalProfileCloseButton.addEventListener("click", () => {
    toggleModal(modalProfile);
    clearInputs();
    fillProfileInfo();
  });

  modalCardCloseButton.addEventListener("click", () => {
    toggleModal(modalCard);
    clearInputs();
    fillProfileInfo();
  });

  modalPopupButton.addEventListener("click", () => {
    toggleModal(modalPopup);
  });

  modalList.forEach((modal) => {
    const keydownCallback = (e) => {
      if (modal.classList.contains("modal_opened") && e.key === "Escape") {
        toggleModal(modal);
        clearInputs();
        fillProfileInfo();
      }
    };

    const mousedownCallback = (e) => {
      if (e.target.getAttribute("class") === "modal modal_opened") {
        toggleModal(e.target);
        clearInputs();
        fillProfileInfo();
      }
    };

    document.addEventListener("keydown", keydownCallback);
    modal.addEventListener("mousedown", mousedownCallback);
  });

  formProfileElement.addEventListener("submit", handleProfileFormSubmit);
  formCardElement.addEventListener("submit", handleCardFormSubmit);
}

export function removeEventListeners() {
  profileInfoButton.removeEventListener("click", () => {
    toggleModal(modalProfile);
  });

  cardAddButton.removeEventListener("click", () => {
    toggleModal(modalCard);
  });

  modalProfileCloseButton.removeEventListener("click", () => {
    toggleModal(modalProfile);
    clearInputs();
    fillProfileInfo();
  });

  modalCardCloseButton.removeEventListener("click", () => {
    toggleModal(modalCard);
    clearInputs();
    fillProfileInfo();
  });

  modalPopupButton.removeEventListener("click", () => {
    toggleModal(modalPopup);
  });

  modalList.forEach((modal) => {
    const keydownCallback = (e) => {
      if (modal.classList.contains("modal_opened") && e.key === "Escape") {
        toggleModal(modal);
        clearInputs();
        fillProfileInfo();
      }
    };

    const mousedownCallback = (e) => {
      if (e.target.getAttribute("class") === "modal modal_opened") {
        toggleModal(e.target);
        clearInputs();
        fillProfileInfo();
      }
    };

    document.removeEventListener("keydown", keydownCallback);
    modal.removeEventListener("mousedown", mousedownCallback);
  });

  formProfileElement.removeEventListener("submit", handleProfileFormSubmit);
  formCardElement.removeEventListener("submit", handleCardFormSubmit);
}
