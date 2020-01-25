export class Product {

  public quantityInCart: number = 0;

  constructor(public id: number,
              public name: string,
              public price: number,
              public imageUrl: string,
              public isOnSale: boolean = false) {
  }

}
