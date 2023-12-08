export interface IProduct {
  id: number;
  FIELD1: number | null;
  article: string;
  ean_13: number | null;
  name: string;
  cost: number | null;
  recommended_price: number | null;
  category_id: number | null;
  ozon_name: string | null;
  name_1c: string | null;
  wb_name: string | null;
  ozon_article: string | number | null;
  wb_article: string | number | null;
  ym_article: string | number | null;
  wb_article_td: string | number | null;
}
