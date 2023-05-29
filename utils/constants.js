export const initialCards = [
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

export const cardsSection = document.querySelector(".cards");

export const modalList = document.querySelectorAll(".modal");
export const modalProfile = document.querySelector("#modal-profile");

export const modalProfileInfoName = document.querySelector(".profile-info__name");
export const modalProfileInforAboutMe = document.querySelector(".profile-info__about-me");
export const modalProfileCloseButton = document.querySelector("#profile-modal__button");
export const modalCard = document.querySelector("#modal-card");
export const modalCardCloseButton = document.querySelector("#card-modal__button");

export const modalPopup = document.querySelector("#modal-popup");
export const modalPopupButton = document.querySelector("#popup-modal__button");

export const profileInfoButton = document.querySelector(".profile-info__button");
export const profileInfo = document.querySelector(".profile-info");
export const cardAddButton = document.querySelector(".profile__button");
export const cardTitleInput = document.querySelector("#title-input");
export const cardImageInput = document.querySelector("#url-input");

export const formList = document.querySelectorAll("[id^='form']");
export const formProfileElement = document.querySelector("#form-profile");
export const formCardElement = document.querySelector("#form-card");
export const formInputList = document.querySelectorAll("[id*='input']");
export const formName = document.querySelector("#name-input");
export const formAboutMe = document.querySelector("#about-me-input");
