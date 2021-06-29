export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    console.log('rendered items in section: ', this._items)
    if ((this._items).length > 1) {
      this._items.forEach(item => { this._renderer(item) });
    } else {
      this._renderer(this._items)
    }
  }

  addInitialItem(element) {
    this._container.append(element)
  }

  addNewItem(element) {
    this._container.prepend(element)
  }

}
