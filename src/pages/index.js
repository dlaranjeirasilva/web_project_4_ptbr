import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeletePost from '../components/PopupDeletePost';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import {
  cardsSection,
  editAvatarButton,
  formProfileElement,
  modalProfileInfoName,
  modalProfileInforAboutMe,
  formCardElement,
  cardTitleInput,
  cardImageInput,
  cardAddButton,
  profileInfoButton,
  formName,
  formAboutMe,
  avatarInput,
  avatarFormElement,
  profileAvatar,
  baseUrl,
  token,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: baseUrl,
  token: token
});

const userInfo = new UserInfo({
  nameSelector: '.profile-info__name',
  aboutMeSelector: '.profile-info__about-me',
  avatarSelector: '.profile__avatar'
})

api.getUserInfo()
.then((userData) => {
  userInfo.setUserInfo(userData);
  formName.value = userData.name;
  formAboutMe.value = userData.about;
  avatarInput.value = userData.avatar;
  profileAvatar.src = userData.avatar;
  modalProfileInfoName.textContent = userData.name;
  modalProfileInforAboutMe.textContent = userData.about;
})

const profileFormValidator = new FormValidator({
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}, formProfileElement);

const formProfile = new PopupWithForm('#modal-profile', () => {
  api.editUser(formName.value, formAboutMe.value)
  modalProfileInfoName.textContent = formName.value;
  modalProfileInforAboutMe.textContent = formAboutMe.value;
}, '.profile-info');

profileInfoButton.addEventListener("click", () => {
  profileFormValidator.enableValidation();
  formProfile.open();
});

const avatarFormValidator = new FormValidator({
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}, avatarFormElement);

const editAvatarForm = new PopupWithForm('#modal-avatar', (formData) => {
  api.updateAvatar(formData.avatar_url)
  profileAvatar.src = formData.avatar_url;
}, '.profile__container');

editAvatarButton.addEventListener("click", () => {
  avatarInput.value = profileAvatar.src;
  avatarFormValidator.enableValidation();
  editAvatarForm.open();
})

const confirmDelete = new PopupDeletePost('#modal-delete', (item) => {
  api.removeCard(item.target.tempid);
  document.getElementById(item.target.tempid).remove();
});

const initialCardsSection = new Section ({
  items: api.getInitialCards(),
  renderer: (item) => {
    const newCard = new Card(
      item,
      '#card-template',
      new PopupWithImage('#modal-popup'),
      new PopupDeletePost('#modal-delete')
      );
      api.getUserInfo()
      .then((userInfo) => {
        const actualCard = newCard.generateCard();
        const actualCardLikes = actualCard.querySelector('.card__likes');
        const actualCardLikeButton = actualCard.querySelector('.card__button');

        actualCardLikes.textContent = item.likes.length;

        item.likes.forEach((likeInfo) => {
          if(likeInfo._id.includes(userInfo._id)) {
            actualCardLikeButton.setAttribute("alt", "Coração marcado");
            actualCardLikeButton.classList.toggle("card__button_active");
          }
        })

        actualCardLikeButton.addEventListener('click', () => {
          if(actualCardLikeButton.classList.contains("card__button_active")) {
            api.addLike(actualCard.id)
            .then((newLikes) => {
              actualCardLikeButton.setAttribute("alt", "Coração marcado");
              actualCardLikes.textContent = newLikes.likes.length;
            })
          } else {
            api.removeLike(actualCard.id)
            .then((newLikes)=> {
              actualCardLikeButton.setAttribute("alt", "Coração desmarcado");
              actualCardLikes.textContent = newLikes.likes.length;
            })
          }
        })

        if(item.owner._id !== userInfo._id) {
          actualCard.querySelector('.card__garbage-can').remove();
        }
        initialCardsSection.addItem(actualCard);

    })
  }
}, '.cards');

initialCardsSection.renderItems();

const cardFormValidator = new FormValidator({
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}, formCardElement);

const formCard = new PopupWithForm('#modal-card', (formData) => {
  api.addNewCard(formData.title, formData.img_url)
  .then((cardData) => {
    const newCard = new Card(
      cardData,
      '#card-template',
      new PopupWithImage('#modal-popup'),
      new PopupDeletePost('#modal-delete')
      );
      const actualCard = newCard.generateCard();
      const actualCardLikes = actualCard.querySelector('.card__likes');
      const actualCardLikeButton = actualCard.querySelector('.card__button');

      actualCardLikes.textContent = cardData.likes.length;

      actualCardLikeButton.addEventListener('click', () => {
        if(actualCardLikeButton.classList.contains("card__button_active")) {
          api.addLike(actualCard.id)
          .then((newLikes) => {
            actualCardLikeButton.setAttribute("alt", "Coração marcado");
            actualCardLikes.textContent = newLikes.likes.length;
          })
        } else {
          api.removeLike(actualCard.id)
          .then((newLikes)=> {
            actualCardLikeButton.setAttribute("alt", "Coração desmarcado");
            actualCardLikes.textContent = newLikes.likes.length;
          })
        }
      })

      cardsSection.prepend(actualCard);
      cardTitleInput.value = '';
      cardImageInput.value = '';
      formCardElement.lastElementChild.disabled = true;
      formCardElement.lastElementChild.classList.add('form__button_inactive');
  })
}, '.cards');

cardAddButton.addEventListener("click", () => {
  formCard.open();
});

formName.value = userInfo.getUserInfo().name;
formAboutMe.value = userInfo.getUserInfo().aboutMe;
avatarInput.value = userInfo.getUserInfo().avatar.src;
confirmDelete.setEventListeners();
formProfile.setEventListeners();
cardFormValidator.enableValidation();
formCard.setEventListeners();
editAvatarForm.setEventListeners();
