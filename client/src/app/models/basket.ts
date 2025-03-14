import { IProduct } from './product'

export interface IBasket {
  basketId: string;
  items: IItem[];
  clientSecret?: string
  paymentIntentId?: string
}

export class IItem {
  constructor(product: IProduct, quantity: number) {
    this.productId = product.id;
    this.name = product.name;
    this.price = product.price;
    this.pictureUrl = product.pictureUrl;
    this.brand = product.brand;
    this.type = product.type;
    this.quantity = quantity;
  }

  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
  quantity: number;
}
