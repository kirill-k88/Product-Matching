import '../LogInPopupForm/LogInPopupForm.css';
import { useForm, FieldValues } from 'react-hook-form';
import {
  EMAIL_REGEXP,
  NAME_REGEXP,
  NAME_VALIDATION_ERROR_MESSAGE,
  PASSWORD_HINT,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERROR_MESSAGE,
  PASSWORD_REGEXP,
  PASSWORD_VALIDATION_ERROR_MESSAGE,
  REQUIRED_ERROR_MESSAGE,
  WRONG_EMAIL_MESSAGE
} from '../../utils/constants';
import auth from '../../utils/Api/auth';
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction, useState } from 'react';

export function RegisterForm({
  setLoggedIn,
  setIsLoading,
  setRequestError
}: {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setRequestError: Dispatch<SetStateAction<string>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({ mode: 'all' });

  const [errorText, setErrorText] = useState('');

  const navigate = useNavigate();

  function registr(username: string, email: string, password: string) {
    setIsLoading(true);
    auth
      .register(username, email, password)
      .then(() => {
        setLoggedIn(false);
        navigate('/auth');
      })
      .catch((err) => {
        setErrorText(`Ошибка при регистрации:
        ${err.detail}`);
        setRequestError(err.message);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const onSubmit = (data: FieldValues) => {
    registr(data.name, data.email, data.password);
  };

  const handleCancelBtnClick = () => {
    navigate('/');
  };

  return (
    <div className="login-popup__background">
      <div className="login-popup">
        <form onSubmit={handleSubmit(onSubmit)} className="login-popup__form">
          <p className="login-popup__field-text">Email</p>
          <input
            type="text"
            {...register('email', {
              required: REQUIRED_ERROR_MESSAGE,
              pattern: {
                value: EMAIL_REGEXP,
                message: WRONG_EMAIL_MESSAGE
              }
            })}
            className="login-popup__field"
            placeholder="Email"
          />
          {errors?.email && (
            <div className="login-popup__field-error">{errors.email.message?.toString()}</div>
          )}
          <p className="login-popup__field-text">Имя</p>
          <input
            type="text"
            {...register('name', {
              required: REQUIRED_ERROR_MESSAGE,
              pattern: {
                value: NAME_REGEXP,
                message: NAME_VALIDATION_ERROR_MESSAGE
              }
            })}
            className="login-popup__field"
            placeholder="Имя"
          />
          {errors?.name && (
            <div className="login-popup__field-error">{errors.name.message?.toString()}</div>
          )}
          <p className="login-popup__field-text">Пароль</p>
          <input
            type="password"
            {...register('password', {
              required: REQUIRED_ERROR_MESSAGE,
              minLength: {
                value: PASSWORD_MIN_LENGTH,
                message: PASSWORD_MIN_LENGTH_ERROR_MESSAGE
              },
              pattern: {
                value: PASSWORD_REGEXP,
                message: PASSWORD_VALIDATION_ERROR_MESSAGE
              }
            })}
            className="login-popup__field login-popup__field_password"
            placeholder="Пароль"
            title={PASSWORD_HINT}
          />
          {errors?.password && (
            <span className="login-popup__field-error">{errors.password.message?.toString()}</span>
          )}

          <div className="login-popup__btn-container">
            <button
              disabled={!isValid}
              className={`login-popup__submit-btn ${
                !isValid ? 'login-popup__submit-btn_diabled' : 'common-button'
              }`}>
              Регистрация
            </button>
            <button
              className="login-popup__submit-btn common-button"
              onClick={handleCancelBtnClick}>
              Отмена
            </button>
          </div>
          <p className="login-popup__error-text">{errorText}</p>
        </form>
      </div>
    </div>
  );
}
