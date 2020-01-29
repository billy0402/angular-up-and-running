export interface Stock {

  // 定義從 HTML 存取的各種欄位
  name: string;
  code: string;
  price: number;
  previousPrice: number;
  exchange: string;
  favorite: boolean;
  notablePeople: Array<Person>;

}

export class Person {
  name: string;
  title: string;
}
