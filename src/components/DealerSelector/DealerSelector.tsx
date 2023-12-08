import './DealerSelector.css';
import { ChangeEvent, useContext } from 'react';
import { MarkingContext } from '../../contexts/MarkingContext';

function DealerSelector({
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
  const context = useContext(MarkingContext);

  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    const dealer = context.dealerList.find((dealerInfo) => dealerInfo.name === e.target.value);
    setOffset(0);
    setHasMore(true);
    handleDealerStatistics(dealer ? dealer.id : 'all');
    setSelectedDealer(e.target.value);
  }

  return (
    <select defaultValue="all" className="dealer-selector" onChange={(e) => onChange(e)}>
      <option value="all" className="dealer-selector__option">
        Все товары(выберите дилера)
      </option>
      {context.dealerList.map((dealer) => (
        <option className="dealer-selector__option" value={dealer.name} key={dealer.id}>
          {dealer.name}
        </option>
      ))}
    </select>
  );
}

export default DealerSelector;
