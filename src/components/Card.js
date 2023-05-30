class Card {
  constructor(name, link, cardTemplate, popupSelector) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
    this._popupSelector = popupSelector;
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

    cardImage.addEventListener('click', () => {
      this._handleCardClick();
    })

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
