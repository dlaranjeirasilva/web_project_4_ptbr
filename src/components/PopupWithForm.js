import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback, fieldSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._formSubmitCallback = formSubmitCallback;
    this._submitButton = this._form.querySelector('.form__button');
    this._fieldSelector = document.querySelector(fieldSelector);
  }

  _getInputValues() {
    const inputs = Array.from(this._form.querySelectorAll('.form__input'));
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  _clearInputErrors() {
    const formInputList = this._form.querySelectorAll('.form__input');

    formInputList.forEach((formInput) => {
      const errorElement = formInput.nextElementSibling;
      formInput.classList.remove("form__input_type_error");
      errorElement.classList.remove("form__input-error_active");
      errorElement.textContent = "";
      if(formInput.value === '') {
        this._submitButton.disabled = true;
        this._submitButton.classList.add("form__button_inactive");
      }
    });
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitCallback(this._getInputValues());
      super.close();
    });
  }

  close() {
    super.close();
    this._clearInputErrors();
    if(this._fieldSelector.classList.contains('profile-info')) {
      this._form.querySelectorAll('.form__input')[0].value = this._fieldSelector.firstElementChild.textContent;
      this._form.querySelectorAll('.form__input')[1].value = this._fieldSelector.firstElementChild.nextElementSibling.textContent;
      this._submitButton.disabled = false;
      this._submitButton.classList.remove("form__button_inactive");
    } else {
      this._form.querySelectorAll('.form__input')[0].value = ''
      this._form.querySelectorAll('.form__input')[1].value = '';
      this._submitButton.disabled = true;
      this._submitButton.classList.add("form__button_inactive");
    }
  }
}
