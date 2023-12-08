import { IDealer } from './IDealer.interface';
import { IMatched } from './IMatched.interface';

export interface IDealerProduct {
  id: number;
  product_key: string;
  price: number;
  product_url: string;
  product_name: string;
  date: string;
  dealer: IDealer;
  productdealer?: null | IMatched;
}
