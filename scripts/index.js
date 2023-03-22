const cardsSection = document.querySelector(".cards");

const modalList = document.querySelectorAll(".modal");
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
    e.target.classList.toggle("card__button_active");
    if (e.target.classList.contains("card__button_active")) {
      e.target.setAttribute("alt", "Coração marcado");
    } else {
      e.target.setAttribute("alt", "Coração desmarcado");
    }
  });
  cardElement
    .querySelector(".card__garbage-can")
    .addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });

  cardsSection.prepend(cardElement);
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
    e.target.lastElementChild.previousElementSibling.previousElementSibling
      .value,
    e.target.firstElementChild.nextElementSibling.value
  );

  e.target.lastElementChild.previousElementSibling.previousElementSibling.value =
    "";
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

profileInfoButton.addEventListener("click", () => {
  toggleModalOperation(modalProfile);
});

cardAddButton.addEventListener("click", () => {
  toggleModalOperation(modalCard);
});

modalProfileCloseButton.addEventListener("click", () => {
  toggleModalOperation(modalProfile);
  clearInputs();
  fillProfileInfo();
});

modalCardCloseButton.addEventListener("click", () => {
  toggleModalOperation(modalCard);
  clearInputs();
  fillProfileInfo();
});

modalPopupButton.addEventListener("click", () => {
  toggleModalOperation(modalPopup);
});

modalList.forEach((modal) => {
  const keydownCallback = (e) => {
    if(modal.classList.contains("modal_opened") && e.key === "Escape") {
      toggleModalOperation(modal);
      clearInputs();
      fillProfileInfo();
    }
  };

  const mousedownCallback = (e) => {
    if(e.target.getAttribute("class") === "modal modal_opened") {
      toggleModalOperation(e.target);
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
formCardElement.addEventListener("submit", handleCardFormSubmit);

initialCards.reverse().forEach((card) => {
  handleCardOperations(card.link, card.name);
});

fillProfileInfo();
