import { ChangeEvent } from 'react';
import './UsersTypeSelector.css';

function UsersTypeSelector({
  setSelectedUserType,
  setOffset,
  setHasMore
}: {
  setSelectedUserType: (arg: string) => void;
  setOffset: (arg: number) => void;
  setHasMore: (arg: boolean) => void;
}) {
  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    setOffset(0);
    setHasMore(true);
    setSelectedUserType(e.target.value);
  }

  return (
    <select className="product-type-selector" defaultValue="current" onChange={(e) => onChange(e)}>
      <option value="current" className="product-type-selector__option">
        Данный пользователь
      </option>
      <option value="all" className="product-type-selector__option">
        Все пользователи
      </option>
    </select>
  );
}

export default UsersTypeSelector;
