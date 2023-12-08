import { useNavigate } from 'react-router-dom';
import DealerSelector from '../DealerSelector/DealerSelector';
import './StatisticsHeader.css';

function StatisticsHeader({
  setSelectedDealer,
  setOffset,
  handleDealerStatistics,
  setHasMore
}: {
  setSelectedDealer: (arg: string) => void;
  setOffset: (arg: number) => void;
  handleDealerStatistics: (arg: number | string) => void;
  setHasMore: (arg: boolean) => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="stat-header">
      <DealerSelector
        setSelectedDealer={setSelectedDealer}
        setOffset={setOffset}
        handleDealerStatistics={handleDealerStatistics}
        setHasMore={setHasMore}
      />
      <button
        onClick={() => navigate('/')}
        type="button"
        className="stat-header__menu-button common-button">
        На главную
      </button>
    </div>
  );
}

export default StatisticsHeader;
