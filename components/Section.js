export class Section {
  constructor(items, renderer, container) {
    this.items = items;
    this.renderer = renderer;
    this.container = container;
  }

  renderItems() {
    this.items.forEach((item) => {
      //Iterate over the item
      //call the renderer function with the item
      //and add the returned element to the container
      const element = this.renderer(item);
      this.addItem(element);
    });
  }
  addItem(element) {
    //Toma el elemento para agregarlo al DOM y contenedor
    this.container.prepend(element);
  }
}
