const modal = document.querySelector(".modal");
const modalProfileInfoName = document.querySelector(".profile-info__name");
const modalProfileInforAboutMe = document.querySelector(".profile-info__about-me");
const modalCloseButton = document.querySelector(".modal__button");
const profileInfoButton = document.querySelector(".profile-info__button");
const formName = document.querySelector(".form__name");
const formAboutMe = document.querySelector(".form__about-me");
const formElement = document.querySelector(".form");
const cardsSection = document.querySelector(".cards");

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

function addCard(cardImageValue, cardTitleValue) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardImageValue;
  cardElement.querySelector(".card__image").alt = cardTitleValue;
  cardElement.querySelector(".card__title").textContent = cardTitleValue;

  cardsSection.prepend(cardElement);
}

function handleProfileFormSubmit(e) {
  e.preventDefault();

  modalProfileInfoName.textContent = formName.value
  modalProfileInforAboutMe.textContent = formAboutMe.value

  modalOperation();
}

function modalOperation() {
  if(modal.classList.contains("modal_opened")) {
    modal.classList.remove("modal_opened");
  } else {
    modal.classList.add("modal_opened");
  }
}

function fillProfileInfo() {
  formName.value = modalProfileInfoName.textContent;
  formAboutMe.value = modalProfileInforAboutMe.textContent;
}

initialCards.reverse().forEach((card) => {
  addCard(card.link, card.name)
});

profileInfoButton.addEventListener("click", modalOperation);
modalCloseButton.addEventListener("click", modalOperation);
formElement.addEventListener("submit", handleProfileFormSubmit);

fillProfileInfo();
