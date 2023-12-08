import './Selector.css';
import { Dispatch, SetStateAction, ChangeEvent } from 'react';

export function Selector({
  matchCount,
  setMatchCount
}: {
  matchCount: number;
  setMatchCount: Dispatch<SetStateAction<number>>;
}) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMatchCount(Number(e.target.value));
  };

  const getOptions = (valueList: string[]) => {
    return valueList.map((item, index) => (
      <option value={item} className="select__option" key={index}>
        {`Предложить вариантов: ${item}`}
      </option>
    ));
  };

  return (
    <select
      className="select"
      defaultValue={matchCount}
      onChange={handleChange}
      title={
        matchCount === 999
          ? 'Поиск во всех предложенных вариантах'
          : `Показать первые ${matchCount} из предложенных вариантов`
      }>
      {getOptions(['1', '2', '3', '4', '5', '10', '25'])}
      <option value="999" className="select__option" title="Поиск во всех предложенных вариантах">
        {'Искать среди предложенных вариантов'}
      </option>
    </select>
  );
}
