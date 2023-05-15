import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { toggleModal } from './utils.js';

const cardsSection = document.querySelector(".cards");

const modalList = document.querySelectorAll(".modal");
const modalProfile = document.querySelector("#modal-profile");
const modalProfileInfo = document.querySelector('.profile-info');

const modalProfileInfoName = document.querySelector(".profile-info__name");
const modalProfileInforAboutMe = document.querySelector(".profile-info__about-me");
const modalProfileCloseButton = document.querySelector("#profile-modal__button");
const modalCard = document.querySelector("#modal-card");
const modalCardCloseButton = document.querySelector("#card-modal__button");

const profileInfoButton = document.querySelector(".profile-info__button");
const cardAddButton = document.querySelector(".profile__button");

const formProfileElement = document.querySelector("#form-profile");

const formCardElement = document.querySelector("#form-card");
const formName = document.querySelector("#name-input");
const formAboutMe = document.querySelector("#about-me-input");

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function fillProfileInfo() {
  formName.value = modalProfileInfoName.textContent;
  formAboutMe.value = modalProfileInforAboutMe.textContent;
}

function clearInputs() {
  const formInputList = document.querySelectorAll(".form__input");

  formInputList.forEach((formInput) => {
    const errorElement = formInput.nextElementSibling;
    formInput.value = "";
    formInput.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
  });
}

function handleProfileFormSubmit(e) {
  e.preventDefault();

  // modalProfileInfo
  // .querySelector(".profile-info__name").textContent = formProfile.querySelector("#name-input").value;

  // modalProfileInfo
  // .querySelector(".profile-info__about-me") = formProfile.querySelector("#about-me-input").value;

  modalProfileInfoName.textContent = formName.value;
  modalProfileInforAboutMe.textContent = formAboutMe.value;

  toggleModal(e.target.parentElement.parentElement);
}

function handleCardFormSubmit(e) {
  e.preventDefault();

  handleCardOperations(
    e.target.lastElementChild.previousElementSibling.previousElementSibling
      .value,
    e.target.firstElementChild.nextElementSibling.value
  );

  e.target.lastElementChild.previousElementSibling.previousElementSibling.value =
    "";
  e.target.firstElementChild.nextElementSibling.value = "";
  toggleModal(e.target.parentElement.parentElement);
}

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

modalList.forEach((modal) => {
  const keydownCallback = (e) => {
    if(modal.classList.contains("modal_opened") && e.key === "Escape") {
      toggleModal(modal);
      clearInputs();
      fillProfileInfo();
    }
  };

  const mousedownCallback = (e) => {
    if(e.target.getAttribute("class") === "modal modal_opened") {
      toggleModal(e.target);
      clearInputs();
      fillProfileInfo();
    }
  };

  document.addEventListener("keydown", keydownCallback);
  modal.addEventListener("mousedown", mousedownCallback);

  modal.addEventListener("click", () => {
    document.removeEventListener("keydown", keydownCallback);
    modal.removeEventListener("mousedown", mousedownCallback);
  });
});

formProfileElement.addEventListener("submit", handleProfileFormSubmit);
// formProfileElement.addEventListener("submit", () => {
//   handleProfileFormSubmit(e, modalProfileInfo, formProfileElement)
// })
formCardElement.addEventListener("submit", handleCardFormSubmit);

initialCards.forEach((cardData) => {
  const newCard = new Card(
    cardData.name,
    cardData.link,
    '#card-template'
  );
  cardsSection.append(newCard.generateCard());
})

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

fillProfileInfo();
