export class Product {

  public quantityInCart: number = 0;

  constructor(public name: string,
              public price: number,
              public imageUrl: string,
              public isOnSale: boolean = false) {
  }

  incrementInCart() {
    this.quantityInCart += 1;
  }

  decrementInCart() {
    if (this.quantityInCart > 0) {
      this.quantityInCart -= 1;
    }
  }

}
