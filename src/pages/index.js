import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  cardsSection,
  initialCards,
  formProfileElement,
  formCardElement,
  cardTitleInput,
  cardImageInput,
  cardAddButton,
  profileInfoButton,
  formName,
  formAboutMe
} from '../utils/constants.js';

const userInfo = new UserInfo({
  nameSelector: '.profile-info__name',
  aboutMeSelector: '.profile-info__about-me'
})

const profileFormValidator = new FormValidator({
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}, formProfileElement);

const formProfile = new PopupWithForm('#modal-profile', () => {
  userInfo.setUserInfo({name: formName.value, aboutMe: formAboutMe.value})
}, '.profile-info');

profileInfoButton.addEventListener("click", () => {
  formProfile.open();
});

const cardFormValidator = new FormValidator({
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}, formCardElement);

const formCard = new PopupWithForm('#modal-card', (formData) => {
  const { 'img-url': link, 'title': name } = formData;
  const newCard = new Card(
    name,
    link,
    '#card-template',
    new PopupWithImage('#modal-popup')
    );
  cardsSection.prepend(newCard.generateCard());
  cardTitleInput.value = '';
  cardImageInput.value = '';
  formCardElement.lastElementChild.disabled = true;
  formCardElement.lastElementChild.classList.add('form__button_inactive');
}, '.cards');

cardAddButton.addEventListener("click", () => {
  formCard.open();
});

const initialCardsSection = new Section ({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(
      item.name,
      item.link,
      '#card-template',
      new PopupWithImage('#modal-popup')
    );
    initialCardsSection.addItem(newCard.generateCard());
  }
}, '.cards');

initialCardsSection.renderItems();
formName.value = userInfo.getUserInfo().name;
formAboutMe.value = userInfo.getUserInfo().aboutMe;
profileFormValidator.enableValidation();
formProfile.setEventListeners();
cardFormValidator.enableValidation();
formCard.setEventListeners();
