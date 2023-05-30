export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleClose = this._handleClose.bind(this);
  }

  open() {
    this._popup.classList.add('modal_opened');
    document.addEventListener('keydown', this._handleClose);
    document.addEventListener('mousedown', this._handleClose);
  }

  close() {
    this._popup.classList.remove('modal_opened');
    document.removeEventListener('keydown', this._handleClose);
    document.removeEventListener('mousedown', this._handleClose);
  }

  _handleClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }

    if(evt.target === this._popup) {
      this.close();
    }

    if(evt.target === this._popup.firstElementChild.firstElementChild) {
      this.close();
    }
  }
}
