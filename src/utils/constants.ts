import { IDealer } from './Interfaces/IDealer.interface';
import { IDealerProduct } from './Interfaces/IDealerProduct.interface';
import { IProduct } from './Interfaces/IProduct.interface';
import { IRequestError } from './Interfaces/IRequestError.interface';
import { IRequestErrorList } from './Interfaces/IRequestErrorList.interface';
import { IUser } from './Interfaces/IUser.interface';
import { isButtonsLoading } from './Interfaces/MainPage/IsButtonsLoading.interface';
import { Pagination } from './Interfaces/MainPage/Pagination.interface';
import { Analytics } from './Interfaces/StatisticsPage/Analytics.interface';
import { InputValues } from './Interfaces/StatisticsPage/InputValues.interface';

export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://hackathon-prosept.ddns.net'
    : 'http://localhost:8001';

export const HEADER = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};
export const HEADER_AUTH = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded'
};

export const INITIAL_STATISTICS_ANALYTICS: Analytics = {
  matched: 0,
  not_matched: 0,
  deferred: 0,
  total_matching: 0,
  accuracy: 0,
  position: []
};

export const INITIAL_STATISTICS_INPUTVALUES: InputValues = {
  id: '',
  startDate: '',
  endDate: ''
};

export const INITIAL_MAIN_PAGINATION: Pagination = { pageIndex: 0, pageSize: 10 };

export const INITIAL_MAIN_ISBUTTONSLOADING: isButtonsLoading = {
  dealers: false,
  dealerPrices: false,
  products: false
};

export const INITIAL_MAIN_DATEANDPRICESTATELIST: string[] = ['По возрастанию', 'По убыванию'];

export const INITIAL_MAIN_STATUSSTATELIST: string[] = [
  'Нужно сопоставить',
  'Сопоставленные',
  'Не сопоставленные',
  'Отложенные'
];

export const INITIAL_MARKETING_DEALER: IDealer[] = [
  {
    id: 0,
    name: 'Список диллеров не загружен'
  }
];

export const INITIAL_MARKETING_DEALERPRICE: IDealerProduct[] = [
  {
    id: 0,
    product_key: '',
    price: 0,
    product_url: '',
    product_name: '',
    date: '',
    dealer: { name: '', id: 0 },
    productdealer: null
  }
];

export const INIRIAL_MARKETING_PRODUCTS: IProduct[] = [
  {
    FIELD1: 0,
    id: 0,
    article: '',
    ean_13: 0,
    name: '',
    cost: 0,
    recommended_price: 0,
    category_id: null,
    ozon_name: '',
    name_1c: '',
    wb_name: '',
    ozon_article: null,
    wb_article: null,
    ym_article: '',
    wb_article_td: ''
  }
];

export const INIRIAL_USER: IUser = {
  id: 0,
  email: '',
  is_active: true,
  is_superuser: false,
  is_verified: false,
  username: ''
};

export const REQUIRED_ERROR_MESSAGE = 'Поле не может быть пустым.';

export const NAME_REGEXP = /^[a-zA-Zа-яА-Я-\s]*$/;
export const NAME_VALIDATION_ERROR_MESSAGE =
  'В имени допускается использовать только буквы, тире и пробел.';

export const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
export const WRONG_EMAIL_MESSAGE = 'Введено не корректное значение E-mail.';

export const PASSWORD_REGEXP = /^(?=.*[A-Z].*)(?=.*[!@#$&*])(?=.*[0-9].*)(?=.*[a-z].*).*$/;
export const PASSWORD_HINT =
  'Пароль должен содержать лат. буквы в разных регистрах, не менее одной цифры и одного спецсивола: !@#$&*';

export const PASSWORD_VALIDATION_ERROR_MESSAGE =
  'Пароль должен содержать лат. буквы в разных регистрах, не менее одной цифры и одного спецсивола: !@#$&*';

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_MIN_LENGTH_ERROR_MESSAGE = 'Длинна должна быть от 8 символов.';

export const NAME_MIN_LENGTH = 2;
export const NAME_MIN_LENGTH_ERROR_MESSAGE = 'Длинна должна быть от 2 символов.';

export const NAME_MAX_LENGTH = 30;
export const NAME_MAX_LENGTH_ERROR_MESSAGE = 'Длинна должна до 30 символов.';

export const INITIAL_REQUEST_ERROR: IRequestError = {
  code: 0,
  message: ''
};

export const HTTP_REQUEST_ERROR_MESSAGE_LIST: IRequestErrorList = {
  400: { code: 400, message: 'Неверный запрос/Bad Request' },
  401: { code: 401, message: 'Неавторизованный запрос/Unauthorized' },
  402: { code: 402, message: 'Необходима оплата за запрос/Payment Required' },
  403: { code: 403, message: 'Доступ к ресурсу запрещен/Forbidden' },
  404: { code: 404, message: 'Ресурс не найден/Not Found' },
  405: { code: 405, message: 'Недопустимый метод/Method Not Allowed' },
  406: { code: 406, message: 'Неприемлемый запрос/Not Acceptable' },
  407: {
    code: 407,
    message: 'Требуется идентификация прокси, файервола/Proxy Authentication Required'
  },
  408: { code: 408, message: 'Время запроса истекло/Request Timeout' },
  409: { code: 409, message: 'Конфликт/Conflict' },
  410: { code: 410, message: 'Ресурс недоступен/Gone' },
  411: { code: 411, message: 'Необходимо указать длину/Length Required' },
  412: { code: 412, message: 'Сбой при обработке предварительного условия/Precondition Failed' },
  413: { code: 413, message: 'Тело запроса превышает допустимый размер/Request Entity Too Large' },
  414: { code: 414, message: 'Недопустимая длина URI запроса/Request-URI Too Long' },
  415: { code: 415, message: 'Неподдерживаемый MIME тип/Unsupported Media Type' },
  416: { code: 416, message: 'Диапазон не может быть обработан/Requested Range Not Satisfiable' },
  417: { code: 417, message: 'Сбой при ожидании/Expectation Failed' },
  422: { code: 422, message: 'Необрабатываемый элемент/Unprocessable Entity' },
  423: { code: 423, message: 'Заблокировано/Locked' },
  424: { code: 424, message: 'Неверная зависимость/Failed Dependency' },
  426: { code: 426, message: 'Требуется обновление/Upgrade Required' },
  429: { code: 429, message: 'Слишком много запросов/Too Many Requests' },
  500: { code: 500, message: 'Внутренняя ошибка сервера/Internal Server Error' },
  501: { code: 501, message: 'Метод не поддерживается/Not Implemented' },
  502: { code: 502, message: 'Ошибка шлюза/Bad Gateway' },
  503: { code: 503, message: 'Служба недоступна/Service Unavailable' },
  504: { code: 504, message: 'Время прохождения через межсетевой шлюз истекло/Gateway Timeout' },
  505: { code: 505, message: 'Версия НТТР не поддерживается/Version Not Supported' },
  507: { code: 507, message: 'Недостаточно места/Not Extended' },
  510: { code: 510, message: 'Отсутствуют расширения/Not Extended' }
};
