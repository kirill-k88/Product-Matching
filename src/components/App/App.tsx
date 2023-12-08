import './App.css';
import { useState, useLayoutEffect, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import MarkingPage from '../MarkingPage/MarkingPage';
import StatisticsPage from '../StatisticsPage/StatisticsPage';
import { MarkingContext } from '../../contexts/MarkingContext';
import api from '../../utils/Api/api';
import { Preloader } from '../Preloader/Preloader';
import { INIRIAL_USER, INITIAL_MARKETING_DEALER } from '../../utils/constants';
import { IDealer } from '../../utils/Interfaces/IDealer.interface';
import { LogInPopupForm } from '../LogInPopupForm/LogInPopupForm';
import { ProtectedRoute } from '../ProtectedRout/ProtectedRout';
import { RegisterForm } from '../RegisterForm/RegistreForm';
import { IUser } from '../../utils/Interfaces/IUser.interface';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { ErrorMesssagePopup } from '../ErrorMesssagePopup/ErrorMesssagePopup';

function App() {
  const [dealerList, setDealerList] = useState<IDealer[]>(INITIAL_MARKETING_DEALER);
  const [matchCount, setMatchCount] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser>(INIRIAL_USER);
  const [requestError, setRequestError] = useState<string>('');

  useLayoutEffect(() => {
    api
      .getCurrentUser()
      .then((data) => {
        setUser(data);
        setLoggedIn(true);
      })
      .catch((err) => {
        setRequestError(err.message);
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    api
      .getDealers()
      .then((data) => {
        setDealerList(data?.items);
      })
      .catch((err) => {
        setRequestError(err.message);
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <MarkingContext.Provider value={{ dealerList, loggedIn, user }}>
          <ErrorMesssagePopup requestError={requestError} setRequestError={setRequestError} />
          {isLoading ? (
            <Preloader />
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute element={<MainPage setRequestError={setRequestError} />} />
                }
              />
              <Route
                path="/marking/:product_id"
                element={
                  <ProtectedRoute
                    element={
                      <MarkingPage
                        matchCount={matchCount}
                        setMatchCount={setMatchCount}
                        setRequestError={setRequestError}
                      />
                    }
                  />
                }
              />
              <Route
                path="/statistics"
                element={
                  <ProtectedRoute element={<StatisticsPage setRequestError={setRequestError} />} />
                }
              />
              <Route
                path="/auth"
                element={
                  <LogInPopupForm
                    setLoggedIn={setLoggedIn}
                    setUser={setUser}
                    setIsLoading={setIsLoading}
                    setRequestError={setRequestError}
                  />
                }
              />
              <Route
                path="/register"
                element={
                  <RegisterForm
                    setLoggedIn={setLoggedIn}
                    setIsLoading={setIsLoading}
                    setRequestError={setRequestError}
                  />
                }
              />

              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          )}
        </MarkingContext.Provider>
      </div>
    </div>
  );
}

export default App;
