export class Section {

    constructor({items, renderer}, selector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    render() {
        this._items.forEach((item) => { this._renderer(item) });
    }

    addItem(element, isArray) {
        if (!isArray) {
            this._container.append(element);
        } else {
            this._container.prepend(element);
        }
    }
}
