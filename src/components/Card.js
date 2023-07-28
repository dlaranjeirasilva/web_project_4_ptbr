class Card {
  constructor(data, cardTemplate, popupSelector, deleteSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data._id;
    this._cardTemplate = cardTemplate;
    this._popupSelector = popupSelector;
    this._deleteSelector = deleteSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _handleCardClick() {
    this._popupSelector.open(this._name, this._link);
  }

  _setEventListeners() {
    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");
    const cardDeleteButton = this._element.querySelector(".card__garbage-can");
    const cardLikeButton = this._element.querySelector(".card__button");
    const cardLikesCounter = this._element.querySelector(".card__likes");

    cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteIconClick();
    });

    cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });

    this._element.id = this._id;
    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = `${this._name}`;
    cardLikesCounter.textContent = this._likes.length;

    cardLikeButton.addEventListener("click", (evt) => {
      this._handleLikeIconClick(evt);
    });
  }

  _handleDeleteIconClick() {
    this._deleteSelector._form.tempid = this._id;
    this._deleteSelector.open();
  }

  _handleLikeIconClick(evt) {
    evt.target.classList.toggle("card__button_active");
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
