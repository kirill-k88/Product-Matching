import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import './Match.css';
import { IProduct } from '../../utils/Interfaces/IProduct.interface';

export function Match({
  product,
  setChosenItem,
  chosenItem
}: {
  product: IProduct;
  setChosenItem: Dispatch<SetStateAction<IProduct>>;
  chosenItem: IProduct;
}) {
  const [isChosen, setIsChosen] = useState(false);

  useEffect(() => {
    setIsChosen(chosenItem.id === product.id);
  }, [chosenItem]);

  const handleClick = () => {
    if (chosenItem.id !== product.id) {
      setChosenItem(product);
    } else {
      setChosenItem({
        FIELD1: 0,
        id: 0,
        article: '',
        ean_13: 0,
        name: '',
        cost: 0,
        recommended_price: 0,
        category_id: null,
        ozon_name: '',
        name_1c: '',
        wb_name: '',
        ozon_article: null,
        wb_article: null,
        ym_article: '',
        wb_article_td: ''
      });
    }
  };

  return (
    <div className={`match common-button ${isChosen && 'match_chosen'}`} onClick={handleClick}>
      <p className={`match__product-name  ${isChosen && 'match__product-name_chosen'}`}>
        {product?.name || 'Не удалось получить наименование товара'}
      </p>
    </div>
  );
}
