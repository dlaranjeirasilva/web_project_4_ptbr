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
    const inputs = this._form.querySelectorAll('.form__input');
    const values = {};
    inputs.forEach(input => {
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
      this.setButtonState(true);
      new Promise((resolve, reject) => {
        const result = this._formSubmitCallback(this._getInputValues());
        if (result instanceof Promise) {
          result.then(resolve).catch(reject);
        } else {
          resolve(result);
        }
      })
      .then(() => {
        setTimeout(() => {
          this.setButtonState(false);
          super.close();
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        this.setButtonState(false);
      });
    });
  }

  close() {
    super.close();
    this._clearInputErrors();
    const inputs = this._form.querySelectorAll('.form__input');
    if(this._fieldSelector.classList.contains('profile-info')) {
      inputs[0].value = this._fieldSelector.firstElementChild.textContent;
      inputs[1].value = this._fieldSelector.firstElementChild.nextElementSibling.textContent;
      this._submitButton.disabled = false;
      this._submitButton.classList.remove("form__button_inactive");
    } else {
      inputs.forEach(input => {
        input.value = '';
      })
      this._submitButton.disabled = true;
      this._submitButton.classList.add("form__button_inactive");
    }
  }

  setButtonState(isLoading) {
    let count = 0;
    if(isLoading) {
      this._submitButton.disabled = true;
      this._buttonInterval = setInterval(() => {
        count++;
        if(count > 3) {
          count = 1;
        }
        this._submitButton.textContent = `Salvando${'.'.repeat(count)}`;
      }, 250);
    } else {
      clearInterval(this._buttonInterval);
      this._submitButton.textContent = 'Salvar';
      this._submitButton.disabled = false;
    }
  }
}
