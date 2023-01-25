const modal = document.querySelector(".modal");
const modalProfileInfoName = document.querySelector(".profile-info__name");
const modalProfileInforAboutMe = document.querySelector(".profile-info__about-me");
const modalCloseButton = document.querySelector(".modal__button");
const profileInfoButton = document.querySelector(".profile-info__button");
const formName = document.querySelector(".form__name");
const formAboutMe = document.querySelector(".form__about-me");
const formElement = document.querySelector("form");

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

profileInfoButton.addEventListener("click", modalOperation);
modalCloseButton.addEventListener("click", modalOperation);
formElement.addEventListener("submit", handleProfileFormSubmit);

fillProfileInfo();
