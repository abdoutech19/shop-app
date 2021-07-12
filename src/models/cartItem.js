export class CartItem {
  constructor(product, quantity) {
    this.id = product.id;
    this.price = product.price;
    this.title = product.title;
    this.imageUrl = product.imageUrl;
    this.quantity = quantity;
    this.total = this.price * this.quantity;
  }
}
