import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import './StatisticsInfo.css';
import { MarkingContext } from '../../contexts/MarkingContext';
import { Analytics } from '../../utils/Interfaces/StatisticsPage/Analytics.interface';
import { INITIAL_STATISTICS_INPUTVALUES } from '../../utils/constants';
import { InputValues } from '../../utils/Interfaces/StatisticsPage/InputValues.interface';
import ButtonPreloader from '../ButtonPreloader/ButtonPreloader';

function StatisticsInfo({
  statistics,
  dealerStatistics,
  handleSubmitInfoForm,
  selectedDealer,
  isStatisticsLoad
}: {
  statistics: Analytics;
  dealerStatistics: Analytics;
  handleSubmitInfoForm: (arg: { id: string; startDate: string; endDate: string }) => void;
  selectedDealer: string;
  isStatisticsLoad: boolean;
}) {
  const context = useContext(MarkingContext);
  const [inputValues, setInputValues] = useState<InputValues>(INITIAL_STATISTICS_INPUTVALUES);
  const isFormReady =
    inputValues.id !== '' && inputValues.startDate !== '' && inputValues.endDate !== '';

  function handleInputValues(e: ChangeEvent<HTMLInputElement>) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    handleSubmitInfoForm(inputValues);

    setInputValues({
      id: '',
      startDate: '',
      endDate: ''
    });
  }

  return (
    <div className="stat-info">
      {isStatisticsLoad ? (
        <ButtonPreloader statPage={true} />
      ) : (
        <>
          <h2 className="stat-info__info-title">Статистика</h2>
          <form className="stat-info__info-form" onSubmit={(e) => handleFormSubmit(e)}>
            <label className="stat-info__text-input-label">
              <input
                type="number"
                onChange={(e) => handleInputValues(e)}
                value={inputValues.id}
                id="id-input"
                name="id"
                className="stat-info__text-input"
                placeholder={`Введите id(ваш id - ${context.user.id})`}
              />
              <div className="stat-info__search-icon"></div>
            </label>
            <h3 className="stat-info__subtitle">Укажите период:</h3>
            <div className="stat-info__date-input-box">
              <input
                onChange={(e) => handleInputValues(e)}
                value={inputValues.startDate}
                type="date"
                name="startDate"
                id="start-date-input"
                className="stat-info__date-input"
              />
              <input
                onChange={(e) => handleInputValues(e)}
                value={inputValues.endDate}
                type="date"
                name="endDate"
                id="end-date-input"
                className="stat-info__date-input"
              />
            </div>
            <button
              type="submit"
              className={`stat-info__form-button ${
                isFormReady ? '' : 'stat-info__form-button_disabled'
              }`}
              disabled={!isFormReady}>
              Поиск
            </button>
          </form>
          <p className="stat-info__total-matched">{`Кол-во сопоставленных: ${statistics.matched}`}</p>
          <p className="stat-info__total-matched">{`Кол-во несопоставленных: ${statistics.not_matched}`}</p>
          <p className="stat-info__total-matched">{`Кол-во отложенных: ${statistics.deferred}`}</p>
          <p className="stat-info__total-matched">{`Точность: ${
            String(statistics.accuracy).length < 4
              ? statistics.accuracy
              : String(statistics.accuracy).substring(0, 4)
          }`}</p>
          {statistics.position.map((el, index) => (
            <p className="stat-info__total-matched" key={index}>{`На ${el.position} позиции - ${
              String(el.percentage).length < 5
                ? el.percentage
                : String(el.percentage).substring(0, 5)
            }%`}</p>
          ))}
          <div
            className={`stat-info__dealer-info ${selectedDealer === 'all' ? 'display-none' : ''}`}>
            <h3 className="stat-info__dealer-info-title">Статистика по выбранному дилеру</h3>
            <p className="stat-info__dealer-matched">{`Кол-во сопоставленных: ${dealerStatistics.matched}`}</p>
            <p className="stat-info__dealer-matched">{`Кол-во несопоставленных: ${dealerStatistics.not_matched}`}</p>
            <p className="stat-info__dealer-matched">{`Кол-во отложенных: ${dealerStatistics.deferred}`}</p>
            <p className="stat-info__dealer-matched">{`Точность: ${dealerStatistics.accuracy}`}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default StatisticsInfo;
