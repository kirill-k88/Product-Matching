import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import './SearchInFullList.css';
import { IProduct } from '../../utils/Interfaces/IProduct.interface';

export function SearchInFullList({
  fullList,
  getMatchList
}: {
  fullList: IProduct[];
  getMatchList: (count: number, list: IProduct[]) => JSX.Element[];
}) {
  const {
    register,
    handleSubmit,
    formState: { isValid }
  } = useForm({ mode: 'all' });

  const [resultOfSearchList, setResultOfSearchList] = useState(fullList);

  const onSubmit = (data: FieldValues) => {
    const { pattern } = data;
    setResultOfSearchList(
      fullList.filter((item) => item.name?.toLowerCase().indexOf(pattern.toLowerCase()) >= 0)
    );
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="search-form__field-container">
          <input
            type="text"
            {...register('pattern')}
            placeholder="Поиск по предложенным вариантам"
            className="search-form__field"
          />
          <button
            disabled={!isValid}
            className={`search-form__submit-btn ${
              !isValid ? 'search-form__submit-btn_disabled' : ''
            }`}></button>
        </div>
      </form>
      <div className="search-form__matchList-container">
        {getMatchList.length > 0 &&
          (resultOfSearchList.length > 0 ? (
            getMatchList(999, resultOfSearchList)
          ) : (
            <div className="search-form__no-goods">Нет подходящих товаров</div>
          ))}
      </div>
    </>
  );
}
