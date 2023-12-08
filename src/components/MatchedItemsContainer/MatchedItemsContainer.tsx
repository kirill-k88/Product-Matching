import { useNavigate } from 'react-router-dom';
import './MatchedItemsContainer.css';
import { Items } from '../../utils/Interfaces/StatisticsPage/Items.interface';

function MatchedItemsContainer({ data }: { data: Items }) {
  const navigate = useNavigate();

  return (
    <div className="match-items-cont__container">
      <div
        onClick={() => navigate(`/marking/${data.dealerprice.id}`)}
        className="match-items-cont__matching-link"></div>
      <div className="match-items-cont__box">
        <h2 className="match-items-cont__box-title">Товар дилера</h2>
        <h3 className="match-items-cont__product-name">{`Название: ${data.dealerprice.product_name}`}</h3>
        <p className="match-items-cont__product-price">{`Цена: ${data.dealerprice.price}`}</p>
        <p className="match-items-cont__dealer-name">{`Дилер: ${data.dealerprice.dealer.name}`}</p>
        <div className="match-items-cont__date-link-box">
          <p className="match-items-cont__product-date">{`Дата загрузки товара: ${data.dealerprice.date}`}</p>
          <a
            href={data.dealerprice.product_url}
            rel="noreferrer"
            target="_blank"
            className="match-items-cont__product-link">
            Ссылка на товар
          </a>
        </div>
      </div>
      <div className="match-items-cont__arrow-image"></div>
      <div className="match-items-cont__box">
        <h2 className="match-items-cont__box-title">Сопоставленный товар заказчика</h2>
        <h3 className="match-items-cont__product-name">{`Название: ${
          data?.product?.name || ''
        }`}</h3>
        <p className="match-items-cont__product-price">{`Цена: ${data?.product?.cost}`}</p>
        <p className="match-items-cont__product-min-price">{`Мин. рекомендованная цена: ${data?.product?.recommended_price}`}</p>
        <p className="match-items-cont__product-article">{`Артикль: ${data?.product?.article}`}</p>
      </div>
    </div>
  );
}

export default MatchedItemsContainer;
