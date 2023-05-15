import { toggleModal } from './utils.js';

class Card {
  constructor(name, link, cardTemplate) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");
    const cardDeleteButton = this._element.querySelector(".card__garbage-can");
    const cardLikeButton = this._element.querySelector(".card__button");

    cardImage.addEventListener("click", () => {
      const popupImageClicked = this._showPopupImage();
      toggleModal(popupImageClicked);
    });

    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = `${this._name}`;

    cardDeleteButton.addEventListener("click", (evt) => {
      this._handleDeleteIconClick(evt);
    });

    cardLikeButton.addEventListener("click", (evt) => {
      this._handleLikeIconClick(evt);
    });
  }

  _showPopupImage() {
    const modal = document.querySelector('#modal-popup');
    const modalInfo = modal.querySelector('.modal__popup-info');

    modalInfo.querySelector('.modal__popup-title').textContent = this._name;
    modalInfo.querySelector('.modal__popup-image').src = this._link;
    modalInfo.querySelector('.modal__popup-image').alt = `${this._name}`;

    return modal;
  }

  _handleDeleteIconClick(evt) {
    evt.target.closest(".card").remove();
  }

  _handleLikeIconClick(evt) {
    evt.target.classList.toggle("card__button_active");
    if (evt.target.classList.contains("card__button_active")) {
      evt.target.setAttribute("alt", "Coração marcado");
    } else {
      evt.target.setAttribute("alt", "Coração desmarcado");
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
