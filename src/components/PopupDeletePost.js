import Popup from "./Popup.js";

export default class PopupDeletePost extends Popup {
  constructor(popupSelector, formSubmitCallback) {
  // constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._formSubmitCallback = formSubmitCallback;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitCallback(evt);
      // evt.target.closest(".card").remove();
      super.close();
    });
  }
}
