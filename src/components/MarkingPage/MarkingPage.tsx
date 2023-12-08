import './MarkingPage.css';
import '../../utils/css-common/common-button.css';
import { useState, useEffect, SetStateAction, Dispatch, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Match } from '../Match/Match';
import { SearchInFullList } from '../SearchInFullList/SearchInFullList';
import { SelectedProduct } from '../SelectedProduct/SelectedProduct';
import { IDealerProduct } from '../../utils/Interfaces/IDealerProduct.interface';
import { INIRIAL_MARKETING_PRODUCTS, INITIAL_MARKETING_DEALERPRICE } from '../../utils/constants';
import { IProduct } from '../../utils/Interfaces/IProduct.interface';
import api from '../../utils/Api/api';
import { Preloader } from '../Preloader/Preloader';
import { MarkingFooter } from '../MarkingFooter/MarkingFooter';
import { MarkingHeader } from '../MarkingHeader/MarkingHeader';

export default function MarkingPage({
  matchCount,
  setMatchCount,
  setRequestError
}: {
  matchCount: number;
  setMatchCount: Dispatch<SetStateAction<number>>;
  setRequestError: Dispatch<SetStateAction<string>>;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [curProductId, setCurProductId] = useState('');
  const [mathProductList, setMathProductList] = useState<IProduct[]>(INIRIAL_MARKETING_PRODUCTS);
  const [chosenDealerProduct, setChosenDealerProduct] = useState<IDealerProduct>(
    INITIAL_MARKETING_DEALERPRICE[0]
  );
  const [chosenItem, setChosenItem] = useState<IProduct>(INIRIAL_MARKETING_PRODUCTS[0]);
  const [mappedProduct, setMappedProduct] = useState<IProduct>(INIRIAL_MARKETING_PRODUCTS[0]);
  const [isMapped, setIsMapped] = useState(false);
  const [isDenyed, setIsDenyed] = useState(false);
  const [isDelayed, setIsDelayed] = useState(false);

  const { product_id } = useParams();

  useLayoutEffect(() => {
    setCurProductId(product_id || '');
  }, []);

  const resetChosenItem = () => {
    setChosenItem(INIRIAL_MARKETING_PRODUCTS[0]);
  };

  const reset = () => {
    resetChosenItem();
    setIsDenyed(false);
    setIsMapped(false);
    setMappedProduct(INIRIAL_MARKETING_PRODUCTS[0]);
    setIsDelayed(false);
  };

  useEffect(() => {
    setIsLoading(true);
    reset();
    if (curProductId) {
      api
        .getDealerPrice(curProductId)
        .then((data) => {
          setChosenDealerProduct(data);
          if (data.productdealer) {
            if (data.productdealer.status === 'matched') {
              setMappedProduct(data.productdealer.product);
              setIsMapped(true);
            }
            if (data.productdealer.status === 'not matched') {
              setIsDenyed(true);
            }
            if (data.productdealer.status === 'deferred') {
              setIsDelayed(true);
            }
          }
        })
        .catch((err) => {
          setRequestError(err.message);
          console.log(err.message);
        });

      api
        .getMatchList(curProductId)
        .then((result) => {
          const data: IProduct[] = result;
          setMathProductList(data);
        })
        .catch((err) => {
          setRequestError(err.message);
          console.log(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [curProductId]);

  // get list of products for matching
  const getMatchList = (count: number, list: IProduct[]) => {
    const resultList: JSX.Element[] = [];
    for (let i = 0; i < (list.length >= count ? count : list.length); i++) {
      resultList.push(
        <Match product={list[i]} key={i} setChosenItem={setChosenItem} chosenItem={chosenItem} />
      );
    }
    return resultList;
  };

  const handleBtnDenyClick = () => {
    setIsLoading(true);

    api
      .postMatchingNotAccepted(chosenDealerProduct.id.toString())
      .then(() => {
        reset();
        setIsDenyed(true);
      })
      .catch((err) => {
        setRequestError(err.message);
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleBtnAdmit = () => {
    setIsLoading(true);
    api
      .postMatchingAccepted(chosenDealerProduct.id.toString(), chosenItem.id.toString())
      .then(() => {
        reset();
        setMappedProduct(chosenItem);
        setIsMapped(true);
      })
      .catch((err) => {
        setRequestError(err.message);
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleBtnDelayClick = () => {
    setIsLoading(true);

    api
      .postMatchingAcceptedLater(chosenDealerProduct.id.toString())
      .then(() => {
        reset();
        setIsDelayed(true);
      })
      .catch((err) => {
        setRequestError(err.message);
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <div className="marking">
            <MarkingHeader matchCount={matchCount} setMatchCount={setMatchCount}></MarkingHeader>
            <div className="marking__container">
              <div className="marking__matchList-container">
                {matchCount === 999 ? (
                  <SearchInFullList fullList={mathProductList} getMatchList={getMatchList} />
                ) : (
                  getMatchList(matchCount, mathProductList)
                )}
              </div>
              <div className="marking__matching-container">
                <div className="marking__match-container">
                  <SelectedProduct
                    dealerProduct={chosenDealerProduct}
                    chosenItem={chosenItem}
                    isMapped={isMapped}
                    mappedProduct={mappedProduct}
                    isDenyed={isDenyed}
                    isDelayed={isDelayed}></SelectedProduct>
                </div>
                <div className="marking__btn-small-container">
                  <button
                    type="button"
                    className="marking__btn common-button"
                    onClick={handleBtnAdmit}>
                    Да
                  </button>
                  <button
                    type="button"
                    className="marking__btn common-button"
                    onClick={handleBtnDenyClick}>
                    Нет
                  </button>
                  <button
                    type="button"
                    className="marking__btn common-button"
                    onClick={handleBtnDelayClick}>
                    Отложить
                  </button>
                </div>
              </div>
            </div>
          </div>
          <MarkingFooter
            curProductId={curProductId}
            setCurProductId={setCurProductId}
            reset={reset}
          />
        </>
      )}
    </>
  );
}
