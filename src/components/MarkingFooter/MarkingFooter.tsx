import './MarkingFooter.css';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

export function MarkingFooter({
  curProductId,
  setCurProductId,
  reset
}: {
  curProductId: string;
  setCurProductId: Dispatch<SetStateAction<string>>;
  reset: () => void;
}) {
  const handleBtnNextClick = () => {
    if (curProductId) {
      reset();
      setCurProductId((+curProductId + 1).toString());
    }
  };

  const handleBtnPrevClick = () => {
    if (curProductId) {
      reset();
      setCurProductId((+curProductId - 1).toString());
    }
  };

  return (
    <div className="marking__footer">
      <Link
        to={`/marking/${+curProductId - 1}`}
        className="marking__btn-footer common-button"
        onClick={handleBtnPrevClick}>
        Предыдущий
      </Link>
      <Link
        to={`/marking/${+curProductId + 1}`}
        className="marking__btn-footer common-button"
        onClick={handleBtnNextClick}>
        Следующий
      </Link>
    </div>
  );
}
