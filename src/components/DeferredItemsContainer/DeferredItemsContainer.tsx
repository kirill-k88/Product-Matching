import { useNavigate } from 'react-router-dom';
import './DeferredItemsContainer.css';
import { Items } from '../../utils/Interfaces/StatisticsPage/Items.interface';

function DeferredItemsContainer({ data }: { data: Items }) {
  const navigate = useNavigate();

  return (
    <div className="def-items-cont">
      <div
        onClick={() => navigate(`/marking/${data.dealerprice.id}`)}
        className="def-items-cont__marking-link"></div>
      <h2 className="def-items-cont__box-title">Товар дилера</h2>
      <h3 className="def-items-cont__product-name">{`Название: ${data.dealerprice.product_name}`}</h3>
      <p className="def-items-cont__product-price">{`Цена: ${data.dealerprice.price}`}</p>
      <p className="def-items-cont__dealer-name">{`Дилер: ${data.dealerprice.dealer.name}`}</p>
      <div className="def-items-cont__date-link-box">
        <p className="def-items-cont__product-date">{`Дата загрузки товара: ${data.dealerprice.date}`}</p>
        <a
          href={data.dealerprice.product_url}
          rel="noreferrer"
          target="_blank"
          className="def-items-cont__product-link">
          Ссылка на товар
        </a>
      </div>
    </div>
  );
}

export default DeferredItemsContainer;
