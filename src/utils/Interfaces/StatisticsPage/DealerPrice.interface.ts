import { IDealer } from '../IDealer.interface';

export interface DealerPrice {
  id: number;
  product_key: number;
  price: number;
  product_url: string;
  product_name: string;
  date: string;
  dealer: IDealer;
}
