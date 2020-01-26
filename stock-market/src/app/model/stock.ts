export class Stock {

  // 定義從 HTML 存取的各種欄位
  favorite: boolean = false;
  notablePeople: Array<Person>;

  constructor(public name: string,
              public code: string,
              public price: number,
              public previousPrice: number) {
    this.notablePeople = [];
  }

  isPositiveChange(): boolean {
    return this.price >= this.previousPrice;
  }

}

export class Person {
  name: string;
  title: string;
}
