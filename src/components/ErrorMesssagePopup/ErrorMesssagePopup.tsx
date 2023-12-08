import './ErrorMesssagePopup.css';
import { SetStateAction, Dispatch, useEffect } from 'react';

export function ErrorMesssagePopup({
  requestError,
  setRequestError
}: {
  requestError: string;
  setRequestError: Dispatch<SetStateAction<string>>;
}) {
  const handleCloseBtnClick = () => {
    setRequestError('');
  };

  useEffect(() => {
    if (requestError !== '') {
      setTimeout(() => {
        setRequestError('');
      }, 2000);
    }
  }, [requestError]);

  return (
    <div className={`error-popup ${requestError !== '' && 'error-popup_show'}`}>
      <p className="error-popup__message">{requestError}</p>
      <button className="error-popup__close-btn common-button" onClick={handleCloseBtnClick}>
        ✖
      </button>
    </div>
  );
}
