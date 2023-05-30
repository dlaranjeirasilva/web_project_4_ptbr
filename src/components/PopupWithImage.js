import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.modal__popup-image');
    this._popupTitle = this._popup.querySelector('.modal__popup-title');
  }

  open(imageAlt, imageSrc) {
    super.open();
    this._popupImage.src = imageSrc;
    this._popupImage.alt = imageAlt;
    this._popupTitle.textContent = imageAlt;
  }
}
