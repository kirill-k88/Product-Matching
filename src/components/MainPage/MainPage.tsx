import './MainPage.css';
import { MRT_ColumnFiltersState, MaterialReactTable } from 'material-react-table';
import TableOptions from '../TableOptions/TableOptions';
import api from '../../utils/Api/api';
import { FormEvent, useEffect, useState, SetStateAction, Dispatch } from 'react';
import { IDealerProduct } from '../../utils/Interfaces/IDealerProduct.interface';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../../utils/Interfaces/MainPage/Pagination.interface';
import { isButtonsLoading } from '../../utils/Interfaces/MainPage/IsButtonsLoading.interface';
import { INITIAL_MAIN_ISBUTTONSLOADING, INITIAL_MAIN_PAGINATION } from '../../utils/constants';

function MainPage({ setRequestError }: { setRequestError: Dispatch<SetStateAction<string>> }) {
  const navigate = useNavigate();
  const [data, setData] = useState<IDealerProduct[]>([]);
  const [pagination, setPagination] = useState<Pagination>(INITIAL_MAIN_PAGINATION);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [isButtonsLoading, setIsButtonsLoading] = useState<isButtonsLoading>(
    INITIAL_MAIN_ISBUTTONSLOADING
  );
  const { table } = TableOptions({
    handleSCVLoading,
    data,
    isButtonsLoading,
    pagination,
    setPagination,
    isTableLoading,
    handleSignOut,
    columnFilters,
    setColumnFilters
  });
  const paginationSize = (pagination.pageIndex + 1) * pagination.pageSize;

  useEffect(() => {
    const filterOptions = handleFilterOptions();

    handleDataLoad({
      pageSize: 30,
      offset: 0,
      pageIndex: 0,
      firstRender: true,
      filterOptions
    });
  }, [columnFilters]);

  useEffect(() => {
    if (paginationSize > 10 && paginationSize >= data.length && hasMore) {
      const pageIndex = pagination.pageIndex;
      const filterOptions = handleFilterOptions();

      handleDataLoad({
        pageSize: pagination.pageSize + paginationSize - data.length,
        offset: data.length,
        pageIndex,
        firstRender: false,
        filterOptions
      });
    }
  }, [pagination]);

  function handleFilterOptions() {
    // this element can have 0-5 keys with different names
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filterOptions: any = {};

    for (let i = 0; i < columnFilters.length; i++) {
      const id = columnFilters[i].id;

      filterOptions[id] = columnFilters[i].value;
    }

    return filterOptions;
  }

  function handleDataLoad({
    pageSize,
    offset,
    pageIndex,
    firstRender,
    filterOptions
  }: {
    pageSize: number;
    offset: number;
    pageIndex: number;
    firstRender: boolean;
    // this element can have 0-5 keys with different names
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterOptions: any;
  }) {
    setIsTableLoading(true);
    api
      .getDealerProducts({ pageSize, offset, filterOptions })
      .then((res) => {
        setData((state) => (firstRender ? [...res.items] : [...state, ...res.items]));
        res.offset + res.limit > res.total ? setHasMore(false) : setHasMore(true);
        setTimeout(() => {
          setPagination((state) => ({ ...state, pageIndex }));
        }, 0);
      })
      .catch((err) => {
        setRequestError(err.message);
        console.log(err);
      })
      .finally(() => setIsTableLoading(false));
  }

  function handleSCVLoading(
    e: FormEvent<HTMLInputElement>,
    func: (arg: FormData) => Promise<void>
  ) {
    const eventTarget = e.target as HTMLInputElement;
    const files = eventTarget.files;

    if (files && files.length > 0) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(files[0]);

      fileReader.onload = function () {
        const formData = new FormData();
        formData.append('file', files[0]);

        const buttonId = eventTarget.name;

        setIsButtonsLoading((state) => ({ ...state, [buttonId]: true }));

        func(formData)
          .catch((err) => {
            setRequestError(err.message);
            console.log(err);
          })
          .finally(() =>
            setIsButtonsLoading({
              dealers: false,
              dealerPrices: false,
              products: false
            })
          );
      };
    }
  }

  function handleSignOut() {
    navigate('/auth');
  }

  return <MaterialReactTable table={table} />;
}

export default MainPage;
