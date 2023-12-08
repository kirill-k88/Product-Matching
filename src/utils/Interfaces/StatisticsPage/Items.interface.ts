import { DealerPrice } from './DealerPrice.interface';
import { Product } from './Product.interdace';

export interface Items {
  product: Product;
  dealerprice: DealerPrice;
  created_at: string;
  status: string;
}
