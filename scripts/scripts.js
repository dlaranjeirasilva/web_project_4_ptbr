const cardsSection = document.querySelector(".cards");

const modalProfile = document.querySelector("#modal-profile");
const modalProfileInfoName = document.querySelector(".profile-info__name");
const modalProfileInforAboutMe = document.querySelector(
  ".profile-info__about-me"
);
const modalProfileCloseButton = document.querySelector(
  "#profile-modal__button"
);
const modalCard = document.querySelector("#modal-card");
const modalCardCloseButton = document.querySelector("#card-modal__button");
const modalPopup = document.querySelector("#modal-popup");
const modalPopupButton = document.querySelector("#popup-modal__button");

const profileInfoButton = document.querySelector(".profile-info__button");
const cardAddButton = document.querySelector(".profile__button");

const formProfileElement = document.querySelector("#form-profile");
const formCardElement = document.querySelector("#form-card");
const formName = document.querySelector(".form__name");
const formAboutMe = document.querySelector(".form__about-me");

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

function handleCardOperations(cardImageValue, cardTitleValue) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardImageValue;
  cardElement.querySelector(".card__image").alt = cardTitleValue;
  cardElement.querySelector(".card__title").textContent = cardTitleValue;

  cardElement.querySelector(".card__image").addEventListener("click", (e) => {
    const modalPopupImage = document.querySelector(".modal__popup-image");
    const modalPopupTitle = document.querySelector(".modal__popup-title");

    modalPopupImage.src = e.target.getAttribute("src");
    modalPopupImage.alt = e.target.getAttribute("alt");
    modalPopupTitle.textContent = e.target.getAttribute("alt");
    toggleModalOperation(modalPopup);
  });
  cardElement.querySelector(".card__button").addEventListener("click", (e) => {
    if (e.target.getAttribute("src") == "./images/hollow-heart.svg") {
      e.target.setAttribute("src", "./images/filled-heart.svg");
      e.target.setAttribute("alt", "Cora????o marcado");
    } else {
      e.target.setAttribute("src", "./images/hollow-heart.svg");
      e.target.setAttribute("alt", "Cora????o desmarcado");
    }
  });
  cardElement
    .querySelector(".card__garbage-can")
    .addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });

  cardsSection.prepend(cardElement);
}

function handlePopupModal(e) {
  toggleModalOperation(e.target.parentElement.parentElement);
}

function handleProfileFormSubmit(e) {
  e.preventDefault();

  modalProfileInfoName.textContent = formName.value;
  modalProfileInforAboutMe.textContent = formAboutMe.value;

  toggleModalOperation(e.target.parentElement.parentElement);
}

function handleCardFormSubmit(e) {
  e.preventDefault();

  handleCardOperations(
    e.target.lastElementChild.previousElementSibling.value,
    e.target.firstElementChild.nextElementSibling.value
  );

  e.target.lastElementChild.previousElementSibling.value = "";
  e.target.firstElementChild.nextElementSibling.value = "";
  toggleModalOperation(e.target.parentElement.parentElement);
}

function toggleModalOperation(itemTarget) {
  itemTarget.classList.toggle("modal_opened");
}

function fillProfileInfo() {
  formName.value = modalProfileInfoName.textContent;
  formAboutMe.value = modalProfileInforAboutMe.textContent;
}

profileInfoButton.addEventListener("click", () => {
  toggleModalOperation(modalProfile);
});
cardAddButton.addEventListener("click", () => {
  toggleModalOperation(modalCard);
});
modalProfileCloseButton.addEventListener("click", () => {
  toggleModalOperation(modalProfile);
});
modalCardCloseButton.addEventListener("click", () => {
  toggleModalOperation(modalCard);
});
modalPopupButton.addEventListener("click", () => {
  toggleModalOperation(modalPopup);
});
formProfileElement.addEventListener("submit", handleProfileFormSubmit);
formCardElement.addEventListener("submit", handleCardFormSubmit);

initialCards.reverse().forEach((card) => {
  handleCardOperations(card.link, card.name);
});

fillProfileInfo();
