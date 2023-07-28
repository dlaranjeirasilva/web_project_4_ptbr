export default class Section {
  constructor({items, renderer}, classSelector) {
    this._items = Promise.resolve(items);
    this._renderer = renderer;

    this._container = document.querySelector(classSelector);
  }

  renderItems() {
    this._items.then((items) => {
      items.forEach((item) => this._renderer(item));
    });
  }

  addItem(element) {
    this._container.appendChild(element);
  }
}
