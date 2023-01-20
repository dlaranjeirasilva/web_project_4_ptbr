let modal = document.querySelector(".modal");
let modalProfileInfoName = document.querySelector(".profile-info__name");
let modalProfileInforAboutMe = document.querySelector(".profile-info__about-me");
let modalCloseButton = document.querySelector(".modal__button");
let profileInfoButton = document.querySelector(".profile-info__button");
let formName = document.querySelector(".form__name");
let formAboutMe = document.querySelector(".form__about-me");
let formElement = document.querySelector("form");

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
