import './MarkingHeader.css';
import { Selector } from '../Selector/Selector';
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';

export function MarkingHeader({
  matchCount,
  setMatchCount
}: {
  matchCount: number;
  setMatchCount: Dispatch<SetStateAction<number>>;
}) {
  const navigate = useNavigate();

  const handleBtnToMainClick = () => {
    navigate('/');
  };

  return (
    <div className="marking__header">
      <div className="marking__header-btn-container">
        <button
          type="button"
          className="marking__header-btn common-button"
          onClick={handleBtnToMainClick}>
          На главную
        </button>
      </div>
      <Selector matchCount={matchCount} setMatchCount={setMatchCount}></Selector>
    </div>
  );
}
