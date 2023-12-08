import { ChangeEvent } from 'react';
import './ProductTypeSelector.css';

function ProductTypeSelector({
  setProductType,
  setOffset,
  setHasMore
}: {
  setProductType: (arg: string) => void;
  setOffset: (arg: number) => void;
  setHasMore: (arg: boolean) => void;
}) {
  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    setOffset(0);
    setHasMore(true);
    setProductType(e.target.value);
  }

  return (
    <select className="product-type-selector" defaultValue="matched" onChange={(e) => onChange(e)}>
      <option value="matched" className="product-type-selector__option">
        Сопоставленный
      </option>
      <option value="not matched" className="product-type-selector__option">
        Не сопоставленный
      </option>
      <option value="deferred" className="product-type-selector__option">
        Отложенный
      </option>
    </select>
  );
}

export default ProductTypeSelector;
