const cardsSection = document.querySelector(".cards");

const modalProfile = document.querySelector("#modal-profile");
const modalProfileInfoName = document.querySelector(".profile-info__name");
const modalProfileInforAboutMe = document.querySelector(".profile-info__about-me");
const modalProfileCloseButton = document.querySelector("#profile-modal__button");
const modalCard = document.querySelector("#modal-card");
const modalCardCloseButton = document.querySelector("#card-modal__button");

const profileInfoButton = document.querySelector(".profile-info__button");
const cardAddButton = document.querySelector(".profile__button");

const formProfileElement = document.querySelector("#form-profile");
const formCardElement = document.querySelector("#form-card");
const formName = document.querySelector(".form__name");
const formAboutMe = document.querySelector(".form__about-me");

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

function likeUnlike() {
  const formCardLikeButton = document.querySelectorAll(".card__button");

  formCardLikeButton.forEach((likeButton) => {
    likeButton.addEventListener("click", (e) => {
      if(e.target.getAttribute('src') == "./images/hollow-heart.svg") {
        e.target.setAttribute('src', "./images/filled-heart.svg");
        e.target.setAttribute('alt', "Coração marcado");
      } else {
        e.target.setAttribute('src', "./images/hollow-heart.svg");
        e.target.setAttribute('alt', "Coração desmarcado");
      }
    })
  })
}

function handleProfileFormSubmit(e) {
  e.preventDefault();

  modalProfileInfoName.textContent = formName.value
  modalProfileInforAboutMe.textContent = formAboutMe.value

  modalOperation(e.target.parentElement.parentElement);
}

function handleCardFormSubmit(e) {
  e.preventDefault();
  console.log(e.target.lastElementChild.previousElementSibling.value)

  addCard(e.target.lastElementChild.previousElementSibling.value,
          e.target.firstElementChild.nextElementSibling.value);

          e.target.lastElementChild.previousElementSibling.value = ""
          e.target.firstElementChild.nextElementSibling.value = ""

  modalOperation(e.target.parentElement.parentElement);
}

function modalOperation(itemTarget) {
  itemTarget.classList.toggle("modal_opened");
}

function fillProfileInfo() {
  formName.value = modalProfileInfoName.textContent;
  formAboutMe.value = modalProfileInforAboutMe.textContent;
}

profileInfoButton.addEventListener("click", () => {
  modalOperation(modalProfile);
})
cardAddButton.addEventListener("click", () => {
  modalOperation(modalCard);
})
modalProfileCloseButton.addEventListener("click", () => {
  modalOperation(modalProfile);
})
modalCardCloseButton.addEventListener("click", () => {
  modalOperation(modalCard);
})
formProfileElement.addEventListener("submit", handleProfileFormSubmit);
formCardElement.addEventListener("submit", handleCardFormSubmit);

initialCards.reverse().forEach((card) => {
  addCard(card.link, card.name);
});

likeUnlike();
fillProfileInfo();
