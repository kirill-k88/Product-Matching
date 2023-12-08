import './SelectedProduct.css';
import { IDealerProduct } from '../../utils/Interfaces/IDealerProduct.interface';
import { Link } from 'react-router-dom';
import { IProduct } from '../../utils/Interfaces/IProduct.interface';

export function SelectedProduct({
  dealerProduct,
  chosenItem,
  mappedProduct,
  isMapped,
  isDenyed,
  isDelayed
}: {
  dealerProduct: IDealerProduct;
  chosenItem: IProduct;
  mappedProduct: IProduct;
  isMapped: boolean;
  isDenyed: boolean;
  isDelayed: boolean;
}) {
  return (
    <div className="selected-item">
      <div className="selected-item__cell-container">
        <p className="selected-item__source">{dealerProduct.dealer?.name}</p>
        <div className="selected-item__container">
          <p className="selected-item__product-atribute">
            Наименование:{' '}
            <span className="selected-item__product-atribute-span">
              {dealerProduct?.product_name || 'Не удалось получить наименование товара'}
            </span>
          </p>
          <p className="selected-item__product-atribute">
            Цена:{' '}
            <span className="selected-item__product-atribute-span">
              {dealerProduct?.price || 'Не удалось получить цену товара'}
            </span>{' '}
            руб.
          </p>
          <p className="selected-item__product-atribute">
            Дата получения данных:{' '}
            <span className="selected-item__product-atribute-span">
              {dealerProduct?.date || 'Не удалось получить артикль товара'}
            </span>
          </p>
          {dealerProduct?.product_url && (
            <Link
              to={dealerProduct?.product_url}
              target="_blank"
              className="selected-item__product-link">
              Открыть страницу с товаром
            </Link>
          )}
        </div>
      </div>
      {chosenItem?.id !== 0 && (
        <div className="selected-item__cell-container">
          <p className="selected-item__source">Просепт</p>
          <div className="selected-item__container">
            <p className="selected-item__product-atribute">
              {chosenItem?.name_1c ? 'Наименование 1C: ' : 'Наименование: '}
              <span className="selected-item__product-atribute-span">
                {chosenItem?.name_1c ||
                  chosenItem?.name ||
                  'Не удалось получить наименование товара'}
              </span>
            </p>
            <p className="selected-item__product-atribute">
              Рекомендованная цена:{' '}
              <span className="selected-item__product-atribute-span">
                {chosenItem?.recommended_price || 'Не удалось получить цену товара'}
              </span>{' '}
              руб.
            </p>
            <p className="selected-item__product-atribute">
              Артикль:{' '}
              <span className="selected-item__product-atribute-span">
                {chosenItem?.article || 'Не удалось получить артикль товара'}
              </span>
            </p>
          </div>
        </div>
      )}
      <div className="selected-item__status-header">
        {isMapped && (
          <>
            <p className="selected-item__status">Статус: товар сопоставлен с</p>
            <div className="selected-item__container selected-item__container_mapped">
              <p className="selected-item__product-atribute">
                {mappedProduct?.name_1c ? 'Наименование 1C: ' : 'Наименование: '}
                <span className="selected-item__product-atribute-span">
                  {mappedProduct?.name_1c ||
                    mappedProduct?.name ||
                    'Не удалось получить наименование товара'}
                </span>
              </p>
              <p className="selected-item__product-atribute">
                Рекомендованная цена:{' '}
                <span className="selected-item__product-atribute-span">
                  {mappedProduct?.recommended_price ||
                    'Не удалось получить цену сопоставленного товара'}
                </span>{' '}
                руб.
              </p>
              <p className="selected-item__product-atribute">
                Артикль:{' '}
                <span className="selected-item__product-atribute-span">
                  {mappedProduct?.article || 'Не удалось получить артикль сопоставленного товара'}
                </span>
              </p>
            </div>
          </>
        )}
        {isDenyed && <p className="selected-item__status">Статус: товар не сопоставлен</p>}
        {isDelayed && <p className="selected-item__status">Статус: товар отложен</p>}
      </div>
    </div>
  );
}
