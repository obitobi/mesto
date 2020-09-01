export class Section {

    constructor({items, renderer}, selector) {
        this._items = items;
        this._renderer = renderer;
        this._selector = selector;
        this.render();
    }

    render() {
        this._items.forEach((item) => {
            this.addItem(this._renderer(item));
        });
    }

    addItem(element) {
        const container = document.querySelector(this._selector);
        container.append(element);
    }
}
