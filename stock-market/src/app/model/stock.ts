export class Stock {

  // 定義從 HTML 存取的各種欄位
  favorite: boolean = false;

  constructor(public name: string,
              public code: string,
              public price: number,
              public previousPrice: number) {
  }

  isPositiveChange(): boolean {
    return this.price >= this.previousPrice
  }

}
