import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._formSubmitCallback = formSubmitCallback;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitCallback(evt);
      super.close();
    });
  }
}
